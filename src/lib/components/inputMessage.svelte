<script lang="ts">
	import { slide } from 'svelte/transition';
	export let message: string;
	export let success: boolean = false;
</script>

{#key message}
	<div class="mt-1 block" transition:slide={{ duration: 200 }}>
		<p class="text-xs {success ? 'text-green' : 'text-red'}">{message}</p>
	</div>
{/key}
