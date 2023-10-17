<script lang="ts">
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { previousPath, showGoBack } from '$lib/stores/menu';
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import InputMessage from '$lib/components/inputMessage.svelte';
	import WatchlistCardadd from '$lib/components/cards/watchlistCardadd.svelte';

	export let data;

	let { movies_watchlist: watchlistMovieIds } = data.watchlist[0];
	let { movies_dismissed: dismissedMovieIds } = data.dismissedMovies[0];
	let searchResult: TMDBMovieByRecommendationProps[] = [];
	let errorMsg = '';
	let loadMoreCount: number = 1;

	$showGoBack = true;
	
	

	let searchInputElem: HTMLInputElement;
	let searchValue = '';

	// search movies on api
	const searchMovie = async (query: string): Promise<TMDBMovieByRecommendationProps[]> => {
		errorMsg = '';
		const response = await fetch(
			`${PUBLIC_APP_URL}/api/searchmovie?query=${query}&page=${loadMoreCount}`
		);
		const data = await response.json();

		if (data?.error) errorMsg = data.error;
		return searchResult = [...data.filter((movie:TMDBMovieByRecommendationProps)=>movie.poster_path)];
	};

// add Movie to Watchlist
	const addMovieToWatchlist = (movieId:string)=>{
		if(!watchlistMovieIds.includes(movieId)) watchlistMovieIds.push(movieId);
		watchlistMovieIds = [...watchlistMovieIds];
 	}

// remove Movie from Watchlist & add Movie to Dismissedlist
	const addMovieToDismissedlist = (movieId:string)=>{
		if(!dismissedMovieIds.includes(movieId)) dismissedMovieIds.push(movieId);
		dismissedMovieIds = [...dismissedMovieIds];

		if(watchlistMovieIds.includes(movieId)) {
			const index = watchlistMovieIds.indexOf(movieId);
			if(index>=0) watchlistMovieIds.splice(index, 1)
		} ;
		watchlistMovieIds = [...watchlistMovieIds];
 	}

// remove Movie from Watchlist and Dismissedlist
const removeMovieFromLists = (movieId:string)=>{

		if(watchlistMovieIds.includes(movieId)) {
			const index = watchlistMovieIds.indexOf(movieId);
			if(index>=0) watchlistMovieIds.splice(index, 1)
		} ;
		watchlistMovieIds = [...watchlistMovieIds];

		if(dismissedMovieIds.includes(movieId)) {
			const index = dismissedMovieIds.indexOf(movieId);
			if(index>=0) dismissedMovieIds.splice(index, 1)
		} ;
		dismissedMovieIds = [...dismissedMovieIds];
 	}



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

	<!-- // show movies -->


		{#if errorMsg}
			<InputMessage message={errorMsg} success={false} />
		{/if}

		{#if searchResult.length > 0}

		<div class="grid grid-cols-3 pt-10 gap-x-6 gap-y-10">
        {#each searchResult as movie (movie.title)}
		  <WatchlistCardadd on:addMovieToWatchlist={()=>addMovieToWatchlist(movie.id.toString())} on:addMovieToDismissedlist={()=>addMovieToDismissedlist(movie.id.toString())} on:removeMovieFromLists={()=>removeMovieFromLists(movie.id.toString())}  isInWatchlist={watchlistMovieIds.includes(movie.id.toString())} isInDismissedlist={dismissedMovieIds.includes(movie.id.toString())} content={movie} />
        {/each}
		</div>

    {/if}
	</form>
</section>
