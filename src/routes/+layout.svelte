<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../css/main.css';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	let innerWidth: number;

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	$: if (innerWidth > 768) goto('/desktop');
</script>

<svelte:window bind:innerWidth />
<slot />
