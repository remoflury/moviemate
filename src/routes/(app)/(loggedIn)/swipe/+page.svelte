<script lang="ts">
	import LoadingSpinner from '$lib/components/ui/general/loadingSpinner.svelte'
	import SwipeCard from '$lib/components/ui/cards/swipeCard.svelte'
	import FetchErrorMessage from '$lib/components/ui/general/fetchErrorMessage.svelte'
	import type { RecommendationProps } from '$lib/types/TMDB'

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
		<div class="relative">
			{#each recommendations as recommendation, index}
				<SwipeCard
					content={recommendation}
					zIndex={index * -1}
					on:swipe-left={() => handleSwipe('left')}
					on:swipe-right={() => handleSwipe('right')}
				/>
			{/each}
		</div>
	{:catch error}
		<FetchErrorMessage message="Something went wrong" {error} />
	{/await}
</section>
