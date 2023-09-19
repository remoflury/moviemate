import { isEmailValid, isUserExisting, signIn, signInWithPassword } from '$lib/stores/auth';
import { redirect, error as pageError } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ locals, request}) => {
    const supabaseClient = locals.supabase;

    // grab form data
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    // validate email
    if (!isEmailValid(email)) return {
      success: false,
      error: 'Please enter a valid email address.',
      email
    }

    // check if users exists
    const isUserExistingResult = await isUserExisting(email, supabaseClient)
    if (!isUserExistingResult.success) return {
      success: false,
      error: isUserExistingResult.error,
      email
    }
    
    // sign in with password
    const signInWithPasswordResult = await signInWithPassword(email, password, supabaseClient)
    if (!signInWithPasswordResult.success) return {
      // throw pageError(500, 'Error logging in.')
        success: false,
        error: 'Password and / or email address are wrong. Please try again.',
        email
      }


    throw redirect(303, '/swipe')
  }
};

/** @type {import('./$types').PageLoad} */
export async function load({locals: { getSession }}) {
  const session = await getSession()

  // if user is logged in, redirect to /swipe
  if  (session) {
    throw redirect(303, '/swipe')
  }
}