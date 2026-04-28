import React, { useState } from "react";
import { motion } from "framer-motion";
import YouTubePlayer from "./YouTubePlayer";
import Link from "next/link";

const EchoCard = ({ encounter }) => {
  const { user, content, time, status, tags, track } = encounter;
  const [isSyncing, setIsSyncing] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="glass-card p-6 md:p-8 rounded-xl flex flex-col md:flex-row gap-6 hover:border-tertiary/30 transition-all duration-500"
    >
      {track?.videoId && (
        <YouTubePlayer 
          videoId={track.videoId} 
          isPlaying={isSyncing} 
        />
      )}

      <div className="relative shrink-0">
        <div className="w-16 h-16 rounded-full border-2 border-tertiary/50 p-1">
          <img
            alt={user.name}
            className="w-full h-full object-cover rounded-full"
            src={user.avatar}
          />
        </div>
        {status === "RESISTED" && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-tertiary rounded-full border-2 border-background flex items-center justify-center">
            <span className="material-symbols-outlined text-[10px] text-background font-bold">
              bolt
            </span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-semibold text-foreground tracking-tight">
            {user.handle}
          </h4>
          <time className="text-xs text-slate-500 uppercase tracking-widest">
            {time} · <span className={status === "RESISTED" ? "text-tertiary" : "text-slate-500"}>{status}</span>
          </time>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-6">
          {content}
        </p>

        {track && (
          <div className={`group/track mb-6 flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
            isSyncing 
            ? "bg-red-500/10 border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.15)]" 
            : "bg-black/40 border-white/5 hover:border-white/20 hover:bg-black/60"
          }`}>
            {/* Animated Background Pulse */}
            {isSyncing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                className="absolute inset-0 bg-red-500 blur-2xl"
              />
            )}

            <button 
              onClick={() => setIsSyncing(!isSyncing)}
              className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isSyncing ? "bg-red-500 text-white" : "bg-white/5 text-slate-400 group-hover/track:bg-white/10 group-hover/track:text-red-500"
              }`}
            >
              <span className={`material-symbols-outlined text-2xl ${isSyncing ? "animate-pulse" : ""}`}>
                {isSyncing ? "pause" : "play_arrow"}
              </span>
            </button>

            <div className="relative z-10 flex-1 min-w-0">
              <p className="text-xs font-black text-foreground truncate tracking-tight uppercase">
                {track.name}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1 truncate">
                {track.artist} · Atmosphere
              </p>
            </div>

            {isSyncing && (
              <div className="flex gap-1 pr-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                    className="w-1 bg-red-500/60 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            {tags?.map(tag => (
              <span key={tag} className="px-2 py-1 bg-surface-container rounded-md text-[10px] text-slate-400 uppercase tracking-tighter">
                {tag}
              </span>
            ))}
          </div>
          <button 
            onClick={() => setIsSyncing(!isSyncing)}
            className={`ml-auto flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              isSyncing 
                ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                : "bg-slate-800 text-tertiary hover:bg-slate-700"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSyncing ? "graphic_eq" : "auto_awesome"}
            </span>
            {isSyncing ? "Resonating..." : "Sync Resonance"}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default EchoCard;
