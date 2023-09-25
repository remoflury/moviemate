<script lang="ts">
	import MatchCard from '$lib/components/cards/matchCard.svelte';
	export let data;

	// $: console.log(data.matches);
	// $: console.log(data.recommendations);
</script>

<!-- <h2>Matches</h2>

{#each data.matches as match, index (index)}
	<p>{match.original_title}</p>
{/each}

<h2>Recommendations</h2>
{#each data.recommendations as recommendation, index (index)}
	<p>{recommendation.original_title}</p>
{/each} -->

{#each data.matches as match, index (index)}
	<MatchCard content={match} isMatch={true}/>
{/each}
