"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import EchoCard from "@/components/EchoCard";
import EchoMap from "@/components/EchoMap";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [encounters, setEncounters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEncounters();
  }, []);

  async function fetchEncounters() {
    try {
      const { data, error } = await supabase
        .from('encounters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transformar datos de la DB al formato del componente
      const formattedData = data.map(item => ({
        id: item.id,
        user: {
          name: item.handle,
          handle: item.handle,
          avatar: item.avatar || `https://ui-avatars.com/api/?name=${item.handle}&background=0D8ABC&color=fff`,
        },
        content: item.content,
        time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: item.status,
        tags: item.tags,
        lat: item.lat,
        lng: item.lng,
        userId: item.user_id,
        track: item.track_video_id ? {
          name: item.track_name,
          artist: item.track_artist,
          videoId: item.track_video_id
        } : null
      }));

      setEncounters(formattedData);
    } catch (error) {
      console.error("Error fetching encounters:", error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      
      <main className="relative flex-1 pt-16 pb-24 overflow-hidden">
        {/* Map Background Hero */}
        <section className="h-[60vh] md:h-[70vh] w-full relative mb-12 px-4">
          <EchoMap encounters={encounters} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-glow uppercase mb-4 opacity-80">
              Echoes
            </h1>
            <p className="text-slate-400 text-sm md:text-base uppercase tracking-[0.4em] font-light">
              Visualizing Global Resonance
            </p>
          </div>
        </section>

        {/* Content Layer */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
          {/* Timeline Feed */}
          <div className="flex-1 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide pr-2">
            <header className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-glow">Resonance Timeline</h2>
              <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest">Global Echoes: 1,842 Active</p>
            </header>

            <div className="space-y-6">
              {loading ? (
                <div className="flex justify-center py-20">
                  <span className="material-symbols-outlined text-4xl text-tertiary animate-spin">sync</span>
                </div>
              ) : encounters.length > 0 ? (
                encounters.map(encounter => (
                  <EchoCard key={encounter.id} encounter={encounter} />
                ))
              ) : (
                <p className="text-center text-slate-500 py-20 uppercase tracking-widest text-sm">No ripples detected in the void yet.</p>
              )}
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
