import { error as pageError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAllMovieIds } from '$lib/utils/moviesUtils';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	// if not authorized
	if (!session) throw pageError(401, 'Unauthorized. Please login.');

	const supabaseClient = locals.supabase;
	const userId = session.user.id;

	const { data, error: err} = await supabaseClient
		.from('Users_details')
		.select('users_avatar')
		.eq('users_id', userId)
		.single()

	if (err) {
		console.error(err)
		throw pageError(500, 'Ups, something went wrong.')
	}

	let watchlistIds: string[];
	try {
		const data = await getAllMovieIds(supabaseClient, [userId]);
		watchlistIds = data[0].movies_watchlist;
	} catch (err) {
		console.error(err);
		throw pageError(500, 'Ups, something went wrong.');
	}

	return {
		watchlistIds,
		avatarId: data.users_avatar
	};
};
