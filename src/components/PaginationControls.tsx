"use client";

import { useRouter } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  basePath,
}: Props) {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`${basePath}?page=${page}`);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-12 mb-10">
      <button
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
        className="cursor-pointer group p-2.5 bg-[#B76DFF] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a156f0] transition-all"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <span className="text-[#EADFED] font-medium text-lg">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="cursor-pointer group p-2.5 bg-[#B76DFF] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a156f0] transition-all"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
