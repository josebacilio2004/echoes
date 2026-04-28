"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";

const RESONANCES = [
  {
    id: 1,
    strength: 85,
    description: "High correlation detected between your 'Yellow Raincoat' echo and a new registry.",
    time: "2 HOURS AGO",
  },
  {
    id: 2,
    strength: 42,
    description: "Potential match found in 'Sector 7-G'. Descriptions are stabilizing.",
    time: "YESTERDAY",
  }
];

export default function Synths() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-24 px-6 max-w-4xl mx-auto w-full">
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-black tracking-tighter text-glow uppercase">Active Resonances</h2>
          <p className="text-slate-500 uppercase tracking-widest text-xs mt-2">AI-Powered Coincidence Detection</p>
        </header>

        <div className="space-y-6">
          {RESONANCES.map((res) => (
            <motion.div 
              key={res.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 rounded-2xl border-l-4 border-tertiary shadow-[0_0_20px_rgba(47,217,244,0.05)]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary animate-pulse">sensors</span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Strength: {res.strength}%</span>
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{res.time}</span>
              </div>
              <p className="text-foreground/90 font-medium leading-relaxed mb-6">
                {res.description}
              </p>
              <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-tertiary text-xs font-bold uppercase tracking-widest rounded-xl transition-all border border-tertiary/20">
                Initiate Synchronization
              </button>
            </motion.div>
          ))}
        </div>

        {RESONANCES.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
            <span className="material-symbols-outlined text-6xl text-slate-800">radar</span>
            <p className="text-slate-500 uppercase tracking-widest text-sm">Searching for ripples in the void...</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
