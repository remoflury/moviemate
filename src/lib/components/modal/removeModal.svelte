<script lang="ts">
	import { removeMovie, watchlistCount } from '$lib/stores/watchlist';
	import { fly } from 'svelte/transition';
	import ModalButton from './modalButton.svelte';
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { watchlist } from '$lib/utils/profile';

	const confirm = async () => {
		try {
			const response = await fetch(
				`${PUBLIC_APP_URL}/api/watchlist/remove?movieid=${$removeMovie.id}`
			);
			const data = await response.json();
			$removeMovie.showModal = false;
			$watchlistCount--;
			window.scrollTo(0, $removeMovie.pageYOffset);

			$watchlist = $watchlist.filter((movie) => movie.id != $removeMovie.id);
		} catch (error) {
			console.error(error);
		}
	};

	const deny = () => {
		$removeMovie.showModal = false;
		window.scrollTo(0, $removeMovie.pageYOffset);
	};
</script>

{#if $removeMovie.showModal}
	<div transition:fly={{ duration: 350, y: 200 }} class="absolute inset-0 bg-black bg-opacity-30">
		<div class="min-h-[70vh] grid place-content-center">
			<article class="bg-black p-6 border border-gray-dark rounded-md">
				<p class="text-center font-heading text-2xl">
					Are you sure to remove {$removeMovie.movieTitle}?
				</p>
				<div class="flex gap-x-6 items-center justify-center mt-4">
					<ModalButton text="YES" on:press={async () => await confirm()} />
					<ModalButton text="NEIN" on:press={deny} />
				</div>
			</article>
		</div>
	</div>
{/if}
