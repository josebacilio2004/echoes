"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-background/50 backdrop-blur-xl border-b border-white/5">
      <Link href="/" className="text-2xl font-black tracking-tighter text-glow uppercase hover:opacity-80 transition-opacity">
        Echoes
      </Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Disconnect
            </button>
            <Link href="/profile" className="w-10 h-10 rounded-full border border-tertiary/30 p-0.5 hover:border-tertiary transition-all">
              <img 
                src={user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            </Link>
          </div>
        ) : (
          <Link 
            href="/login" 
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Reconnect
          </Link>
        )}
        <button className="text-slate-400 hover:text-tertiary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
