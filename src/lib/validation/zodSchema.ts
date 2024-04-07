import { z } from 'zod'

export const loginSchema = z.object({
	email: z
    .string({ required_error: 'Email is required.' })
    .email({ message: 'Invalid email.' }),
	password: z
		.string({ required_error: 'Password is required.' })
		.min(6, { message: 'Password must be at least 6 characters.' })
})

export type LoginSchema = typeof loginSchema

export const registerSchema = z.object({
	email: z
		.string({ required_error: 'Email is required.' })
		.email({ message: 'Invalid email.' }),
	username: z
		.string({ required_error: 'Username is required.' })
		.min(2, { message: 'Username must be at least 2 characters.' }),
	password: z
		.string({ required_error: 'Password is required.' })
		.min(6, { message: 'Password must be at least 6 characters.' }),
	passwordConfirm: z
		.string({ required_error: 'Password confirmation is required.' })
		.min(6, { message: 'Password confirmation must be at least 6 characters.' }),
	avatar: z
		.number({ required_error: 'Avatar is required.' })
		.positive({ message: 'Avatar must be a positive number.' })
		.min(1, { message: 'Avatar must be at least 1.' })
		.max(6, { message: 'Avatar must be at most 6.' })
		.step(1, { message: 'Avatar must be a whole number.' })
		
}).refine((data) => data.password === data.passwordConfirm, {
	message: "Passwords don't match",
	path: ["passwordConfirm"], // path of error
});

export type RegisterSchema = typeof registerSchema