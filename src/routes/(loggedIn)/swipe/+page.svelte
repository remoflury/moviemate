<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import SwipeCard from '$lib/components/cards/swipeCard.svelte';

	export let data;

	console.log(data.movies);
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
			<SwipeCard {movie} {index} />
		{/each}
	</div>
</section>
