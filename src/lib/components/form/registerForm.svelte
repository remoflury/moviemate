<script lang="ts">
	import type { RegisterSchema } from '$lib/validation/zodSchema'
	import type { SuperValidated, Infer } from 'sveltekit-superforms'
	import { superForm } from 'sveltekit-superforms'
	import { page } from '$app/stores'
	import Label from '../ui/form/label.svelte'
	import PrimaryButton from '../ui/buttons/primaryButton.svelte'
	import InputErr from '../ui/form/inputErr.svelte'
	import FormMessage from '../ui/form/formMessage.svelte'
	import AvatarSlider from '../avatar/avatarSlider.svelte'

	export let actionPath: string
	export let data: SuperValidated<Infer<RegisterSchema>>
	let currentAvatarIndex: number
	const { form, errors, enhance, constraints, delayed, message } = superForm(data, {
		onSubmit: ({ formData }) => {
			formData.set('avatar', currentAvatarIndex.toString())
		}
	})

	$: console.log(currentAvatarIndex)
</script>

<form action={actionPath} use:enhance method="POST">
	<Label label="Email" name="email" required={$constraints.email?.required} />
	<input
		type="text"
		placeholder="Email"
		name="email"
		aria-invalid={$errors.email ? 'true' : undefined}
		bind:value={$form.email}
		{...$constraints.email}
	/>

	{#if $errors.email}
		{#each $errors.email as error}
			<InputErr message={error} />
		{/each}
	{/if}

	<Label label="Username" name="username" required={$constraints.username?.required} />
	<input
		type="text"
		placeholder="Username"
		name="username"
		aria-invalid={$errors.username ? 'true' : undefined}
		bind:value={$form.username}
		{...$constraints.username}
	/>

	{#if $errors.username}
		{#each $errors.username as error}
			<InputErr message={error} />
		{/each}
	{/if}

	<Label label="Password" name="password" required={$constraints.password?.required} />
	<input
		type="password"
		placeholder="Password"
		name="password"
		aria-invalid={$errors.password ? 'true' : undefined}
		bind:value={$form.password}
		{...$constraints.password}
	/>
	{#if $errors.password}
		{#each $errors.password as error}
			<InputErr message={error} />
		{/each}
	{/if}

	<Label
		label="Confirm Password"
		name="passwordConfirm"
		required={$constraints.passwordConfirm?.required}
	/>
	<input
		type="password"
		placeholder="Confirm Password"
		name="passwordConfirm"
		aria-invalid={$errors.passwordConfirm ? 'true' : undefined}
		bind:value={$form.passwordConfirm}
		{...$constraints.passwordConfirm}
	/>
	{#if $errors.passwordConfirm}
		{#each $errors.passwordConfirm as error}
			<InputErr message={error} />
		{/each}
	{/if}

	<div class="max-w-3/4 mx-auto mt-8">
		<AvatarSlider on:currentAvatarIndex={(e) => (currentAvatarIndex = e.detail)} />
	</div>

	<PrimaryButton text="Sign Up" disabled={$delayed} />

	{#if $message}
		<FormMessage message={$message} success={$page.status < 400} />
	{/if}
</form>
