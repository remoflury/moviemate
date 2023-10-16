<script lang="ts">
	import { removeMovie } from '$lib/stores/watchlist';
	import type { TMDBMovieByIdrops, TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	import { fly } from 'svelte/transition';

	export let showDeleteButton: boolean = true;
	export let content: TMDBMovieByIdrops | TMDBMovieByRecommendationProps;
	// export let index: number;

	let y: number;

	const triggerModal = (id: number, movieTitle: string) => {
		window.scrollTo(0, 0);
		$removeMovie.showModal = true;
		$removeMovie.id = id;
		$removeMovie.movieTitle = movieTitle;
		$removeMovie.pageYOffset = y;
	};
</script>

<svelte:window bind:scrollY={y} />
<a class="relative" href="/mate/findmovies/{content.id}">
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
				class="absolute bottom-0 right-0 border border-gray-dark rounded-max w-5 aspect-square grid place-content-center bg-white translate-x-1/4 translate-y-1/4"
				on:click|preventDefault={() => triggerModal(content.id, content.title)}
			>
				<p class="text-gray-dark leading-none -translate-y-[1px]">-</p>
			</button>
		{/if}
	</figure>
</a>
