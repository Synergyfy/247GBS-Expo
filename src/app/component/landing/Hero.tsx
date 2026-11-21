"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Users, Briefcase, Activity, Calendar } from "lucide-react";
import { motion, AnimatePresence, animate } from "framer-motion";

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}

const SEASONAL_DATA = [
  {
    season: "SPRING",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
    headline: "Spring Renewal",
    storyline: "Fresh ideas bloom. New brands launch their vision.",
    dates: "April 10-19, 2026",
    activityStat: "500+ New Exhibitors",
    activityDesc: "Spring into action this April",
    colors: {
      badge: "bg-emerald-600/30 border-emerald-500/50 text-emerald-300",
      headline: "text-emerald-300",
      storyline: "text-emerald-200",
      accentIcon: "bg-emerald-600/20 text-emerald-500",
      cta: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30",
      gradient: "from-emerald-500/20 via-slate-900/40 to-slate-900/60"
    }
  },
  {
    season: "SUMMER",
    image: "https://images.unsplash.com/photo-1519671482677-504be0270b7b?q=80&w=2000&auto=format&fit=crop",
    headline: "Summer Energy",
    storyline: "Peak season. Peak connections. The world is here.",
    dates: "July 15-24, 2026",
    activityStat: "10K+ Daily Visitors",
    activityDesc: "Record engagement in July",
    colors: {
      badge: "bg-amber-600/30 border-amber-500/50 text-amber-300",
      headline: "text-amber-300",
      storyline: "text-amber-200",
      accentIcon: "bg-amber-600/20 text-amber-500",
      cta: "bg-amber-600 hover:bg-amber-700 shadow-amber-600/30",
      gradient: "from-amber-500/20 via-slate-900/40 to-slate-900/60"
    }
  },
  {
    season: "AUTUMN",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2000&auto=format&fit=crop",
    headline: "Autumn Growth",
    storyline: "Innovation seasons. New products unveiled.",
    dates: "October 10-19, 2026",
    activityStat: "1,200+ Product Launches",
    activityDesc: "Harvest season for creators",
    colors: {
      badge: "bg-orange-600/30 border-orange-500/50 text-orange-300",
      headline: "text-orange-300",
      storyline: "text-orange-200",
      accentIcon: "bg-orange-600/20 text-orange-500",
      cta: "bg-orange-600 hover:bg-orange-700 shadow-orange-600/30",
      gradient: "from-orange-500/20 via-slate-900/40 to-slate-900/60"
    }
  },
  {
    season: "WINTER",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop",
    headline: "Winter Festivities",
    storyline: "Year-end celebrations. Brands shine bright.",
    dates: "December 5-14, 2026",
    activityStat: "20K+ Deals & Rewards",
    activityDesc: "Holiday shopping peak",
    colors: {
      badge: "bg-cyan-600/30 border-cyan-500/50 text-cyan-300",
      headline: "text-cyan-300",
      storyline: "text-cyan-200",
      accentIcon: "bg-cyan-600/20 text-cyan-500",
      cta: "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/30",
      gradient: "from-cyan-500/20 via-slate-900/40 to-slate-900/60"
    }
  }
];

export default function Hero() {
  const [currentSeason, setCurrentSeason] = useState(0);
  const [stats, setStats] = useState({
    users: 15420,
    businesses: 850,
    attendees: 42300
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 3),
        businesses: prev.businesses + (Math.random() > 0.9 ? 1 : 0),
        attendees: prev.attendees + Math.floor(Math.random() * 5)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentSeasonIndex = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();

    if ((month === 3 && day >= 10) || (month > 3 && month < 6) || (month === 6 && day <= 14)) {
      return 0;
    } else if ((month === 6 && day >= 15) || (month > 6 && month < 9) || (month === 9 && day <= 9)) {
      return 1;
    } else if ((month === 9 && day >= 10) || (month > 9 && month < 11) || (month === 11 && day <= 4)) {
      return 2;
    } else {
      return 3;
    }
  };

  useEffect(() => {
    const currentSeasonIndex = getCurrentSeasonIndex();
    const delay = currentSeason === currentSeasonIndex ? 15000 : 10000;

    const timer = setInterval(() => {
      setCurrentSeason((prev) => (prev + 1) % SEASONAL_DATA.length);
    }, delay);

    return () => clearInterval(timer);
  }, [currentSeason]);

  const currentData = SEASONAL_DATA[currentSeason];

  return (
    <section className="relative min-h-[82dvh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950 text-white">
      {/* Seasonal Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSeason}
            src={currentData.image}
            alt={`${currentData.season} Exhibition Backdrop`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <motion.div
          key={`overlay-${currentSeason}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${currentData.colors.gradient}`}
        />
      </div>

      {/* Main Content Card - Scaled tightly for Mobile Above-The-Fold Visibility */}
      <div className="container relative z-10 px-3 sm:px-6 pt-20 sm:pt-28 md:pt-36 pb-4 sm:pb-12 md:pb-20 flex justify-center">
        <div className="max-w-4xl w-full bg-slate-950/70 backdrop-blur-md p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[40px] shadow-2xl border border-white/10 text-center">
          
          {/* Season Badge */}
          <motion.div
            key={`badge-${currentSeason}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 border rounded-full text-[11px] sm:text-xs md:text-sm font-bold tracking-wider mb-2 sm:mb-3 ${currentData.colors.badge}`}
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{currentData.season} 2026 — {currentData.dates.replace(", 2026", "")}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            key={`headline-${currentSeason}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={`text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-1 sm:mb-3 ${currentData.colors.headline}`}
          >
            {currentData.headline}
          </motion.h1>

          {/* Storyline */}
          <motion.p
            key={`story-${currentSeason}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-sm sm:text-lg md:text-2xl font-bold mb-2 sm:mb-4 max-w-2xl mx-auto leading-snug ${currentData.colors.storyline}`}
          >
            {currentData.storyline}
          </motion.p>

          {/* Subheading - Shown on tablets and desktop, compact on mobile */}
          <motion.p
            key={`subheading-${currentSeason}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs sm:text-sm md:text-base text-slate-300 mb-3 sm:mb-6 max-w-xl mx-auto leading-relaxed hidden sm:block"
          >
            Experience the world's first living business ecosystem that never closes. Exhibit your brand, earn rewards, and connect 24/7.
          </motion.p>

          {/* Live Activity Stats - Compact Horizontal 3-Column on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-1.5 sm:gap-4 mb-4 sm:mb-6 md:mb-8 p-2 sm:p-4 bg-slate-900/60 rounded-xl sm:rounded-2xl border border-white/5"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 text-center sm:text-left">
              <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${currentData.colors.accentIcon}`}>
                <Users className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="font-extrabold text-white text-xs sm:text-base leading-tight">
                  <Counter value={stats.users} />+
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Users</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 text-center sm:text-left border-x border-white/10 px-1">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                <Briefcase className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="font-extrabold text-white text-xs sm:text-base leading-tight">
                  <Counter value={stats.businesses} />+
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Brands</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 text-center sm:text-left">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-green-600/20 flex items-center justify-center text-green-400 shrink-0">
                <Activity className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="font-extrabold text-white text-xs sm:text-base leading-tight">
                  <Counter value={stats.attendees} />+
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Attendees</p>
              </div>
            </div>
          </motion.div>

          {/* Primary Action Buttons - Side-by-Side on Mobile */}
          <motion.div
            key={`cta-${currentSeason}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4"
          >
            <Link
              href={`/tickets?season=${['spring2026', 'summer2026', 'health', 'fintech'][currentSeason]}`}
              className={`w-full sm:w-auto px-3 sm:px-8 py-2.5 sm:py-3.5 text-white rounded-xl sm:rounded-full font-bold text-xs sm:text-base transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95 ${currentData.colors.cta}`}
            >
              <span>Get Tickets</span> <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
            <Link
              href="/exhibit"
              className="w-full sm:w-auto px-3 sm:px-8 py-2.5 sm:py-3.5 bg-white/10 hover:bg-white hover:text-slate-900 border border-white/20 text-white rounded-xl sm:rounded-full font-bold text-xs sm:text-base transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Exhibit</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Modern Gradient Transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent pointer-events-none" />
    </section>
  );
}
