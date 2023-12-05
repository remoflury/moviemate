import type { SearchMatesProps } from '$lib/types/contentTypes.js';
import type { Actions, PageServerLoad } from './$types.js';
import { fail } from '@sveltejs/kit';
import { error as pageError } from '@sveltejs/kit';
import { createExistingMateProps, createSearchMateProps } from '$lib/utils/matesUtils.js';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals }) => {
	const supabaseClient = locals.supabase;
	const session = await locals.getSession();

	// if not authorized
	if (!session) throw pageError(401, 'Unauthorized. Please login.');
	const userId = session.user.id;

	// get all mates of user
	const { data, error } = await supabaseClient
		.from('Users_details')
		.select('users_mates, users_avatar')
		.eq('users_id', userId);

	// error handling
	if (error) {
		throw pageError(500, 'Something went wrong.');
	}

	const mates = data[0]?.users_mates || [];

	if (mates.length === 0) {
		return {
			mates: [],
			usersAvatarId: data[0].users_avatar
		};
	}

	// get all details of mates
	const { data: matesDetails, error: matesDetailsError } = await supabaseClient
		.from('Users_details')
		.select('users_id, users_username, users_avatar')
		.in('users_id', mates);

	// error handling
	if (matesDetailsError) {
		throw pageError(500, 'Something went wrong');
	}

	// create usable results array
	const result = createExistingMateProps(matesDetails);

	return {
		mates: result,
		usersAvatarId: data[0].users_avatar
	};
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	searchmate: async ({ request, locals }) => {
		const supabaseClient = locals.supabase;

		// grab the data
		const formData = await request.formData();
		const searchValue = formData.get('search-mate');

		// validate input
		if (!searchValue)
			return {
				searchValue: '',
				result: []
			};

		const searchTerm = searchValue.toString().trim().toLowerCase();

		// search for email
		const { data: email, error: emailError } = await supabaseClient
			.from('Users_details')
			.select('users_id, users_email, users_username, users_avatar')
			.ilike('users_email', `%${searchTerm}%`);

		// search for username
		const { data: username, error: usernameError } = await supabaseClient
			.from('Users_details')
			.select('users_id, users_email, users_username, users_avatar')
			.ilike('users_username', `%${searchTerm}%`);

		// error handling
		if (emailError || usernameError) {
			return fail(400, { message: 'Something went wrong' });
		}

		// merge results from db and remove duplicates
		const data = email.concat(username);
		const result = data.filter(
			(item, index, self) => index === self.findIndex((t) => t.users_id === item.users_id)
		);

		const searchMates: SearchMatesProps[] = createSearchMateProps(result);

		return {
			searchValue: searchTerm,
			result: searchMates
		};
	},
	addnewmate: async ({ request, locals }) => {
		const supabaseClient = locals.supabase;
		const session = await locals.getSession();
		const userId = session?.user.id;

		const formData = await request.formData();
		const newMateId = formData.get('new-mate-id')?.toString();

		if (!newMateId) {
			return fail(400, { message: 'Something went wrong' });
		}

		// uf user selects itself, return early to prevent adding itself
		if (userId === newMateId) return;

		// get all mates of user
		const { data, error } = await supabaseClient
			.from('Users_details')
			.select('users_mates')
			.eq('users_id', userId);

		if (error) {
			return fail(400, { message: 'Something went wrong' });
		}

		// arrange all previous mates to flat array (results in empty array if no mates)
		const prevMates: string[] = data
			.filter((mate) => mate.users_mates)
			.flatMap((mate) => mate.users_mates);

		// if previous mates include new mate, return early to prevent adding duplicate
		if (prevMates.includes(newMateId)) return;

		// adding new mate to array
		const newMates = [...prevMates, newMateId];

		// add new mates to db
		const { error: newMateError } = await supabaseClient
			.from('Users_details')
			.update({ users_mates: newMates })
			.eq('users_id', userId);

		if (newMateError) {
			return fail(400, { message: 'Something went wrong' });
		}
	}
};
