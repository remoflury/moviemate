import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals }) => {
	const supabaseClient = locals.supabase;

	const session = await locals.getSession();
	const userId = session?.user.id;
	// if user is not logged in, throw error
	if (!userId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

	const avatarId = url.searchParams.get('id');

	// if no id is provided
	if (!avatarId)
		return new Response(JSON.stringify({ error: 'Please provide Avatar id' }), { status: 500 });

	const { data, error } = await supabaseClient
		.from('Users_details')
		.update({ users_avatar: avatarId })
		.eq('users_id', userId);

	if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

	const result = {
		avatarId,
		data
	};
	return new Response(JSON.stringify(result));
};
