import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, request}) => {
  const session = await locals.safeGetSession();
  if (!session) error(401)

  const body = await request.json()
  if (!body.movieId) error(400, 'id is required')

  const { data: dislikeData, error: dislikeDataErr } = await locals.supabase
    .from('movie_dislikes')
    .select('movie_id')
    .match({
      'movie_id': body.movieId,
      'user_uid': session.user.id
    })

  if (dislikeDataErr) {
    console.log(dislikeDataErr)
    error(500, dislikeDataErr.message)
  }

  if (dislikeData.length == 0) {
    const { error: dislikeInsertErr } = await locals.supabase
      .from('movie_dislikes')
      .insert({'movie_id': body.movieId})

      if (dislikeInsertErr) {
        console.log(dislikeInsertErr)
        error(500, dislikeInsertErr.message)
      }
  }


  return json("test")
};