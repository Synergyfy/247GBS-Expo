import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white text-slate-900">
      {/* Background Image with Balanced Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"
          alt="Digital Exhibition Hall"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 py-20">
        <div className="max-w-4xl">
          {/* Event Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm mb-6 animate-in slide-in-from-left-4 duration-700">
            <Calendar className="w-4 h-4" />
            <span>NEXT SEASONAL EVENT: APRIL 10-19, 2026</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
            The World's First <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
              Permanent Digital Expo
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-200">
            A living business ecosystem that never closes. Exhibit your brand, earn rewards, and connect with thousands of global businesses and customers 24/7.
          </p>

          {/* Stats/Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Open 24/7/365</p>
                <p className="text-sm text-slate-500">Always Live</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Global Access</p>
                <p className="text-sm text-slate-500">Online Worldwide</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Live Demos</p>
                <p className="text-sm text-slate-500">Interactive Booths</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-400">
            <Link
              href="/tickets"
              className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2"
            >
              Get Visitor Tickets <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/exhibit"
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 hover:border-orange-600 hover:text-orange-600 text-slate-900 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              Become an Exhibitor
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
}