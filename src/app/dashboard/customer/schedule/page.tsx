"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    MapPin,
    User,
    Download,
    Bell,
    Search,
    Play,
    Timer,
    ChevronRight,
    Star,
    Video
} from "lucide-react";
import { useState } from "react";

const scheduleData = [
    {
        id: 1,
        time: "09:00 AM",
        duration: "45 MIN",
        title: "Opening Keynote: The Future of Retail",
        speaker: "Sarah Johnson",
        role: "CEO at NextGen Commerce",
        track: "Main Stage",
        type: "Keynote",
        status: "Completed",
        isLive: false,
        tags: ["Strategy", "Future"]
    },
    {
        id: 2,
        time: "10:30 AM",
        duration: "60 MIN",
        title: "Panel: AI in Customer Support",
        speaker: "Tech Leaders Panel",
        role: "Multi-Brand Discussion",
        track: "Workshop A",
        type: "Panel",
        status: "Live",
        isLive: true,
        tags: ["AI", "Support"]
    },
    {
        id: 3,
        time: "01:00 PM",
        duration: "90 MIN",
        title: "Product Demo: NextGen CRM",
        speaker: "Salesforce Team",
        role: "Lead Engineers",
        track: "Demo Hall B",
        type: "Demo",
        status: "Upcoming",
        isLive: false,
        tags: ["CRM", "Hands-on"]
    },
    {
        id: 4,
        time: "02:30 PM",
        duration: "60 MIN",
        title: "Workshop: Building Digital Brands",
        speaker: "Emily Chen",
        role: "Growth Marketer",
        track: "Workshop A",
        type: "Workshop",
        status: "Upcoming",
        isLive: false,
        tags: ["Marketing", "Branding"]
    },
    {
        id: 5,
        time: "04:00 PM",
        duration: "45 MIN",
        title: "Closing Remarks & Digital Networking",
        speaker: "The Expo Team",
        role: "Host",
        track: "Main Stage",
        type: "Social",
        status: "Upcoming",
        isLive: false,
        tags: ["Networking"]
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
} as const;

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
} as const;

export default function SchedulePage() {
    const [activeTab, setActiveTab] = useState("All");

    const filteredEvents = activeTab === "All"
        ? scheduleData
        : scheduleData.filter(e => e.type === activeTab || e.track === activeTab);

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-2"
                >
                    <div className="flex items-center gap-2 text-orange-600 font-bold tracking-wider text-sm uppercase">
                        <Calendar className="w-4 h-4" />
                        <span>Live Event Schedule</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Plan Your <span className="text-gradient-orange">Experience</span>
                    </h1>
                    <p className="text-slate-500 max-w-xl">
                        Explore interactive workshops, keynote speakers, and live demos. Stay ahead of the schedule with real-time updates.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex gap-3"
                >
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-semibold hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm">
                        <Download className="w-4 h-4" />
                        Download PDF
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-slate-900/10">
                        <Bell className="w-4 h-4" />
                        Set Reminders
                    </button>
                </motion.div>
            </div>

            {/* Quick Actions / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Current Session", val: "AI in Customer Support", icon: Play, color: "bg-orange-50 text-orange-600" },
                    { label: "Up Next", val: "NextGen CRM Demo", icon: Timer, color: "bg-orange-50 text-orange-600" },
                    { label: "My Sessions", val: "3 Booked", icon: Star, color: "bg-orange-50 text-orange-600" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <p className="font-bold text-slate-800">{stat.val}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 p-1 bg-slate-100/50 rounded-xl w-fit">
                {["All", "Keynote", "Workshop", "Demo", "Main Stage"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab
                            ? "bg-white text-orange-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Schedule List */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
            >
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-900">Today, January 26</span>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search sessions..."
                            className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 w-64 transition-all"
                        />
                    </div>
                </div>

                <div className="grid gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredEvents.map((event) => (
                            <motion.div
                                key={event.id}
                                variants={itemVariants}
                                layout
                                className={`group relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 ${event.isLive ? 'border-orange-200 ring-1 ring-orange-100' : 'border-slate-100'
                                    }`}
                            >
                                {event.isLive && (
                                    <div className="absolute -left-1 top-6 w-2 h-12 bg-orange-600 rounded-r-full shadow-lg shadow-orange-600/40 animate-pulse" />
                                )}

                                <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    {/* Time Card */}
                                    <div className="flex flex-row md:flex-col items-center md:items-start justify-between w-full md:w-32 shrink-0 gap-2">
                                        <div className="flex flex-col">
                                            <span className={`text-xl font-black ${event.isLive ? 'text-orange-600' : 'text-slate-900'}`}>
                                                {event.time}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {event.duration}
                                            </span>
                                        </div>
                                        {event.isLive && (
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase animate-pulse">
                                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                                                Live Now
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${event.type === 'Keynote' ? 'bg-orange-100 text-orange-700' :
                                                event.type === 'Demo' ? 'bg-orange-50 text-orange-600' :
                                                    event.type === 'Workshop' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-700'
                                                }`}>
                                                {event.type}
                                            </span>
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                                <MapPin className="w-3 h-3" />
                                                {event.track}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                                {event.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                                                    <User className="w-4 h-4 text-slate-500" />
                                                </div>
                                                <p className="text-sm text-slate-600">
                                                    <span className="font-bold text-slate-900">{event.speaker}</span>
                                                    <span className="mx-2 text-slate-300">•</span>
                                                    <span className="text-slate-500 italic">{event.role}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {event.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-medium text-slate-400 px-2 py-0.5 border border-slate-100 rounded-md bg-slate-50">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="shrink-0 w-full md:w-auto flex flex-row md:flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                                        {event.status === 'Live' ? (
                                            <button className="flex-1 md:w-40 flex items-center justify-center gap-2 bg-orange-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95">
                                                <Video className="w-4 h-4" />
                                                Join Live
                                            </button>
                                        ) : event.status === 'Completed' ? (
                                            <button className="flex-1 md:w-40 flex items-center justify-center gap-2 border border-slate-200 text-slate-400 font-bold px-6 py-3 rounded-xl bg-slate-50 cursor-not-allowed">
                                                Completed
                                            </button>
                                        ) : (
                                            <button className="flex-1 md:w-40 flex items-center justify-center gap-2 border-2 border-orange-600 text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-600 hover:text-white transition-all group/btn">
                                                <Star className="w-4 h-4 group-hover/btn:fill-white" />
                                                Add to My Plan
                                            </button>
                                        )}
                                        <button className="flex items-center justify-center w-12 h-12 md:w-auto md:h-auto border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Footer Note */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center p-8 border-2 border-dashed border-slate-200 rounded-3xl"
            >
                <p className="text-slate-400 text-sm">
                    Can't find a session? <button className="text-orange-600 font-bold hover:underline">Contact the Help Desk</button> or check out <button className="text-orange-600 font-bold hover:underline">On-Demand Recordings</button>.
                </p>
            </motion.div>
        </div>
    );
}
