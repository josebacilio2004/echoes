"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center h-20 px-4 bg-background/80 backdrop-blur-2xl rounded-t-[2.5rem] border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
      <Link href="/" className={`flex flex-col items-center gap-1 transition-all ${pathname === "/" ? "text-tertiary" : "text-slate-600 hover:text-slate-300"}`}>
        <span className="material-symbols-outlined text-[26px]">explore</span>
        <span className="text-[8px] font-bold uppercase tracking-widest">Explore</span>
      </Link>

      <Link href="/messages" className={`flex flex-col items-center gap-1 transition-all ${pathname.includes("/messages") ? "text-tertiary" : "text-slate-600 hover:text-slate-300"}`}>
        <span className="material-symbols-outlined text-[26px]">terminal</span>
        <span className="text-[8px] font-bold uppercase tracking-widest">Resonance</span>
      </Link>

      <Link href="/create" className="relative -top-8">
        <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(47,217,244,0.4)] hover:shadow-[0_0_35px_rgba(47,217,244,0.6)] transition-all hover:scale-110 active:scale-95 group">
          <span className="material-symbols-outlined text-slate-950 text-3xl font-black group-hover:rotate-90 transition-transform duration-500">add</span>
        </div>
      </Link>

      <Link href="/synths" className={`flex flex-col items-center gap-1 transition-all ${pathname === "/synths" ? "text-tertiary" : "text-slate-600 hover:text-slate-300"}`}>
        <span className="material-symbols-outlined text-[26px]">token</span>
        <span className="text-[8px] font-bold uppercase tracking-widest">Auras</span>
      </Link>

      <Link href="/profile" className={`flex flex-col items-center gap-1 transition-all ${pathname === "/profile" ? "text-tertiary" : "text-slate-600 hover:text-slate-300"}`}>
        <span className="material-symbols-outlined text-[26px]">person</span>
        <span className="text-[8px] font-bold uppercase tracking-widest">Registry</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
