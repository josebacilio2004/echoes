"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

export default function Profile() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-24 px-6 max-w-4xl mx-auto w-full">
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center mb-16 space-y-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-tertiary/20 p-1.5">
              <img 
                className="w-full h-full object-cover rounded-full" 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="Profile"
              />
            </div>
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-tertiary rounded-full border-4 border-background flex items-center justify-center">
              <span className="material-symbols-outlined text-xs text-background font-bold">verified</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter text-glow uppercase">Astrid_99</h2>
            <p className="text-slate-500 text-xs uppercase tracking-[0.3em]">Quantum Explorer · Level 4</p>
          </div>

          <div className="flex gap-8 py-4">
            <div className="text-center">
              <p className="text-2xl font-black text-foreground">12</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Echoes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-foreground">3</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Matches</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-foreground">432</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Syncs</p>
            </div>
          </div>
        </section>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button className="glass-card p-6 rounded-2xl flex items-center justify-between hover:border-tertiary/40 transition-all group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-tertiary">history</span>
              <span className="text-xs font-bold uppercase tracking-widest">Echo History</span>
            </div>
            <span className="material-symbols-outlined text-slate-700">chevron_right</span>
          </button>
          
          <button className="glass-card p-6 rounded-2xl flex items-center justify-between hover:border-tertiary/40 transition-all group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-tertiary">settings</span>
              <span className="text-xs font-bold uppercase tracking-widest">Neural Settings</span>
            </div>
            <span className="material-symbols-outlined text-slate-700">chevron_right</span>
          </button>
          
          <button className="glass-card p-6 rounded-2xl flex items-center justify-between hover:border-tertiary/40 transition-all group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-tertiary">security</span>
              <span className="text-xs font-bold uppercase tracking-widest">Privacy Protocol</span>
            </div>
            <span className="material-symbols-outlined text-slate-700">chevron_right</span>
          </button>
          
          <button className="glass-card p-6 rounded-2xl flex items-center justify-between hover:border-red-500/40 transition-all group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-red-500">logout</span>
              <span className="text-xs font-bold uppercase tracking-widest">Sever Connection</span>
            </div>
            <span className="material-symbols-outlined text-slate-700">chevron_right</span>
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
