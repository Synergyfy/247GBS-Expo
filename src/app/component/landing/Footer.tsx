import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 text-white group">
              <div className="w-8 h-8 bg-[#D41A5C] rounded flex items-center justify-center font-bold text-white group-hover:scale-105 transition-transform">
                E
              </div>
              <span className="font-bold text-lg">247GBS Expo</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              The world's first permanent digital exhibition platform. Connecting businesses and customers in a living, rewarding economy.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-[#D41A5C] hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-3 text-sm">
              {['About Us', 'How it Works', 'Pricing', 'Core Systems', 'Seasonal Events'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-[#D41A5C] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              {['Help Center', 'Exhibitor Guide', 'Visitor FAQ', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-[#D41A5C] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D41A5C] shrink-0" />
                <span>support@247gbs.com<br />partners@247gbs.com</span>
              </li>
              <li>
                <div className="bg-slate-900 p-4 rounded-xl">
                  <p className="font-bold text-white mb-1">Need help?</p>
                  <p className="text-xs mb-3">Our support team is available 24/7.</p>
                  <button className="w-full bg-slate-800 text-white py-2 rounded text-xs font-bold hover:bg-[#D41A5C] transition-colors">
                    Start Live Chat
                  </button>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 text-center text-xs">
          <p>© 2026 247GBS Digital Expo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
