<script lang="ts">
	import RemoveFromWatchlistForm from '$lib/components/form/removeFromWatchlistForm.svelte'

	export let href: string
	export let src: string
	export let alt: string
</script>

<a {href} class="inline-block {$$props.class}">
	<figure class="aspect-3/4 w-full rounded-lg overflow-hidden">
		<img class="object-cover object-center w-full h-full" {src} {alt} />
	</figure>

	<slot />
</a>
