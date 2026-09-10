"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const sports = [
  { name: "Cricket", emoji: "🏏" },
  { name: "Football", emoji: "⚽" },
  { name: "Badminton", emoji: "🏸" },
  { name: "Tennis", emoji: "🎾" },
  { name: "Basketball", emoji: "🏀" },
  { name: "Volleyball", emoji: "🏐" },
  { name: "Hockey", emoji: "🏑" },
  { name: "Table Tennis", emoji: "🏓" },
  { name: "Swimming", emoji: "🏊" },
  { name: "Kabaddi", emoji: "🤼" },
  { name: "Running", emoji: "🏃" },
  { name: "Cycling", emoji: "🚴" },
  { name: "Boxing", emoji: "🥊" },
  { name: "Gym", emoji: "🏋️" },
  { name: "Yoga", emoji: "🧘" },
];

export default function SportsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(sport: string) {
    setSelected((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  }

  function handleContinue() {
    if (selected.length === 0) return;
    // TODO: Save selected sports to user profile
    router.push("/profile/create");
  }

  return (
    <>
      <style jsx>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(25px,-35px) scale(1.08)} 66%{transform:translate(-15px,20px) scale(.95)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,20px) scale(1.06)} }
        .orb-1{animation:drift1 11s ease-in-out infinite}
        .orb-2{animation:drift2 13s ease-in-out infinite}
      `}</style>

      <div className="fixed inset-0 bg-[#060606] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="orb-1 absolute top-[10%] -right-16 w-56 h-56 rounded-full bg-primary/[0.06] blur-[80px]" />
          <div className="orb-2 absolute bottom-[20%] -left-12 w-48 h-48 rounded-full bg-emerald-400/[0.04] blur-[70px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #00E676 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 shrink-0">
            <button onClick={() => router.back()} className="w-9 h-9 bg-white/[0.06] rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => router.push("/profile/create")}
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Skip
            </button>
          </div>

          {/* Header */}
          <div className="px-6 mb-5 shrink-0">
            <h1 className="text-[28px] font-bold text-white mb-1">Choose your sports</h1>
            <p className="text-white/40 text-sm">
              Select the sports you play or follow
              {selected.length > 0 && (
                <span className="text-primary ml-1">({selected.length} selected)</span>
              )}
            </p>
          </div>

          {/* Sports grid */}
          <div className="flex-1 px-6 overflow-y-auto min-h-0 pb-4">
            <div className="grid grid-cols-3 gap-3">
              {sports.map((sport) => {
                const isSelected = selected.includes(sport.name);
                return (
                  <button
                    key={sport.name}
                    onClick={() => toggle(sport.name)}
                    className={`relative py-5 px-2 rounded-2xl text-center transition-all border ${
                      isSelected
                        ? "bg-primary/10 border-primary/30 scale-[1.02]"
                        : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="text-3xl mb-2">{sport.emoji}</div>
                    <p className={`text-xs font-medium ${isSelected ? "text-white" : "text-white/60"}`}>
                      {sport.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Continue */}
          <div className="px-6 py-4 shrink-0">
            <button
              onClick={handleContinue}
              disabled={selected.length === 0}
              className="w-full h-[50px] bg-primary hover:brightness-110 text-black font-semibold text-[15px] rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue
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
