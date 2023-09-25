<script lang="ts">
	import type { TMDBMovieByIdrops, TMDBMovieByRecommendationProps } from '$lib/types/contentTypes';

	export let content: TMDBMovieByIdrops|TMDBMovieByRecommendationProps;
    export let isMatch: boolean = false;

</script>


<a href="/mate/findmovies/{content.id}">
    <figure class="rounded-3xl overflow-hidden relative">
    <img
        src="https://image.tmdb.org/t/p/original/{content.poster_path}"
        alt="Movieposter of {content.title}"
    />
    {#if isMatch}
    <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 ">
        <p class="bg-primary text-white rounded-t text-xs py-1 px-5 font-bold">MATCH</p>
    </span>
    {/if}
</figure>
</a>

