import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#16111B] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#B76DFF] opacity-[0.08] blur-[150px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl">
        <div className="relative mb-8">
          <div className="bg-[#B76DFF] text-white text-3xl font-black px-8 py-2 rounded-full shadow-[0_0_30px_rgba(183,109,255,0.5)] -rotate-2">
            404
          </div>
          <div className="flex justify-center mt-4 text-[#CFC2D6]">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 3.5L18 2H6L4.5 3.5V5H19.5V3.5Z"
                fill="currentColor"
                opacity="0.4"
              />
              <path
                d="M19.5 7H4.5V20C4.5 21.1046 5.39543 22 6.5 22H17.5C18.6046 22 19.5 21.1046 19.5 20V7Z"
                fill="currentColor"
              />
              <path
                d="M14 12L10 16M10 12L14 16"
                stroke="#16111B"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-[#EADFED] text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Cut! This scene isn&apos;t in the script.
        </h1>

        <p className="text-[#CFC2D6] text-lg mb-10 max-w-md leading-relaxed opacity-80">
          Looks like we&apos;ve wandered off the set. The content you&apos;re
          looking for was either deleted in the final edit or never existed in
          this cinematic universe.
        </p>

        <div className="flex flex-col items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#B76DFF] hover:bg-[#a156f0] text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-[0_10px_20px_rgba(183,109,255,0.2)] hover:shadow-[0_15px_25px_rgba(183,109,255,0.3)] active:scale-95"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
