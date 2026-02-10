"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Calendar, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [nextEvent, setNextEvent] = useState({ season: "SPRING 2026", dates: "April 10-19, 2026" });
  const [displayEvents, setDisplayEvents] = useState([0, 1]); // Which 2 seasons to show as static

  // All 4 seasonal events
  const seasonalEvents = [
    { season: "SPRING 2026", dates: "April 10-19", event: "Brand Launches", color: "emerald" },
    { season: "SUMMER 2026", dates: "July 15-24", event: "Peak Season", color: "amber" },
    { season: "AUTUMN 2026", dates: "Oct 10-19", event: "Product Expo", color: "orange" },
    { season: "WINTER 2026", dates: "Dec 5-14", event: "Holiday Fest", color: "cyan" },
  ];

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

    // Rotate display events every 15 seconds
    const timer = setInterval(() => {
      setDisplayEvents((prev) => [
        (prev[0] + 2) % 4,
        (prev[1] + 2) % 4,
      ]);
    }, 15000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Event",
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md pt-2" : "bg-white/95 backdrop-blur-sm pt-4"
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
                          className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-600 transition-colors"
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
                <div key={link.name} className="flex flex-col gap-2">
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className="flex items-center justify-between text-base font-semibold text-slate-700 hover:text-orange-600 w-full text-left"
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.name ? "rotate-180" : ""}`} />
                      </button>
                      {openDropdown === link.name && (
                        <div className="flex flex-col gap-2 pl-4 border-l-2 border-slate-100 ml-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-sm font-medium text-slate-600 hover:text-orange-600"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-semibold text-slate-700 hover:text-orange-600"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
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
                  href="/partnership"
                  className="bg-slate-900 text-white px-6 py-3 rounded-full text-center font-bold hover:bg-slate-800"
                >
                  Become an Exhibitor
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Event Banner - Dual Event Ticker */}
      <div className="relative py-2 px-4 transition-colors duration-500">
        <style>{`
          .event-banner { display: flex; align-items: center; gap: 1.5rem; overflow: hidden; }
          .static-events { display: flex; gap: 2rem; flex-shrink: 0; align-items: center; }
          .static-event { display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; min-width: fit-content; }
          .event-label { font-bold; font-size: 0.875rem; }
          .event-meta { display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; opacity: 0.85; }
          .event-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.5); }
          .moving-ticker { position: relative; overflow: hidden; flex: 1; height: 1.5rem; display: flex; align-items: center; }
          .ticker-animation { display: flex; gap: 2rem; animation: slideIn 25s linear infinite; white-space: nowrap; align-items: center; }
          @keyframes slideIn { 
            0% { transform: translateX(100%); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateX(-100%); opacity: 0; }
          }
        `}</style>

        {/* Matching Balanced Dark Overlay from Hero Section */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md border-y border-white/5" aria-hidden />

        <div className="relative z-10 text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            {/* Static Events - Show 2 main events */}
            <div className="event-banner">
              <Calendar className="w-4 h-4 shrink-0" />
              <div className="static-events">
                {[displayEvents[0], displayEvents[1]].map((idx) => (
                  <div key={idx} className="static-event">
                    <span className="event-label">{seasonalEvents[idx].season}</span>
                    <div className="event-meta">
                      <span>{seasonalEvents[idx].dates}</span>
                      <div className="event-dot" />
                      <span>{seasonalEvents[idx].event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Moving Ticker - 2 upcoming events scrolling in */}
            <div className="moving-ticker">
              <div className="ticker-animation">
                {[(displayEvents[0] + 2) % 4, (displayEvents[1] + 2) % 4].map((idx) => (
                  <div key={idx} className="static-event">
                    <span className="event-label">{seasonalEvents[idx].season}</span>
                    <div className="event-meta">
                      <span>{seasonalEvents[idx].dates}</span>
                      <div className="event-dot" />
                      <span>{seasonalEvents[idx].event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/tickets"
              className="shrink-0 underline decoration-2 underline-offset-4 hover:text-white/80 transition-colors font-bold text-xs whitespace-nowrap"
            >
              Get Tickets
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
