<script lang="ts">
	import type { LoginSchema } from '$lib/validation/zodSchema'
	import type { SuperValidated, Infer } from 'sveltekit-superforms'
	import { superForm } from 'sveltekit-superforms'
	import Label from '../ui/form/label.svelte'
	import PrimaryButton from '../ui/buttons/primaryButton.svelte'
	import InputErr from '../ui/form/inputErr.svelte'
	import FormMessage from '../ui/form/formMessage.svelte'
	import { page } from '$app/stores'

	export let actionPath: string
	export let data: SuperValidated<Infer<LoginSchema>>

	const { form, errors, enhance, constraints, delayed, message } = superForm(data)

	$: console.log($message)
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

	<PrimaryButton text="Login" disabled={$delayed} />

	{#if $message}
		<FormMessage message={$message} success={$page.status < 400} />
	{/if}
</form>
