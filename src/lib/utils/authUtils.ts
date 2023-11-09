import type { SupabaseClient } from '@supabase/supabase-js';

export const signUp = async (
	email: string | FormDataEntryValue | null,
	password: string | FormDataEntryValue | null,
	supabaseClient: SupabaseClient
) => {
	// error handling
	if (!email || !password) {
		return {
			success: false,
			error: 'Email or Passsword is missing.'
		};
	}

	// signup to supabase db
	const { data, error } = await supabaseClient.auth.signUp({
		email: email.toString(),
		password: password.toString()
	});

	// error handling
	if (error) {
		return {
			success: false,
			error: error.message as string
		};
	}

	// add row to table users_movies
	const { error: movieError } = await supabaseClient
		.from('Users_movies')
		.insert({ movies_users_id: data?.user?.id });

	// error handling
	if (movieError) {
		return {
			success: false,
			error: movieError.message as string
		};
	}

	return {
		success: true,
		data
	};
};

// not used: Sign in with magic Link
export const signIn = async (
	email: string,
	redirectUrl: string,
	supabaseClient: SupabaseClient
) => {
	// signin to supabase db (with magic link)
	const { data, error } = await supabaseClient.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: redirectUrl
		}
	});

	// errr handling
	if (error) {
		return {
			success: false,
			error: error.message
		};
	}

	return {
		success: true,
		data
	};
};

export const signInWithPassword = async (
	email: string | FormDataEntryValue,
	password: string | FormDataEntryValue,
	supabaseClient: SupabaseClient
) => {
	// sign in with password to supabase db
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email: email.toString(),
		password: password.toString()
	});

	// error handling
	if (error)
		return {
			success: false,
			error: error.message
		};

	return {
		success: true,
		data
	};
};

export const signOut = async (supabaseClient: SupabaseClient) => {
	// sign out to supabase db
	const { error } = await supabaseClient.auth.signOut();
	// error handling
	if (error) {
		return {
			success: false,
			error: error.message
		};
	}

	return {
		success: true
	};
};

export const isEmailAlreadyRegistered = async (
	email: string | FormDataEntryValue | null,
	supabaseClient: SupabaseClient
) => {
	// fetch users_email from supabase
	const { data, error } = await supabaseClient
		.from('Users_details')
		.select('users_email')
		.eq('users_email', email);

	// error handling
	if (error) {
		return {
			success: false,
			error: error.message
		};
	}

	// check if users_email already exists
	if (data.length > 0) {
		return {
			success: false,
			error: 'A user with this email already exists.'
		};
	}

	return {
		success: true
	};
};

export const isUsernameAlreadyRegistered = async (
	username: string | FormDataEntryValue | null,
	supabaseClient: SupabaseClient
) => {
	// fetch users_username from supabase
	const { data, error } = await supabaseClient
		.from('Users_details')
		.select('users_username')
		.eq('users_username', username);

	// error handling
	if (error) {
		return {
			success: false,
			error: error.message
		};
	}

	// check if users_username already exists
	if (data.length > 0) {
		return {
			success: false,
			error: 'A user with this username already exists.'
		};
	}

	return {
		success: true
	};
};

export const isUserExisting = async (
	email: string | FormDataEntryValue | null,
	supabaseClient: SupabaseClient
) => {
	// check if user even existists, fetch to supabase db
	const { data, error } = await supabaseClient
		.from('Users_details')
		.select('users_email')
		.eq('users_email', email);

	// error handling
	if (error) {
		return {
			success: false,
			error: error.message
		};
	}

	//  check if users_email exists
	if (data.length === 0) {
		return {
			success: false,
			error: 'A user with this email does not exist.'
		};
	}

	return {
		success: true
	};
};

export const addUserToDB = async (
	email: string | FormDataEntryValue | null,
	username: string | FormDataEntryValue | null,
	userId: string,
	avatarId: number,
	supabaseClient: SupabaseClient
) => {
	// insert user to supabase, table Users_details
	const { error } = await supabaseClient.from('Users_details').insert({
		users_email: email,
		users_username: username,
		users_avatar: avatarId,
		users_id: userId
	});

	// error handling
	if (error) {
		return {
			success: false,
			error: error.message
		};
	}

	return {
		success: true
	};
};

export const isEmailValid = (email: string | FormDataEntryValue | null): boolean => {
	// check if email is valid
	if (!email) return false;
	email = email.toString();
	if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true;
	}
	return false;
};

export const isUsernameValid = (username: string | FormDataEntryValue | null): boolean => {
	// check if username is valid
	if (!username) return false;
	username = username.toString();
	// check for whitespace
	if (username.indexOf(' ') >= 0) return false;

	// check for length
	if (username.length < 4) return false;

	return true;
};

export const isPasswordValid = (password: string | FormDataEntryValue | null): boolean => {
	// check if password is not empty, and has a length of at least 6 characters
	if (!password) return false;
	password = password.toString();
	if (password.length < 6) return false;
	return true;
};
