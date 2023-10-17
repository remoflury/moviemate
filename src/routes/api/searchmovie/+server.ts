import { TMDB_AUTH_KEY, TMDB_BASE_URL } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import type { SearchResultProps } from '$lib/types/contentTypes';


export const GET: RequestHandler = async ({ fetch, url }) => {
	const searchQuery = url.searchParams.get('query');
	const page = url.searchParams.get('page') || '1';

	// error handling
	if (!searchQuery)
		return new Response(JSON.stringify({ error: 'Please search for a movie.' }), { status: 404 });

	try {
		const response = await fetch(
			`${TMDB_BASE_URL}/search/movie?query=${searchQuery}&language=en-US&page=${page}`,
			{
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${TMDB_AUTH_KEY}`
				}
			}
		);
		const data = await response.json();
	
		return new Response(JSON.stringify(data as SearchResultProps));
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Error while fetching searched movies.' }), {
			status: 500
		});
	}
};
