<script lang="ts">
	import type { EventDetail, MoveEventDetail } from '@splidejs/svelte-splide/types'
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide'
	import '@splidejs/svelte-splide/css/core'
	import { createEventDispatcher, onMount } from 'svelte'
	import { SPLIDE_OPTIONS, avatarImages } from '$lib/utils/data'
	import Chevron from '$lib/assets/chevron.svelte'
	import AvatarImage from './avatarImage.svelte'
	export let initialAvatarIndex: number = 1

	const dispatch = createEventDispatcher()

	function handleMove(event: CustomEvent<MoveEventDetail> | undefined) {
		if (!event) return
		// index is 0 based
		dispatch('currentAvatarIndex', event.detail.index + 1)
	}

	function handleMount(event: CustomEvent<EventDetail<Record<string, unknown>>>) {
		if (initialAvatarIndex != 1) {
			event.detail.splide.go(initialAvatarIndex - 1)
		}
		dispatch(
			'currentAvatarIndex',
			initialAvatarIndex != 1 ? avatarImages[0].id : initialAvatarIndex
		)
	}
</script>

<div class="relative">
	<Splide
		hasTrack={false}
		options={{ ...SPLIDE_OPTIONS, padding: '2rem' }}
		on:moved={handleMove}
		on:mounted={handleMount}
	>
		<SplideTrack>
			{#each avatarImages as avatar, index}
				<SplideSlide>
					<AvatarImage path={avatar.path} alt="Avatar #{avatar.id}" />
				</SplideSlide>
			{/each}
		</SplideTrack>

		<div class="splide__arrows">
			<button
				type="button"
				class="splide__arrow splide__arrow--prev absolute top-1/2 left-0 -translate-y-1/2"
				aria-label="previous avatar image"
			>
				<figure class="w-4 aspect-square">
					<Chevron />
				</figure>
			</button>
			<button
				type="button"
				class="splide__arrow splide__arrow--next absolute top-1/2 right-0 -translate-y-1/2"
				aria-label="next avatar image"
			>
				<figure class="w-4 aspect-square rotate-180">
					<Chevron />
				</figure>
			</button>
		</div>
	</Splide>
</div>
