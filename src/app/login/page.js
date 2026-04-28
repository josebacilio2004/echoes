"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      router.push("/");
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
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-8 md:p-12 rounded-3xl relative z-10 border-white/5"
      >
        <header className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-glow uppercase text-tertiary">Reconnect</h1>
          <p className="text-slate-500 text-xs uppercase tracking-widest">Enter your credentials to access the void</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nexus@echoes.com"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-tertiary/50 transition-all text-foreground"
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
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-tertiary/50 transition-all text-foreground"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-transparent border-2 border-tertiary text-tertiary font-black uppercase tracking-[0.2em] rounded-xl hover:bg-tertiary hover:text-slate-950 transition-all disabled:opacity-50 mt-4 shadow-[0_0_15px_rgba(47,217,244,0.1)] hover:shadow-[0_0_25px_rgba(47,217,244,0.3)]"
          >
            {loading ? "Decrypting..." : "Sync Credentials"}
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-xs text-slate-600">
            Lost your trace?{" "}
            <Link href="/register" className="text-tertiary hover:underline">Register new signature</Link>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
