<script lang="ts">
	import type { TMDBMovieByIdrops, TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import { createEventDispatcher } from 'svelte';
	export let isInWatchlist: boolean;
	export let isInDismissedlist: boolean;
	export let content: TMDBMovieByIdrops | TMDBMovieByRecommendationProps;
	const dispatch = createEventDispatcher();

	const addMovieToWatchlist = () => {
		dispatch('addMovieToWatchlist');
	};
	const addMovieToDismissedlist = () => {
		dispatch('addMovieToDismissedlist');
	};
	const removeMovieFromLists = () => {
		dispatch('removeMovieFromLists');
	};
</script>

<a class="relative" href="/mate/findmovies/{content.id}">
	<figure class="rounded-3xl overflow-hidden aspect-3/4">
		<img
			class="object-center object-cover w-full h-full"
			src="https://image.tmdb.org/t/p/w154/{content.poster_path}"
			alt="Movieposter of {content.title}"
			loading="lazy"
		/>

		<div>
			{#if !isInDismissedlist && !isInWatchlist}
				<!-- Add Movie to Watchlist-->
				<button
					on:click|preventDefault={addMovieToWatchlist}
					aria-label="add movie"
					class="absolute bottom-0 right-0 border border-gray-dark rounded-max w-5 aspect-square grid place-content-center bg-white translate-x-1/4 translate-y-1/4"
				>
					<p class="text-gray-dark leading-none -translate-y-[1px]">+</p>
				</button>
			{:else if isInWatchlist}
				<!-- Movie in Watchlist -->
				<button
					on:click|preventDefault={addMovieToDismissedlist}
					aria-label="movie is in watchlist"
					class="absolute bottom-0 right-0 rounded-max w-5 aspect-square grid place-content-center bg-white translate-x-1/4 translate-y-1/4"
				>
					<svg class="max-w-full w-full" viewBox="0 0 75.516 75.516">
						<path
							d="M73.575,37.069A36.506,36.506,0,1,1,37.069.563,36.506,36.506,0,0,1,73.575,37.069ZM32.846,56.4,59.931,29.313a2.355,2.355,0,0,0,0-3.331L56.6,22.652a2.355,2.355,0,0,0-3.331,0L31.18,44.74,20.868,34.428a2.355,2.355,0,0,0-3.331,0l-3.331,3.331a2.355,2.355,0,0,0,0,3.331L29.515,56.4a2.355,2.355,0,0,0,3.331,0Z"
							transform="translate(2.006 -0.582) rotate(2)"
							class="fill-primary"
						/>
					</svg>
				</button>
			{:else if isInDismissedlist}
				<!-- Dismissed Movie -->
				<button
					on:click|preventDefault={removeMovieFromLists}
					aria-label="movie is dismissed"
					class="absolute bottom-0 right-0 rounded-max w-5 aspect-square grid place-content-center bg-white translate-x-1/4 translate-y-1/4"
				>
					<svg class="max-w-full w-full" viewBox="0 0 75.516 75.516">
						<g transform="translate(-1962.385 -5486.297)">
							<path
								d="M73.575,37.069A36.506,36.506,0,1,1,37.069.563,36.506,36.506,0,0,1,73.575,37.069Z"
								transform="translate(1964.39 5485.715) rotate(2)"
								class="fill-red"
							/>
							<path
								d="M38.548,31.1h0L27.533,20.082,38.547,9.067h0a1.137,1.137,0,0,0,0-1.6l-5.2-5.2a1.138,1.138,0,0,0-1.6,0h0L20.725,13.274,9.71,2.26h0a1.137,1.137,0,0,0-1.6,0l-5.2,5.2a1.137,1.137,0,0,0,0,1.6h0L13.917,20.082,2.9,31.1h0a1.137,1.137,0,0,0,0,1.6l5.2,5.2a1.137,1.137,0,0,0,1.6,0h0L20.725,26.89,31.74,37.9h0a1.137,1.137,0,0,0,1.6,0l5.2-5.2a1.137,1.137,0,0,0,0-1.6Z"
								transform="matrix(0.999, 0.035, -0.035, 0.999, 1980.131, 5503.262)"
								class="fill-white"
							/>
						</g>
					</svg>
				</button>
			{/if}
		</div>
	</figure>
</a>
