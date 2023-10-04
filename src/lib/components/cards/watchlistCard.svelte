<script lang="ts">
	import type { TMDBMovieByIdrops, TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import { fly } from 'svelte/transition';
	export let showDeleteButton: boolean = true;
	export let content: TMDBMovieByIdrops | TMDBMovieByRecommendationProps;
	export let index: number;

	const removeMovieFromWatchlist = (id: number) => {
		console.log('To Do Remo');
	};
</script>

<a href="/mate/findmovies/{content.id}" transition:fly={{ duration: 350, delay: index * 150 }}>
	<figure class="rounded-3xl overflow-hidden aspect-3/4">
		<img
			class="object-center object-cover w-full h-full"
			src="https://image.tmdb.org/t/p/w154/{content.poster_path}"
			alt="Movieposter of {content.title}"
			loading="lazy"
		/>
		{#if showDeleteButton}
			<button
				aria-label="remove movie"
				class="absolute bottom-0 right-0 border border-gray-dark rounded-max p-[6px] aspect-square grid place-content-center bg-white translate-x-1/4 translate-y-1/4"
				on:click={() => removeMovieFromWatchlist(content.id)}
			>
				<p class="text-gray-dark leading-none -translate-y-[1px]">-</p>
			</button>
		{/if}
	</figure>
</a>
