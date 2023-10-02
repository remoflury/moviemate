<script lang="ts">
	import '../css/main.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { bottomNavigationHeight, previousPath } from '$lib/stores/menu';
	import LogoHeader from '$lib/components/logoHeader.svelte';
	import { goto, afterNavigate } from '$app/navigation';


import { base } from '$app/paths'

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


$previousPath = base ;

afterNavigate(({from}) => {
   $previousPath = from?.url.pathname || $previousPath
}) 


</script>

<svelte:head>
	<title>Movie Mate</title>
	
</svelte:head>

<main
	class="relative min-h-screen overflow-hidden"
	style={`padding-bottom: ${$bottomNavigationHeight + 20}px`}
>	

	<LogoHeader/>
	<slot />
</main>
