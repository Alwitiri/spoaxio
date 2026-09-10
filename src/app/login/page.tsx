"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email.trim() === "alwin@gmail.com" && password === "Jesus@lwin") {
      localStorage.setItem("spoaxio_demo_user", JSON.stringify({ email: "alwin@gmail.com", name: "Alwin" }));
      router.push("/home");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/home");
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError("Enter your email first");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
    if (error) setError(error.message);
    else {
      setError("");
      alert("Password reset email sent!");
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.05); }
          66% { transform: translate(25px, -35px) scale(1.1); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(35px, 25px) scale(1.08); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes line-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .orb-1 { animation: drift1 12s ease-in-out infinite; }
        .orb-2 { animation: drift2 15s ease-in-out infinite; }
        .orb-3 { animation: drift3 10s ease-in-out infinite; }
        .glow { animation: glow-pulse 5s ease-in-out infinite; }
        .sweep { animation: line-sweep 4s ease-in-out infinite; }
        .fade-in { animation: fade-up 0.6s ease-out both; }
        .fade-in-d1 { animation: fade-up 0.6s ease-out 0.1s both; }
        .fade-in-d2 { animation: fade-up 0.6s ease-out 0.2s both; }
        .fade-in-d3 { animation: fade-up 0.6s ease-out 0.3s both; }
      `}</style>

      <div className="fixed inset-0 bg-white overflow-hidden">

        {/* ======================== DESKTOP ======================== */}
        <div className="hidden lg:flex h-full">

          {/* Left — Hero image */}
          <div className="w-[48%] h-full relative bg-black">
            <img
              src="/hero-bg.png"
              alt="Spoaxio athletes"
              className="w-full h-full object-contain object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80" />
          </div>

          {/* Right — Form */}
          <div className="flex-1 h-full flex flex-col relative">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,230,118,0.5) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Top nav */}
            <div className="relative z-10 flex items-center justify-end px-10 py-4 shrink-0">
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">New here?</span>
                <Link
                  href="/signup"
                  className="px-5 py-2 bg-gray-100 border border-gray-200 text-gray-900 rounded-full text-sm font-medium hover:bg-gray-200 transition-all"
                >
                  Create account
                </Link>
              </div>
            </div>

            {/* Center form */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-10 min-h-0">
              <div className="w-full max-w-[400px]">

                {/* Brand */}
                <div className="fade-in mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/spoaxio-logo.png" alt="Spoaxio" className="w-10 h-10 object-contain" />
                    <span className="text-lg font-bold tracking-widest text-gray-900">SPOAXIO</span>
                  </div>
                  <h1 className="text-[32px] font-bold text-gray-900 leading-tight">
                    Sign in to your<br />account
                  </h1>
                </div>

                {error && (
                  <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm fade-in">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4 fade-in-d1">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-[50px] px-4 bg-gray-50 rounded-xl text-gray-900 text-[15px] placeholder:text-gray-400 outline-none border border-gray-200 focus:border-primary/60 focus:bg-gray-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full h-[50px] px-4 pr-12 bg-gray-50 rounded-xl text-gray-900 text-[15px] placeholder:text-gray-400 outline-none border border-gray-200 focus:border-primary/60 focus:bg-gray-100 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showPassword ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          ) : (
                            <>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-primary/80 hover:text-primary transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[50px] bg-primary hover:brightness-110 text-black font-semibold text-[15px] rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : "Sign in"}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6 fade-in-d2">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-gray-500 text-xs uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Social */}
                <div className="grid grid-cols-2 gap-3 fade-in-d3">
                  <button className="h-[46px] bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-all">
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button className="h-[46px] bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-all">
                    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    Apple
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between px-10 py-3 shrink-0">
              <p className="text-[11px] text-gray-500">&copy; 2024 Spoaxio</p>
              <div className="flex items-center gap-4 text-[11px] text-gray-500">
                <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
                <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </div>

        {/* ======================== MOBILE ======================== */}
        <div className="flex lg:hidden flex-col h-full relative">

          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-white" />

            {/* Floating orbs */}
            <div className="orb-1 absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/[0.07] blur-[80px]" />
            <div className="orb-2 absolute top-[40%] -left-20 w-48 h-48 rounded-full bg-emerald-400/[0.05] blur-[60px]" />
            <div className="orb-3 absolute -bottom-10 right-[20%] w-52 h-52 rounded-full bg-primary/[0.06] blur-[70px]" />

            {/* Center glow */}
            <div className="glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/[0.04] blur-[100px]" />

            {/* Sweep line */}
            <div className="absolute top-[35%] left-0 right-0 h-px overflow-hidden">
              <div className="sweep w-1/3 h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>

            {/* Dot grid */}
            <div className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: "radial-gradient(circle, #00E676 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-5 pt-safe-top py-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <img src="/spoaxio-logo.png" alt="Spoaxio" className="w-8 h-8 object-contain" />
              <span className="text-sm font-bold tracking-widest text-gray-900">SPOAXIO</span>
            </div>
            <Link
              href="/signup"
              className="px-4 py-1.5 bg-gray-100 border border-gray-200 text-gray-700 rounded-full text-xs font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Form */}
          <div className="relative z-10 flex-1 flex flex-col justify-center px-6 min-h-0">
            <div className="w-full max-w-sm mx-auto">
              <div className="fade-in mb-6">
                <h1 className="text-[28px] font-bold text-gray-900 leading-tight mb-1">
                  Welcome back
                </h1>
                <p className="text-gray-400 text-sm">Sign in to continue your journey</p>
              </div>

              {error && (
                <div className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5 fade-in-d1">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-[48px] px-4 bg-white/[0.05] backdrop-blur-sm rounded-xl text-gray-900 text-[15px] placeholder:text-gray-400 outline-none border border-gray-200 focus:border-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full h-[48px] px-4 pr-12 bg-white/[0.05] backdrop-blur-sm rounded-xl text-gray-900 text-[15px] placeholder:text-gray-400 outline-none border border-gray-200 focus:border-primary/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        ) : (
                          <>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-primary/80 hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </button>
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
                  ) : "Sign in"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-5 fade-in-d2">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-gray-500 text-xs uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-3 fade-in-d3">
                <button className="h-[46px] bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-all">
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="h-[46px] bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-all">
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  Apple
                </button>
              </div>

              <p className="text-center mt-6 text-sm text-gray-500 fade-in-d3">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-center px-5 py-3 shrink-0">
            <p className="text-[11px] text-gray-500">&copy; 2024 Spoaxio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
