"use client";

import Link from "next/link";
import {
  Eye,
  Users,
  ShoppingBag,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Radio,
  ExternalLink
} from "lucide-react";

export default function BusinessDashboardPage() {
  const stats = [
    {
      label: "Booth Views",
      val: "12.5K",
      sub: "+12% vs last week",
      icon: Eye,
      iconColor: "text-orange-600"
    },
    {
      label: "Active Leads",
      val: "342",
      sub: "+5% buyer inquiries",
      icon: Users,
      iconColor: "text-blue-600"
    },
    {
      label: "MCOM Sales",
      val: "£4,200",
      sub: "+8.2% conversion",
      icon: ShoppingBag,
      iconColor: "text-emerald-600"
    },
    {
      label: "Avg. Dwell",
      val: "4m 12s",
      sub: "Live demo engagement",
      icon: Clock,
      iconColor: "text-purple-600"
    }
  ];

  const upcomingSessions = [
    { time: "10:00 AM", title: "Product Launch Q&A", hall: "Main Stage", status: "Live Soon" },
    { time: "02:30 PM", title: "Enterprise Cloud Panel", hall: "Hall B", status: "Scheduled" },
    { time: "04:00 PM", title: "VIP Buyer Networking", hall: "Lounge A", status: "Scheduled" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Compact Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Exhibitor Overview
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Monitor booth traffic, MCOM Mall product conversions, and live event sessions.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/dashboard/customer/booths/101"
            className="bg-white border border-slate-200/80 text-slate-700 px-3 py-1.5 rounded-xl text-[11px] font-bold hover:bg-slate-50 inline-flex items-center gap-1 shadow-2xs"
          >
            <span>Preview Booth</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
          <Link
            href="/dashboard/business/events"
            className="bg-orange-600 text-white px-3.5 py-1.5 rounded-xl text-[11px] font-bold hover:bg-orange-700 shadow-xs inline-flex items-center gap-1.5"
          >
            <Radio className="w-3 h-3 animate-pulse" />
            <span>Go Live Now</span>
          </Link>
        </div>
      </header>

      {/* Horizontal Scroll KPI Strip on Mobile (Peeping Card + Dot Slider, Inline Small Icons) */}
      <div>
        <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="w-[42%] min-w-[144px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {stat.label}
                  </span>
                  <IconComponent className={`w-3.5 h-3.5 ${stat.iconColor} shrink-0`} />
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-none">
                  {stat.val}
                </div>
                <p className="text-[10px] font-medium text-slate-400 mt-1 truncate">
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-1.5 lg:hidden">
          <span className="w-3.5 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Booth Readiness & Ecosystem Sync */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
              Booth Readiness & Profile
            </h3>
            <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider">
              90% Ready
            </span>
          </div>

          <div className="p-4 sm:p-5 space-y-3">
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-orange-600 h-1.5 rounded-full w-[90%]" />
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-600 font-medium truncate">
                    Business Logo, Banner & KYB Verified
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase shrink-0">
                  Verified
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-600 font-medium truncate">
                    Product Catalog Auto-Imported from MCOM Mall
                  </span>
                </div>
                <Link
                  href="/dashboard/business/products"
                  className="text-[11px] font-bold text-orange-600 hover:underline shrink-0"
                >
                  Manage
                </Link>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-slate-900 font-bold block">
                    Configure Event Ticket Templates & Caps
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Select admin-approved VIP & Standard ticket templates for your next event
                  </span>
                </div>
                <Link
                  href="/dashboard/business/events/tickets"
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold hover:bg-orange-600 transition-colors shrink-0 inline-flex items-center gap-1"
                >
                  <span>Configure</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Live Schedule Widget */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                Upcoming Live Sessions
              </h3>
              <Link
                href="/dashboard/business/events/configuration"
                className="text-[11px] font-bold text-orange-600 hover:underline"
              >
                Timetable
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {upcomingSessions.map((event, i) => (
                <Link
                  key={i}
                  href="/dashboard/business/events/configuration"
                  className="py-2.5 flex items-center justify-between gap-2 group"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 truncate group-hover:text-orange-600 transition-colors">
                      {event.title}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 mt-0.5">
                      <span>{event.time}</span>
                      <span className="text-slate-300">•</span>
                      <span>{event.hall}</span>
                      <span className="text-slate-300">•</span>
                      <span
                        className={
                          i === 0
                            ? "text-orange-600 font-bold uppercase"
                            : "text-emerald-600 font-bold uppercase"
                        }
                      >
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/business/events/create"
            className="w-full mt-3 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors text-center block"
          >
            + Create New Event
          </Link>
        </div>
      </div>
    </div>
  );
}
