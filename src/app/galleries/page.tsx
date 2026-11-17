"use client";

import { motion } from "framer-motion";
import { 
  Camera, 
  Play, 
  Sparkles,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import { useState } from "react";

const CATEGORIES = ["All", "Past Expos", "Innovation Demos", "Networking", "Community"];

const GALLERY_ITEMS = [
  {
    title: "Main Stage Keynote 2025",
    category: "Past Expos",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    type: "video"
  },
  {
    title: "Tech Innovation Hub",
    category: "Innovation Demos",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
    type: "image"
  },
  {
    title: "Global Networking Lounge",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
    type: "image"
  },
  {
    title: "Business Matching Session",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop",
    type: "image"
  },
  {
    title: "AI Product Showcase",
    category: "Innovation Demos",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    type: "video"
  },
  {
    title: "Summer Expo Highlights",
    category: "Past Expos",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    type: "image"
  },
  {
    title: "Customer Engagement Awards",
    category: "Community",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    type: "image"
  },
  {
    title: "Sustainability Workshop",
    category: "Innovation Demos",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    type: "image"
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/* Compact Hero Section */}
      <section className="pt-24 pb-6 sm:pt-32 sm:pb-12 bg-slate-50/70 border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-orange-700 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5" />
            The Digital Expo Gallery
          </div>
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-1.5 sm:mb-3 text-slate-900 leading-tight">
            Visualizing the <span className="text-orange-600">Future of Trade</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
            Explore the moments that define 247GBS Digital Expo—from live product demos to global business connections.
          </p>
        </div>
      </section>

      {/* Single-Row Scrollable Category Filters */}
      <section className="py-2.5 sm:py-4 sticky top-[82px] sm:top-[88px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center sm:justify-center gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 ${
                  activeCategory === category
                    ? "bg-orange-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Width 100% Mobile Gallery Cards */}
      <section className="py-5 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {filteredItems.map((item, i) => (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-full relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900 h-48 sm:h-56 md:h-64"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  loading="lazy"
                />
                
                {/* Permanent Gradient Overlay for Mobile Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                
                {item.type === "video" && (
                  <div className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 bg-orange-600/95 backdrop-blur-xs rounded-full flex items-center justify-center text-white shadow-md">
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5">
                  <span className="inline-block bg-orange-600 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5 shadow-xs">
                    {item.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Bleed Dark Impact Section (No Double Container) */}
      <section className="w-full py-8 sm:py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-orange-500 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Global Impact
              </div>
              <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-4 tracking-tight leading-snug">
                Our Gallery Tells the <span className="text-orange-500">Story of Growth</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-8 leading-relaxed max-w-xl">
                Behind every showcase is a connection made, a business scaled, and a visitor rewarded. 247GBS is a living, year-round trade ecosystem.
              </p>
              
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                <div>
                  <div className="text-lg sm:text-3xl font-black text-white">50k+</div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px] sm:text-xs">Booth Assets</p>
                </div>
                <div className="border-x border-white/10 px-3">
                  <div className="text-lg sm:text-3xl font-black text-orange-500">1.2M</div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px] sm:text-xs">Interactions</p>
                </div>
                <div>
                  <div className="text-lg sm:text-3xl font-black text-white">24/7</div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px] sm:text-xs">Live Access</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <div className="h-32 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900">
                <img src="https://images.unsplash.com/photo-1591115765373-520b7a217286?q=80&w=600&auto=format&fit=crop" alt="Exhibition" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="h-32 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900">
                <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop" alt="Exhibition" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact CTA */}
      <section className="py-8 sm:py-16 text-center bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-3xl font-extrabold text-slate-900 mb-1.5 sm:mb-3 tracking-tight">Be Part of the Next Chapter</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6 max-w-xl mx-auto">
            Join our upcoming seasonal expo and connect with hundreds of innovative brands and buyers.
          </p>
          <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4">
            <Link
              href="/tickets"
              className="px-5 py-2.5 sm:px-7 sm:py-3 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-orange-700 transition-all shadow-md inline-flex items-center gap-1"
            >
              <span>Attend Next Expo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/partnership"
              className="px-5 py-2.5 sm:px-7 sm:py-3 bg-slate-950 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all shadow-md inline-flex items-center gap-1"
            >
              <span>Exhibit With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
