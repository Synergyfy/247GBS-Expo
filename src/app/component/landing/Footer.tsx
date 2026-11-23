"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Globe, X } from "lucide-react";

const SOCIAL_LINKS = [
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: Twitter, href: "https://x.com", label: "X (Twitter)" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const [legalDoc, setLegalDoc] = useState<"terms" | "privacy" | null>(null);

  return (
    <footer className="bg-slate-950 text-white pt-8 sm:pt-14 pb-24 sm:pb-14 border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-12">
          
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3 text-white group">
              <div className="w-7 h-7 bg-orange-600 rounded-lg flex items-center justify-center font-black text-white text-xs group-hover:scale-105 transition-transform shadow-md shadow-orange-600/30">
                E
              </div>
              <span className="font-extrabold text-base tracking-tight">247GBS Expo</span>
            </Link>
            <p className="text-xs leading-relaxed mb-4 text-slate-400 max-w-sm">
              The premier 24/7 digital exhibition platform connecting global brands, trade leaders, and visitors in a rewarding living economy.
            </p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all text-slate-400"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4 md:contents">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-orange-500" /> Platform
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/tickets" className="hover:text-orange-400 transition-colors">Tickets & Cart</Link></li>
                <li><Link href="/events/national" className="hover:text-orange-400 transition-colors">National Expo</Link></li>
                <li><Link href="/galleries" className="hover:text-orange-400 transition-colors">Exhibitor Halls</Link></li>
                <li><Link href="/news" className="hover:text-orange-400 transition-colors">News & Trends</Link></li>
                <li><Link href="/exhibit" className="hover:text-orange-400 transition-colors">Exhibitor Booths</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Support</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/get-started" className="hover:text-orange-400 transition-colors">Help Center</Link></li>
                <li><Link href="/partnership" className="hover:text-orange-400 transition-colors">Partnerships</Link></li>
                <li><Link href="/login" className="hover:text-orange-400 transition-colors">Sign In</Link></li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalDoc("terms")}
                    className="hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalDoc("privacy")}
                    className="hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Get in Touch</h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <a href="mailto:support@247gbs.com" className="text-white font-medium hover:text-orange-400 transition-colors block">
                  support@247gbs.com
                </a>
                <a href="mailto:partners@247gbs.com" className="text-[11px] text-slate-500 hover:text-orange-400 transition-colors block">
                  partners@247gbs.com
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-[11px] text-slate-500">
          <p>© 2026 247GBS Digital Expo. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Legal Policy Modal */}
      {legalDoc && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLegalDoc(null)}
        >
          <div
            className="bg-white text-slate-900 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">
                {legalDoc === "terms" ? "Terms of Service" : "Privacy Policy"}
              </h3>
              <button
                type="button"
                onClick={() => setLegalDoc(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3 text-xs text-slate-600 leading-relaxed max-h-[65vh] overflow-y-auto">
              {legalDoc === "terms" ? (
                <>
                  <p>
                    Welcome to 247GBS Digital Expo. By accessing exhibitor booths, purchasing event passes, or participating in live trade sessions, you agree to comply with MCOM Ecosystem marketplace standards and platform governance policies.
                  </p>
                  <p>
                    All event passes and ticket tiers are subject to Super Admin pricing caps and refund policies. Exhibitors are responsible for the accuracy of their product listings and fulfilment through MCOM Mall.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    247GBS Digital Expo respects your privacy and protects your account information in accordance with Central Hub Solution (CHS) security and data governance standards.
                  </p>
                  <p>
                    We collect only the information required to issue digital passes, synchronize MCOM Reward points, and deliver event notifications. You can update your privacy preferences at any time from your dashboard settings.
                  </p>
                </>
              )}
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
