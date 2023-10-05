import { writable } from "svelte/store";

export const removeMovie = writable({
  id: 0,
  movieTitle: '',
  showModal: false,
  pageYOffset: 0
})