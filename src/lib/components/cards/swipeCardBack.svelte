<script lang="ts">
	import type {
		TMDBMovieByIdrops,
		TMDBMovieByRecommendationProps,
		TMDBVideosByIdProps
	} from '$lib/types/contentTypes';
	import LoadingSpinner from '../loadingSpinner.svelte';

	type BackCard = {
		movieDetails: TMDBMovieByIdrops;
		videoDetails: TMDBVideosByIdProps;
	};

	export let movie: TMDBMovieByRecommendationProps;
	export let isFlipped: boolean;

	const voteRounded: number = parseFloat(movie.vote_average.toFixed(1));
	const releaseYear: string = movie.release_date.split('-')[0];
	$: if (isFlipped) {
		console.log(isFlipped);
	}

	const getMovieDetails = async (movieId: number) => {
		const response = await fetch(`/api/movie/${movieId}`);
		const data: BackCard = await response.json();
		console.log(data);
		return data;
	};
</script>

<div
	class="absolute w-full h-full card-face {isFlipped
		? 'z-10 bg-white -scale-x-100'
		: '-z-10 bg-transparent'}"
>
	{#if isFlipped}
		{#await getMovieDetails(movie.id)}
			<div class="py-4">
				<LoadingSpinner />
			</div>
		{:then movieDetails}
			{#if movieDetails.videoDetails.results.length}
				<iframe
					class="w-full aspect-video"
					src="https://www.youtube.com/embed/{movieDetails.videoDetails.results[0].key}"
					frameborder="0"
					title="video of {movieDetails.movieDetails.title}"
					allowfullscreen
					allow="accelerometer; gyroscope;"
				/>
			{:else}
				<figure class="aspect-video overflow-hidden">
					<img
						class="object-cover object-center w-full h-full"
						src="https://image.tmdb.org/t/p/w300/{movieDetails.movieDetails.backdrop_path ||
							movieDetails.movieDetails.poster_path}"
						alt="movie poster of {movieDetails.movieDetails.title}"
					/>
				</figure>
			{/if}
			<article class="p-6">
				<div class="flex justify-between mt-4">
					<h2 class="mb-1">{movieDetails.movieDetails.title}</h2>
					<p class="info whitespace-nowrap">{voteRounded} / 10</p>
				</div>
				<p class="info mb-6">{releaseYear} / {movieDetails.movieDetails.genres[0].name}</p>
				<p class="text-black line-clamp-[9]">{movieDetails.movieDetails.overview}</p>
			</article>
		{/await}
	{/if}
</div>

<style>
	.card-face {
		backface-visibility: hidden;
		/* transform: rotateY(180deg); */
	}
</style>
