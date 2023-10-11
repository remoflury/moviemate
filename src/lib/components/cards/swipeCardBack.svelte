<script lang="ts">
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';

	export let movie: TMDBMovieByRecommendationProps;
	export let isFlipped: boolean;

	const voteRounded: number = parseFloat(movie.vote_average.toFixed(2));
	const releaseYear: string = movie.release_date.split('-')[0];
</script>

<div
	class="absolute w-full h-full card-face {isFlipped
		? 'z-10 bg-white -scale-x-100'
		: '-z-10 bg-transparent'}"
>
	<figure class="aspect-video">
		<img
			class="object-cover object-center w-full h-full"
			src="https://image.tmdb.org/t/p/w300/{movie.backdrop_path}"
			alt=""
		/>
	</figure>
	<article class="p-6">
		<div class="flex justify-between mt-4">
			<h2 class="mb-1">{movie.title}</h2>
			<p class="info whitespace-nowrap">{voteRounded} / 10</p>
		</div>
		<p class="info mb-6">{releaseYear}</p>
		<p class="text-black line-clamp-[9]">{movie.overview}</p>
	</article>
</div>

<style>
	.card-face {
		backface-visibility: hidden;
		/* transform: rotateY(180deg); */
	}
</style>
