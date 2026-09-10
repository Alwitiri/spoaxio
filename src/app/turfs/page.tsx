"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const sportFilters = ["All", "Cricket", "Football", "Badminton", "Tennis", "Basketball", "Volleyball"];

const turfs = [
  {
    id: "1",
    name: "Green Arena Sports Complex",
    location: "Adyar, Chennai",
    rating: 4.8,
    reviews: 124,
    price: 1200,
    priceUnit: "hr",
    sport: "Cricket",
    image: null,
    distance: "2.3 km",
    amenities: ["Floodlights", "Parking", "Washrooms"],
    featured: true,
  },
  {
    id: "2",
    name: "Pro Kick Football Turf",
    location: "Velachery, Chennai",
    rating: 4.6,
    reviews: 89,
    price: 800,
    priceUnit: "hr",
    sport: "Football",
    image: null,
    distance: "3.1 km",
    amenities: ["Floodlights", "Drinking Water"],
    featured: false,
  },
  {
    id: "3",
    name: "Smash Point Badminton",
    location: "T. Nagar, Chennai",
    rating: 4.9,
    reviews: 210,
    price: 600,
    priceUnit: "hr",
    sport: "Badminton",
    image: null,
    distance: "1.5 km",
    amenities: ["AC Court", "Parking", "Pro Shop"],
    featured: true,
  },
  {
    id: "4",
    name: "Chennai Cricket Hub",
    location: "Porur, Chennai",
    rating: 4.5,
    reviews: 67,
    price: 1500,
    priceUnit: "hr",
    sport: "Cricket",
    image: null,
    distance: "5.8 km",
    amenities: ["Floodlights", "Nets", "Parking"],
    featured: false,
  },
  {
    id: "5",
    name: "Ace Tennis Academy",
    location: "Anna Nagar, Chennai",
    rating: 4.7,
    reviews: 156,
    price: 900,
    priceUnit: "hr",
    sport: "Tennis",
    image: null,
    distance: "4.2 km",
    amenities: ["Clay Court", "Coaching", "Parking"],
    featured: false,
  },
  {
    id: "6",
    name: "Goal Zone Arena",
    location: "OMR, Chennai",
    rating: 4.4,
    reviews: 52,
    price: 1000,
    priceUnit: "hr",
    sport: "Football",
    image: null,
    distance: "6.5 km",
    amenities: ["Floodlights", "Astroturf", "Washrooms"],
    featured: false,
  },
];

const sportEmojis: Record<string, string> = {
  Cricket: "🏏",
  Football: "⚽",
  Badminton: "🏸",
  Tennis: "🎾",
  Basketball: "🏀",
  Volleyball: "🏐",
};

export default function TurfsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeSport, setActiveSport] = useState("All");
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">("distance");

  const filtered = turfs.filter((t) => {
    const matchesSport = activeSport === "All" || t.sport === activeSport;
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.push("/home")} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">Find Turfs</h1>
            <p className="text-[11px] text-gray-500">Chennai</p>
          </div>
          <button className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search turfs by name or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[44px] pl-10 pr-4 bg-gray-50 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 outline-none border border-gray-200 focus:border-primary/40 transition-all"
          />
        </div>

        {/* Sport filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {sportFilters.map((sport) => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                activeSport === sport
                  ? "bg-primary/15 border-primary/30 text-primary"
                  : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-500"
              }`}
            >
              {sport !== "All" && <span className="mr-1">{sportEmojis[sport]}</span>}
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Sort bar */}
      <div className="px-5 py-2 flex items-center justify-between shrink-0">
        <p className="text-xs text-gray-500">{sorted.length} turfs found</p>
        <div className="flex gap-1.5">
          {(["distance", "price", "rating"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                sortBy === s ? "bg-gray-100 text-gray-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {s === "distance" ? "Nearest" : s === "price" ? "Price" : "Top Rated"}
            </button>
          ))}
        </div>
      </div>

      {/* Turf cards */}
      <div className="flex-1 overflow-y-auto min-h-0 px-5 pb-6">
        <div className="space-y-3">
          {sorted.map((turf) => (
            <Link
              key={turf.id}
              href={`/turfs/${turf.id}`}
              className="block bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:bg-gray-100 transition-all group"
            >
              {/* Image placeholder */}
              <div className="h-36 bg-gradient-to-br from-white/[0.04] to-white/[0.02] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-30">{sportEmojis[turf.sport] || "🏟️"}</span>
                </div>
                {turf.featured && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg">
                    <span className="text-[10px] font-semibold text-primary">Featured</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[11px] font-medium text-gray-900">{turf.rating}</span>
                  <span className="text-[10px] text-gray-400">({turf.reviews})</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Info */}
              <div className="px-4 pb-4 -mt-2 relative">
                <h3 className="text-[15px] font-semibold text-gray-900 mb-1 group-hover:text-primary/90 transition-colors">{turf.name}</h3>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <svg className="w-3 h-3 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-xs text-gray-400">{turf.location}</span>
                  <span className="text-gray-300 mx-1">·</span>
                  <span className="text-xs text-gray-400">{turf.distance}</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {turf.amenities.map((a) => (
                    <span key={a} className="px-2 py-0.5 bg-gray-50 rounded-md text-[10px] text-gray-500">{a}</span>
                  ))}
                </div>

                {/* Price + Sport tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-[10px] text-primary font-medium">
                      {turf.sport}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-gray-900">₹{turf.price}</span>
                    <span className="text-xs text-gray-500 ml-0.5">/{turf.priceUnit}</span>
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
