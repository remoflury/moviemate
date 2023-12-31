<script lang="ts">
	import type { TMDBMovieByIdrops, TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { showSettings, showGoBack } from '$lib/stores/menu';
	import { watchlistCount } from '$lib/stores/watchlist.js';
	import { watchlist as movies } from '$lib/utils/profile';
	import Avatar from '$lib/components/mates/avatar.svelte';
	import WatchlistCard from '$lib/components/cards/watchlistCard.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import RemoveModal from '$lib/components/modal/removeModal.svelte';
	import { setPreviousPath } from '$lib/utils/moviesUtils.js';

	export let data;

	$showSettings = true;
	$showGoBack = false;

	let limit = 9;
	let offset = 0;
	let isLoadMoreAvailable: boolean = false;
	let loading: boolean = false;

	$watchlistCount = data.watchlistIds.length;

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
			$movies = [...$movies, ...data.movies];
			$movies = [...removeDuplicates($movies)];
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

	// if movies are removed from watchlist, there is a chance, that some movies will appear as duplicates
	// remove duplicates
	const removeDuplicates = <T extends TMDBMovieByIdrops | TMDBMovieByRecommendationProps>(
		array: T[]
	): T[] => {
		return array.reduce((acc: T[], current: T) => {
			const x = acc.find((item) => item.id === current.id);
			if (!x) {
				return acc.concat([current]);
			} else {
				return acc;
			}
		}, []);
	};

	onMount(() => {
		// reset store on new page load
		$movies = [];
	});
</script>

<section class="container relative">
	<div class="flex flex-col items-center px-28 pb-5">
		<Avatar avatarId={data.avatarId} />
		<p class="info mt-2">{$page.data.user.username}</p>
	</div>
	<section>
		<div class="flex gap-x-4 items-end">
			<h1 class="mb-0">Watchlist</h1>
			<p class="info">{$watchlistCount} Filme</p>
		</div>
	</section>

	{#await fetchWatchlist()}
		<div class="mt-4">
			<LoadingSpinner />
		</div>
	{:then}
		{#if $movies?.length}
			<div class="grid grid-cols-3 gap-x-6 gap-y-10">
				{#each $movies as movie, index (index)}
					<WatchlistCard content={movie} on:click={() => setPreviousPath($page.url.pathname)} />
				{/each}
			</div>
			{#if isLoadMoreAvailable && !loading}
				<button class="link text-sm mt-8" on:click={loadMoreMovies}> Load more </button>
			{/if}
			{#if loading}
				<div class="mt-8">
					<LoadingSpinner />
				</div>
			{/if}
		{:else}
			<p>To add movies to your watchlist, let's swipe some movies!</p>
		{/if}
	{/await}
	<RemoveModal />
</section>
