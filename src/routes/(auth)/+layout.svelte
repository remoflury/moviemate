<script lang="ts">
	import { bottomNavigationHeight, previousPath } from '$lib/stores/menu';
	import { onMount } from 'svelte';

	onMount(() => {
		$bottomNavigationHeight = 0;
	});

	$previousPath.params = '';
</script>

<slot />
