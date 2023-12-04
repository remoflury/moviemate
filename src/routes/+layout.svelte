<script lang="ts">
	import '../css/main.css';
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { invalidate, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { bottomNavigationHeight, previousPath } from '$lib/stores/menu';
	import { page } from '$app/stores';
	import { dev } from '$app/environment';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		navigator.serviceWorker.register('/service-worker.js', {
			type: dev ? 'module' : 'classic'
		});
		// check supabase state of auth
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	// set previous path, for back navigation on some pages
	// $previousPath.path = base;
	// afterNavigate(({ from, to }) => {
	// 	if (to?.url.pathname == '/swipe') {
	// 		document.body.classList.add('overflow-y-hidden');
	// 	} else {
	// 		document.body.classList.remove('overflow-y-hidden');
	// 	}

	// 	if (from?.url.pathname.includes('/mate/findmovies/')) {
	// 		$previousPath.path = '/mate';
	// 	} else {
	// 		$previousPath.path = from?.url.pathname || $previousPath.path;
	// 	}
	// });
</script>

<svelte:head>
	<title>Movie Mate</title>
</svelte:head>

{#key $page.url.pathname}
	<main
		in:fade={{ duration: 250 }}
		class="relative min-h-screen overflow-hidden"
		style={`padding-bottom: ${$bottomNavigationHeight + 20}px`}
	>
		<slot />
	</main>
{/key}
