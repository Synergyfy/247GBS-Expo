"use client";

import Link from "next/link";
import {
  TrendingUp,
  Users,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Activity,
  FileBarChart
} from "lucide-react";

export default function AdminOverview() {
  const stats = [
    {
      label: "Platform Revenue",
      value: "£1.24M",
      icon: <TrendingUp className="w-3.5 h-3.5 text-orange-600 shrink-0" />,
      sub: "Overall fee collections"
    },
    {
      label: "Active Exhibitors",
      value: "842",
      icon: <Users className="w-3.5 h-3.5 text-orange-600 shrink-0" />,
      sub: "Verified booths"
    },
    {
      label: "Event Approvals",
      value: "12",
      icon: <AlertCircle className="w-3.5 h-3.5 text-orange-600 shrink-0" />,
      sub: "Pending event review"
    },
    {
      label: "Global Traffic",
      value: "128K",
      icon: <Activity className="w-3.5 h-3.5 text-orange-600 shrink-0" />,
      sub: "Avg. daily unique visits"
    }
  ];

  const recentEvents = [
    {
      id: "EVT-101",
      title: "Annual Tech Symposium 2026",
      host: "Global Tech Corp",
      format: "Digital Expo",
      time: "1h ago"
    },
    {
      id: "EVT-102",
      title: "Summer Sustainable Fashion Week",
      host: "Urban Threads Co.",
      format: "Hybrid",
      time: "3h ago"
    },
    {
      id: "EVT-103",
      title: "FinTech Cross-Border Trade Workshop",
      host: "Apex Financial Systems",
      format: "Workshop",
      time: "5h ago"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-5 max-w-7xl mx-auto">
      {/* HEADER — Compact typography, no decorative pills */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Command Center
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Platform performance monitoring and event oversight.
          </p>
        </div>
        <Link
          href="/dashboard/admin/reporting"
          className="inline-flex items-center gap-1.5 bg-white border border-slate-200/80 text-slate-700 px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-2xs hover:bg-slate-50 transition-all shrink-0"
        >
          <FileBarChart className="w-3.5 h-3.5 text-orange-600" />
          <span>Reports</span>
        </Link>
      </div>

      {/* STATS MATRIX — Horizontal Scroll on Mobile with Peeping Card + Dot Indicator */}
      <div>
        <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="w-[46%] min-w-[150px] sm:w-[180px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 truncate">
                  {stat.label}
                </span>
                {stat.icon}
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-tight">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5 truncate">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
        {/* Mobile Slider Dots Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-2 lg:hidden">
          <span className="w-4 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* RECENT EVENT SUBMISSIONS & SYSTEM HEALTH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* EVENT APPROVAL QUEUE FEED (Clean full-width rows without repetitive right-hand PENDING text) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="px-3.5 py-3 sm:px-5 sm:py-3.5 border-b border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 rounded-full bg-orange-600" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">
                Pending Event Submissions
              </h3>
            </div>
            <Link
              href="/dashboard/admin/approvals"
              className="text-orange-600 text-[11px] font-bold hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>Review All (12)</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recentEvents.map((item) => (
              <Link
                key={item.id}
                href="/dashboard/admin/approvals"
                className="flex items-center justify-between gap-2.5 px-3.5 py-3 sm:px-5 hover:bg-slate-50/70 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px] truncate group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                    <span className="text-slate-700 font-semibold truncate">{item.host}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-orange-600 font-semibold shrink-0">{item.format}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 shrink-0">{item.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* SERVER HEALTH WIDGET */}
        <div className="bg-orange-600 rounded-2xl p-4 sm:p-5 text-white relative overflow-hidden shadow-md">
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-orange-100 text-[11px] font-bold uppercase tracking-wider mb-2">
              Server & System Health
            </h3>

            <div className="divide-y divide-orange-500/60 flex-1">
              {[
                { label: "Live Streams", val: "Operational" },
                { label: "Identity Sync", val: "Connected" },
                { label: "Payment Gateway", val: "Operational" },
                { label: "Content CDN", val: "92% Load" },
                { label: "API Latency", val: "42ms" }
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center py-2 text-[11px]">
                  <span className="text-orange-100 font-semibold">{log.label}</span>
                  <span className="text-white font-bold">{log.val}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2.5 border-t border-orange-500/80">
              <p className="text-[10px] text-orange-100 font-medium leading-relaxed">
                Next maintenance: Jan 30, 02:00 AM UTC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
