<script lang="ts">
	export let data;

	// $: console.log(data.matches);
	// $: console.log(data.recommendations);

	console.log(data);
</script>

<h2>Matches</h2>
{#each data.matches as match, index (index)}
	<p>{match.original_title}</p>
{/each}

<h2>Recommendations</h2>
{#each data.recommendations as recommendation, index (index)}
	<p>{recommendation.original_title}</p>
{/each}
