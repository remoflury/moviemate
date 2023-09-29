<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import Avatar from '$lib/components/mates/avatar.svelte';

</script>

<section class="container">
	<div class="flex flex-col items-center px-32 pb-10">
			<Avatar />
	<p class="info mt-4">Username??</p>
</div>

	<h1>Watchlist</h1>

	{#if $page.data.session}
		<form method="POST" action="/logout?/logout" use:enhance class="mt-8">
			<PrimaryButton text="Logout" />
		</form>
	{/if}

</section>
