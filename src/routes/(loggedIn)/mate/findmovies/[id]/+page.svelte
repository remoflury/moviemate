<script lang="ts">
	import type { TMDBMovieByIdrops, TMDBVideoProps } from '$lib/types/contentTypes';
	import { previousPath, showGoBack, showSettings } from '$lib/stores/menu';
	$showGoBack = true;
	$showSettings = false;
	// $previousPath.path = '/mate/findmovies';

	export let data;

	const movie: TMDBMovieByIdrops = data.movie;
	const video: TMDBVideoProps[] = data.video;

	const voteRounded: number = parseFloat(movie.vote_average.toFixed(1));
	const releaseYear: string = movie.release_date.split('-')[0];
</script>

<section class="container">
	<article>
		{#if video.length}
			<iframe
				class="w-full aspect-video"
				src="https://www.youtube.com/embed/{video[0].key}"
				frameborder="0"
				title="video of {movie.title}"
				allowfullscreen
				allow="accelerometer; gyroscope;"
			/>
		{:else}
			<figure class="aspect-video overflow-hidden w-full">
				<img
					class="object-center object-cover w-full h-full"
					src="https://image.tmdb.org/t/p/w300/{movie.backdrop_path || movie.poster_path}"
					alt="movie poster of {movie.title}"
				/>
			</figure>
		{/if}
		<div class="flex justify-between items-end mt-4 mb-1">
			<h1 class="mb-0">{movie.title}</h1>
			{#if voteRounded}
				<p class="info whitespace-nowrap">{voteRounded} / 10</p>
			{/if}
		</div>
		<p class="info mb-6">{releaseYear} / {movie.genres[0].name}</p>
		<p>{movie.overview}</p>
	</article>
</section>
