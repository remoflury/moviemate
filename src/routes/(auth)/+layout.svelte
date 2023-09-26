<script lang="ts">
	import { bottomNavigationHeight } from '$lib/stores/menu';
	import { onMount } from 'svelte';

	onMount(() => {
		$bottomNavigationHeight = 0;
	});
</script>

<slot />
