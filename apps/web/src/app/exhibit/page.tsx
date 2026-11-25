"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Store,
  ShoppingBag,
  Radio
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";

const CHS_BASE_URL =
  process.env.NEXT_PUBLIC_CHS_URL || "https://centralhubsolution.com";

const SHOWCASE_MODES = [
  {
    id: "booth",
    label: "Digital Booth",
    icon: Store,
    headline: "An always-open trade stand built for global buyers.",
    description:
      "Your verified brand profile, logo, and banner sync automatically from Central Hub Solution into a dedicated 24/7 digital booth—complete with live visitor chat and 1-on-1 consultation booking.",
    image: "/hero.webp",
    imageAlt: "247GBS Digital Expo interactive exhibition hall",
    caption: "Live digital stand synced with your verified CHS brand profile",
    points: [
      "Branding, logo, and verified badge pulled directly from CHS",
      "Real-time visitor messaging and 1-on-1 buyer consultation scheduling",
      "Direct visitor footfall and lead capture from every trade hall"
    ]
  },
  {
    id: "commerce",
    label: "MCOM Mall Sales",
    icon: ShoppingBag,
    headline: "Turn booth visits into direct MCOM Mall orders.",
    description:
      "Display your products and services right inside your stand with direct MCOM Mall checkout links—so buyers move from discovery to purchase without friction.",
    image: "/ideal.png",
    imageAlt: "Product showcase linked directly to MCOM Mall checkout",
    caption: "Products linked straight to your MCOM Mall storefront & fulfilment",
    points: [
      "Customisable call-to-action labels (Buy Now, Book Now, Enquire)",
      "Direct checkout routing to your connected MCOM Mall storefront",
      "Unified revenue tracking, settlement ledger, and CSV exports"
    ]
  },
  {
    id: "stage",
    label: "Live Demos & Stage",
    icon: Radio,
    headline: "Host launches, workshops, and live product demos.",
    description:
      "Run scheduled digital expos, workshops, webinars, or hybrid events—manage ticket tiers within platform caps, verify attendee passes, and sell products live during your broadcast.",
    image: "/main_stage_banner.png",
    imageAlt: "247GBS Digital Expo live main stage presentation",
    caption: "Interactive main stage broadcasts with pass-gated access",
    points: [
      "Run Digital Expos, Workshops, Webinars, and Hybrid trade events",
      "Dynamic ticket templates aligned with platform-wide access passes",
      "Built-in QR ticket verification and live attendee Q&A"
    ]
  }
] as const;

const CHS_FLOW = [
  {
    step: "1",
    title: "Register on Central Hub Solution",
    body: "Sign up once on CHS with your business details. All business identity and KYB verification happen centrally there—no duplicate forms."
  },
  {
    step: "2",
    title: "Choose your plan or trial",
    body: "Select a membership or trial on CHS that includes 247GBS Digital Expo access. Your permissions activate automatically."
  },
  {
    step: "3",
    title: "Land in your Expo Dashboard",
    body: "Once verified, CHS redirects you straight into your 247GBS Exhibitor Dashboard—ready to launch your booth and events."
  }
];

export default function ExhibitPage() {
  const [activeModeId, setActiveModeId] = useState<(typeof SHOWCASE_MODES)[number]["id"]>("booth");
  const activeMode =
    SHOWCASE_MODES.find((m) => m.id === activeModeId) || SHOWCASE_MODES[0];

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-slate-900 font-sans overflow-x-clip selection:bg-orange-100 selection:text-orange-950">
      <Navbar />

      {/* 1. Asymmetric Editorial Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[1.06] text-slate-950 text-balance">
                Your brand, open to global buyers{" "}
                <span className="text-orange-600">24/7.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-[54ch]">
                An <strong className="font-bold text-slate-900">Exhibitor</strong> on
                247GBS Digital Expo runs a verified interactive stand inside our
                international trade halls—hosting live demos, meeting buyers, and
                selling directly through MCOM Mall.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={`${CHS_BASE_URL}/getstarted/business`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-900/15 transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2"
                >
                  <span>Sign up with CHS</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/login"
                  className="px-6 py-3.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-sm transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <span>Sign in with CHS</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              <p className="text-xs text-slate-500 pt-1">
                Business registration, verification, and trial access are managed centrally via Central Hub Solution (CHS).
              </p>
            </div>

            {/* Right Full-Bleed Architectural Frame */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 shadow-2xl shadow-slate-900/10 border border-slate-200/80">
                <div className="aspect-[16/11] sm:aspect-[16/10] w-full relative">
                  <img
                    src="/main_stage_banner.png"
                    alt="247GBS Digital Expo Exhibition Hall"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                        Always-on digital trade halls &amp; live stages
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                        Synced with Central Hub Solution &amp; MCOM Mall
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live 24/7
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive "Inside an Exhibitor Stand" Showcase */}
      <section className="py-12 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* Header + Interactive Mode Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.025em] text-slate-950 leading-tight">
                What you run inside 247GBS Expo
              </h2>
              <p className="text-sm sm:text-base text-slate-500 mt-2">
                Explore the three core capabilities unlocked the moment your CHS business account connects.
              </p>
            </div>

            {/* Segmented Tab Bar (Scrollable on narrow 360px screens) */}
            <div
              role="tablist"
              aria-label="Exhibitor capabilities"
              className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/70 overflow-x-auto no-scrollbar w-full lg:w-auto"
            >
              {SHOWCASE_MODES.map((mode) => {
                const Icon = mode.icon;
                const selected = mode.id === activeModeId;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveModeId(mode.id)}
                    className={`flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selected
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        selected ? "text-orange-600" : "text-slate-400"
                      }`}
                    />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Authored Motion Showcase Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
            >
              {/* Visual Preview */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-950 shadow-lg shadow-slate-900/5">
                  <div className="aspect-[16/10] w-full relative">
                    <img
                      src={activeMode.image}
                      alt={activeMode.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-4 sm:px-6 py-3 bg-slate-950 text-slate-300 text-xs font-medium flex items-center justify-between gap-3">
                    <span className="truncate">{activeMode.caption}</span>
                    <span className="text-orange-400 font-bold shrink-0">
                      {activeMode.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editorial Detail List */}
              <div className="lg:col-span-5 space-y-5">
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 leading-snug">
                  {activeMode.headline}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeMode.description}
                </p>

                <ul className="space-y-3 pt-2 border-t border-slate-100">
                  {activeMode.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-slate-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="leading-snug font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Full-Bleed Dark Editorial Band — How CHS Access Works */}
      <section className="py-14 sm:py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.025em] leading-tight">
              One account on Central Hub Solution. Instant access to Expo.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              You never fill out separate exhibitor registration forms here. Register once on CHS and we route you straight into your dashboard.
            </p>
          </div>

          {/* Hairline-Divided 3-Column Progression (Zero Boxy Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10">
            {CHS_FLOW.map((item) => (
              <div
                key={item.step}
                className="py-6 md:py-8 md:px-8 first:md:pl-0 last:md:pr-0 space-y-2.5"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white font-black text-xs tabular-nums">
                  {item.step}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight pt-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Closing Conversion Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2">
            <div>
              <p className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
                Ready to open your stand?
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Start on Central Hub Solution and launch straight into 247GBS Expo.
              </p>
            </div>

            <a
              href={`${CHS_BASE_URL}/getstarted/business`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-950/40 transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 shrink-0"
            >
              <span>Sign up with CHS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
