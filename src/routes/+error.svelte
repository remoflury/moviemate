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
		<PrimaryLink
			text={$page.status == 401 ? 'Login' : 'Zur Startseite'}
			link={$page.status == 401 ? '/login' : '/'}
		/>
	</div>
</section>
