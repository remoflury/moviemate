<script lang="ts">
	import type { TMDBMovieByIdrops, TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';
	export let showDeleteButton: boolean = true;
	export let content: TMDBMovieByIdrops | TMDBMovieByRecommendationProps;

    const removeMovieFromWatchlist = (id: number) => {
		console.log("To Do Remo");
	};

</script>

<a href="/mates/findmovies/{content.id}">
	<figure class="rounded-3xl overflow-hidden relative">
		<img
			src="https://image.tmdb.org/t/p/w300/{content.poster_path}"
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