import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { PUBLIC_TMDB_BASE_URL } from "$env/static/public";
import { TMDB_AUTH_KEY } from "$env/static/private";
import { getRandomIndex } from "$lib/utils/generalUtils";

export const GET: RequestHandler = async ({ locals }) => {
  const session = await locals.safeGetSession();
  if (!session) error(401)
  

  // get all liked movies
  const { data: dbMovies, error: dbMoviesError } = await locals.supabase
    .from(`user`)
    .select(`
      movie_likes(
        movie_id
      ),
      movie_dislikes(
        movie_id
      )
    `)
    .eq('user_uid', session.user.id)

  if (dbMoviesError) {
    console.error(dbMoviesError)
    error(500)
  }

  const likedMovies = dbMovies[0].movie_likes
  const dislikedMovies = dbMovies[0].movie_dislikes

  // if user has no liked movies, return movies from discovery
  if (!likedMovies.length) {
    const response = await fetch(`${PUBLIC_TMDB_BASE_URL}/discover/movie`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_AUTH_KEY}`
      }
    })
    const data = await response.json()
    return json(data)
  }

  // if user has liked movies, return recommendations 
  // based on a random id from the liked movies
  let hasRecommendations = false
  let recommendationsData 
  
  // some recommendation fetches return empty results
  // fetch inside a while loop until a non-empty result is returned
  while (!hasRecommendations) {
    const randomIndex = getRandomIndex(likedMovies)

    const response = await fetch(`${PUBLIC_TMDB_BASE_URL}/movie/${likedMovies[randomIndex].movie_id}/recommendations?language=en-US`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_AUTH_KEY}`
      }
    })
    const data = await response.json()
    if (data.results?.length) {
      hasRecommendations = true
      recommendationsData = data
    }
  }
  
  return json(recommendationsData)
};

// TODO: FILTER MOVIES BASED ON DISLIKES AND LIKES