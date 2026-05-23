import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const footerLinks = [
    { label: "Audio Description", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Gift Cards", href: "#" },
    { label: "Media Center", href: "#" },
    { label: "Investor Relations", href: "#" },
    { label: "Jobs", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Legal Notices", href: "#" },
    { label: "Cookie Preferences", href: "#" },
    { label: "Corporate Information", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  return (
    <footer className="relative bg-[#0A050F] text-[#CFC2D6] py-16 px-6 md:px-20 border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-[#B76DFF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-sm">
            <h2 className="text-[#B76DFF] text-3xl font-black tracking-tighter uppercase italic mb-4">
              Cine<span className="text-white">Stream</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              Experience the next generation of cinematic streaming. High
              definition, unlimited stories, and electric luxury.
            </p>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-[#B76DFF] animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white">
              Premium Streaming
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-12 pb-12 border-b border-white/5">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-[13px] text-gray-400 hover:text-purple-400 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 order-2 md:order-1">
            © 2026 CineStream. Built by{" "}
            <span className="text-white">Omar Abdelglil</span>.
          </p>

          <div className="flex items-center gap-8 order-1 md:order-2">
            <Link
              href="/privacy"
              className="text-[11px] text-gray-500 uppercase tracking-[0.2em] hover:text-purple-400 transition-all"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[11px] text-gray-500 uppercase tracking-[0.2em] hover:text-purple-400 transition-all"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <span className="inline-block bg-white/5 px-5 py-2 rounded-full text-[10px] tracking-widest text-gray-400 border border-white/5">
            MADE WITH <span className="text-[#B76DFF] mx-1">❤</span> BY OMAR
            ABDELGLIL
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
