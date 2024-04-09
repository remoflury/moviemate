export function getRandomIndex<T>(array: T[]) {
  return Math.floor(Math.random() * array.length);
}