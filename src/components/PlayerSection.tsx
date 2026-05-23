"use client";
import { useState } from "react";

interface server {
    id: string;
    name: string;
    url: string;
}

export default function PlayerSection({ servers }: { servers: server[] }) {
  const [activeServer, setActiveServer] = useState(servers[0].url);

  return (
    <div className="space-y-6">
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-black">
        <iframe
          src={activeServer}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="autoplay; encrypted-media"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {servers.map((server) => (
          <button
            key={server.id}
            onClick={() => setActiveServer(server.url)}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              activeServer === server.url 
              ? "bg-[#B76DFF] text-white shadow-[0_0_15px_rgba(183,109,255,0.4)]" 
              : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {server.name}
          </button>
        ))}
      </div>
    </div>
  );
}