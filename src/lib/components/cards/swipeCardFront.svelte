<script lang="ts">
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import { fade } from 'svelte/transition';
	import LikeIcon from '../icons/likeIcon.svelte';
	import DismissIcon from '../icons/dismissIcon.svelte';

	export let movie: TMDBMovieByRecommendationProps;
	export let swipeDirection: 'left' | 'right' | '';
	export let isFlipped: boolean;
</script>

<div
	class=" card-face w-full h-full absolute transition {isFlipped ? '-z-10 bg-transparent' : 'z-10'}"
>
	{#if swipeDirection == 'right'}
		<div
			in:fade={{ duration: 150 }}
			out:fade={{ duration: 250 }}
			class="absolute left-6 top-4 w-12 aspect-square"
		>
			<LikeIcon />
		</div>
	{:else if swipeDirection == 'left'}
		<div transition:fade={{ duration: 50 }} class="absolute right-6 top-4 w-12 aspect-square">
			<DismissIcon />
		</div>
	{/if}
	<figure class="w-full h-full">
		<img
			class="object-cover object-center w-full h-full"
			src="https://image.tmdb.org/t/p/w300/{movie.poster_path}"
			alt="movie poster of {movie.title}"
		/>
	</figure>
</div>

<style>
	.card-face {
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}
</style>
