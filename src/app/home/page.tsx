"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

const liveGames = [
  {
    id: "g1",
    sport: "Football",
    emoji: "⚽",
    title: "5v5 Evening Match",
    venue: "Pro Kick Turf, Velachery",
    time: "Today, 7:00 PM",
    players: { current: 8, total: 10 },
    price: 150,
    distance: "2.1 km",
    skill: "Intermediate",
    color: "#00E676",
    host: "Rahul S.",
  },
  {
    id: "g2",
    sport: "Badminton",
    emoji: "🏸",
    title: "Doubles Game",
    venue: "Smash Point, T. Nagar",
    time: "Today, 8:00 PM",
    players: { current: 3, total: 4 },
    price: 180,
    distance: "1.4 km",
    skill: "Beginner",
    color: "#00BCD4",
    host: "Priya M.",
  },
  {
    id: "g3",
    sport: "Cricket",
    emoji: "🏏",
    title: "Box Cricket Tournament",
    venue: "Green Arena, Adyar",
    time: "Saturday, 6:00 AM",
    players: { current: 11, total: 14 },
    price: 200,
    distance: "3.8 km",
    skill: "All Levels",
    color: "#FF9800",
    host: "Arjun K.",
  },
  {
    id: "g4",
    sport: "Tennis",
    emoji: "🎾",
    title: "Singles Practice",
    venue: "Ace Tennis Academy",
    time: "Tomorrow, 6:30 AM",
    players: { current: 1, total: 2 },
    price: 250,
    distance: "4.2 km",
    skill: "Advanced",
    color: "#E040FB",
    host: "Deepak N.",
  },
];

const nearbyVenues = [
  { name: "Smash Point Badminton", sport: "🏸", distance: "1.5 km", slots: 3, price: 600 },
  { name: "Pro Kick Football Turf", sport: "⚽", distance: "2.1 km", slots: 5, price: 800 },
  { name: "Green Arena Cricket", sport: "🏏", distance: "2.3 km", slots: 2, price: 1200 },
];

const activePlayers = [
  { name: "Vikram R.", sport: "Football", emoji: "⚽", skill: "Intermediate", distance: "0.8 km" },
  { name: "Sneha P.", sport: "Badminton", emoji: "🏸", skill: "Advanced", distance: "1.2 km" },
  { name: "Karthik V.", sport: "Cricket", emoji: "🏏", skill: "Intermediate", distance: "1.5 km" },
  { name: "Divya S.", sport: "Tennis", emoji: "🎾", skill: "Beginner", distance: "2.0 km" },
  { name: "Arun M.", sport: "Football", emoji: "⚽", skill: "Advanced", distance: "2.3 km" },
];

const localEvents = [
  { name: "District Football Cup", emoji: "⚽", date: "Sep 15", location: "Anna Nagar", fee: "₹500/team" },
  { name: "Badminton Open", emoji: "🏸", date: "Sep 20", location: "T. Nagar", fee: "₹200/person" },
];

const navTabs = [
  { id: "home", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "games", label: "Games", icon: "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.491 48.491 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" },
  { id: "players", label: "Players", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
  { id: "create", label: "Create", icon: "M12 4.5v15m7.5-7.5h-15" },
  { id: "profile", label: "Profile", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [activeSport, setActiveSport] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const demoUser = typeof window !== "undefined" && localStorage.getItem("spoaxio_demo_user");
    if (demoUser) { setUser({ email: "alwin@gmail.com" } as User); return; }
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login"); else setUser(data.user);
    });
  }, [router]);

  const displayName = user?.user_metadata?.full_name?.split(" ")[0] || "Player";
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening";

  const filteredGames = activeSport === "All"
    ? liveGames
    : liveGames.filter((g) => g.sport === activeSport);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <>
      <style jsx>{`
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.6 } 100% { transform: scale(1.8); opacity: 0 } }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        .pulse-dot::after { content:''; position:absolute; inset:-3px; border-radius:9999px; border:2px solid #00E676; animation:pulse-ring 2s ease-out infinite; }
        .float-anim { animation: float 3s ease-in-out infinite }
      `}</style>

      <div className="fixed inset-0 bg-[#060606] flex flex-col">
        {/* Header */}
        <div className="px-5 pt-5 pb-2 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-primary/60 text-[11px] uppercase tracking-widest font-semibold">{greeting}</p>
              <h1 className="text-xl font-bold text-white mt-0.5">{displayName}</h1>
            </div>
            <div className="flex items-center gap-2.5">
              <button className="w-9 h-9 bg-white/[0.06] rounded-xl flex items-center justify-center hover:bg-white/[0.08] transition-colors relative">
                <svg className="w-[18px] h-[18px] text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />
              </button>
              <button
                onClick={handleSignOut}
                className="w-9 h-9 bg-white/[0.06] rounded-xl flex items-center justify-center hover:bg-white/[0.08] transition-colors"
              >
                <svg className="w-[18px] h-[18px] text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>
            </div>
          </div>

          {/* "What do you want to play?" prompt */}
          <Link href="/games" className="block relative mb-3">
            <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.04] rounded-2xl border border-white/[0.06] hover:border-primary/20 transition-all group">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-sm text-white/25 group-hover:text-white/35 transition-colors">What do you want to play?</span>
            </div>
          </Link>
        </div>

        {/* Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial="hidden"
                animate="show"
                variants={stagger}
                className="px-5"
              >
                {/* Live Games Section */}
                <motion.div variants={fadeUp} className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="relative w-2 h-2">
                        <div className="absolute inset-0 bg-primary rounded-full" />
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping" />
                      </div>
                      <h2 className="text-sm font-semibold text-white">Games Near You</h2>
                    </div>
                    <Link href="/games" className="text-[11px] text-primary/60 hover:text-primary transition-colors">See all</Link>
                  </div>

                  {/* Sport filter */}
                  <div className="flex gap-2 mb-3 overflow-x-auto pb-1 -mx-1 px-1">
                    {["All", "Football", "Badminton", "Cricket", "Tennis"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setActiveSport(s)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                          activeSport === s
                            ? "bg-primary/15 text-primary border border-primary/25"
                            : "bg-white/[0.03] text-white/30 border border-transparent hover:text-white/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Game cards — horizontal scroll */}
                  <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory">
                    {filteredGames.map((game) => {
                      const spotsLeft = game.players.total - game.players.current;
                      const fillPercent = (game.players.current / game.players.total) * 100;
                      return (
                        <Link
                          key={game.id}
                          href={`/games/${game.id}`}
                          className="flex-shrink-0 w-[280px] snap-start bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 hover:bg-white/[0.05] transition-all group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                                style={{ backgroundColor: `${game.color}12` }}
                              >
                                {game.emoji}
                              </div>
                              <div>
                                <h3 className="text-[13px] font-semibold text-white group-hover:text-primary/90 transition-colors">{game.title}</h3>
                                <p className="text-[10px] text-white/30">{game.sport} · {game.skill}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3 h-3 text-white/20 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                              <span className="text-[11px] text-white/40">{game.venue}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3 h-3 text-white/20 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-[11px] text-white/40">{game.time}</span>
                            </div>
                          </div>

                          {/* Player fill bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] text-white/25">{game.players.current}/{game.players.total} players</span>
                              <span className="text-[10px] font-medium" style={{ color: spotsLeft <= 2 ? "#FF5722" : "#00E676" }}>
                                {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                              </span>
                            </div>
                            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${fillPercent}%`, backgroundColor: game.color }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/25">{game.distance}</span>
                            <span className="text-sm font-bold text-white">₹{game.price}<span className="text-[10px] text-white/30 font-normal">/player</span></span>
                          </div>
                        </Link>
                      );
                    })}

                    {/* Create game card */}
                    <button
                      onClick={() => setActiveTab("create")}
                      className="flex-shrink-0 w-[280px] snap-start bg-primary/[0.04] border border-primary/10 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-primary/[0.08] transition-all min-h-[200px]"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-primary/80">Create a Game</p>
                        <p className="text-[11px] text-white/20 mt-0.5">Invite players nearby</p>
                      </div>
                    </button>
                  </div>
                </motion.div>

                {/* Available Right Now */}
                <motion.div variants={fadeUp} className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-white">Available Right Now</h2>
                    <Link href="/turfs" className="text-[11px] text-primary/60 hover:text-primary transition-colors">See all</Link>
                  </div>
                  <div className="space-y-2">
                    {nearbyVenues.map((v) => (
                      <Link
                        key={v.name}
                        href="/turfs"
                        className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.05] transition-all"
                      >
                        <div className="w-10 h-10 bg-white/[0.04] rounded-lg flex items-center justify-center text-lg shrink-0">{v.sport}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">{v.name}</p>
                          <p className="text-[10px] text-white/25">{v.distance} · {v.slots} slots today</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold text-white">₹{v.price}</p>
                          <p className="text-[9px] text-white/20">/hr</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Players Looking to Play */}
                <motion.div variants={fadeUp} className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-white">Players Near You</h2>
                    <Link href="/players" className="text-[11px] text-primary/60 hover:text-primary transition-colors">See all</Link>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
                    {activePlayers.map((p) => (
                      <div
                        key={p.name}
                        className="flex-shrink-0 w-[120px] bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3 text-center hover:bg-white/[0.05] transition-all"
                      >
                        <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-sm font-bold text-primary">{p.name[0]}</span>
                        </div>
                        <p className="text-[11px] font-medium text-white truncate">{p.name}</p>
                        <p className="text-[10px] text-white/25 mt-0.5">{p.emoji} {p.skill}</p>
                        <p className="text-[9px] text-white/15 mt-0.5">{p.distance}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Local Events */}
                <motion.div variants={fadeUp} className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-white">Local Events</h2>
                    <span className="text-[11px] text-primary/60">Chennai</span>
                  </div>
                  <div className="space-y-2">
                    {localEvents.map((ev) => (
                      <div
                        key={ev.name}
                        className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.05] transition-all cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-lg shrink-0">🏆</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">{ev.name}</p>
                          <p className="text-[10px] text-white/25">{ev.date} · {ev.location}</p>
                        </div>
                        <span className="text-[10px] text-primary/60 font-medium shrink-0">{ev.fee}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Spacer for bottom nav */}
                <div className="h-4" />
              </motion.div>
            )}

            {activeTab !== "home" && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex items-center justify-center h-full px-5"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/5 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <p className="text-base font-semibold text-white/50 mb-1">
                    {activeTab === "games" ? "Games" : activeTab === "players" ? "Find Players" : activeTab === "create" ? "Create Game" : "Profile"}
                  </p>
                  <p className="text-xs text-white/20">Coming soon</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <nav className="bg-[#0a0a0a] border-t border-white/[0.06] shrink-0">
          <div className="flex justify-around py-2">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors relative ${
                  activeTab === tab.id ? "text-primary" : "text-white/25 hover:text-white/40"
                }`}
              >
                {tab.id === "create" ? (
                  <div className="w-10 h-10 -mt-5 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                    </svg>
                  </div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                )}
                <span className={`text-[10px] font-medium ${tab.id === "create" ? "mt-0" : ""}`}>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
