<script lang="ts">
	import { avatarImages } from '$lib/utils/data'
	import UserCard from '$lib/components/ui/cards/userCard.svelte'
	import MovieSkeletonCard from '$lib/components/ui/skeleton/movieSkeletonCard.svelte'

	export let data

	const avatarImage = avatarImages.find((avatar) => avatar.id === data.user.avatar_id)

	const getWatchlist = async () => {
		const response = await fetch('api/watchlist')
		const data = await response.json()
		console.log(data)
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
	{#await getWatchlist()}
		<div class="grid grid-cols-3 gap-3">
			{#each Array(9) as _}
				<MovieSkeletonCard />
			{/each}
		</div>
	{:then}
		loaded
	{/await}
</section>
