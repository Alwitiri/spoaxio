"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const allGames = [
  {
    id: "g1", sport: "Football", emoji: "⚽", title: "5v5 Evening Match",
    venue: "Pro Kick Turf, Velachery", time: "Today, 7:00 PM",
    players: { current: 8, total: 10 }, price: 150, distance: "2.1 km",
    skill: "Intermediate", color: "#00E676", host: "Rahul S.",
    description: "Friendly 5-a-side match. All skill levels welcome but some experience preferred.",
  },
  {
    id: "g2", sport: "Badminton", emoji: "🏸", title: "Doubles Game",
    venue: "Smash Point, T. Nagar", time: "Today, 8:00 PM",
    players: { current: 3, total: 4 }, price: 180, distance: "1.4 km",
    skill: "Beginner", color: "#00BCD4", host: "Priya M.",
    description: "Looking for one more player for doubles. Beginners welcome!",
  },
  {
    id: "g3", sport: "Cricket", emoji: "🏏", title: "Box Cricket Tournament",
    venue: "Green Arena, Adyar", time: "Saturday, 6:00 AM",
    players: { current: 11, total: 14 }, price: 200, distance: "3.8 km",
    skill: "All Levels", color: "#FF9800", host: "Arjun K.",
    description: "Weekend box cricket. 6-over matches. Teams will be shuffled.",
  },
  {
    id: "g4", sport: "Tennis", emoji: "🎾", title: "Singles Practice",
    venue: "Ace Tennis Academy", time: "Tomorrow, 6:30 AM",
    players: { current: 1, total: 2 }, price: 250, distance: "4.2 km",
    skill: "Advanced", color: "#E040FB", host: "Deepak N.",
    description: "Looking for a practice partner. Advanced level only.",
  },
  {
    id: "g5", sport: "Football", emoji: "⚽", title: "7v7 Weekend League",
    venue: "Goal Zone Arena, OMR", time: "Sunday, 5:00 PM",
    players: { current: 10, total: 14 }, price: 200, distance: "6.5 km",
    skill: "Intermediate", color: "#00E676", host: "Vikram R.",
    description: "Regular Sunday league. Teams balanced by skill. Jerseys provided.",
  },
  {
    id: "g6", sport: "Badminton", emoji: "🏸", title: "Mixed Doubles",
    venue: "Shuttle Zone, Anna Nagar", time: "Tomorrow, 7:00 PM",
    players: { current: 2, total: 4 }, price: 200, distance: "1.8 km",
    skill: "Intermediate", color: "#00BCD4", host: "Sneha P.",
    description: "Mixed doubles game. Need 2 more players, preferably one male one female.",
  },
  {
    id: "g7", sport: "Basketball", emoji: "🏀", title: "3v3 Pickup Game",
    venue: "YMCA Court, Nandanam", time: "Today, 6:00 PM",
    players: { current: 4, total: 6 }, price: 100, distance: "2.5 km",
    skill: "All Levels", color: "#FF5722", host: "Arun M.",
    description: "Casual 3v3 half-court game. Just show up and play!",
  },
  {
    id: "g8", sport: "Cricket", emoji: "🏏", title: "Net Practice Session",
    venue: "Chennai Cricket Hub, Porur", time: "Saturday, 7:00 AM",
    players: { current: 6, total: 8 }, price: 150, distance: "5.8 km",
    skill: "Beginner", color: "#FF9800", host: "Suresh M.",
    description: "Bowling and batting practice in nets. Coach will be present. Great for beginners.",
  },
];

const sportFilters = ["All", "Football", "Cricket", "Badminton", "Tennis", "Basketball"];
const skillFilters = ["Any", "Beginner", "Intermediate", "Advanced"];
const timeFilters = ["Any Time", "Today", "Tomorrow", "This Weekend"];

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function GamesPage() {
  const router = useRouter();
  const [activeSport, setActiveSport] = useState("All");
  const [activeSkill, setActiveSkill] = useState("Any");
  const [activeTime, setActiveTime] = useState("Any Time");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = allGames.filter((g) => {
    if (activeSport !== "All" && g.sport !== activeSport) return false;
    if (activeSkill !== "Any" && g.skill !== activeSkill && g.skill !== "All Levels") return false;
    if (activeTime === "Today" && !g.time.startsWith("Today")) return false;
    if (activeTime === "Tomorrow" && !g.time.startsWith("Tomorrow")) return false;
    if (activeTime === "This Weekend" && !g.time.includes("Saturday") && !g.time.includes("Sunday")) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 bg-[#060606] flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-2 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.push("/home")} className="w-9 h-9 bg-white/[0.06] rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">Games Near You</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <p className="text-[11px] text-primary/60">{filtered.length} active games</p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${showFilters ? "bg-primary/15 border border-primary/25" : "bg-white/[0.06]"}`}
          >
            <svg className={`w-4 h-4 ${showFilters ? "text-primary" : "text-white/60"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </button>
        </div>

        {/* Sport tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 mb-2">
          {sportFilters.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSport(s)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all border ${
                activeSport === s
                  ? "bg-primary/15 border-primary/25 text-primary"
                  : "bg-white/[0.03] border-transparent text-white/30 hover:text-white/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-2 space-y-2.5">
              <div>
                <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1.5">Skill Level</p>
                <div className="flex gap-1.5">
                  {skillFilters.map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveSkill(s)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                        activeSkill === s ? "bg-white/[0.08] text-white/70" : "bg-white/[0.03] text-white/25"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1.5">When</p>
                <div className="flex gap-1.5">
                  {timeFilters.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTime(t)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                        activeTime === t ? "bg-white/[0.08] text-white/70" : "bg-white/[0.03] text-white/25"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Game list */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto min-h-0 px-5 pb-6"
      >
        <div className="space-y-3">
          {filtered.map((game) => {
            const spotsLeft = game.players.total - game.players.current;
            const fillPercent = (game.players.current / game.players.total) * 100;
            return (
              <motion.div key={game.id} variants={fadeUp}>
                <Link
                  href={`/games/${game.id}`}
                  className="block bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: `${game.color}12` }}
                    >
                      {game.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[14px] font-semibold text-white group-hover:text-primary/90 transition-colors">{game.title}</h3>
                          <p className="text-[11px] text-white/30 mt-0.5">{game.sport} · {game.skill}</p>
                        </div>
                        <span className="text-sm font-bold text-white shrink-0 ml-2">₹{game.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-[11px] text-white/35">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span>{game.venue}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{game.time}</span>
                    </div>
                  </div>

                  {/* Player bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${fillPercent}%`, backgroundColor: game.color }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-white/25">{game.players.current}/{game.players.total}</span>
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                        style={{
                          color: spotsLeft <= 2 ? "#FF5722" : "#00E676",
                          backgroundColor: spotsLeft <= 2 ? "#FF572210" : "#00E67610",
                        }}
                      >
                        {spotsLeft} left
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-white/[0.04]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-[8px] font-bold text-primary">{game.host[0]}</span>
                      </div>
                      <span className="text-[10px] text-white/25">by {game.host}</span>
                    </div>
                    <span className="text-[10px] text-white/20">{game.distance}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-white/30 text-sm mb-1">No games found</p>
              <p className="text-white/15 text-xs">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Create game FAB */}
      <div className="absolute bottom-6 right-5">
        <Link
          href="/games/create"
          className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 hover:brightness-110 transition-all"
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
