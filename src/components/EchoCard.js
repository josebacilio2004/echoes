"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import YouTubePlayer from "./YouTubePlayer";
import Link from "next/link";

const EchoCard = ({ encounter }) => {
  const { user, content, time, status, tags, track, userId } = encounter;
  const [isSyncing, setIsSyncing] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-6 border-white/5 hover:border-tertiary/30 transition-all duration-500"
    >
      {track?.videoId && (
        <YouTubePlayer 
          videoId={track.videoId} 
          isPlaying={isSyncing} 
        />
      )}

      <div className="relative shrink-0 self-start">
        <div className="w-16 h-16 rounded-2xl border-2 border-tertiary/30 p-1 bg-background overflow-hidden">
          <img
            alt={user.handle}
            className="w-full h-full object-cover rounded-xl"
            src={user.avatar}
          />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-xs text-tertiary">
            {status === "RESISTED" ? "bolt" : "history"}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <h4 className="text-lg font-black tracking-tighter text-foreground uppercase">
              @{user.handle}
            </h4>
            <div className="flex gap-2 mt-1">
              {tags?.map(tag => (
                <span key={tag} className="text-[8px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <time className="text-[10px] text-slate-600 font-mono">
            {time}
          </time>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-6 mt-2">
          {content}
        </p>

        {track && (
          <div className={`mb-6 flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
            isSyncing 
            ? "bg-red-500/10 border-red-500/40" 
            : "bg-white/5 border-white/5"
          }`}>
            <button 
              onClick={() => setIsSyncing(!isSyncing)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isSyncing ? "bg-red-500 text-white" : "bg-white/10 text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {isSyncing ? "pause" : "play_arrow"}
              </span>
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-foreground truncate uppercase">{track.name}</p>
              <p className="text-[8px] text-slate-600 uppercase tracking-widest truncate">{track.artist}</p>
            </div>
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-slate-500 hover:text-tertiary transition-colors group">
              <span className="material-symbols-outlined text-sm group-hover:animate-bounce">favorite</span>
              <span className="text-[9px] font-bold uppercase tracking-widest">Resonate</span>
            </button>
            
            {userId && (
              <Link href={`/messages/${userId}`} className="flex items-center gap-2 text-slate-500 hover:text-tertiary transition-colors group">
                <span className="material-symbols-outlined text-sm">terminal</span>
                <span className="text-[9px] font-bold uppercase tracking-widest">Connect</span>
              </Link>
            )}
          </div>

          <button 
            onClick={() => setIsSyncing(!isSyncing)}
            className={`flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-full transition-all ${
              isSyncing 
                ? "bg-red-500 text-white shadow-lg" 
                : "bg-slate-800 text-tertiary hover:bg-slate-700"
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {isSyncing ? "graphic_eq" : "auto_awesome"}
            </span>
            {isSyncing ? "Resonating" : "Sync"}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default EchoCard;
