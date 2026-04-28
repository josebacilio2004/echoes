"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CreateEcho() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
  const [vibe, setVibe] = useState(50);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [trackUrl, setTrackUrl] = useState("");
  const [trackUrl, setTrackUrl] = useState("");
  const [trackInfo, setTrackInfo] = useState({ name: "", artist: "" });
  const [showTrackInput, setShowTrackInput] = useState(false);

  React.useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
    } else {
      setUser(session.user);
    }
  }
  
  // Datos temporales de track para el ejemplo
  const [track, setTrack] = useState({
    name: "me dolerás para siempre",
    artist: "STRANGEHUMAN",
    videoId: "TY1id4Rowxg"
  });

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAddTrack = () => {
    const id = extractVideoId(trackUrl);
    if (id) {
      setTrack({
        name: trackInfo.name || "Unknown Echo",
        artist: trackInfo.artist || "Atmosphere",
        videoId: id
      });
      setShowTrackInput(false);
      setTrackUrl("");
      setTrackInfo({ name: "", artist: "" });
    } else {
      alert("Please enter a valid YouTube URL");
    }
  };

  const handleManifest = async () => {
    if (!content.trim()) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('encounters')
        .insert([
          {
            handle: user.user_metadata.username || user.email.split('@')[0],
            content: content,
            status: vibe > 50 ? "RESISTED" : "VANISHED",
            tags: ["MANIFEST", "ATMOSPHERE"],
            track_name: track.name,
            track_artist: track.artist,
            track_video_id: track.videoId,
            avatar: user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`,
            lat: lat,
            lng: lng
          }
        ]);

      if (error) throw error;
      
      router.push('/');
    } catch (error) {
      alert("Error al manifestar el eco: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="min-h-screen pt-32 pb-32 flex flex-col items-center px-6 max-w-4xl mx-auto w-full">
        {/* Background Decoration */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-900/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-800/40 rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-3xl space-y-8">
          <header className="text-center space-y-2">
            <h2 className="text-4xl font-black tracking-tighter text-glow uppercase">Manifest Encounter</h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs">Capture the trace before it fades</p>
          </header>

          {/* Input Area */}
          <section className="glass-card rounded-2xl p-4 md:p-8 focus-within:border-tertiary/40 transition-all duration-500">
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 text-xl md:text-2xl font-semibold text-foreground placeholder-slate-700 resize-none min-h-[240px] p-2"
              placeholder="Release your Echo into the void..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            
            <div className="flex items-center justify-between px-2 pt-6 border-t border-white/5">
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-slate-500 hover:text-tertiary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">image</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Vision</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-tertiary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Origin</span>
                </button>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                {content.length} / 280
              </span>
            </div>
          </section>

          {/* Aesthetic Controls */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Vibe</h3>
                <span className="material-symbols-outlined text-slate-500 text-sm">waves</span>
              </div>
              <div className="space-y-4">
                <input 
                  type="range" 
                  className="w-full accent-tertiary"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                />
                <div className="flex justify-between text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                  <span>Silence</span>
                  <span>Resonance</span>
                </div>
              </div>
            </div>

            {/* YouTube Atmosphere Selector */}
            <div className="glass-card rounded-xl p-6 space-y-4 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">Atmosphere</h3>
                <span className="material-symbols-outlined text-red-500 text-sm animate-pulse">brand_awareness</span>
              </div>
              
              {!showTrackInput ? (
                <button 
                  onClick={() => setShowTrackInput(true)}
                  className="w-full flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/5 hover:border-red-500/40 transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/40 transition-colors">
                    <span className="material-symbols-outlined text-red-500 text-lg">
                      {track.videoId ? "edit" : "add_box"}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-300 truncate">
                      {track.videoId ? track.name : "Link YouTube Atmosphere"}
                    </p>
                    <p className="text-[10px] text-slate-600 uppercase tracking-tighter truncate">
                      {track.videoId ? track.artist : "Search for a soundtrack"}
                    </p>
                  </div>
                </button>
              ) : (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <input 
                    type="text"
                    value={trackUrl}
                    onChange={(e) => setTrackUrl(e.target.value)}
                    placeholder="Paste YouTube Link..."
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-[10px] focus:outline-none focus:border-red-500/40"
                  />
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={trackInfo.name}
                      onChange={(e) => setTrackInfo({...trackInfo, name: e.target.value})}
                      placeholder="Song Name"
                      className="flex-1 bg-black/60 border border-white/10 rounded-lg p-2 text-[10px] focus:outline-none focus:border-red-500/40"
                    />
                    <input 
                      type="text"
                      value={trackInfo.artist}
                      onChange={(e) => setTrackInfo({...trackInfo, artist: e.target.value})}
                      placeholder="Artist"
                      className="flex-1 bg-black/60 border border-white/10 rounded-lg p-2 text-[10px] focus:outline-none focus:border-red-500/40"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleAddTrack}
                      className="flex-1 py-2 bg-red-500/20 text-red-500 text-[10px] font-bold uppercase rounded-lg hover:bg-red-500/30 transition-all"
                    >
                      Apply
                    </button>
                    <button 
                      onClick={() => setShowTrackInput(false)}
                      className="px-4 py-2 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase rounded-lg hover:bg-slate-700 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Manifest Button */}
          <section className="flex flex-col items-center pt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleManifest}
              disabled={loading || !content.trim()}
              className={`group relative px-16 py-5 font-bold rounded-full transition-all duration-300 ${
                loading || !content.trim() 
                ? "bg-slate-800 text-slate-600 cursor-not-allowed" 
                : "bg-tertiary text-slate-950 shadow-[0_0_20px_rgba(47,217,244,0.4)] hover:shadow-[0_0_30px_rgba(47,217,244,0.6)]"
              }`}
            >
              <span className="relative z-10 uppercase tracking-[0.3em]">
                {loading ? "Manifesting..." : "Manifest"}
              </span>
            </motion.button>
            <p className="mt-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em]">
              Your resonance will ripple across the network
            </p>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
