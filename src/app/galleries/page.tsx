"use client";

import { motion } from "framer-motion";
import { 
  Camera, 
  Play, 
  Maximize2, 
  ExternalLink, 
  Sparkles,
  Calendar,
  Users,
  Image as ImageIcon,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
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
    size: "large",
    type: "video"
  },
  {
    title: "Tech Innovation Hub",
    category: "Innovation Demos",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
    size: "small",
    type: "image"
  },
  {
    title: "Global Networking Lounge",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
    size: "small",
    type: "image"
  },
  {
    title: "Business Matching Session",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop",
    size: "medium",
    type: "image"
  },
  {
    title: "AI Product Showcase",
    category: "Innovation Demos",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    size: "medium",
    type: "video"
  },
  {
    title: "Summer Expo Highlights",
    category: "Past Expos",
    image: "https://images.unsplash.com/photo-1531050171651-a3a4ca216bb7?q=80&w=800&auto=format&fit=crop",
    size: "small",
    type: "image"
  },
  {
    title: "Customer Engagement Awards",
    category: "Community",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    size: "medium",
    type: "image"
  },
  {
    title: "Sustainability Workshop",
    category: "Innovation Demos",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    size: "small",
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest mb-6 border border-orange-200"
            >
              <Camera className="w-4 h-4" />
              The Digital Expo Gallery
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black tracking-tight mb-8 text-slate-900"
            >
              Visualizing the <span className="text-orange-600">Future of Trade</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 leading-relaxed mb-12 max-w-2xl mx-auto"
            >
              Explore the moments that define 247GBS Digital Expo. From groundbreaking innovations to global community connections.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                  activeCategory === category
                    ? "bg-slate-900 text-white shadow-xl scale-105"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredItems.map((item, i) => (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group rounded-[32px] overflow-hidden break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      {item.type === "video" && (
                        <div className="w-6 h-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                          <Play className="w-3 h-3 fill-current" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                    <div className="flex gap-4">
                      <button className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-slate-900 transition-all">
                        <Maximize2 className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-slate-900 transition-all">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Highlight Section */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 lg:mx-8 mb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-6">
                <Sparkles className="w-4 h-4" /> Global Impact
              </div>
              <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight leading-tight">
                Our Gallery Tells the <span className="text-orange-500">Story</span> of Growth
              </h2>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                Behind every image is a connection made, a business scaled, and a customer rewarded. 247GBS is more than a platform—it's a vibrant ecosystem.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl lg:text-5xl font-black text-white mb-2">50k+</div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Exhibition Assets</p>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-black text-white mb-2">1.2M</div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Moments Captured</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1591115765373-520b7a217286?q=80&w=400" alt="Exhibition" fill className="object-cover" />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=400" alt="Exhibition" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-3xl overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=400" alt="Exhibition" fill className="object-cover" />
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=400" alt="Exhibition" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tight">Be part of the next chapter</h2>
          <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto italic">
            "The best way to predict the future is to create it. Join our next seasonal expo and let's build something extraordinary together."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/tickets" className="px-12 py-5 bg-orange-600 text-white rounded-full font-bold text-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 flex items-center gap-2">
              Attend Next Expo <ChevronRight className="w-6 h-6" />
            </Link>
            <Link href="/partnership" className="px-12 py-5 bg-slate-900 text-white rounded-full font-bold text-xl hover:bg-slate-800 transition-all flex items-center gap-2">
              Exhibit With Us <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
