"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [btnRect, setBtnRect] = useState<DOMRect | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (isSearchOpen && searchBtnRef.current) {
        setBtnRect(searchBtnRef.current.getBoundingClientRect());
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSearchOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "TV Shows", href: "/tvshow" },
    { name: "Movies", href: "/movies" },
    { name: "Genres", href: "/genres/28" },
    { name: "Top Rated", href: "/top-rated" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-150%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-6 lg:top-8 w-full inset-x-0 z-50 flex flex-col items-center px-4"
      >
        <nav className="relative w-full lg:max-w-[70%] h-16 bg-[#16111B]/90 backdrop-blur-2xl border border-white/10 px-5 lg:px-10 py-6 rounded-[3rem] flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300">
          <Link href="/" className="flex-none">
            <span className="text-xl lg:text-2xl font-black tracking-tighter text-white uppercase italic">
              Cine<span className="text-[#B76DFF]">Stream</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`text-sm font-black uppercase tracking-[0.2em] transition-colors duration-200 ${
                      isActive
                        ? "text-[#B76DFF]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {!isActive && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                    <span className="absolute -inset-x-2 -inset-y-1 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-200 -z-10" />
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#B76DFF] rounded-full shadow-[0_0_10px_#B76DFF]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 lg:gap-3">
            <button
              ref={searchBtnRef}
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMobileMenuOpen(false);
              }}
              className={`p-2.5 lg:p-3 rounded-full transition-all duration-200 active:scale-90 ${
                isSearchOpen
                  ? "bg-[#B76DFF] text-white shadow-[0_0_16px_#B76DFF55]"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Toggle search"
            >
              <svg
                className="w-4.5 h-4.5 lg:w-5 lg:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                {isSearchOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                )}
              </svg>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsSearchOpen(false);
              }}
              className="lg:hidden p-2.5 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-90"
              aria-label="Toggle menu"
            >
              <svg
                className="w-4.5 h-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="lg:hidden w-full mt-3 bg-[#16111B]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <ul className="flex flex-col py-2">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all duration-200 group ${
                          isActive
                            ? "text-[#B76DFF] bg-[#B76DFF]/10"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                            isActive
                              ? "bg-[#B76DFF] shadow-[0_0_8px_#B76DFF]"
                              : "bg-white/20 group-hover:bg-white/50"
                          }`}
                        />
                        {link.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isSearchOpen && btnRect && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                style={{
                  position: "fixed",
                  top: btnRect.bottom + 12,
                  right: isMobile ? 16 : window.innerWidth - btnRect.right,
                  left: isMobile ? 16 : "auto",
                  width: isMobile ? "auto" : 320,
                  zIndex: 9999,
                }}
              >
                <form
                  onSubmit={handleSearch}
                  className="w-full bg-[#16111B] border border-[#B76DFF]/30 rounded-3xl p-2 shadow-2xl backdrop-blur-xl"
                >
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies, TV shows..."
                    className="w-full bg-transparent text-white py-3 px-5 focus:outline-none text-sm lg:text-base font-medium placeholder:text-gray-500"
                  />
                </form>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
