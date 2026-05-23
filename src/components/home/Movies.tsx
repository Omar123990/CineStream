import { getTrindsMovies } from "@/APIS/getMovies";
import AnimatedGrid from "@/components/AnimatedGrid";
import Link from "next/link";

export default async function Movies() {
  const movies = await getTrindsMovies();

  return (
    <section id="movies" className="py-24 bg-[#16111B]">
      <div className="container mx-auto px-6 md:px-20">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1.5 h-6 bg-linear-to-b from-[#B76DFF] to-[#0566D9] rounded-full" />
              <h2 className="text-[#CFC2D6] text-lg font-medium tracking-widest uppercase">
                Explore Library
              </h2>
            </div>
            <h3 className="text-[#EADFED] text-4xl md:text-5xl font-bold italic tracking-tighter">
              Featured Movies
            </h3>
          </div>

          <Link 
            href="/movies" 
            className="text-[#B76DFF] hover:text-[#DDB7FF] font-semibold flex items-center gap-2 transition-colors group"
          >
            View All Library
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {movies && movies.length > 0 ? (
          <AnimatedGrid results={movies} type="movie" />
        ) : (
          <div className="py-20 text-center border border-white/5 rounded-3xl bg-white/5">
            <p className="text-gray-500">No movies found at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}