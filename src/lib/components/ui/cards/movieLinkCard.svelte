<script lang="ts">
	export let href: string
	export let src: string
	export let alt: string
</script>

<a {href}>
	<figure class="aspect-3/4 w-full rounded-lg overflow-hidden {$$props.class}">
		<img class="object-cover object-center w-full h-full" {src} {alt} />
	</figure>
</a>
