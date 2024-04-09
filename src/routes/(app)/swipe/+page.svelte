<script>
	import { page } from '$app/stores'

	async function getMovies() {
		const response = await fetch(`/api/swipe`)
		const data = await response.json()
		console.log(data)
	}
</script>

{#await getMovies()}
	loading
{:then}
	loaded
{/await}
