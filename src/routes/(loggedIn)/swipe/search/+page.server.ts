import { getAllMovieIds, getDismissedMoviesOfUsers } from '$lib/utils/moviesUtils';
import type { PageServerLoad } from '../$types';
import { error as pageError } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const supabaseClient = locals.supabase;
	const session = await locals.getSession();

	// if not authorized
	if (!session) throw pageError(401, 'Unauthorized. Please login.');
	const userId = session.user.id;

	return {
		watchlist: await getAllMovieIds(supabaseClient, [userId]),
		dismissedMovies: await getDismissedMoviesOfUsers(supabaseClient, [userId])
	};
};
