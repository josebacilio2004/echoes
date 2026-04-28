"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navItems = [
    { icon: "explore", label: "Explore", href: "/" },
    { icon: "bubble_chart", label: "Encounters", href: "/encounters" },
    { icon: "add_circle", label: "Add", href: "/create", primary: true },
    { icon: "auto_awesome", label: "Synths", href: "/synths" },
    { icon: "person", label: "Registry", href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center h-20 px-4 bg-slate-950/60 backdrop-blur-2xl rounded-t-3xl border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex flex-col items-center justify-center transition-all ${
            item.primary
              ? "relative -top-6 w-14 h-14 bg-tertiary rounded-full text-slate-950 shadow-[0_0_20px_rgba(47,217,244,0.6)] hover:scale-105"
              : pathname === item.href
              ? "text-tertiary drop-shadow-[0_0_10px_rgba(47,217,244,0.8)]"
              : "text-slate-600 hover:text-slate-300"
          }`}
        >
          <span className={`material-symbols-outlined ${item.primary ? "scale-125" : ""}`}>
            {item.icon}
          </span>
          {!item.primary && (
            <span className="text-[10px] uppercase tracking-widest mt-1">
              {item.label}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
