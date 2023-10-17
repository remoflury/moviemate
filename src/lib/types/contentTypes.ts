export type SearchMatesProps = {
	email: string;
	id: string;
	username: string;
};
export type ExistingMateProps = {
	id: string;
	username: string;
};

export type TMDBMovieByIdrops = {
	match?: boolean;
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string;
	};
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: string;
	poster_path: string;
	production_companies: {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	}[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type TMDBMovieByRecommendationProps = {
	match?: boolean;
	adult: boolean;
	backdrop_path: string;
	genre_ids: string[];
	id: number;
	media_type?: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: string;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type TMDBVideosByIdProps = {
	id: number;
	results: {
		iso_639_1: string;
		iso_3166_1: string;
		name: string;
		key: string;
		site: string;
		size: number;
		type: string;
		official: boolean;
		published_at: string;
		id: string;
	}[];
};


export type SearchResultProps = {
	total_pages: number,
	total_results: number,
	page: 1,
	results: TMDBMovieByRecommendationProps[]
}
