import type { PageServerLoad } from "../$types";
import { error as pageError } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
	// if not authorized
	if (!session) throw pageError(401, 'Unauthorized. Please login.');

	const supabaseClient = locals.supabase;
	const userId = session.user.id;

  // fetch avatar Id
  const { data: avatarId, error } = await supabaseClient
  .from('Users_details')
  .select('users_avatar')
  .eq('users_id', userId)

  if (error) throw pageError(500, error.message)

  return {
    avatarId: avatarId[0].users_avatar
  }

};