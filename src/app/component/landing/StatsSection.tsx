"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="relative w-full bg-orange-600 text-white py-10 sm:py-16 md:py-20 overflow-hidden">
      {/* Centered Content Container with constrained text width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-5 lg:pr-8">
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug tracking-tight">
                Experience the UK's Premier Digital Expo, connecting businesses 24/7.
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-orange-100 max-w-xl leading-relaxed">
                Discover the latest trends in technology, trade, and lifestyle with expert insights and innovative products to grow your business.
              </p>
            </div>

            {/* Compact Responsive Stats Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-2.5 border-y border-white/20 my-3">
              {/* Stat 1 */}
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black flex items-baseline tracking-tight">
                  2,500<span className="text-amber-300 text-base sm:text-xl md:text-2xl ml-0.5">+</span>
                </div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-100 mt-0.5">Brands</p>
              </div>
              
              {/* Stat 2 */}
              <div className="border-l border-white/20 pl-2.5 sm:pl-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black flex items-baseline tracking-tight">
                  50<span className="text-amber-300 text-base sm:text-xl md:text-2xl ml-0.5">k+</span>
                </div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-100 mt-0.5">Visitors</p>
              </div>

              {/* Stat 3 */}
              <div className="border-l border-white/20 pl-2.5 sm:pl-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black flex items-baseline tracking-tight">
                  365
                </div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 mt-0.5">Days Innovation</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <Link 
                href="/tickets" 
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-orange-50 text-orange-600 font-bold rounded-xl transition-all shadow-md text-xs sm:text-sm flex items-center gap-1.5 active:scale-95"
              >
                <span>Get your tickets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link 
                href="/get-started" 
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-slate-950 hover:bg-slate-900 border border-white/20 text-white font-bold rounded-xl transition-all shadow-md text-xs sm:text-sm active:scale-95"
              >
                Find out more
              </Link>
            </div>
          </div>

          {/* Right Content - Couple Illustration returned & properly scaled */}
          <div className="relative flex justify-center lg:justify-end mt-4 lg:mt-0">
             <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] h-[280px] sm:h-[380px] lg:h-[500px] -mb-10 sm:-mb-16 lg:-mb-24 z-20">
                <Image 
                  src="/Creative-Couple-with-IHS-totes.webp"
                  alt="Couple experiencing the expo"
                  fill
                  className="object-contain object-bottom select-none pointer-events-none"
                  priority
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
