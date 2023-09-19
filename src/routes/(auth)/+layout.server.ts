import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (session) throw redirect(303, '/swipe');
};
