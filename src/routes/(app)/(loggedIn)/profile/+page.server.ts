import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { movieIdSchema } from "$lib/validation/zodSchema";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.safeGetSession()
  if (!session.session) error(401)

  // get user data
  const { data: user, error: userError } = await locals.supabase
    .from('user')
    .select('username, avatar_id')
    .eq('user_uid', session.user.id)

  if (userError) {
    console.error(userError)
    error(500)
  }

  if (!user || !user.length) {
    error(404)
  }

  const removeFromWatchlistForm = await superValidate(zod(movieIdSchema))

  return {
    user: user[0],
    removeFromWatchlistForm
  }
};


export const actions: Actions = {
  removefromwatchlist: async ({ request, locals }) => {
    const session = await locals.safeGetSession()
    if (!session.session) return fail(401)

    const form = await superValidate(request, zod(movieIdSchema))

    if (!form.valid) {
      console.error(form)
      return fail(400, {form})
    }

    const { error: removeError } = await locals.supabase
      .from('movie_likes')
      .delete()
      .match({
        'movie_id': form.data.movieId,
        'user_uid': session.user.id
      })

    if (removeError) {
      console.error(removeError)
      return fail(500, {form})
    }

    return {form}
  }
};