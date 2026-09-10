"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const filters = ["All", "Gym", "CrossFit", "Yoga", "Martial Arts", "Pilates"];

const gyms = [
  {
    id: "1",
    name: "Iron Temple Fitness",
    location: "Anna Nagar, Chennai",
    rating: 4.8,
    reviews: 312,
    price: 2500,
    priceUnit: "month",
    type: "Gym",
    distance: "1.8 km",
    amenities: ["AC", "Parking", "Personal Trainer", "Steam Room"],
    featured: true,
    openNow: true,
  },
  {
    id: "2",
    name: "FlexZone CrossFit Box",
    location: "Velachery, Chennai",
    rating: 4.7,
    reviews: 189,
    price: 3500,
    priceUnit: "month",
    type: "CrossFit",
    distance: "3.4 km",
    amenities: ["Olympic Lifting", "Coaching", "Parking"],
    featured: false,
    openNow: true,
  },
  {
    id: "3",
    name: "Zen Yoga Studio",
    location: "T. Nagar, Chennai",
    rating: 4.9,
    reviews: 245,
    price: 2000,
    priceUnit: "month",
    type: "Yoga",
    distance: "2.1 km",
    amenities: ["AC Studio", "Props Provided", "Meditation Room"],
    featured: true,
    openNow: false,
  },
  {
    id: "4",
    name: "Beast Mode Gym",
    location: "OMR, Chennai",
    rating: 4.5,
    reviews: 167,
    price: 1800,
    priceUnit: "month",
    type: "Gym",
    distance: "5.2 km",
    amenities: ["24/7 Access", "Cardio Zone", "Free Weights"],
    featured: false,
    openNow: true,
  },
  {
    id: "5",
    name: "Tiger MMA Academy",
    location: "Adyar, Chennai",
    rating: 4.6,
    reviews: 98,
    price: 4000,
    priceUnit: "month",
    type: "Martial Arts",
    distance: "2.8 km",
    amenities: ["Boxing Ring", "MMA Cage", "Coaching"],
    featured: false,
    openNow: true,
  },
  {
    id: "6",
    name: "Core Pilates Chennai",
    location: "Nungambakkam, Chennai",
    rating: 4.8,
    reviews: 134,
    price: 3000,
    priceUnit: "month",
    type: "Pilates",
    distance: "3.9 km",
    amenities: ["Reformer", "Small Groups", "AC"],
    featured: false,
    openNow: false,
  },
];

const typeEmojis: Record<string, string> = {
  Gym: "🏋️",
  CrossFit: "💪",
  Yoga: "🧘",
  "Martial Arts": "🥊",
  Pilates: "🤸",
};

export default function GymsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">("distance");

  const filtered = gyms.filter((g) => {
    const matchesType = activeType === "All" || g.type === activeType;
    const matchesSearch =
      !search ||
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.location.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  return (
    <div className="fixed inset-0 bg-[#060606] flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.push("/home")} className="w-9 h-9 bg-white/[0.06] rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">Find Gyms</h1>
            <p className="text-[11px] text-white/30">Chennai</p>
          </div>
          <button className="w-9 h-9 bg-white/[0.06] rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search gyms by name or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[44px] pl-10 pr-4 bg-white/[0.04] rounded-xl text-white text-sm placeholder:text-white/20 outline-none border border-white/[0.06] focus:border-orange-500/40 transition-all"
          />
        </div>

        {/* Type filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveType(f)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                activeType === f
                  ? "bg-orange-500/15 border-orange-500/30 text-orange-400"
                  : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:text-white/60"
              }`}
            >
              {f !== "All" && <span className="mr-1">{typeEmojis[f]}</span>}
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sort bar */}
      <div className="px-5 py-2 flex items-center justify-between shrink-0">
        <p className="text-xs text-white/30">{sorted.length} gyms found</p>
        <div className="flex gap-1.5">
          {(["distance", "price", "rating"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                sortBy === s ? "bg-white/[0.08] text-white/70" : "text-white/25 hover:text-white/40"
              }`}
            >
              {s === "distance" ? "Nearest" : s === "price" ? "Price" : "Top Rated"}
            </button>
          ))}
        </div>
      </div>

      {/* Gym cards */}
      <div className="flex-1 overflow-y-auto min-h-0 px-5 pb-6">
        <div className="space-y-3">
          {sorted.map((gym) => (
            <Link
              key={gym.id}
              href={`/gyms/${gym.id}`}
              className="block bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-all group"
            >
              {/* Image placeholder */}
              <div className="h-36 bg-gradient-to-br from-white/[0.04] to-white/[0.02] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-30">{typeEmojis[gym.type] || "🏋️"}</span>
                </div>
                {gym.featured && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-lg">
                    <span className="text-[10px] font-semibold text-orange-400">Featured</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {gym.openNow && (
                    <div className="px-2 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg">
                      <span className="text-[10px] font-medium text-primary">Open Now</span>
                    </div>
                  )}
                  <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg flex items-center gap-1">
                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-[11px] font-medium text-white">{gym.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#060606] to-transparent" />
              </div>

              {/* Info */}
              <div className="px-4 pb-4 -mt-2 relative">
                <h3 className="text-[15px] font-semibold text-white mb-1 group-hover:text-orange-400/90 transition-colors">{gym.name}</h3>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <svg className="w-3 h-3 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-xs text-white/40">{gym.location}</span>
                  <span className="text-white/10 mx-1">·</span>
                  <span className="text-xs text-white/40">{gym.distance}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {gym.amenities.map((a) => (
                    <span key={a} className="px-2 py-0.5 bg-white/[0.04] rounded-md text-[10px] text-white/30">{a}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded-md text-[10px] text-orange-400 font-medium">
                    {gym.type}
                  </span>
                  <div className="text-right">
                    <span className="text-base font-bold text-white">₹{gym.price.toLocaleString()}</span>
                    <span className="text-xs text-white/30 ml-0.5">/{gym.priceUnit}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
