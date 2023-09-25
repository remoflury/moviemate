import type { ExistingMateProps, SearchMatesProps } from '$lib/types/contentTypes';

export const createSearchMateProps = (input: Record<string, string>[]): SearchMatesProps[] => {

	// create more usable object of search Mates result object
	const searchMates: SearchMatesProps[] = input.map((mate: Record<string, string>) => {
		return {
			id: mate.users_id,
			email: mate.users_email,
			username: mate.users_username
		};
	});
	return searchMates;
};

export const createExistingMateProps = (input: Record<string, string>[]): ExistingMateProps[] => {
	// create more usable object of existing Mates result object
	const existingMates: ExistingMateProps[] = input.map((mate) => {
		return {
			id: mate.users_id,
			username: mate.users_username
		};
	});
	return existingMates;
};
