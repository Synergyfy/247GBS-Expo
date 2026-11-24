"use client";

import Navbar from "@/app/component/landing/Navbar";
import Hero from "@/app/component/landing/Hero";
import VideoShowcase from "@/app/component/landing/VideoShowcase";
import EventTypes from "@/app/component/landing/EventTypes";
import StatsSection from "@/app/component/landing/StatsSection";
import Gallery from "@/app/component/landing/Gallery";
import NewsTrend from "@/app/component/landing/NewsTrend";
import CoreSystems from "@/app/component/landing/CoreSystems";
import UserJourney from "@/app/component/landing/UserJourney";
import SeasonalEvents from "@/app/component/landing/SeasonalEvents";
import Footer from "@/app/component/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-clip max-w-full">
      <Navbar />
      <Hero />
      <VideoShowcase />
      <EventTypes />
      <StatsSection />
      <Gallery />
      <NewsTrend />
      <SeasonalEvents />
      <CoreSystems />
      <UserJourney />
      
      {/* CTA Section */}
      <section className="py-8 sm:py-16 md:py-20 bg-orange-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold mb-1.5 sm:mb-4 tracking-tight">
            Ready to Join the Digital Expo?
          </h2>
          <p className="text-[11px] sm:text-sm md:text-base text-orange-100 mb-4 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            Whether exhibiting your brand to thousands of global buyers or exploring as a visitor, join our living ecosystem 24/7.
          </p>
          <div className="flex flex-row justify-center gap-2 sm:gap-3 max-w-md mx-auto">
            <a 
              href="/get-started" 
              className="bg-white text-orange-600 px-4 py-2 sm:px-7 sm:py-3 rounded-full font-bold text-xs sm:text-sm hover:bg-orange-50 transition-all shadow-md active:scale-95 text-center"
            >
              Get Started Free
            </a>
            <a 
              href="/partnership" 
              className="bg-slate-950 text-white px-4 py-2 sm:px-7 sm:py-3 rounded-full font-bold text-xs sm:text-sm hover:bg-slate-900 transition-all shadow-md border border-slate-800 active:scale-95 text-center"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}