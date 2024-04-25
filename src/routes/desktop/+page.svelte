<script lang="ts">
	import Logo from '$lib/assets/logo.svelte'
	import LegalFooter from '$lib/components/legalFooter.svelte'
	import { onMount } from 'svelte'

	let footerElem: HTMLDivElement
	let footerHeight: number

	onMount(() => {
		footerHeight = footerElem.clientHeight
	})

	function recalculateFooterHeight() {
		footerHeight = footerElem.clientHeight
	}
</script>

<svelte:window on:resize={recalculateFooterHeight} />

<section
	class="container flex gap-x-20 justify-center items-center"
	style:min-height={`calc(100dvh - ${footerHeight}px)`}
>
	<figure class="max-w-80">
		<Logo />
	</figure>
	<article class="basis-1/2">
		<h1>Hi Mate!</h1>
		<p class="text-lg">
			MovieMate is a web app that lets you create your own watchlist, discover new movies and team
			up with friends to find movies for your movie nights.
		</p>
		<p class="text-lg mt-4">
			Please open this page on a mobile device in chrome browser and install the app.
		</p>
	</article>
</section>
<div bind:this={footerElem} class="mt-auto">
	<LegalFooter />
</div>
