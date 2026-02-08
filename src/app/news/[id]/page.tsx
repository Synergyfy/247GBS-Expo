"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Tag, 
  ArrowLeft, 
  Clock, 
  User, 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin,
  TrendingUp,
  Bookmark
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import { NEWS_ITEMS } from "@/data/news";

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id);
  const item = NEWS_ITEMS.find(n => n.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/news" className="text-orange-600 font-bold hover:underline">Return to News</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/* Article Hero */}
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors mb-12 font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 mb-12"
            >
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-orange-200">
                  {item.category}
                </span>
                {item.trending && (
                  <span className="flex items-center gap-1.5 text-orange-600 font-bold text-xs uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4" /> Trending Story
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                {item.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-4 border-y border-slate-100 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.author}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Article Author</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-100 hidden sm:block" />
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <Calendar className="w-4 h-4" /> {item.date}
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <Clock className="w-4 h-4" /> {item.readTime}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[21/9] rounded-[40px] overflow-hidden mb-16 shadow-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Article Content */}
            <div className="grid lg:grid-cols-[1fr_250px] gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-orange-600 prose-img:rounded-3xl"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />

              {/* Sidebar */}
              <aside className="hidden lg:block space-y-12">
                <div className="sticky top-32">
                  <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-8">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Share Story</h4>
                      <div className="flex gap-4">
                        {[Twitter, Facebook, Linkedin].map((Icon, i) => (
                          <button key={i} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-orange-600 hover:border-orange-600 transition-all shadow-sm">
                            <Icon className="w-5 h-5" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Tools</h4>
                      <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-orange-600 transition-all font-bold text-sm text-slate-600 hover:text-orange-600 shadow-sm">
                        Save Article <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-8 border-t border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Related Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Innovation", "UK Retail", "Digital Expo", "AI Technology"].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {/* Recommended News */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black mb-12 text-center">More from the Pulse</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {NEWS_ITEMS.filter(n => n.id !== id).slice(0, 3).map((news) => (
              <Link key={news.id} href={`/news/${news.id}`} className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all">
                <div className="relative h-48">
                  <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2 block">{news.category}</span>
                  <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors">{news.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
