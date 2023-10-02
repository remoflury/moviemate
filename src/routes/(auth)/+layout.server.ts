import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

import { showGoBack } from '$lib/stores/menu';
$showGoBack = false;

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (session) throw redirect(303, '/swipe');
};
