<script lang="ts">
	import type { ExistingMateProps } from '$lib/types/contentTypes';
	import { enhance } from '$app/forms';
	import { mateStore } from '$lib/stores/mates';
	import { slide } from 'svelte/transition';
	import MovieTimeAvatar from './movieTimeAvatar.svelte';
	export let mates: ExistingMateProps[];

	const addMateToStore = (id: string, username: string) => {
		// if id is already in mates store, return early
		if ($mateStore.mates.some((item) => item.id === id)) return;

		$mateStore.mates = [...$mateStore.mates, { id, username }];
	};
</script>

{#if mates.length}
	<h1 class="">Mates</h1>
	<article class="flex items-start gap-x-8">
		{#each mates as mate, index (index)}
			<form
				action="/mate?/addnewmate"
				method="POST"
				use:enhance
				class="w-16"
				transition:slide={{ duration: 250 }}
			>
				<input type="hidden" name="new-mate-id" id={index.toString()} value={mate.id} />
				<button
					aria-label="add mate to session"
					on:click={() => addMateToStore(mate.id, mate.username)}
				>
					<MovieTimeAvatar
						name={mate.username}
						id={mate.id}
						showDeleteButton={false}
						inversed={true}
						flexCol={true}
					/>
				</button>
			</form>
		{/each}
	</article>
{/if}
