<script lang="ts">
	import type { TMDBMovieByIdrops } from '$lib/types/contentTypes';

	export let content: TMDBMovieByIdrops;
</script>

<figure class="rounded-card overflow-hidden relative">
	<img
		src="https://image.tmdb.org/t/p/original/{content.poster_path}"
		alt="Movieposter of {content.title}"
	/>
</figure>
