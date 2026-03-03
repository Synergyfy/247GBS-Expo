"use client";

import { useState, useEffect } from "react";
import {
    Globe,
    Monitor,
    Smartphone,
    Users,
    Link as LinkIcon,
    BarChart3,
    ArrowUpRight,
    ExternalLink,
    Code,
    Loader2,
    ChevronDown,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

const CHANNEL_META: Record<string, { icon: any; color: string; bg: string; desc: string }> = {
    marketplace: { icon: Globe, color: "text-blue-600", bg: "bg-blue-50", desc: "List your event on our global discovery platform" },
    pos: { icon: Monitor, color: "text-emerald-600", bg: "bg-emerald-50", desc: "Physical ticket sales at venue or partner locations" },
    agent: { icon: Smartphone, color: "text-orange-600", bg: "bg-orange-50", desc: "Field agents selling via mobile apps" },
    referral: { icon: Users, color: "text-pink-600", bg: "bg-pink-50", desc: "Track sales from customers sharing your event" },
    campaign: { icon: LinkIcon, color: "text-indigo-600", bg: "bg-indigo-50", desc: "Sales via campaign URLs and promotional codes" },
};

export default function SalesChannelsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [isEventsLoading, setIsEventsLoading] = useState(true);

    const [stats, setStats] = useState<any>(null);
    const [channels, setChannels] = useState<any[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedEventId) {
            fetchSalesData();
        }
    }, [selectedEventId]);

    const fetchEvents = async () => {
        setIsEventsLoading(true);
        try {
            const data = await api.get("/dashboard/business/events");
            const list = data.events || [];
            setEvents(list);
            if (list.length > 0) setSelectedEventId(list[0].id);
        } catch {
            console.error("Failed to fetch events");
        } finally {
            setIsEventsLoading(false);
        }
    };

    const fetchSalesData = async () => {
        if (!selectedEventId) return;
        setIsDataLoading(true);
        setError(null);
        try {
            const [statsData, channelsData] = await Promise.all([
                api.get(`/dashboard/business/sales/stats?eventId=${selectedEventId}`),
                api.get(`/dashboard/business/sales/channels?eventId=${selectedEventId}`),
            ]);
            setStats(statsData);
            setChannels(Array.isArray(channelsData) ? channelsData : []);
        } catch (err: any) {
            setError(err.message || "Failed to load sales data.");
        } finally {
            setIsDataLoading(false);
        }
    };

    const statCards = [
        { label: "Channel Revenue", val: stats ? `₦${Number(stats.channelRevenue || 0).toLocaleString()}` : "—", icon: BarChart3 },
        { label: "Direct Traffic", val: stats?.directTraffic ?? "—", icon: Globe },
        { label: "Conversion Rate", val: stats?.conversionRate ?? "—", icon: ArrowUpRight },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Sales Channels</h1>
                    <p className="text-slate-500 text-lg">Manage where and how your tickets are being distributed.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/business/sales/links" className="px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        Manage Codes
                    </Link>
                    <Link href="/dashboard/business/sales/campaigns" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2">
                        Create Campaign
                    </Link>
                </div>
            </div>

            {/* Event Selector */}
            <div className="relative inline-block w-full max-w-md">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Select Event</label>
                <select
                    value={selectedEventId}
                    onChange={e => setSelectedEventId(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer shadow-sm pr-12"
                >
                    {isEventsLoading ? (
                        <option>Loading events...</option>
                    ) : events.length > 0 ? (
                        events.map(ev => <option key={ev.id} value={ev.id}>{ev.title || ev.name}</option>)
                    ) : (
                        <option value="">No events found</option>
                    )}
                </select>
                <ChevronDown className="absolute right-4 bottom-4 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 px-5 py-4 rounded-2xl text-sm font-bold">
                    <AlertCircle className="w-5 h-5 shrink-0" /> {error}
                </div>
            )}

            {/* Stats Overview */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity ${isDataLoading ? "opacity-50" : ""}`}>
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            {isDataLoading && <Loader2 className="w-4 h-4 animate-spin text-slate-300" />}
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Channels Grid */}
            {isDataLoading && channels.length === 0 ? (
                <div className="py-20 flex justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
                </div>
            ) : (
                <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity ${isDataLoading ? "opacity-50" : ""}`}>
                    {channels.map((channel) => {
                        const meta = CHANNEL_META[channel.id] || {
                            icon: Globe,
                            color: "text-slate-600",
                            bg: "bg-slate-50",
                            desc: "Sales via this channel",
                        };
                        const Icon = meta.icon;
                        return (
                            <div key={channel.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all group flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-2xl ${meta.bg} ${meta.color} group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${channel.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                                        {channel.status}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{channel.name}</h3>
                                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">{meta.desc}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sales</p>
                                        <p className="text-lg font-bold text-slate-900">{channel.sales}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Visitors</p>
                                        <p className="text-lg font-bold text-slate-900">{channel.visitors}</p>
                                    </div>
                                </div>

                                <button className="mt-8 w-full py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all flex items-center justify-center gap-2 text-sm">
                                    View Performance <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}