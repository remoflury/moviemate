<script lang="ts">
	import { avatarImages } from '$lib/utils/data'
	import UserCard from '$lib/components/ui/cards/userCard.svelte'
	import MovieSkeletonCard from '$lib/components/ui/skeleton/movieSkeletonCard.svelte'
	import MovieLinkCard from '$lib/components/ui/cards/movieLinkCard.svelte'
	import type { MovieByIdProps } from '$lib/types/TMDB.js'
	import { getTMDBImageUrl } from '$lib/utils/generalUtils'
	import { flip } from 'svelte/animate'
	import { TRANSITION } from '$lib/utils/constants.js'
	import FetchErrorMessage from '$lib/components/ui/general/fetchErrorMessage.svelte'

	export let data
	let totalMovies: number

	const avatarImage = avatarImages.find((avatar) => avatar.id === data.user.avatar_id)

	const getWatchlist = async () => {
		const response = await fetch('api/watchlist')
		const data = await response.json()
		const movies: MovieByIdProps[] = data.movies
		totalMovies = data.totalCount
		return movies
	}
</script>

<section class="container section-spacing">
	<h1 hidden>Profile</h1>
	<UserCard
		username={data.user.username}
		path={avatarImage?.path || avatarImages[0].path}
		class="max-w-1/2 mx-auto"
	/>
</section>
<section class="container section-spacing">
	<h2>Watchlist</h2>
	<div class="grid grid-cols-3 gap-3">
		{#await getWatchlist()}
			{#each Array(9) as _}
				<MovieSkeletonCard />
			{/each}
		{:then movies}
			{#if movies.length}
				{#each movies as movie (movie.id)}
					<article animate:flip={TRANSITION}>
						<MovieLinkCard
							href="/profile/{movie.id}"
							src={getTMDBImageUrl(movie.poster_path)}
							alt="Poster of {movie.title}"
						/>
					</article>
				{/each}
			{:else}
				<p>No movies in your watchlist, mate.</p>
			{/if}
		{:catch error}
			<FetchErrorMessage message={error.message} class="col-span-full" />
		{/await}
	</div>
</section>
