<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let text: string;

	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => {
		dispatch('press');
	}}
	class="border border-gray-light bg-white px-6 py-2 rounded-max active:bg-primary active:border-primary group transition"
>
	<p class="text-black font-heading group-active:text-white">{text}</p>
</button>
