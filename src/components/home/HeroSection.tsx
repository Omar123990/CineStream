"use client";
import { Movie } from "@/types/movie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-fade";

interface HeroSectionProps {
  movies: Movie[];
}

export default function HeroSection({ movies }: HeroSectionProps) {
  const heroMovies = movies.slice(0, 4);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {heroMovies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative w-full h-full">
            <div className="absolute inset-0 z-0">
              {movie.videoKey ? (
                <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.4]">
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.videoKey}?autoplay=1&mute=1&loop=1&playlist=${movie.videoKey}&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1`}
                    className="w-full h-full object-cover opacity-50"
                    allow="autoplay; encrypted-media"
                  />
                </div>
              ) : (
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title || movie.name || "Hero Background"}
                  fill
                  priority
                  className="object-cover opacity-50"
                />
              )}
              
              <div className="absolute inset-0 z-10 bg-linear-to-t from-[#16111B] via-[#16111B99] to-transparent" />
              <div className="absolute inset-0 z-20 bg-linear-to-r from-[#16111B] via-[#16111B66] to-transparent" />
            </div>

            <div className="container px-6 md:px-20 mx-auto relative z-30 h-full flex flex-col justify-center items-center md:items-start text-center md:text-start">
              <div className="max-w-3xl space-y-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  {movie.title || movie.name}
                </h1>

                <p className="text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed line-clamp-3">
                  {movie.overview}
                </p>

                <div className="flex flex-row gap-4 pt-6 items-center justify-center md:justify-start w-full sm:w-auto">
                  <Link
                    href={`/details/${movie.id}?type=movie`}
                    className="group flex-1 sm:flex-none px-6 md:px-10 py-4 flex items-center justify-center gap-3 text-white font-bold bg-linear-to-r from-[#B76DFF] to-[#0566D9] rounded-2xl hover:scale-105 transition-all hover:shadow-[0_0_25px_rgba(183,109,255,0.5)] duration-300"
                  >
                    <svg className="animate-pulse shrink-0 group-hover:scale-110 transition-transform" width="14" height="18" viewBox="0 0 11 14" fill="none">
                      <path d="M0 13.3V0L10.45 6.65L0 13.3Z" fill="currentColor" />
                    </svg>
                    <span className="text-sm md:text-base">Play Now</span>
                  </Link>

                  <Link
                    href="#trinds"
                    className="group flex-1 sm:flex-none px-6 md:px-10 py-4 flex items-center justify-center gap-3 text-white font-bold bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  >
                    <span className="text-sm md:text-base">Trending</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}