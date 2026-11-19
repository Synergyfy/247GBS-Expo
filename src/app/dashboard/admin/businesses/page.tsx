"use client";

import React, { useState } from "react";
import {
  Search,
  MoreVertical,
  Mail,
  Building2,
  ShieldCheck,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Trophy,
  TrendingUp,
  X
} from "lucide-react";

interface Business {
  id: string;
  name: string;
  owner: string;
  email: string;
  cac: string;
  status: "Standard" | "Verified" | "Premium";
  dateSynced: string;
  revenue: string;
  eventsHeld: number;
  location: string;
}

const MOCK_BUSINESSES: Business[] = [
  {
    id: "biz_1",
    name: "TechGlobal Solutions Ltd",
    owner: "Abiodun Okoro",
    email: "contact@techglobal.com",
    cac: "RC-1234567",
    status: "Premium",
    dateSynced: "2026-01-15",
    revenue: "£1.2M",
    eventsHeld: 14,
    location: "Lagos, Nigeria"
  },
  {
    id: "biz_2",
    name: "Creative Wave Media",
    owner: "Sarah Jenkins",
    email: "sarah@creativewave.uk",
    cac: "UK-998877",
    status: "Verified",
    dateSynced: "2026-02-01",
    revenue: "£450k",
    eventsHeld: 5,
    location: "London, UK"
  },
  {
    id: "biz_3",
    name: "GreenEnergy Pro",
    owner: "Hans Miller",
    email: "info@greenpro.de",
    cac: "DE-443322",
    status: "Standard",
    dateSynced: "2026-02-10",
    revenue: "£890k",
    eventsHeld: 8,
    location: "Berlin, Germany"
  },
  {
    id: "biz_4",
    name: "Finest Retail Corp",
    owner: "Anita Desai",
    email: "admin@finestretail.in",
    cac: "IN-112233",
    status: "Premium",
    dateSynced: "2026-01-20",
    revenue: "£2.5M",
    eventsHeld: 22,
    location: "Mumbai, India"
  }
];

export default function AdminBusinessesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBusinesses = MOCK_BUSINESSES.filter((biz) => {
    const matchesSearch =
      biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      biz.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      biz.cac.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || biz.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Partners", val: "1,248", sub: "Active accounts", icon: <Building2 className="w-4 h-4 text-blue-600 shrink-0" /> },
    { label: "Premium Tier", val: "142", sub: "Yearly PRO booths", icon: <Trophy className="w-4 h-4 text-orange-600 shrink-0" /> },
    { label: "Verified Entities", val: "890", sub: "KYB approved", icon: <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { label: "Partner GMV", val: "£14.2M", sub: "Gross trade volume", icon: <TrendingUp className="w-4 h-4 text-purple-600 shrink-0" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Compact Header — No decorative pills */}
      <div>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
          Registered Businesses
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Monitor verified exhibitors, booth activity, and seasonal partner tiers.
        </p>
      </div>

      {/* Horizontal Scroll KPI Cards on Mobile with Peeping Card + Dot Indicator */}
      <div>
        <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {stats.map((s, i) => (
            <div
              key={i}
              className="w-[42%] min-w-[144px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="text-[10px] font-bold text-slate-500 truncate">
                  {s.label}
                </span>
                {s.icon}
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-tight">
                {s.val}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2 lg:hidden">
          <span className="w-4 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Search & Horizontal Scrollable Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search business name, owner, or registration ID..."
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
          {["All", "Premium", "Verified", "Standard"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                statusFilter === status
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Directory Card (Desktop Table + Mobile Stacked Rows without Bulky Icon Columns) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Business & Reg ID
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Owner & Location
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Tier Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Activity
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBusinesses.map((biz) => (
                <tr key={biz.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-sm text-slate-900 leading-tight">
                      {biz.name}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                      ID: {biz.cac}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-xs text-slate-800">{biz.owner}</p>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3" /> {biz.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-black uppercase tracking-wider ${
                        biz.status === "Premium"
                          ? "text-orange-600"
                          : biz.status === "Verified"
                          ? "text-emerald-600"
                          : "text-blue-600"
                      }`}
                    >
                      {biz.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-5">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase">Events</p>
                        <p className="text-xs font-black text-slate-900">{biz.eventsHeld}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase">Revenue</p>
                        <p className="text-xs font-black text-slate-900">{biz.revenue}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        className="p-2 bg-white border border-slate-200/80 rounded-lg text-slate-500 hover:text-orange-600 hover:border-orange-200 transition-all"
                        title="Email Business"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-2 bg-white border border-slate-200/80 rounded-lg text-slate-500 hover:text-orange-600 hover:border-orange-200 transition-all"
                        title="Open Booth"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-2 bg-slate-900 text-white rounded-lg hover:bg-orange-600 transition-all"
                        title="More Options"
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
          {filteredBusinesses.map((biz) => (
            <div key={biz.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-extrabold text-sm text-slate-900 truncate">{biz.name}</p>
                  <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
                    {biz.owner} • {biz.location}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-black uppercase tracking-wider shrink-0 ${
                    biz.status === "Premium"
                      ? "text-orange-600"
                      : biz.status === "Verified"
                      ? "text-emerald-600"
                      : "text-blue-600"
                  }`}
                >
                  {biz.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-400 font-bold text-[10px] uppercase">
                    {biz.cac}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-700">{biz.eventsHeld} Events</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-black text-slate-900">{biz.revenue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-orange-600"
                    aria-label="Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-orange-600"
                    aria-label="View Booth"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="py-12 text-center px-4">
            <h3 className="text-sm font-black text-slate-900 uppercase">No businesses found</h3>
            <p className="text-slate-400 text-xs mt-0.5">Try adjusting your search or filter.</p>
          </div>
        )}

        {/* Footer Pagination */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500">
            Showing {filteredBusinesses.length} of 1,248 partners
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
