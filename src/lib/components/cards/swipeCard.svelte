<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';

	export let movie: TMDBMovieByRecommendationProps;
	export let index: number;

	const dispatch = createEventDispatcher();

	const swipeRight = async (movieId: number) => {
		try {
			const response = await fetch(`/api/swipe?direction=right&movieId=${movieId}`);
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
		dispatch('swipeRight', {
			index
		});
	};
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

	const touchStartPosition = {
		x: 0,
		y: 0
	};
	const touchCurrentPosition = {
		x: 0,
		y: 0
	};

	const setStartPoints = (event: TouchEvent) => {
		// console.log(event);
		touchStartPosition.x = event.touches[0].clientX;
		touchStartPosition.y = event.touches[0].clientY;
	};

	const dragCard = (event: TouchEvent) => {
		// console.log(event);
		touchCurrentPosition.x = event.touches[0].clientX;
		touchCurrentPosition.y = event.touches[0].clientY;

		const xDiff = touchCurrentPosition.x - touchStartPosition.x;
		// console.log(xDiff);
	};

	const endTouch = (event: TouchEvent) => {
		//@ts-ignore
		const widthElem = event.target.offsetWidth;

		if (touchCurrentPosition.x - touchStartPosition.x > widthElem / 2) {
			console.log('swipe right');
		} else if (touchCurrentPosition.x - touchStartPosition.x < widthElem / 2) {
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
</script>

<!-- z-index: ${index * -1}; -->
<article
	class="rounded-5xl absolute transform left-0 right-0"
	style={` 
  transform: 
    translateX(${touchCurrentPosition.x - touchStartPosition.x}px) 
    rotate(${(touchCurrentPosition.x - touchStartPosition.x) / 80}deg);
  })`}
>
	<!-- on:touchstart={setStartPoints}
on:touchmove={dragCard}
on:touchend={endTouch} -->
	<figure class="w-full h-full">
		<img
			class="object-cover object-center w-full h-full"
			src="https://image.tmdb.org/t/p/w300/{movie.poster_path}"
			alt="movie poster of {movie.title}"
		/>
	</figure>
	<!-- <form class="absolute left-0" on:submit|preventDefault={swipeLeft} use:enhance method="POST">
		<input type="hidden" name="movieid" value={movie.id} />
		<button>Swipe left</button>
	</form>
	<form class="absolute right-0" on:submit|preventDefault={swipeRight} use:enhance method="POST">
		<input type="hidden" name="movieid" value={movie.id} />
		<button>Swipe right</button>
	</form> -->
	<button class="absolute left-0" on:click={() => swipeLeft(movie.id)}>Swipe left</button>
	<button class="absolute right-0" on:click={() => swipeRight(movie.id)}>Swipe right</button>
</article>
