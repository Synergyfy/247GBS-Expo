"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Calendar } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [nextEvent, setNextEvent] = useState({ season: "SPRING 2026", dates: "April 10-19, 2026" });

  // Season detection for banner colors
  const getSeasonColor = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    
    // SPRING: April 10 - July 14 (Emerald)
    if ((month === 3 && day >= 10) || (month > 3 && month < 6) || (month === 6 && day <= 14)) {
      return "bg-emerald-600";
    }
    // SUMMER: July 15 - October 9 (Amber)
    else if ((month === 6 && day >= 15) || (month > 6 && month < 9) || (month === 9 && day <= 9)) {
      return "bg-amber-600";
    }
    // AUTUMN: October 10 - December 4 (Orange)
    else if ((month === 9 && day >= 10) || (month > 9 && month < 11) || (month === 11 && day <= 4)) {
      return "bg-orange-600";
    }
    // WINTER: December 5 - April 9 (Cyan)
    else {
      return "bg-cyan-600";
    }
  };

  const [bannerColor, setBannerColor] = useState(getSeasonColor());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    // Dynamic Season Logic
    const events = [
      { season: "SPRING 2026", start: new Date("2026-04-10"), dates: "April 10-19, 2026" },
      { season: "SUMMER 2026", start: new Date("2026-07-15"), dates: "July 15-24, 2026" },
      { season: "AUTUMN 2026", start: new Date("2026-10-10"), dates: "October 10-19, 2026" },
      { season: "WINTER 2026", start: new Date("2026-12-05"), dates: "December 5-14, 2026" },
    ];

    const now = new Date();
    const upcoming = events.find(event => event.start > now) || events[0];
    setNextEvent(upcoming);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "What's On", href: "#whats-on" },
    { name: "Who's Here", href: "#exhibitors" },
    { name: "Show Sections", href: "#categories" },
    { name: "Galleries", href: "#gallery" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md pt-2" : "bg-white/95 backdrop-blur-sm pt-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-lg shadow-orange-600/20">
              E
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-lg leading-tight tracking-tight">
                247GBS
              </span>
              <span className="text-xs text-orange-600 font-bold tracking-wide">
                DIGITAL EXPO
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:text-orange-600 transition-colors mr-2">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/login"
              className="text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/tickets"
              className="bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/30"
            >
              Tickets
            </Link>
            <Link
              href="/exhibit"
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              Exhibit
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-100 pt-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100" />
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-full text-center font-bold hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/tickets"
                  className="bg-orange-600 text-white px-6 py-3 rounded-full text-center font-bold hover:bg-orange-700"
                >
                  Get Tickets
                </Link>
                <Link
                  href="/exhibit"
                  className="bg-slate-900 text-white px-6 py-3 rounded-full text-center font-bold hover:bg-slate-800"
                >
                  Become an Exhibitor
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Event Banner - Ticker Tape */}
      <div className={`${bannerColor} text-white py-2 px-4 shadow-inner transition-colors duration-500`}>
        <style>{`
          .ticker-wrapper { overflow: hidden; }
          .ticker-track { display:flex; gap:3rem; min-width:200%; align-items:center; animation: ticker 18s linear infinite; }
          .ticker-item { display:flex; align-items:center; gap:0.75rem; white-space:nowrap; }
          .ticker-track:hover { animation-play-state: paused; }
          @keyframes ticker { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        `}</style>

        <div className="max-w-7xl mx-auto ticker-wrapper">
          <div className="flex items-center text-xs md:text-sm font-bold tracking-wider">
            <Calendar className="w-4 h-4 shrink-0 mr-3" />

            <div className="flex-1 overflow-hidden">
              <div className="ticker-track">
                {/* first pass of items */}
                <div className="ticker-item">
                  <span className="uppercase">SPRING 2026: April 10-19, 2026 — Tickets on sale</span>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
                  <span className="uppercase">SUMMER 2026: July 15-24, 2026 — Early bird ends May</span>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
                  <Link href="/tickets" className="underline decoration-2 underline-offset-4 hover:text-orange-100 transition-colors">
                    Get Your Tickets Now
                  </Link>
                </div>

                {/* duplicate for seamless loop */}
                <div className="ticker-item" aria-hidden="true">
                  <span className="uppercase">SPRING 2026: April 10-19, 2026 — Tickets on sale</span>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
                  <span className="uppercase">SUMMER 2026: July 15-24, 2026 — Early bird ends May</span>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
                  <Link href="/tickets" className="underline decoration-2 underline-offset-4 hover:text-orange-100 transition-colors">
                    Get Your Tickets Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
