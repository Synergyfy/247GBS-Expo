"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Info, Plus, Check, Star, Play,
  ArrowRight, Sparkles, Target, Zap, ShieldCheck, Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import Modal from "@/app/component/Modal";
import { events, eventTypeInfo } from "@/data/events";

export default function EventTypePage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = use(params);
  const type = resolvedParams.type as keyof typeof eventTypeInfo;

  const [selectedEventInfo, setSelectedEventInfo] = useState<any>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState("overview");

  const info = eventTypeInfo[type];
  const filteredEvents = events.filter(e => e.type === type);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Type Not Found</h1>
          <Link href="/" className="text-orange-600 font-bold hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section / Show and Tell */}
      <section className="pt-28 pb-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-100/30 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight"
            >
              {info.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-slate-600 leading-relaxed"
            >
              {info.description}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Play className="w-8 h-8 text-orange-600 fill-orange-600/20" />
                Event Experience
              </h2>
              <div className="aspect-video rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl relative bg-slate-900 group">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Event Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-orange-50 rounded-[3rem] p-10 text-slate-900 relative overflow-hidden group border border-orange-100"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Globe className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-orange-500" />
                Popular Examples
              </h3>
              <div className="space-y-4">
                {info.examples.map((ex, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-lg text-slate-600 font-medium">{ex}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 bg-white rounded-2xl border border-orange-200/50 shadow-sm">
                <p className="text-sm text-slate-500 font-medium italic">
                  "These events are designed to maximize engagement and provide unique value within our digital ecosystem."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="pt-4 pb-20 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Upcoming {info.title}s</h2>
              <p className="text-lg text-slate-600">Discover and book tickets for these exclusive events.</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-slate-600">{filteredEvents.length} Live Events Found</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={event.id}
                className="relative group rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-orange-300 transition-all duration-500 flex flex-col bg-white hover:shadow-2xl hover:shadow-orange-600/10"
              >
                {/* Card Header / Image Area */}
                <div className={`h-56 ${event.image} relative overflow-hidden`}>
                  <Image
                    src={event.fullImage}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-slate-900 shadow-lg">
                      {event.category}
                    </span>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-orange-600 hover:border-orange-600 transition-all">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl inline-block shadow-lg">
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Calendar className="w-4 h-4 text-orange-600" /> {event.date.split(",")[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors leading-tight">
                    {event.name}
                  </h3>
                  <div className="space-y-4 mb-8">
                    <p className="flex items-center gap-2 text-slate-500 font-medium">
                      <MapPin className="w-4 h-4 text-orange-600" /> {event.location}
                    </p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-3.5 h-3.5 ${star <= Math.floor(event.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`} />
                      ))}
                      <span className="text-xs font-bold text-slate-400 ml-2">{event.reviews} reviews</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Entry Price</span>
                      <span className="text-xl font-black text-slate-900">£19.00</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedEventInfo(event);
                        setShowInfoModal(true);
                      }}
                      className="flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all group/btn"
                    >
                      Learn More <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Calendar className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No upcoming events</h3>
              <p className="text-slate-500">Check back later for new {info.title}s.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Ready to join the experience?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Get your General Platform Pass today and unlock access to all events, workshops, and brand showcases.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              href="/tickets"
              className="px-10 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-black/10"
            >
              Get Your Tickets
            </Link>
            <Link
              href="/exhibit"
              className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-black/10"
            >
              Become an Exhibitor
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* EVENT INFO MODAL */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => {
          setShowInfoModal(false);
          setSelectedEventInfo(null);
          setActiveInfoTab("overview");
        }}
        title={selectedEventInfo?.name || "Event Details"}
      >
        {selectedEventInfo && (
          <div className="space-y-8">
            <div className="relative rounded-3xl overflow-hidden bg-black aspect-video group cursor-pointer shadow-2xl">
              <Image
                src={selectedEventInfo.fullImage}
                alt={selectedEventInfo.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
            </div>

            <div className="flex border-b border-slate-100">
              {['overview', 'schedule', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveInfoTab(tab)}
                  className={`px-8 py-4 font-bold text-sm capitalize border-b-2 transition-all ${activeInfoTab === tab
                    ? "border-orange-600 text-orange-600"
                    : "border-transparent text-slate-400 hover:text-slate-800"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-[250px]">
              {activeInfoTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-3">Event Overview</h4>
                    <p className="text-slate-600 leading-relaxed">{selectedEventInfo.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-orange-50/50 p-6 rounded-[2rem] border border-orange-100">
                      <h5 className="font-bold text-orange-900 text-xs mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                        <Star className="w-4 h-4 text-orange-600" /> Exclusive Benefits
                      </h5>
                      <ul className="space-y-3">
                        {selectedEventInfo.benefits.map((benefit: string, i: number) => (
                          <li key={i} className="text-sm text-slate-700 flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                      <h5 className="font-bold text-slate-900 text-xs mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                        <ShieldCheck className="w-4 h-4 text-blue-600" /> Event Details
                      </h5>
                      <div className="space-y-4 text-sm text-slate-600 font-medium">
                        <div className="flex justify-between border-b border-slate-200 pb-2"><span>Organizer:</span> <span className="text-slate-900 font-bold">{selectedEventInfo.organizer}</span></div>
                        <div className="flex justify-between border-b border-slate-200 pb-2"><span>Type:</span> <span className="text-slate-900 font-bold capitalize">{selectedEventInfo.type.replace('-', ' ')}</span></div>
                        <div className="flex justify-between"><span>Format:</span> <span className="text-slate-900 font-bold">Digital-Only</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeInfoTab === 'schedule' && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  {[
                    { time: "09:00 AM", title: "Virtual Lobby Opens", host: "Platform Team" },
                    { time: "10:00 AM", title: "Main Event Launch", host: selectedEventInfo.organizer },
                    { time: "01:00 PM", title: "Live Q&A Sessions", host: "Exhibitor Panel" },
                    { time: "04:00 PM", title: "Networking Hour", host: "All Attendees" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-2xl hover:bg-orange-50 hover:border-orange-200 transition-all group">
                      <div className="bg-slate-900 text-white font-black px-4 py-2 rounded-xl text-xs text-center min-w-[100px] group-hover:bg-orange-600 transition-colors">
                        {item.time}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{item.title}</div>
                        <div className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{item.host}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeInfoTab === 'reviews' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="flex items-center gap-6 mb-8 p-8 bg-slate-50 rounded-[2rem]">
                    <div className="text-6xl font-black text-slate-900 tracking-tighter">{selectedEventInfo.rating}</div>
                    <div>
                      <div className="flex text-yellow-400 text-xl mb-1">★★★★★</div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{selectedEventInfo.reviews} Verified Attendees</div>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs">U</div>
                            User Attendee
                          </span>
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Verified Ticket</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed italic">"The {selectedEventInfo.name} was truly transformative. Highly recommended for anyone in the industry."</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Admission Price</p>
                <p className="text-3xl font-black text-slate-900">£19.00</p>
              </div>
              <Link
                href={`/tickets?season=${selectedEventInfo.id}`}
                className="px-10 py-4 bg-orange-600 text-white rounded-full font-bold shadow-xl shadow-orange-600/30 hover:bg-orange-700 hover:scale-105 transition-all flex items-center gap-2"
              >
                Book Your Ticket <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
