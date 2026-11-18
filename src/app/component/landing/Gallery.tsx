"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Ticket,
  Building2,
  Zap,
  ArrowRight,
  BarChart3,
  Users,
  Globe,
} from "lucide-react";

const EXPOS = [
  {
    id: "spring2026",
    title: "Global Innovation Fair",
    season: "Spring 2026",
    dates: "April 10-19",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    color: "emerald",
    highlight: "Artificial Intelligence & Sustainability",
    stats: "500+ Tech Exhibitors"
  },
  {
    id: "summer2026",
    title: "Summer Trade Carnival",
    season: "Summer 2026",
    dates: "July 15-24",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    color: "amber",
    highlight: "Global Retail & Logistics",
    stats: "10k+ Daily Trade Visitors"
  },
  {
    id: "health",
    title: "Autumn Growth Summit",
    season: "Autumn 2026",
    dates: "October 10-19",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    color: "orange",
    highlight: "B2B Services & Fintech",
    stats: "£5M+ Projected Deal Volume"
  }
];

const PROMOS = [
  {
    title: "For Businesses",
    desc: "Scale your reach globally without travel costs. Our automated traffic engine connects you directly to high-intent trade buyers.",
    icon: Building2,
    benefits: ["Verified Lead Generation", "Real-time Analytics", "24/7 Virtual Booth"]
  },
  {
    title: "For Visitors",
    desc: "Experience the world's most interactive digital exhibitions. Collect rewards, attend live demos, and shop exclusive seasonal deals.",
    icon: Ticket,
    benefits: ["Exclusive Seasonal Discounts", "Interactive Live Demos", "Seamless QR Access"]
  }
];

export default function Gallery() {
  return (
    <>
      {/* 1. Upcoming Exhibitions Section (Light Background) */}
      <section id="gallery" className="py-10 sm:py-16 md:py-20 bg-slate-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 sm:mb-12 gap-3 sm:gap-6">
            <div className="max-w-2xl">
              <span className="text-orange-600 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs block mb-1">
                Upcoming Exhibitions
              </span>
              <h3 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-1.5 sm:mb-3">
                The Future of Business, <br className="hidden sm:inline" />
                <span className="text-orange-600 underline decoration-orange-200">Happening Soon.</span>
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                Experience the energy of our upcoming seasons. Join a vibrant ecosystem designed to drive global trade and innovation 24/7.
              </p>
            </div>
            
            {/* Contained Width Button */}
            <div className="w-fit self-start md:self-end pt-1">
              <Link 
                href="/tickets" 
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-slate-200 hover:border-orange-600 rounded-full font-bold text-xs sm:text-sm text-slate-900 transition-all shadow-sm active:scale-95"
              >
                <span>View All Events</span> 
                <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
              </Link>
            </div>
          </div>

          {/* Upcoming Seasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {EXPOS.map((expo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-slate-200/80 hover:shadow-xl transition-all"
              >
                {/* Event Image Banner / Thumbnail */}
                <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={expo.image}
                    alt={expo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Season & Dates Badge */}
                  <div className="absolute bottom-2.5 left-3 sm:bottom-4 sm:left-4 text-white z-10">
                    <span className="bg-orange-600 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider mb-1 inline-block shadow">
                      {expo.season}
                    </span>
                    <h4 className="text-sm sm:text-lg font-extrabold leading-tight drop-shadow">{expo.dates}, 2026</h4>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-6">
                  <h5 className="text-base sm:text-xl font-bold text-slate-900 mb-1">{expo.title}</h5>
                  <p className="text-slate-500 text-xs sm:text-sm mb-3 line-clamp-1">
                    Featuring: {expo.highlight}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    <BarChart3 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span className="truncate">{expo.stats}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      href={`/tickets?season=${expo.id}`} 
                      className="py-2 sm:py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-center text-xs transition-all shadow-sm active:scale-95"
                    >
                      Get Tickets
                    </Link>
                    <Link 
                      href="/exhibit" 
                      className="py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-center text-xs transition-all active:scale-95"
                    >
                      Exhibit
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Platform Impact Section - Standalone Full-Bleed Dark Section (NO Double Container!) */}
      <section className="w-full bg-slate-950 text-white py-10 sm:py-16 md:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Heading & Flat Feature Items (No nested boxes!) */}
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-orange-500/30">
                <Zap className="w-3.5 h-3.5" /> Platform Impact
              </div>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold leading-snug tracking-tight">
                Driving Growth with <br className="hidden sm:inline" />
                <span className="text-orange-500">Precision Traffic.</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
                We combine targeted UK marketing with a permanent global network, ensuring every exhibition is packed with high-intent buyers and networking opportunities.
              </p>

              {/* Flat Features - Borderless and clean */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 mb-1.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">Targeted Traffic</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">50k+ seasonal visitors per event.</p>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 mb-1.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">Global Reach</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">100+ cities & worldwide virtual floor.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Single Clean Layer Cards (No nested boxes inside boxes!) */}
            <div className="grid gap-3.5 sm:gap-4">
              {PROMOS.map((promo, i) => (
                <div 
                  key={i} 
                  className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shrink-0">
                      <promo.icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{promo.title}</h4>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3">
                    {promo.desc}
                  </p>
                  {/* Clean Flat Bullet Points - No boxed pills! */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {promo.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
