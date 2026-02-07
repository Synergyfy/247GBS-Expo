"use client";

import Navbar from "@/app/component/landing/Navbar";
import Hero from "@/app/component/landing/Hero";
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
    <main className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <Hero />
      <EventTypes />
      <StatsSection />
      <Gallery />
      <NewsTrend />
      <SeasonalEvents />
      <CoreSystems />
      <UserJourney />
      
      {/* CTA Section */}
      <section className="py-24 bg-orange-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join the Revolution?</h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Whether you are a global brand or a smart shopper, there is a place for you in our digital economy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl">
              Get Started for Free
            </button>
            <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors shadow-xl border border-slate-700">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}