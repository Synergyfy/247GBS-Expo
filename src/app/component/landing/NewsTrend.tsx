"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag, TrendingUp, Newspaper } from "lucide-react";
import Link from "next/link";
import { NEWS_ITEMS } from "@/data/news";

export default function NewsTrend() {
  return (
    <section className="py-5 sm:py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header - Highly Compact on Mobile */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs">
              <Newspaper className="w-3.5 h-3.5" /> News & Trends
            </div>
            
            {/* View All News Pill - inline on top row for mobile */}
            <Link 
              href="/news" 
              className="inline-flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 bg-white border border-slate-200 hover:border-orange-600 rounded-full font-bold text-[11px] sm:text-xs text-slate-800 transition-all shadow-sm active:scale-95 shrink-0"
            >
              <span>View All News</span> 
              <ArrowRight className="w-3 h-3 text-orange-600" />
            </Link>
          </div>

          <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight mb-1">
            Platform Pulse: <span className="text-orange-600">What's Happening Now</span>
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 leading-relaxed max-w-xl">
            Stay updated with the latest innovations, partnerships, and community highlights from the 247GBS ecosystem.
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {NEWS_ITEMS.map((item, i) => (
            <Link 
              key={item.id} 
              href={`/news/${item.id}`}
              className="flex flex-col group cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col h-full bg-slate-50/50 hover:bg-slate-50 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-orange-200/80 transition-all shadow-sm"
              >
                {/* News Image Thumbnail */}
                <div className="relative h-28 sm:h-36 md:h-44 rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.trending && (
                    <div className="absolute top-2 left-2 bg-orange-600 text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <TrendingUp className="w-2.5 h-2.5" /> Trending
                    </div>
                  )}
                </div>
                
                {/* Meta Tags */}
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="flex items-center gap-1 text-orange-600 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider">
                    <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {item.category}
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 font-medium text-[9px] sm:text-[10px] uppercase tracking-wider">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {item.date}
                  </div>
                </div>
                
                {/* News Title */}
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2 mb-1.5">
                  {item.excerpt}
                </p>

                <div className="mt-auto pt-1 text-[10px] sm:text-[11px] font-bold text-orange-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read story</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Live Platform Momentum Banner - Scaled for Mobile */}
        <div className="mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 md:p-8 bg-slate-900 text-white rounded-2xl md:rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 shadow-xl">
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-600/20">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-lg font-extrabold text-white leading-tight">Live Platform Momentum</h4>
              <p className="text-xs text-slate-400">Tracking real-time growth across the UK digital economy.</p>
            </div>
          </div>
          
          {/* Metrics 3-Column on Mobile */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10 text-center">
            <div>
              <div className="text-lg sm:text-2xl md:text-3xl font-black text-white">1.2M+</div>
              <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Impressions</div>
            </div>
            <div className="border-x border-white/10 px-1 sm:px-4">
              <div className="text-lg sm:text-2xl md:text-3xl font-black text-orange-400">85%</div>
              <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Retention</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl md:text-3xl font-black text-white">24/7</div>
              <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
