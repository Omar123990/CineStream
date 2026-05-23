import { getTrindsMovies } from "@/APIS/getTrindsMovies";
import Image from "next/image";
import Link from "next/link";

export default async function Trinds() {
  const { results } = await getTrindsMovies();

  if (results.length === 0)
    return (
      <section>
        <div className="container py-12">
          <h2 className="font-bold text-3xl md:text-[32px] leading-tight text-[#EADFED]">
            Trending Now
          </h2>
          <p className="text-[#CFC2D6] text-sm">No trending movies found.</p>
        </div>
      </section>
    );

  return (
    <section id="trinds" className="py-12 bg-[#16111B]">
      <div className="container">
        <div className="flex gap-4 items-center text-[#EADFED] mb-10">
          <h2 className="font-bold text-3xl md:text-[32px] leading-tight">
            Trending Now
          </h2>
          <svg
            width="24"
            height="16"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#B76DFF] drop-shadow-[0_0_8px_rgba(183,109,255,0.5)]"
          >
            <path
              d="M1.4 12L0 10.6L7.4 3.15L11.4 7.15L16.6 2H14V0H20V6H18V3.4L11.4 10L7.4 6L1.4 12Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative overflow-hidden flex overflow-x-auto  gap-12 scrollbar-hide px-4 md:px-10">
          {results?.slice(0, 10).map((movie, idx) => (
            <Link
              key={movie.id}
              href={`/details/${movie.id}`}
              className="relative flex-none w-45 md:w-55 group transition-all"
            >
              <span
                className="absolute -left-8 md:-left-12 -bottom-5 text-[120px] md:text-[160px] font-black leading-none z-30 select-none opacity-50 transition-opacity group-hover:opacity-100"
                style={{
                  WebkitTextStroke: "2px #EADFED80",
                  color: "transparent",
                  fontFamily: "sans-serif",
                }}
              >
                {idx + 1}
              </span>

              <div className="relative z-20 w-45 md:w-55 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name || movie.original_name || "Movie Poster"}
                  width={220}
                  height={400}
                  priority={idx < 6}
                  className=" h-auto object-cover aspect-2/3 group-hover:brightness-110"
                />

                <div className="absolute inset-0 rounded-xl bg-linear-to-t from-[#B76DFF33] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
