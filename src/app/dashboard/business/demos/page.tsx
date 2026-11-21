"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Video,
    Calendar,
    Users,
    TrendingUp,
    Play,
    Plus,
    ChevronDown,
    ArrowUpRight,
    ShoppingBag,
} from "lucide-react";
import Modal from "@/app/component/Modal";

export default function LiveDemosPage() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [sessionTitle, setSessionTitle] = useState("");
    const [sessionDate, setSessionDate] = useState("Tomorrow, 10:00 AM");
    const [hall, setHall] = useState("Virtual Main Hall A");
    const [showStreamGuide, setShowStreamGuide] = useState(false);

    const [sessions, setSessions] = useState([
        {
            id: "DEMO-101",
            title: "Product Launch: Gen 4 Smart Hub & AI Core",
            time: "Tomorrow, 10:00 AM",
            hall: "Virtual Main Hall A",
            attendees: "142 Registered",
            status: "Upcoming",
            pinnedProduct: "Smart Home Hub Gen 4 (£129.99)",
        },
        {
            id: "DEMO-102",
            title: "Live Q&A: Enterprise Cloud Architecture",
            time: "Fri 20 Mar, 02:30 PM",
            hall: "Breakout Stage B",
            attendees: "88 Registered",
            status: "Scheduled",
            pinnedProduct: "Enterprise Cloud Suite (£499.00)",
        },
    ]);

    const handleCreateDemo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!sessionTitle.trim()) return;
        setSessions([
            {
                id: `DEMO-10${sessions.length + 1}`,
                title: sessionTitle.trim(),
                time: sessionDate,
                hall,
                attendees: "0 Registered",
                status: "Scheduled",
                pinnedProduct: "MCOM Mall Catalog Item",
            },
            ...sessions,
        ]);
        setSessionTitle("");
        setIsCreateOpen(false);
    };

    const getStatusColor = (status: string) => {
        if (status === "Live Now") return "text-red-600";
        if (status === "Upcoming") return "text-orange-600";
        return "text-blue-600";
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        Live Booth Demos & Stage Streams
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Broadcast live product demos with direct MCOM Mall purchase overlays and interactive chat.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all shadow-sm"
                    >
                        <Plus className="w-3.5 h-3.5" /> Schedule Live Demo
                    </button>
                </div>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Scheduled Demos", value: String(sessions.length), sub: "Across expo stages", icon: Video, color: "text-orange-600" },
                        { label: "Registered Viewers", value: "230", sub: "+38% vs last week", icon: Users, color: "text-blue-600" },
                        { label: "MCOM In-Stream Clicks", value: "312", sub: "Buy Now overlay", icon: ShoppingBag, color: "text-emerald-600" },
                        { label: "Avg Stream Watchtime", value: "18m 40s", sub: "72% retention", icon: TrendingUp, color: "text-purple-600" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="w-[42%] min-w-[144px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-1.5 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                                    {stat.label}
                                </span>
                                <stat.icon className={`w-3.5 h-3.5 shrink-0 ${stat.color}`} />
                            </div>
                            <p className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                {stat.value}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">{stat.sub}</p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-1.5 lg:hidden">
                    <span className="w-4 h-1 rounded-full bg-orange-600" />
                    <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                </div>
            </div>

            {/* Clean 3-Line Sessions List */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Demo Broadcast Schedule
                    </h2>
                    <span className="text-[11px] font-bold text-slate-400">{sessions.length} sessions</span>
                </div>

                {sessions.map((item) => (
                    <div
                        key={item.id}
                        className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                        <div className="min-w-0 flex-1 space-y-1">
                            {/* Line 1 */}
                            <div className="flex items-center justify-between sm:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5 truncate">
                                    <span className="text-slate-900 font-extrabold">{item.id}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-orange-600">{item.time}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-400">{item.hall}</span>
                                </div>
                                <span className={`shrink-0 ${getStatusColor(item.status)}`}>{item.status}</span>
                            </div>

                            {/* Line 2 */}
                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.title}</p>

                            {/* Line 3 */}
                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                                <span>{item.attendees}</span>
                                <span className="text-slate-300">•</span>
                                <span>
                                    Pinned Product: <strong className="text-slate-900">{item.pinnedProduct}</strong>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                            <button
                                onClick={() => alert("Launching live stream test environment...")}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors"
                            >
                                <Play className="w-3.5 h-3.5" /> Start Broadcast
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Collapsible Live Streaming Guide */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800">
                <button
                    onClick={() => setShowStreamGuide(!showStreamGuide)}
                    className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left"
                >
                    <div>
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                            Live Stream Setup & MCOM Product Pinning
                        </h3>
                        <p className="text-[11px] text-slate-400">
                            Broadcast via OBS, Zoom, or WebRTC with real-time checkout links.
                        </p>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                            showStreamGuide ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {showStreamGuide && (
                    <div className="px-3.5 pb-4 sm:px-4 pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                        <p>• <strong className="text-white">Direct MCOM Cart:</strong> Pin products live; viewers can purchase with one click without leaving your stream.</p>
                        <p>• <strong className="text-white">CHS Live Chat:</strong> Viewer questions flow directly into your Central Hub Solution inbox.</p>
                    </div>
                )}
            </div>

            {/* Schedule Demo Modal */}
            <Modal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                title="Schedule Live Product Showcase"
            >
                <form onSubmit={handleCreateDemo} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Demo Session Title
                        </label>
                        <input
                            type="text"
                            required
                            value={sessionTitle}
                            onChange={(e) => setSessionTitle(e.target.value)}
                            placeholder="e.g. Next-Gen Enterprise Security Appliance Walkthrough"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Stage / Virtual Hall
                            </label>
                            <select
                                value={hall}
                                onChange={(e) => setHall(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-orange-500"
                            >
                                <option>Virtual Main Hall A</option>
                                <option>Breakout Stage B</option>
                                <option>Interactive Workshop C</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Date & Time
                            </label>
                            <input
                                type="text"
                                value={sessionDate}
                                onChange={(e) => setSessionDate(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsCreateOpen(false)}
                            className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700"
                        >
                            Schedule Demo
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
