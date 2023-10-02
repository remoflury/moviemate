import { writable } from 'svelte/store';

export const activeMenu = writable<'swipe' | 'profile' | 'mate'>('swipe');

export const bottomNavigationHeight = writable(0)

export const showGoBack = writable(false);

export const showSettings = writable(false);

export const previousPath = writable('/');