"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const features = [
  {
    emoji: "🔍",
    title: "Sports Discovery",
    desc: "See what's happening near you — live games, open courts, available players. No more searching.",
    color: "#00E676",
  },
  {
    emoji: "🏟️",
    title: "Local Directory",
    desc: "Every turf, court, gym, and academy in your city — digitized, rated, and bookable in seconds.",
    color: "#00BCD4",
  },
  {
    emoji: "⚡",
    title: "Live Availability",
    desc: "Real-time slots and open games. See what's available right now, not tomorrow.",
    color: "#FFD600",
  },
  {
    emoji: "👥",
    title: "Find Players",
    desc: "Smart matching by sport, skill, location, and schedule. Never struggle to fill a team again.",
    color: "#E040FB",
  },
  {
    emoji: "🎮",
    title: "Create & Join Games",
    desc: "Turn scattered WhatsApp coordination into structured games with one tap. Invites, payments, roster — handled.",
    color: "#FF9800",
  },
  {
    emoji: "📱",
    title: "Instant Booking",
    desc: "Book turfs, join games, reserve gym slots — pay online, show up, and play.",
    color: "#FF5722",
  },
];

const steps = [
  { num: "01", title: "Open Spoaxio", desc: "Tell us your sport, skill level, and location" },
  { num: "02", title: "Discover", desc: "See live games, nearby venues, and available players" },
  { num: "03", title: "Play", desc: "Join a game, book a turf, or create your own match" },
];

const stats = [
  { value: "500+", label: "Active Players" },
  { value: "120+", label: "Venues Listed" },
  { value: "50+", label: "Games / Week" },
  { value: "8", label: "Sports" },
];

const sports = [
  { emoji: "⚽", name: "Football" },
  { emoji: "🏏", name: "Cricket" },
  { emoji: "🏸", name: "Badminton" },
  { emoji: "🎾", name: "Tennis" },
  { emoji: "🏀", name: "Basketball" },
  { emoji: "🏐", name: "Volleyball" },
  { emoji: "🏊", name: "Swimming" },
  { emoji: "💪", name: "Gym" },
];

const testimonials = [
  {
    name: "Vikram R.",
    role: "Football Player, OMR",
    text: "I used to waste 30 minutes on WhatsApp just to find enough players. Now I open Spoaxio and join a game in 10 seconds.",
    avatar: "V",
  },
  {
    name: "Priya M.",
    role: "Badminton, T. Nagar",
    text: "Found a doubles partner in my area within a day. We play three times a week now. Game changer.",
    avatar: "P",
  },
  {
    name: "Arjun K.",
    role: "Cricket Captain, Adyar",
    text: "Organizing box cricket used to take hours. Spoaxio lets me create a game, set the price, and players just show up.",
    avatar: "A",
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float1 { 0%, 100% { transform: translate(0,0) scale(1) } 50% { transform: translate(30px,-20px) scale(1.05) } }
        @keyframes float2 { 0%, 100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-25px,15px) scale(1.08) } }
        @keyframes float3 { 0%, 100% { transform: translate(0,0) } 50% { transform: translate(15px,25px) } }
        @keyframes gradient-shift { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.4 } 50% { opacity: 0.8 } }
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        .float-1 { animation: float1 8s ease-in-out infinite }
        .float-2 { animation: float2 10s ease-in-out infinite }
        .float-3 { animation: float3 12s ease-in-out infinite }
        .gradient-text { background: linear-gradient(135deg, #00E676, #00BCD4, #00E676); background-size: 200% auto; animation: gradient-shift 4s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite }
        .marquee { animation: marquee 20s linear infinite }
      `}</style>

      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
        {/* ============ NAVBAR ============ */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-200" : ""}`}>
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="/spoaxio-logo.png" alt="Spoaxio" className="w-8 h-8 object-contain" />
              <span className="text-sm font-bold tracking-[0.2em]">SPOAXIO</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
              <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it Works</a>
              <a href="#sports" className="hover:text-gray-900 transition-colors">Sports</a>
              <a href="#testimonials" className="hover:text-gray-900 transition-colors">Stories</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/home" className="hidden sm:block text-sm text-gray-400 hover:text-gray-900 transition-colors">Sign In</Link>
              <Link href="/home" className="px-5 py-2 bg-primary text-black text-sm font-semibold rounded-full hover:brightness-110 transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* ============ HERO ============ */}
        <motion.section ref={heroRef} style={{ opacity: heroOpacity, scale: heroScale }} className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="float-1 absolute top-[10%] right-[15%] w-72 h-72 rounded-full bg-primary/[0.06] blur-[100px]" />
            <div className="float-2 absolute bottom-[20%] left-[10%] w-64 h-64 rounded-full bg-cyan-400/[0.04] blur-[80px]" />
            <div className="float-3 absolute top-[40%] left-[50%] w-48 h-48 rounded-full bg-primary/[0.03] blur-[60px]" />
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #00E676 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/[0.08] border border-primary/15 rounded-full mb-6">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full pulse-glow" />
                  <span className="text-xs text-primary/80 font-medium">Now live in Tamil Nadu</span>
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
                Find where to play.
                <br />
                <span className="gradient-text">Who to play with.</span>
                <br />
                What to play next.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
                The local sports network that connects players, venues, and games in your city. Stop searching. Start playing.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/home" className="w-full sm:w-auto px-8 py-3.5 bg-primary text-black font-semibold rounded-xl hover:brightness-110 transition-all text-[15px] flex items-center justify-center gap-2">
                  Start Playing — It&apos;s Free
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link href="/explore" className="w-full sm:w-auto px-8 py-3.5 bg-gray-50 border border-gray-200 text-gray-500 font-medium rounded-xl hover:bg-gray-100 transition-all text-[15px]">
                  Explore Games
                </Link>
              </motion.div>
            </div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="text-center py-4">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ============ SPORTS MARQUEE ============ */}
        <div id="sports" className="py-8 border-y border-gray-100 overflow-hidden">
          <div className="marquee flex items-center gap-12 whitespace-nowrap">
            {[...sports, ...sports].map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-500">
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-sm font-medium tracking-wider uppercase">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ============ FEATURES ============ */}
        <section id="features" className="py-20 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Section>
              <div className="text-center mb-16">
                <p className="text-xs text-primary/60 uppercase tracking-[0.2em] font-medium mb-3">Everything you need</p>
                <h2 className="text-3xl md:text-4xl font-bold">Six features. One mission.</h2>
                <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">Get you from &quot;I want to play&quot; to actually playing — in under 60 seconds.</p>
              </div>
            </Section>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <Section key={f.title} delay={i * 0.08}>
                  <div className="group p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: `${f.color}0A` }}>
                      {f.emoji}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-primary/90 transition-colors">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how-it-works" className="py-20 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <Section>
              <div className="text-center mb-16">
                <p className="text-xs text-primary/60 uppercase tracking-[0.2em] font-medium mb-3">Simple as 1-2-3</p>
                <h2 className="text-3xl md:text-4xl font-bold">How Spoaxio works</h2>
              </div>
            </Section>

            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((s, i) => (
                <Section key={s.num} delay={i * 0.12}>
                  <div className="text-center relative">
                    <div className="w-16 h-16 mx-auto mb-5 bg-primary/[0.06] border border-primary/10 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{s.num}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                    {i < 2 && (
                      <div className="hidden md:block absolute top-8 -right-3 w-6">
                        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* ============ APP PREVIEW / CTA BLOCK ============ */}
        <section className="py-20 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Section>
              <div className="relative bg-gradient-to-br from-primary/[0.06] to-cyan-500/[0.04] border border-primary/10 rounded-3xl p-8 md:p-14 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                <div className="relative z-10 max-w-lg">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    Your city is full of<br />players like you.
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    Every evening, hundreds of games happen across your city. People looking for one more player, an open court going unused, a team that needs a substitute. Spoaxio connects it all.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/home" className="px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:brightness-110 transition-all text-sm">
                      Join the Network
                    </Link>
                    <Link href="/games" className="px-6 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-200 transition-all">
                      Browse Games
                    </Link>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section id="testimonials" className="py-20 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Section>
              <div className="text-center mb-16">
                <p className="text-xs text-primary/60 uppercase tracking-[0.2em] font-medium mb-3">Player stories</p>
                <h2 className="text-3xl md:text-4xl font-bold">Why players love Spoaxio</h2>
              </div>
            </Section>

            <div className="grid md:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <Section key={t.name} delay={i * 0.1}>
                  <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed flex-1">&quot;{t.text}&quot;</p>
                    <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-200">
                      <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{t.avatar}</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{t.name}</p>
                        <p className="text-[10px] text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="py-20 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Section>
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to play?</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8 text-sm">
                  Join Spoaxio today. Find your game, build your crew, and never miss a match again.
                </p>
                <Link href="/home" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-semibold rounded-xl hover:brightness-110 transition-all text-base">
                  Get Started — Free Forever
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </Section>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="border-t border-gray-200 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src="/spoaxio-logo.png" alt="Spoaxio" className="w-7 h-7 object-contain" />
                  <span className="text-xs font-bold tracking-[0.15em]">SPOAXIO</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">The local sports network for players who want to play more.</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-3">Product</p>
                <div className="space-y-2">
                  <Link href="/games" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">Games</Link>
                  <Link href="/turfs" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">Turfs</Link>
                  <Link href="/players" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">Players</Link>
                  <Link href="/gyms" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">Gyms</Link>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-3">Company</p>
                <div className="space-y-2">
                  <a href="#" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">About</a>
                  <a href="#" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">Blog</a>
                  <a href="#" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">Careers</a>
                  <a href="#" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">Contact</a>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-3">Legal</p>
                <div className="space-y-2">
                  <a href="#" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">Privacy Policy</a>
                  <a href="#" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">Terms of Service</a>
                  <a href="#" className="block text-xs text-gray-500 hover:text-gray-500 transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-gray-500">&copy; 2026 Spoaxio. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
