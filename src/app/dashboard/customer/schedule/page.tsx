"use client";

import {
  Download,
  Bell,
  Search,
  Play,
  Timer,
  Star,
  Video,
  ArrowRight,
  X
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const scheduleData = [
  {
    id: 1,
    time: "09:00 AM",
    duration: "45 MIN",
    title: "Opening Keynote: The Future of Digital Retail",
    speaker: "Sarah Johnson",
    role: "CEO at NextGen Commerce",
    track: "Main Stage",
    type: "Keynote",
    status: "Completed",
    isLive: false
  },
  {
    id: 2,
    time: "10:30 AM",
    duration: "60 MIN",
    title: "Panel: AI in Customer Support & Commerce",
    speaker: "Tech Leaders Panel",
    role: "Multi-Brand Discussion",
    track: "Workshop A",
    type: "Panel",
    status: "Live",
    isLive: true
  },
  {
    id: 3,
    time: "01:00 PM",
    duration: "90 MIN",
    title: "Product Demo: NextGen MCOM Mall Sync",
    speaker: "FutureTech Team",
    role: "Lead Systems Engineers",
    track: "Demo Hall B",
    type: "Demo",
    status: "Upcoming",
    isLive: false
  },
  {
    id: 4,
    time: "02:30 PM",
    duration: "60 MIN",
    title: "Workshop: Scaling Global Digital Booths",
    speaker: "Emily Chen",
    role: "Growth Director",
    track: "Workshop A",
    type: "Workshop",
    status: "Upcoming",
    isLive: false
  },
  {
    id: 5,
    time: "04:00 PM",
    duration: "45 MIN",
    title: "Closing Remarks & Live Buyer Networking",
    speaker: "247GBS Expo Host",
    role: "Executive Committee",
    track: "Main Stage",
    type: "Networking",
    status: "Upcoming",
    isLive: false
  }
];

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = scheduleData.filter((e) => {
    const matchesTab =
      activeTab === "All" || e.type === activeTab || e.track === activeTab;
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.track.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const scheduleStats = [
    {
      label: "Current Session",
      val: "AI in Customer Support",
      sub: "Workshop A • Live Now",
      icon: Play,
      iconColor: "text-red-600"
    },
    {
      label: "Up Next",
      val: "MCOM Mall Sync Demo",
      sub: "01:00 PM • Demo Hall B",
      icon: Timer,
      iconColor: "text-orange-600"
    },
    {
      label: "My Saved Plan",
      val: "3 Sessions",
      sub: "Reminders active",
      icon: Star,
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Compact Header (No decorative pills) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Live Event Schedule
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Interactive workshops, keynote speakers, and live exhibitor product demos.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/80 rounded-xl text-slate-700 text-[11px] font-bold hover:bg-slate-50 transition-all shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-orange-600" />
            <span>Agenda PDF</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-xl text-[11px] font-bold hover:bg-orange-700 transition-all shadow-xs"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Reminders</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scroll KPI Strip on Mobile (Peeping Card + Dot Slider, Inline Small Icons) */}
      <div>
        <div className="flex lg:grid lg:grid-cols-3 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {scheduleStats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="w-[46%] min-w-[156px] sm:w-[210px] lg:w-auto shrink-0 snap-start p-3 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {stat.label}
                  </span>
                  <IconComponent className={`w-3.5 h-3.5 ${stat.iconColor} shrink-0`} />
                </div>
                <p className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                  {stat.val}
                </p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-1.5 lg:hidden">
          <span className="w-3.5 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Search & Peeping Horizontal Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search session title, speaker, or hall..."
            className="w-full pl-8 pr-7 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium outline-none focus:border-orange-500 shadow-2xs"
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
          {["All", "Keynote", "Panel", "Workshop", "Demo", "Main Stage"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all ${
                activeTab === tab
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Schedule List Container (Clean 3-Line Mobile Rows, Colored Text Metadata) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden divide-y divide-slate-100">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="p-3.5 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="space-y-1 min-w-0 flex-1">
              {/* Line 1: Time • Duration • Type • Track + Status */}
              <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span className="text-slate-900 font-extrabold shrink-0">{event.time}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400 shrink-0">{event.duration}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-orange-600 shrink-0">{event.type}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 truncate">{event.track}</span>
                </div>
                <span
                  className={`shrink-0 font-extrabold ${
                    event.status === "Live"
                      ? "text-red-600"
                      : event.status === "Completed"
                      ? "text-slate-400"
                      : "text-emerald-600"
                  }`}
                >
                  {event.status === "Live" ? "● LIVE NOW" : event.status}
                </span>
              </div>

              {/* Line 2: Session Title */}
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {event.title}
              </h3>

              {/* Line 3: Speaker & Role + Mobile Action */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <p className="text-[11px] text-slate-500 truncate">
                  <span className="font-semibold text-slate-700">{event.speaker}</span>
                  <span className="mx-1.5 text-slate-300">•</span>
                  <span>{event.role}</span>
                </p>

                <div className="shrink-0">
                  {event.status === "Live" ? (
                    <Link
                      href="/dashboard/customer/events/spring2026/lobby"
                      className="inline-flex items-center gap-1 bg-orange-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg hover:bg-orange-700 transition-all shadow-2xs"
                    >
                      <Video className="w-3 h-3" />
                      <span>Join Live</span>
                    </Link>
                  ) : event.status === "Completed" ? (
                    <span className="text-[11px] font-bold text-slate-400">Ended</span>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 bg-slate-900 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-all"
                    >
                      <span>Save Slot</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
