import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  tutorialDone: async ({ locals }) => {
    const supabaseClient = locals.supabase;
    const session = await locals.getSession();
    
    if (!session) {
      return fail(403, {error: 'User not authorized.'})
    }

    const userId = session.user.id

    // set first time login status on db to false
    const { error } = await supabaseClient
      .from('Users_details')
      .update({ users_first_login: false })
      .eq('users_id', userId)

    if (error) throw fail(500, {message: 'Error while setting users first login status.'})

    throw redirect(303, '/swipe')
  }
};