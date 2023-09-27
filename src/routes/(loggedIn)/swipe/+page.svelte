<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import SwipeCard from '$lib/components/cards/swipeCard.svelte';
	import { fade } from 'svelte/transition';

	export let data;

	let count = 0;

	// console.log(data.movies);
</script>

<section class="container">
	<h1 hidden>Swipe</h1>
	<div class="relative">
		<!-- <article class="overflow-hidden rounded-5xl absolute" on:touchstart={() => console.log('test')}>
			<figure>
				<img
					src="https://image.tmdb.org/t/p/w500/{data.movies[0].poster_path}"
					alt="movie poster of {data.movies[0].title}"
				/>
			</figure>
		</article> -->

		{#each data.movies as movie, index (index)}
			{#if index === count}
				<div transition:fade={{ duration: 350 }}>
					<SwipeCard
						{movie}
						{index}
						on:swipeRight={() => count++}
						on:swipeLeft={() => console.log('left')}
					/>
				</div>
			{/if}
		{/each}
	</div>
</section>
