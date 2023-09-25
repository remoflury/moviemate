<script lang="ts">
	import type { TMDBMovieByIdrops } from '$lib/types/contentTypes';

	export let data;

	const movie: TMDBMovieByIdrops = data.movie;

	const voteRounded: number = parseFloat(movie.vote_average.toFixed(2));
	const releaseYear: string = movie.release_date.split('-')[0];
</script>

<section>
	<figure>
		<img
			src="https://image.tmdb.org/t/p/w500/{movie.backdrop_path}"
			alt="movie poster of {movie.title}"
		/>
	</figure>
	<h1>{movie.title}</h1>
	<p>{voteRounded} / 10</p>
	<p>{releaseYear} / {movie.genres[0].name}</p>
	<p>{movie.overview}</p>
</section>
