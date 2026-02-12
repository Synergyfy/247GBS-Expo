"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    Calendar,
    MapPin,
    Users,
    ArrowRight,
    MessageSquare,
    Globe,
    Zap,
    Sparkles,
    ShieldCheck,
    LayoutGrid,
    LayoutList,
    Clock,
    Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "@/data/events";
import B2BChatbot from "@/app/component/B2BChatbot";

export default function BusinessMarketplacePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const categories = ["All", "Technology", "Trade", "Finance", "Retail", "Health", "Environment"];

    const filteredEvents = events.filter(event => {
        const matchesSearchText = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || event.category === activeCategory;
        return matchesSearchText && matchesCategory;
    });

    const handleInquire = (event: any) => {
        setSelectedEvent(event);
        setIsChatOpen(true);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest">Global Marketplace</div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            {events.length} Active Opportunities
                        </div>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">Discovery Center</h1>
                    <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                        Explore upcoming events across the platform and discover exhibition opportunities to grow your business globally.
                    </p>
                </div>

                <div className="flex p-1 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        <LayoutList className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                <div className="lg:col-span-2 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for events, industries or organizers..."
                        className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-slate-900"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="lg:col-span-2 flex overflow-x-auto pb-2 gap-2 custom-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all text-sm ${activeCategory === cat
                                    ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20'
                                    : 'bg-white text-slate-500 border border-slate-100 hover:border-orange-200 hover:text-orange-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Event List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'}>
                <AnimatePresence mode="popLayout">
                    {filteredEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden flex ${viewMode === 'list' ? 'flex-row h-72' : 'flex-col'}`}
                        >
                            <div className={`relative ${viewMode === 'list' ? 'w-1/3 h-full' : 'h-64 w-full'}`}>
                                <img
                                    src={event.fullImage}
                                    alt={event.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <div className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
                                        {event.category}
                                    </div>
                                    {event.type === 'national' && (
                                        <div className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                                            <Star className="w-3 h-3 fill-white" /> Flagship
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-3 text-white/90 text-xs font-bold mb-2">
                                        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                                            <Clock className="w-3.5 h-3.5" /> {event.date}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`p-8 flex-1 flex flex-col justify-between ${viewMode === 'list' ? 'py-6' : ''}`}>
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.organizer}</p>
                                        <div className="flex items-center gap-1 text-orange-600 font-black text-xs">
                                            <Users className="w-3.5 h-3.5" /> 2k+ Exhibitors
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-4 leading-tight group-hover:text-orange-600 transition-colors">{event.name}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
                                        {event.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {event.benefits.slice(0, 2).map((benefit: string, i: number) => (
                                            <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                                <Zap className="w-3 h-3 text-orange-500" />
                                                {benefit}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleInquire(event)}
                                        className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 group/btn"
                                    >
                                        <MessageSquare className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                                        Inquire to Exhibit
                                    </button>
                                    <button className="p-4 bg-orange-50 text-orange-600 rounded-2xl hover:bg-orange-600 hover:text-white transition-all border border-orange-100 group/link">
                                        <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredEvents.length === 0 && (
                    <div className="col-span-full py-32 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-slate-300 mb-8 shadow-sm">
                            <Globe className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">No events found matching your search</h3>
                        <p className="text-slate-500 max-w-sm font-medium">Try broadening your search criteria or explore other industries to find new opportunities.</p>
                        <button
                            onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
                            className="mt-8 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-bold text-sm tracking-widest uppercase hover:bg-orange-600 transition-all flex items-center gap-3"
                        >
                            Reset Discovery Center
                        </button>
                    </div>
                )}
            </div>

            {/* B2B Chatbot Instance */}
            {selectedEvent && (
                <B2BChatbot
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    eventName={selectedEvent.name}
                    organizer={selectedEvent.organizer}
                />
            )}

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 4px;
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
