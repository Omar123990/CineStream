import { api } from "./axiosInstance";
import { MovieResponse, Movie, VideoResponse } from "@/types/movie";

export async function getTrindsMovies(): Promise<Movie[]> {
  const res = await api.get<MovieResponse>("/trending/movie/day");
  return res.data.results.slice(0, 20);
}

export async function getMovieVideoKey(
  movieId: number,
): Promise<string | undefined> {
  const res = await api.get<VideoResponse>(`/movie/${movieId}/videos`);

  const trailer = res.data.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  return trailer?.key;
}

export async function getTopRatedMovies(
  page: number = 1,
): Promise<MovieResponse> {
  const res = await api.get<MovieResponse>("/movie/top_rated", {
    params: {
      page: page,
      language: "en-US",
    },
  });
  return res.data;
}
