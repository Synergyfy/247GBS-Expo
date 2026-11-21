"use client";

import React, { useState } from "react";
import {
  Search,
  Calendar,
  ArrowRight,
  MessageSquare,
  Globe,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { events } from "@/data/events";
import B2BChatbot from "@/app/component/B2BChatbot";

const FALLBACK_IMAGES = [
  "/main_stage_banner.png",
  "/hero.webp",
  "/ideal.png",
  "/f265f1748035f3fe5d0e6839698aecfc.jpg"
];

export default function BusinessMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const categories = [
    "All",
    "Technology",
    "Trade",
    "Finance",
    "Retail",
    "Health",
    "Environment"
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearchText =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || event.category === activeCategory;
    return matchesSearchText && matchesCategory;
  });

  const handleInquire = (event: any) => {
    setSelectedEvent(event);
    setIsChatOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Compact Header (No decorative pills) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Event Discovery Center
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Explore seasonal exhibitions across the platform and apply to exhibit your booth.
          </p>
        </div>
        <Link
          href="/dashboard/business/events/create"
          className="px-3.5 py-2 bg-orange-600 text-white rounded-xl font-bold text-xs hover:bg-orange-700 transition-all shadow-xs w-fit shrink-0"
        >
          Host Your Own Event
        </Link>
      </div>

      {/* Search & Peeping Horizontal Category Filter */}
      <div className="flex flex-col md:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search events, industries, or organizers..."
            className="w-full pl-8 pr-7 py-2 bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-medium text-slate-900 shadow-2xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all text-[11px] shrink-0 ${
                activeCategory === cat
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:border-orange-200 hover:text-orange-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Event Grid (Compact cards, colored text metadata instead of pills) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {filteredEvents.map((event, idx) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all group overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-36 sm:h-40 w-full bg-slate-200 overflow-hidden">
                <Image
                  src={FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]}
                  alt={event.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 left-3 bg-slate-950/75 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-orange-400" />
                  <span>{event.date}</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 space-y-2">
                <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 min-w-0 truncate">
                    <span className="text-orange-600 truncate">{event.organizer}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 shrink-0">{event.category}</span>
                  </div>
                  <span className="text-emerald-600 shrink-0">2k+ Booths</span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                  {event.name}
                </h3>

                <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                  {event.description}
                </p>

                <div className="text-[10px] font-semibold text-slate-500 pt-1 truncate">
                  {event.benefits.slice(0, 2).join(" • ")}
                </div>
              </div>
            </div>

            <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-2.5 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleInquire(event)}
                className="flex-1 bg-slate-900 text-white py-2 rounded-xl font-bold text-xs hover:bg-orange-600 transition-all flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Inquire to Exhibit</span>
              </button>
              <Link
                href="/dashboard/business/events/create"
                className="p-2 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-all"
                aria-label="Apply for event"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="col-span-full py-12 bg-white rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-4">
            <Globe className="w-8 h-8 text-slate-300 mb-2" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase mb-1">
              No events found matching your search
            </h3>
            <p className="text-[11px] text-slate-500 max-w-xs mb-3">
              Try broadening your search criteria or explore other industries.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
              className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-orange-700 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* B2B Chatbot Instance */}
      {selectedEvent && (
        <B2BChatbot
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          eventName={selectedEvent.name}
          organizer={selectedEvent.organizer}
        />
      )}
    </div>
  );
}
