"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  ArrowLeft, 
  Clock, 
  User, 
  Twitter, 
  Facebook, 
  Linkedin,
  TrendingUp,
  Bookmark,
  Check
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import { NEWS_ITEMS } from "@/data/news";

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id);
  const item = NEWS_ITEMS.find(n => n.id === id);

  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("expo_saved_articles") || "[]") as number[];
      setSaved(stored.includes(id));
    } catch {
      setSaved(false);
    }
  }, [id]);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleToggleSave = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("expo_saved_articles") || "[]") as number[];
      const next = saved ? stored.filter((x) => x !== id) : [...new Set([...stored, id])];
      localStorage.setItem("expo_saved_articles", JSON.stringify(next));
      setSaved(!saved);
      showToast(!saved ? "Article saved to reading list." : "Removed from reading list.");
    } catch {
      setSaved(!saved);
    }
  };

  const handleShare = (platform: "twitter" | "facebook" | "linkedin") => {
    if (typeof window === "undefined" || !item) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(item.title);
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
    showToast(`Opened ${platform.charAt(0).toUpperCase() + platform.slice(1)} share dialog.`);
  };

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
          <Link href="/news" className="text-orange-600 font-bold hover:underline text-sm">Return to News</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      <article className="pt-24 pb-10 sm:pt-32 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link 
            href="/news" 
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-orange-600 transition-colors mb-4 sm:mb-6 font-bold text-xs sm:text-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to News
          </Link>

          <div className="space-y-3 sm:space-y-5 mb-5 sm:mb-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                {item.category}
              </span>
              {item.trending && (
                <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5" /> Trending Story
                </span>
              )}
            </div>
            
            <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 py-3 border-y border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-bold text-slate-900">{item.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-orange-600" /> {item.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-600" /> {item.readTime}
              </div>
            </div>
          </div>

          <div className="relative h-48 sm:h-72 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-10 bg-slate-900 shadow-md">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-[1fr_240px] gap-8 sm:gap-12">
            <div
              className="prose prose-slate prose-sm sm:prose-base max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-orange-600"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />

            <aside className="space-y-4">
              <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-[10px]">Share Story</h4>
                  <div className="flex gap-2">
                    {[
                      { Icon: Twitter, platform: "twitter" as const, label: "Share on X / Twitter" },
                      { Icon: Facebook, platform: "facebook" as const, label: "Share on Facebook" },
                      { Icon: Linkedin, platform: "linkedin" as const, label: "Share on LinkedIn" },
                    ].map(({ Icon, platform, label }) => (
                      <button
                        key={platform}
                        type="button"
                        aria-label={label}
                        onClick={() => handleShare(platform)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-orange-600 hover:border-orange-600 transition-all cursor-pointer"
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleSave}
                  className={`w-full flex items-center justify-between px-3.5 py-2 border rounded-xl transition-all font-bold text-xs cursor-pointer ${
                    saved
                      ? "bg-orange-50 border-orange-300 text-orange-700"
                      : "bg-white border-slate-200 hover:border-orange-600 text-slate-700"
                  }`}
                >
                  <span>{saved ? "Saved" : "Save Article"}</span>
                  {saved ? (
                    <Check className="w-3.5 h-3.5 text-orange-600" />
                  ) : (
                    <Bookmark className="w-3.5 h-3.5 text-orange-600" />
                  )}
                </button>
                {feedback && (
                  <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5">
                    {feedback}
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* More from the Pulse */}
      <section className="py-8 sm:py-14 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-base sm:text-2xl font-extrabold mb-4 sm:mb-8">More from the Pulse</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6">
            {NEWS_ITEMS.filter(n => n.id !== id).slice(0, 3).map((news) => (
              <Link key={news.id} href={`/news/${news.id}`} className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-orange-300 transition-all shadow-xs">
                <div className="relative h-32 sm:h-40 bg-slate-900">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-3.5 sm:p-4">
                  <span className="text-[9px] font-bold text-orange-600 uppercase tracking-wider mb-1 block">{news.category}</span>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors">{news.title}</h3>
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
