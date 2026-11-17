"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "M7lc1UVf-VE"; // Clean demo walkthrough embed

  return (
    <section className="relative py-8 sm:py-16 md:py-20 bg-slate-950 text-white overflow-hidden border-t border-white/5">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Inside the <span className="text-orange-500">247GBS Digital Expo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-1 text-xs sm:text-sm text-slate-400"
          >
            A quick 2-minute tour of our 24/7 exhibition floor, live merchant booths, and access pass.
          </motion.p>
        </div>

        {/* Video Player Card - 16:9 Aspect Ratio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 aspect-video group"
        >
          {isPlaying ? (
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="247GBS Digital Expo Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-2.5 right-2.5 z-20 bg-slate-950/80 hover:bg-slate-950 text-white p-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                title="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div 
              className="relative w-full h-full cursor-pointer flex items-center justify-center overflow-hidden" 
              onClick={() => setIsPlaying(true)}
            >
              {/* Absolute Background Poster Image */}
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"
                alt="247GBS Digital Expo Walkthrough"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

              {/* Centered Glowing Play Button */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-600 group-hover:bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 active:scale-95 border-2 border-white/50">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Clean Duration Tag */}
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold text-white tracking-wide border border-white/10 z-10">
                2:14
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
