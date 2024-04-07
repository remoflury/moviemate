import { loginSchema } from "$lib/validation/zodSchema";
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  

  const loginForm = await superValidate(zod(loginSchema))

  return {
    loginForm
  }
};