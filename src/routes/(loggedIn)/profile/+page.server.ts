import { error as pageError } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
// import { getAllMovieIds, getMovieById } from "$lib/utils/moviesUtils";
// import type { TMDBMovieByIdrops } from "$lib/types/contentTypes";
// import { TMDB_AUTH_KEY, TMDB_BASE_URL } from "$env/static/private";

export const load: PageServerLoad = async ({locals}) => {
  // const supabaseClient = locals.supabase;
	const session = await locals.getSession();
	if (!session) throw pageError(401, 'Unauthorized. Please login.');
	// const userId = session.user.id;
  
  // // get all movie ids of users watchlist
  // let movieIds: string[] = []
  // try {
  //   const response = await getAllMovieIds(supabaseClient, [userId])
  //   // const data = await response.json()
  //   movieIds = response[0].movies_watchlist

  //   // console.log(response)
  // } catch(error) {
  //   console.error(error)
  // }

  // // fetch movie details for each movieId
  // const count = 0
  // const movies: TMDBMovieByIdrops[] = []
  
  // // console.log(movieIds.length)
  // // while (count <= movieIds.length) {
  //   try {
  //     const movie = await getMovieById(movieIds[count], TMDB_BASE_URL, TMDB_AUTH_KEY)
  //     movies.push(movie)
  //   } catch(error) {
  //     console.error(error)
  //     throw pageError(500, 'Error loading the watchlist movies')
  //   }

  // return {
  //   movies
  // }
};