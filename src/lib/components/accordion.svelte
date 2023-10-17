<script lang="ts">
	export let title: string;
	import { slide } from 'svelte/transition';
	let isOpen = false;
</script>

<article>
	<button on:click={() => (isOpen = !isOpen)} class="flex gap-x-4 items-center cursor-pointer">
		<div class="mb-4 transition {isOpen ? 'rotate-90' : ''}">
			<svg xmlns="http://www.w3.org/2000/svg" width="8.576" height="15" viewBox="0 0 8.576 15"
				><path
					id="Icon_Pfeil_gerade"
					data-name="Icon Pfeil gerade"
					d="M13.836,13.692l5.676-5.671a1.072,1.072,0,0,0-1.518-1.514l-6.43,6.426a1.07,1.07,0,0,0-.031,1.478l6.457,6.47a1.072,1.072,0,0,0,1.518-1.514Z"
					transform="translate(19.826 21.194) rotate(180)"
					fill="#2ec4b6"
				/></svg
			>
		</div>
		<h2>{title}</h2>
	</button>
	{#if isOpen}
		<div transition:slide={{ duration: 350 }}>
			<slot />
		</div>
	{/if}
</article>
