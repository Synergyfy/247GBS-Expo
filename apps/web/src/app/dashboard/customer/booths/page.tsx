"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";

const BOOTHS = [
  {
    id: "101",
    code: "BOOTH A-101",
    name: "TechFlow Solutions",
    location: "London, UK",
    category: "Technology",
    tags: "SaaS • Cloud",
    live: true,
    desc: "Enterprise-grade cloud architecture and AI deployment tools for modern startups.",
    image: "/main_stage_banner.png"
  },
  {
    id: "102",
    code: "BOOTH A-102",
    name: "FutureTech Systems",
    location: "San Francisco, CA",
    category: "Technology",
    tags: "Infrastructure • Edge",
    live: true,
    desc: "Building the next generation of zero-downtime enterprise cloud infrastructure.",
    image: "/hero.webp"
  },
  {
    id: "103",
    code: "BOOTH B-104",
    name: "Urban Threads Apparel",
    location: "Manchester, UK",
    category: "Fashion",
    tags: "Retail • Sustainable",
    live: false,
    desc: "Ethical fashion lines and direct wholesale ordering synced with MCOM Mall.",
    image: "/Creative-Couple-with-IHS-totes.webp"
  },
  {
    id: "104",
    code: "BOOTH B-201",
    name: "Vitality Health Labs",
    location: "Birmingham, UK",
    category: "Health",
    tags: "Diagnostics • Wellness",
    live: true,
    desc: "Connected health telemetry devices and preventative wellness programs.",
    image: "/ideal.png"
  },
  {
    id: "105",
    code: "BOOTH C-110",
    name: "Nordic Home Studio",
    location: "Stockholm, SE",
    category: "Home & Design",
    tags: "Interiors • Smart Home",
    live: false,
    desc: "Minimalist modular furniture and smart lighting systems for modern workspaces.",
    image: "/f265f1748035f3fe5d0e6839698aecfc.jpg"
  },
  {
    id: "106",
    code: "BOOTH C-208",
    name: "Apex Global Logistics",
    location: "Rotterdam, NL",
    category: "Services",
    tags: "Supply Chain • B2B",
    live: true,
    desc: "Automated cross-border fulfillment and customs clearance for MCOM merchants.",
    image: "/stats.png"
  }
];

export default function BoothsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Booths");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All Booths",
    "Technology",
    "Fashion",
    "Health",
    "Home & Design",
    "Services"
  ];

  const filteredBooths = BOOTHS.filter((b) => {
    const matchesCat =
      selectedCategory === "All Booths" || b.category === selectedCategory;
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Compact Header */}
      <div>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
          Expo Hall & Exhibitor Booths
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Explore virtual booths, watch live product demos, and shop directly on MCOM Mall.
        </p>
      </div>

      {/* Search & Peeping Horizontal Category Filter */}
      <div className="flex flex-col md:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search booth name, category, or hall code..."
            className="w-full pl-8 pr-7 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-medium focus:outline-none focus:border-orange-500 shadow-2xs"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-[11px] shrink-0 transition-colors ${
                selectedCategory === cat
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* BOOTHS GRID (Colored text metadata instead of pills) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {filteredBooths.map((booth) => (
          <Link
            key={booth.id}
            href={`/dashboard/customer/booths/${booth.id}`}
            className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-2xs border border-slate-200/80 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="h-36 sm:h-40 rounded-xl bg-slate-200 relative mb-3 overflow-hidden">
                <Image
                  src={booth.image}
                  alt={booth.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-orange-600">{booth.code}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">{booth.location}</span>
                </div>
                {booth.live ? (
                  <span className="text-emerald-600 font-extrabold">Live Now</span>
                ) : (
                  <span className="text-slate-400">Open 24/7</span>
                )}
              </div>

              <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
                {booth.name}
              </h3>

              <p className="text-slate-500 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                {booth.desc}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-3 text-[11px]">
              <span className="font-semibold text-slate-500 truncate">{booth.tags}</span>
              <span className="text-orange-600 font-bold group-hover:underline inline-flex items-center gap-1 shrink-0">
                <span>Visit Booth</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
