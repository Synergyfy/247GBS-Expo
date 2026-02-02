"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2000&auto=format&fit=crop"
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-slate-900">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImage}
            src={BACKGROUND_IMAGES[currentImage]}
            alt="Digital Exhibition Backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Subtle Dark Overlay to ensure text readability across all images */}
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 pt-40 pb-20">
        <div className="max-w-4xl bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[40px] border border-white/20 shadow-2xl">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
            The World's First <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
              Permanent Digital Expo
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-800 mb-8 max-w-2xl leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-200">
            A living business ecosystem that never closes. Exhibit your brand, earn rewards, and connect with thousands of global businesses and customers 24/7.
          </p>

          {/* Stats/Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Open 24/7/365</p>
                <p className="text-sm text-slate-600">Always Live</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Global Access</p>
                <p className="text-sm text-slate-600">Online Worldwide</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Live Demos</p>
                <p className="text-sm text-slate-600">Interactive Booths</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-400">
            <Link
              href="/tickets"
              className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2"
            >
              Get Visitor Tickets <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/exhibit"
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 hover:border-orange-600 hover:text-orange-600 text-slate-900 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              Become an Exhibitor
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
}
