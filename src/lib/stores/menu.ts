import { writable } from 'svelte/store';

export const activeMenu = writable<'swipe' | 'profile' | 'mate'>('swipe');

export const bottomNavigationHeight = writable(0)
