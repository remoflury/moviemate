import type { Actions } from './$types';
import { signOut } from '$lib/stores/auth';
import { redirect, error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	logout: async ({ locals }) => {
		const supabaseClient = locals.supabase;

		const signOutResult = await signOut(supabaseClient);

		if (!signOutResult.success) {
			throw error(500, 'Error signing out. Please try again.');
		}

		// redirect to login page
		throw redirect(303, '/login');
	}
};
