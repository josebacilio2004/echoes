"use client";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatTerminal() {
  const { id: receiverId } = useParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    initChat();
    
    // Subscribe to real-time messages
    const channel = supabase
      .channel(`chat:${receiverId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [receiverId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function initChat() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return router.push('/login');
    setCurrentUser(session.user);

    // Get receiver info
    const { data: userData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', receiverId)
      .single();
    setReceiver(userData);

    // Get message history
    const { data: msgData } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${session.user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${session.user.id})`)
      .order('created_at', { ascending: true });

    if (msgData) setMessages(msgData);
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          sender_id: currentUser.id,
          receiver_id: receiverId,
          content: newMessage
        }
      ]);

    if (!error) setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-black text-tertiary font-mono p-4 flex flex-col relative overflow-hidden crt-overlay">
      {/* CRT Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-10"></div>
      
      {/* Terminal Header */}
      <header className="border-b border-tertiary/20 pb-4 mb-4 flex justify-between items-center bg-black/80 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="hover:bg-tertiary/10 p-1 rounded">
            <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
          </button>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold uppercase tracking-widest">
              ID: {receiver?.username || "UNKNOWN_ENTITY"}
            </h2>
            <span className="text-[8px] text-tertiary/60">ENCRYPTION: AES-256-VOID</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></div>
          <span className="text-[10px]">RESONATING</span>
        </div>
      </header>

      {/* Message Area */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide px-2 relative z-10">
        <div className="text-[10px] text-tertiary/40 italic py-4 text-center">
          -- CONNECTION ESTABLISHED AT {new Date().toISOString()} --
        </div>
        
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id || idx}
              initial={{ opacity: 0, x: msg.sender_id === currentUser?.id ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex flex-col ${msg.sender_id === currentUser?.id ? "items-end" : "items-start"}`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg border ${
                msg.sender_id === currentUser?.id 
                ? "bg-tertiary/10 border-tertiary/30 text-tertiary" 
                : "bg-slate-900/80 border-white/5 text-slate-300"
              }`}>
                <p className="text-xs break-words leading-relaxed whitespace-pre-wrap">
                  {msg.sender_id === currentUser?.id ? "> " : ""}{msg.content}
                </p>
              </div>
              <span className="text-[8px] text-slate-600 mt-1 uppercase">
                {new Date(msg.created_at).toLocaleTimeString()}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Terminal Input */}
      <form onSubmit={sendMessage} className="relative z-10">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary">{">"}</span>
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your resonance..."
            className="w-full bg-black border border-tertiary/30 rounded-full py-3 pl-10 pr-16 text-xs focus:outline-none focus:border-tertiary shadow-[0_0_15px_rgba(47,217,244,0.1)] transition-all"
            autoFocus
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-tertiary text-black p-2 rounded-full hover:scale-105 transition-all"
          >
            <span className="material-symbols-outlined text-sm font-bold">send</span>
          </button>
        </div>
      </form>

      <style jsx>{`
        .crt-overlay::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 2;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.5) 50%
          );
          background-size: 100% 4px;
        }
        @keyframes flicker {
          0% { opacity: 0.27861; }
          5% { opacity: 0.34769; }
          10% { opacity: 0.23604; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
