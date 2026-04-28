"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import EchoCard from "@/components/EchoCard";

const MOCK_DATA = [
  {
    id: 3,
    user: {
      handle: "Lunar_Watcher",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100",
    },
    content: "Someone was wearing a bright yellow raincoat at the Central Station. We made eye contact for 3 seconds. The train arrived too fast.",
    time: "10:15 PM",
    status: "VANISHED",
    tags: ["STATION", "YELLOW"],
  },
  {
    id: 4,
    user: {
      handle: "Cofee_Ghost",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100",
    },
    content: "Reading 'The Stranger' by Camus at the local cafe. You had a similar book. I should have said hello.",
    time: "02:30 PM",
    status: "RESISTED",
    tags: ["CAFE", "LITERATURE"],
  }
];

export default function Encounters() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-24 px-6 max-w-5xl mx-auto w-full">
        <header className="mb-12 space-y-4">
          <h2 className="text-4xl font-black tracking-tighter text-glow uppercase">Discovery Feed</h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
              <input 
                type="text" 
                placeholder="Search by trait, place or vibe..." 
                className="w-full bg-slate-900/50 border border-white/10 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-tertiary/50 transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 glass-card rounded-full text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-tertiary transition-colors">
              <span className="material-symbols-outlined text-sm">tune</span>
              Filter
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {MOCK_DATA.map(echo => (
            <EchoCard key={echo.id} encounter={echo} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
