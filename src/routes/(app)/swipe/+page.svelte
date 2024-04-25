<script lang="ts">
	import LoadingSpinner from '$lib/assets/loadingSpinner.svelte'
	import SwipeCard from '$lib/components/ui/cards/swipeCard.svelte'
	import FetchErrorMessage from '$lib/components/ui/general/fetchErrorMessage.svelte'
	import type { RecommendationProps } from '$lib/types/TMDB'

	let recommendations: RecommendationProps[] = []
	let currentIndex = 0

	async function getMovies(recommendationLength: number) {
		if (recommendations.length) return
		const response = await fetch(`/api/swipe`)
		const data = await response.json()
		recommendations = [...data.results]

		// error handling
		if (!recommendations || !recommendations.length) {
			throw Error('No recommendations found')
		}
		console.log(recommendations)
	}

	const handleSwipe = () => {
		currentIndex++
		recommendations.shift()
		recommendations = [...recommendations]
	}
</script>

<section class="container section-spacing">
	<h1 hidden>Swipe your movies</h1>
	{#await getMovies(recommendations.length)}
		<div class="grid place-content-center">
			<LoadingSpinner />
		</div>
	{:then}
		<div class="relative">
			{#each recommendations as recommendation, index}
				<!-- {#if index === currentIndex} -->
				<SwipeCard
					content={recommendation}
					zIndex={index * -1}
					on:swipe-left={handleSwipe}
					on:swipe-right={handleSwipe}
				/>
				<!-- {/if} -->
			{/each}
		</div>
	{:catch error}
		<FetchErrorMessage message="Something went wrong" {error} />
	{/await}
</section>
