<script lang="ts">
	import type { TMDBMovieByIdrops, TMDBVideosByIdProps } from '$lib/types/contentTypes';

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
		<figure>
			<img
				src="https://image.tmdb.org/t/p/w500/{movie.backdrop_path}"
				alt="movie poster of {movie.title}"
			/>
		</figure>
	{/if}
	<div class="flex justify-between">
		<h1>{movie.title}</h1>
		<p class="info">{voteRounded} / 10</p>
	</div>
	<p class="info pb-6">{releaseYear} / {movie.genres[0].name}</p>
	<p>{movie.overview}</p>
	</article>
</section>
