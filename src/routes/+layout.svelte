<script lang="ts">
	import '../css/main.css';
	import { fade } from 'svelte/transition';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { bottomNavigationHeight } from '$lib/stores/menu';
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
