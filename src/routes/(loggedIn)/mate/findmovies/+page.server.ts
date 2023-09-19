import type { SupabaseClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import type { TMDBMovieByIdrops, TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
import { error as pageError } from '@sveltejs/kit';
import { TMDB_AUTH_KEY, TMDB_BASE_URL } from '$env/static/private';
import { getMatchesAndNotMatchesArray, generateRandomIndex } from '$lib/utils/moviesUtils';
import { getMovieById, getMovieRecommendationsById } from '$lib/utils/moviesUtils';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ url, locals }) => {
	const supabaseClient = locals.supabase;

	// get mates ids from url and remove empty strings
	const matesIdsAsString = url.searchParams.get('matesids');
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
		} catch (error) {
			throw pageError(500, { message: 'Error loading matching movies.' });
		}
	}
	// if there is not a match or less than 4 matches
	if (matchedMovies.length <= 4) {
		const randomIndex = generateRandomIndex(notMatchedMovieIds);
		try {
			// fetch recommended movie by random movie id, page 1
			recommendedMovies = await getMovieRecommendationsById(
				notMatchedMovieIds[randomIndex],
				TMDB_BASE_URL,
				TMDB_AUTH_KEY,
				1
			);
		} catch (error) {
			throw pageError(500, { message: 'Error loading recommended movies.' });
		}
	}

	return {
		matches: matchedMovies,
		recommendations: recommendedMovies
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
