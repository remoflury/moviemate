import type { Options } from "@splidejs/svelte-splide";

export const avatarImages = [
  {
    id: 1,
    path: '/assets/avatar-1.webp'
  },
  {
    id: 2,
    path: '/assets/avatar-2.webp'
  },
  {
    id: 3,
    path: '/assets/avatar-3.webp'
  },
  {
    id: 4,
    path: '/assets/avatar-4.webp'
  },
  {
    id: 5,
    path: '/assets/avatar-5.webp'
  }
];

export const SPLIDE_OPTIONS: Options = {
  type: 'loop',
  lazyLoad: 'nearby',
  gap: '2rem'
}