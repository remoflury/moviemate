<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import LikeIcon from '../icons/likeIcon.svelte';
	import { fade } from 'svelte/transition';
	import DismissIcon from '../icons/dismissIcon.svelte';

	export let movie: TMDBMovieByRecommendationProps;
	export let index: number;

	const dispatch = createEventDispatcher();

	let startX: number | null = null;
	let currentX: number | null = null;
	let offsetX: number = 0;
	let isDragging: boolean = false;
	let cardElem: HTMLElement;
	let fadeOut = false;
	let swipeDirection: 'left' | 'right' | '';

	const handleTouchStart = (event: TouchEvent) => {
		const evt = event.touches[0];
		startX = evt.pageX;
		isDragging = true;
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (!isDragging || startX === null) return;
		const evt = 'touches' in event ? event.touches[0] : event;
		currentX = evt.pageX;
		offsetX = currentX - startX;
		cardElem.style.transform = `translateX(${offsetX}px)`;
		if (offsetX <= 0) swipeDirection = 'left';
		if (offsetX > 0) swipeDirection = 'right';
	};

	const handleTouchEnd = async (event: TouchEvent) => {
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

<article
	class="rounded-3xl absolute transform inset-0 transition-shadow overflow-hidden {swipeDirection ==
	'left'
		? 'shadow-swipe-left'
		: swipeDirection == 'right'
		? 'shadow-swipe-right'
		: ''}"
	bind:this={cardElem}
	on:touchstart={handleTouchStart}
	on:touchmove={handleTouchMove}
	on:touchend={handleTouchEnd}
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
</article>
