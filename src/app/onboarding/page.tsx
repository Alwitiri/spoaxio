"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "Discover",
    subtitle: "What's happening near you",
    description: "See live games, open slots, and players near you. No more searching — just pick and play.",
    color: "#00E676",
    bg: "from-emerald-500/10 via-transparent to-transparent",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: "Play",
    subtitle: "Join or create a game",
    description: "Find players, create a match, pick a venue — all in one flow. No more WhatsApp coordination.",
    color: "#00BCD4",
    bg: "from-cyan-500/10 via-transparent to-transparent",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Connect",
    subtitle: "Your local sports network",
    description: "Find players by skill level, build your crew, and never struggle to fill a team again.",
    color: "#FF9800",
    bg: "from-orange-500/10 via-transparent to-transparent",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0m5.54 0L12 17.25l-2.52-7.522" />
      </svg>
    ),
    title: "Compete",
    subtitle: "Build your sports identity",
    description: "Track your games, earn your rating, discover local tournaments, and grow as a player.",
    color: "#F44336",
    bg: "from-red-500/10 via-transparent to-transparent",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1);
    else router.push("/login");
  }, [current, goTo, router]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <>
      <style jsx>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(2); opacity: 0; }
        }
        .slide-right { animation: slide-in-right 0.4s ease-out both; }
        .slide-left { animation: slide-in-left 0.4s ease-out both; }
        .float { animation: float 4s ease-in-out infinite; }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
      `}</style>

      <div
        className="fixed inset-0 bg-[#060606] flex flex-col overflow-hidden"
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const diff = touchStart - e.changedTouches[0].clientX;
          if (diff > 50) next();
          else if (diff < -50) prev();
          setTouchStart(null);
        }}
      >
        {/* Background glow — changes color per slide */}
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[120px] transition-colors duration-700"
          style={{ backgroundColor: slide.color, opacity: 0.06 }}
        />
        <div
          className="absolute bottom-[10%] right-[10%] w-48 h-48 rounded-full blur-[80px] transition-colors duration-700"
          style={{ backgroundColor: slide.color, opacity: 0.04 }}
        />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, ${slide.color} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <img src="/spoaxio-logo.png" alt="Spoaxio" className="w-8 h-8 object-contain" />
            <span className="text-sm font-bold tracking-widest text-white">SPOAXIO</span>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 min-h-0">
          <div
            key={current}
            className={direction > 0 ? "slide-right" : "slide-left"}
          >
            {/* Icon with rings */}
            <div className="relative flex items-center justify-center mb-10">
              <div className="relative float">
                <div
                  className="w-28 h-28 rounded-3xl flex items-center justify-center"
                  style={{ backgroundColor: `${slide.color}15`, border: `1px solid ${slide.color}20` }}
                >
                  <div style={{ color: slide.color }}>{slide.icon}</div>
                </div>
                <div
                  className="pulse-ring absolute inset-0 rounded-3xl"
                  style={{ border: `1px solid ${slide.color}15` }}
                />
              </div>
            </div>

            {/* Text */}
            <div className="text-center max-w-sm mx-auto">
              <h2 className="text-4xl font-bold text-white mb-2">{slide.title}</h2>
              <p className="text-lg font-medium mb-4" style={{ color: slide.color }}>
                {slide.subtitle}
              </p>
              <p className="text-white/40 text-[15px] leading-relaxed">
                {slide.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="relative z-10 px-8 pb-8 pt-4 shrink-0">
          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 28 : 8,
                  backgroundColor: i === current ? slide.color : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {current > 0 && (
              <button
                onClick={prev}
                className="h-[52px] px-6 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white/60 text-[15px] font-medium hover:bg-white/[0.1] transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={next}
              className="flex-1 h-[52px] rounded-xl text-[15px] font-semibold transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: slide.color,
                color: "#000",
              }}
            >
              {current === slides.length - 1 ? "Get Started" : "Next"}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
