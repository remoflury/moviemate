<script lang="ts">
	import type { SearchSchema } from '$lib/validation/zodSchema'
	import type { SuperValidated, Infer } from 'sveltekit-superforms'
	import { superForm } from 'sveltekit-superforms'
	import Label from '$lib/components/ui/form/label.svelte'
	import { createEventDispatcher } from 'svelte'
	import InputErr from '../ui/form/inputErr.svelte'

	export let actionPath: string
	export let data: SuperValidated<Infer<SearchSchema>>
	export let placeholder: string = 'Search Movie'
	export let isSubmittable: boolean = true

	const dispatch = createEventDispatcher()

	const { form, enhance, errors, constraints } = superForm(data, {
		onSubmit: ({ cancel }) => {
			if (!isSubmittable) cancel()
		}
	})

	const handleChange = () => {
		dispatch('input', { query: $form.query })
	}
</script>

<form action={actionPath} use:enhance method="POST">
	<Label label={placeholder} name="query" hidden={true} required={$constraints.query?.required} />
	<input
		type="search"
		class="mb-4"
		{placeholder}
		name="query"
		aria-invalid={$errors.query ? 'true' : undefined}
		bind:value={$form.query}
		on:input={handleChange}
		{...$constraints.query}
	/>
</form>
