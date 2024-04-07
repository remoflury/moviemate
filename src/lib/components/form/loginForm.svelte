<script lang="ts">
	import type { LoginSchema } from '$lib/validation/zodSchema'
	import type { SuperValidated, Infer } from 'sveltekit-superforms'
	import { superForm } from 'sveltekit-superforms'
	import Label from '../ui/form/label.svelte'
	import PrimaryButton from '../ui/buttons/primaryButton.svelte'

	export let data: SuperValidated<Infer<LoginSchema>>

	const { form, errors, enhance, constraints, delayed } = superForm(data)
	export let actionPath: string
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

	<Label label="Password" name="password" required={$constraints.password?.required} />
	<input
		type="text"
		placeholder="Password"
		name="password"
		aria-invalid={$errors.password ? 'true' : undefined}
		bind:value={$form.password}
		{...$constraints.password}
	/>

	<PrimaryButton text="Login" disabled={$delayed} />
</form>
