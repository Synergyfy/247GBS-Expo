"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Search,
  Play,
  Star,
  ArrowRight,
  Check,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/app/component/Modal";

const EVENTS = [
  {
    id: "spring2026",
    title: "Global Innovation Fair 2026",
    date: "Apr 10 – Apr 19, 2026",
    location: "Virtual Main Hall",
    price: "From £19",
    category: "Technology",
    isLive: true,
    image: "/main_stage_banner.png",
    description:
      "The world's premier digital innovation showcase. Experience cutting-edge tech, AI demonstrations, and keynote speeches from industry leaders.",
    benefits: ["Access to 500+ Booths", "Live Keynotes", "Networking Lounge"],
    rating: 4.8,
    reviews: 124,
    organizer: "TechGlobal Inc."
  },
  {
    id: "summer2026",
    title: "Summer Trade Carnival",
    date: "Jul 15 – Jul 24, 2026",
    location: "Expo Center Alpha",
    price: "Free Entry",
    category: "Trade",
    isLive: false,
    image: "/hero.webp",
    description:
      "A vibrant marketplace for global traders. Source products from MCOM Mall partners, meet suppliers, and explore new market trends.",
    benefits: ["Direct Supplier Chat", "Wholesale MCOM Deals", "Export Workshops"],
    rating: 4.5,
    reviews: 89,
    organizer: "World Trade Group"
  },
  {
    id: "techsummit",
    title: "Future Tech Summit",
    date: "Aug 05 – Aug 08, 2026",
    location: "Innovation Hub",
    price: "From £49",
    category: "Technology",
    isLive: false,
    image: "/ideal.png",
    description:
      "Deep dive into next-generation enterprise technology. Workshops on quantum computing, biotech, and AI automation.",
    benefits: ["Certified Workshops", "Expert Q&A", "Digital Courseware"],
    rating: 4.9,
    reviews: 210,
    organizer: "Future Minds"
  },
  {
    id: "creative",
    title: "Digital Arts & Media Expo",
    date: "Sep 12 – Sep 14, 2026",
    location: "Creative Quarter",
    price: "From £15",
    category: "Art & Design",
    isLive: false,
    image: "/f265f1748035f3fe5d0e6839698aecfc.jpg",
    description:
      "Celebrating digital creativity, 3D brand showcases, and live interactive design sessions.",
    benefits: ["Creator Showcases", "Studio Meetups", "Creative Tools Demo"],
    rating: 4.7,
    reviews: 56,
    organizer: "ArtBlock Studio"
  }
];

export default function DiscoverEventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [joinedEvents] = useState<string[]>(["spring2026"]);

  const categories = ["All", "Technology", "Trade", "Art & Design"];

  const filteredEvents = EVENTS.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === "All" || e.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Compact Header */}
      <div>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
          Discover Events
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Explore live exhibitions, seasonal summits, and interactive trade fairs.
        </p>
      </div>

      {/* Search & Peeping Horizontal Category Filter */}
      <div className="flex flex-col md:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search events, organizers, or topics..."
            className="w-full pl-8 pr-7 py-2 rounded-xl bg-white border border-slate-200/80 focus:outline-none focus:border-orange-500 shadow-2xs text-xs font-medium"
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
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-[11px] shrink-0 transition-all ${
                categoryFilter === cat
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
          >
            {/* Compact Event Image */}
            <div className="h-36 sm:h-44 relative overflow-hidden bg-slate-200">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2.5 right-2.5 bg-slate-950/75 backdrop-blur-xs text-white px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {event.rating} ({event.reviews})
              </div>
            </div>

            {/* Event Content (Colored text metadata instead of pills) */}
            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <div className="flex items-center gap-1.5 min-w-0 truncate">
                    <span className="text-orange-600 truncate">{event.organizer}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 shrink-0">{event.category}</span>
                  </div>
                  {event.isLive ? (
                    <span className="text-red-600 font-extrabold shrink-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                      LIVE
                    </span>
                  ) : (
                    <span className="text-slate-400 shrink-0">Upcoming</span>
                  )}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                  {event.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-medium mt-1.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {event.location}
                  </span>
                </div>

                <p className="text-slate-500 mt-2 line-clamp-2 text-[11px] leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                    Access
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {event.price}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {event.isLive && (
                    <Link
                      href={`/dashboard/customer/events/${event.id}/lobby`}
                      className="px-3 py-1.5 bg-orange-600 text-white rounded-xl font-bold text-[11px] hover:bg-orange-700 transition-all"
                    >
                      Enter Live
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-xl font-bold text-[11px] hover:bg-orange-600 transition-all flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EVENT DETAILS MODAL */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || "Event Details"}
      >
        {selectedEvent && (
          <div className="space-y-4">
            {/* Compact Video / Hero Preview */}
            <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video group cursor-pointer">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                fill
                className="object-cover opacity-65"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 bg-white/20 backdrop-blur-xs rounded-full flex items-center justify-center border border-white/40">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-2.5 left-3 text-white font-bold text-[11px]">
                Watch Preview Trailer
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-4 border-b border-slate-200">
              {["overview", "schedule", "reviews"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 font-bold text-xs capitalize border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-slate-400 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "overview" && (
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {selectedEvent.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <h5 className="font-bold text-slate-900 text-xs mb-1.5">Included Benefits</h5>
                      <ul className="space-y-1">
                        {selectedEvent.benefits.map((benefit: string, i: number) => (
                          <li key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0" /> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-[11px]">
                      <h5 className="font-bold text-slate-900 text-xs mb-1.5">Event Details</h5>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Organizer:</span>
                        <span className="font-bold text-slate-900">{selectedEvent.organizer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Hall:</span>
                        <span className="font-bold text-slate-900">{selectedEvent.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Pass Valid:</span>
                        <span className="font-bold text-emerald-600">Season Pass Accepted</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "schedule" && (
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2.5 flex items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900">Opening Keynote</div>
                      <div className="text-[11px] text-slate-500">
                        Main Stage • {selectedEvent.organizer}
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-orange-600 shrink-0">
                      10:00 AM
                    </span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900">Tech Demos & Booth Visits</div>
                      <div className="text-[11px] text-slate-500">Exhibition Hall A</div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 shrink-0">
                      11:30 AM
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-extrabold text-slate-900">
                      {selectedEvent.rating}
                    </div>
                    <div>
                      <div className="flex text-amber-400 text-xs">★★★★★</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase">
                        {selectedEvent.reviews} Verified Attendees
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-slate-900">Alex M.</span>
                      <span className="text-[10px] text-slate-400">2 days ago</span>
                    </div>
                    <p>&ldquo;Seamless virtual booths and instant MCOM product links!&rdquo;</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {joinedEvents.includes(selectedEvent.id) ? (
                <>
                  <div>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                      Pass Verified
                    </p>
                    <p className="text-sm font-extrabold text-slate-900">Registered</p>
                  </div>
                  <Link
                    href={
                      selectedEvent.isLive
                        ? `/dashboard/customer/events/${selectedEvent.id}/lobby`
                        : "/dashboard/customer/tickets"
                    }
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{selectedEvent.isLive ? "Enter Event Lobby" : "View Ticket"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      Entry Price
                    </p>
                    <p className="text-sm font-extrabold text-slate-900">{selectedEvent.price}</p>
                  </div>
                  <Link
                    href={`/tickets?season=${selectedEvent.id}`}
                    className="px-4 py-2 bg-orange-600 text-white rounded-xl font-bold text-xs hover:bg-orange-700 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Get Access Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
