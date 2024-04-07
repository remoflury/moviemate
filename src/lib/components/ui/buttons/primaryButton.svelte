<script lang="ts">
	import LoadingSpinner from '$lib/assets/loadingSpinner.svelte'

	export let type: 'button' | 'submit' | 'reset' = 'button'
	export let disabled: boolean = false
	export let text: string
</script>

<div class="grid place-content-center mt-8 first:mt-0">
	<button
		class="bg-turqoise px-12 py-2 text-white font-heading uppercase font-bold rounded-max transition flex items-center gap-x-4"
		class:bg-opacity-80={disabled}
		{type}
		{disabled}
		aria-disabled={disabled ? true : undefined}
	>
		{#if disabled}
			<LoadingSpinner color="white" />
		{/if}
		{text}
	</button>
</div>
