<script lang="ts">
	import type { RecommendationProps } from '$lib/types/TMDB'
	import { getTMDBImageUrl } from '$lib/utils/generalUtils'
	import { createEventDispatcher, onDestroy } from 'svelte'

	export let content: RecommendationProps
	export let zIndex: number

	const THRESHHOLD = 0.3
	const dispatch = createEventDispatcher()
	let touchstartPos = {
		x: 0,
		y: 0
	}

	let currentPos = {
		x: 0,
		y: 0
	}

	const handleTouchStart = (e: TouchEvent) => {
		// console.log('touchstart', e)
		const target = e.target as HTMLElement
		if (!target) return

		const elementXOffset = target.getBoundingClientRect().left
		const elementYOffset = target.getBoundingClientRect().top
		// set starting position of touch, relative to card
		touchstartPos = {
			x: e.touches[0].clientX - elementXOffset,
			y: e.touches[0].clientY - elementYOffset
		}

		currentPos = {
			x: e.touches[0].clientX - elementXOffset,
			y: e.touches[0].clientY - elementYOffset
		}
	}

	const handleTouchMove = (e: TouchEvent) => {
		const target = e.target as HTMLElement
		if (!target) return

		const elementXOffset = target.getBoundingClientRect().left
		const elementYOffset = target.getBoundingClientRect().top

		currentPos = {
			x: e.touches[0].clientX - elementXOffset,
			y: e.touches[0].clientY - elementYOffset
		}
	}

	const handleTouchEnd = (e: TouchEvent) => {
		const target = e.target as HTMLElement
		if (!target) return

		// if the card has not been swiped enough, reset
		const absTranslateX = Math.abs(currentPos.x - touchstartPos.x)
		if (absTranslateX < target.offsetWidth * THRESHHOLD) {
			return resetPositions()
		}

		// if the card has been swiped enough, dispatch event
		if (currentPos.x - touchstartPos.x > 0) {
			resetPositions()
			return dispatch('swipe-right')
		}
		dispatch('swipe-left')
		resetPositions()
	}

	const resetPositions = () => {
		currentPos = {
			x: 0,
			y: 0
		}
		touchstartPos = {
			x: 0,
			y: 0
		}
	}
</script>

<article
	class="aspect-3/4 bg-white rounded-lg w-full overflow-hidden absolute transition-transform duration-100"
	style="
    z-index: {zIndex};
    transform: translate({currentPos.x - touchstartPos.x}px, {currentPos.y -
		touchstartPos.y}px) rotate({(currentPos.x - touchstartPos.x) / 20}deg);
    "
	on:touchstart={handleTouchStart}
	on:touchmove={handleTouchMove}
	on:touchend={handleTouchEnd}
>
	<figure>
		<img
			class="object-cover object-center w-full h-full"
			src={getTMDBImageUrl(content.poster_path, 'w342')}
			alt="Poster of {content.title}"
		/>
	</figure>
</article>
