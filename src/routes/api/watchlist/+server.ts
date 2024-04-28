import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { PUBLIC_TMDB_BASE_URL } from "$env/static/public";
import { TMDB_AUTH_KEY } from "$env/static/private";

export const GET: RequestHandler = async ({locals, url, fetch }) => {
  const session = await locals.safeGetSession()
  if (!session.session) {
    error(401)
  }

  const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit') as string) : 9
  const offset = url.searchParams.get('offset') ? parseInt(url.searchParams.get('offset') as string) : 0

  const { data: movieIdData, error: movieIdsError } = await locals.supabase
    .from('movie_likes')
    .select('movie_id')
    .eq('user_uid', session.user.id)
    // limit -1, as range() is 0-indexed
    .range(offset, limit - 1)
  
  if (movieIdsError) {
    console.error(movieIdsError)
    error(500)
  }

  const movieIds = movieIdData.map((movieIdData: {movie_id: number}) => movieIdData.movie_id)

  console.log(movieIds)

  let movies: any[] = []

  movieIds.forEach(async (movieId: number) => {
    const response = await fetch(`${PUBLIC_TMDB_BASE_URL}/movie/${movieId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TMDB_AUTH_KEY}`
      }
    })
    const data = await response.json()
    console.log(data)
    movies.push(data)
  })

  console.log(movies)

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return json(movies)
};