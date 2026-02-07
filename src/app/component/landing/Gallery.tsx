"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Play, 
  Ticket, 
  Building2, 
  Zap, 
  ArrowRight, 
  BarChart3, 
  Users, 
  Globe, 
  PlayCircle 
} from "lucide-react";

const EXPOS = [
  {
    title: "Global Innovation Fair",
    season: "Spring 2026",
    dates: "April 10-19",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    color: "emerald",
    highlight: "Artificial Intelligence & Sustainability",
    stats: "500+ Tech Exhibitors"
  },
  {
    title: "Summer Trade Carnival",
    season: "Summer 2026",
    dates: "July 15-24",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    color: "amber",
    highlight: "Global Retail & Logistics",
    stats: "10k+ Daily Trade Visitors"
  },
  {
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
    desc: "Scale your reach globally without the travel costs. Our AI-driven traffic engine guarantees high-intent visitor engagement through targeted UK-wide campaigns.",
    icon: Building2,
    benefits: ["Verified Lead Generation", "Real-time Analytics", "24/7 Booth Operation"]
  },
  {
    title: "For Visitors",
    desc: "Experience the world's most interactive digital exhibitions. Collect rewards, attend live demos, and shop exclusive deals from global brands.",
    icon: Ticket,
    benefits: ["Exclusive Seasonal Discounts", "Interactive Live Demos", "Seamless Networking"]
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-orange-600 font-bold tracking-wide uppercase text-sm mb-3">
              Upcoming Exhibitions
            </h2>
            <h3 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              The Future of Business, <br />
              <span className="text-orange-600 underline decoration-orange-200">Happening Soon.</span>
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              Experience the energy of our upcoming seasons. Join a vibrant ecosystem designed to drive global trade and innovation 24/7.
            </p>
          </div>
          <div className="flex gap-4">
             <Link href="/tickets" className="px-6 py-3 bg-white border-2 border-slate-200 rounded-full font-bold text-slate-900 hover:border-orange-600 transition-all flex items-center gap-2">
               View All Events <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>

        {/* Upcoming Seasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {EXPOS.map((expo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={expo.image}
                  alt={expo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="bg-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                    {expo.season}
                  </div>
                  <h4 className="text-2xl font-bold">{expo.dates}, 2026</h4>
                </div>
                <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/40 backdrop-blur-sm">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-600 shadow-xl scale-90 group-hover:scale-100 transition-transform duration-500">
                    <PlayCircle className="w-8 h-8 fill-orange-600/10" />
                  </div>
                </button>
              </div>
              <div className="p-8">
                <h5 className="text-2xl font-bold text-slate-900 mb-2">{expo.title}</h5>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                  Featuring: {expo.highlight}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
                  <BarChart3 className="w-4 h-4 text-orange-500" /> {expo.stats}
                </div>
                <div className="flex gap-3">
                  <Link href="/tickets" className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold text-center text-sm hover:bg-orange-700 transition-all">
                    Get Tickets
                  </Link>
                  <Link href="/exhibit" className="flex-1 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold text-center text-sm hover:bg-slate-200 transition-all">
                    Exhibit Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Participate Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-900 rounded-[48px] p-8 md:p-16 text-white shadow-3xl">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-orange-600/30">
              <Zap className="w-4 h-4" /> Platform Impact
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Driving Growth with <br />
              <span className="text-orange-500">Precision Traffic.</span>
            </h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              We engineer success by combining targeted UK-focused marketing with a global partner network. Our platform ensures that every exhibition is packed with high-intent buyers and networking opportunities.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xl">High-Intent Traffic</h4>
                <p className="text-sm text-slate-500">Our automated traffic engine delivers 50k+ seasonal visitors per event.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500">
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xl">Global Ecosystem</h4>
                <p className="text-sm text-slate-500">Connect with featured businesses across 100+ UK cities and beyond.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {PROMOS.map((promo, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white">
                    <promo.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold">{promo.title}</h4>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {promo.desc}
                </p>
                <div className="space-y-3">
                  {promo.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}