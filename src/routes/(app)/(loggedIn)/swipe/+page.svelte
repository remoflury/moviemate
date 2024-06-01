<script lang="ts">
	import type { RecommendationProps } from '$lib/types/TMDB'
	import { SwipeDeck, SwipeCard } from 'svelte-swipe-cards'
	import LoadingSpinner from '$lib/components/ui/general/loadingSpinner.svelte'
	import SwipeCardContent from '$lib/components/ui/cards/swipeCardContent.svelte'
	import FetchErrorMessage from '$lib/components/ui/general/fetchErrorMessage.svelte'

	let recommendations: RecommendationProps[] = []
	let recommendationsLength: number
	let currentIndex = 0

	async function getMovies(reload: boolean) {
		// reset currentIndex if reload is true
		if (reload) {
			currentIndex = 0
		}
		if (recommendations.length) return
		const response = await fetch(`/api/swipe`)
		const data = await response.json()
		recommendations = [...data.results]
		recommendationsLength = recommendations.length

		// error handling
		if (!recommendations || !recommendations.length) {
			throw Error('No recommendations found')
		}
	}

	const handleSwipe = async (direction: 'left' | 'right') => {
		await addMovieToDB(currentIndex, direction)
		currentIndex++
		recommendations.shift()
		recommendations = [...recommendations]
	}

	const addMovieToDB = async (index: number, direction: 'left' | 'right') => {
		const response = await fetch(`api/swipe/${direction === 'left' ? 'dislike' : 'like'}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				movieId: recommendations[index].id
			})
		})
		const data = await response.json()
	}

	$: reload = currentIndex >= recommendationsLength ? true : false
</script>

<section class="container section-spacing">
	<h1 hidden>Swipe your movies</h1>
	{#await getMovies(reload)}
		<div class="grid place-content-center">
			<LoadingSpinner />
		</div>
	{:then}
		<SwipeDeck>
			{#each recommendations as recommendation, index (recommendation.id)}
				<SwipeCard
					{index}
					allowedDirections="horizontal"
					threshold={30}
					on:swipe_left={() => handleSwipe('left')}
					on:swipe_right={() => handleSwipe('right')}
				>
					<SwipeCardContent content={recommendation} />
				</SwipeCard>
			{/each}
		</SwipeDeck>
	{:catch error}
		<FetchErrorMessage message="Something went wrong" {error} />
	{/await}
</section>
