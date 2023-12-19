import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals }) => {
	const supabaseClient = locals.supabase;

	const session = await locals.getSession();
	const userId = session?.user.id;
	// if user is not logged in, throw error
	if (!userId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

	const movieId = url.searchParams.get('movieid');
	if (!movieId)
		return new Response(JSON.stringify({ error: 'Please provide movie id.' }), { status: 500 });

	// get watchlist and dismissed list
	let watchlist: string[] = [];
	try {
		const { data, error } = await supabaseClient
			.from('Users_movies')
			.select('movies_watchlist')
			.eq('movies_users_id', userId);

		if (error) throw new Error('Error fetching movies');

		watchlist = data[0].movies_watchlist;
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error }));
	}

	// add movie to watchlist
	if (!watchlist.includes(movieId)) watchlist.unshift(movieId);

	// update db with new values
	try {
		const { error } = await supabaseClient
			.from('Users_movies')
			.update({
				movies_watchlist: watchlist
			})
			.eq('movies_users_id', userId);

		if (error) throw new Error('Error fetching movies');
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error }));
	}
	return new Response(JSON.stringify({ status: 200, error: '' }));
};
