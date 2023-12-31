<script lang="ts">
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { previousPath, showGoBack } from '$lib/stores/menu';
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import InputMessage from '$lib/components/inputMessage.svelte';
	import WatchlistCardadd from '$lib/components/cards/watchlistCardadd.svelte';
	import { page } from '$app/stores';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import { fade } from 'svelte/transition';
	import { setPreviousPath } from '$lib/utils/moviesUtils.js';

	export let data;

	let { movies_watchlist: watchlistMovieIds } = data.watchlist[0];
	let { movies_dismissed: dismissedMovieIds } = data.dismissedMovies[0];
	let searchResult: TMDBMovieByRecommendationProps[] = [];
	let loading: boolean = false;
	let errorMsg: string = '';
	let showMoreCount: number = 1;
	let total_pages: number;
	let total_results: number;
	$showGoBack = true;
	$previousPath.path = '/swipe';

	$: if (errorMsg) searchResult = [];

	let searchInputElem: HTMLInputElement;
	let searchValue = '';

	// search movies on api
	const searchMovie = async (query: string): Promise<TMDBMovieByRecommendationProps[]> => {
		setSearchParams(query);
		errorMsg = '';
		const response = await fetch(
			`${PUBLIC_APP_URL}/api/searchmovie?query=${query}&page=${showMoreCount}`
		);
		const data = await response.json();

		if (data?.error) errorMsg = data.error;
		({ total_pages, total_results } = data);
		return data.results as TMDBMovieByRecommendationProps[];
	};

	const clearSearch = () => {
		searchValue = '';
		searchResult = [];
	};

	// filter out movies without poster
	const filterSearchResults = () => {
		searchResult = [
			...searchResult.filter((movie: TMDBMovieByRecommendationProps) => movie.poster_path)
		];
	};

	// set searchParams in URL
	const setSearchParams = (query: string) => {
		const url = new URL($page.url);
		const searchParams = new URLSearchParams(url.search);

		// Update or set the "search" search param
		searchParams.set('search', query);

		// Update the URL
		url.search = searchParams.toString();

		// Push the new URL to the browser history
		history.pushState({}, '', url.toString());
		$previousPath.params = `?search=${query}`;
	};

	// add Movie to Watchlist
	const addMovieToWatchlist = async (movieId: string) => {
		if (!watchlistMovieIds.includes(movieId)) watchlistMovieIds.push(movieId);
		watchlistMovieIds = [...watchlistMovieIds];

		// write the change to the db
		try {
			const response = await fetch(`${PUBLIC_APP_URL}/api/watchlist/add?movieid=${movieId}`);
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
	};

	// remove Movie from Watchlist & add Movie to Dismissedlist
	const addMovieToDismissedlist = async (movieId: string) => {
		if (!dismissedMovieIds.includes(movieId)) dismissedMovieIds.push(movieId);
		dismissedMovieIds = [...dismissedMovieIds];

		if (watchlistMovieIds.includes(movieId)) {
			const index = watchlistMovieIds.indexOf(movieId);
			if (index >= 0) watchlistMovieIds.splice(index, 1);
		}
		watchlistMovieIds = [...watchlistMovieIds];

		// write the change to the db
		try {
			const response = await fetch(`${PUBLIC_APP_URL}/api/watchlist/remove?movieid=${movieId}`);
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
	};

	// remove Movie from Watchlist and Dismissedlist
	const removeMovieFromLists = async (movieId: string) => {
		if (watchlistMovieIds.includes(movieId)) {
			const index = watchlistMovieIds.indexOf(movieId);
			if (index >= 0) watchlistMovieIds.splice(index, 1);
		}
		watchlistMovieIds = [...watchlistMovieIds];

		if (dismissedMovieIds.includes(movieId)) {
			const index = dismissedMovieIds.indexOf(movieId);
			if (index >= 0) dismissedMovieIds.splice(index, 1);
		}
		dismissedMovieIds = [...dismissedMovieIds];

		// write the change to the db
		try {
			const response = await fetch(`${PUBLIC_APP_URL}/api/watchlist/clear?movieid=${movieId}`);
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
	};

	const handleShowMore = async () => {
		loading = true;
		showMoreCount++;
		// searchResult = [...searchResult, ...(await searchMovie(searchValue))];
		searchResult = [...searchResult, ...(await searchMovie(searchValue))];
		filterSearchResults();
		loading = false;
	};

	onMount(async () => {
		searchInputElem.focus();

		// if search value exists from search params, get search result
		searchValue = $page.url.searchParams.get('search') || '';
		if (searchValue) {
			searchResult = [...(await searchMovie(searchValue))];
			filterSearchResults();
		}
	});
</script>

<section class="container">
	<h1 hidden>Search Movies</h1>

	<form
		on:input={async () => {
			searchResult = [...(await searchMovie(searchValue))];
			filterSearchResults();
		}}
		on:submit|preventDefault={() => searchMovie(searchValue)}
	>
		<label for="search" hidden>Search Movie</label>
		<div class="relative">
			<input
				bind:this={searchInputElem}
				bind:value={searchValue}
				class="search"
				placeholder="search movie"
				type="text"
				name="search"
				id="search"
			/>
			<button
				transition:fade={{ duration: 350 }}
				type="button"
				on:click={clearSearch}
				class="absolute top-1/2 right-2.5 transform -translate-y-1/2 border-none cursor-pointer"
			>
				{#if searchValue}
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
						><path
							class="fill-black"
							d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
						/></svg
					>
				{/if}
			</button>
		</div>

		{#if errorMsg}
			<InputMessage message={errorMsg} success={false} />
		{/if}

		{#if searchResult.length > 0}
			<p class="info mt-4 text-center">{total_results} Resultate</p>
			<div class="grid grid-cols-3 pt-8 gap-x-6 gap-y-10">
				{#each searchResult as movie, index (index)}
					<WatchlistCardadd
						on:click={() => setPreviousPath($page.url.pathname)}
						on:addMovieToWatchlist={() => addMovieToWatchlist(movie.id.toString())}
						on:addMovieToDismissedlist={() => addMovieToDismissedlist(movie.id.toString())}
						on:removeMovieFromLists={() => removeMovieFromLists(movie.id.toString())}
						isInWatchlist={watchlistMovieIds.includes(movie.id.toString())}
						isInDismissedlist={dismissedMovieIds.includes(movie.id.toString())}
						content={movie}
					/>
				{/each}
			</div>
		{:else if !searchResult.length && searchValue}
			<p class="text-sm mt-8 text-center">
				There are no movies with your search: <span class="italic">{searchValue}</span>
			</p>
		{/if}
	</form>

	{#if !loading && showMoreCount < total_pages}
		<button class="link text-sm mt-8" on:click={async () => handleShowMore()}> show more </button>
	{:else if !loading && showMoreCount >= total_pages}
		<p class="text-sm mt-8 text-center">No more movies available</p>
	{:else if loading}
		<div class="grid place-items-center mt-4">
			<LoadingSpinner />
		</div>
	{/if}
</section>
