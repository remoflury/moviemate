<script lang="ts">
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes.js';
	import { generateRandomIndex } from '$lib/utils/moviesUtils.js';
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { fade } from 'svelte/transition';
	import SwipeCard from '$lib/components/cards/swipeCard.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import { onMount } from 'svelte';

	export let data;
	const movies = data.movies;
	// console.log(data.movies);

	let moreMovies: TMDBMovieByRecommendationProps[] = [];
	let initialMoviesDone: boolean = false;
	let loading: boolean = false;

	// $: console.log(moreMovies);

	let countIndex = 0;

	const fetchMoreMovies = async () => {
		const randomIndex = generateRandomIndex(movies);
		const response = await fetch(
			`${PUBLIC_APP_URL}/api/recommendations?movieId=${movies[randomIndex].id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		const data: TMDBMovieByRecommendationProps[] = await response.json();

		return data;
	};

	const onSwipe = async () => {
		countIndex = countIndex + 1;
		console.log('countIndex ', countIndex);
		console.log('movies.length ', movies.length);

		// if no more movies are available, load more movies
		//TODO: what if the loaded more movies are swept? how are more loaded?
		if (countIndex + 1 === movies.length) {
			loading = true;
			try {
				moreMovies = await fetchMoreMovies();
			} catch (error) {
				throw new Error('An error occured while loading more movies');
			}
			loading = false;
			countIndex = 0;
			initialMoviesDone = true;
		}
	};
</script>

<section class="container">
	<h1 hidden>Swipe</h1>
	<div class="relative">
		<!-- for initially loaded movies -->
		{#each movies as movie, index (index)}
			{#if index === countIndex && !initialMoviesDone}
				<div in:fade={{ duration: 350 }}>
					<SwipeCard {movie} {index} on:swipeRight={onSwipe} on:swipeLeft={onSwipe} />
				</div>
			{/if}
		{/each}
		<!-- for more loaded movies -->
		{#if moreMovies.length && initialMoviesDone}
			{#each moreMovies as movie, index (index)}
				{#if index === countIndex}
					<div in:fade={{ duration: 350 }}>
						<SwipeCard {movie} {index} on:swipeRight={onSwipe} on:swipeLeft={onSwipe} />
					</div>
					<!-- <p>{movie.title}</p> -->
				{/if}
			{/each}
		{/if}
		{#if loading}
			<LoadingSpinner />
		{/if}
	</div>
</section>
