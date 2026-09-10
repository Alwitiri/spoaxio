"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const sports = [
  { name: "Badminton", icon: "🏸", bg: "from-teal-600 to-teal-800" },
  { name: "Football", icon: "⚽", bg: "from-green-700 to-green-900" },
  { name: "Cricket", icon: "🏏", bg: "from-amber-700 to-amber-900" },
  { name: "Tennis", icon: "🎾", bg: "from-purple-700 to-purple-900" },
  { name: "Basketball", icon: "🏀", bg: "from-orange-700 to-orange-900" },
  { name: "Swimming", icon: "🏊", bg: "from-blue-600 to-blue-800" },
  { name: "Volleyball", icon: "🏐", bg: "from-red-600 to-red-800" },
  { name: "Gym", icon: "💪", bg: "from-gray-700 to-gray-900" },
];

const stats = [
  { value: "500+", label: "Active Players", icon: "👥" },
  { value: "120+", label: "Venues Listed", icon: "🏟️" },
  { value: "50+", label: "Games / Week", icon: "🎮" },
  { value: "8", label: "Sports", icon: "⚽" },
];

const features = [
  {
    icon: "📍",
    title: "Book Venues",
    desc: "Find and book turfs, courts, gyms, and academies near you. Real-time availability, instant confirmation.",
  },
  {
    icon: "🎯",
    title: "Join Games",
    desc: "See live games happening near you. Join with one tap — no more WhatsApp groups.",
  },
  {
    icon: "👥",
    title: "Find Players",
    desc: "Match with players by sport, skill level, and location. Build your crew.",
  },
  {
    icon: "🏆",
    title: "Events & Tournaments",
    desc: "Discover local tournaments, leagues, and coaching sessions. Compete and grow.",
  },
  {
    icon: "⭐",
    title: "Ratings & Reviews",
    desc: "Read honest reviews from real players. Rate venues and players after every game.",
  },
  {
    icon: "📱",
    title: "Instant Booking",
    desc: "Pay online, get confirmation. Show up and play — no calls, no waiting.",
  },
];

const howItWorks = [
  { step: "1", title: "Choose Your Sport", desc: "Pick from 8+ sports available in your city", icon: "🏸" },
  { step: "2", title: "Discover & Book", desc: "Browse venues, games, and players near you", icon: "🔍" },
  { step: "3", title: "Play & Connect", desc: "Show up, play, rate — build your sports network", icon: "⚡" },
];

const testimonials = [
  {
    name: "Vikram R.",
    role: "Football Player, OMR",
    text: "I used to waste 30 minutes on WhatsApp just to find enough players. Now I open Spoaxio and join a game in 10 seconds.",
    initial: "V",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Badminton, T. Nagar",
    text: "Found a doubles partner in my area within a day. We play three times a week now. Game changer.",
    initial: "P",
    rating: 5,
  },
  {
    name: "Arjun K.",
    role: "Cricket Captain, Adyar",
    text: "Organizing box cricket used to take hours. Spoaxio lets me create a game, set the price, and players just show up.",
    initial: "A",
    rating: 5,
  },
];

const cities = ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Pune", "Coimbatore", "Madurai"];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/spoaxio-logo.png" alt="Spoaxio" className="w-8 h-8 object-contain" />
            <span className={`text-lg font-bold tracking-wider ${scrolled ? "text-primary" : "text-white"}`}>SPOAXIO</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#sports" className={`text-sm font-medium ${scrolled ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white"} transition-colors`}>Sports</a>
            <a href="#features" className={`text-sm font-medium ${scrolled ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white"} transition-colors`}>Features</a>
            <a href="#how-it-works" className={`text-sm font-medium ${scrolled ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white"} transition-colors`}>How it Works</a>
            <a href="#testimonials" className={`text-sm font-medium ${scrolled ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white"} transition-colors`}>Reviews</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/home" className={`hidden sm:block text-sm font-medium ${scrolled ? "text-gray-600" : "text-white/80"} hover:text-primary transition-colors`}>Login</Link>
            <Link href="/home" className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:brightness-110 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 pt-14">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-5">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span className="text-xs text-white/90 font-medium">Now live in Tamil Nadu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-4">
              The Easiest Way to<br />
              <span className="text-green-300">Find & Book Sports</span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
              Book venues, join games, find players — all in one platform. Your local sports network starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/home" className="px-6 py-3.5 bg-white text-green-800 font-bold rounded-lg text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                Start Playing — It&apos;s Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/explore" className="px-6 py-3.5 bg-white/10 border border-white/20 text-white font-medium rounded-lg text-sm hover:bg-white/20 transition-all text-center">
                Explore Venues
              </Link>
            </div>
          </div>
          <div className="absolute right-6 bottom-8 hidden lg:block text-8xl opacity-20">
            ⚽🏸🏏🎾
          </div>
        </div>

        {/* Search bar overlay */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 -mb-7">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm text-gray-400">Search for venues, sports, players...</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 sm:w-44">
              <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Chennai</span>
            </div>
            <Link href="/explore" className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg text-sm hover:brightness-110 transition-all text-center">
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-2xl mb-1 block">{s.icon}</span>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPORTS ===== */}
      <section id="sports" className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Explore Sports</h2>
            <Link href="/home" className="flex items-center gap-1 text-sm font-semibold text-primary">
              SEE ALL
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {sports.map((s) => (
              <Link key={s.name} href="/home" className="group">
                <div className={`relative h-20 md:h-24 rounded-xl overflow-hidden bg-gradient-to-br ${s.bg} group-hover:scale-105 transition-transform`}>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl opacity-40 group-hover:opacity-60 transition-opacity">
                    {s.icon}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-[10px] md:text-xs font-semibold text-center">{s.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-2">EVERYTHING YOU NEED</p>
            <h2 className="text-2xl md:text-3xl font-bold">One App. All Sports.</h2>
            <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm">From discovering venues to finding teammates — Spoaxio handles it all.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition-all">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-xl mb-3">
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-2">SIMPLE AS 1-2-3</p>
            <h2 className="text-2xl md:text-3xl font-bold">How Spoaxio Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((s, i) => (
              <div key={s.step} className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-primary/20">
                  {s.icon}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full mb-3">
                  <span className="text-xs font-bold text-primary">Step {s.step}</span>
                </div>
                <h3 className="text-base font-bold mb-1.5">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-3">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E\")" }} />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block text-7xl opacity-20">
              🏆⚡🎯
            </div>
            <div className="relative z-10 max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                Your city is full of<br />players like you.
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Every evening, hundreds of games happen across your city. People looking for one more player, an open court going unused. Spoaxio connects it all.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/home" className="px-6 py-3 bg-white text-green-800 font-bold rounded-lg text-sm hover:bg-gray-100 transition-all">
                  Join the Network
                </Link>
                <Link href="/games" className="px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-lg text-sm hover:bg-white/20 transition-all">
                  Browse Games
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs text-primary uppercase tracking-[0.2em] font-semibold mb-2">PLAYER REVIEWS</p>
            <h2 className="text-2xl md:text-3xl font-bold">Why Players Love Spoaxio</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{t.initial}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{t.name}</p>
                    <p className="text-[10px] text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CITIES ===== */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Available in</h2>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <span key={c} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${c === "Chennai" ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary/30"}`}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Ready to Play?</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
            Join Spoaxio today. Find your game, build your crew, and never miss a match.
          </p>
          <Link href="/home" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all text-base shadow-lg shadow-primary/20">
            Get Started — Free Forever
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src="/spoaxio-logo.png" alt="Spoaxio" className="w-7 h-7 object-contain" />
                <span className="text-sm font-bold tracking-wider text-primary">SPOAXIO</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">The local sports network for players who want to play more.</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Product</p>
              <div className="space-y-2">
                <Link href="/games" className="block text-sm text-gray-300 hover:text-primary transition-colors">Games</Link>
                <Link href="/turfs" className="block text-sm text-gray-300 hover:text-primary transition-colors">Venues</Link>
                <Link href="/players" className="block text-sm text-gray-300 hover:text-primary transition-colors">Players</Link>
                <Link href="/gyms" className="block text-sm text-gray-300 hover:text-primary transition-colors">Gyms</Link>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Company</p>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-300 hover:text-primary transition-colors">About</a>
                <a href="#" className="block text-sm text-gray-300 hover:text-primary transition-colors">Blog</a>
                <a href="#" className="block text-sm text-gray-300 hover:text-primary transition-colors">Careers</a>
                <a href="#" className="block text-sm text-gray-300 hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Legal</p>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-300 hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="block text-sm text-gray-300 hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">&copy; 2026 Spoaxio. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
