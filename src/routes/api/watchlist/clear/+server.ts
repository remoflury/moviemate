import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, url }) => {
	const supabaseClient = locals.supabase;

	const session = await locals.getSession();
	const userId = session?.user.id;
	// if user is not logged in, throw error
	if (!userId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

	const movieId = url.searchParams.get('movieid');
	if (!movieId) return new Response(JSON.stringify({ error: 'Please provide movie id.' }), { status: 500 });

	// get watchlist and dismissed list
	let watchlist: string[] = [];
	let dismissedList: string[] = [];
	try {
		const { data, error } = await supabaseClient
			.from('Users_movies')
			.select('movies_dismissed, movies_watchlist')
			.eq('movies_users_id', userId);

		if (error) throw new Error('Error fetching movies');

		watchlist = data[0].movies_watchlist;
		dismissedList = data[0].movies_dismissed;
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error }));
	}

	// remove movie from watchlist
	watchlist = watchlist.filter((id) => id != movieId);

	// remove movie from dismissedList
  dismissedList = dismissedList.filter((id) => id != movieId)

	// update db with new values
	try {
		const { error } = await supabaseClient
			.from('Users_movies')
			.update({
				movies_watchlist: watchlist,
				movies_dismissed: dismissedList
			})
			.eq('movies_users_id', userId);

		if (error) throw new Error('Error fetching movies');
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error }));
	}

	return new Response(JSON.stringify({status: 200, error: ''}));
};
