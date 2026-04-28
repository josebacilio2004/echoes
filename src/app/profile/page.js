"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [echoCount, setEchoCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return router.push('/login');

    setUser(session.user);

    // Fetch Profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    setProfile(profileData);

    // Count Echoes
    const { count } = await supabase
      .from('encounters')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id);
    
    setEchoCount(count || 0);
    setLoading(false);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <span className="material-symbols-outlined text-4xl text-tertiary animate-spin">sync</span>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-24 px-6 max-w-4xl mx-auto w-full">
        <div className="relative mb-20">
          {/* Header/Cover */}
          <div className="h-48 rounded-3xl bg-gradient-to-r from-blue-900/40 via-tertiary/20 to-purple-900/40 border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          </div>
          
          {/* Profile Header */}
          <div className="absolute -bottom-12 left-8 flex items-end gap-6">
            <div className="w-32 h-32 rounded-3xl border-4 border-background bg-slate-900 overflow-hidden shadow-2xl relative group">
              <img 
                src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`} 
                className="w-full h-full object-cover"
                alt="Profile" 
              />
            </div>
            <div className="pb-4">
              <h2 className="text-3xl font-black tracking-tighter text-glow uppercase">@{profile?.username || "ENTITY_NULL"}</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Spectral Level: {echoCount > 5 ? "Resonator" : "Trace"}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="glass-card p-6 rounded-2xl border-white/5">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-tertiary mb-4">Signal Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Manifestations</span>
                  <span className="text-lg font-mono text-foreground">{echoCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Aura Resonance</span>
                  <span className="text-lg font-mono text-cyan-400">{profile?.aura_points || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
