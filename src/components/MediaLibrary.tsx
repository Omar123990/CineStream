"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import PaginationControls from "./PaginationControls";

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

interface MediaLibraryProps {
  title: string;
  results: MediaItem[];
  currentPage: number;
  totalPages: number;
  type: "movie" | "tv";
  basePath: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, 
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function MediaLibrary({
  title,
  results,
  currentPage,
  totalPages,
  type,
  basePath,
}: MediaLibraryProps) {
  return (
    <section className="py-16 md:py-20 bg-[#16111B]">
      <div className="container mx-auto px-4">
        <motion.header
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="font-bold text-4xl md:text-5xl text-[#EADFED] border-l-4 border-[#B76DFF] pl-4 italic">
            {title}
          </h2>
        </motion.header>

        <motion.div
          key={`${basePath}-${currentPage}`} 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {results?.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <Link
                href={`/details/${item.id}?type=${item.media_type || type}`}
                scroll={true}
              >
                <figure className="mb-4 overflow-hidden rounded-2xl aspect-2/3 relative shadow-lg border border-white/5 bg-[#1a1520]">
                  <div className="absolute top-3 right-3 z-30 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1 shadow-md">
                    <span className="text-[#FFAD49] text-xs">⭐</span>
                    <span className="text-[#EADFED] text-xs font-bold">
                      {item.vote_average?.toFixed(1)}
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
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-[#B76DFF] p-4 rounded-full text-white shadow-[0_0_20px_rgba(183,109,255,0.5)] scale-75 group-hover:scale-100 transition-transform duration-300">
                      <span className="text-xl font-bold">▶</span>
                    </div>
                  </div>
                </figure>

                <h3 className="text-lg font-bold text-[#EADFED] group-hover:text-[#B76DFF] transition-colors duration-300 line-clamp-1">
                  {item.title || item.name || "Unknown Title"}
                </h3>

                <p className="text-sm text-gray-500 font-medium">
                  {(item.release_date || item.first_air_date)?.split("-")[0] ||
                    "N/A"}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex justify-center mt-10"
        >
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages > 500 ? 500 : totalPages}
            basePath={basePath}
          />
        </motion.div>
      </div>
    </section>
  );
}
