"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => router.push("/onboarding"), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [router]);

  return (
    <>
      <style jsx>{`
        @keyframes ring-expand {
          0% { transform: translate(-50%,-50%) scale(0); opacity: 0.5; }
          100% { transform: translate(-50%,-50%) scale(1); opacity: 0; }
        }
        .ring {
          position: absolute; top: 50%; left: 50%;
          border-radius: 50%; border: 1px solid rgba(0,230,118,0.15);
          pointer-events: none;
        }
        .ring-1 { width: 300px; height: 300px; animation: ring-expand 2s ease-out 0.5s both; }
        .ring-2 { width: 500px; height: 500px; animation: ring-expand 2s ease-out 0.8s both; }
        .ring-3 { width: 700px; height: 700px; animation: ring-expand 2s ease-out 1.1s both; }
      `}</style>

      <div className="fixed inset-0 bg-[#060606] flex items-center justify-center overflow-hidden">
        {/* Pulse rings */}
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />

        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[120px] transition-opacity duration-1000"
          style={{ background: "radial-gradient(circle, rgba(0,230,118,0.12), transparent)", opacity: phase >= 1 ? 1 : 0 }}
        />

        {/* Logo + text */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Icon */}
          <div
            className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center transition-all duration-700 ease-out"
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "scale(1) translateY(0)" : "scale(0.5) translateY(20px)",
            }}
          >
            <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8zm8.21 5.72C15.8 15.67 14.04 17 12 17s-3.8-1.33-4.71-3.28c-.16-.33.08-.72.45-.72h8.52c.37 0 .61.39.45.72zM15.5 11c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </div>

          {/* Brand name */}
          <h1
            className="mt-5 text-2xl font-bold tracking-[0.3em] text-white transition-all duration-700 ease-out delay-300"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "translateY(0)" : "translateY(12px)",
            }}
          >
            SPOAXIO
          </h1>

          {/* Tagline */}
          <p
            className="mt-2 text-[10px] tracking-[0.3em] text-white/40 uppercase transition-all duration-700 ease-out delay-500"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "translateY(0)" : "translateY(8px)",
            }}
          >
            Sports for a brighter tomorrow
          </p>
        </div>

        {/* Fade out overlay */}
        <div
          className="absolute inset-0 bg-[#060606] pointer-events-none transition-opacity duration-500"
          style={{ opacity: phase >= 3 ? 1 : 0 }}
        />
      </div>
    </>
  );
}
