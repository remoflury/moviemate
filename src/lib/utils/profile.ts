import type { TMDBMovieByIdrops } from '$lib/types/contentTypes';
import { writable } from 'svelte/store';

export const watchlist = writable<TMDBMovieByIdrops[]>([]);
