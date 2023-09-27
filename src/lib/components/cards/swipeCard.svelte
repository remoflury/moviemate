<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';

	export let movie: TMDBMovieByRecommendationProps;
	export let index: number;

	const dispatch = createEventDispatcher();

	const swipeRight = () => {
		dispatch('swipeRight', {
			index
		});
	};
	const swipeLeft = () => {
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
	class="rounded-5xl absolute transform"
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
			src="https://image.tmdb.org/t/p/w500/{movie.poster_path}"
			alt="movie poster of {movie.title}"
		/>
	</figure>
	<form
		class="absolute left-0"
		on:submit|preventDefault={swipeLeft}
		action="?/addmovietodismissed"
		use:enhance
		method="POST"
	>
		<input type="hidden" name="movieid" value={movie.id} />
		<button>Swipe left</button>
	</form>
	<!-- <form class="absolute right-0" action={`?/addmovietowatchlist`} use:enhance method="POST"> -->
	<form
		class="absolute right-0"
		on:submit|preventDefault={swipeRight}
		action={`?/addmovietowatchlist`}
		use:enhance
		method="POST"
	>
		<input type="hidden" name="movieid" value={movie.id} />
		<button>Swipe right</button>
	</form>
</article>
