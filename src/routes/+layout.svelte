<script lang="ts">
	import '../css/main.css';
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { invalidate, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { bottomNavigationHeight, previousPath } from '$lib/stores/menu';
	import LogoHeader from '$lib/components/logoHeader.svelte';
	import { page } from '$app/stores';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	$previousPath.path = base;

	afterNavigate(({ from }) => {
		$previousPath.path = from?.url.pathname || $previousPath.path;
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
		<LogoHeader />
		<slot />
	</main>
{/key}
