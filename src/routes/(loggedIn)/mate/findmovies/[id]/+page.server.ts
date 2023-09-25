import type { PageServerLoad } from "../$types";
import { getMovieById } from "$lib/utils/moviesUtils";
import { error as pageError } from "@sveltejs/kit";
import { TMDB_AUTH_KEY, TMDB_BASE_URL } from "$env/static/private";
import type { TMDBMovieByIdrops } from "$lib/types/contentTypes";

export const load: PageServerLoad = async ({ url}) => {
  // get movie id from id
  const movieId = url.pathname.split('/')[3]

  let movieDetails: TMDBMovieByIdrops

  // if movie id is not provided
  if (!movieId) {
    throw pageError(500, { message: 'Error loading movie. Please provide correct movie.' })
  }
  // fetch movie details from tmdb api
  try {
    movieDetails = await getMovieById(movieId, TMDB_BASE_URL, TMDB_AUTH_KEY)
  } catch(error) {
    throw pageError(500, {message: 'There was an error fetching the movie. Please try again later.'})
  }

  return {
    movie: movieDetails
  }
};