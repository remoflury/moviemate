<script lang="ts">
	import Nav from '$lib/components/nav.svelte'
	import { navHeight } from '$lib/stores/store'
</script>

<main style="margin-bottom: {$navHeight}px">
	<slot />
</main>
<Nav />
