<script lang="ts">
	import type { SuperValidated, Infer } from 'sveltekit-superforms'
	import type { MovieIdSchema } from '$lib/validation/zodSchema'
	import { browser } from '$app/environment'
	import { onDestroy, onMount } from 'svelte'
	import { superForm } from 'sveltekit-superforms'
	import { createEventDispatcher } from 'svelte'
	import { fly } from 'svelte/transition'
	import { TRANSITION } from '$lib/utils/constants'
	import type { MovieByIdProps } from '$lib/types/TMDB'
	import PrimaryButton from '../ui/buttons/primaryButton.svelte'

	export let data: SuperValidated<Infer<MovieIdSchema>>
	export let actionPath: string
	export let isShown: boolean = false
	export let movie: MovieByIdProps
	let scrollY = 0

	const dispatch = createEventDispatcher()

	const closeModal = () => {
		dispatch('closeModal')
	}

	const successfulRemoval = () => {
		dispatch('successfulRemoval')
		closeModal()
	}

	const { form, errors, enhance, delayed } = superForm(data, {
		id: Math.random().toString(),
		onSubmit: ({ formData }) => {
			formData.set('movieId', movie.id.toString())
		},
		onUpdate: ({ result }) => {
			if (result.status >= 400) return
			successfulRemoval()
		}
	})

	$: if (browser) document.body.classList.toggle('overflow-y-hidden', isShown)
</script>

<svelte:window bind:scrollY />
{#if isShown}
	<div
		class="absolute left-0 right-0 bottom-0 bg-blue bg-opacity-40 -translate-y-1/2 min-h-dvh before:absolute before:top-0 before:left-0 before:right-0 before:h-40 before:-translate-y-full before:bg-gradient-to-b before:from-transparent before:to-blue before:opacity-40"
		transition:fly={{ ...TRANSITION, y: 80 }}
		style="top: calc({scrollY}px + 50dvh)"
	>
		<div class="container h-full grid place-content-center">
			<form
				class="bg-white text-blue rounded-lg p-4 py-6 relative"
				action={actionPath}
				method="POST"
				use:enhance
			>
				<p class="font-bold text-center">
					Are you sure to remove "{movie.title}" from your watchlist?
				</p>
				<div class="flex gap-x-4 flex-wrap justify-center mt-6">
					<PrimaryButton text="no" type="button" on:click={closeModal} color="white" />
					<PrimaryButton text="yes" class="!mt-0" color="blue" disabled={$delayed} />
				</div>
			</form>
		</div>
	</div>
{/if}
