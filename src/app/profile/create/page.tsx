"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreateProfilePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleContinue() {
    if (!displayName.trim()) return;
    setLoading(true);
    // TODO: Save profile to Supabase
    setTimeout(() => router.push("/home"), 800);
  }

  return (
    <>
      <style jsx>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(25px,-30px) scale(1.08)} 66%{transform:translate(-15px,15px) scale(.95)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,20px) scale(1.06)} }
        .orb-1{animation:drift1 11s ease-in-out infinite}
        .orb-2{animation:drift2 13s ease-in-out infinite}
      `}</style>

      <div className="fixed inset-0 bg-[#060606] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="orb-1 absolute top-[5%] -right-16 w-52 h-52 rounded-full bg-primary/[0.06] blur-[80px]" />
          <div className="orb-2 absolute bottom-[15%] -left-12 w-44 h-44 rounded-full bg-emerald-400/[0.04] blur-[60px]" />
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
              onClick={() => router.push("/home")}
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Skip
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 overflow-y-auto min-h-0 pb-4">
            <div className="max-w-sm mx-auto w-full">
              <h1 className="text-[28px] font-bold text-white mb-1">Set up your profile</h1>
              <p className="text-white/40 text-sm mb-8">Let others know who you are</p>

              {/* Avatar */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="relative group"
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center overflow-hidden border-2 transition-all ${avatar ? "border-primary/40" : "border-white/[0.08] border-dashed"}`}>
                    {avatar ? (
                      <img src={avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:brightness-110 transition-all">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                    </svg>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
                </button>
              </div>

              {/* Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">Display Name *</label>
                  <input
                    type="text"
                    placeholder="How should we call you?"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="w-full h-[48px] px-4 bg-white/[0.04] rounded-xl text-white text-[15px] placeholder:text-white/20 outline-none border border-white/[0.08] focus:border-primary/60 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">Bio</label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    maxLength={150}
                    className="w-full px-4 py-3 bg-white/[0.04] rounded-xl text-white text-[15px] placeholder:text-white/20 outline-none border border-white/[0.08] focus:border-primary/60 focus:bg-white/[0.06] transition-all resize-none"
                  />
                  <p className="text-right text-[11px] text-white/20 mt-1">{bio.length}/150</p>
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full h-[48px] px-4 bg-white/[0.04] rounded-xl text-white text-[15px] outline-none border border-white/[0.08] focus:border-primary/60 focus:bg-white/[0.06] transition-all [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">Gender</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`h-[44px] rounded-xl text-sm font-medium transition-all border ${
                          gender === g
                            ? "bg-primary/10 border-primary/30 text-white"
                            : "bg-white/[0.03] border-white/[0.06] text-white/50 hover:bg-white/[0.06]"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue */}
          <div className="px-6 py-4 shrink-0">
            <button
              onClick={handleContinue}
              disabled={!displayName.trim() || loading}
              className="w-full h-[50px] bg-primary hover:brightness-110 text-black font-semibold text-[15px] rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  Complete Setup
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
