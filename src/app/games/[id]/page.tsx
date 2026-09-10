"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";

const gamesData: Record<string, {
  sport: string; emoji: string; title: string; venue: string; venueAddress: string;
  time: string; date: string; players: { name: string; skill: string; paid: boolean }[];
  totalPlayers: number; price: number; distance: string; skill: string; color: string;
  host: string; description: string; rules: string[];
}> = {
  g1: {
    sport: "Football", emoji: "⚽", title: "5v5 Evening Match",
    venue: "Pro Kick Turf, Velachery", venueAddress: "123 Velachery Main Road, Chennai 600042",
    time: "7:00 PM", date: "Today, Wed 10 Sep",
    players: [
      { name: "Rahul S.", skill: "Advanced", paid: true },
      { name: "Vikram R.", skill: "Intermediate", paid: true },
      { name: "Arun M.", skill: "Advanced", paid: true },
      { name: "Deepak K.", skill: "Intermediate", paid: true },
      { name: "Suresh N.", skill: "Beginner", paid: false },
      { name: "Karthik V.", skill: "Intermediate", paid: true },
      { name: "Sanjay P.", skill: "Intermediate", paid: false },
      { name: "Ravi T.", skill: "Advanced", paid: true },
    ],
    totalPlayers: 10, price: 150, distance: "2.1 km", skill: "Intermediate",
    color: "#00E676", host: "Rahul S.",
    description: "Friendly 5-a-side match on astroturf. Bibs will be provided. Teams will be balanced by skill level. Please arrive 10 minutes before the game.",
    rules: ["No studs allowed", "Bibs provided", "Teams balanced by skill", "₹150 per player", "No refund for no-shows"],
  },
  g2: {
    sport: "Badminton", emoji: "🏸", title: "Doubles Game",
    venue: "Smash Point, T. Nagar", venueAddress: "45 Usman Road, T. Nagar, Chennai 600017",
    time: "8:00 PM", date: "Today, Wed 10 Sep",
    players: [
      { name: "Priya M.", skill: "Intermediate", paid: true },
      { name: "Sneha P.", skill: "Advanced", paid: true },
      { name: "Meena K.", skill: "Beginner", paid: false },
    ],
    totalPlayers: 4, price: 180, distance: "1.4 km", skill: "Beginner",
    color: "#00BCD4", host: "Priya M.",
    description: "Looking for one more player for doubles. Beginners are welcome — we play for fun, not trophies! Shuttlecocks provided.",
    rules: ["Racket required (rentals available)", "Shuttlecocks provided", "1 hour slot", "AC court"],
  },
  g3: {
    sport: "Cricket", emoji: "🏏", title: "Box Cricket Tournament",
    venue: "Green Arena, Adyar", venueAddress: "78 Gandhi Nagar, Adyar, Chennai 600020",
    time: "6:00 AM", date: "Saturday, 13 Sep",
    players: [
      { name: "Arjun K.", skill: "Intermediate", paid: true },
      { name: "Rahul S.", skill: "Advanced", paid: true },
      { name: "Karthik V.", skill: "Intermediate", paid: true },
      { name: "Deepak N.", skill: "Beginner", paid: true },
      { name: "Vikram P.", skill: "Intermediate", paid: false },
      { name: "Suresh M.", skill: "Beginner", paid: true },
      { name: "Aditya K.", skill: "Intermediate", paid: true },
      { name: "Gopal S.", skill: "Advanced", paid: false },
      { name: "Roshni S.", skill: "Beginner", paid: true },
      { name: "Ananya M.", skill: "Intermediate", paid: true },
      { name: "Ramesh K.", skill: "Advanced", paid: true },
    ],
    totalPlayers: 14, price: 200, distance: "3.8 km", skill: "All Levels",
    color: "#FF9800", host: "Arjun K.",
    description: "Weekend box cricket! 6-over matches with 6 players per team. Teams will be shuffled each round. Trophies for winners!",
    rules: ["6 overs per side", "6 players per team", "Teams shuffled each round", "Hard tennis ball", "Winner gets trophy"],
  },
};

const fallback = gamesData["g1"];

const skillColors: Record<string, string> = {
  Beginner: "#00BCD4", Intermediate: "#00E676", Advanced: "#FF9800", "All Levels": "#9C27B0",
};

export default function GameDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const game = gamesData[id] || fallback;
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "players" | "chat">("details");

  const spotsLeft = game.totalPlayers - game.players.length;
  const fillPercent = (game.players.length / game.totalPlayers) * 100;
  const paidCount = game.players.filter((p) => p.paid).length;

  function handleJoin() {
    setJoining(true);
    setTimeout(() => {
      setJoining(false);
      setJoined(true);
    }, 1200);
  }

  return (
    <>
      <style jsx>{`
        @keyframes confetti { 0% { transform: translateY(0) scale(1); opacity:1 } 100% { transform: translateY(-40px) scale(0.5); opacity:0 } }
        .confetti { animation: confetti 0.8s ease-out forwards }
      `}</style>
      <div className="fixed inset-0 bg-[#060606] flex flex-col">
        {/* Hero */}
        <div className="relative shrink-0" style={{ backgroundColor: `${game.color}08` }}>
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center justify-between mb-5">
              <button onClick={() => router.back()} className="w-9 h-9 bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-9 h-9 bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${game.color}15` }}>
                {game.emoji}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{game.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: `${skillColors[game.skill]}15`, color: skillColors[game.skill] }}>
                    {game.skill}
                  </span>
                  <span className="text-[11px] text-white/30">{game.sport}</span>
                </div>
              </div>
            </div>

            {/* Key info row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-black/20 rounded-xl p-2.5 text-center">
                <p className="text-xs font-bold text-white">{game.time}</p>
                <p className="text-[9px] text-white/25 mt-0.5">{game.date.split(",")[0]}</p>
              </div>
              <div className="bg-black/20 rounded-xl p-2.5 text-center">
                <p className="text-xs font-bold text-white">₹{game.price}</p>
                <p className="text-[9px] text-white/25 mt-0.5">per player</p>
              </div>
              <div className="bg-black/20 rounded-xl p-2.5 text-center">
                <p className="text-xs font-bold text-white">{game.distance}</p>
                <p className="text-[9px] text-white/25 mt-0.5">away</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-3 pb-1 shrink-0">
          <div className="flex gap-1 bg-white/[0.03] rounded-xl p-1">
            {(["details", "players", "chat"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab ? "bg-white/[0.08] text-white" : "text-white/30"
                }`}
              >
                {tab === "details" ? "Details" : tab === "players" ? `Players (${game.players.length}/${game.totalPlayers})` : "Chat"}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 px-5 py-3">
          {activeTab === "details" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Host */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{game.host[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-white">{game.host}</p>
                  <p className="text-[10px] text-white/25">Game Host</p>
                </div>
                <button className="px-3 py-1.5 bg-white/[0.06] rounded-lg text-[10px] text-white/40 font-medium">Message</button>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white mb-2">About this game</h3>
                <p className="text-xs text-white/40 leading-relaxed">{game.description}</p>
              </div>

              {/* Venue */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white mb-2">Venue</h3>
                <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{game.venue}</p>
                      <p className="text-[10px] text-white/25 mt-0.5">{game.venueAddress}</p>
                      <button className="mt-2 text-[10px] text-blue-400 font-medium">Get Directions</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white mb-2">Game Rules</h3>
                <div className="space-y-1.5">
                  {game.rules.map((rule) => (
                    <div key={rule} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary/50 rounded-full shrink-0" />
                      <span className="text-xs text-white/40">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Player fill status */}
              <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/40">Player slots</span>
                  <span className="text-xs font-medium" style={{ color: spotsLeft <= 2 ? "#FF5722" : "#00E676" }}>
                    {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} remaining
                  </span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fillPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: game.color }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/20">
                  <span>{paidCount}/{game.players.length} paid</span>
                  <span>{game.players.length}/{game.totalPlayers} joined</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "players" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              {game.players.map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{p.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-white">{p.name}</p>
                      {i === 0 && <span className="text-[8px] px-1.5 py-0.5 bg-primary/10 text-primary rounded font-semibold">HOST</span>}
                    </div>
                    <p className="text-[10px] text-white/25">{p.skill}</p>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[9px] font-medium ${p.paid ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-400"}`}>
                    {p.paid ? "Paid" : "Pending"}
                  </div>
                </div>
              ))}
              {spotsLeft > 0 && (
                <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-dashed border-white/[0.06] rounded-xl">
                  <div className="w-9 h-9 bg-white/[0.03] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                  <p className="text-xs text-white/20">{spotsLeft} more player{spotsLeft !== 1 ? "s" : ""} needed</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "chat" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 bg-white/[0.03] rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
                <p className="text-sm text-white/30 font-medium">Game Chat</p>
                <p className="text-xs text-white/15 mt-1">Join the game to start chatting</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="px-5 py-4 bg-[#0a0a0a] border-t border-white/[0.06] shrink-0">
          {joined ? (
            <div className="flex items-center justify-center gap-2 py-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-primary">You&apos;re in! See you there.</span>
            </div>
          ) : (
            <button
              onClick={handleJoin}
              disabled={joining || spotsLeft === 0}
              className="w-full h-[50px] bg-primary hover:brightness-110 text-black font-semibold text-[15px] rounded-xl transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {joining ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  Join Game · ₹{game.price}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
