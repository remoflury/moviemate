<script lang="ts">
	import Avatar from './avatar.svelte';
	import { mateStore } from '$lib/stores/mates';
	export let name: string;
	export let id: string = '';
	export let avatarId: number;
	export let showDeleteButton: boolean = true;
	export let inversed: boolean = false;
	export let flexCol: boolean = false;

	const removeUserFromStore = (id: string) => {
		// find index of user in store
		const index = $mateStore.mates.findIndex((mate) => mate.id === id);

		// if user is in store, remove it
		if (index !== -1) {
			$mateStore.mates.splice(index, 1);
			$mateStore.mates = [...$mateStore.mates];
		}
	};
</script>

<div class="flex gap-4 {flexCol ? 'flex-col ' : 'justify-start items-center'}">
	<div class="w-16 basis-[30%] relative">
		<Avatar border={true} {avatarId} />
		{#if showDeleteButton}
			<button
				aria-label="remove mate"
				class="absolute bottom-0 right-0 border border-gray-dark rounded-max w-5 aspect-square grid place-content-center bg-white translate-x-1/4 translate-y-1/4"
				on:click={() => removeUserFromStore(id)}
			>
				<p class="text-gray-dark leading-none -translate-y-[1px]">-</p>
			</button>
		{/if}
	</div>
	<p class="{inversed ? 'text-gray-dark' : 'text-black'} text-sm hyphens-auto">
		{name.toLowerCase()}
	</p>
</div>
