<script lang="ts">
	// import LoadingSpinner from '$lib/assets/loadingSpinner.svelte'
	import LoadingSpinner from '$lib/components/ui/general/loadingSpinner.svelte'
	import { createEventDispatcher } from 'svelte'

	export let type: 'button' | 'submit' | 'reset' = 'submit'
	export let disabled: boolean = false
	export let text: string
	export let color: 'turqoise' | 'white' | 'blue' = 'turqoise'

	const dispatch = createEventDispatcher()

	const handleClick = () => {
		dispatch('click')
	}
</script>

<div class="grid place-content-center mt-8 first:mt-0 {$$props.class}">
	<button
		class=" px-12 py-2 font-heading uppercase font-bold rounded-max transition flex items-center gap-x-4 border"
		class:bg-opacity-80={disabled}
		class:turqoise={color === 'turqoise'}
		class:white={color === 'white'}
		class:blue={color === 'blue'}
		{type}
		{disabled}
		aria-disabled={disabled ? true : undefined}
		on:click={handleClick}
	>
		{#if disabled}
			<LoadingSpinner />
		{/if}
		{text}
	</button>
</div>

<style lang="postcss">
	.turqoise {
		@apply bg-turqoise text-white border-turqoise;
	}

	.white {
		@apply bg-white text-blue border-blue;
	}

	.blue {
		@apply bg-blue text-white border-white;
	}
</style>
