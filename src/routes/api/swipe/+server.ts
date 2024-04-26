import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { PUBLIC_TMDB_BASE_URL } from "$env/static/public";
import { TMDB_AUTH_KEY } from "$env/static/private";
import { getRandomIndex } from "$lib/utils/generalUtils";

export const GET: RequestHandler = async ({ locals }) => {
  const session = await locals.safeGetSession();
  if (!session) error(401)
  

  // get all liked and disliked movies
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

  const likedMovieIds = dbMovies[0].movie_likes.map((row: {movie_id: number}) => row.movie_id)
  const dislikedMovieIds = dbMovies[0].movie_dislikes.map((row: {movie_id: number}) => row.movie_id)

  // if user has no liked movies, return movies from discovery
  if (!likedMovieIds.length) {
    const response = await fetch(`${PUBLIC_TMDB_BASE_URL}/discover/movie`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_AUTH_KEY}`
      }
    })
    const data = await response.json()
    console.log("user has no liked movies")
    return json(data)
  }

  // if user has liked movies, return recommendations 
  // based on a random id from the liked movies
  let hasRecommendations = false
  let recommendationsData 

  // some recommendation fetches return empty results
  // fetch inside a while loop until a non-empty result is returned
  while (!hasRecommendations) {
    const randomIndex = getRandomIndex(likedMovieIds)

    const response = await fetch(`${PUBLIC_TMDB_BASE_URL}/movie/${likedMovieIds[randomIndex]}/recommendations?language=en-US`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_AUTH_KEY}`
      }
    })
    recommendationsData = await response.json()
    // filter out movies that already have been liked
    recommendationsData.results = recommendationsData.results.filter((movie: {id: number}) => !likedMovieIds.includes(movie.id))

    // filter out movies that have been disliked
    recommendationsData.results = recommendationsData.results.filter((movie: {id: number}) => !dislikedMovieIds.includes(movie.id))

    if (recommendationsData.results?.length) {
      hasRecommendations = true
    }

  }
  console.log("user has liked movies")
  
  return json(recommendationsData)
};

// TODO: FILTER MOVIES BASED ON DISLIKES AND LIKES