<script lang="ts">
	import MatchCard from '$lib/components/cards/matchCard.svelte';
	export let data;

	// $: console.log(data.matches);
	// $: console.log(data.recommendations);

	// console.log(data);

	// $: console.log(data.matches);
	// $: console.log(data.recommendations);
</script>

<section class="container">
	<h1>Movies</h1>

	<p>{data.matches.length + data.recommendations.length} Resultate</p>

	<div class="grid grid-cols-2 gap-x-6 gap-y-10">
		{#each data.matches as match, index (index)}
			{#if match.poster_path != null}
				<MatchCard content={match} isMatch={true} />
			{/if}
		{/each}

		{#each data.recommendations as recommendation, index (index)}
			{#if recommendation.poster_path != null}
				<MatchCard content={recommendation} />
			{/if}
		{/each}
	</div>
</section>
