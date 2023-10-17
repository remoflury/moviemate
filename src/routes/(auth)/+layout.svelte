<script lang="ts">
	import { bottomNavigationHeight, previousPath } from '$lib/stores/menu';
	import { onMount } from 'svelte';
	import LogoHeader from '$lib/components/logoHeader.svelte';

	onMount(() => {
		$bottomNavigationHeight = 0;
	});

	$previousPath.params = '';
</script>

<LogoHeader />
<slot />
