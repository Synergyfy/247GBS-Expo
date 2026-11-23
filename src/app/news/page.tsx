"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Newspaper, 
  TrendingUp, 
  Search,
  Calendar,
  Tag,
  X
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import { NEWS_ITEMS } from "@/data/news";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function NewsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("q") || searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q") || searchParams.get("search");
    if (q !== null && q !== undefined) setSearchTerm(q);
  }, [searchParams]);

  const filteredNews = NEWS_ITEMS.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/* Compact Hero Section + Inline Search */}
      <section className="pt-24 pb-6 sm:pt-32 sm:pb-12 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-orange-700 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-1.5">
                <Newspaper className="w-3.5 h-3.5" />
                Platform Pulse
              </div>
              <h1 className="text-xl sm:text-4xl font-extrabold tracking-tight mb-1 text-slate-900 leading-tight">
                Stay Ahead of the <span className="text-orange-600">Curve</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Daily digital innovation, market trends, and community highlights across the 247GBS ecosystem.
              </p>
            </div>

            {/* Compact Search Input */}
            <div className="w-full md:w-80">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search articles or topics..." 
                  className="w-full pl-9 pr-9 py-2 sm:py-2.5 bg-white rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm shadow-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Density News Grid */}
      <section className="py-6 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredNews.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group"
              >
                <Link
                  href={`/news/${item.id}`}
                  className="flex flex-col h-full bg-slate-50/60 hover:bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/70 hover:border-orange-300 transition-all shadow-xs"
                >
                  <div className="relative h-32 sm:h-44 rounded-xl overflow-hidden mb-3 bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {item.trending && (
                      <div className="absolute top-2.5 left-2.5 bg-orange-600 text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <TrendingUp className="w-2.5 h-2.5" /> Trending
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                      <Tag className="w-2.5 h-2.5" /> {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      <Calendar className="w-2.5 h-2.5" /> {item.date}
                    </span>
                  </div>
                  
                  <h2 className="text-sm sm:text-lg font-extrabold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h2>
                  
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                    {item.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-2 border-t border-slate-100 flex items-center gap-1 text-orange-600 font-bold text-xs">
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12 px-4 bg-slate-50/80 rounded-2xl border border-dashed border-slate-200 max-w-md mx-auto my-4">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">No Articles Found</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                No stories match &ldquo;{searchTerm}&rdquo;. Try another keyword or clear your filter.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="px-5 py-2 bg-orange-600 text-white rounded-full text-xs font-bold hover:bg-orange-700 transition-all shadow-xs active:scale-95"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Full-Bleed Dark Newsletter CTA (No Double Container) */}
      <section className="w-full py-8 sm:py-16 bg-slate-950 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-lg sm:text-3xl font-extrabold mb-1.5 sm:mb-3 tracking-tight">Never Miss a Platform Update</h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 max-w-xl mx-auto">
            Get seasonal trend reports, keynote announcements, and exclusive exhibitor deals delivered to your inbox.
          </p>
          {subscribed ? (
            <div className="max-w-md mx-auto px-5 py-3 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold">
              Subscribed! Updates will be sent to {newsletterEmail}.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail.trim()) {
                  setSubscribed(true);
                }
              }}
              className="flex flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your business email"
                className="px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 flex-1 text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-orange-700 transition-all shadow-md shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <NewsContent />
    </Suspense>
  );
}
