import { error as pageError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	// if not authorized
	if (!session) throw pageError(401, 'Unauthorized. Please login.');
};
