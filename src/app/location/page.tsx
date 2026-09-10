"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const popularCities = [
  { name: "Chennai", state: "Tamil Nadu" },
  { name: "Bangalore", state: "Karnataka" },
  { name: "Mumbai", state: "Maharashtra" },
  { name: "Delhi", state: "Delhi" },
  { name: "Hyderabad", state: "Telangana" },
  { name: "Kolkata", state: "West Bengal" },
  { name: "Pune", state: "Maharashtra" },
  { name: "Coimbatore", state: "Tamil Nadu" },
  { name: "Madurai", state: "Tamil Nadu" },
  { name: "Kochi", state: "Kerala" },
  { name: "Ahmedabad", state: "Gujarat" },
  { name: "Jaipur", state: "Rajasthan" },
];

export default function LocationPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [detecting, setDetecting] = useState(false);

  const filtered = search
    ? popularCities.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.state.toLowerCase().includes(search.toLowerCase())
      )
    : popularCities;

  function handleDetect() {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setSelected("Current Location");
          setDetecting(false);
        },
        () => {
          setDetecting(false);
        }
      );
    } else {
      setDetecting(false);
    }
  }

  function handleContinue() {
    if (!selected) return;
    // TODO: Save location to user profile
    router.push("/sports");
  }

  return (
    <>
      <style jsx>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-40px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(.95)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-35px,25px) scale(1.08)} }
        .orb-1{animation:drift1 12s ease-in-out infinite}
        .orb-2{animation:drift2 10s ease-in-out infinite}
      `}</style>

      <div className="fixed inset-0 bg-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="orb-1 absolute -top-16 right-[10%] w-52 h-52 rounded-full bg-blue-500/[0.05] blur-[80px]" />
          <div className="orb-2 absolute bottom-[15%] -left-10 w-44 h-44 rounded-full bg-primary/[0.05] blur-[60px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #00E676 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 shrink-0">
            <button onClick={() => router.back()} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => router.push("/sports")}
              className="text-sm text-gray-400 hover:text-gray-500 transition-colors"
            >
              Skip
            </button>
          </div>

          {/* Header */}
          <div className="px-6 mb-5 shrink-0">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-3xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-[28px] font-bold text-gray-900 text-center mb-1">Choose your location</h1>
            <p className="text-gray-400 text-sm text-center">Find sports near you</p>
          </div>

          {/* Detect location */}
          <div className="px-6 mb-4 shrink-0">
            <button
              onClick={handleDetect}
              disabled={detecting}
              className="w-full h-[48px] bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center gap-2.5 text-blue-400 text-sm font-medium hover:bg-blue-500/15 transition-all disabled:opacity-50"
            >
              {detecting ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.636-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-12.728l1.414 1.414m9.9 9.9l1.414 1.414" />
                </svg>
              )}
              {detecting ? "Detecting..." : "Use current location"}
            </button>
          </div>

          {/* Search */}
          <div className="px-6 mb-4 shrink-0">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-[44px] pl-10 pr-4 bg-gray-50 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 outline-none border border-gray-200 focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          {/* City grid */}
          <div className="flex-1 px-6 overflow-y-auto min-h-0 pb-4">
            <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-3">Popular cities</p>
            <div className="grid grid-cols-3 gap-2.5">
              {filtered.map((city) => (
                <button
                  key={city.name}
                  onClick={() => setSelected(city.name)}
                  className={`py-3.5 px-2 rounded-xl text-center transition-all border ${
                    selected === city.name
                      ? "bg-primary/10 border-primary/30 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <p className="text-sm font-medium">{city.name}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{city.state}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <div className="px-6 py-4 shrink-0">
            <button
              onClick={handleContinue}
              disabled={!selected}
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
