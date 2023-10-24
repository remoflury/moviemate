import { TMDB_AUTH_KEY, TMDB_BASE_URL } from '$env/static/private';
import type { TMDBMovieByIdrops, TMDBVideoProps } from '$lib/types/contentTypes';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const movieId = params.id;

	// error handling
	if (!movieId)
		return new Response(JSON.stringify({ error: 'Please provide movie id.' }), { status: 500 });

	// get movieDetails
	const getMovieDetails = async (id: string) => {
		const response = await fetch(`${TMDB_BASE_URL}/movie/${id}`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TMDB_AUTH_KEY}`
			}
		});
		const data: TMDBMovieByIdrops = await response.json();
		return data;
	};

	// get video details
	const getVideoDetails = async (id: string) => {
		const response = await fetch(`${TMDB_BASE_URL}/movie/${id}/videos`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TMDB_AUTH_KEY}`
			}
		});
		const data = await response.json();
		// filter out movies which are not official trailers
		const results: TMDBVideoProps[] = data.results.filter((movie: TMDBVideoProps) => movie.official == true && movie.type == 'Trailer')
		return results;
	};

	const result = {
		movieDetails: await getMovieDetails(movieId),
		videoDetails: await getVideoDetails(movieId)
	};

	return new Response(JSON.stringify(result));
};
