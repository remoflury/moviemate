<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import LikeIcon from '../icons/likeIcon.svelte';
	import { fade } from 'svelte/transition';
	import DismissIcon from '../icons/dismissIcon.svelte';

	export let movie: TMDBMovieByRecommendationProps;
	export let index: number;
	let fadeOut = false;
	let swipeDirection: 'left' | 'right' | '';

	const dispatch = createEventDispatcher();

	const touchStartPosition = {
		x: 0,
		y: 0
	};
	const touchCurrentPosition = {
		x: 0,
		y: 0
	};

	const setStartPoints = (event: TouchEvent) => {
		//@ts-ignore
		touchStartPosition.x = event.touches[0].clientX - event.target?.x;
		//@ts-ignore
		touchStartPosition.y = event.touches[0].clientY - event.target?.y;
	};

	const dragCard = (event: TouchEvent) => {
		//@ts-ignore
		touchCurrentPosition.x = event.touches[0].clientX - event.target?.x;
		//@ts-ignore
		touchCurrentPosition.y = event.touches[0].clientY - event.target?.y;

		const xDiff = touchCurrentPosition.x - touchStartPosition.x;
		console.log(xDiff);

		if (xDiff < 0) {
			swipeDirection = 'left';
		} else {
			swipeDirection = 'right';
		}
	};

	const endTouch = async (event: TouchEvent) => {
		swipeDirection = '';
		//@ts-ignore
		const widthElem = event.target.offsetWidth;
		console.log(Math.abs(touchCurrentPosition.x - touchStartPosition.x));

		// check for threshold of swipe
		if (Math.abs(touchCurrentPosition.x - touchStartPosition.x) > widthElem / 3) {
			resetPositions();
			await swipeRight(movie.id);
		} else if (Math.abs(touchCurrentPosition.x - touchStartPosition.x) < widthElem / 3) {
			resetPositions();
			await swipeLeft(movie.id);
		} else {
			resetPositions();
			console.log('no swipe');
		}
	};

	//reset swiping positions
	const resetPositions = () => {
		touchStartPosition.x = 0;
		touchStartPosition.y = 0;
		touchCurrentPosition.x = 0;
		touchCurrentPosition.y = 0;
	};
	// on swipe right, add movie to watchlist
	const swipeRight = async (movieId: number) => {
		// dispatch event to parent component
		dispatch('swipeRight', {
			index
		});
		try {
			const response = await fetch(`/api/swipe?direction=right&movieId=${movieId}`);
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
		fadeOut = true;
	};

	// on swipe left, add movie to dismissed list
	const swipeLeft = async (movieId: number) => {
		// dispatch event to parent component
		dispatch('swipeLeft', {
			index
		});
		try {
			const response = await fetch(`/api/swipe?direction=left&movieId=${movieId}`);
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
	};
</script>

<article
	class="rounded-3xl absolute transform inset-0 transition overflow-hidden"
	class:fadeOut
	style={` 
  transform: 
    translateX(${touchCurrentPosition.x - touchStartPosition.x}px) 
    rotate(${(touchCurrentPosition.x - touchStartPosition.x) / 80}deg);
  })`}
	on:touchstart={setStartPoints}
	on:touchmove={dragCard}
	on:touchend={endTouch}
>
	{#if swipeDirection == 'right'}
		<div transition:fade={{ duration: 350 }} class="absolute left-6 top-4 w-12 aspect-square">
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
</article>

<style lang="postcss">
	.fadeOut {
		@apply opacity-0;
	}
</style>
