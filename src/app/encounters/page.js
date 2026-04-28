"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import EchoCard from "@/components/EchoCard";
import { supabase } from "@/lib/supabase";

export default function Encounters() {
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
      
      const formattedData = data.map(item => ({
        id: item.id,
        user: {
          handle: item.handle,
          avatar: item.avatar || `https://ui-avatars.com/api/?name=${item.handle}&background=0D8ABC&color=fff`,
        },
        content: item.content,
        time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: item.status,
        tags: item.tags,
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
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="material-symbols-outlined text-4xl text-tertiary animate-spin">sync</span>
            </div>
          ) : encounters.length > 0 ? (
            encounters.map(echo => (
              <EchoCard key={echo.id} encounter={echo} />
            ))
          ) : (
            <p className="text-center text-slate-500 py-20 uppercase tracking-widest text-sm">The void is silent today.</p>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
