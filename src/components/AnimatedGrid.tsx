"use client";

import { motion, Variants, Transition, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type?: string;
}

interface AnimatedGridProps {
  results: MediaItem[];
  type: "movie" | "tv";
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: { opacity: 0 },
};

const itemTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: itemTransition,
  },
};

export default function AnimatedGrid({ results, type }: AnimatedGridProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("page") || "1";
  const uniqueKey = `${pathname}-${currentPage}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={uniqueKey}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={gridVariants}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16"
      >
        {results?.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="group relative"
          >
            <Link
              href={`/details/${item.id}?type=${item.media_type || type}`} scroll={true}
              className="group block relative"
            >
              <figure className="relative aspect-2/3 overflow-hidden rounded-2xl mb-4 shadow-lg border border-white/5 bg-[#1a1520]">
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
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-[#B76DFF] p-4 rounded-full text-white">
                    <span className="text-xl font-bold">▶</span>
                  </div>
                </div>
              </figure>

              <h3 className="text-[#EADFED] font-bold text-lg group-hover:text-[#B76DFF] transition-colors line-clamp-1 text-left">
                {item.title || item.name}
              </h3>
              <p className="text-gray-500 mt-1 text-left text-sm font-medium">
                {(item.release_date || item.first_air_date)?.split("-")[0] ||
                  "N/A"}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
