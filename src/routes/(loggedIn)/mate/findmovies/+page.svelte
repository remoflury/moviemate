<script lang="ts">
	import { page } from '$app/stores';
	import MatchCard from '$lib/components/cards/matchCard.svelte';
	import { showGoBack, showSettings, previousPath } from '$lib/stores/menu';
	export let data;
	$showGoBack = true;
	$showSettings = false;

	console.log($previousPath.path);

	let showMoreCount = 8;

	$previousPath.params = $page.url.search;

	const movies = [...data.matches, ...data.recommendations];
</script>

<section class="container">
	<h1>Movies</h1>

	<p class="info mb-9 text-center">{data.matches.length + data.recommendations.length} Resultate</p>

	<div class="grid grid-cols-2 gap-x-6 gap-y-10">
		{#each movies.slice(0, showMoreCount) as movie, index (index)}
			<MatchCard content={movie} isMatch={movie.match} />
		{/each}
	</div>

	{#if showMoreCount <= movies.length}
		<button class="link text-sm mt-8" on:click={() => (showMoreCount += 8)}>show more</button>
	{:else}
		<p class="text-sm mt-8 text-center">No more movies available.</p>
	{/if}
</section>
