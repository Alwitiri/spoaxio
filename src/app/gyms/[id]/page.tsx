"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const gymData: Record<string, {
  name: string; location: string; rating: number; reviews: number; type: string;
  distance: string; description: string; timings: string; phone: string;
  amenities: { icon: string; name: string }[];
  equipment: string[];
  trainers: { name: string; specialty: string }[];
  plans: { name: string; duration: string; price: number; perMonth: number; popular?: boolean }[];
  reviewList: { name: string; rating: number; text: string; date: string }[];
}> = {
  "1": {
    name: "Iron Temple Fitness",
    location: "Anna Nagar, Chennai",
    rating: 4.8,
    reviews: 312,
    type: "Gym",
    distance: "1.8 km",
    description: "Premium fitness centre with state-of-the-art equipment, certified personal trainers, and a wide range of group classes. Whether you're a beginner or a pro athlete, Iron Temple has everything you need.",
    timings: "5:00 AM – 11:00 PM",
    phone: "+91 98765 11111",
    amenities: [
      { icon: "❄️", name: "AC" },
      { icon: "🅿️", name: "Parking" },
      { icon: "👤", name: "Personal Trainer" },
      { icon: "🧖", name: "Steam Room" },
      { icon: "🚿", name: "Showers" },
      { icon: "🔒", name: "Lockers" },
    ],
    equipment: ["Free Weights", "Smith Machine", "Cable Cross", "Treadmills", "Ellipticals", "Rowing Machines", "Leg Press", "Hack Squat"],
    trainers: [
      { name: "Rajesh K.", specialty: "Strength & Conditioning" },
      { name: "Divya S.", specialty: "Weight Loss" },
      { name: "Arjun M.", specialty: "Bodybuilding" },
    ],
    plans: [
      { name: "Monthly", duration: "1 Month", price: 2500, perMonth: 2500 },
      { name: "Quarterly", duration: "3 Months", price: 6000, perMonth: 2000, popular: true },
      { name: "Half Yearly", duration: "6 Months", price: 10000, perMonth: 1667 },
      { name: "Annual", duration: "12 Months", price: 18000, perMonth: 1500 },
    ],
    reviewList: [
      { name: "Karthik V.", rating: 5, text: "Best gym in Anna Nagar! Great equipment and the trainers really know their stuff.", date: "3 days ago" },
      { name: "Sneha R.", rating: 5, text: "Love the atmosphere here. Clean, well-maintained, and never too crowded.", date: "1 week ago" },
      { name: "Vikram P.", rating: 4, text: "Good gym overall. Could use a few more squat racks during peak hours.", date: "2 weeks ago" },
    ],
  },
  "2": {
    name: "FlexZone CrossFit Box",
    location: "Velachery, Chennai",
    rating: 4.7,
    reviews: 189,
    type: "CrossFit",
    distance: "3.4 km",
    description: "High-intensity CrossFit box with Olympic lifting platforms, competition-grade equipment, and expert coaches. WODs designed for all fitness levels with scalable options.",
    timings: "5:30 AM – 9:00 PM",
    phone: "+91 98765 22222",
    amenities: [
      { icon: "🏋️", name: "Olympic Lifting" },
      { icon: "👤", name: "Coaching" },
      { icon: "🅿️", name: "Parking" },
      { icon: "🚿", name: "Showers" },
    ],
    equipment: ["Barbells", "Bumper Plates", "Kettlebells", "Rowing Ergs", "Assault Bikes", "Pull-up Rigs", "Plyo Boxes", "Ropes"],
    trainers: [
      { name: "Sanjay M.", specialty: "CrossFit L2" },
      { name: "Priyanka D.", specialty: "Olympic Lifting" },
    ],
    plans: [
      { name: "Monthly", duration: "1 Month", price: 3500, perMonth: 3500 },
      { name: "Quarterly", duration: "3 Months", price: 9000, perMonth: 3000, popular: true },
      { name: "Half Yearly", duration: "6 Months", price: 15000, perMonth: 2500 },
      { name: "Annual", duration: "12 Months", price: 25000, perMonth: 2083 },
    ],
    reviewList: [
      { name: "Aditya K.", rating: 5, text: "Incredible community and coaching. Every WOD is different and challenging.", date: "2 days ago" },
      { name: "Roshni S.", rating: 4, text: "Great box! Wish they had more class timings on weekends.", date: "1 week ago" },
    ],
  },
  "3": {
    name: "Zen Yoga Studio",
    location: "T. Nagar, Chennai",
    rating: 4.9,
    reviews: 245,
    type: "Yoga",
    distance: "2.1 km",
    description: "Tranquil yoga studio offering Hatha, Vinyasa, Ashtanga, and Restorative styles. AC studios with premium mats and props. Meditation and breathwork sessions available.",
    timings: "6:00 AM – 8:00 PM",
    phone: "+91 98765 33333",
    amenities: [
      { icon: "❄️", name: "AC Studio" },
      { icon: "🧘", name: "Props Provided" },
      { icon: "🧠", name: "Meditation Room" },
      { icon: "🅿️", name: "Parking" },
    ],
    equipment: ["Yoga Mats", "Blocks", "Straps", "Bolsters", "Blankets", "Meditation Cushions"],
    trainers: [
      { name: "Lakshmi N.", specialty: "Hatha & Vinyasa" },
      { name: "Deepa R.", specialty: "Ashtanga" },
      { name: "Gopal S.", specialty: "Meditation" },
    ],
    plans: [
      { name: "Monthly", duration: "1 Month", price: 2000, perMonth: 2000 },
      { name: "Quarterly", duration: "3 Months", price: 5000, perMonth: 1667, popular: true },
      { name: "Half Yearly", duration: "6 Months", price: 9000, perMonth: 1500 },
      { name: "Annual", duration: "12 Months", price: 15000, perMonth: 1250 },
    ],
    reviewList: [
      { name: "Ananya M.", rating: 5, text: "Best yoga studio in Chennai! Lakshmi is an amazing instructor.", date: "1 day ago" },
      { name: "Ramesh K.", rating: 5, text: "The meditation sessions have changed my life. Peaceful and calming.", date: "4 days ago" },
      { name: "Pooja T.", rating: 5, text: "Beautiful studio with great vibes. Love the evening Vinyasa classes.", date: "2 weeks ago" },
    ],
  },
};

const fallback = gymData["1"];

const typeEmojis: Record<string, string> = {
  Gym: "🏋️", CrossFit: "💪", Yoga: "🧘", "Martial Arts": "🥊", Pilates: "🤸",
};

export default function GymDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const gym = gymData[id] || fallback;
  const [activeTab, setActiveTab] = useState<"overview" | "plans" | "reviews">("overview");

  return (
    <div className="fixed inset-0 bg-[#060606] flex flex-col">
      {/* Hero */}
      <div className="relative h-52 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.08] to-white/[0.02] flex items-center justify-center">
          <span className="text-6xl opacity-20">{typeEmojis[gym.type] || "🏋️"}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060606] to-transparent" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-5">
          <button onClick={() => router.back()} className="w-9 h-9 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            <button className="w-9 h-9 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
            <button className="w-9 h-9 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0 px-5">
        {/* Title */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-white mb-1">{gym.name}</h1>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-white">{gym.rating}</span>
              <span className="text-xs text-white/30">({gym.reviews} reviews)</span>
            </div>
            <span className="text-white/10">·</span>
            <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded-md text-[10px] text-orange-400 font-medium">{gym.type}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-xs text-white/40">{gym.location}</span>
            <span className="text-white/10 mx-0.5">·</span>
            <span className="text-xs text-white/40">{gym.distance}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/[0.03] rounded-xl p-1 mb-5">
          {(["overview", "plans", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/50"
              }`}
            >
              {tab === "overview" ? "Overview" : tab === "plans" ? "Plans" : `Reviews (${gym.reviews})`}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <>
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-white mb-2">About</h2>
              <p className="text-xs text-white/40 leading-relaxed">{gym.description}</p>
            </div>

            <div className="mb-5">
              <h2 className="text-sm font-semibold text-white mb-2">Amenities</h2>
              <div className="grid grid-cols-3 gap-2">
                {gym.amenities.map((a) => (
                  <div key={a.name} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                    <span className="text-lg">{a.icon}</span>
                    <p className="text-[10px] text-white/40 mt-1">{a.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h2 className="text-sm font-semibold text-white mb-2">Equipment</h2>
              <div className="flex flex-wrap gap-1.5">
                {gym.equipment.map((e) => (
                  <span key={e} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] rounded-lg text-[11px] text-white/40">{e}</span>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h2 className="text-sm font-semibold text-white mb-2">Trainers</h2>
              <div className="space-y-2">
                {gym.trainers.map((t) => (
                  <div key={t.name} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-orange-400">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{t.name}</p>
                      <p className="text-[10px] text-white/30">{t.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 space-y-2.5">
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/60">{gym.timings}</p>
                  <p className="text-[10px] text-white/25">Open today</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/60">{gym.phone}</p>
                  <p className="text-[10px] text-white/25">Call to enquire</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "plans" && (
          <div className="space-y-3 mb-6">
            {gym.plans.map((plan) => (
              <Link
                key={plan.name}
                href={`/gyms/${id}/join?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&duration=${encodeURIComponent(plan.duration)}`}
                className={`block rounded-2xl border p-4 transition-all hover:bg-white/[0.04] ${
                  plan.popular
                    ? "bg-orange-500/[0.04] border-orange-500/20"
                    : "bg-white/[0.03] border-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{plan.name}</h3>
                    {plan.popular && (
                      <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 rounded-full text-[9px] font-semibold text-orange-400">POPULAR</span>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xl font-bold text-white">₹{plan.price.toLocaleString()}</span>
                    <span className="text-xs text-white/30 ml-1">/ {plan.duration.toLowerCase()}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/25">works out to</p>
                    <p className="text-xs text-orange-400 font-medium">₹{plan.perMonth.toLocaleString()}/mo</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-3 mb-6">
            {gym.reviewList.map((r, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-400">{r.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{r.name}</p>
                      <p className="text-[10px] text-white/25">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} className={`w-3 h-3 ${s < r.rating ? "text-yellow-400" : "text-white/10"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-5 py-4 bg-[#0a0a0a] border-t border-white/[0.06] shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-white/30">Starts from</span>
            <div>
              <span className="text-xl font-bold text-white">₹{gym.plans[0].price.toLocaleString()}</span>
              <span className="text-xs text-white/30 ml-1">/mo</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("plans")}
            className="px-8 py-3 bg-orange-500 hover:brightness-110 text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2"
          >
            View Plans
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
