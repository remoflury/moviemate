<script lang="ts">
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes.js';
	import { generateRandomIndex } from '$lib/utils/moviesUtils.js';
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { fade } from 'svelte/transition';
	import SwipeCard from '$lib/components/cards/swipeCard.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import { onMount } from 'svelte';

	export let data;
	let movies = data.movies;

	let loading: boolean = false;

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

		// if no more movies are available, load more movies
		if (countIndex + 1 === movies.length) {
			loading = true;
			try {
				movies = await fetchMoreMovies();
				console.log(movies);
			} catch (error) {
				throw new Error('An error occured while loading more movies');
			}
			movies = [...movies];

			loading = false;
			countIndex = 0;
		}
	};
</script>

<section class="container">
	<h1 hidden>Swipe</h1>
	<div class="relative">
		{#each movies as movie, index (index)}
			{#if index === countIndex}
				<div in:fade={{ duration: 350 }}>
					<SwipeCard {movie} {index} on:swipeRight={onSwipe} on:swipeLeft={onSwipe} />
				</div>
			{/if}
		{/each}
		{#if loading}
			<LoadingSpinner />
		{/if}
	</div>
</section>
