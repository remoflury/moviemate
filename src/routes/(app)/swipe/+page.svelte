<script lang="ts">
	import { page } from '$app/stores'
	import { getTMDBImageUrl } from '$lib/utils/generalUtils'

	let recommendations: any[] = []

	async function getMovies() {
		const response = await fetch(`/api/swipe`)
		const data = await response.json()
		recommendations = [...data.results]

		console.log(recommendations)
	}
</script>

<section class="container section-spacing">
	<h1 hidden>Swipe your movies</h1>
	{#await getMovies()}
		loading
	{:then}
		<article class="aspect-3/4 bg-white rounded-lg relative overflow-hidden">
			<figure class="absolute inset-0">
				<img
					class="object-cover object-center w-full h-full"
					src={getTMDBImageUrl(recommendations[0].poster_path, 'w342')}
					alt="Poster of {recommendations[0].title}"
				/>
			</figure>
		</article>
	{/await}
</section>
