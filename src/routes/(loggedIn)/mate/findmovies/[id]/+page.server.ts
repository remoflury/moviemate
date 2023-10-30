import type { PageServerLoad } from '../$types';
import { getMovieById, getVideoById } from '$lib/utils/moviesUtils';
import { error as pageError } from '@sveltejs/kit';
import { TMDB_AUTH_KEY, TMDB_BASE_URL } from '$env/static/private';
import type { TMDBMovieByIdrops, TMDBVideoProps } from '$lib/types/contentTypes';

export const load: PageServerLoad = async ({ url }) => {
	// get movie id from id
	const movieId = url.pathname.split('/')[3];

	let movieDetails: TMDBMovieByIdrops;
	let movieVideoDetails: TMDBVideoProps[];

	// if movie id is not provided
	if (!movieId) {
		throw pageError(500, { message: 'Error loading movie. Please provide correct movie.' });
	}

	// fetch movie details from tmdb api
	try {
		movieDetails = await getMovieById(movieId, TMDB_BASE_URL, TMDB_AUTH_KEY);
	} catch (error) {
		throw pageError(500, {
			message: 'There was an error fetching the movie. Please try again later.'
		});
	}

	// fetch video details from tmdb api
	try {
		movieVideoDetails = await getVideoById(movieId, TMDB_BASE_URL, TMDB_AUTH_KEY);
	} catch (error) {
		throw pageError(500, {
			message: 'There was an error fetching the video. Please try again later.'
		});
	}

	return {
		movie: movieDetails,
		video: movieVideoDetails
	};
};
