type ImageSizes = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';

export function getRandomIndex<T>(array: T[]) {
  return Math.floor(Math.random() * array.length);
}

export function getTMDBImageUrl(path: string, size: ImageSizes = 'w500') {
  return `https://image.tmdb.org/t/p/${size}/${path}`
}