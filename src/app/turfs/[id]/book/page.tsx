"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const turfNames: Record<string, string> = {
  "1": "Green Arena Sports Complex",
  "2": "Pro Kick Football Turf",
  "3": "Smash Point Badminton",
  "4": "Chennai Cricket Hub",
  "5": "Ace Tennis Academy",
  "6": "Goal Zone Arena",
};
const turfPrices: Record<string, number> = {
  "1": 1200, "2": 800, "3": 600, "4": 1500, "5": 900, "6": 1000,
};

function getNext7Days() {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push({
      date: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      num: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      isToday: i === 0,
    });
  }
  return days;
}

const timeSlots = [
  { time: "06:00 AM", available: true },
  { time: "07:00 AM", available: true },
  { time: "08:00 AM", available: false },
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "01:00 PM", available: true },
  { time: "02:00 PM", available: true },
  { time: "03:00 PM", available: false },
  { time: "04:00 PM", available: true },
  { time: "05:00 PM", available: true },
  { time: "06:00 PM", available: true },
  { time: "07:00 PM", available: false },
  { time: "08:00 PM", available: true },
  { time: "09:00 PM", available: true },
];

type Step = "datetime" | "payment" | "confirmed";

export default function BookTurfPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const turfName = turfNames[id] || "Sports Turf";
  const pricePerHour = turfPrices[id] || 1000;

  const days = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(days[0].date);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [step, setStep] = useState<Step>("datetime");
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(1);

  const total = pricePerHour * duration;
  const gst = Math.round(total * 0.18);
  const convenience = 29;
  const grandTotal = total + gst + convenience;

  function toggleSlot(time: string) {
    setSelectedSlots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  }

  function handleProceed() {
    if (selectedSlots.length === 0) return;
    setDuration(selectedSlots.length);
    setStep("payment");
  }

  function handlePay() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("confirmed");
    }, 1500);
  }

  if (step === "confirmed") {
    const bookingId = `SPX${Date.now().toString(36).toUpperCase()}`;
    const selectedDay = days.find((d) => d.date === selectedDate);
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-6">
        {/* Success animation */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary/15 rounded-full flex items-center justify-center mb-4 mx-auto relative">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Booking Confirmed!</h1>
          <p className="text-sm text-gray-400 text-center">Your turf has been booked successfully</p>
        </div>

        {/* Booking card */}
        <div className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Booking ID</p>
              <p className="text-sm font-mono font-semibold text-primary">{bookingId}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="text-lg">🏟️</span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Venue</span>
              <span className="text-xs text-gray-600 text-right max-w-[60%]">{turfName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Date</span>
              <span className="text-xs text-gray-600">{selectedDay?.day}, {selectedDay?.num} {selectedDay?.month}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Time</span>
              <span className="text-xs text-gray-600">{selectedSlots.join(", ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Duration</span>
              <span className="text-xs text-gray-600">{duration} hour{duration > 1 ? "s" : ""}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-xs text-gray-500">Total Paid</span>
            <span className="text-lg font-bold text-primary">₹{grandTotal}</span>
          </div>
        </div>

        {/* QR placeholder */}
        <div className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6 text-center">
          <p className="text-xs text-gray-500 mb-3">Show this QR at the venue</p>
          <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center mb-2">
            <div className="grid grid-cols-5 gap-1 p-3">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-sm ${[0,1,2,4,5,6,9,10,12,14,15,18,19,20,22,23,24].includes(i) ? "bg-black" : "bg-white"}`} />
              ))}
            </div>
          </div>
          <p className="text-[10px] text-gray-500 font-mono">{bookingId}</p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={() => router.push("/home")}
            className="w-full h-[50px] bg-primary hover:brightness-110 text-black font-semibold text-[15px] rounded-xl transition-all"
          >
            Back to Home
          </button>
          <button
            onClick={() => router.push("/turfs")}
            className="w-full h-[44px] bg-gray-50 border border-gray-200 text-gray-400 font-medium text-sm rounded-xl hover:bg-gray-100 transition-all"
          >
            Browse More Turfs
          </button>
        </div>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="fixed inset-0 bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-3 shrink-0">
          <button onClick={() => setStep("datetime")} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Payment</h1>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 px-5">
          {/* Booking summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-5">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-xl">🏟️</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{turfName}</h3>
                <p className="text-xs text-gray-500">{days.find((d) => d.date === selectedDate)?.day}, {days.find((d) => d.date === selectedDate)?.num} {days.find((d) => d.date === selectedDate)?.month}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Time Slots</span>
                <span className="text-gray-500">{selectedSlots.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="text-gray-500">{duration} hour{duration > 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Details</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Turf Fee ({duration}hr × ₹{pricePerHour})</span>
                <span className="text-gray-600">₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">GST (18%)</span>
                <span className="text-gray-600">₹{gst}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Convenience Fee</span>
                <span className="text-gray-600">₹{convenience}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-900">Total</span>
                <span className="text-sm font-bold text-primary">₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Payment methods */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Pay with</h3>
            <div className="space-y-2">
              {[
                { name: "UPI / GPay / PhonePe", icon: "📱", selected: true },
                { name: "Credit / Debit Card", icon: "💳", selected: false },
                { name: "Net Banking", icon: "🏦", selected: false },
                { name: "Pay at Venue", icon: "💰", selected: false },
              ].map((m) => (
                <button
                  key={m.name}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    m.selected
                      ? "bg-primary/5 border-primary/20"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  <span className={`text-sm ${m.selected ? "text-gray-900 font-medium" : "text-gray-400"}`}>{m.name}</span>
                  {m.selected && (
                    <div className="ml-auto w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pay button */}
        <div className="px-5 py-4 bg-white border-t border-gray-200 shrink-0">
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full h-[50px] bg-primary hover:brightness-110 text-black font-semibold text-[15px] rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <>Pay ₹{grandTotal}</>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Step: datetime
  return (
    <>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
        .fade-in { animation: fadeIn .3s ease-out }
      `}</style>
      <div className="fixed inset-0 bg-white flex flex-col">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 shrink-0">
          <div className="flex items-center gap-3 mb-1">
            <button onClick={() => router.back()} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Select Date & Time</h1>
              <p className="text-[11px] text-gray-500 truncate max-w-[250px]">{turfName}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 px-5">
          {/* Date picker */}
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Choose Date</h2>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {days.map((d) => (
                <button
                  key={d.date}
                  onClick={() => setSelectedDate(d.date)}
                  className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-all border ${
                    selectedDate === d.date
                      ? "bg-primary/10 border-primary/30"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <p className={`text-[10px] font-medium ${selectedDate === d.date ? "text-primary" : "text-gray-500"}`}>
                    {d.isToday ? "Today" : d.day}
                  </p>
                  <p className={`text-lg font-bold mt-0.5 ${selectedDate === d.date ? "text-gray-900" : "text-gray-500"}`}>{d.num}</p>
                  <p className={`text-[10px] ${selectedDate === d.date ? "text-primary/60" : "text-gray-500"}`}>{d.month}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Time slots */}
          <div className="mb-5 fade-in">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Available Slots</h2>
              <p className="text-[11px] text-gray-500">{selectedSlots.length} selected</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlots.includes(slot.time);
                return (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && toggleSlot(slot.time)}
                    disabled={!slot.available}
                    className={`py-2.5 rounded-xl text-xs font-medium transition-all border ${
                      !slot.available
                        ? "bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed line-through"
                        : isSelected
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-primary/20 border border-primary/30" />
                <span className="text-[10px] text-gray-500">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-gray-50 border border-gray-200" />
                <span className="text-[10px] text-gray-500">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-gray-50 border border-gray-100" />
                <span className="text-[10px] text-gray-500">Booked</span>
              </div>
            </div>
          </div>

          {/* Price preview */}
          {selectedSlots.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Estimated total</p>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">₹{pricePerHour * selectedSlots.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{selectedSlots.length} hour{selectedSlots.length > 1 ? "s" : ""}</p>
                  <p className="text-xs text-gray-500">₹{pricePerHour}/hr</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="px-5 py-4 bg-white border-t border-gray-200 shrink-0">
          <button
            onClick={handleProceed}
            disabled={selectedSlots.length === 0}
            className="w-full h-[50px] bg-primary hover:brightness-110 text-black font-semibold text-[15px] rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Proceed to Payment
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
