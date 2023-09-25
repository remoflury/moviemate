<script lang="ts">
	import type { TMDBMovieByIdrops } from '$lib/types/contentTypes';

	export let content: TMDBMovieByIdrops;
    export let isMatch: boolean = false;

</script>

{#if isMatch}
<figure class="rounded-card overflow-hidden relative">
    <img
        src="https://image.tmdb.org/t/p/original/{content.poster_path}"
        alt="Movieposter of {content.title}"
    />

    <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 ">
        <p class="bg-primary text-white rounded-t-lg py-2 px-10 text-lg font-bold">MATCH</p>
    </span>
</figure>
{/if}
