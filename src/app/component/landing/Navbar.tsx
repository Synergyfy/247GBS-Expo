"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
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
        scrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
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
            <button className="p-2 text-slate-600 hover:text-orange-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
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
    </nav>
  );
}
