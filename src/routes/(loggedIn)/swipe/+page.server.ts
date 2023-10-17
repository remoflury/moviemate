import type { PageServerLoad } from './$types';
import { error as pageError, redirect } from '@sveltejs/kit';
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

	// check if user is logged in for the first time
	const { data, error } = await supabaseClient
		.from('Users_details')
		.select('users_first_login')
		.eq('users_id', userId);

	if (error) {
		throw pageError(500, 'Error fetching user.');
	}

	const { users_first_login: firstLogin } = data[0];

	// if the user is logged in for the first time, redirect to tutorial sit
	if (firstLogin) {
		throw redirect(302, '/profile/settings/how-to');
	}

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
			console.error(error);
			throw pageError(500, { message: 'Error loading recommendations.' });
		}
	}

	return {
		watchlistMovieIds,
		dismissedMovieIds,
		movies
	};
};
