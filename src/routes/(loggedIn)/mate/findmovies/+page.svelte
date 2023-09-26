<script lang="ts">
	import MatchCard from '$lib/components/cards/matchCard.svelte';
	export let data;
</script>

<section class="container">
	<h1>Movies</h1>

	<p>{data.matches.length + data.recommendations.length} Resultate</p>

	<div class="grid grid-cols-2 gap-x-6 gap-y-10">
		{#each data.matches as match, index (index)}
			<MatchCard content={match} isMatch={true} />
		{/each}

		{#each data.recommendations as recommendation, index (index)}
			<MatchCard content={recommendation} />
		{/each}
	</div>
</section>
