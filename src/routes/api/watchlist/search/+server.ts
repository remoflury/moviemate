import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { PUBLIC_TMDB_BASE_URL } from "$env/static/public";
import { TMDB_AUTH_KEY } from "$env/static/private";
import type { MovieByIdProps } from "$lib/types/TMDB";

export const GET: RequestHandler = async ({ locals, url, fetch }) => {
  const session = await locals.safeGetSession()
  if (!session.session) {
    error(401)
  }

  const q = url.searchParams.get('q')

  if (!q) {
    error(400, {message: "Search term is required."})
  }

  const { data: movieIdsArr, error: searchError } = await locals.supabase
    .from('movie_likes')
    .select('movie_id')
    .eq('user_uid', session.user.id)

  if (searchError) {
    console.error(searchError)
    error(500)
  }

  const movieIds = movieIdsArr.map((movieIdData: {movie_id: number}) => movieIdData.movie_id)

  const searchedMoviesRes = await fetch(`${PUBLIC_TMDB_BASE_URL}/search/movie?query=${q}`, {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TMDB_AUTH_KEY}`
      }
    })
  const data = await searchedMoviesRes.json()

  const searchMovies = data.results.filter((movie: MovieByIdProps) => {
    return movieIds.some((id: number) => id == movie.id)
  });



  return json({
    movies: searchMovies,
    totalCount: searchMovies.length
  })
};