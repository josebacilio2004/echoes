"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function Synths() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    setProfile(data);
    setLoading(false);
  }

  const auras = [
    { name: "Void Trace", min: 0, color: "text-slate-500", glow: "shadow-slate-500/20", icon: "blur_on" },
    { name: "Cyan Resonance", min: 10, color: "text-tertiary", glow: "shadow-tertiary/40", icon: "sensors" },
    { name: "Electric Azure", min: 50, color: "text-cyan-400", glow: "shadow-cyan-400/50", icon: "storm" },
    { name: "Obsidian Core", min: 100, color: "text-purple-500", glow: "shadow-purple-500/60", icon: "emergency" }
  ];

  // Buscamos el aura actual basándonos en los puntos
  const currentAura = [...auras].reverse().find(a => (profile?.aura_points || 0) >= a.min) || auras[0];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <span className="material-symbols-outlined text-4xl text-tertiary animate-spin">sync</span>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-24 px-6 max-w-4xl mx-auto w-full">
        <header className="mb-12 space-y-2 text-center">
          <h2 className="text-4xl font-black tracking-tighter text-glow uppercase">The Vault of Auras</h2>
          <p className="text-slate-500 text-xs uppercase tracking-[0.3em]">Calibrate your spectral resonance</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visualización del Aura Actual */}
          <div className="glass-card p-10 rounded-[3rem] border-white/5 flex flex-col items-center justify-center space-y-8 relative overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-current opacity-5`}></div>
            
            <div className={`w-48 h-48 rounded-full border-2 border-white/10 flex items-center justify-center relative ${currentAura.glow} shadow-2xl transition-all duration-700`}>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute inset-0 rounded-full bg-current"
              ></motion.div>
              <span className={`material-symbols-outlined text-7xl ${currentAura.color} relative z-10 transition-all duration-700`}>
                {currentAura.icon}
              </span>
            </div>

            <div className="text-center relative z-10">
              <h3 className={`text-3xl font-black uppercase tracking-tighter ${currentAura.color}`}>{currentAura.name}</h3>
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.4em] mt-3">Spectral Integrity: Verified</p>
            </div>
          </div>

          {/* Estadísticas y Progreso */}
          <div className="space-y-6">
            <div className="glass-card p-8 rounded-3xl border-white/5">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Progression Path</h4>
                <span className="text-xl font-mono text-tertiary">{profile?.aura_points || 0} <span className="text-[10px] text-slate-600 uppercase">pts</span></span>
              </div>
              
              <div className="space-y-6">
                {auras.map((aura) => {
                  const isUnlocked = (profile?.aura_points || 0) >= aura.min;
                  return (
                    <div key={aura.name} className={`flex items-center justify-between p-3 rounded-xl transition-all ${isUnlocked ? "bg-white/5" : "opacity-20 grayscale"}`}>
                      <div className="flex items-center gap-4">
                        <span className={`material-symbols-outlined text-xl ${isUnlocked ? aura.color : "text-slate-700"}`}>
                          {isUnlocked ? "check_circle" : "lock"}
                        </span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider">{aura.name}</p>
                          <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">Requirement: {aura.min} pts</p>
                        </div>
                      </div>
                      {isUnlocked && <span className="text-[8px] font-bold text-tertiary uppercase tracking-widest">Active</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="w-full py-5 bg-tertiary/10 border border-tertiary/20 text-tertiary text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-tertiary hover:text-black transition-all shadow-lg hover:shadow-tertiary/20">
              Calibrate Resonance
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
