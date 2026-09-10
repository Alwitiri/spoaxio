"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const sportOptions = [
  { id: "football", name: "Football", emoji: "⚽", color: "#00E676" },
  { id: "cricket", name: "Cricket", emoji: "🏏", color: "#FF9800" },
  { id: "badminton", name: "Badminton", emoji: "🏸", color: "#00BCD4" },
  { id: "basketball", name: "Basketball", emoji: "🏀", color: "#FF5722" },
  { id: "tennis", name: "Tennis", emoji: "🎾", color: "#E040FB" },
  { id: "volleyball", name: "Volleyball", emoji: "🏐", color: "#FFEB3B" },
];

const skillLevels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

const venues = [
  { id: "v1", name: "Pro Kick Turf", area: "Velachery", price: "₹1200/hr" },
  { id: "v2", name: "Smash Point", area: "T. Nagar", price: "₹800/hr" },
  { id: "v3", name: "Green Arena", area: "Adyar", price: "₹1500/hr" },
  { id: "v4", name: "Goal Zone Arena", area: "OMR", price: "₹1000/hr" },
  { id: "v5", name: "YMCA Court", area: "Nandanam", price: "₹600/hr" },
];

const dates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return {
    day: d.toLocaleDateString("en-US", { weekday: "short" }),
    date: d.getDate(),
    full: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    isToday: i === 0,
  };
});

const timeSlots = [
  "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
];

export default function CreateGamePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [sport, setSport] = useState("");
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState("All Levels");
  const [totalPlayers, setTotalPlayers] = useState(10);
  const [pricePerPlayer, setPricePerPlayer] = useState(150);
  const [venue, setVenue] = useState("");
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const selectedSport = sportOptions.find((s) => s.id === sport);
  const themeColor = selectedSport?.color || "#00E676";

  function canAdvance() {
    if (step === 1) return sport !== "";
    if (step === 2) return title.trim() !== "" && skill !== "";
    if (step === 3) return venue !== "" && selectedTime !== "";
    return true;
  }

  function handleCreate() {
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      setCreated(true);
    }, 1500);
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => (step > 1 && !created ? setStep(step - 1) : router.back())} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">Create a Game</h1>
            {!created && <p className="text-[11px] text-gray-500 mt-0.5">Step {step} of 3</p>}
          </div>
        </div>

        {/* Progress bar */}
        {!created && (
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 h-1 rounded-full overflow-hidden bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: step >= s ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: themeColor }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0 px-5 py-3">
        <AnimatePresence mode="wait">
          {/* Step 1: Choose Sport */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-sm font-semibold text-gray-900 mb-1">What sport?</h2>
              <p className="text-xs text-gray-500 mb-4">Pick the sport for your game</p>

              <div className="grid grid-cols-3 gap-2.5">
                {sportOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSport(s.id)}
                    className={`p-4 rounded-2xl border transition-all text-center ${
                      sport === s.id
                        ? "border-primary/30 bg-primary/5"
                        : "border-gray-200 bg-gray-50 hover:bg-gray-50"
                    }`}
                    style={sport === s.id ? { borderColor: `${s.color}30`, backgroundColor: `${s.color}08` } : {}}
                  >
                    <span className="text-2xl block mb-1.5">{s.emoji}</span>
                    <span className={`text-[11px] font-medium ${sport === s.id ? "text-gray-900" : "text-gray-400"}`}>{s.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Game Details */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1">Game details</h2>
                <p className="text-xs text-gray-500 mb-4">Tell players what to expect</p>
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 block">Game Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 5v5 Evening Match"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/30"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 block">Skill Level</label>
                <div className="flex gap-1.5 flex-wrap">
                  {skillLevels.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSkill(s)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                        skill === s ? "bg-primary/15 text-primary border border-primary/25" : "bg-gray-50 text-gray-500 border border-transparent"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 block">Total Players</label>
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                    <button onClick={() => setTotalPlayers(Math.max(2, totalPlayers - 1))} className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">-</button>
                    <span className="flex-1 text-center text-sm font-bold text-gray-900">{totalPlayers}</span>
                    <button onClick={() => setTotalPlayers(Math.min(30, totalPlayers + 1))} className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">+</button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 block">Price / Player</label>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                    <span className="text-gray-500 text-sm">₹</span>
                    <input
                      type="number"
                      value={pricePerPlayer}
                      onChange={(e) => setPricePerPlayer(Number(e.target.value))}
                      className="flex-1 bg-transparent text-sm font-bold text-gray-900 text-center focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 block">Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Any extra info for players..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/30 resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Venue & Time */}
          {step === 3 && !created && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1">When & where?</h2>
                <p className="text-xs text-gray-500 mb-4">Pick a venue and time slot</p>
              </div>

              {/* Date picker */}
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 block">Date</label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {dates.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(i)}
                      className={`flex-shrink-0 w-14 py-2.5 rounded-xl text-center transition-all border ${
                        selectedDate === i
                          ? "border-primary/30 bg-primary/10"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <p className={`text-[9px] font-medium ${selectedDate === i ? "text-primary" : "text-gray-500"}`}>
                        {d.isToday ? "Today" : d.day}
                      </p>
                      <p className={`text-lg font-bold ${selectedDate === i ? "text-gray-900" : "text-gray-400"}`}>{d.date}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 block">Time</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-lg text-[11px] font-medium transition-all border ${
                        selectedTime === t
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-gray-200 bg-gray-50 text-gray-500"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Venue */}
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 block">Venue</label>
                <div className="space-y-2">
                  {venues.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVenue(v.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                        venue === v.id
                          ? "border-primary/30 bg-primary/5"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${venue === v.id ? "text-gray-900" : "text-gray-400"}`}>{v.name}</p>
                        <p className="text-[10px] text-gray-500">{v.area} · {v.price}</p>
                      </div>
                      {venue === v.id && (
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Created confirmation */}
          {created && (
            <motion.div key="created" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                <div className="w-20 h-20 bg-primary/15 rounded-3xl flex items-center justify-center mb-5">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Game Created!</h2>
              <p className="text-xs text-gray-500 text-center mb-6 max-w-[250px]">
                Your game is live. Share it with players or wait for them to discover it.
              </p>

              <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${themeColor}12` }}>
                    {selectedSport?.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{title || "Untitled Game"}</p>
                    <p className="text-[10px] text-gray-500">{selectedSport?.name} · {skill}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-gray-500">
                  <span>{dates[selectedDate]?.full}</span>
                  <span>{selectedTime}</span>
                  <span>{totalPlayers} players</span>
                </div>
              </div>

              <div className="w-full flex gap-2">
                <button onClick={() => router.push("/games")} className="flex-1 py-3 bg-gray-100 rounded-xl text-xs font-medium text-gray-400">
                  View All Games
                </button>
                <button className="flex-1 py-3 bg-primary/10 border border-primary/20 rounded-xl text-xs font-medium text-primary">
                  Share Game
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      {!created && (
        <div className="px-5 py-4 bg-white border-t border-gray-200 shrink-0">
          <button
            onClick={() => (step < 3 ? setStep(step + 1) : handleCreate())}
            disabled={!canAdvance() || creating}
            className="w-full h-[50px] bg-primary hover:brightness-110 text-black font-semibold text-[15px] rounded-xl transition-all disabled:opacity-30 flex items-center justify-center gap-2"
          >
            {creating ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : step < 3 ? (
              <>
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            ) : (
              <>
                Create Game
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
