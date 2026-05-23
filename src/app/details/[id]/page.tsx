import { getDetails } from "@/APIS/getDetails";
import ScrollToTop from "@/components/ScrollToTop";
import { DetailsData, Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { id } = await params;
  const { type } = await searchParams;
  const mediaType = type === "tv" ? "tv" : "movie";

  const data = (await getDetails(id, mediaType)) as DetailsData;

  if (!data) return notFound();

  const title = data.title || data.name || "Untitled Content";
  const releaseDate = data.release_date || data.first_air_date;
  const rating = data.vote_average?.toFixed(1);

  const trailer = data.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube",
  );
  const trailerKey = trailer?.key;

  return (
    <main className="min-h-screen bg-[#16111B] text-white overflow-x-hidden">
        <ScrollToTop />
      <div className="relative w-full min-h-[85vh] md:h-[95vh] bg-black flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          {trailerKey ? (
            <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.35]">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&rel=0`}
                className="w-full h-full object-cover opacity-50"
                allow="autoplay; encrypted-media"
                title="Cinematic Background"
              />
            </div>
          ) : (
            <Image
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
              alt={title}
              fill
              priority
              className="object-cover opacity-40"
            />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-[#16111B] via-[#16111B]/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#16111B] via-transparent to-transparent hidden md:block" />
        </div>

        <div className="container mx-auto px-6 relative z-20 pt-20 md:pt-0">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-end">
            <div className="relative w-56 h-80 md:w-80 md:h-120 flex-none shadow-2xl border border-white/10 rounded-2xl overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {data.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="px-4 py-1 bg-[#B76DFF]/20 backdrop-blur-xl border border-[#B76DFF]/30 rounded-full text-xs font-semibold text-[#DDB7FF]"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter text-[#EADFED] drop-shadow-2xl">
                {title}
              </h1>

              <div className="flex items-center justify-center md:justify-start gap-6 text-lg mb-6 text-[#CFC2D6] font-medium">
                <span className="flex items-center gap-2 text-[#FFAD49]">
                  ⭐ {rating}
                </span>
                <span>{releaseDate?.split("-")[0]}</span>
                {data.runtime && <span>{data.runtime} min</span>}
              </div>

              <p className="text-[#CFC2D6] text-base md:text-xl leading-relaxed max-w-2xl mb-10 opacity-90 line-clamp-3 md:line-clamp-none">
                {data.overview}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-5">
                <Link
                  href={`/watch/${id}?type=${mediaType}`}
                  className="bg-[#B76DFF] hover:bg-[#a156f0] hover:-translate-y-1 text-white px-12 py-4 rounded-2xl font-bold transition-all shadow-[0_15px_30px_rgba(183,109,255,0.4)] active:scale-95 flex items-center gap-3 text-lg"
                >
                  <span className="text-xl">▶</span> Watch Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#EADFED] mb-12 flex items-center gap-4">
          <span className="w-2 h-10 bg-[#B76DFF] rounded-full" />
          Top Cast
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {data.credits?.cast?.slice(0, 6).map((actor) => (
            <div key={actor.id} className="text-center group cursor-pointer">
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-full border-4 border-transparent group-hover:border-[#B76DFF] transition-all duration-500 shadow-2xl">
                <Image
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/185x185?text=No+Image"
                  }
                  alt={actor.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="font-bold text-[#EADFED] text-lg line-clamp-1">
                {actor.name}
              </p>
              <p className="text-gray-500 text-sm">{actor.character}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 border-t border-white/5">
        <h2 className="text-3xl font-bold text-[#EADFED] mb-12 flex items-center gap-4">
          <span className="w-2 h-10 bg-[#B76DFF] rounded-full" />
          More Like This
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {data.recommendations?.results?.slice(0, 10).map((item: Movie) => (
            <Link
              key={item.id}
              scroll={true}
              href={`/details/${item.id}?type=${mediaType}`}
              className="group block relative"
            >
              <figure className="relative aspect-2/3 overflow-hidden rounded-2xl mb-4 shadow-2xl border border-white/5 bg-[#1a1520]">
                <div className="absolute top-3 right-3 z-30 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1 shadow-md">
                  <span className="text-[#FFAD49] text-xs">⭐</span>
                  <span className="text-[#EADFED] text-xs font-bold">
                    {item.vote_average?.toFixed(1) || "0.0"}
                  </span>
                </div>
                <Image
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Poster"
                  }
                  alt={item.title || item.name || "Poster"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </figure>
              <h3 className="text-[#EADFED] font-bold text-lg group-hover:text-[#B76DFF] transition-colors line-clamp-1">
                {item.title || item.name}
              </h3>
              <p className="text-gray-500 mt-1 text-sm">
                {(item.release_date || item.first_air_date)?.split("-")[0] ||
                  "N/A"}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
