<script lang="ts">
	import { page } from '$app/stores';
	import PrimaryLink from '$lib/components/primaryLink.svelte';
</script>

<section class="container">
	<h1 class="mb-0">Ups, da lief etwas schief!</h1>
	<p class="text-white mt-2 text-sm">
		{$page.status}: {$page.error?.message}
	</p>
	<div class="mt-12">
		<PrimaryLink text="Zur Startseite" link="/" />
	</div>
</section>
