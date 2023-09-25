<script lang="ts">
	import { mateStore } from '$lib/stores/mates';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import MovieTimeAvatar from './movieTimeAvatar.svelte';
	import PrimaryLink from '$lib/components/primaryLink.svelte';
</script>

<h2>Movie time with mates</h2>

<article class="bg-white p-4 grid grid-cols-2 gap-x-8">
	<MovieTimeAvatar name="Me" showDeleteButton={false} />

	{#each $mateStore.mates as mate, index (index)}
		<div transition:fly={{ duration: 250 }}>
			<MovieTimeAvatar name={mate.username} id={mate.id} />
		</div>
	{/each}
</article>

{#if $mateStore.mates.length}
	<div transition:fly={{ duration: 250 }}>
		<PrimaryLink
			text="Find Movie"
			link={`/mate/findmovies?matesids=${$mateStore.mates.map(
				(mate) => `${mate.id},`
			)}&userid=${$page.data.userId}`}
		/>
	</div>
{/if}
