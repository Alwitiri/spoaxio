"use client";

import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const gymNames: Record<string, string> = {
  "1": "Iron Temple Fitness",
  "2": "FlexZone CrossFit Box",
  "3": "Zen Yoga Studio",
  "4": "Beast Mode Gym",
  "5": "Tiger MMA Academy",
  "6": "Core Pilates Chennai",
};

type Step = "confirm" | "payment" | "done";

export default function JoinGymPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const gymName = gymNames[id] || "Fitness Centre";

  const planName = searchParams.get("plan") || "Monthly";
  const planPrice = Number(searchParams.get("price")) || 2500;
  const planDuration = searchParams.get("duration") || "1 Month";

  const gst = Math.round(planPrice * 0.18);
  const registration = planName === "Monthly" ? 500 : 0;
  const grandTotal = planPrice + gst + registration;

  const [step, setStep] = useState<Step>("confirm");
  const [loading, setLoading] = useState(false);
  const [startDate] = useState(() => {
    const d = new Date();
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  });
  const [endDate] = useState(() => {
    const d = new Date();
    const months = parseInt(planDuration) || 1;
    d.setMonth(d.getMonth() + months);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  });

  function handlePay() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("done");
    }, 1500);
  }

  if (step === "done") {
    const memberId = `SPX-GYM-${Date.now().toString(36).toUpperCase()}`;
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-6">
        <div className="mb-6">
          <div className="w-20 h-20 bg-orange-500/15 rounded-full flex items-center justify-center mb-4 mx-auto relative">
            <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-ping" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Welcome Aboard!</h1>
          <p className="text-sm text-gray-400 text-center">Your membership is now active</p>
        </div>

        {/* Membership card */}
        <div className="w-full max-w-sm bg-gradient-to-br from-orange-500/[0.08] to-white/[0.02] border border-orange-500/20 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Member ID</p>
              <p className="text-sm font-mono font-semibold text-orange-400">{memberId}</p>
            </div>
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <span className="text-lg">🏋️</span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Gym</span>
              <span className="text-xs text-gray-600 text-right max-w-[60%]">{gymName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Plan</span>
              <span className="text-xs text-gray-600">{planName} ({planDuration})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Valid From</span>
              <span className="text-xs text-gray-600">{startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Valid Until</span>
              <span className="text-xs text-gray-600">{endDate}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-xs text-gray-500">Amount Paid</span>
            <span className="text-lg font-bold text-orange-400">₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* QR */}
        <div className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6 text-center">
          <p className="text-xs text-gray-500 mb-3">Show this at the gym</p>
          <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center mb-2">
            <div className="grid grid-cols-5 gap-1 p-3">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-sm ${[0,1,3,4,5,7,9,10,12,14,15,17,19,20,21,23,24].includes(i) ? "bg-black" : "bg-white"}`} />
              ))}
            </div>
          </div>
          <p className="text-[10px] text-gray-500 font-mono">{memberId}</p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={() => router.push("/home")}
            className="w-full h-[50px] bg-orange-500 hover:brightness-110 text-gray-900 font-semibold text-[15px] rounded-xl transition-all"
          >
            Back to Home
          </button>
          <button
            onClick={() => router.push("/gyms")}
            className="w-full h-[44px] bg-gray-50 border border-gray-200 text-gray-400 font-medium text-sm rounded-xl hover:bg-gray-100 transition-all"
          >
            Browse More Gyms
          </button>
        </div>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="fixed inset-0 bg-white flex flex-col">
        <div className="flex items-center gap-3 px-5 pt-5 pb-3 shrink-0">
          <button onClick={() => setStep("confirm")} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Payment</h1>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 px-5">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-5">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-xl">🏋️</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{gymName}</h3>
                <p className="text-xs text-gray-500">{planName} — {planDuration}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Start Date</span>
                <span className="text-gray-500">{startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">End Date</span>
                <span className="text-gray-500">{endDate}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Details</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">{planName} Plan</span>
                <span className="text-gray-600">₹{planPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">GST (18%)</span>
                <span className="text-gray-600">₹{gst.toLocaleString()}</span>
              </div>
              {registration > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Registration Fee</span>
                  <span className="text-gray-600">₹{registration}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-900">Total</span>
                <span className="text-sm font-bold text-orange-400">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Pay with</h3>
            <div className="space-y-2">
              {[
                { name: "UPI / GPay / PhonePe", icon: "📱", selected: true },
                { name: "Credit / Debit Card", icon: "💳", selected: false },
                { name: "Net Banking", icon: "🏦", selected: false },
              ].map((m) => (
                <button
                  key={m.name}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    m.selected
                      ? "bg-orange-500/5 border-orange-500/20"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  <span className={`text-sm ${m.selected ? "text-gray-900 font-medium" : "text-gray-400"}`}>{m.name}</span>
                  {m.selected && (
                    <div className="ml-auto w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 bg-white border-t border-gray-200 shrink-0">
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full h-[50px] bg-orange-500 hover:brightness-110 text-gray-900 font-semibold text-[15px] rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <>Pay ₹{grandTotal.toLocaleString()}</>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Step: confirm
  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      <div className="flex items-center gap-3 px-5 pt-5 pb-3 shrink-0">
        <button onClick={() => router.back()} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Confirm Membership</h1>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 px-5">
        {/* Selected plan card */}
        <div className="bg-gradient-to-br from-orange-500/[0.06] to-white/[0.02] border border-orange-500/20 rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-2xl">🏋️</span>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">{gymName}</h2>
              <p className="text-xs text-gray-500">Membership</p>
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-orange-400">{planName} Plan</h3>
              <span className="px-2 py-0.5 bg-orange-500/20 rounded-full text-[9px] font-semibold text-orange-400">{planDuration}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-gray-900">₹{planPrice.toLocaleString()}</span>
              <span className="text-xs text-gray-500">for {planDuration.toLowerCase()}</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Starts</span>
              <span className="text-gray-500">{startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Expires</span>
              <span className="text-gray-500">{endDate}</span>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">What&apos;s Included</h3>
          <div className="space-y-2.5">
            {[
              "Full access to all equipment",
              "Locker & shower facilities",
              "Group classes (if available)",
              "Fitness assessment",
              "Trainer consultation (1 session)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-6">
          <p className="text-[10px] text-gray-500 leading-relaxed">
            By proceeding, you agree to the gym&apos;s terms and conditions. Membership is non-transferable. Cancellation policy applies as per venue rules.
          </p>
        </div>
      </div>

      <div className="px-5 py-4 bg-white border-t border-gray-200 shrink-0">
        <button
          onClick={() => setStep("payment")}
          className="w-full h-[50px] bg-orange-500 hover:brightness-110 text-gray-900 font-semibold text-[15px] rounded-xl transition-all flex items-center justify-center gap-2"
        >
          Continue to Payment
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
