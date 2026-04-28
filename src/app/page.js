"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import EchoCard from "@/components/EchoCard";

const MOCK_ENCOUNTERS = [
  {
    id: 1,
    user: {
      name: "Kaelen",
      handle: "Kaelen_01",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    },
    content: "The frequency shift near the monolith was undeniable. I felt the resonance before I saw the trace. Minimal data leakage, but the echo remains visible on the lower spectral bands.",
    time: "04:22 AM",
    status: "RESISTED",
    tags: ["SIG_TRACE_99", "MONOLITH"],
    track: { name: "Midnight City", artist: "M83", videoId: "dX3kKvKyH6w" },
  },
  {
    id: 2,
    user: {
      name: "V Spectral",
      handle: "V_Spectral",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=100",
    },
    content: '"We are just ripples in a dark lake. The surface never truly stays still."',
    time: "01:15 AM",
    status: "VANISHED",
    tags: ["PHILOSOPHY", "VOID"],
    track: { name: "After Dark", artist: "Mr.Kitty", videoId: "waAlgFq9Xq8" },
  },
  {
    id: 3,
    user: {
      name: "Strange_Soul",
      handle: "STRANGE_HUMAN_FAN",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=100",
    },
    content: "Sentí que el tiempo se detenía cuando pasaste a mi lado. Esta canción sonaba en mis audífonos y ahora cada vez que la escucho, te veo de nuevo.",
    time: "11:11 PM",
    status: "RESISTED",
    tags: ["NOSTALGIA", "MEMORIA"],
    track: { name: "me dolerás para siempre", artist: "STRANGEHUMAN", videoId: "TY1id4Rowxg" },
  }
];

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      
      <main className="relative flex-1 pt-16 pb-24 overflow-hidden">
        {/* Map Background Placeholder */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Cinematic dark map" 
            className="w-full h-full object-cover opacity-30 brightness-50 grayscale hover:grayscale-0 transition-all duration-1000"
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
          {/* Timeline Feed */}
          <div className="flex-1 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide pr-2">
            <header className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-glow">Resonance Timeline</h2>
              <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest">Global Echoes: 1,842 Active</p>
            </header>

            <div className="space-y-6">
              {MOCK_ENCOUNTERS.map(encounter => (
                <EchoCard key={encounter.id} encounter={encounter} />
              ))}
            </div>
          </div>

          {/* Sidebar Stats */}
          <aside className="hidden xl:flex flex-col gap-6 w-72 shrink-0">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Active Frequency</h3>
              <div className="text-4xl font-black text-foreground">432Hz</div>
              <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-3/4 shadow-[0_0_10px_rgba(47,217,244,0.6)]"></div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
