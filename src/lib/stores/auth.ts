import type { SupabaseClient } from '@supabase/supabase-js';

export const signUp = async (
	email: string | FormDataEntryValue | null,
	password: string | FormDataEntryValue | null,
	supabaseClient: SupabaseClient
) => {
	if (!email || !password) {
		return {
			success: false,
			error: 'Email or Passsword is missing.'
		};
	}
	const { data, error } = await supabaseClient.auth.signUp({
		email: email.toString(),
		password: password.toString()
	});

	if (error) {
		return {
			success: false,
			error: error.message as string
		};
	}
	// add row for users_movies
	const { error: movieError } = await supabaseClient
		.from('Users_movies')
		.insert({ movies_users_id: data?.user?.id });

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

export const signIn = async (
	email: string,
	redirectUrl: string,
	supabaseClient: SupabaseClient
) => {
	const { data, error } = await supabaseClient.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: redirectUrl
		}
	});

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
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email: email.toString(),
		password: password.toString()
	});

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
	const { error } = await supabaseClient.auth.signOut();
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
	const { data, error } = await supabaseClient
		.from('Users_details')
		.select('users_email')
		.eq('users_email', email);

	if (error) {
		return {
			success: false,
			error: error.message
		};
	}

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
	const { data, error } = await supabaseClient
		.from('Users_details')
		.select('users_username')
		.eq('users_username', username);

	if (error) {
		return {
			success: false,
			error: error.message
		};
	}

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
	const { data, error } = await supabaseClient
		.from('Users_details')
		.select('users_email')
		.eq('users_email', email);

	if (error) {
		return {
			success: false,
			error: error.message
		};
	}

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
	supabaseClient: SupabaseClient
) => {
	const { error } = await supabaseClient.from('Users_details').insert({
		users_email: email,
		users_username: username,
		users_id: userId
	});

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
	if (!email) return false;
	email = email.toString();
	if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true;
	}
	return false;
};

export const isUsernameValid = (username: string | FormDataEntryValue | null): boolean => {
	if (!username) return false;
	username = username.toString();
	// check for whitespace
	if (username.indexOf(' ') >= 0) return false;

	// check for length
	if (username.length < 4) return false;

	return true;
};

export const isPasswordValid = (password: string | FormDataEntryValue | null): boolean => {
	if (!password) return false;
	password = password.toString();
	if (password.length < 6) return false;
	return true;
};
