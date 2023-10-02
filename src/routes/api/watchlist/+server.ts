import { error as pageError } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
  const supabaseClient = locals.supabase

  const session = await locals.getSession()
  const userId = session?.user.id

  if (!userId) throw pageError(500, 'Could not load watchlist.')
  return new Response("test");
};