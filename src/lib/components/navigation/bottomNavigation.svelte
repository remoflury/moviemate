<script lang="ts">
	import { onMount } from 'svelte';
	import { bottomNavigationHeight } from '$lib/stores/menu';
	import MateIcon from '$lib/components/icons/mateIcon.svelte';
	import ProfileIcon from '$lib/components/icons/profileIcon.svelte';
	import SwipeIcon from '$lib/components/icons/swipeIcon.svelte';

	let navElem: HTMLElement;
	onMount(() => ($bottomNavigationHeight = navElem.clientHeight));
</script>

<nav
	bind:this={navElem}
	aria-label="main navigation"
	class="fixed bottom-0 left-0 right-0 bg-black py-5"
>
	<div class="container flex gap-x-8 justify-between items-center px-12">
		<a class="max-w-[2rem]" href="/profile" title="go to profile">
			<ProfileIcon />
		</a>
		<a class="max-w-[2rem]" href="/swipe" title="go to swipe screen">
			<SwipeIcon />
		</a>
		<a class="max-w-[2.5rem]" href="/mate" title="go to mate screen">
			<MateIcon />
		</a>
	</div>
</nav>
