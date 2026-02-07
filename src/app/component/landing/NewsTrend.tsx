"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag, TrendingUp, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NEWS_ITEMS = [
  {
    id: 1,
    category: "Platform Update",
    title: "AI-Powered Booth Analytics 2.0 Released",
    excerpt: "Exhibitors can now track visitor sentiment and engagement depth in real-time with our latest neural engine update.",
    date: "Feb 05, 2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    trending: true
  },
  {
    id: 2,
    category: "Partnership",
    title: "Major UK Retailers Join the Spring 2026 Lineup",
    excerpt: "Over 50 premium UK high-street brands have officially signed on for the upcoming Spring Innovation Fair.",
    date: "Feb 02, 2026",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    trending: false
  },
  {
    id: 3,
    category: "Community",
    title: "Top 10 Emerging Brands of the Winter Season",
    excerpt: "Discover the most innovative creators who captured the community's attention during our record-breaking winter expo.",
    date: "Jan 28, 2026",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    trending: true
  }
];

export default function NewsTrend() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-orange-600 font-bold tracking-wide uppercase text-sm mb-3">
              <Newspaper className="w-4 h-4" /> News & Trends
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Platform Pulse: <span className="text-orange-600">What's Happening Now</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Stay updated with the latest innovations, partnerships, and community highlights from the 247GBS ecosystem.
            </p>
          </div>
          <Link 
            href="/news" 
            className="group flex items-center gap-2 text-slate-900 font-bold hover:text-orange-600 transition-colors"
          >
            View All News <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.trending && (
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                    <TrendingUp className="w-3 h-3" /> Trending
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <span className="text-white font-bold text-sm flex items-center gap-2">Read Full Story <ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5 text-orange-600 font-bold text-[10px] uppercase tracking-wider">
                  <Tag className="w-3 h-3" /> {item.category}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[10px] uppercase tracking-wider">
                  <Calendar className="w-3 h-3" /> {item.date}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors leading-tight">
                {item.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                {item.excerpt}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Platform Stats Highlight Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-600/20">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-slate-900">Live Platform Momentum</h4>
              <p className="text-slate-500 font-medium">Tracking real-time growth across the UK digital economy.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div>
              <div className="text-3xl font-black text-slate-900">1.2M+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Impressions</div>
            </div>
            <div>
              <div className="text-3xl font-black text-orange-600">85%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Retention Rate</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">24/7</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uptime Active</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
