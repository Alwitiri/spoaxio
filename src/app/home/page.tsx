"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const venues = [
  {
    id: "v1",
    name: "Pro Kick Football Turf",
    location: "Velachery",
    distance: "2.1 km",
    rating: 4.5,
    reviews: 28,
    sports: ["Football"],
    sportIcons: ["⚽"],
    price: 800,
    bookable: true,
    image: "linear-gradient(135deg, #1a5c2e 0%, #2d8a4e 50%, #1a5c2e 100%)",
  },
  {
    id: "v2",
    name: "Smash Point Badminton",
    location: "T. Nagar",
    distance: "1.4 km",
    rating: 4.2,
    reviews: 16,
    sports: ["Badminton"],
    sportIcons: ["🏸"],
    price: 600,
    bookable: true,
    image: "linear-gradient(135deg, #1a3c5c 0%, #2d5a8a 50%, #1a3c5c 100%)",
  },
  {
    id: "v3",
    name: "Green Arena Sports Complex",
    location: "Adyar",
    distance: "3.8 km",
    rating: 4.8,
    reviews: 42,
    sports: ["Cricket", "Football"],
    sportIcons: ["🏏", "⚽"],
    price: 1200,
    bookable: true,
    image: "linear-gradient(135deg, #3c2e1a 0%, #6b5a3d 50%, #3c2e1a 100%)",
  },
  {
    id: "v4",
    name: "Ace Tennis Academy",
    location: "Anna Nagar",
    distance: "4.2 km",
    rating: 4.6,
    reviews: 12,
    sports: ["Tennis"],
    sportIcons: ["🎾"],
    price: 500,
    bookable: false,
    image: "linear-gradient(135deg, #2e1a3c 0%, #5a3d6b 50%, #2e1a3c 100%)",
  },
];

const liveGames = [
  {
    id: "g1",
    type: "5v5",
    category: "Regular",
    title: "Evening Football",
    host: "Rahul S.",
    hostInitial: "R",
    going: 8,
    total: 10,
    date: "Today, 7:00 PM",
    venue: "Pro Kick Turf",
    sport: "Football",
    sportIcon: "⚽",
    urgency: null,
  },
  {
    id: "g2",
    type: "Doubles",
    category: "Regular",
    title: "Badminton Doubles",
    host: "Priya M.",
    hostInitial: "P",
    going: 3,
    total: 4,
    date: "Today, 8:00 PM",
    venue: "Smash Point",
    sport: "Badminton",
    sportIcon: "🏸",
    urgency: "Only 1 Slot",
  },
  {
    id: "g3",
    type: "Box Cricket",
    category: "Tournament",
    title: "Weekend Cricket",
    host: "Arjun K.",
    hostInitial: "A",
    going: 11,
    total: 14,
    date: "Sat, 6:00 AM",
    venue: "Green Arena",
    sport: "Cricket",
    sportIcon: "🏏",
    urgency: null,
  },
  {
    id: "g4",
    type: "Singles",
    category: "Practice",
    title: "Tennis Practice",
    host: "Deepak N.",
    hostInitial: "D",
    going: 1,
    total: 2,
    date: "Tomorrow, 6:30 AM",
    venue: "Ace Tennis Academy",
    sport: "Tennis",
    sportIcon: "🎾",
    urgency: "Only 1 Slot",
  },
];

const sportCategories = [
  { name: "Badminton", icon: "🏸", color: "#00BCD4", bg: "from-teal-600 to-teal-800" },
  { name: "Football", icon: "⚽", color: "#4CAF50", bg: "from-green-700 to-green-900" },
  { name: "Cricket", icon: "🏏", color: "#FF9800", bg: "from-amber-700 to-amber-900" },
  { name: "Swimming", icon: "🏊", color: "#2196F3", bg: "from-blue-600 to-blue-800" },
  { name: "Tennis", icon: "🎾", color: "#9C27B0", bg: "from-purple-700 to-purple-900" },
  { name: "Basketball", icon: "🏀", color: "#FF5722", bg: "from-orange-700 to-orange-900" },
];

const bottomNav = [
  { id: "home", label: "HOME", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", href: "/home" },
  { id: "play", label: "PLAY", icon: "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.491 48.491 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z", href: "/games" },
  { id: "book", label: "BOOK", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5", href: "/turfs" },
  { id: "players", label: "PLAYERS", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", href: "/players" },
  { id: "profile", label: "PROFILE", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z", href: "/profile" },
];

export default function HomePage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("home");

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* ===== TOP NAVBAR ===== */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/spoaxio-logo.png" alt="Spoaxio" className="w-8 h-8 object-contain" />
            <span className="text-base font-bold tracking-wider text-primary">SPOAXIO</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Chennai</span>
            </button>
            <Link href="/profile" className="flex items-center gap-1.5">
              <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ===== SCROLLABLE CONTENT ===== */}
      <div className="flex-1 overflow-y-auto min-h-0">

        {/* Hero Banner */}
        <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden h-44 bg-gradient-to-r from-green-800 via-green-700 to-emerald-600">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="relative z-10 p-5 flex flex-col justify-center h-full">
            <h2 className="text-white text-xl font-bold leading-tight mb-1">
              Find Your Game.<br />Play Your Way.
            </h2>
            <p className="text-white/70 text-xs mb-3">Book venues, join games, find players near you</p>
            <Link href="/explore" className="self-start px-4 py-2 bg-white text-green-800 text-xs font-bold rounded-lg hover:bg-gray-100 transition-all">
              Explore Now
            </Link>
          </div>
          <div className="absolute right-4 bottom-0 text-6xl opacity-30">
            ⚽🏸🏏
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 mt-4">
          <Link href="/explore" className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm text-gray-400">Search for venues, sports...</span>
          </Link>
        </div>

        {/* Sport Categories */}
        <div className="mt-5 px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {sportCategories.map((s) => (
              <Link key={s.name} href="/games" className="flex-shrink-0 w-[110px]">
                <div className={`relative h-[72px] rounded-xl overflow-hidden bg-gradient-to-br ${s.bg}`}>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-40">
                    {s.icon}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-xs font-semibold">{s.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Book Venues Section */}
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">Book Venues</h2>
            <Link href="/turfs" className="flex items-center gap-1 text-sm font-semibold text-primary">
              SEE ALL
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {venues.map((v) => (
              <Link key={v.id} href={`/turfs/${v.id}`} className="flex-shrink-0 w-[260px] bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all">
                <div className="relative h-36" style={{ background: v.image }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl opacity-30">{v.sportIcons[0]}</span>
                  </div>
                  {v.bookable && (
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-primary text-white text-[10px] font-bold rounded-md">
                      Bookable
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {v.sportIcons.map((icon, i) => (
                      <span key={i} className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-xs">{icon}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">{v.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{v.location} (~{v.distance})</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold text-gray-700">{v.rating}</span>
                      <span className="text-[10px] text-gray-400">({v.reviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Play - Live Games Section */}
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">Play - Join a Game</h2>
            <Link href="/games" className="flex items-center gap-1 text-sm font-semibold text-primary">
              SEE ALL
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {liveGames.map((g) => (
              <Link key={g.id} href={`/games/${g.id}`} className="flex-shrink-0 w-[220px] bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-[11px] text-gray-500 font-medium">{g.type}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-[11px] text-gray-500">{g.category}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{g.hostInitial}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{g.going}/{g.total} Going</span>
                    {g.urgency && (
                      <span className="px-2 py-0.5 bg-red-50 border border-red-200 text-red-600 text-[10px] font-semibold rounded-full">
                        {g.urgency}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-600 font-medium mb-1">{g.host}</p>

                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {g.date}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {g.venue}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Find Players Section */}
        <div className="mt-6 px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">Find Players</h2>
            <Link href="/players" className="flex items-center gap-1 text-sm font-semibold text-primary">
              SEE ALL
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-emerald-50 border border-primary/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">500+ players in Chennai</h3>
                <p className="text-xs text-gray-500">Match by sport, skill & availability</p>
              </div>
            </div>
            <Link href="/players" className="block w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl text-center hover:brightness-110 transition-all">
              Find Players Near You
            </Link>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-2" />
      </div>

      {/* ===== BOTTOM NAV ===== */}
      <nav className="bg-white border-t border-gray-200 shrink-0 pb-safe">
        <div className="flex justify-around py-1.5">
          {bottomNav.map((tab) => {
            const active = activeNav === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setActiveNav(tab.id)}
                className="flex flex-col items-center gap-0.5 px-2 py-1 min-w-[56px]"
              >
                <div className="relative">
                  <svg className={`w-5 h-5 ${active ? "text-primary" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={active ? 2 : 1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                </div>
                <span className={`text-[10px] font-semibold tracking-wide ${active ? "text-primary" : "text-gray-400"}`}>
                  {tab.label}
                </span>
                {active && <div className="w-5 h-[2px] bg-primary rounded-full mt-0.5" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
