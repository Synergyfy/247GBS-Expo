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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImage}
            src={BACKGROUND_IMAGES[currentImage]}
            alt="Digital Exhibition Backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Balanced Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/30" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 pt-32 pb-20 flex justify-center">
        <div className="max-w-4xl w-full bg-slate-900/60 p-10 md:p-16 rounded-[48px] shadow-2xl text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 animate-in slide-in-from-bottom-4 duration-700 delay-100">
            Find your ideal <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              digital expo connection
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-200">
            Experience the world's first living business ecosystem that never closes. Exhibit your brand, earn rewards, and connect 24/7.
          </p>

          {/* Stats/Info Grid - Centered & Brighter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-600/20 flex items-center justify-center text-orange-500">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Open 24/7/365</p>
                <p className="text-xs text-slate-400 tracking-wider">ALWAYS LIVE</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Global Access</p>
                <p className="text-xs text-slate-400 tracking-wider">WORLDWIDE</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center text-green-500">
                <Play className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Live Demos</p>
                <p className="text-xs text-slate-400 tracking-wider">INTERACTIVE</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-400">
            <Link
              href="/tickets"
              className="w-full sm:w-auto px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
            >
              Get Visitor Tickets <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/exhibit"
              className="w-full sm:w-auto px-10 py-5 bg-white/20 border-2 border-white/30 hover:bg-white hover:text-slate-900 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
            >
              Become an Exhibitor
            </Link>
          </div>
        </div>
      </div>

      {/* Modern Gradient Transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </section>
  );
}

