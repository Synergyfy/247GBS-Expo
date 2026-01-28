import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-orange-600 text-white py-16 border-t border-orange-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 text-white group">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-orange-600 group-hover:scale-105 transition-transform">
                E
              </div>
              <span className="font-bold text-lg">247GBS Expo</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-orange-50">
              The world's first permanent digital exhibition platform. Connecting businesses and customers in a living, rewarding economy.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-orange-700 flex items-center justify-center hover:bg-white hover:text-orange-600 transition-all">
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
                  <Link href="#" className="hover:text-orange-200 transition-colors text-orange-50">{item}</Link>
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
                  <Link href="#" className="hover:text-orange-200 transition-colors text-orange-50">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-orange-50">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <span>support@247gbs.com<br />partners@247gbs.com</span>
              </li>
              <li>
                <div className="bg-orange-700 p-4 rounded-xl border border-orange-500">
                  <p className="font-bold text-white mb-1">Need help?</p>
                  <p className="text-xs mb-3 text-orange-100">Our support team is available 24/7.</p>
                  <button className="w-full bg-white text-orange-600 py-2 rounded text-xs font-bold hover:bg-orange-50 transition-colors">
                    Start Live Chat
                  </button>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-orange-500 pt-8 text-center text-xs text-orange-200">
          <p>© 2026 247GBS Digital Expo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}