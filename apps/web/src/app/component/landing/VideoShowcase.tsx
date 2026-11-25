"use client";

import { useState } from "react";
import { Play, X, Sparkles, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface VideoShowcaseProps {
  videoUrl?: string;
  posterImage?: string;
}

function getEmbedUrl(url?: string): string | null {
  if (!url || !url.trim() || url === "#") return null;

  // YouTube matchers
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
  }

  // Vimeo matchers
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  return url;
}

export default function VideoShowcase({ videoUrl, posterImage }: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaceholderNotice, setShowPlaceholderNotice] = useState(false);

  // Read provided prop, env variable, or default showcase video
  const activeVideoUrl =
    videoUrl ||
    process.env.NEXT_PUBLIC_EXPO_VIDEO_URL ||
    "https://www.youtube.com/watch?v=L_LUpnjgPso";
  const embedUrl = getEmbedUrl(activeVideoUrl);
  const poster = posterImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop";

  const handlePlayClick = () => {
    if (embedUrl) {
      setIsPlaying(true);
    } else {
      setShowPlaceholderNotice(true);
    }
  };

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
          {isPlaying && embedUrl ? (
            <div className="relative w-full h-full">
              {embedUrl.endsWith(".mp4") || embedUrl.endsWith(".webm") ? (
                <video
                  src={embedUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <iframe
                  src={embedUrl}
                  title="247GBS Digital Expo Walkthrough"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
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
              onClick={handlePlayClick}
            >
              {/* Showcase Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm">
                <span>● RECORDED PREVIEW</span>
              </div>

              {/* Absolute Background Poster Image */}
              <img
                src={poster}
                alt="247GBS Digital Expo Walkthrough"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
              />
              <div className="absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/30 transition-colors" />

              {/* Centered Glowing Play Button or Placeholder Notice */}
              {!showPlaceholderNotice ? (
                <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-600 group-hover:bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 active:scale-95 border-2 border-white/50">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                    Watch Walkthrough Preview
                  </span>
                </div>
              ) : (
                <div 
                  className="relative z-10 p-4 sm:p-6 text-center max-w-md mx-auto bg-slate-950/90 rounded-2xl border border-white/15 backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" /> Season 2026 Premiere
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white mb-1.5">
                    Official Walkthrough Video Coming Soon
                  </h3>
                  <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
                    The HD video tour is prepared and will unlock with the upcoming 2026 exhibition launch.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href="/tickets"
                      className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-full text-xs font-bold transition-all shadow-xs"
                    >
                      View Season Tickets
                    </Link>
                    <button
                      onClick={() => setShowPlaceholderNotice(false)}
                      className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-medium transition-all"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {/* Clean Duration Tag */}
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold text-white tracking-wide border border-white/10 z-10 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-orange-400" /> Season 2026
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
