import type { PageServerLoad } from "./$types";
import { error as pageError } from '@sveltejs/kit'
import { generateRandomIndex, getAllMovieIds, getMovieRecommendationsById, getPopularMovies } from "$lib/utils/moviesUtils";
import { TMDB_AUTH_KEY, TMDB_BASE_URL } from "$env/static/private";
import type { TMDBMovieByRecommendationProps } from "$lib/types/contentTypes";

export const load: PageServerLoad = async ({ locals}) => {
  const supabaseClient = locals.supabase;
	const session = await locals.getSession();
	if (!session) throw pageError(401, 'Unauthorized. Please login.');
	const userId = session.user.id;

  
  // get all movie ids from user
  let movieIds: string[] = []
  try {
    const data = await getAllMovieIds(supabaseClient, [userId])
    movieIds = data[0].movies_watchlist
  } catch(error) {
    throw pageError(500, { message: 'Error loading movie ids.' });
  }

  let movies: TMDBMovieByRecommendationProps[] = []
  // if user has no movie-ids in watchlist, fetch popular movies
  if (!movieIds.length) {
    try {
      movies = await getPopularMovies(TMDB_BASE_URL, TMDB_AUTH_KEY, 1)
    } catch(error) {
      throw pageError(500, { message: 'Error loading popular movies.' })
    }
  } 
  // if user has some movie-ids in watchlist, fetch recommendations
  else if (movieIds.length) {
    try {
      const randomIndex = generateRandomIndex(movieIds)
      movies = await getMovieRecommendationsById(movieIds[randomIndex], TMDB_BASE_URL, TMDB_AUTH_KEY, 1)
    } catch(error) {
      throw pageError(500, { message: 'Error loading recommendations.' })
    }
  }

  return {
   movieIds,
   movies
  }
};