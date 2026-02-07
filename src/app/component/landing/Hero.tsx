"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, Play, Users, Briefcase, Activity } from "lucide-react";
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

  // Determine current season based on user's date
  const getCurrentSeasonIndex = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();

    // SPRING: April 10 - July 14
    if ((month === 3 && day >= 10) || (month > 3 && month < 6) || (month === 6 && day <= 14)) {
      return 0;
    }
    // SUMMER: July 15 - October 9
    else if ((month === 6 && day >= 15) || (month > 6 && month < 9) || (month === 9 && day <= 9)) {
      return 1;
    }
    // AUTUMN: October 10 - December 4
    else if ((month === 9 && day >= 10) || (month > 9 && month < 11) || (month === 11 && day <= 4)) {
      return 2;
    }
    // WINTER: December 5 - April 9
    else {
      return 3;
    }
  };

  useEffect(() => {
    const currentSeasonIndex = getCurrentSeasonIndex();
    // Current season stays 15sec, others stay 10sec
    const delay = currentSeason === currentSeasonIndex ? 15000 : 10000;

    const timer = setInterval(() => {
      setCurrentSeason((prev) => (prev + 1) % SEASONAL_DATA.length);
    }, delay);

    return () => clearInterval(timer);
  }, [currentSeason]);

  const currentData = SEASONAL_DATA[currentSeason];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white">
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
        {/* Balanced Dark Overlay - Enhanced for readability with seasonal gradient */}
        <motion.div
          key={`overlay-${currentSeason}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${currentData.colors.gradient}`}
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 pt-32 pb-20 flex justify-center">
        <div className="max-w-4xl w-full bg-slate-900/60 p-6 md:p-10 rounded-[48px] shadow-2xl text-center">
          {/* Season Badge */}
          <motion.div
            key={`badge-${currentSeason}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className={`inline-block px-4 py-2 border rounded-full text-sm font-bold tracking-wider mb-4 ${currentData.colors.badge}`}
          >
            {currentData.season} 2026 — {currentData.dates.replace(", 2026", "")}
          </motion.div>

          {/* Main Heading - Seasonal */}
          <motion.h1
            key={`headline-${currentSeason}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-4 ${currentData.colors.headline}`}
          >
            {currentData.headline}
          </motion.h1>

          {/* Storyline - Tells the seasonal story */}
          <motion.p
            key={`story-${currentSeason}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-2xl md:text-3xl font-bold mb-6 max-w-3xl mx-auto ${currentData.colors.storyline}`}
          >
            {currentData.storyline}
          </motion.p>

          {/* Subheading */}
          <motion.p
            key={`subheading-${currentSeason}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the world's first living business ecosystem that never closes. Exhibit your brand, earn rewards, and connect 24/7.
          </motion.p>

          {/* Activity Stat - Shows platform vibrancy per season */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="flex items-center justify-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentData.colors.accentIcon}`}>
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">
                  <Counter value={stats.users} />+
                </p>
                <p className="text-xs text-slate-400 tracking-wider">REGISTERED USERS</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">
                  <Counter value={stats.businesses} />+
                </p>
                <p className="text-xs text-slate-400 tracking-wider">REGISTERED BUSINESSES</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center text-green-500`}>
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">
                  <Counter value={stats.attendees} />+
                </p>
                <p className="text-xs text-slate-400 tracking-wider">TOTAL ATTENDEES</p>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            key={`cta-${currentSeason}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/tickets"
              className={`w-full sm:w-auto px-10 py-5 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 ${currentData.colors.cta}`}
            >
              Get Visitor Tickets <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/exhibit"
              className="w-full sm:w-auto px-10 py-5 bg-white/20 border-2 border-white/30 hover:bg-white hover:text-slate-900 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
            >
              Become an Exhibitor
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Modern Gradient Transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </section>
  );
}

