import type { ImageSizes } from "$lib/types/TMDB";

export function getRandomIndex<T>(array: T[]) {
  return Math.floor(Math.random() * array.length);
}

export function getTMDBImageUrl(path: string, size: ImageSizes = 'w500') {
  return `https://image.tmdb.org/t/p/${size}/${path}`
}