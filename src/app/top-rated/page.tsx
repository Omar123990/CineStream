import { getTopRatedMovies } from "@/APIS/getMovies";
import MediaLibrary from "@/components/MediaLibrary";

interface TopRatedPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function TopRatedPage({
  searchParams,
}: TopRatedPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const data = await getTopRatedMovies(currentPage);

  return (
    <main className="min-h-screen bg-[#16111B] pt-28 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <MediaLibrary
          title="Top Rated Movies"
          results={data.results}
          currentPage={currentPage}
          totalPages={data.total_pages}
          type="movie"
          basePath="/top-rated"
        />
      </div>
    </main>
  );
}
