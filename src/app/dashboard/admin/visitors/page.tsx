"use client";

import React, { useState } from "react";
import {
  Search,
  MoreVertical,
  Mail,
  User,
  Ticket,
  CreditCard,
  History,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  MapPin,
  Award,
  X
} from "lucide-react";

interface Visitor {
  id: string;
  name: string;
  email: string;
  type: "Guest" | "Standard" | "VIP";
  country: string;
  joinDate: string;
  ticketsPurchased: number;
  totalSpent: string;
  lastActive: string;
}

const MOCK_VISITORS: Visitor[] = [
  {
    id: "v_1",
    name: "Samuel Etim",
    email: "samuel@example.com",
    type: "VIP",
    country: "Nigeria",
    joinDate: "2026-01-05",
    ticketsPurchased: 8,
    totalSpent: "£620.00",
    lastActive: "2 hours ago"
  },
  {
    id: "v_2",
    name: "Emma Wilson",
    email: "emma.w@domain.com",
    type: "Standard",
    country: "UK",
    joinDate: "2026-01-12",
    ticketsPurchased: 3,
    totalSpent: "£145.00",
    lastActive: "Active now"
  },
  {
    id: "v_3",
    name: "Chen Wei",
    email: "chen.wei@china-hub.cn",
    type: "Guest",
    country: "China",
    joinDate: "2026-02-05",
    ticketsPurchased: 0,
    totalSpent: "£0.00",
    lastActive: "5 days ago"
  },
  {
    id: "v_4",
    name: "Isabella Garcia",
    email: "isabella@tech.es",
    type: "VIP",
    country: "Spain",
    joinDate: "2025-12-15",
    ticketsPurchased: 12,
    totalSpent: "£1,240.00",
    lastActive: "1 day ago"
  }
];

export default function AdminVisitorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredVisitors = MOCK_VISITORS.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || visitor.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const stats = [
    { label: "Total Visitors", val: "42,891", sub: "+12% this month", icon: <User className="w-4 h-4 text-blue-600 shrink-0" /> },
    { label: "Ticket Revenue", val: "£284k", sub: "+5.4% growth", icon: <CreditCard className="w-4 h-4 text-orange-600 shrink-0" /> },
    { label: "Active Passes", val: "8,412", sub: "19% conversion", icon: <Award className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { label: "Retention", val: "64%", sub: "Repeat visitors", icon: <History className="w-4 h-4 text-purple-600 shrink-0" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Compact Header — No decorative pills */}
      <div>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
          Attendees & Visitors
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Monitor attendee registrations, season pass redemptions, and platform engagement.
        </p>
      </div>

      {/* Horizontal Scroll KPI Cards on Mobile with Peeping Card + Dot Indicator */}
      <div>
        <div className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {stats.map((s, i) => (
            <div
              key={i}
              className="w-[62vw] min-w-[200px] max-w-[250px] lg:w-auto shrink-0 snap-start bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1.5 mb-1.5">
                <span className="text-xs font-bold text-slate-500 truncate">
                  {s.label}
                </span>
                {s.icon}
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                {s.val}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1 truncate">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2 lg:hidden">
          <span className="w-4 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Control Bar: Search + Horizontal Scrollable Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Filter by visitor name or email..."
            className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:border-orange-500 text-xs sm:text-sm font-medium shadow-2xs"
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
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5 md:pb-0">
          {["All", "VIP", "Standard", "Guest"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                typeFilter === type
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Visitor Directory (Desktop Table + Mobile Stacked List without Bulky Avatar Columns) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Visitor Profile
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Pass Tier
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Engagement
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Last Active
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-sm text-slate-900 leading-tight">
                      {visitor.name}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {visitor.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-black uppercase tracking-wider ${
                        visitor.type === "VIP"
                          ? "text-purple-600"
                          : visitor.type === "Standard"
                          ? "text-blue-600"
                          : "text-slate-500"
                      }`}
                    >
                      {visitor.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-6">
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase block">
                          Tickets
                        </span>
                        <div className="flex items-center gap-1">
                          <Ticket className="w-3.5 h-3.5 text-orange-500" />
                          <span className="text-xs font-black text-slate-900">
                            {visitor.ticketsPurchased}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase block">
                          Spent
                        </span>
                        <span className="text-xs font-black text-slate-900">
                          {visitor.totalSpent}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-700">{visitor.lastActive}</p>
                    <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3" /> {visitor.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        className="p-2 bg-white border border-slate-200/80 rounded-lg text-slate-500 hover:text-orange-600 hover:border-orange-200 transition-all"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-2 bg-white border border-slate-200/80 rounded-lg text-slate-500 hover:text-orange-600 hover:border-orange-200 transition-all"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked List (Full-Width Text, Colored Status Text instead of Pills) */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredVisitors.map((visitor) => (
            <div key={visitor.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-extrabold text-sm text-slate-900 truncate">
                    {visitor.name}
                  </p>
                  <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
                    {visitor.email}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-black uppercase tracking-wider shrink-0 ${
                    visitor.type === "VIP"
                      ? "text-purple-600"
                      : visitor.type === "Standard"
                      ? "text-blue-600"
                      : "text-slate-500"
                  }`}
                >
                  {visitor.type}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-500 flex items-center gap-1 font-semibold">
                    <MapPin className="w-3 h-3 text-slate-400" /> {visitor.country}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-700">
                    {visitor.ticketsPurchased} Tickets
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-black text-slate-900">{visitor.totalSpent}</span>
                </div>
                <button
                  type="button"
                  className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-orange-600"
                  aria-label="Inspect Visitor"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Controls */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500">Page 1 of 429</p>
          <div className="flex gap-1.5">
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
