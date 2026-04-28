"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            avatar_url: `https://ui-avatars.com/api/?name=${username}&background=2FD9F4&color=000`,
          },
        },
      });

      if (error) throw error;
      
      alert("Registration successful! Welcome to the void.");
      router.push("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-6">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 md:p-12 rounded-3xl relative z-10 border-white/5"
      >
        <header className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-glow uppercase">Initiate</h1>
          <p className="text-slate-500 text-xs uppercase tracking-widest">Create your signature in the network</p>
        </header>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-tertiary ml-1">@Handle</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="v_spectral"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-tertiary/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nexus@echoes.com"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-tertiary/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Key Phrase</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-tertiary/50 transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-tertiary text-slate-950 font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_0_20px_rgba(47,217,244,0.3)] hover:shadow-[0_0_30px_rgba(47,217,244,0.5)] transition-all disabled:opacity-50 mt-4"
          >
            {loading ? "Syncing..." : "Establish Connection"}
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-xs text-slate-600">
            Already registered?{" "}
            <Link href="/login" className="text-tertiary hover:underline">Reconnect here</Link>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
