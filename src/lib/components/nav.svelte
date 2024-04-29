<script lang="ts">
	import { page } from '$app/stores'
	import MateIcon from '$lib/assets/mateIcon.svelte'
	import SwipeIcon from '$lib/assets/swipeIcon.svelte'
	import ProfileIcon from '$lib/assets/profileIcon.svelte'
	import { onMount } from 'svelte'
	import { navHeight } from '$lib/stores/store'

	let navElem: HTMLElement

	$: firstUriSegment = $page.url.pathname.split('/')[1]

	const setNavHeight = () => {
		$navHeight = navElem.offsetHeight
	}

	onMount(() => {
		setNavHeight()
	})
</script>

<svelte:window on:resize={setNavHeight} />

<nav class="fixed bottom-0 left-0 right-0" bind:this={navElem}>
	<div class="container flex justify-evenly items-center gap-x-4 py-6 bg-blue">
		<a class="max-w-[2rem]" href="/profile">
			<ProfileIcon isActive={firstUriSegment === 'profile'} />
		</a>
		<a class="max-w-[2rem]" href="/swipe">
			<SwipeIcon isActive={firstUriSegment === 'swipe'} />
		</a>
		<a class="max-w-[2.5rem]" href="/mate">
			<MateIcon isActive={firstUriSegment === 'mate'} />
		</a>
	</div>
</nav>
