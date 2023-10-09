<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import SwipeCardFront from './swipeCardFront.svelte';
	import SwipeCardBack from './swipeCardBack.svelte';

	export let movie: TMDBMovieByRecommendationProps;
	export let index: number;

	const dispatch = createEventDispatcher();

	let startX: number | null = null;
	let currentX: number | null = null;
	let offsetX: number = 0;
	let isDragging: boolean = false;
	let isFlipped: boolean = false;
	let isTapped: boolean = false;
	let cardElem: HTMLElement;
	let fadeOut = false;
	let swipeDirection: 'left' | 'right' | '';

	const handleTouchStart = (event: TouchEvent) => {
		if (isFlipped) return; // Disable swipe when flipped
		const evt = event.touches[0];
		startX = evt.pageX;
		isDragging = true;
		isTapped = true;
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (isFlipped) return; // Disable swipe when flipped
		if (!isDragging || startX === null) return;
		const evt = 'touches' in event ? event.touches[0] : event;
		currentX = evt.pageX;
		offsetX = currentX - startX;
		cardElem.style.transform = `translateX(${offsetX}px)`;
		if (offsetX <= 0) swipeDirection = 'left';
		if (offsetX > 0) swipeDirection = 'right';
		isTapped = false;
	};

	const handleTouchEnd = async (event: TouchEvent) => {
		if (isTapped) isFlipped = !isFlipped;
		if (isFlipped) return; // Disable swipe when flipped

		if (!isDragging || startX === null || currentX === null) return;
		isDragging = false;
		swipeDirection = '';

		const threshold: number = cardElem.clientWidth / 4;

		// if swipe exceeds a certain threshold, romove
		if (Math.abs(currentX - startX) >= threshold) {
			// if swipe is left
			if (currentX - startX <= 0) {
				cardElem.style.transform = `translateX(-150%)`;
				await swipeLeft(movie.id);
			} else {
				// if swipe is right
				cardElem.style.transform = `translateX(150%)`;
				await swipeRight(movie.id);
			}
		} else {
			cardElem.style.transform = `translateX(0px)`;
		}
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

<div class="card-container h-full w-full">
	<article
		class="card rounded-3xl absolute transform inset-0 transition-shadow overflow-hidden {swipeDirection ==
		'left'
			? 'shadow-swipe-left'
			: swipeDirection == 'right'
			? 'shadow-swipe-right'
			: ''}
		{isFlipped ? 'flipped' : ''}"
		bind:this={cardElem}
		on:touchstart={handleTouchStart}
		on:touchmove={handleTouchMove}
		on:touchend={handleTouchEnd}
	>
		<SwipeCardFront {movie} {swipeDirection} {isFlipped} />
		<SwipeCardBack {movie} {isFlipped} />
	</article>
</div>

<style>
	.card-container {
		perspective: 1000px;
	}

	.card {
		transition: transform 0.5s;
		transform-style: preserve-3d;
		/* position: relative; */
	}

	.flipped {
		transform: rotateY(180deg);
	}
</style>
