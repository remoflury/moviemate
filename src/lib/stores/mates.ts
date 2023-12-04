import { writable } from 'svelte/store';
type MatesProps = {
	id: string;
	username: string;
	avatarId: number
};
export const mateStore = writable({
	mates: [] as MatesProps[] // {id: string, username: string}
});
