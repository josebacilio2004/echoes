"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  async function fetchConversations() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Lógica para obtener conversaciones (simplificada para el MVP)
    // En una red social real, buscaríamos mensajes donde el usuario es remitente o destinatario
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:profiles!messages_sender_id_fkey(username, avatar_url), receiver:profiles!messages_receiver_id_fkey(username, avatar_url)')
      .or(`sender_id.eq.${session.user.id},receiver_id.eq.${session.user.id}`)
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Agrupar por usuario único para mostrar la lista de chats
      const chats = {};
      data.forEach(msg => {
        const otherUser = msg.sender_id === session.user.id ? msg.receiver : msg.sender;
        const otherId = msg.sender_id === session.user.id ? msg.receiver_id : msg.sender_id;
        if (!chats[otherId]) {
          chats[otherId] = {
            id: otherId,
            user: otherUser,
            lastMessage: msg.content,
            time: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
      });
      setConversations(Object.values(chats));
    }
    setLoading(false);
  }

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-24 px-6 max-w-2xl mx-auto w-full">
        <header className="mb-12 space-y-2">
          <h2 className="text-4xl font-black tracking-tighter text-glow uppercase">Resonances</h2>
          <p className="text-slate-500 text-xs uppercase tracking-[0.3em]">Active connections in the void</p>
        </header>

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="material-symbols-outlined text-4xl text-tertiary animate-spin">sync</span>
            </div>
          ) : conversations.length > 0 ? (
            conversations.map((chat) => (
              <Link key={chat.id} href={`/messages/${chat.id}`}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-5 rounded-2xl flex items-center gap-4 border-white/5 hover:border-tertiary/30 transition-all group"
                >
                  <img src={chat.user?.avatar_url} className="w-12 h-12 rounded-full border border-white/10" alt="" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">@{chat.user?.username}</h3>
                      <span className="text-[10px] text-slate-600 font-mono">{chat.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate group-hover:text-slate-300 transition-colors">
                      {chat.lastMessage}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-slate-700 group-hover:text-tertiary transition-colors">
                    terminal
                  </span>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20 space-y-4">
              <span className="material-symbols-outlined text-6xl text-slate-800">contact_support</span>
              <p className="text-slate-500 uppercase tracking-widest text-xs">No active resonances found.</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
