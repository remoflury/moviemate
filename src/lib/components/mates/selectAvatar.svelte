<script lang="ts">
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';
	import GoBackIcon from '../icons/goBackIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let initialAvatarId: number = 0;
	let currentAvatarIndex = initialAvatarId;
	let splide: Splide;

	// $: console.log(currentAvatarIndex - 1);

	const dispatch = createEventDispatcher();

	// const sortAvatars = (arr: any[], index: number) => {
	// 	return arr.slice(index).concat(arr.slice(0, index));
	// };

	const avatars = [
		{
			id: 1,
			fileName: 'avatar-1.webp'
		},
		{
			id: 2,
			fileName: 'avatar-2.webp'
		},
		{
			id: 3,
			fileName: 'avatar-3.webp'
		},
		{
			id: 4,
			fileName: 'avatar-4.webp'
		},
		{
			id: 5,
			fileName: 'avatar-5.webp'
		}
	];
	// const sortedAvatars = sortAvatars(avatars, initialAvatarId - 1);

	const options = {
		omitEnd: true,
		autoplay: false,
		type: 'loop',
		gap: '1.5rem'
	};

	const handleMove = (event: any) => {
		// console.log('event ', event);
		const imageNumber = event.detail.index + 1;
		// console.log('imageNumber ', imageNumber);
		// console.log('currentIndex ', event.detail.index);
		dispatch('changeAvatar', {
			imageNumber: imageNumber
		});
	};

	const handleUpdateAvatarId = (direction: 'prev' | 'next') => {
		if (direction == 'prev') {
			if (currentAvatarIndex == 1) {
				currentAvatarIndex == avatars.length;
			} else {
				currentAvatarIndex--;
			}
		}
		if (direction == 'next') {
			if (currentAvatarIndex == avatars.length) {
				currentAvatarIndex = 1;
			} else {
				currentAvatarIndex++;
			}
		}
	};
</script>

<Splide
	{options}
	bind:this={splide}
	hasTrack={false}
	on:moved={handleMove}
	on:mounted={() => splide.go(initialAvatarId - 1)}
>
	<div class="splide__arrows">
		<button
			on:click={() => handleUpdateAvatarId('prev')}
			type="button"
			class="splide__arrow splide__arrow--prev image-slider-btn absolute !-left-2 !top-1/2 !-translate-y-1/2 !-translate-x-full !h-8 !w-8"
		>
			<GoBackIcon />
		</button>
		<button
			on:click={() => handleUpdateAvatarId('next')}
			type="button"
			class="splide__arrow splide__arrow--next image-slider-btn absolute !-right-2 !top-1/2 !-translate-y-1/2 !translate-x-full !h-8 !w-8"
		>
			<div class="rotate-180">
				<GoBackIcon />
			</div>
		</button>
	</div>
	<SplideTrack>
		{#each avatars as avatar, index (index)}
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
