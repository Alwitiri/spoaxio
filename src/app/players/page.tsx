"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const allPlayers = [
  {
    id: "p1", name: "Rahul Sharma", avatar: "R", age: 25,
    sports: ["Football", "Cricket"], primarySport: "Football",
    skill: "Advanced", games: 48, rating: 4.8, distance: "1.2 km",
    availability: "Evenings", area: "Velachery",
    bio: "Regular 5-a-side player. Looking for competitive matches.",
    badges: ["Top Scorer", "Team Leader"],
  },
  {
    id: "p2", name: "Priya Menon", avatar: "P", age: 23,
    sports: ["Badminton", "Tennis"], primarySport: "Badminton",
    skill: "Intermediate", games: 32, rating: 4.6, distance: "0.8 km",
    availability: "Weekends", area: "T. Nagar",
    bio: "Mixed doubles enthusiast. Also plays tennis on weekends.",
    badges: ["Rising Star"],
  },
  {
    id: "p3", name: "Arjun Kumar", avatar: "A", age: 28,
    sports: ["Cricket", "Football"], primarySport: "Cricket",
    skill: "Advanced", games: 65, rating: 4.9, distance: "2.5 km",
    availability: "Early Morning", area: "Adyar",
    bio: "Opening batsman. Captain of a local team. Plays box cricket on weekends.",
    badges: ["Captain", "MVP", "50+ Games"],
  },
  {
    id: "p4", name: "Sneha Patel", avatar: "S", age: 22,
    sports: ["Badminton"], primarySport: "Badminton",
    skill: "Beginner", games: 8, rating: 4.2, distance: "1.5 km",
    availability: "Evenings", area: "Anna Nagar",
    bio: "Just started playing. Looking for friendly games to improve.",
    badges: [],
  },
  {
    id: "p5", name: "Vikram Rajan", avatar: "V", age: 30,
    sports: ["Football", "Basketball"], primarySport: "Football",
    skill: "Intermediate", games: 35, rating: 4.5, distance: "3.1 km",
    availability: "Weekends", area: "OMR",
    bio: "Weekend warrior. Love the beautiful game.",
    badges: ["Consistent Player"],
  },
  {
    id: "p6", name: "Deepak Nair", avatar: "D", age: 26,
    sports: ["Tennis"], primarySport: "Tennis",
    skill: "Advanced", games: 42, rating: 4.7, distance: "4.0 km",
    availability: "Early Morning", area: "Guindy",
    bio: "Competitive singles player. Looking for regular practice partners.",
    badges: ["Tournament Winner"],
  },
  {
    id: "p7", name: "Meena Krishnan", avatar: "M", age: 24,
    sports: ["Basketball", "Volleyball"], primarySport: "Basketball",
    skill: "Intermediate", games: 22, rating: 4.4, distance: "1.8 km",
    availability: "Evenings", area: "Nandanam",
    bio: "Point guard looking for 3v3 and 5v5 pickup games.",
    badges: [],
  },
  {
    id: "p8", name: "Karthik Venkat", avatar: "K", age: 27,
    sports: ["Football", "Cricket", "Badminton"], primarySport: "Football",
    skill: "Intermediate", games: 55, rating: 4.6, distance: "2.3 km",
    availability: "Flexible", area: "Mylapore",
    bio: "Multi-sport player. Can fill any position on the football field.",
    badges: ["Versatile", "50+ Games"],
  },
];

const sportFilters = ["All", "Football", "Cricket", "Badminton", "Tennis", "Basketball"];
const skillFilters = ["Any", "Beginner", "Intermediate", "Advanced"];
const availFilters = ["Any Time", "Evenings", "Weekends", "Early Morning"];

const skillColors: Record<string, string> = {
  Beginner: "#00BCD4", Intermediate: "#00E676", Advanced: "#FF9800",
};

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function PlayersPage() {
  const router = useRouter();
  const [activeSport, setActiveSport] = useState("All");
  const [activeSkill, setActiveSkill] = useState("Any");
  const [activeAvail, setActiveAvail] = useState("Any Time");
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = allPlayers.filter((p) => {
    if (activeSport !== "All" && !p.sports.includes(activeSport)) return false;
    if (activeSkill !== "Any" && p.skill !== activeSkill) return false;
    if (activeAvail !== "Any Time" && p.availability !== activeAvail && p.availability !== "Flexible") return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-2 shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => router.push("/home")} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">Find Players</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <p className="text-[11px] text-primary/60">{filtered.length} players nearby</p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${showFilters ? "bg-primary/15 border border-primary/25" : "bg-gray-100"}`}
          >
            <svg className={`w-4 h-4 ${showFilters ? "text-primary" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search players..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/20"
          />
        </div>

        {/* Sport tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 mb-1">
          {sportFilters.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSport(s)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all border ${
                activeSport === s
                  ? "bg-primary/15 border-primary/25 text-primary"
                  : "bg-gray-50 border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
            <div className="pb-2 space-y-2.5 pt-1">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">Skill Level</p>
                <div className="flex gap-1.5">
                  {skillFilters.map((s) => (
                    <button key={s} onClick={() => setActiveSkill(s)} className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${activeSkill === s ? "bg-gray-100 text-gray-600" : "bg-gray-50 text-gray-500"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">Availability</p>
                <div className="flex gap-1.5 flex-wrap">
                  {availFilters.map((a) => (
                    <button key={a} onClick={() => setActiveAvail(a)} className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${activeAvail === a ? "bg-gray-100 text-gray-600" : "bg-gray-50 text-gray-500"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Player list */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 overflow-y-auto min-h-0 px-5 pb-6">
        <div className="space-y-2.5">
          {filtered.map((player) => (
            <motion.div key={player.id} variants={fadeUp}>
              <Link
                href={`/players/${player.id}`}
                className="block bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:bg-gray-100 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-base font-bold text-primary">{player.avatar}</span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-[14px] font-semibold text-gray-900 group-hover:text-primary/90 transition-colors">{player.name}</h3>
                        <p className="text-[10px] text-gray-500">{player.area} · {player.distance}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-400/10 px-1.5 py-0.5 rounded">
                        <svg className="w-2.5 h-2.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-[10px] font-bold text-yellow-400">{player.rating}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-500 mb-2 line-clamp-1">{player.bio}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                        style={{ backgroundColor: `${skillColors[player.skill]}12`, color: skillColors[player.skill] }}
                      >
                        {player.skill}
                      </span>
                      {player.sports.slice(0, 3).map((s) => (
                        <span key={s} className="text-[9px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">{s}</span>
                      ))}
                      <span className="text-[9px] text-gray-500">{player.games} games</span>
                    </div>

                    {player.badges.length > 0 && (
                      <div className="flex gap-1.5 mt-2">
                        {player.badges.slice(0, 3).map((b) => (
                          <span key={b} className="text-[8px] font-semibold text-amber-400/60 bg-amber-400/[0.06] px-1.5 py-0.5 rounded-full">{b}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-gray-500 text-sm mb-1">No players found</p>
              <p className="text-gray-500 text-xs">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
