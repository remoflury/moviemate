import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { PUBLIC_TMDB_BASE_URL } from "$env/static/public";
import { TMDB_AUTH_KEY } from "$env/static/private";
import type { MovieByIdProps } from "$lib/types/TMDB";

export const GET: RequestHandler = async ({locals, url, fetch }) => {
  const session = await locals.safeGetSession()
  if (!session.session) {
    error(401)
  }

  const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit') as string) : 9
  const offset = url.searchParams.get('offset') ? parseInt(url.searchParams.get('offset') as string) : 0

  const { data: movieIdData, error: movieIdsError, count} = await locals.supabase
    .from('movie_likes')
    .select('movie_id', {
      count: 'exact',
    })
    .eq('user_uid', session.user.id)
    // limit -1, as range() is 0-indexed
    .range(offset, limit - 1)
  
  if (movieIdsError) {
    console.error(movieIdsError)
    error(500)
  }

  const movieIds = movieIdData.map((movieIdData: {movie_id: number}) => movieIdData.movie_id)

  const movies: MovieByIdProps[] = await Promise.all(movieIds.map(async (movieId: number) => {
    const response = await fetch(`${PUBLIC_TMDB_BASE_URL}/movie/${movieId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TMDB_AUTH_KEY}`
      }
    })
    const data: MovieByIdProps[] = await response.json()
    return data
  }))

  return json({
    movies,
    totalCount: count
  })
};