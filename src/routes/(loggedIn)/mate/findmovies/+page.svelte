<script lang="ts">
	import { page } from '$app/stores';
	import MatchCard from '$lib/components/cards/matchCard.svelte';
	import { showGoBack, showSettings, previousPath } from '$lib/stores/menu';
	export let data;
	$showGoBack = true;
	$showSettings = false;

	$previousPath.params = $page.url.search;
</script>

<section class="container">
	<h1>Movies</h1>

	<p class="info mb-9 text-center">{data.matches.length + data.recommendations.length} Resultate</p>

	<div class="grid grid-cols-2 gap-x-6 gap-y-10">
		{#each data.matches as match, index (index)}
			<MatchCard content={match} isMatch={true} />
		{/each}

		{#each data.recommendations as recommendation, index (index)}
			<MatchCard content={recommendation} />
		{/each}
	</div>

	<button class="link text-sm mt-8"
	> show more </button>
</section>
