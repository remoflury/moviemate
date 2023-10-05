import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({fetch, locals}) => {
  const supabaseClient = locals.supabase;

	const session = await locals.getSession();
	const userId = session?.user.id;

	// if user is not logged in, throw error
	if (!userId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  return new Response(JSON.stringify("test"));
};