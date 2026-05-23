import { getDiscoverMovies } from "@/APIS/getDiscoverMovies";
import MediaLibrary from "@/components/MediaLibrary";

interface Metadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
  };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_KEY`,
  ).then((res) => res.json());

  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const data = await getDiscoverMovies(currentPage);

  return (
    <MediaLibrary
      title="Movies Library"
      results={data.results}
      currentPage={currentPage}
      totalPages={data.total_pages}
      type="movie"
      basePath="/movies"
    />
  );
}
