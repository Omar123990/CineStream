import axios from "axios";
import { MovieResponse } from "@/types/movie";

export async function getDiscoverTV(page: number = 1): Promise<MovieResponse> {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/tv",
    params: {
      include_adult: "false",
      include_null_first_air_dates: "false",
      language: "en-US",
      page: page.toString(),
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await axios.request<MovieResponse>(options);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "TMDB TV Error:",
        err.response?.data?.status_message || err.message,
      );
    } else {
      console.error("Unexpected Error:", err);
    }
    throw err;
  }
}
