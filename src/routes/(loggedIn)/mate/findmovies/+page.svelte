<script lang="ts">
	import MatchCard from '$lib/components/cards/matchCard.svelte';
	import { showGoBack, showSettings } from '$lib/stores/menu.js';
	export let data;
	$showGoBack = true;
	$showSettings = false;
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
</section>
