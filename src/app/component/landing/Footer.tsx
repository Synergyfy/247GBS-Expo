import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Globe } from "lucide-react";

export default function Footer() {
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
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
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
                <li><Link href="#" className="hover:text-orange-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Get in Touch</h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">support@247gbs.com</p>
                <p className="text-[11px] text-slate-500">partners@247gbs.com</p>
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
    </footer>
  );
}
