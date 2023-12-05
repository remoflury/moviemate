import type { LayoutServerLoad } from './$types';
import { error as pageError } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	const supabaseClient = locals.supabase;
	const session = await locals.getSession();

	if (!session) {
		throw pageError(401, 'Unauthorized');
	}

	const userId = session?.user.id;

	const { data, error } = await supabaseClient
		.from('Users_details')
		.select('users_username')
		.eq('users_id', userId);

	if (error) {
		throw pageError(500, 'Error fetching user.');
	}

	const { users_username: username } = data[0];

	return {
		user: {
			id: userId,
			username
		}
	};
};
