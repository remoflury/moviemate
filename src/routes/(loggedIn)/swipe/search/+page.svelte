<script lang="ts">
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { showGoBack } from '$lib/stores/menu';
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import InputMessage from '$lib/components/inputMessage.svelte';

	export let data;

	const { movies_watchlist: watchlistMovieIds } = data.watchlist[0];
	const { movies_dismissed: dismissedMovieIds } = data.dismissedMovies[0];
	let searchResult: TMDBMovieByRecommendationProps[] = [];
	let errorMsg = '';

	$showGoBack = true;
	// console.log(watchlistMovieIds);
	// console.log(dismissedMovieIds);

	let searchInputElem: HTMLInputElement;
	let searchValue = '';

	// search movies on api
	const searchMovie = async (query: string): Promise<TMDBMovieByRecommendationProps[]> => {
		errorMsg = '';
		const response = await fetch(`${PUBLIC_APP_URL}/api/searchmovie?query=${query}`);
		const data = await response.json();

		if (data?.error) errorMsg = data.error;
		searchResult = [];
		console.log(data);
		return data;
	};

	onMount(() => {
		searchInputElem.focus();
	});
</script>

<section class="container">
	<h1 hidden>Search Movies</h1>

	<form
		on:input={() => searchMovie(searchValue)}
		on:submit|preventDefault={() => searchMovie(searchValue)}
		use:enhance
		method="POST"
	>
		<label for="search" hidden>Search Movie</label>
		<input
			bind:this={searchInputElem}
			bind:value={searchValue}
			class="search"
			placeholder="search movie"
			type="text"
			name="search"
			id="search"
		/>
		{#if errorMsg}
			<InputMessage message={errorMsg} success={false} />
		{/if}
	</form>
</section>
