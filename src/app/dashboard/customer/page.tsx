"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  QrCode,
  Ticket,
  Calendar,
  Wallet,
  ShieldCheck,
  Play,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Modal from "@/app/component/Modal";

const FEATURED_BOOTHS = [
  {
    id: "101",
    code: "BOOTH A-101",
    name: "TechFlow Solutions",
    tags: "SaaS • Cloud Infrastructure",
    desc: "Enterprise-grade cloud architecture and AI deployment tools for modern startups.",
    image: "/main_stage_banner.png"
  },
  {
    id: "102",
    code: "BOOTH A-102",
    name: "FutureTech Systems",
    tags: "Edge Computing • Security",
    desc: "Zero-downtime global node synchronization and automated threat protection.",
    image: "/hero.webp"
  },
  {
    id: "103",
    code: "BOOTH B-204",
    name: "GreenGrid Energy",
    tags: "CleanTech • Smart Microgrids",
    desc: "Commercial solar storage and real-time energy telemetry for retail hubs.",
    image: "/ideal.png"
  }
];

export default function CustomerDashboard() {
  const [showPassport, setShowPassport] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
      {/* COMPACT WELCOME / LIVE STAGE BANNER */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white p-4 sm:p-6 shadow-md">
        <div className="absolute inset-0 opacity-35">
          <Image
            src="/main_stage_banner.png"
            alt="Main Stage"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span className="text-red-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Live Keynote
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-orange-300">Main Stage</span>
          </div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight uppercase leading-snug">
            Effectiveness of AI in Modern Businesses
          </h1>
          <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
            Join keynote speaker Sarah Johnson on the Main Stage discussing the future of digital retail and MCOM commerce.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Link
              href="/dashboard/customer/events/spring2026/lobby"
              className="bg-orange-600 text-white px-3.5 py-2 rounded-xl font-bold text-[11px] hover:bg-orange-700 transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Watch Stream</span>
            </Link>
            <Link
              href="/dashboard/customer/schedule"
              className="bg-white/10 backdrop-blur-xs text-white border border-white/15 px-3.5 py-2 rounded-xl font-bold text-[11px] hover:bg-white/20 transition-colors"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </div>

      {/* 100% FULL-WIDTH VERTICAL STACK ON MOBILE (LG GRID) */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 sm:gap-4">
        {/* 1. DIGITAL PASSPORT WIDGET */}
        <div
          onClick={() => setShowPassport(true)}
          className="w-full bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                Active Season Pass
              </span>
              <Ticket className="w-4 h-4 text-orange-500 shrink-0" />
            </div>
            <h3 className="text-sm sm:text-base font-extrabold">John Doe</h3>
            <p className="text-slate-400 text-[11px] font-mono mt-0.5">
              VIP ACCESS • GBX-88219-X22
            </p>
          </div>
          <button
            type="button"
            className="w-full mt-3.5 bg-white text-slate-900 py-2 rounded-xl font-bold text-[11px] hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>View Entry QR & Code</span>
          </button>
        </div>

        {/* 2. EXPO WALLET WIDGET */}
        <div className="w-full bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-4 text-white relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-[10px] uppercase tracking-wider text-orange-100">
                Pass & MCOM Wallet
              </span>
              <Wallet className="w-4 h-4 text-orange-100 shrink-0" />
            </div>
            <div className="text-base sm:text-xl font-extrabold leading-tight">
              £1,250.00
            </div>
            <div className="text-orange-100 text-[10px] font-medium mt-0.5">
              +£500.00 added • 850 MCOM Pts
            </div>
          </div>
          <div className="flex gap-2 mt-3.5">
            <Link
              href="/dashboard/customer/rewards"
              className="flex-1 bg-white/15 hover:bg-white/25 py-2 rounded-xl font-bold text-[11px] text-center transition-colors"
            >
              History
            </Link>
            <Link
              href="/dashboard/customer/tickets"
              className="flex-1 bg-white text-orange-600 py-2 rounded-xl font-bold text-[11px] text-center shadow-xs"
            >
              My Passes
            </Link>
          </div>
        </div>

        {/* 3. UP NEXT SCHEDULE WIDGET */}
        <div className="w-full bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-600" />
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                    Up Next
                  </h3>
                </div>
                <Link
                  href="/dashboard/customer/schedule"
                  className="text-[11px] font-bold text-orange-600 hover:underline"
                >
                  Full Agenda
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  {
                    time: "11:30 AM",
                    title: "Networking: Tech Founders",
                    status: "Starting in 10m",
                    live: true
                  },
                  {
                    time: "02:00 PM",
                    title: "Design Systems Workshop",
                    status: "Registered",
                    live: false
                  }
                ].map((event, i) => (
                  <Link
                    key={i}
                    href="/dashboard/customer/schedule"
                    className="py-2 flex items-center justify-between gap-2 group"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-900 truncate group-hover:text-orange-600">
                        {event.title}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold mt-0.5">
                        <span className="text-slate-500">{event.time}</span>
                        <span className="text-slate-300">•</span>
                        <span
                          className={
                            event.live
                              ? "text-orange-600 font-bold"
                              : "text-emerald-600 font-bold"
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
          </div>
        </div>

      {/* FEATURED BOOTHS — Horizontal Scroll on Mobile with Peeping Card + Dot Indicator */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">
              Featured Exhibitor Booths
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Top verified exhibitors with live demos & MCOM Mall products
            </p>
          </div>
          <Link
            href="/dashboard/customer/booths"
            className="text-orange-600 text-[11px] font-bold hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div>
          <div className="flex md:grid md:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
            {FEATURED_BOOTHS.map((booth) => (
              <Link
                key={booth.id}
                href={`/dashboard/customer/booths/${booth.id}`}
                className="w-[76%] min-w-[235px] sm:w-[260px] md:w-auto shrink-0 snap-start bg-white rounded-2xl p-3 sm:p-4 shadow-2xs border border-slate-200/80 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 sm:h-36 rounded-xl bg-slate-200 relative mb-2.5 overflow-hidden">
                    <Image
                      src={booth.image}
                      alt={booth.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    <span className="text-orange-600">{booth.code}</span>
                    <span className="text-emerald-600">Live Booth</span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
                    {booth.name}
                  </h3>
                  <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                    {booth.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-3 text-[11px]">
                  <span className="font-semibold text-slate-500 truncate">{booth.tags}</span>
                  <span className="text-orange-600 font-bold shrink-0 inline-flex items-center gap-0.5">
                    Visit <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {/* Mobile Slider Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-2 md:hidden">
            <span className="w-3.5 h-1 rounded-full bg-orange-600" />
            <span className="w-1.5 h-1 rounded-full bg-slate-300" />
            <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          </div>
        </div>
      </section>

      {/* COMPACT DIGITAL PASSPORT MODAL */}
      <Modal
        isOpen={showPassport}
        onClose={() => setShowPassport(false)}
        title="My Digital Passport"
      >
        <div className="space-y-3">
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl relative overflow-hidden border border-white/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block">
                  Official Entry Pass
                </span>
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                  247GBS DIGITAL EXPO
                </h3>
              </div>
              <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4 pb-3 border-b border-white/10">
              <div>
                <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">
                  Pass Holder
                </p>
                <p className="font-bold text-xs sm:text-sm">John Doe</p>
              </div>
              <div>
                <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">
                  Access Tier
                </p>
                <p className="font-bold text-xs sm:text-sm text-orange-400">VIP All-Season</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-2.5 rounded-xl mb-2.5">
                <div className="grid grid-cols-6 gap-0.5 w-24 h-24">
                  {[...Array(36)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-full h-full ${
                        i % 2 === 0 || i % 5 === 0 ? "bg-slate-900" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">
                Event Access Code
              </p>
              <p className="text-xs font-mono font-bold text-orange-400 mt-0.5">
                GBX-88219-X22
              </p>
            </div>
          </div>
          <p className="text-center text-[11px] text-slate-500">
            Use code <strong>GBX-88219-X22</strong> to unlock live event lobbies or scan QR at physical venues.
          </p>
        </div>
      </Modal>
    </div>
  );
}
