import { error as pageError, type RequestHandler } from "@sveltejs/kit";
import { addMovieToDismissed, updateMovieIds } from "$lib/utils/moviesUtils";

export const GET: RequestHandler = async ({locals, url}) => {
  const supabaseClient = locals.supabase

  const session = await locals.getSession()
  const userId = session?.user.id
  const movieId = url.searchParams.get('movieId')
  const direction = url.searchParams.get('direction')

  // error handling
  if (!direction || !movieId || !userId) {
    throw pageError(500, 'Ups, there was an error.')
  }

  // if swipe direction was to right
  if (direction == 'right') {
    try {
      const data = await updateMovieIds(supabaseClient, userId, movieId)
      // const data = await response.json()
  
      console.log('right response: ', data)

    } catch (error) {
      console.error(error)
      throw pageError(500, 'Error updating the watchlist movies')
    }
  }

  if (direction == 'left') {
    try {
      const data = await addMovieToDismissed(supabaseClient, userId, movieId)
      console.log('left response: ', data)
    } catch (error) {
      console.error(error)
      throw pageError(500, 'Error updating dismissed movies')
    }
  }



  return new Response(JSON.stringify("test"));
};

