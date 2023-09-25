<script lang="ts">
	import type { TMDBMovieByIdrops } from '$lib/types/contentTypes';

	export let content: TMDBMovieByIdrops;
</script>

<figure class="rounded-card overflow-hidden relativ">
	<img
		src="https://image.tmdb.org/t/p/original/{content.poster_path}"
		alt="Movieposter of {content.title}"
	/>

    <span class="absolute inset-x-0 bottom-0 left-1/2"><p>match</p></span>

</figure>

