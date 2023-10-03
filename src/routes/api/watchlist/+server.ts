import type { RequestHandler } from "./$types";
import { filterMoviesWithEmptyPoster, getAllMovieIds, getMovieById } from "$lib/utils/moviesUtils";
import { TMDB_AUTH_KEY, TMDB_BASE_URL } from "$env/static/private";
import type { TMDBMovieByIdrops } from "$lib/types/contentTypes";

export const GET: RequestHandler = async ({ locals, url }) => {
  const supabaseClient = locals.supabase

  const session = await locals.getSession()
  const userId = session?.user.id

  // if user is not logged in, throw error
  if (!userId) return new Response(JSON.stringify({error: 'Unauthorized'}), { status: 401 });

  // get limit for fetch
  const limit = Number(url.searchParams.get('limit'))
  // error handling
  if (limit == 0 || !limit) {
    return new Response(JSON.stringify({error: 'Please provide the params.'}), { status: 500 });
  }

  let movieIds: string[] = []

  // get all movie Ids from database
  try {
    const response = await getAllMovieIds(supabaseClient, [userId])
    movieIds = response[0].movies_watchlist
  } catch(error) {
    console.error(error)
    return new Response(JSON.stringify({error: 'Error while fetching the movie ids.'}), { status: 500 });

  }

  // get movie details
  let movies: TMDBMovieByIdrops[] = []
  let count = 0

  while (count <  limit) {
    if (count >= movieIds.length) break
    try {
      const response = await getMovieById(movieIds[count], TMDB_BASE_URL, TMDB_AUTH_KEY)
      // console.log(response)
      movies.push(response)
      movies = filterMoviesWithEmptyPoster(movies)
    } catch(error) {
      return new Response(JSON.stringify({error: 'Error while fetching the movie details.'}), { status: 500 });
    }
    count++
  }


  // return data
  return new Response(JSON.stringify(movies));
};