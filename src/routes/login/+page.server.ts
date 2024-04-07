import { loginSchema } from "$lib/validation/zodSchema";
import { fail,  message,  superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {

  const loginForm = await superValidate(zod(loginSchema))

  return {
    loginForm
  }
};

export const actions: Actions = {
  login: async ({ request, locals }) => {
   const form = await superValidate(request, zod(loginSchema))

   if (!form.valid) {
    console.log(form)
    return fail(400, { form })
   }


   // sign in with supabase
   const { data, error: loginErr } = await locals.supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password
   })

   if (loginErr) {
      console.error(loginErr.message)
      return message(form, loginErr.message, { status: 500 })
   }

   console.log(data)

   // if user logged in successfully, redirect to /swipe
		throw redirect(303, '/swipe');
  }
};