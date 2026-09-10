"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const turfData: Record<string, {
  name: string; location: string; rating: number; reviews: number; price: number;
  sport: string; distance: string; description: string;
  amenities: { icon: string; name: string }[];
  timings: string; phone: string; sizes: string[];
  reviewList: { name: string; rating: number; text: string; date: string }[];
}> = {
  "1": {
    name: "Green Arena Sports Complex",
    location: "Adyar, Chennai",
    rating: 4.8,
    reviews: 124,
    price: 1200,
    sport: "Cricket",
    distance: "2.3 km",
    description: "Premium cricket turf with international standard pitch, professional-grade floodlights, and fully maintained outfield. Perfect for league matches and practice sessions.",
    amenities: [
      { icon: "💡", name: "Floodlights" },
      { icon: "🅿️", name: "Parking" },
      { icon: "🚿", name: "Washrooms" },
      { icon: "🧊", name: "Drinking Water" },
      { icon: "👕", name: "Changing Room" },
      { icon: "🏏", name: "Equipment" },
    ],
    timings: "6:00 AM – 11:00 PM",
    phone: "+91 98765 43210",
    sizes: ["Full Ground", "Half Ground", "Net Practice"],
    reviewList: [
      { name: "Rahul S.", rating: 5, text: "Best cricket turf in Chennai! Pitch is well maintained and the floodlights are excellent.", date: "2 days ago" },
      { name: "Priya M.", rating: 4, text: "Great facilities, parking could be better. Overall a good experience.", date: "1 week ago" },
      { name: "Arun K.", rating: 5, text: "We play here every weekend. Consistent quality and friendly staff.", date: "2 weeks ago" },
    ],
  },
  "2": {
    name: "Pro Kick Football Turf",
    location: "Velachery, Chennai",
    rating: 4.6,
    reviews: 89,
    price: 800,
    sport: "Football",
    distance: "3.1 km",
    description: "FIFA-standard astroturf with excellent drainage system. Ideal for 5-a-side and 7-a-side matches. Well-lit for evening games.",
    amenities: [
      { icon: "💡", name: "Floodlights" },
      { icon: "🧊", name: "Drinking Water" },
      { icon: "👕", name: "Changing Room" },
      { icon: "⚽", name: "Equipment" },
    ],
    timings: "5:00 AM – 10:00 PM",
    phone: "+91 98765 43211",
    sizes: ["5v5", "7v7"],
    reviewList: [
      { name: "Vikram R.", rating: 5, text: "Amazing turf quality. Played a tournament here, absolutely loved it.", date: "3 days ago" },
      { name: "Deepak N.", rating: 4, text: "Good turf but gets crowded on weekends. Book early!", date: "1 week ago" },
    ],
  },
  "3": {
    name: "Smash Point Badminton",
    location: "T. Nagar, Chennai",
    rating: 4.9,
    reviews: 210,
    price: 600,
    sport: "Badminton",
    distance: "1.5 km",
    description: "Air-conditioned indoor badminton courts with synthetic flooring and professional lighting. Shuttlecocks and rackets available for rent.",
    amenities: [
      { icon: "❄️", name: "AC Court" },
      { icon: "🅿️", name: "Parking" },
      { icon: "🛍️", name: "Pro Shop" },
      { icon: "🧊", name: "Drinking Water" },
      { icon: "🚿", name: "Washrooms" },
      { icon: "🏸", name: "Equipment" },
    ],
    timings: "6:00 AM – 10:00 PM",
    phone: "+91 98765 43212",
    sizes: ["Single Court", "Double Court"],
    reviewList: [
      { name: "Meena K.", rating: 5, text: "Best badminton court in the city. AC courts are a game changer!", date: "1 day ago" },
      { name: "Suresh P.", rating: 5, text: "Professional setup, great flooring. Highly recommended.", date: "5 days ago" },
      { name: "Lakshmi R.", rating: 5, text: "Love the pro shop here. Great collection of rackets and shoes.", date: "2 weeks ago" },
    ],
  },
};

const fallback = turfData["1"];

const sportEmojis: Record<string, string> = {
  Cricket: "🏏", Football: "⚽", Badminton: "🏸", Tennis: "🎾", Basketball: "🏀",
};

export default function TurfDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const turf = turfData[id] || fallback;
  const [activeTab, setActiveTab] = useState<"overview" | "reviews">("overview");
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Hero area */}
      <div className="relative h-56 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02] flex items-center justify-center">
          <span className="text-6xl opacity-20">{sportEmojis[turf.sport] || "🏟️"}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />

        {/* Nav overlay */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-5">
          <button onClick={() => router.back()} className="w-9 h-9 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            <button className="w-9 h-9 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
            <button className="w-9 h-9 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`rounded-full transition-all ${imgIndex === i ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/30"}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0 px-5">
        {/* Title section */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-1">
            <h1 className="text-xl font-bold text-gray-900 flex-1 pr-4">{turf.name}</h1>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-gray-900">{turf.rating}</span>
              <span className="text-xs text-gray-500">({turf.reviews} reviews)</span>
            </div>
            <span className="text-gray-300">·</span>
            <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-[10px] text-primary font-medium">{turf.sport}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-xs text-gray-400">{turf.location}</span>
            <span className="text-gray-300 mx-0.5">·</span>
            <span className="text-xs text-gray-400">{turf.distance}</span>
          </div>
        </div>

        {/* Quick info row */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-gray-900">₹{turf.price}</p>
            <p className="text-[10px] text-gray-500">per hour</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <p className="text-sm font-semibold text-gray-900">{turf.timings.split("–")[0].trim()}</p>
            <p className="text-[10px] text-gray-500">Opens</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <p className="text-sm font-semibold text-gray-900">{turf.distance}</p>
            <p className="text-[10px] text-gray-500">Away</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-50 rounded-xl p-1 mb-5">
          {(["overview", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "overview" ? "Overview" : `Reviews (${turf.reviews})`}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <>
            {/* Description */}
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-xs text-gray-400 leading-relaxed">{turf.description}</p>
            </div>

            {/* Sizes / Court types */}
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-2">Available Options</h2>
              <div className="flex flex-wrap gap-2">
                {turf.sizes.map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-400">{s}</span>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h2>
              <div className="grid grid-cols-3 gap-2">
                {turf.amenities.map((a) => (
                  <div key={a.name} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                    <span className="text-lg">{a.icon}</span>
                    <p className="text-[10px] text-gray-400 mt-1">{a.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timings & Contact */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-2">Info</h2>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{turf.timings}</p>
                    <p className="text-[10px] text-gray-500">Open today</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{turf.phone}</p>
                    <p className="text-[10px] text-gray-500">Call to enquire</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-3 mb-6">
            {turf.reviewList.map((r, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{r.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">{r.name}</p>
                      <p className="text-[10px] text-gray-500">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} className={`w-3 h-3 ${s < r.rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-5 py-4 bg-white border-t border-gray-200 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">₹{turf.price}</span>
            <span className="text-xs text-gray-500 ml-1">/hr</span>
          </div>
          <Link
            href={`/turfs/${id}/book`}
            className="px-8 py-3 bg-primary hover:brightness-110 text-black font-semibold text-sm rounded-xl transition-all flex items-center gap-2"
          >
            Book Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
