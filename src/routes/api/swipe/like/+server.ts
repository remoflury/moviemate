import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, request}) => {
  const session = await locals.safeGetSession();
  if (!session.session) error(401)

  const body = await request.json()
  if (!body.movieId) error(400, 'id is required')

  const { data: likesData, error: likeDataErr } = await locals.supabase
    .from('movie_likes')
    .select('movie_id')
    .match({
      'movie_id': body.movieId,
      'user_uid': session.user.id
    })

  if (likeDataErr) {
    console.log(likeDataErr)
    error(500, likeDataErr.message)
  }

  if (likesData.length == 0) {
    const { error: dislikeInsertErr } = await locals.supabase
      .from('movie_likes')
      .insert({'movie_id': body.movieId})

      if (dislikeInsertErr) {
        console.log(dislikeInsertErr)
        error(500, dislikeInsertErr.message)
      }
  }


  return json({status: 201})
};