import type { Actions } from './$types';
import { signOut } from '$lib/utils/authUtils';
import { redirect, error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	logout: async ({ locals }) => {
		const supabaseClient = locals.supabase;

		// log out user
		const signOutResult = await signOut(supabaseClient);

		// error handling
		if (!signOutResult.success) {
			throw error(500, 'Error signing out. Please try again.');
		}

		// redirect to login page
		throw redirect(303, '/login');
	}
};
