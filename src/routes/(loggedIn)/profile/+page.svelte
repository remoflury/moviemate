<script lang="ts">
	import type { TMDBMovieByIdrops } from '$lib/types/contentTypes';
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { showSettings, showGoBack } from '$lib/stores/menu';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import Avatar from '$lib/components/mates/avatar.svelte';
	import WatchlistCard from '$lib/components/cards/watchlistCard.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import RemoveModal from '$lib/components/modal/removeModal.svelte';

	$showSettings = true;
	$showGoBack = false;

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

<section class="container relative">
	<div class="flex flex-col items-center px-28 pb-5">
		<Avatar />
		<p class="info mt-4">{$page.data.user.username}</p>
	</div>
	<div class="pb-10">
		<form method="POST" action="/logout?/logout" use:enhance class="mt-8">
			<PrimaryButton text="Logout" />
		</form>
	</div>

	<h1>Watchlist</h1>
	{#await fetchWatchlist()}
		<div class="mt-4">
			<LoadingSpinner />
		</div>
	{:then}
		{#if movies?.length}
			<div class="grid grid-cols-3 gap-x-6 gap-y-10">
				{#each movies as movie, index (index)}
					<WatchlistCard content={movie} {index} />
				{/each}
			</div>
			{#if isLoadMoreAvailable && !loading}
				<button class="link text-sm mt-8" on:click={loadMoreMovies}> Load more </button>
			{/if}
			{#if loading}
				<div class="mt-4">
					<LoadingSpinner />
				</div>
			{/if}
		{:else}
			<p>To add movies to your watchlist, let's swipe some movies!</p>
		{/if}
	{/await}
	<RemoveModal />
</section>
