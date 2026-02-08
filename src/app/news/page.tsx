"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  Tag, 
  ArrowRight, 
  Newspaper, 
  TrendingUp, 
  Search,
  Filter
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import { NEWS_ITEMS } from "@/data/news";
import { useState } from "react";

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNews = NEWS_ITEMS.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.05)_0,transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest mb-6 border border-orange-200"
          >
            <Newspaper className="w-4 h-4" />
            Platform Pulse
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black tracking-tight mb-8"
          >
            Stay Ahead of the <span className="text-orange-600">Curve</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Your daily dose of digital innovation, market trends, and community highlights from across the 247GBS ecosystem.
          </motion.p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search news, trends, or categories..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
              <Filter className="w-5 h-5" /> Filters
            </button>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {filteredNews.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col"
              >
                <Link href={`/news/${item.id}`} className="block">
                  <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-8 shadow-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {item.trending && (
                      <div className="absolute top-6 left-6 bg-orange-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                        <TrendingUp className="w-3.5 h-3.5" /> Trending
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">{item.category}</span>
                    <div className="h-1 w-1 bg-slate-200 rounded-full" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                    {item.title}
                  </h2>
                  
                  <p className="text-slate-500 leading-relaxed line-clamp-3 mb-6 font-medium">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-orange-600 font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                    Read Story <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Newsletter CTA */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 lg:mx-8 mb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight">Never miss a beat</h2>
            <p className="text-xl text-slate-400 mb-12">Get the latest platform updates, trend reports, and exclusive exhibitor deals delivered straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-8 py-5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex-1 max-w-md backdrop-blur-md"
              />
              <button className="px-10 py-5 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20">
                Subscribe to Pulse
              </button>
            </div>
            <p className="mt-6 text-xs text-slate-500 font-medium">Join 25,000+ business leaders already subscribed.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
