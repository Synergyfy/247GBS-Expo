"use client";

import { useState } from "react";
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
    DollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
    { id: "sales", label: "Sales Performance", icon: DollarSign },
    { id: "attendance", label: "Attendance & Traffic", icon: Users },
    { id: "financial", label: "Financial Health", icon: PieChart },
];

export default function AnalyticsHubPage() {
    const [activeTab, setActiveTab] = useState("sales");

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
                    <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Last 30 Days
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 min-w-max">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                                activeTab === tab.id
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
                {activeTab === "sales" && (
                    <motion.div
                        key="sales"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: "Total Revenue", val: "£142,500", trend: "+12.5%", isUp: true },
                                { label: "Tickets Sold", val: "2,840", trend: "+8.2%", isUp: true },
                                { label: "Conversion Rate", val: "4.82%", trend: "-0.4%", isUp: false },
                                { label: "Avg. Order Value", val: "£50.18", trend: "+2.1%", isUp: true },
                            ].map((stat, i) => (
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
                                    {[
                                        { name: "247GBS Marketplace", val: "£82,400", pct: 58 },
                                        { name: "Website Widget", val: "£31,200", pct: 22 },
                                        { name: "Affiliate Networks", val: "£18,500", pct: 13 },
                                        { name: "Direct POS", val: "£10,400", pct: 7 },
                                    ].map((channel, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-bold text-slate-700">{channel.name}</span>
                                                <span className="font-black text-slate-900">{channel.val}</span>
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
                                        <p className="text-4xl font-black">£168.2K</p>
                                        <p className="text-xs text-emerald-400 font-bold mt-2 flex items-center gap-1">
                                            <ArrowUpRight className="w-3 h-3" /> Trending 14% above goal
                                        </p>
                                    </div>
                                    <div className="pt-8 border-t border-white/10">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Inventory Exhaustion</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center font-black text-lg shadow-lg">12d</div>
                                            <p className="text-sm text-slate-300 leading-relaxed">Based on current velocity, your <strong>General Access</strong> tickets will sell out in 12 days.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 12.2 ATTENDANCE & TRAFFIC */}
                {activeTab === "attendance" && (
                    <motion.div
                        key="attendance"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900">12,402</h3>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1">Unique Booth Visitors</p>
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center mb-6">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900">4m 12s</h3>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1">Avg. Dwell Time</p>
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6">
                                    <MousePointer2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900">18.4%</h3>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1">Lead Conversion</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                                <h3 className="font-bold text-xl text-slate-900 mb-8 flex items-center gap-2 uppercase tracking-tight">
                                    <MapPin className="text-orange-600" /> Zone Popularity Heatmap
                                </h3>
                                <div className="aspect-square bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-20"></div>
                                    {/* Mock Heatmap Circles */}
                                    <div className="w-48 h-48 bg-orange-500/20 rounded-full blur-3xl absolute top-1/4 left-1/4 animate-pulse"></div>
                                    <div className="w-32 h-32 bg-blue-500/20 rounded-full blur-3xl absolute bottom-1/4 right-1/4 animate-pulse duration-1000"></div>
                                    <div className="relative z-10 grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-sm text-center">
                                            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Product Gallery</p>
                                            <p className="text-xl font-black text-slate-900">4.2k Visits</p>
                                        </div>
                                        <div className="p-4 bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-sm text-center">
                                            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Live Stage</p>
                                            <p className="text-xl font-black text-slate-900">8.1k Visits</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                                    <h3 className="font-bold text-xl text-slate-900 mb-6 uppercase tracking-tight">Peak Traffic Times</h3>
                                    <div className="h-48 flex items-end gap-2">
                                        {[20, 40, 30, 60, 90, 100, 70, 40, 20].map((h, i) => (
                                            <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group overflow-hidden">
                                                <div className="absolute bottom-0 w-full bg-orange-500 transition-all duration-1000 group-hover:bg-orange-600" style={{ height: `${h}%` }}></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">
                                        <span>09:00 AM</span>
                                        <span>12:00 PM</span>
                                        <span>06:00 PM</span>
                                    </div>
                                </div>
                                <div className="p-8 bg-orange-50 rounded-[2.5rem] border border-orange-100">
                                    <h4 className="font-bold text-orange-900 mb-2 uppercase tracking-tight">Traffic Insight</h4>
                                    <p className="text-sm text-orange-700 leading-relaxed">
                                        Visitors who attend a <strong>Live Demo</strong> are 3.5x more likely to complete a product purchase within the same session.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 12.3 FINANCIAL HEALTH */}
                {activeTab === "financial" && (
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
                                            <p className="text-2xl font-black text-slate-900">82%</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-6 w-full">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                                <span className="text-sm font-bold text-slate-600">Merchant Net</span>
                                            </div>
                                            <span className="font-black text-slate-900 text-sm">£116,850</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                                <span className="text-sm font-bold text-slate-600">Platform Commission</span>
                                            </div>
                                            <span className="font-black text-slate-900 text-sm">£17,812</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                                <span className="text-sm font-bold text-slate-600">Tax/VAT</span>
                                            </div>
                                            <span className="font-black text-slate-900 text-sm">£7,838</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                                    <h3 className="font-bold text-xl text-slate-900 mb-6 uppercase tracking-tight">Financial Risk Monitor</h3>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                            <p className="text-sm font-medium text-slate-500">Refund Ratio</p>
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black">0.12% (LOW)</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                            <p className="text-sm font-medium text-slate-500">Chargeback Rate</p>
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black">0.02% (LOW)</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm font-medium text-slate-500">Settlement Accuracy</p>
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black">100%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl flex items-center justify-between">
                                    <div>
                                        <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Fiscal Year Projection</h4>
                                        <p className="text-3xl font-black">£1.84M</p>
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
