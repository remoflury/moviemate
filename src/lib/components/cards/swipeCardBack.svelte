<script lang="ts">
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';

	export let movie: TMDBMovieByRecommendationProps;
	export let isFlipped: boolean;
</script>

<div
	class="absolute w-full h-full card-face transition p-6 {isFlipped
		? 'z-10 bg-white -scale-x-100'
		: '-z-10bg-transparent'}"
>
	<h2>{movie.title}</h2>
</div>

<style>
	.card-face {
		backface-visibility: hidden;
		/* transform: rotateY(180deg); */
	}
</style>
