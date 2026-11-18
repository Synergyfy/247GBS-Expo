"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ChevronDown, User, LogIn } from "lucide-react";
import { TICKER_EVENTS } from "@/data/ticker";
import { getStoredUser } from "@/lib/auth";
import ProfileDropdown from "@/app/component/ProfileDropdown";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [nextEvent, setNextEvent] = useState({ season: "SPRING 2026", dates: "April 10-19, 2026" });
  const [currentUser, setCurrentUser] = useState<any>(null);

  const seasonalEvents = TICKER_EVENTS.filter(e => e.isActive);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);

    const events = [
      { season: "SPRING 2026", start: new Date("2026-04-10"), dates: "April 10-19, 2026" },
      { season: "SUMMER 2026", start: new Date("2026-07-15"), dates: "July 15-24, 2026" },
      { season: "AUTUMN 2026", start: new Date("2026-10-10"), dates: "October 10-19, 2026" },
      { season: "WINTER 2026", start: new Date("2026-12-05"), dates: "December 5-14, 2026" },
    ];

    const now = new Date();
    const upcoming = events.find(event => event.start > now) || events[0];
    setNextEvent(upcoming);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Events",
      href: "#",
      dropdown: [
        { name: "National", href: "/events/national" },
        { name: "Platform-led", href: "/events/platform-led" },
        { name: "Business-led", href: "/events/business-led" },
      ],
    },
    { name: "Exhibit & Partner", href: "/partnership" },
    { name: "Galleries", href: "/galleries" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/90 backdrop-blur-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-black text-lg group-hover:scale-105 transition-transform shadow-md shadow-orange-600/20">
                E
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight tracking-tight">
                  247GBS
                </span>
                <span className="text-[10px] sm:text-xs text-orange-600 font-bold tracking-wider">
                  DIGITAL EXPO
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.dropdown ? (
                    <>
                      <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors">
                        {link.name}
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                      </button>
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-600 transition-colors font-medium"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Action (Top Right): Profile Dropdown if signed in, Login pill if not */}
            <div className="flex lg:hidden items-center gap-2">
              {currentUser ? (
                <ProfileDropdown user={currentUser} compact={true} />
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-orange-600 transition-colors shadow-xs active:scale-95 flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {currentUser ? (
                <ProfileDropdown user={currentUser} compact={false} />
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-orange-600 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>Login</span>
                </Link>
              )}
              <Link
                href={currentUser ? "/tickets" : "/signup?role=customer&redirect=/tickets"}
                className="bg-orange-600 text-white px-5 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-orange-700 transition-all shadow-md shadow-orange-600/20 active:scale-95"
              >
                Tickets
              </Link>
              <Link
                href="/exhibit"
                className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all active:scale-95"
              >
                Exhibit
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Event Banner - Responsive Live Ticker */}
        <div className="relative py-1.5 px-3 sm:px-4 bg-slate-950 border-t border-white/10 overflow-hidden">
          <style>{`
            .ticker-wrapper { 
              display: flex; 
              width: max-content; 
              animation: scroll 35s linear infinite; 
            }
            .ticker-wrapper:hover {
              animation-play-state: paused;
            }
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .ticker-item {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0 1rem;
            }
          `}</style>

          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6 text-white">
            {/* Label Section - Hidden on mobile for maximum ticker space */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0 border-r border-white/15 pr-5">
              <Calendar className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <div className="flex flex-col">
                <span className="font-extrabold text-[9px] uppercase tracking-wider text-orange-400 leading-none">2026</span>
                <span className="font-bold text-[10px] uppercase tracking-wide text-white/60 leading-tight">Expo Season</span>
              </div>
            </div>

            {/* Ticker Scroll Content */}
            <div className="flex-1 overflow-hidden relative py-0.5">
              <div className="ticker-wrapper flex items-center">
                {[...seasonalEvents, ...seasonalEvents, ...seasonalEvents].map((se, i) => (
                  <div key={i} className="ticker-item group">
                    <span className="font-bold text-xs sm:text-sm text-white group-hover:text-orange-400 transition-colors uppercase tracking-tight">{se.season}</span>
                    <div className="flex items-center gap-2 bg-white/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-white/5">
                      <span className="text-[10px] sm:text-xs font-bold text-orange-400 leading-none">{se.dates}</span>
                      <div className="w-1 h-1 bg-white/30 rounded-full" />
                      <span className="text-[10px] sm:text-xs font-medium text-white/70 leading-none group-hover:text-white transition-colors">{se.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticker Action */}
            <Link
              href={currentUser ? "/tickets" : "/signup?role=customer&redirect=/tickets"}
              className="shrink-0 bg-orange-600 hover:bg-orange-500 text-white px-2.5 py-1 sm:px-4 sm:py-1 rounded-full transition-all font-bold text-[10px] uppercase tracking-wider"
            >
              Book
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
