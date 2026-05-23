export interface Movie {
  id: number;
  title?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  adult: boolean;
  video: boolean;
  original_language: string;
  media_type?: string;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  last_air_date?: string;
  videoKey?: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Video {
  key: string;
  site: string;
  type: string;
}
export interface VideoResponse {
  results: Video[];
}

export interface DetailsData extends Movie {
  genres: Genre[];
  runtime?: number;
  credits: {
    cast: CastMember[];
  };
  videos: {
    results: Video[];
  };
  recommendations: {
    results: Movie[];
  };
}
