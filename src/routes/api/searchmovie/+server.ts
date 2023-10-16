import { TMDB_AUTH_KEY, TMDB_BASE_URL } from "$env/static/private";
import type { TMDBMovieByRecommendationProps } from "$lib/types/contentTypes";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({fetch, url}) => {
  const searchQuery = url.searchParams.get('query')

  // error handling
  if (!searchQuery) return new Response(JSON.stringify({ error: 'Please search for a movie.' }), { status: 404 })

  try {
    const response = await fetch(`${TMDB_BASE_URL}/search/movie?query=${searchQuery}&language=en-US`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_AUTH_KEY}`
      }
    })
    const data = await response.json()
    return new Response(JSON.stringify(data.results as TMDBMovieByRecommendationProps));

  } catch(err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Error while fetching searched movies.' }), { status: 500 })
  }
};