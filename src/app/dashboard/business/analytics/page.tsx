"use client";

import { useState, useEffect } from "react";
import {
    BarChart3,
    TrendingUp,
    Users,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Download,
    Filter,
    Search,
    MapPin,
    Clock,
    MousePointer2,
    DollarSign,
    Loader2,
    ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

const TABS = [
    { id: "sales", label: "Sales Performance", icon: DollarSign },
    { id: "attendance", label: "Attendance & Traffic", icon: Users },
    { id: "financial", label: "Financial Health", icon: PieChart },
];

export default function AnalyticsHubPage() {
    const [activeTab, setActiveTab] = useState("sales");
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [isEventsLoading, setIsEventsLoading] = useState(true);

    const [data, setData] = useState<any>({
        sales: null,
        attendance: null,
        financial: null
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedEventId) {
            fetchAllData();
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

    const fetchAllData = async () => {
        if (!selectedEventId) return;
        setIsLoading(true);
        try {
            const [sales, attendance, financial] = await Promise.all([
                api.get(`/dashboard/business/analytics/sales?eventId=${selectedEventId}`),
                api.get(`/dashboard/business/analytics/attendance?eventId=${selectedEventId}`),
                api.get(`/dashboard/business/analytics/financial?eventId=${selectedEventId}`)
            ]);
            setData({ sales, attendance, financial });
        } catch (error) {
            console.error("Failed to fetch analytics data", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Analytics & Intelligence</h1>
                    <p className="text-slate-500 text-lg">Real-time data insights across sales, traffic, and finances.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <Download className="w-4 h-4" /> Download Report
                    </button>
                    <button
                        onClick={fetchAllData}
                        className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2"
                    >
                        <Calendar className="w-4 h-4" /> Refresh Data
                    </button>
                </div>
            </div>

            {/* Event Selector */}
            <div className="relative inline-block w-full max-w-md">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Event Context</label>
                <div className="relative">
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
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 min-w-max">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id
                                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {/* 12.1 SALES PERFORMANCE */}
                {activeTab === "sales" && data.sales && (
                    <motion.div
                        key="sales"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {data.sales.stats.map((stat: any, i: number) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <div className="flex items-end justify-between">
                                        <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
                                        <div className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {stat.isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                            {stat.trend}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="font-bold text-xl text-slate-900">Channel Performance</h3>
                                    <select className="text-xs font-bold bg-slate-50 border-none rounded-lg px-3 py-2 outline-none">
                                        <option>By Revenue</option>
                                        <option>By Volume</option>
                                    </select>
                                </div>
                                <div className="space-y-6">
                                    {data.sales.channels.map((channel: any, i: number) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-bold text-slate-700">{channel.name}</span>
                                                <span className="font-black text-slate-900">{channel.revenue}</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${channel.pct}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <TrendingUp className="w-32 h-32" />
                                </div>
                                <h3 className="text-xl font-bold mb-6 relative z-10">Real-time Forecast</h3>
                                <div className="space-y-8 relative z-10">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated Monthly Revenue</p>
                                        <p className="text-4xl font-black">{data.sales.forecast.estimatedMonthlyRevenue}</p>
                                        <p className="text-xs text-emerald-400 font-bold mt-2 flex items-center gap-1">
                                            <ArrowUpRight className="w-3 h-3" /> {data.sales.forecast.trendingMessage}
                                        </p>
                                    </div>
                                    <div className="pt-8 border-t border-white/10">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Inventory Exhaustion</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center font-black text-lg shadow-lg">{data.sales.forecast.sellOutDays}</div>
                                            <p className="text-sm text-slate-300 leading-relaxed">{data.sales.forecast.exhaustionMessage}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 12.2 ATTENDANCE & TRAFFIC */}
                {activeTab === "attendance" && data.attendance && (
                    <motion.div
                        key="attendance"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.attendance.mainStats.map((stat: any) => {
                                const Icon = stat.id === 'visitors' ? Users : stat.id === 'dwell' ? Clock : MousePointer2;
                                return (
                                    <div key={stat.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                                        <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-3xl flex items-center justify-center mb-6`}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-900">{stat.val}</h3>
                                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1">{stat.label}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                                <h3 className="font-bold text-xl text-slate-900 mb-8 flex items-center gap-2 uppercase tracking-tight">
                                    <MapPin className="text-orange-600" /> Zone Popularity Heatmap
                                </h3>
                                <div className="aspect-square bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-20"></div>
                                    <div className="w-48 h-48 bg-orange-500/20 rounded-full blur-3xl absolute top-1/4 left-1/4 animate-pulse"></div>
                                    <div className="w-32 h-32 bg-blue-500/20 rounded-full blur-3xl absolute bottom-1/4 right-1/4 animate-pulse duration-1000"></div>
                                    <div className="relative z-10 grid grid-cols-2 gap-4">
                                        {data.attendance.heatmap.zones.map((zone: any, i: number) => (
                                            <div key={i} className="p-4 bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-sm text-center">
                                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{zone.name}</p>
                                                <p className="text-xl font-black text-slate-900">{zone.val}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                                    <h3 className="font-bold text-xl text-slate-900 mb-6 uppercase tracking-tight">Peak Traffic Times</h3>
                                    <div className="h-48 flex items-end gap-2">
                                        {data.attendance.peakTraffic.series.map((h: number, i: number) => (
                                            <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group overflow-hidden">
                                                <div className="absolute bottom-0 w-full bg-orange-500 transition-all duration-1000 group-hover:bg-orange-600" style={{ height: `${h}%` }}></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">
                                        {data.attendance.peakTraffic.labels.map((label: string, i: number) => (
                                            <span key={i}>{label}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-8 bg-orange-50 rounded-[2.5rem] border border-orange-100">
                                    <h4 className="font-bold text-orange-900 mb-2 uppercase tracking-tight">Traffic Insight</h4>
                                    <p className="text-sm text-orange-700 leading-relaxed">
                                        {data.attendance.insight}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 12.3 FINANCIAL HEALTH */}
                {activeTab === "financial" && data.financial && (
                    <motion.div
                        key="financial"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Revenue Distribution</h3>
                                <div className="flex flex-col md:flex-row items-center gap-12">
                                    <div className="w-48 h-48 rounded-full border-[16px] border-orange-500 border-l-slate-100 border-b-blue-500 relative flex items-center justify-center shadow-inner">
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Net</p>
                                            <p className="text-2xl font-black text-slate-900">{data.financial.revenueDistribution.net}%</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-6 w-full">
                                        {data.financial.revenueDistribution.breakdown.map((item: any, i: number) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                                    <span className="text-sm font-bold text-slate-600">{item.label}</span>
                                                </div>
                                                <span className="font-black text-slate-900 text-sm">{item.amount}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                                    <h3 className="font-bold text-xl text-slate-900 mb-6 uppercase tracking-tight">Financial Risk Monitor</h3>
                                    <div className="space-y-6">
                                        {data.financial.riskMonitor.map((risk: any, i: number) => (
                                            <div key={i} className={`flex justify-between items-center ${i !== data.financial.riskMonitor.length - 1 ? 'pb-4 border-b border-slate-50' : ''}`}>
                                                <p className="text-sm font-medium text-slate-500">{risk.label}</p>
                                                <span className={`px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black ${risk.status === 'LOW' || risk.status === 'OK' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                    {risk.value} ({risk.status})
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl flex items-center justify-between">
                                    <div>
                                        <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Fiscal Year Projection</h4>
                                        <p className="text-3xl font-black">{data.financial.projection}</p>
                                    </div>
                                    <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/20">
                                        <BarChart3 className="w-7 h-7" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
