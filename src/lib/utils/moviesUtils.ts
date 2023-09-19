export const getMatchesAndNotMatchesArray = <T>(array: T[]) => {
	const counts = array
		.flatMap((item) => item.movies_watchlist)
		.reduce((acc, value) => {
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

export const getMovieById = async (movieId: string, tmdbUrl: string, tmdbAutKey: string) => {
	const response = await fetch(`${tmdbUrl}/movie/${movieId}?language=en-US`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${tmdbAutKey}`
		}
	});

	const data = await response.json();
	if (data?.success === false) {
		throw new Error('Error loading movies.');
	}

	// TODO: typing
	return data;
};

export const getMovieRecommendationsById = async (
	movieId: string,
	tmdbUrl: string,
	tmdbAutKey: string,
	page: number = 1
) => {
	const response = await fetch(
		`${tmdbUrl}/movie/${movieId}/recommendations?page=${page}&language=en-US`,
		{
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${tmdbAutKey}`
			}
		}
	);

	const data = await response.json();

	if (data?.success === false) {
		throw new Error('Error loading movies.');
	}

	// TODO: typing
	return data.results;
};
