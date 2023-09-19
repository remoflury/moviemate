<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { mateStore } from '$lib/stores/mates';
	import Avatar from '$lib/components/mates/avatar.svelte';
	import InputMessage from '$lib/components/inputMessage.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import type { SearchMatesProps } from '$lib/types/contentTypes';

	let formData: any = null;
	let mates: SearchMatesProps[] = [];
	let error = '';
	let loading = false;

	$: console.log(mates);

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
</script>

<form
	action="/mate?/searchmate"
	method="POST"
	on:submit={() => {
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
	<input
		class="search"
		type="text"
		name="search-mate"
		id="search-mate"
		placeholder="Search mate"
		value={formData?.searchValue || ''}
	/>
	{#if error}
		<InputMessage message={error} success={false} />
	{/if}
</form>
{#if mates.length}
	{#each mates as mate, index (index)}
		<form action="/mate?/addnewmate" method="POST" use:enhance>
			<input type="hidden" name="new-mate-id" id={index.toString()} value={mate.id} />
			<button
				transition:slide={{ duration: 250 }}
				class="grid grid-cols-4 gap-x-4"
				aria-label="add mate to session"
				on:click={() => addMateToStore(mate.id, mate.username)}
			>
				<div class="col-span-1">
					<Avatar />
				</div>
				<p class="">{mate.username}</p>
			</button>
		</form>
	{/each}
{:else if mates.length === 0 && formData?.searchValue}
	<p transition:slide={{ duration: 250 }}>No mates found. Try again.</p>
{:else if loading}
	<LoadingSpinner />
{/if}
