"use client";

import React, { useState, useEffect } from "react";
import { 
    Calendar, MapPin, Search, Filter, Play, Star, 
    ArrowRight, Info, Check, Clock, Globe, Shield, Loader2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/app/component/Modal";
import { api } from "@/lib/api";

export default function DiscoverEventsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("overview"); // overview, schedule, reviews
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        setIsLoading(true);
        try {
            const res = await api.get("/customer/events/discover");
            if (res.success) {
                setEvents(res.data);
            }
        } catch (error) {
            console.error("Failed to load events", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs text-center">Scouting the expo floor...</p>
            </div>
        );
    }

    const filteredEvents = events.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Header Section (Awareness Stage) */}
            <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 mb-4 font-display">Discover Events</h1>
                <p className="text-xl text-slate-600 max-w-2xl">
                    Explore upcoming exhibitions, summits, and trade fairs. Find your next experience.
                </p>
            </div>

            {/* Search & Filter (Discovery) */}
            <div className="flex flex-col md:flex-row gap-4 mb-10 sticky top-4 z-20">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search events, organizers, or topics..." 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xl shadow-slate-200/50 text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 shadow-lg shadow-slate-200/50">
                    <Filter className="w-5 h-5" /> Filters
                </button>
            </div>

            {/* Event Grid (Interest Stage) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                    <div 
                        key={event.id}
                        className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                        {/* Event Image */}
                        <div className="h-56 relative overflow-hidden bg-slate-200">
                             <Image 
                                 src={event.image} 
                                 alt={event.title}
                                 fill
                                 className="object-cover group-hover:scale-105 transition-transform duration-700"
                             />
                             <div className="absolute top-4 left-4 flex gap-2">
                                 <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-900 text-center">
                                     {event.category}
                                 </div>
                                 {event.isLive && (
                                     <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black animate-pulse flex items-center gap-1">
                                         <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                         LIVE
                                     </div>
                                 )}
                             </div>
                             <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                                 <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {event.rating} ({event.reviews})
                             </div>
                        </div>

                        {/* Event Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-4">
                                <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">{event.organizer}</div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
                                    {event.title}
                                </h3>
                                <div className="flex flex-col gap-2 text-sm text-slate-500 font-medium">
                                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> {event.date}</span>
                                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {event.location}</span>
                                </div>
                            </div>

                            <p className="text-slate-600 mb-6 line-clamp-2 text-sm">
                                {event.description}
                             </p>

                            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tickets from</p>
                                    <p className="text-xl font-black text-slate-900">{event.price}</p>
                                </div>
                                <button 
                                    onClick={() => setSelectedEvent(event)}
                                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center gap-2"
                                >
                                    Details <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* EVENT DETAILS MODAL (Landing Stage & Interest Stage Deep Dive) */}
            <Modal
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                title={selectedEvent?.title || "Event Details"}
            >
                {selectedEvent && (
                    <div className="space-y-8">
                        {/* Video / Hero Area */}
                        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video group cursor-pointer">
                            <Image 
                                src={selectedEvent.image} 
                                alt={selectedEvent.title}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                             />
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                                     <Play className="w-6 h-6 text-white fill-white" />
                                 </div>
                             </div>
                             <div className="absolute bottom-4 left-4 text-white font-bold text-sm">Watch Preview Trailer</div>
                        </div>

                        {/* Navigation Tabs (Interest Stage) */}
                        <div className="flex border-b border-slate-200">
                            {['overview', 'schedule', 'reviews'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 font-bold text-sm capitalize border-b-2 transition-colors ${
                                        activeTab === tab 
                                        ? "border-orange-600 text-orange-600" 
                                        : "border-transparent text-slate-500 hover:text-slate-800"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[200px]">
                            {activeTab === 'overview' && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">About the Event</h4>
                                        <p className="text-slate-600 leading-relaxed">{selectedEvent.description}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-xl">
                                            <h5 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                                                <Star className="w-4 h-4 text-orange-500" /> Key Benefits
                                            </h5>
                                            <ul className="space-y-2">
                                                {selectedEvent.benefits ? selectedEvent.benefits.map((benefit: string, i: number) => (
                                                    <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                                                        <Check className="w-3 h-3 text-green-500" /> {benefit}
                                                    </li>
                                                )) : (
                                                    <li className="text-sm text-slate-400 italic">No benefits listed.</li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl">
                                            <h5 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                                                <Info className="w-4 h-4 text-blue-500" /> Key Info
                                            </h5>
                                            <div className="space-y-2 text-sm text-slate-600">
                                                <div className="flex justify-between"><span>Organizer:</span> <span className="font-bold">{selectedEvent.organizer}</span></div>
                                                <div className="flex justify-between"><span>Format:</span> <span className="font-bold">Virtual & Hybrid</span></div>
                                                <div className="flex justify-between"><span>Age:</span> <span className="font-bold">18+</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'schedule' && (
                                <div className="space-y-4 animate-in fade-in">
                                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-lg text-xs text-center w-16 text-center">
                                            10:00 AM
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">Opening Keynote</div>
                                            <div className="text-xs text-slate-500">Main Stage • {selectedEvent.organizer}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-lg text-xs text-center w-16 text-center">
                                            11:30 AM
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">Tech Demos & Booth Visits</div>
                                            <div className="text-xs text-slate-500">Exhibition Hall A</div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-blue-50 text-blue-800 text-center rounded-xl text-sm font-bold text-center">
                                        <Link href="#" className="underline">View Full Agenda</Link>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-4 animate-in fade-in">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-5xl font-black text-slate-900">{selectedEvent.rating}</div>
                                        <div>
                                            <div className="flex text-yellow-400 text-sm">★★★★★</div>
                                            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{selectedEvent.reviews} Verified Reviews</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 italic">User reviews are currently being aggregated.</p>
                                </div>
                            )}
                        </div>

                        {/* Footer / CTA (Purchase Flow Entry) */}
                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                            {selectedEvent.hasJoined ? (
                                <>
                                    <div>
                                        <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                            <Check className="w-3.5 h-3.5" /> Ticket Secured
                                        </p>
                                        <p className="text-2xl font-black text-slate-900">Registered</p>
                                    </div>
                                    <Link 
                                        href={selectedEvent.isLive ? `/dashboard/customer/events/${selectedEvent.id}/lobby` : "/dashboard/customer/tickets"} 
                                        className={`px-8 py-4 ${selectedEvent.isLive ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white rounded-full font-bold shadow-xl transition-all flex items-center gap-2`}
                                    >
                                        {selectedEvent.isLive ? "Enter Event Space" : "View My Ticket"} <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Total Price</p>
                                        <p className="text-2xl font-black text-slate-900">{selectedEvent.price}</p>
                                    </div>
                                    <Link 
                                        href={`/tickets?season=${selectedEvent.id}`} 
                                        className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold shadow-xl shadow-orange-600/30 hover:bg-orange-700 transition-all flex items-center gap-2"
                                    >
                                        Get Tickets <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </>
                            )}
                        </div>
                        <p className="text-center text-[10px] text-slate-400">
                            By purchasing you agree to the <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
}