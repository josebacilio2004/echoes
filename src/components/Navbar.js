"use client";

import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-slate-950/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-black tracking-[0.2em] text-tertiary text-glow uppercase">
          ECHOES
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full border border-white/20 bg-surface flex items-center justify-center overflow-hidden">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
          />
        </div>
        <button className="text-tertiary hover:text-cyan-300 transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
