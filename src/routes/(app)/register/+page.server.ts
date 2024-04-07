import { fail, message, setError, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { registerSchema } from "$lib/validation/zodSchema";

export const load: PageServerLoad = async () => {
  
  const registerForm = await superValidate(zod(registerSchema))

  return {
    registerForm
  }
};

export const actions: Actions = {
  register: async ({ request, locals }) => {
    const form = await superValidate(request, zod(registerSchema))

    if (!form.valid) {
      console.log(form)
      return fail(400, { form })
    }
    
    // check if user already exists
    const { data: existingUser, error: existingUserErr } = await locals.supabase
      .from('user')
      .select('email, username')
      .or(`email.eq.${form.data.email},username.eq.${form.data.username}`)

    if (existingUserErr) {
      console.error(existingUserErr.message)
      return message(form, existingUserErr.message, { status: 500 })
    }

    if (existingUser.length ) {
      if (existingUser[0].email === form.data.email) {
        return setError(form, 'email', 'Email already exists.')
      }
      if (existingUser[0].username === form.data.username) {
        return setError(form, 'username', 'Username already exists.')
      }
    }

    // sign up with supabase
    const { data: user, error: signUpErr } = await locals.supabase.auth.signUp({
      email: form.data.email,
      password: form.data.password
    })

    if (signUpErr) {
      console.error(signUpErr.message)
      return message(form, signUpErr.message, { status: 500 })
    }

    if (!user) {
      return message(form, 'Error while signing up.', { status: 500 })
    }

    console.log(user)

    // write user data to user table
    const { error: userInsertErr } = await locals.supabase
      .from('user')
      .insert([{ 
        user_uid: user.user.id,
        email: form.data.email,
        username: form.data.username,
        avatar_id: form.data.avatar
      },
      ])
      .select()

    if (userInsertErr) {
      console.error(userInsertErr.message)
      return message(form, userInsertErr.message, { status: 500 })
    }

    return message(form, 'User signed up successfully. Please check your mails to validate your email address.')

    // console.log(data)

    // console.log(data)

    // console.log(data)
    // // if user signed up successfully, redirect to /swipe
    // throw redirect(303, '/swipe');
  }
};