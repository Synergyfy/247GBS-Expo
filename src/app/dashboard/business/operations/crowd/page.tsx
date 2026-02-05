"use client";

import { useState, useEffect } from "react";
import { 
    Users, 
    MapPin, 
    AlertTriangle, 
    TrendingUp, 
    Clock, 
    BarChart3, 
    ArrowRight,
    Activity,
    Zap,
    ShieldAlert,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function CrowdControlPage() {
    const [occupancy, setOccupancy] = useState(42);
    const [peakAlert, setPeakAlert] = useState(false);

    // Simulation for live data
    useEffect(() => {
        const interval = setInterval(() => {
            setOccupancy(prev => {
                const change = Math.floor(Math.random() * 5) - 2;
                const next = Math.min(100, Math.max(0, prev + change));
                if (next > 85) setPeakAlert(true);
                else setPeakAlert(false);
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const ZONES = [
        { name: "Main Exhibition Hall", current: 842, capacity: 1000, trend: "up", color: "orange" },
        { name: "Workshop Room A", current: 45, capacity: 50, trend: "stable", color: "blue" },
        { name: "Networking Lounge", current: 120, capacity: 250, trend: "down", color: "emerald" },
        { name: "VIP Platinum Zone", current: 28, capacity: 100, trend: "stable", color: "purple" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Crowd & Capacity Control</h1>
                    <p className="text-slate-500 text-lg">Real-time attendance tracking and zone occupancy management.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                        Export Traffic Report
                    </button>
                </div>
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Attendance", val: "1,402", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Real-time Occupancy", val: `${occupancy}%`, icon: Activity, color: "text-orange-600", bg: "bg-orange-50" },
                    { label: "Avg. Dwell Time", val: "42 mins", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Peak Forecast", val: "02:30 PM", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Overcrowding Warning */}
            {peakAlert && (
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-600 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-red-600/30 ring-4 ring-red-100"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center animate-pulse">
                            <ShieldAlert className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Overcrowding Alert</h3>
                            <p className="text-red-100 font-medium">Main Exhibition Hall is at 94% capacity. Diversify traffic to Hall B.</p>
                        </div>
                    </div>
                    <button className="px-8 py-4 bg-white text-red-600 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-50 transition-all shadow-xl">
                        Activate Diversion Protocol
                    </button>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 9.3 Zone Occupancy List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                                <MapPin className="text-orange-600" /> Zone Live Traffic
                            </h3>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Updated Every 3s</span>
                        </div>

                        <div className="space-y-10">
                            {ZONES.map((zone, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-900">{zone.name}</h4>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Zone Status: Healthy</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xl font-black text-slate-900">{zone.current}</span>
                                            <span className="text-sm font-bold text-slate-400 ml-1">/ {zone.capacity}</span>
                                        </div>
                                    </div>
                                    <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(zone.current / zone.capacity) * 100}%` }}
                                            transition={{ duration: 1 }}
                                            className={`h-full rounded-full transition-all ${
                                                (zone.current / zone.capacity) > 0.9 ? 'bg-red-500' : 
                                                (zone.current / zone.capacity) > 0.7 ? 'bg-orange-500' : 'bg-emerald-500'
                                            }`}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className={`w-3 h-3 ${zone.trend === 'up' ? 'text-orange-500' : 'text-emerald-500'}`} />
                                            Trend: {zone.trend}
                                        </div>
                                        <span>Optimal Threshold: 850</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9.3 Crowd Insights */}
                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl h-full">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <BarChart3 className="w-48 h-48" />
                        </div>
                        <h3 className="text-xl font-bold mb-8 relative z-10 uppercase tracking-widest">Entry Velocity</h3>
                        <div className="space-y-8 relative z-10">
                            {[
                                { label: "Scan Speed", val: "4.2s / user", desc: "Average validation time" },
                                { label: "Check-in Rate", val: "142 / hour", desc: "Current entry flow" },
                                { label: "Reject Rate", val: "0.2%", desc: "Invalid ticket attempts" },
                            ].map((insight, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Zap className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-white">{insight.val}</p>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">{insight.label}</p>
                                        <p className="text-[10px] text-slate-600 mt-1">{insight.desc}</p>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="pt-8 border-t border-white/10">
                                <h4 className="text-sm font-bold mb-4 uppercase tracking-tighter text-slate-400">Heatmap Distribution</h4>
                                <div className="grid grid-cols-3 gap-2 h-20">
                                    {[40, 90, 30, 60, 20, 80].map((h, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg flex items-end overflow-hidden">
                                            <div className="w-full bg-orange-600/40 border-t border-orange-500" style={{ height: `${h}%` }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full py-4 bg-orange-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
                                Launch Full Map <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
