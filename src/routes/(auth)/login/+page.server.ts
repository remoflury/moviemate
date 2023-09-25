import { isEmailValid, isUserExisting, isUsernameValid, signInWithPassword } from '$lib/utils/authUtils';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	login: async ({ locals, request }) => {
		const supabaseClient = locals.supabase;

		// grab form data
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		// validate email
		if (!isEmailValid(email))
			return {
				success: false,
				error: 'Please enter a valid email address.',
				email
			};

		// validate password
		if (!isUsernameValid(password)) return {
			success: false,
			error: 'Please enter at least 6 characters for the password',
			email
		}
			
		// error handling for type safety
		if (!email || !password) return {
			success: false,
			error: 'Please enter a valid email address.',
			email
		};

		// check if users exists
		const isUserExistingResult = await isUserExisting(email, supabaseClient);
		if (!isUserExistingResult.success)
			return {
				success: false,
				error: isUserExistingResult.error,
				email
			};

		// sign in with password
		const signInWithPasswordResult = await signInWithPassword(email, password, supabaseClient);
		if (!signInWithPasswordResult.success)
			return {
				success: false,
				error: 'Password and / or email address are wrong. Please try again.',
				email
			};

		// if user logged in successfully, redirect to /swipe
		throw redirect(303, '/swipe');
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ locals: { getSession } }) {
	const session = await getSession();

	// if user is logged in, redirect to /swipe
	if (session) {
		throw redirect(303, '/swipe');
	}
}
