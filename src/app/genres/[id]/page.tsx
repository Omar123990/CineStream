import {
  getMoviesByGenre,
  getGenresList,
  Genre,
} from "@/APIS/getDiscoverMovies";
import MediaLibrary from "@/components/MediaLibrary";
import Link from "next/link";
import { notFound } from "next/navigation";

interface GenrePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GenrePage({
  params,
  searchParams,
}: GenrePageProps) {
  const { id } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const genres: Genre[] = await getGenresList();
  const data = await getMoviesByGenre(id, currentPage);

  if (!data) return notFound();

  const currentGenre = genres.find((g) => g.id.toString() === id);
  const title = currentGenre ? `${currentGenre.name} Movies` : "Movies Library";

  return (
    <main className="min-h-screen bg-[#0F0A13] pt-28 pb-10" dir="ltr">
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-28 space-y-8">
                <div className="flex items-center gap-3 px-2 border-l-4 mb-4 border-[#B76DFF]">
                  <h3 className="text-white font-black text-3xl uppercase tracking-tighter ">
                    Genres
                  </h3>
                </div>

                <nav className="flex flex-wrap lg:flex-col gap-3 max-h-[50vh] lg:max-h-[75vh] overflow-y-auto custom-scrollbar pr-3 text-left">
                  {genres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/genres/${genre.id}`}
                      className={`px-6 py-4 rounded-2xl text-base md:text-lg font-bold transition-all duration-300 border flex justify-between items-center ${
                        id === genre.id.toString()
                          ? "bg-linear-to-r from-[#B76DFF] to-[#0566D9] text-white border-transparent shadow-[0_10px_25px_rgba(183,109,255,0.3)] scale-105"
                          : "text-gray-400 border-white/5 bg-white/5 hover:bg-white/10 hover:text-[#B76DFF] hover:border-[#B76DFF]/30 hover:shadow-[0_0_20px_rgba(183,109,255,0.1)] hover:scale-[1.02]"
                      }`}
                    >
                      {genre.name}
                      {id === genre.id.toString() && (
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="flex-1 w-full min-w-0">
              <MediaLibrary
                title={title}
                results={data.results}
                currentPage={currentPage}
                totalPages={data.total_pages}
                type="movie"
                basePath={`/genres/${id}`}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
