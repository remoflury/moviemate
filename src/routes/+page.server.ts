import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();

	// if user is logged in, redirect to /swipe
	if (session) {
		throw redirect(303, '/swipe');
	}
};
