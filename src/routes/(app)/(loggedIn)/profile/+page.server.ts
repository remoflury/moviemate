import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

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

  return {
    user: user[0]
  }
};