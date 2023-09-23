import { isEmailValid, isUserExisting, signInWithPassword } from '$lib/stores/auth';
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

		if (!email || !password) return {
			success: false,
			error: 'Please enter a valid email address.',
			email
		};

		if (password.toString().length <= 8) return {
			success: false,
			error: 'Please enter at least 8 characters for the password',
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
