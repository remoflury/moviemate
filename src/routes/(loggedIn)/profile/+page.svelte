<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import Avatar from '$lib/components/mates/avatar.svelte';
	import WatchlistCard from '$lib/components/cards/watchlistCard.svelte';
	export let data;

	console.log(data.movies);
</script>

<section class="container">
	<div class="flex flex-col items-center px-32 pb-10">
		<Avatar />
		<p class="info mt-4">Username??</p>
	</div>

	<h1>Watchlist</h1>

	<div class="grid grid-cols-3 gap-x-6 gap-y-10">
		{#each data.movies as movie, index (index)}
			<WatchlistCard content={movie} />
		{/each}
	</div>

	<form method="POST" action="/logout?/logout" use:enhance class="mt-8">
		<PrimaryButton text="Logout" />
	</form>
</section>
