"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Info, Plus, Check, Star, Play, X,
  ArrowRight, Zap, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import Modal from "@/app/component/Modal";
import { events, eventTypeInfo } from "@/data/events";

export default function EventTypePage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = use(params);
  const type = resolvedParams.type as keyof typeof eventTypeInfo;

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedEventInfo, setSelectedEventInfo] = useState<any>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const info = eventTypeInfo[type];
  const filteredEvents = events.filter(e => e.type === type);

  const toggleEvent = (event: any) => {
    const isSelected = selectedEvents.includes(event.id);
    if (isSelected) {
      setSelectedEvents(prev => prev.filter(id => id !== event.id));
      setCart(prev => prev.filter(item => item.eventId !== event.id));
    } else {
      setSelectedEvents(prev => [...prev, event.id]);
      setCart(prev => [...prev, {
        id: 'standard',
        name: event.name,
        price: 19,
        type: 'ticket',
        quantity: 1,
        eventId: event.id
      }]);
    }
  };

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Event Category Not Found</h1>
          <Link href="/" className="text-orange-600 font-bold hover:underline text-sm">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Compact Hero + Preview */}
      <section className="pt-24 pb-6 sm:pt-32 sm:pb-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-5 sm:gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold uppercase tracking-wider text-[10px] sm:text-xs mb-1">
                <Zap className="w-3.5 h-3.5" /> Event Format Showcase
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight leading-snug">
                {info.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                {info.description}
              </p>

              {/* Popular Examples Pill Grid */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                {info.examples.map((ex, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-full text-[11px] font-bold text-slate-700">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Compact Video Preview Frame */}
            {isPlayingPreview ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md">
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>● LIVE PREVIEW</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlayingPreview(false)}
                  className="absolute top-3 right-3 z-20 w-8 h-8 bg-slate-950/80 hover:bg-slate-950 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                  title="Close preview"
                  aria-label="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>
                <iframe
                  src="https://www.youtube-nocookie.com/embed/L_LUpnjgPso?autoplay=1&rel=0&modestbranding=1"
                  title={`${info.title} Preview`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div
                onClick={() => setIsPlayingPreview(true)}
                className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md group cursor-pointer"
              >
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>● LIVE PREVIEW</span>
                </div>
                <img
                  src={filteredEvents[0]?.fullImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"}
                  alt={info.title}
                  className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-600 group-hover:bg-orange-500 text-white rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110 border border-white/30">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center text-white text-[11px] font-bold">
                  <span>Interactive 24/7 Hall Preview</span>
                  <span className="bg-black/60 px-2 py-0.5 rounded">{filteredEvents.length} Live Events</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section id="live-events" className="py-6 sm:py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4 sm:mb-8 gap-2">
            <div>
              <h2 className="text-base sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Upcoming {info.title}s
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">Tap any event card to reserve your digital seat.</p>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-slate-700">{filteredEvents.length} Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {filteredEvents.map((event) => {
              const isSelected = selectedEvents.includes(event.id);
              return (
                <div
                  key={event.id}
                  onClick={() => toggleEvent(event)}
                  className={`relative group rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col cursor-pointer bg-white ${
                    isSelected
                      ? "border-orange-600 shadow-lg"
                      : "border-slate-200/80 hover:border-orange-300 shadow-xs"
                  }`}
                >
                  <div className="h-36 sm:h-44 relative overflow-hidden bg-slate-900">
                    <img
                      src={event.fullImage}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start">
                      <span className="bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900">
                        {event.category}
                      </span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-orange-600 text-white shadow-md"
                          : "bg-black/40 backdrop-blur-xs text-white border border-white/30"
                      }`}>
                        {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center text-white">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        <Calendar className="w-3 h-3 text-orange-400" /> {event.date.split(",")[0]}
                      </span>
                      <span className="text-xs font-extrabold bg-orange-600 px-2 py-0.5 rounded-md">£19</span>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-sm sm:text-base font-extrabold mb-1 leading-snug ${isSelected ? "text-orange-600" : "text-slate-900 group-hover:text-orange-600"}`}>
                        {event.name}
                      </h3>
                      <p className="flex items-center gap-1 text-slate-500 text-[11px] sm:text-xs mb-2">
                        <MapPin className="w-3 h-3 text-orange-600 shrink-0" /> {event.location}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-700">{event.rating}</span>
                        <span className="text-[10px] text-slate-400">({event.reviews})</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEventInfo(event);
                          setShowInfoModal(true);
                        }}
                        className="inline-flex items-center gap-1 text-orange-600 font-bold text-xs hover:underline"
                      >
                        Details <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compact CTA */}
      <section className="py-8 sm:py-16 bg-orange-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-3xl font-extrabold mb-1.5 sm:mb-3 tracking-tight">Ready to Join the Experience?</h2>
          <p className="text-xs sm:text-sm text-orange-100 mb-4 sm:mb-6 max-w-xl mx-auto">
            Get your General Platform Pass today and unlock access to all seasonal events, workshops, and brand showcases.
          </p>
          <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4">
            <Link
              href="/tickets"
              className="px-5 py-2.5 sm:px-7 sm:py-3 bg-white text-orange-600 rounded-full font-bold text-xs sm:text-sm hover:bg-orange-50 transition-all shadow-md"
            >
              Get Your Tickets
            </Link>
            <Link
              href="/exhibit"
              className="px-5 py-2.5 sm:px-7 sm:py-3 bg-slate-950 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-slate-900 transition-all shadow-md"
            >
              Become an Exhibitor
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile & Desktop Floating Selection Bar */}
      <AnimatePresence>
        {selectedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-16 lg:bottom-6 left-3 right-3 lg:left-auto lg:right-8 lg:w-96 z-50 bg-slate-950 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-3"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 block">
                {selectedEvents.length} {selectedEvents.length === 1 ? "Event" : "Events"} Selected
              </span>
              <span className="text-base sm:text-lg font-black">
                £{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>
            <Link
              href={`/tickets?${new URLSearchParams({
                selectedEvents: selectedEvents.join(','),
                quantities: cart.map(i => i.quantity).join(',')
              }).toString()}`}
              className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 hover:bg-orange-700 transition-all shadow-md shrink-0"
            >
              <span>Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Event Details Modal */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => {
          setShowInfoModal(false);
          setSelectedEventInfo(null);
        }}
        title={selectedEventInfo?.name || "Event Details"}
      >
        {selectedEventInfo && (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-slate-900 h-36 sm:h-48">
              <img
                src={selectedEventInfo.fullImage}
                alt={selectedEventInfo.name}
                className="w-full h-full object-cover opacity-85"
              />
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{selectedEventInfo.description}</p>

            <div className="bg-slate-50 p-3 rounded-xl space-y-1.5">
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-600" /> Included Benefits
              </h5>
              {selectedEventInfo.benefits.map((benefit: string, i: number) => (
                <div key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {benefit}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Admission</p>
                <p className="text-lg font-black text-slate-900">£19.00</p>
              </div>
              <button
                onClick={() => {
                  toggleEvent(selectedEventInfo);
                  setShowInfoModal(false);
                }}
                className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs shadow-md hover:bg-orange-700 transition-all"
              >
                {selectedEvents.includes(selectedEventInfo.id) ? "Remove from Selection" : "Add to Selection"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
