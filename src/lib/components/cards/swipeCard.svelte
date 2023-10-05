<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';

	export let movie: TMDBMovieByRecommendationProps;
	export let index: number;
	let fadeOut = false;

	const dispatch = createEventDispatcher();

	const touchStartPosition = {
		x: 0,
		y: 0
	};
	const touchCurrentPosition = {
		x: 0,
		y: 0
	};

	let offsetX = 0;

	const setStartPoints = (event: TouchEvent) => {
		touchStartPosition.x = event.touches[0].clientX - event.target?.x;
		touchStartPosition.y = event.touches[0].clientY - event.target?.y;
		// touchStartPosition.x = event.touches[0].clientX;
		// touchStartPosition.y = event.touches[0].clientY;
	};

	const dragCard = (event: TouchEvent) => {
		// console.log(event);
		touchCurrentPosition.x = event.touches[0].clientX - event.target?.x;
		touchCurrentPosition.y = event.touches[0].clientY - event.target?.y;
		// touchCurrentPosition.x = event.touches[0].clientX;
		// touchCurrentPosition.y = event.touches[0].clientY;

		const xDiff = touchCurrentPosition.x - touchStartPosition.x;
		// console.log(xDiff);
	};

	const endTouch = async (event: TouchEvent) => {
		//@ts-ignore
		const widthElem = event.target.offsetWidth;

		if (touchCurrentPosition.x - touchStartPosition.x > widthElem / 3) {
			// console.log('swipe right');
			await swipeRight(movie.id);
		} else if (touchCurrentPosition.x - touchStartPosition.x < widthElem / 3) {
			console.log('swipe left');
		} else {
			console.log('no swipe');
		}

		// console.log('end');
		touchStartPosition.x = 0;
		touchStartPosition.y = 0;
		touchCurrentPosition.x = 0;
		touchCurrentPosition.y = 0;
	};
	// on swipe right, add movie to watchlist
	const swipeRight = async (movieId: number) => {
		try {
			const response = await fetch(`/api/swipe?direction=right&movieId=${movieId}`);
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
		fadeOut = true;
		dispatch('swipeRight', {
			index
		});
	};

	// on swipe left, add movie to dismissed list
	const swipeLeft = async (movieId: number) => {
		try {
			const response = await fetch(`/api/swipe?direction=left&movieId=${movieId}`);
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
		dispatch('swipeLeft', {
			index
		});
	};
</script>

<!-- z-index: ${index * -1}; -->
<article
	class="rounded-5xl absolute transform left-0 right-0 transition"
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
	<figure class="w-full h-full">
		<img
			class="object-cover object-center w-full h-full"
			src="https://image.tmdb.org/t/p/w300/{movie.poster_path}"
			alt="movie poster of {movie.title}"
		/>
	</figure>
	<button class="absolute left-0" on:click={() => swipeLeft(movie.id)}>Swipe left</button>
	<button class="absolute right-0" on:click={() => swipeRight(movie.id)}>Swipe right</button>
</article>

<style lang="postcss">
	.fadeOut {
		@apply opacity-0;
	}
</style>
