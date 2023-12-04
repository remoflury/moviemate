<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { fade, slide } from 'svelte/transition';
	import { mateStore } from '$lib/stores/mates';
	import Avatar from '$lib/components/mates/avatar.svelte';
	import InputMessage from '$lib/components/inputMessage.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import type { SearchMatesProps } from '$lib/types/contentTypes';

	let formData: any = null;
	let mates: SearchMatesProps[] = [];
	let error = '';
	let loading = false;
	let searchValue = '';

	const handleFormData = async (resultObject: ActionResult) => {
		if (resultObject.type === 'error' || resultObject.type === 'failure')
			return (error = 'Ups, there was an error / failure.');

		if (resultObject.type === 'success') {
			formData = resultObject.data;
			mates = [...resultObject?.data?.result] || [];
			loading = false;
			await applyAction(resultObject);
		}
	};

	const addMateToStore = (id: string, username: string) => {
		// if id is already in mates store, return early
		if ($mateStore.mates.some((item) => item.id === id)) return;

		// if users id is equal to selected mate, return early (can not add yourself)
		if ($page.data.userId === id) return setTimeOutError('Try adding another mate than yourself.');
		// else push it to store
		$mateStore.mates = [...$mateStore.mates, { id, username }];
	};

	const setTimeOutError = (errorMessage: string) => {
		error = errorMessage;
		setTimeout(() => {
			error = '';
		}, 3000);
	};

	const clearSearch = () => {
		searchValue = '';
		mates = [];
	};
</script>

<form
	action="/mate?/searchmate"
	method="POST"
	on:submit|preventDefault={() => {
		loading = true;
		mates = [];
	}}
	use:enhance={() => {
		return async ({ result }) => {
			await handleFormData(result);
		};
	}}
>
	<label for="search-mate" hidden>Mate suchen</label>
	<div class="relative">
		<input
			class="search mt-0"
			type="text"
			name="search-mate"
			id="search-mate"
			placeholder="Search mate"
			bind:value={searchValue}
		/>
		<!-- value={formData?.searchValue || ''} -->

		{#if searchValue}
			<button
				transition:fade={{ duration: 350 }}
				type="button"
				on:click|preventDefault={clearSearch}
				class="absolute top-1/2 right-2.5 transform -translate-y-1/2 border-none cursor-pointer"
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
					><path
						class="fill-black"
						d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
					/></svg
				>
			</button>
		{/if}
	</div>

	{#if error}
		<InputMessage message={error} success={false} />
	{/if}
</form>
{#if mates.length}
	<div class="mt-4">
		{#each mates as mate, index (index)}
			<form action="/mate?/addnewmate" method="POST" use:enhance>
				<input type="hidden" name="new-mate-id" id={index.toString()} value={mate.id} />
				<button
					transition:slide={{ duration: 250 }}
					class="grid grid-cols-4 gap-4 items-center"
					aria-label="add mate to session"
					on:click={() => addMateToStore(mate.id, mate.username)}
				>
					<div class="col-span-1 m-2">
						<Avatar />
					</div>
					<p class="">{mate.username}</p>
				</button>
			</form>
		{/each}
	</div>
{:else if mates.length === 0 && formData?.searchValue}
	<p transition:slide={{ duration: 250 }}>No mates found. Try again.</p>
{:else if loading}
	<LoadingSpinner />
{/if}
