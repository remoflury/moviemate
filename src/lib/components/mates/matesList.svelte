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
	<article class="whitespace-nowrap overflow-x-scroll flex items-start gap-x-8 pb-2">
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
						avatarId={mate.avatarId}
						showDeleteButton={false}
						inversed={true}
						flexCol={true}
					/>
				</button>
			</form>
		{/each}
	</article>
{/if}

<style lang="postcss">
	::-webkit-scrollbar {
		@apply h-1;
	}

	/* Track */
	::-webkit-scrollbar-track {
		@apply bg-transparent;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		@apply bg-primary rounded-max;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		@apply bg-primary;
	}
</style>
