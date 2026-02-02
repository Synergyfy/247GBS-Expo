"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { 
    Ticket, 
    Users, 
    TrendingUp, 
    ArrowLeft, 
    Settings, 
    QrCode, 
    Link as LinkIcon, 
    BarChart3, 
    Play,
    Edit3,
    CheckCircle2,
    Calendar,
    MapPin,
    Copy,
    ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function EventManagementPage() {
    const params = useParams();
    const eventId = params.id;
    const [activeTab, setActiveTab] = useState("overview");

    const event = {
        title: "Global Innovation Fair (Spring 2026)",
        status: "Published",
        date: "April 10-19, 2026",
        location: "Virtual Main Hall",
        ticketsSold: 1240,
        capacity: 5000,
        revenue: "£24,500"
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/dashboard/business/events" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Events
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-black text-slate-900">{event.title}</h1>
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {event.status}
                            </span>
                        </div>
                        <div className="flex gap-6 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</span>
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 flex items-center gap-2 shadow-sm">
                        <Edit3 className="w-4 h-4" /> Edit Event
                    </button>
                    <button className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 flex items-center gap-2 transition-all">
                        <Play className="w-4 h-4" /> Go to Live Control
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {["Overview", "Tickets", "Sales & Marketing", "Verification", "Analytics"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                            activeTab === tab.toLowerCase() ? "text-orange-600" : "text-slate-400 hover:text-slate-900"
                        }`}
                    >
                        {tab}
                        {activeTab === tab.toLowerCase() && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-t-full shadow-[0_-2px_10px_rgba(234,88,12,0.4)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* CONTENT AREA */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                
                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: "Ticket Sales", val: "1,240", icon: <Ticket />, total: "/ 5,000" },
                                { label: "Revenue", val: "£24,500", icon: <TrendingUp />, total: "Gross" },
                                { label: "Check-ins", val: "842", icon: <CheckCircle2 />, total: "Attendees" },
                                { label: "Conversion", val: "4.8%", icon: <BarChart3 />, total: "Rate" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                                        {stat.icon}
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-2xl font-bold text-slate-900">{stat.val}</h3>
                                        <span className="text-xs text-slate-400 font-bold">{stat.total}</span>
                                    </div>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Sales Link Widget */}
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <LinkIcon className="w-32 h-32" />
                                </div>
                                <h3 className="text-xl font-bold mb-6 relative z-10">Event Sales Channel</h3>
                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Public Sales Link</label>
                                        <div className="flex gap-2">
                                            <div className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono truncate">
                                                https://expo.247gbs.com/tickets/spring-2026
                                            </div>
                                            <button className="p-3 bg-orange-600 rounded-xl hover:bg-orange-700 transition-all">
                                                <Copy className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="flex-1 bg-white text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
                                            <QrCode className="w-4 h-4" /> Download QR Poster
                                        </button>
                                        <button className="flex-1 bg-white/10 border border-white/10 text-white py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                                            <ExternalLink className="w-4 h-4" /> Preview Page
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity Mini Log */}
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Recent Transactions</h3>
                                <div className="space-y-6">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs uppercase">
                                                    JD
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">John Doe Purchased VIP Ticket</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">2 minutes ago</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-slate-900">+£19.00</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-3 text-sm font-bold text-orange-600 hover:text-orange-700 uppercase tracking-widest">
                                    View All Sales &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* OTHER TABS (Placeholders for now) */}
                {activeTab !== "overview" && (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Settings className="w-10 h-10 text-slate-300 animate-spin-slow" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Module Config: {activeTab}</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">This section is being configured with your platform settlement rules.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
