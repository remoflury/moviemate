import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.safeGetSession()
  if (!session) {
    error(401)
  }

  const { data: user, error: userErr } = await locals.supabase
    .from('user')
    .select('username, avatar_id')
    .eq('user_uid', session.user.id)

  if (userErr) {
    console.error(userErr)
    error(500)
  }

  return {
    user: user[0]
  }
};