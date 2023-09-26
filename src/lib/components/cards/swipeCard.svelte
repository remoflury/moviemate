<script lang="ts">
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';

	export let movie: TMDBMovieByRecommendationProps;
	export let index: number;

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

<article
	class="overflow-hidden rounded-5xl absolute transform {index !== 0 ? 'pointer-events-none' : ''}"
	style={`z-index: ${index * -1}; 
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
			src="https://image.tmdb.org/t/p/w500/{movie.poster_path}"
			alt="movie poster of {movie.title}"
		/>
	</figure>
</article>
