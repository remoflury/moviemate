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
	import { fade } from 'svelte/transition';

	let limit = 9;
	let offset = 0;
	let movies: TMDBMovieByIdrops[] = [];
	let isLoadMoreAvailable: boolean = false;
	let loading: boolean = false;

	// fetch all movies from watchlist via api endpoint
	const fetchWatchlist = async () => {
		try {
			const response = await fetch(
				`${PUBLIC_APP_URL}/api/watchlist?limit=${limit}&offset=${offset}`
			);
			const data: {
				isLoadMoreAvailable: boolean;
				movies: TMDBMovieByIdrops[];
			} = await response.json();
			isLoadMoreAvailable = data.isLoadMoreAvailable;
			// spread existing movies and new movies into same movies array
			movies = [...movies, ...data.movies];
			return movies;
		} catch (error) {
			console.error(error);
		}
	};

	const loadMoreMovies = async () => {
		loading = true;
		offset += 9;
		await fetchWatchlist();
		loading = false;
	};
</script>

<section class="container">
	<form method="POST" action="/logout?/logout" use:enhance class="mt-8">
		<PrimaryButton text="Logout" />
	</form>
	<div class="flex flex-col items-center px-32 pb-10">
		<Avatar />
		<p class="info mt-4">{$page.data.user.username}</p>
	</div>

	<h1>Watchlist</h1>
	{#await fetchWatchlist()}
		<LoadingSpinner />
	{:then}
		{#if movies?.length}
			<div class="grid grid-cols-3 gap-x-6 gap-y-10">
				{#each movies as movie, index (index)}
					<WatchlistCard content={movie} {index} />
				{/each}
			</div>
			{#if isLoadMoreAvailable}
				<button class="mt-8" transition:fade={{ duration: 350 }} on:click={loadMoreMovies}>
					Load more
				</button>
			{/if}
			{#if loading}
				<LoadingSpinner />
			{/if}
		{/if}
	{/await}
</section>
