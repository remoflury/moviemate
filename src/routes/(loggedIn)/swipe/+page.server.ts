import type { PageServerLoad } from './$types';
import { error as pageError } from '@sveltejs/kit';
import {
	generateRandomIndex,
	getMovieRecommendationsById,
	getPopularMovies
} from '$lib/utils/moviesUtils';
import { TMDB_AUTH_KEY, TMDB_BASE_URL } from '$env/static/private';
import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';

export const load: PageServerLoad = async ({ locals }) => {
	const supabaseClient = locals.supabase;
	const session = await locals.getSession();

	// if not authorized
	if (!session) throw pageError(401, 'Unauthorized. Please login.');
	const userId = session.user.id;

	// get all movie ids (watchlist & dismissed) from user
	let watchlistMovieIds: string[] = [];
	let dismissedMovieIds: string[] = [];
	try {
		const { data, error } = await supabaseClient
			.from('Users_movies')
			.select('movies_watchlist, movies_dismissed')
			.eq('movies_users_id', userId);

		if (error) throw Error;
		watchlistMovieIds = data[0].movies_watchlist;
		dismissedMovieIds = data[0].movies_watchlist;
	} catch (error) {
		throw pageError(500, 'Error fetching movies.');
	}

	// console.log('watchlistMovieIds ', watchlistMovieIds)
	// console.log('!watchlistMovieIds.length ', !watchlistMovieIds.length)

	let movies: TMDBMovieByRecommendationProps[] = [];
	// if user has no movie-ids in watchlist, fetch popular movies
	if (watchlistMovieIds.length === 0) {
		try {
			movies = await getPopularMovies(TMDB_BASE_URL, TMDB_AUTH_KEY, 1);
			// filter out movies, which are already in watchlist
			movies = movies.filter((movie) => !watchlistMovieIds.includes(movie.id.toString()));

			// filter out movies, which are in dismissed list
			movies = movies.filter((movie) => !dismissedMovieIds.includes(movie.id.toString()));
		} catch (error) {
			throw pageError(500, { message: 'Error loading popular movies.' });
		}
	}

	// console.log(movies)
	// if user has some movie-ids in watchlist, fetch recommendations based on random id of watchlist
	else if (watchlistMovieIds.length) {
		try {
			while (movies.length === 0) {

				const randomIndex = generateRandomIndex(watchlistMovieIds);
				movies = await getMovieRecommendationsById(
					watchlistMovieIds[randomIndex],
					TMDB_BASE_URL,
					TMDB_AUTH_KEY,
					1
				);

			
			}
			// filter out movies, which are already in watchlist
			movies = movies.filter((movie) => !watchlistMovieIds.includes(movie.id?.toString()));

			// filter out movies, which are in dismissed list
			movies = movies.filter((movie) => !dismissedMovieIds.includes(movie.id?.toString()));
		} catch (error) {
			console.error(error)
			throw pageError(500, { message: 'Error loading recommendations.' });
		}
	}

	return {
		watchlistMovieIds,
		dismissedMovieIds,
		movies
	};
};