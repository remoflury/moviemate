<script lang="ts">
	export let text: string
	export let href: string
	export let target: '_blank' | '_self' = '_self'
</script>

<article class="grid place-content-center mt-12 first:mt-0">
	<a class="text-center text-sm underline underline-offset-2 text-turqoise" {href} {target}
		>{text}</a
	>
</article>
