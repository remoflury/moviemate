<script lang="ts">
	import type { TMDBMovieByIdrops, TMDBVideosByIdProps } from '$lib/types/contentTypes';
	import { previousPath, showGoBack, showSettings } from '$lib/stores/menu';
	$showGoBack = true;
	$showSettings = false;

	export let data;

	const movie: TMDBMovieByIdrops = data.movie;
	const video: TMDBVideosByIdProps = data.video;

	const voteRounded: number = parseFloat(movie.vote_average.toFixed(2));
	const releaseYear: string = movie.release_date.split('-')[0];
</script>

<section class="container">
	<article>
		{#if video.results.length}
			<iframe
				class="w-full aspect-video"
				src="https://www.youtube.com/embed/{video.results[0].key}"
				frameborder="0"
				title="video of {movie.title}"
				allowfullscreen
				allow="accelerometer; gyroscope;"
			/>
		{:else}
			<figure class="aspect-video overflow-hidden w-full">
				<img
					class="object-center object-cover w-full h-full"
					src="https://image.tmdb.org/t/p/w300/{movie.backdrop_path}"
					alt="movie poster of {movie.title}"
				/>
			</figure>
		{/if}
		<div class="flex justify-between mt-4">
			<h1 class="mb-1">{movie.title}</h1>
			<p class="info whitespace-nowrap">{voteRounded} / 10</p>
		</div>
		<p class="info mb-6">{releaseYear} / {movie.genres[0].name}</p>
		<p>{movie.overview}</p>
	</article>
</section>
