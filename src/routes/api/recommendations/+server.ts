import { error as pageError, type RequestHandler } from "@sveltejs/kit";
import { TMDB_BASE_URL, TMDB_AUTH_KEY } from "$env/static/private";
import { getMovieRecommendationsById } from "$lib/utils/moviesUtils";
import type { TMDBMovieByRecommendationProps } from "$lib/types/contentTypes";

export const GET: RequestHandler = async ({locals, url}) => {
  const supabaseClient = locals.supabase

  const session = await locals.getSession()
  const userId = session?.user.id
  const movieId = url.searchParams.get('movieId')

  // error handling
  if (!userId) throw pageError(403, 'You need to be logged in.')
  if (!movieId) throw pageError(400, 'A movie id is needed.')

  // get all movie ids (watchlist & dismissed) from user
  let watchlistMovieIds: string[] = []
  let dismissedMovieIds: string[] = []
  try {
    const { data, error } = await supabaseClient
      .from('Users_movies')
      .select('movies_watchlist, movies_dismissed') 
      .eq('movies_users_id', userId);

      if (error) throw Error
      watchlistMovieIds = data[0].movies_watchlist
      dismissedMovieIds = data[0].movies_watchlist
  } catch(error) {
    throw pageError(500, 'Error fetching movies.')
  }

  // fetch recommendations
  const recommendations: TMDBMovieByRecommendationProps[] = await getMovieRecommendationsById("800089", TMDB_BASE_URL, TMDB_AUTH_KEY, 1)
  // filter out movies, which are already in watchlist list
  let filteredRecommendations = recommendations.filter(movie => !watchlistMovieIds.includes(movie.id.toString()));
  // filter out movies, which are in dismissed list
  filteredRecommendations = filteredRecommendations.filter(movie => !dismissedMovieIds.includes(movie.id.toString()))

  // const result = [{title: "test"}]
  
  return new Response(JSON.stringify(filteredRecommendations));
};