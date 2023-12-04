<script lang="ts">
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';
	import GoBackIcon from '../icons/goBackIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let initialAvatarId: number = 0;
	let currentAvatarIndex = initialAvatarId;

	const dispatch = createEventDispatcher();

	const sortAvatars = (arr: any[], index: number) => {
		return arr.slice(index).concat(arr.slice(0, index));
	};

	const avatars = [
		{
			id: 1,
			fileName: 'Female-Superhero.webp'
		},
		{
			id: 2,
			fileName: 'Female-Villain.webp'
		},
		{
			id: 3,
			fileName: 'Male-Superhero.webp'
		},
		{
			id: 4,
			fileName: 'Male-Villain.webp'
		},
		{
			id: 5,
			fileName: 'superhero_male_b.webp'
		}
	];
	const sortedAvatars = sortAvatars(avatars, initialAvatarId - 1);

	const options = {
		omitEnd: true,
		autoplay: false,
		type: 'loop',
		gap: '1.5rem'
	};

	const handleMove = (event: any) => {
		const imageNumber = event.detail.index + 1;

		dispatch('changeAvatar', {
			imageNumber: currentAvatarIndex
		});
	};

	const handleUpdateAvatarId = (direction: 'prev' | 'next') => {
		if (direction == 'prev') {
			if (currentAvatarIndex == 1) {
				currentAvatarIndex == sortedAvatars.length;
			} else {
				currentAvatarIndex--;
			}
		}
		if (direction == 'next') {
			if (currentAvatarIndex == sortedAvatars.length) {
				currentAvatarIndex = 1;
			} else {
				currentAvatarIndex++;
			}
		}
	};
</script>

<Splide {options} hasTrack={false} on:move={handleMove}>
	<div class="splide__arrows">
		<button
			type="button"
			on:click={() => handleUpdateAvatarId('prev')}
			class="splide__arrow splide__arrow--prev image-slider-btn absolute !-left-2 !top-1/2 !-translate-y-1/2 !-translate-x-full !h-8 !w-8"
		>
			<GoBackIcon />
		</button>
		<button
			type="button"
			on:click={() => handleUpdateAvatarId('next')}
			class="splide__arrow splide__arrow--next image-slider-btn absolute !-right-2 !top-1/2 !-translate-y-1/2 !translate-x-full !h-8 !w-8"
		>
			<div class="rotate-180">
				<GoBackIcon />
			</div>
		</button>
	</div>
	<SplideTrack>
		{#each sortedAvatars as avatar, index (index)}
			<SplideSlide>
				<figure class="aspect-square overflow-hidden rounded-max">
					<img
						class="object-cover object-center w-full h-full"
						src={`/assets/${avatar.fileName}`}
						alt="Avatar number {avatar.id.toString()}"
					/>
				</figure>
			</SplideSlide>
		{/each}
	</SplideTrack>
</Splide>
