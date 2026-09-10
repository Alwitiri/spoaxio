"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  { id: "games", emoji: "🎮", label: "Live Games", count: 8, color: "#00E676", href: "/games" },
  { id: "turfs", emoji: "🏟️", label: "Turfs", count: 12, color: "#00BCD4", href: "/turfs" },
  { id: "gyms", emoji: "💪", label: "Gyms", count: 6, color: "#FF9800", href: "/gyms" },
  { id: "players", emoji: "👥", label: "Players", count: 45, color: "#E040FB", href: "/players" },
];

const trendingSearches = [
  "Football near me", "Badminton courts T. Nagar", "Box cricket weekend",
  "Gym with trainer", "Tennis practice partner", "5v5 today",
];

const quickResults = [
  { type: "game", emoji: "⚽", title: "5v5 Evening Match", sub: "Today 7 PM · 2 spots left", href: "/games/g1", color: "#00E676" },
  { type: "venue", emoji: "🏟️", title: "Pro Kick Turf", sub: "Velachery · ₹1200/hr", href: "/turfs/1", color: "#00BCD4" },
  { type: "player", emoji: "👤", title: "Rahul Sharma", sub: "Football · Advanced · 1.2 km", href: "/players/p1", color: "#E040FB" },
  { type: "game", emoji: "🏸", title: "Doubles Game", sub: "Today 8 PM · 1 spot left", href: "/games/g2", color: "#00BCD4" },
  { type: "venue", emoji: "💪", title: "FitPro Gym", sub: "Velachery · ₹2500/mo", href: "/gyms/1", color: "#FF9800" },
  { type: "game", emoji: "🏏", title: "Box Cricket Tournament", sub: "Saturday 6 AM · 3 spots left", href: "/games/g3", color: "#FF9800" },
];

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

export default function ExplorePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = search.trim()
    ? quickResults.filter(
        (r) =>
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.sub.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 bg-[#060606] flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => router.push("/home")} className="w-9 h-9 bg-white/[0.06] rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-white">Explore</h1>
        </div>

        {/* Search bar */}
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Search games, venues, players..."
            className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/20"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/[0.08] rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 overflow-y-auto min-h-0 px-5 pb-6">
        {/* Search results */}
        {search.trim() && (
          <div className="mb-4">
            <p className="text-[10px] text-white/20 uppercase tracking-wider mb-2">Results</p>
            {filtered.length > 0 ? (
              <div className="space-y-1.5">
                {filtered.map((r, i) => (
                  <Link key={i} href={r.href} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.05] transition-all">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${r.color}10` }}>
                      {r.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white">{r.title}</p>
                      <p className="text-[10px] text-white/25">{r.sub}</p>
                    </div>
                    <span className="text-[8px] text-white/15 uppercase font-medium">{r.type}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-xs text-white/25">No results for &quot;{search}&quot;</p>
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        {!search.trim() && (
          <>
            <motion.div variants={fadeUp} className="mb-5">
              <p className="text-[10px] text-white/20 uppercase tracking-wider mb-2.5">Browse</p>
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={c.href}
                    className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{c.emoji}</span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{ color: c.color, backgroundColor: `${c.color}10` }}>
                        {c.count}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white group-hover:text-primary/90 transition-colors">{c.label}</p>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Trending searches */}
            <motion.div variants={fadeUp} className="mb-5">
              <p className="text-[10px] text-white/20 uppercase tracking-wider mb-2.5">Trending</p>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSearch(t)}
                    className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-[11px] text-white/30 hover:text-white/50 hover:bg-white/[0.05] transition-all"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Happening now */}
            <motion.div variants={fadeUp}>
              <p className="text-[10px] text-white/20 uppercase tracking-wider mb-2.5">Happening Now</p>
              <div className="space-y-2">
                {quickResults.filter((r) => r.type === "game").map((r, i) => (
                  <Link key={i} href={r.href} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.05] transition-all">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${r.color}10` }}>
                      {r.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white">{r.title}</p>
                      <p className="text-[10px] text-white/25">{r.sub}</p>
                    </div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
