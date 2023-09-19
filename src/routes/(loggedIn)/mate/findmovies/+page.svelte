<script lang="ts">
	export let data;

	// $: console.log(data.matches);
	// $: console.log(data.recommendations);

	// console.log(data.data)
	// 1008042  Talk to Me
	// 385687 Fast X
	// 346698 Barbie
	// 615656 Meg 2: The Trench
	// 968051 The Nun II

	// const movies1 = [
	// '1008042'
	// 	'385687',
	// 	'346698',
	// 	'615656',
	// 	'968051'
	// ] // Spiderpig

	// const movies2 = ['1008042', '615656', '968051'] // Spiderman
</script>

<h2>Matches</h2>
{#each data.matches as match, index (index)}
	<p>{match.original_title}</p>
{/each}

<h2>Recommendations</h2>
{#each data.recommendations as recommendation, index (index)}
	<p>{recommendation.original_title}</p>
{/each}
