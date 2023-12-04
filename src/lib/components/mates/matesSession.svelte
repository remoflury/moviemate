<script lang="ts">
	import { mateStore } from '$lib/stores/mates';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import MovieTimeAvatar from './movieTimeAvatar.svelte';
	import PrimaryLink from '$lib/components/primaryLink.svelte';
	export let usersAvatarId: number;
</script>

<h2>Movie time with mates</h2>

<article class="bg-white px-4 py-6 grid grid-cols-2 gap-x-8 gap-y-4">
	<MovieTimeAvatar name="Me" showDeleteButton={false} avatarId={usersAvatarId} />

	{#each $mateStore.mates as mate, index (index)}
		<div transition:fly={{ duration: 250 }}>
			<MovieTimeAvatar name={mate.username} id={mate.id} avatarId={mate.avatarId} />
		</div>
	{/each}
</article>

{#if $mateStore.mates.length}
	<div class="mt-8" transition:fly={{ duration: 250 }}>
		<PrimaryLink
			text="Find Movie"
			link={`/mate/findmovies?matesids=${$mateStore.mates.map((mate) => `${mate.id},`)}&userid=${
				$page.data.userId
			}`}
		/>
	</div>
{/if}
