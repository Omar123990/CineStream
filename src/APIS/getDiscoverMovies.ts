import { MovieResponse } from "@/types/movie";
import { api } from "./axiosInstance";

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export async function getDiscoverMovies(page: number = 1): Promise<MovieResponse> {
  try {
    const res = await api.get<MovieResponse>('/discover/movie', {
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: page.toString(),
        sort_by: "popularity.desc",
      }
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching discover movies:", err);
    throw err;
  }
}

export async function getGenresList(): Promise<Genre[]> {
  try {
    const res = await api.get<GenreResponse>('/genre/movie/list', {
      params: {
        language: 'en'
      }
    });
    return res.data.genres;
  } catch (err) {
    console.error("Error fetching genres list:", err);
    return [];
  }
}

export async function getMoviesByGenre(genreId: string, page: number = 1): Promise<MovieResponse> {
  try {
    const res = await api.get<MovieResponse>('/discover/movie', {
      params: {
        with_genres: genreId,
        page: page.toString(),
        sort_by: 'popularity.desc'
      }
    });
    return res.data;
  } catch (err) {
    console.error(`Error fetching movies for genre ${genreId}:`, err);
    throw err;
  }
}