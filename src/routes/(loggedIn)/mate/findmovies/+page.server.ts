import type { SupabaseClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import type { TMDBMovieByIdrops, TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
import { error as pageError } from '@sveltejs/kit';
import { TMDB_AUTH_KEY, TMDB_BASE_URL } from '$env/static/private';
import { getMatchesAndNotMatchesArray, generateRandomIndex, filterMoviesWithEmptyPoster } from '$lib/utils/moviesUtils';
import { getMovieById, getMovieRecommendationsById } from '$lib/utils/moviesUtils';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ url, locals }) => {
	const supabaseClient = locals.supabase;

	// get mates ids from url and remove empty strings
	const matesIdsAsString = url.searchParams.get('matesids')?.toString();
	if (!matesIdsAsString) {
		throw pageError(500, { message: 'Missing mates ids.' });
	}
	const matesIds = matesIdsAsString.split(',').filter((id) => id !== '');

	// get user id from url
	const userId = url.searchParams.get('userid');

	// error handling
	if (!matesIds || !matesIds?.length || !userId) {
		throw pageError(500, { message: 'Missing mates ids or user id.' });
	}

	// concat all id of mates and user
	const allIds = matesIds.concat(userId);

	// get all movie ids from all mates and user
	const allMovieIds = await getAllMovieIds(supabaseClient, allIds);

	// get matching and not matching movie ids
	const { matchedMovieIds, notMatchedMovieIds } = getMatchesAndNotMatchesArray(allMovieIds);

	let matchedMovies: TMDBMovieByIdrops[] = [];
	let recommendedMovies: TMDBMovieByRecommendationProps[] = [];

	// if there is a match
	if (matchedMovieIds.length) {
		// fetch each movie individually by movie id
		try {
			matchedMovies = await Promise.all(
				matchedMovieIds.map((id) => getMovieById(id, TMDB_BASE_URL, TMDB_AUTH_KEY))
			);
			// filter out movies without poster
			matchedMovies = filterMoviesWithEmptyPoster(matchedMovies)
		} catch (error) {
			throw pageError(500, { message: 'Error loading matching movies.' });
		}
	}

	let recommendationsMovieId!: string;
	if (matchedMovieIds.length) {
		// if there is a match, make recommendations on base of matches
		const randomIndex = generateRandomIndex(matchedMovieIds);
		recommendationsMovieId = matchedMovieIds[randomIndex];
		// if there is not a match, make recommendations on base of random movie of someones watchlist (notMatchedMovieIds)
		while (recommendedMovies.length === 0) {
			try {
				recommendedMovies = await getMovieRecommendationsById(
					matchedMovieIds[randomIndex],
					TMDB_BASE_URL,
					TMDB_AUTH_KEY,
					1
				);
				// filter out movies without poster
				recommendedMovies = filterMoviesWithEmptyPoster(recommendedMovies)
			} catch (error) {
				throw pageError(500, { message: 'Error loading recommended movies.' });
			}
		}
	} else if (matchedMovieIds.length === 0) {
		// if there is not a match, make recommendations on base of random movie of someones watchlist (notMatchedMovieIds)
		while (recommendedMovies.length === 0) {
			// fetch until there is a recommendation (somethings tmdb does return an empty array of recommendations)
			const randomIndex = generateRandomIndex(notMatchedMovieIds);
			recommendationsMovieId = notMatchedMovieIds[randomIndex];
			try {
				recommendedMovies = await getMovieRecommendationsById(
					notMatchedMovieIds[randomIndex],
					TMDB_BASE_URL,
					TMDB_AUTH_KEY,
					1
				);

				// filter out movies without poster
				recommendedMovies = filterMoviesWithEmptyPoster(recommendedMovies)
			} catch (error) {
				throw pageError(500, { message: 'Error loading recommended movies.' });
			}
			
		}
	}

	return {
		matches: matchedMovies,
		recommendations: recommendedMovies,
		recommendationsMovieId
	};
};

const getAllMovieIds = async (supabaseClient: SupabaseClient, userIdsArray: string[]) => {
	const { data, error } = await supabaseClient
		.from('Users_movies')
		.select('movies_watchlist')
		.in('movies_users_id', userIdsArray);

	if (error) {
		throw pageError(500, { message: 'Error loading movies.' });
	}

	return data;
};
