<script lang="ts">
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes.js';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { generateRandomIndex, getAllMovieIds } from '$lib/utils/moviesUtils.js';
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { showSettings, showGoBack } from '$lib/stores/menu';
	import SwipeCard from '$lib/components/cards/swipeCard.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import SearchIcon from '$lib/components/icons/searchIcon.svelte';
	$showSettings = false;
	$showGoBack = false;

	export let data;
	let movies: TMDBMovieByRecommendationProps[] = data.movies;
	let allMatchedMoviesOfSession: TMDBMovieByRecommendationProps[] = movies;

	// console.log(movies);

	let loading: boolean = false;

	let countIndex = 0;

	const fetchMoreMovies = async () => {
		let randomIndex: number;

		let response!: Response;

		// if user has some matched movies in session
		if (allMatchedMoviesOfSession.length) {
			randomIndex = generateRandomIndex(allMatchedMoviesOfSession);
			response = await fetch(
				`${PUBLIC_APP_URL}/api/recommendations?movieId=${allMatchedMoviesOfSession[randomIndex].id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}
		// if user does not have some matched movies in session, load from initially loaded movies
		if (!allMatchedMoviesOfSession.length) {
			randomIndex = generateRandomIndex(movies);
			response = await fetch(
				`${PUBLIC_APP_URL}/api/recommendations?movieId=${movies[randomIndex].id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

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
			} catch (error) {
				throw new Error('An error occured while loading more movies');
			}
			movies = [...movies];

			loading = false;
			countIndex = 0;
		}
	};
</script>

<div class="container flex justify-end mt-4 -mb-6">
	<button class="mr-4" on:click={() => goto('/swipe/search')}>
		<SearchIcon />
	</button>
</div>
<section class="container">
	<h1 hidden>Swipe</h1>
	<div class="relative aspect-[9/16]">
		{#each movies as movie, index (index)}
			{#if index === countIndex}
				<div class="w-full h-full" in:fade={{ duration: 350 }}>
					<SwipeCard
						{movie}
						{index}
						on:swipeRight={() => {
							onSwipe();
							allMatchedMoviesOfSession.push(movie);
						}}
						on:swipeLeft={onSwipe}
					/>
				</div>
			{/if}
		{/each}
		{#if loading}
			<LoadingSpinner />
		{/if}
	</div>
</section>
