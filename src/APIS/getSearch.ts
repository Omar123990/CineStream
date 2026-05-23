export interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: "movie" | "tv" | "person";
}

export async function getSearchResults(query: string): Promise<{ results: SearchResult[] }> {
  if (!query) return { results: [] };

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGM0NjQyZTA1NTMwMzM5OGUyNTFiNzcyMGIxZWFhZiIsIm5iZiI6MTc2ODkzMDE1MC42MjYsInN1YiI6IjY5NmZiYjY2OWRiZDAwMmZhMmYyYjkwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NiLUjQvpUXiRYWoQPb1aO6_vd6g4CbkqPTbx6PgZy8U";

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error("TMDB API Error Details:", errorData);
    throw new Error("Failed to fetch search results");
  }

  return res.json();
}