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
	import LinkButton from '$lib/components/ui/buttons/linkButton.svelte'
	import { fade } from 'svelte/transition'

	export let data
	let totalMovies: number
	let limit = 9
	let offset = 0

	const avatarImage = avatarImages.find((avatar) => avatar.id === data.user.avatar_id)

	const getWatchlist = async (limit: number, offset: number) => {
		const response = await fetch(`api/watchlist?limit=${limit}&offset=${offset}`)
		const data = await response.json()
		const movies: MovieByIdProps[] = data.movies
		totalMovies = data.totalCount
		return movies
	}

	const handleLoadMore = () => {
		limit += 9
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
		{#await getWatchlist(limit, offset)}
			{#each Array(limit) as _}
				<MovieSkeletonCard />
			{/each}
		{:then movies}
			{#if movies.length}
				{#each movies as movie (movie.id)}
					<article animate:flip={TRANSITION}>
						<MovieLinkCard
							href="/profile/{movie.id}"
							src={getTMDBImageUrl(movie.poster_path || movie.backdrop_path)}
							alt="Poster of {movie.title}"
						/>
					</article>
				{/each}
				{#if movies.length < totalMovies}
					<div class="col-span-full" transition:fade={TRANSITION}>
						<LinkButton
							text="Load more"
							class="mx-auto block"
							type="button"
							on:click={handleLoadMore}
						/>
					</div>
				{/if}
			{:else}
				<p>No movies in your watchlist, mate.</p>
			{/if}
		{:catch error}
			<FetchErrorMessage message={error.message} class="col-span-full" />
		{/await}
	</div>
</section>
