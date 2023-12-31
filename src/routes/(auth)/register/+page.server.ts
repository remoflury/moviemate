import type { Actions, PageServerLoad } from './$types.js';
import {
	isEmailValid,
	isUsernameValid,
	isPasswordValid,
	isEmailAlreadyRegistered,
	isUsernameAlreadyRegistered,
	signUp,
	addUserToDB
} from '$lib/utils/authUtils.js';
import { redirect, error as pageError } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	register: async ({ locals, request }) => {
		const supabaseClient = locals.supabase;

		// grab form data
		const data = await request.formData();
		const email = data.get('email');
		const username = data.get('username');
		const password = data.get('password');
		const avatarId = Number(data.get('avatar')) || 1;

		let emailError;
		let usernameError;
		let passwordError;
		// validate email
		if (!isEmailValid(email)) emailError = 'Please enter a valid email address.';

		// validate username
		if (!isUsernameValid(username))
			usernameError = 'Please enter username with at least 3 or more characters and no whitespace';

		// validate password
		if (!isPasswordValid(password))
			passwordError = 'Please enter a password with at least 6 characters.';

		// error handling
		if (emailError || usernameError || passwordError)
			return {
				success: false,
				email,
				emailError,
				username,
				usernameError,
				password: '',
				passwordError,
				avatar: avatarId
			};

		// check if users email exists
		const emailAlreadyExists = await isEmailAlreadyRegistered(email, supabaseClient);

		// check if users username exists
		const usernameAlreadyExists = await isUsernameAlreadyRegistered(username, supabaseClient);

		// error handling
		if (!emailAlreadyExists.success || !usernameAlreadyExists.success)
			return {
				success: false,
				email,
				emailError: emailAlreadyExists.error,
				username,
				usernameError: usernameAlreadyExists.error,
				avatar: avatarId
			};

		// create user
		const signUpResult = await signUp(email, password, supabaseClient);
		if (!signUpResult.success) {
			throw pageError(500, 'Error registering user.');
		}
		const userId: string = signUpResult?.data?.user?.id || '';

		//write user to db
		const addUserToDBResult = await addUserToDB(email, username, userId, avatarId, supabaseClient);
		if (!addUserToDBResult.success) {
			throw pageError(500, 'Error registering user.');
		}

		return {
			success: true,
			email,
			username
		};
	}
};

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();

	// if user is logged in, redirect to /swipe
	if (session) {
		throw redirect(303, '/swipe');
	}
};
