"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const userProfile = {
  name: "Daniel Joseph",
  avatar: "D",
  email: "daniel@spoaxio.com",
  phone: "+91 98765 43210",
  area: "Velachery, Chennai",
  memberSince: "Sep 2026",
  sports: [
    { name: "Football", emoji: "⚽", skill: "Intermediate", games: 24 },
    { name: "Badminton", emoji: "🏸", skill: "Beginner", games: 8 },
    { name: "Cricket", emoji: "🏏", skill: "Intermediate", games: 12 },
  ],
  stats: { totalGames: 44, gamesThisMonth: 7, winRate: 64, rating: 4.5 },
  badges: [
    { name: "Early Adopter", icon: "🌟", color: "#FFD700" },
    { name: "Team Player", icon: "🤝", color: "#00E676" },
  ],
  upcomingGames: [
    { title: "5v5 Evening Match", sport: "⚽", time: "Today, 7:00 PM", venue: "Pro Kick Turf" },
    { title: "Doubles Game", sport: "🏸", time: "Tomorrow, 8:00 PM", venue: "Smash Point" },
  ],
};

const menuItems = [
  { icon: "🏟️", label: "My Bookings", desc: "Turf & gym reservations", href: "/turfs" },
  { icon: "📊", label: "Game History", desc: "All your past games", href: "#" },
  { icon: "🏅", label: "Achievements", desc: "Badges and milestones", href: "#" },
  { icon: "👥", label: "My Network", desc: "Players you've played with", href: "/players" },
  { icon: "⚙️", label: "Settings", desc: "Account & preferences", href: "#" },
  { icon: "💬", label: "Help & Support", desc: "FAQs, contact us", href: "#" },
];

const skillColors: Record<string, string> = {
  Beginner: "#00BCD4", Intermediate: "#00E676", Advanced: "#FF9800",
};

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

export default function ProfilePage() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const p = userProfile;

  return (
    <div className="fixed inset-0 bg-[#060606] flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 shrink-0">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-bold text-white">Profile</h1>
          <button onClick={() => router.push("/notifications")} className="relative w-9 h-9 bg-white/[0.06] rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-[#060606]" />
          </button>
        </div>

        {/* Profile card */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{p.avatar}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{p.name}</h2>
            <p className="text-xs text-white/25">{p.area}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-bold text-yellow-400">{p.stats.rating}</span>
              </div>
              <span className="text-[10px] text-white/15">Since {p.memberSince}</span>
            </div>
          </div>
          <button className="w-9 h-9 bg-white/[0.06] rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
            </svg>
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Games", value: p.stats.totalGames },
            { label: "This Month", value: p.stats.gamesThisMonth },
            { label: "Win Rate", value: `${p.stats.winRate}%` },
            { label: "Sports", value: p.sports.length },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.03] rounded-xl p-2.5 text-center">
              <p className="text-sm font-bold text-white">{s.value}</p>
              <p className="text-[8px] text-white/20 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 overflow-y-auto min-h-0 px-5 pb-6">
        {/* Upcoming games */}
        {p.upcomingGames.length > 0 && (
          <motion.div variants={fadeUp} className="mb-4">
            <h3 className="text-sm font-semibold text-white mb-2">Upcoming Games</h3>
            <div className="space-y-2">
              {p.upcomingGames.map((g, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-primary/[0.04] border border-primary/10 rounded-xl">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-lg">{g.sport}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white">{g.title}</p>
                    <p className="text-[10px] text-white/25">{g.time} · {g.venue}</p>
                  </div>
                  <svg className="w-4 h-4 text-white/15 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* My Sports */}
        <motion.div variants={fadeUp} className="mb-4">
          <h3 className="text-sm font-semibold text-white mb-2">My Sports</h3>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {p.sports.map((s) => (
              <div key={s.name} className="flex-shrink-0 w-[120px] p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{s.emoji}</span>
                  <span className="text-[11px] font-medium text-white">{s.name}</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-medium" style={{ backgroundColor: `${skillColors[s.skill]}12`, color: skillColors[s.skill] }}>
                  {s.skill}
                </span>
                <p className="text-[9px] text-white/15 mt-1.5">{s.games} games</p>
              </div>
            ))}
            <div className="flex-shrink-0 w-[120px] p-3 bg-white/[0.02] border border-dashed border-white/[0.06] rounded-xl flex items-center justify-center">
              <div className="text-center">
                <svg className="w-5 h-5 text-white/10 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-[9px] text-white/15">Add Sport</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badges */}
        {p.badges.length > 0 && (
          <motion.div variants={fadeUp} className="mb-4">
            <h3 className="text-sm font-semibold text-white mb-2">Badges</h3>
            <div className="flex gap-2">
              {p.badges.map((b) => (
                <div key={b.name} className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2">
                  <span className="text-sm">{b.icon}</span>
                  <span className="text-[10px] font-medium" style={{ color: b.color }}>{b.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Menu */}
        <motion.div variants={fadeUp} className="space-y-1 mb-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-all"
            >
              <span className="text-base">{item.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-white/60">{item.label}</p>
                <p className="text-[10px] text-white/20">{item.desc}</p>
              </div>
              <svg className="w-4 h-4 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.div variants={fadeUp}>
          <button
            onClick={() => setShowLogout(true)}
            className="w-full py-3 text-xs font-medium text-red-400/50 hover:text-red-400 transition-all"
          >
            Sign Out
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom nav */}
      <div className="px-4 py-2 bg-[#0a0a0a] border-t border-white/[0.06] shrink-0">
        <div className="flex items-center justify-around">
          {[
            { label: "Home", href: "/home", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>, active: false },
            { label: "Games", href: "/games", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>, active: false },
            { label: "Players", href: "/players", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>, active: false },
            { label: "Profile", href: "/profile", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, active: true },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="flex flex-col items-center gap-0.5 py-1">
              <div className={item.active ? "text-primary" : "text-white/25"}>{item.icon}</div>
              <span className={`text-[9px] font-medium ${item.active ? "text-primary" : "text-white/25"}`}>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Logout modal */}
      {showLogout && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center p-5">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full bg-[#121212] border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-1">Sign out?</h3>
            <p className="text-xs text-white/30 mb-4">You&apos;ll need to sign in again to access your account.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowLogout(false)} className="flex-1 py-3 bg-white/[0.06] rounded-xl text-xs font-medium text-white/40">Cancel</button>
              <button onClick={() => router.push("/login")} className="flex-1 py-3 bg-red-500/15 rounded-xl text-xs font-medium text-red-400">Sign Out</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
