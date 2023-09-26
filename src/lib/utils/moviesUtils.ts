import type { TMDBMovieByIdrops, TMDBMovieByRecommendationProps, TMDBVideosByIdProps } from '$lib/types/contentTypes';
import type { SupabaseClient } from '@supabase/supabase-js';


export const getMatchesAndNotMatchesArray = (array: { movies_watchlist: string[] }[]) => {
  // If the array is empty or contains a single element, we can't find matches
  if (array.length <= 1) {
    return { matchedMovieIds: [], notMatchedMovieIds: [] };
  }

  // Count occurrences of each movie ID
  const counts: { [key: string]: number } = {};
  array.forEach((item) => {
    item.movies_watchlist.forEach((movieId) => {
      counts[movieId] = (counts[movieId] || 0) + 1;
    });
  });

  const matchedMovieIds: string[] = [];
  const notMatchedMovieIds: string[] = [];

  // Check if a movie ID exists in all of the arrays
  for (const [key, value] of Object.entries(counts)) {
    if (value === array.length) {
      matchedMovieIds.push(key);
    } else {
      notMatchedMovieIds.push(key);
    }
  }

  return {
    matchedMovieIds,
    notMatchedMovieIds,
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

export const getVideoById = async (
	movieId: string,
	tmdbUrl: string,
	tmdbAuthKey: string
): Promise<TMDBVideosByIdProps> => {
	// fetch tmdb video details of movie id
	const response = await fetch(`${tmdbUrl}/movie/${movieId}/videos?language=en-US`, {
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

export const filterMoviesWithEmptyPoster = <T extends TMDBMovieByIdrops[] | TMDBMovieByRecommendationProps[]>(movies: T): T => {
	// filter out movies without poster
	const newMoviesArray = movies.filter((movie: TMDBMovieByIdrops | TMDBMovieByRecommendationProps) => {
		if (movie.poster_path != null) {
			return movie;
		}
	})
	return newMoviesArray as T
}

export const getAllMovieIds = async (supabaseClient: SupabaseClient, userIdsArray: string[]): Promise<{movies_watchlist: string[]}[]> => {
	const { data, error } = await supabaseClient
		.from('Users_movies')
		.select('movies_watchlist')
		.in('movies_users_id', userIdsArray);

	if (error) {
		throw Error('Error loading movies.');
	}

	return data;
};

export const getPopularMovies = async (tmdbUrl: string, tmdbAuthKey: string, page: number = 1) => {
	const response = await fetch(`${tmdbUrl}/movie/popular?page=${page}&language=en-US`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${tmdbAuthKey}`
		}
	})

	const data = await response.json();

	if (data?.success === false) {
		throw new Error('Error loading movies.');
	}

	// filter out movies without poster
	const results = filterMoviesWithEmptyPoster(data.results)

	return results
}

export const updateMovieIds = async (supabaseClient: SupabaseClient, userId: string, movieId: string) => {
	// get all movies of user
	let movieIds: string[] = []
	try {
		const response = await getAllMovieIds(supabaseClient, [userId])
		movieIds  = response[0].movies_watchlist
	} catch(error) {
		throw Error("Error loading movies")
	}

	// if movieId is already in watchlist, return early
	if (movieIds.includes(movieId)) return

	// add movie to watchlist
	movieIds.push(movieId)

	// insert movieIds to db
	const { error } = await supabaseClient
		.from('Users_movies')
		.update({'movies_watchlist': movieIds})
		.eq('movies_users_id', userId)

		if (error) {
			throw Error("Error updating movies")
		}

}