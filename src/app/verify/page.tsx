"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const interval = setInterval(() => {
      setResendTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    data.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    inputRefs.current[Math.min(data.length, 5)]?.focus();
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Enter the full 6-digit code"); return; }
    setError("");
    setLoading(true);
    // TODO: Supabase OTP verification
    setTimeout(() => router.push("/location"), 1000);
  }

  function handleResend() {
    if (resendTimer > 0) return;
    setResendTimer(30);
    // TODO: Resend OTP via Supabase
  }

  return (
    <>
      <style jsx>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-40px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(.95)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-35px,25px) scale(1.08)} }
        @keyframes glow-pulse { 0%,100%{opacity:.3} 50%{opacity:.6} }
        .orb-1{animation:drift1 12s ease-in-out infinite}
        .orb-2{animation:drift2 10s ease-in-out infinite}
        .glow{animation:glow-pulse 5s ease-in-out infinite}
      `}</style>

      <div className="fixed inset-0 bg-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="orb-1 absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/[0.07] blur-[80px]" />
          <div className="orb-2 absolute bottom-[20%] -left-16 w-48 h-48 rounded-full bg-emerald-400/[0.05] blur-[60px]" />
          <div className="glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/[0.03] blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #00E676 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Top bar */}
          <div className="flex items-center px-6 py-4 shrink-0">
            <Link href="/signup" className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-3xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
              </div>

              <h1 className="text-[28px] font-bold text-gray-900 text-center mb-2">Verify your email</h1>
              <p className="text-gray-400 text-sm text-center mb-8">
                We sent a 6-digit code to your email.<br />Enter it below to continue.
              </p>

              {error && (
                <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleVerify}>
                {/* OTP inputs */}
                <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { inputRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className={`w-12 h-14 text-center text-xl font-bold rounded-xl outline-none transition-all
                        ${digit
                          ? "bg-primary/10 border-2 border-primary/40 text-gray-900"
                          : "bg-gray-50 border-2 border-gray-200 text-gray-900"
                        } focus:border-primary/60 focus:bg-gray-100`}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[50px] bg-primary hover:brightness-110 text-black font-semibold text-[15px] rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : "Verify"}
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-gray-500 text-sm">
                  Didn&apos;t receive the code?{" "}
                  <button
                    onClick={handleResend}
                    disabled={resendTimer > 0}
                    className={`font-semibold transition-colors ${resendTimer > 0 ? "text-gray-500" : "text-primary hover:text-primary/80"}`}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
