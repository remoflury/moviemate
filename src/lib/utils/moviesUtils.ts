import type { TMDBVideosByIdProps } from "$lib/types/contentTypes";

export const getMatchesAndNotMatchesArray = (array: {movies_watchlist: string}[]) => {
	// generate an array with matched movie ids and an array with not matched movie ids
	const counts = array
		.flatMap((item) => item.movies_watchlist)
		.reduce((acc: {[key: string]: number}, value: string) => {
			acc[value] = (acc[value] || 0) + 1;
			return acc;
		}, {});

	const matchedMovieIds = [];
	const notMatchedMovieIds = [];

	for (const [key, value] of Object.entries(counts)) {
		if (value === 1) {
			notMatchedMovieIds.push(key);
		} else {
			matchedMovieIds.push(key);
		}
	}

	return {
		matchedMovieIds,
		notMatchedMovieIds
	};
};

export const generateRandomIndex = <T>(array: T[]): number => {
	return Math.floor(Math.random() * array.length);
};

export const getMovieById = async (movieId: string, tmdbUrl: string, tmdbAuthKey: string) => {
	// fetch tmdb movies by id
	const response = await fetch(`${tmdbUrl}/movie/${movieId}?language=en-US`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${tmdbAuthKey}`
		}
	});

	const data = await response.json();
	if (data?.success === false) {
		throw new Error('Error loading movies.');
	}

	return data;
};

export const getVideoById = async (movieId: string, tmdbUrl: string, tmdbAuthKey: string): Promise<TMDBVideosByIdProps> => {
	// fetch tmdb video details of movie id
	const response = await fetch(`${tmdbUrl}/movie/${movieId}/videos?language=en-US`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${tmdbAuthKey}`
		}
	})

	const data = await response.json()

	if (data?.success === false) {
		throw new Error('Error loading movies.');
	}

	return data
}

export const getMovieRecommendationsById = async (
	movieId: string,
	tmdbUrl: string,
	tmdbAuthKey: string,
	page: number = 1
) => {
	// fetch recommended tmdb movies by movie id
	const response = await fetch(
		`${tmdbUrl}/movie/${movieId}/recommendations?page=${page}&language=en-US`,
		{
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${tmdbAuthKey}`
			}
		}
	);

	const data = await response.json();
	
	// error handling
	if (data?.success === false) {
		throw new Error('Error loading movies.');
	}

	return data.results;
};
