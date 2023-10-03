<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import Avatar from '$lib/components/mates/avatar.svelte';
	import WatchlistCard from '$lib/components/cards/watchlistCard.svelte';
	import { onMount } from 'svelte';
	import { showSettings } from '$lib/stores/menu.js';
	$showSettings = true;

	import type { TMDBMovieByIdrops } from '$lib/types/contentTypes.js';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import { PUBLIC_APP_URL } from '$env/static/public';
	// export let data;

	let limit = 12;
	let movies: TMDBMovieByIdrops[] = [];

	const fetchWatchlist = async () => {
		try {
			const response = await fetch(`${PUBLIC_APP_URL}/api/watchlist?limit=${limit}`);
			const data = await response.json();
			movies = [...movies, ...data];
			console.log(movies);
			return movies;
		} catch (error) {
			console.error(error);
		}
	};

	onMount(async () => {
		// movies = await fetchWatchlist();
	});

	// console.log(data.movies);
</script>

<section class="container">
	<form method="POST" action="/logout?/logout" use:enhance class="mt-8">
		<PrimaryButton text="Logout" />
	</form>
	<div class="flex flex-col items-center px-32 pb-10">
		<Avatar />
		<p class="info mt-4">Username??</p>
	</div>

	<h1>Watchlist</h1>
	{#await fetchWatchlist()}
		<LoadingSpinner />
	{:then data}
		{#if movies.length}
			<div class="grid grid-cols-3 gap-x-6 gap-y-10">
				{#each movies as movie, index (index)}
					<WatchlistCard content={movie} {index} />
				{/each}
			</div>
		{/if}
	{/await}
</section>
