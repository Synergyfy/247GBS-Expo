"use client";

import { useState } from "react";
import Link from "next/link";
import Tooltip from "../../component/Tooltip";

// --- ICONS ---
const UsersIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
const ProfitIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);
const AlertIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);
const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
);

export default function AdminOverview() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* HEADER */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Command Center</h1>
                    <p className="text-slate-500 font-medium">Platform-wide performance monitoring and system oversight.</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg text-xs font-black">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                        SYSTEMS LIVE
                    </div>
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50">Global Reports</button>
                </div>
            </div>

            {/* STATS MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Platform Revenue", value: "£1.24M", icon: <ProfitIcon />, color: "orange", sub: "Overall fee collections" },
                    { label: "Active Exhibitors", value: "842", icon: <UsersIcon />, color: "orange", sub: "Currently listed booths" },
                    { label: "Pending Approvals", value: "48", icon: <AlertIcon />, color: "orange", sub: "Requires immediate review" },
                    { label: "Global Traffic", value: "128K", icon: <ProfitIcon />, color: "orange", sub: "Avg. Daily unique visits" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                            <div className="text-sm font-bold text-slate-800 mb-1">{stat.label}</div>
                            <div className="text-xs text-slate-400 font-medium">{stat.sub}</div>
                        </div>
                        {/* Background Accent */}
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:bg-${stat.color}-500/10 transition-colors`}></div>
                    </div>
                ))}
            </div>

            {/* RECENT UPDATES & HEALTH */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* APPROVAL FEED */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-orange-600 pl-4 uppercase tracking-tight">Recent Booth Submissions</h3>
                        <Link href="/dashboard/admin/exhibitors" className="text-orange-600 text-sm font-black hover:underline uppercase tracking-widest">Go to Queue &rarr;</Link>
                    </div>

                    <div className="space-y-6">
                        {[
                            { name: "Urban Threads Co.", owner: "Mark Riley", time: "12m ago", status: "New" },
                            { name: "EcoHome Solutions", owner: "Sarah Lane", time: "1h ago", status: "Reviewing" },
                            { name: "GamerSpace Tech", owner: "Alex Chen", time: "3h ago", status: "New" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-orange-200 hover:bg-white transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 font-black">
                                        {item.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                                        <div className="text-xs text-slate-400 font-medium">Manager: {item.owner}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-slate-400 font-bold uppercase">{item.time}</span>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${item.status === 'New' ? 'bg-orange-100 text-orange-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SYSTEM LOGS / ANALYTICS WIDGET */}
                <div className="bg-orange-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-orange-200">
                    <div className="relative z-10 flex flex-col h-full">
                        <h3 className="text-orange-100 text-sm font-black uppercase tracking-widest mb-6">Server Health</h3>

                        <div className="space-y-6 flex-1">
                            {[
                                { label: "Live Streams", val: "Operational", color: "white" },
                                { label: "Payment Gateway", val: "Operational", color: "white" },
                                { label: "Content CDN", val: "92% Load", color: "orange-100" },
                                { label: "API Latency", val: "42ms", color: "white" }
                            ].map((log, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-orange-500 pb-3">
                                    <span className="text-orange-100 text-xs font-bold uppercase">{log.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-${log.color} text-xs font-bold`}>{log.val}</span>
                                        <div className={`w-1.5 h-1.5 rounded-full bg-${log.color}`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-orange-500">
                            <div className="text-xs text-orange-100 font-medium leading-relaxed">
                                Next platform-wide maintenance scheduled for Jan 30, 02:00 AM UTC. Please ensure all exhibitor exports are completed.
                            </div>
                        </div>
                    </div>
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-12 -translate-y-12"></div>
                </div>

            </div>

        </div>
    );
}
