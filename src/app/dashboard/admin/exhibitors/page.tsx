"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ExternalLink, Search } from "lucide-react";

export default function ExhibitorDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const exhibitors = [
    {
      id: 1,
      name: "Urban Threads Co.",
      owner: "Mark Riley",
      tier: "Yearly Pro",
      status: "Verified",
      eventsCount: 3,
      joined: "Jan 26, 2026"
    },
    {
      id: 2,
      name: "EcoHome Solutions",
      owner: "Sarah Lane",
      tier: "PAYG",
      status: "Verified",
      eventsCount: 1,
      joined: "Jan 25, 2026"
    },
    {
      id: 3,
      name: "GamerSpace Tech",
      owner: "Alex Chen",
      tier: "Yearly Pro",
      status: "Verified",
      eventsCount: 4,
      joined: "Jan 26, 2026"
    },
    {
      id: 4,
      name: "Zenith Apparel",
      owner: "David Wu",
      tier: "PAYG",
      status: "Verified",
      eventsCount: 2,
      joined: "Jan 24, 2026"
    },
    {
      id: 5,
      name: "Aqua Marine Gear",
      owner: "Linda Frost",
      tier: "Yearly Pro",
      status: "Verified",
      eventsCount: 5,
      joined: "Jan 26, 2026"
    }
  ];

  const filtered = exhibitors.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Active Exhibitor Booths
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Exhibitor onboarding and KYB are verified centrally. To moderate submitted events, visit the Event Approval Queue.
          </p>
        </div>
        <Link
          href="/dashboard/admin/approvals"
          className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-orange-700 transition-all shadow-sm w-fit shrink-0"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Event Approval Queue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search exhibitor or manager..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-orange-500 shadow-2xs"
        />
      </div>

      {/* Unified List Container (Full-Width Content, Colored Text instead of Pills) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base truncate">
                    {item.name}
                  </h3>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600">
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                  <span>Manager: {item.owner}</span>
                  <span>•</span>
                  <span>Synced {item.joined}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-slate-100 sm:border-0">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-black uppercase tracking-wider ${
                      item.tier === "Yearly Pro" ? "text-orange-600" : "text-slate-600"
                    }`}
                  >
                    {item.tier}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-500">
                    {item.eventsCount} {item.eventsCount === 1 ? "Event" : "Events"}
                  </span>
                </div>

                <Link
                  href="/dashboard/admin/businesses"
                  className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3.5 py-2 rounded-xl font-bold text-xs hover:bg-orange-600 transition-all shrink-0"
                >
                  <span>View Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
