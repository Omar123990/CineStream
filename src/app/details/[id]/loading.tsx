export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#16111B]">
      <div className="absolute w-75 h-75 bg-[#B76DFF] opacity-10 blur-[120px] rounded-full animate-pulse" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-[#B76DFF] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(183,109,255,0.4)] animate-bounce">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5V19L19 12L8 5Z" />
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-[#DDB7FF] tracking-tight">
          CineStream
        </h2>

        <div className="flex flex-col items-center gap-4 mt-4">
          <p className="text-[#CFC2D6] text-sm md:text-base animate-pulse font-medium">
            Preparing your cinematic experience...
          </p>

          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-[#B76DFF] w-1/3 rounded-full animate-loader shadow-[0_0_10px_#B76DFF]" />
          </div>
        </div>
      </div>
    </div>
  );
}
