"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";

const playersData: Record<string, {
  name: string; avatar: string; age: number; area: string; distance: string;
  sports: { name: string; emoji: string; skill: string; games: number }[];
  rating: number; totalGames: number; gamesThisMonth: number; winRate: number;
  bio: string; availability: string; memberSince: string;
  badges: { name: string; icon: string; color: string }[];
  recentGames: { title: string; sport: string; date: string; result: string }[];
  mutualPlayers: { name: string; avatar: string }[];
}> = {
  p1: {
    name: "Rahul Sharma", avatar: "R", age: 25, area: "Velachery, Chennai", distance: "1.2 km",
    sports: [
      { name: "Football", emoji: "⚽", skill: "Advanced", games: 38 },
      { name: "Cricket", emoji: "🏏", skill: "Intermediate", games: 10 },
    ],
    rating: 4.8, totalGames: 48, gamesThisMonth: 6, winRate: 72,
    bio: "Regular 5-a-side player. Looking for competitive matches. Can play striker or midfield. Organize games on weekends.",
    availability: "Evenings & Weekends", memberSince: "Mar 2026",
    badges: [
      { name: "Top Scorer", icon: "⚡", color: "#FFD700" },
      { name: "Team Leader", icon: "👑", color: "#FF9800" },
      { name: "50+ Games", icon: "🎯", color: "#00E676" },
    ],
    recentGames: [
      { title: "5v5 Evening Match", sport: "⚽", date: "Today", result: "Won 4-2" },
      { title: "Weekend League", sport: "⚽", date: "Sun, 7 Sep", result: "Draw 3-3" },
      { title: "Box Cricket", sport: "🏏", date: "Sat, 6 Sep", result: "Won" },
      { title: "7v7 Night Game", sport: "⚽", date: "Fri, 5 Sep", result: "Lost 1-3" },
    ],
    mutualPlayers: [
      { name: "Vikram R.", avatar: "V" },
      { name: "Karthik V.", avatar: "K" },
      { name: "Arun M.", avatar: "A" },
    ],
  },
  p3: {
    name: "Arjun Kumar", avatar: "A", age: 28, area: "Adyar, Chennai", distance: "2.5 km",
    sports: [
      { name: "Cricket", emoji: "🏏", skill: "Advanced", games: 52 },
      { name: "Football", emoji: "⚽", skill: "Intermediate", games: 13 },
    ],
    rating: 4.9, totalGames: 65, gamesThisMonth: 8, winRate: 78,
    bio: "Opening batsman and team captain. Love organizing box cricket tournaments on weekends. Also play football for fitness.",
    availability: "Early Morning & Weekends", memberSince: "Jan 2026",
    badges: [
      { name: "Captain", icon: "👑", color: "#FF9800" },
      { name: "MVP", icon: "🏆", color: "#FFD700" },
      { name: "50+ Games", icon: "🎯", color: "#00E676" },
    ],
    recentGames: [
      { title: "Box Cricket Tournament", sport: "🏏", date: "Sat, 6 Sep", result: "Won Finals" },
      { title: "Net Practice", sport: "🏏", date: "Thu, 4 Sep", result: "Practice" },
      { title: "5v5 Football", sport: "⚽", date: "Wed, 3 Sep", result: "Won 3-1" },
      { title: "League Match", sport: "🏏", date: "Sun, 31 Aug", result: "Won by 5 wkts" },
    ],
    mutualPlayers: [
      { name: "Rahul S.", avatar: "R" },
      { name: "Deepak N.", avatar: "D" },
    ],
  },
};

const fallback = playersData["p1"];

const skillColors: Record<string, string> = {
  Beginner: "#00BCD4", Intermediate: "#00E676", Advanced: "#FF9800",
};

export default function PlayerProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const player = playersData[id] || fallback;
  const [activeTab, setActiveTab] = useState<"stats" | "games" | "sports">("stats");

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 shrink-0">
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => router.back()} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>

        {/* Profile hero */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{player.avatar}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{player.name}</h1>
            <p className="text-xs text-gray-500">{player.area} · {player.distance}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-bold text-yellow-400">{player.rating}</span>
              </div>
              <span className="text-[10px] text-gray-500">Member since {player.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-3">
          <button className="flex-1 py-2.5 bg-primary hover:brightness-110 rounded-xl text-xs font-semibold text-black transition-all">
            Invite to Game
          </button>
          <button className="flex-1 py-2.5 bg-gray-100 rounded-xl text-xs font-medium text-gray-400 transition-all hover:bg-gray-100">
            Message
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Games", value: player.totalGames },
            { label: "This Month", value: player.gamesThisMonth },
            { label: "Win Rate", value: `${player.winRate}%` },
            { label: "Sports", value: player.sports.length },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
              <p className="text-sm font-bold text-gray-900">{s.value}</p>
              <p className="text-[8px] text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 pb-1 shrink-0">
        <div className="flex gap-1 bg-gray-50 rounded-xl p-1">
          {(["stats", "games", "sports"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab ? "bg-gray-100 text-gray-900" : "text-gray-500"
              }`}
            >
              {tab === "stats" ? "Overview" : tab === "games" ? "Recent Games" : "Sports"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0 px-5 py-3">
        {activeTab === "stats" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Bio */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">About</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{player.bio}</p>
            </div>

            {/* Availability */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">Available</p>
                  <p className="text-[10px] text-gray-500">{player.availability}</p>
                </div>
              </div>
            </div>

            {/* Badges */}
            {player.badges.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Achievements</h3>
                <div className="flex gap-2">
                  {player.badges.map((b) => (
                    <div key={b.name} className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-center">
                      <span className="text-lg block mb-1">{b.icon}</span>
                      <p className="text-[9px] font-medium" style={{ color: b.color }}>{b.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mutual players */}
            {player.mutualPlayers.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Players you both know</h3>
                <div className="flex gap-2">
                  {player.mutualPlayers.map((m) => (
                    <div key={m.name} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-[8px] font-bold text-primary">{m.avatar}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "games" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            {player.recentGames.map((g, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-lg">
                  {g.sport}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">{g.title}</p>
                  <p className="text-[10px] text-gray-500">{g.date}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                  g.result.includes("Won") ? "text-primary bg-primary/10" :
                  g.result.includes("Lost") ? "text-red-400 bg-red-400/10" :
                  g.result.includes("Practice") ? "text-blue-400 bg-blue-400/10" :
                  "text-yellow-400 bg-yellow-400/10"
                }`}>
                  {g.result}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "sports" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {player.sports.map((s) => (
              <div key={s.name} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center text-xl">
                    {s.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{s.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-medium" style={{ backgroundColor: `${skillColors[s.skill]}12`, color: skillColors[s.skill] }}>
                        {s.skill}
                      </span>
                      <span className="text-[10px] text-gray-500">{s.games} games played</span>
                    </div>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (s.games / 60) * 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: skillColors[s.skill] }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
