"use client";

import { useState } from "react";
import { 
    Activity, 
    Database, 
    Globe, 
    Cpu, 
    RefreshCw, 
    CheckCircle2, 
    AlertCircle, 
    Terminal, 
    History,
    Download,
    BarChart
} from "lucide-react";

export default function SystemHealthPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">System Health & Audits</h1>
                    <p className="text-slate-500">Monitor infrastructure performance, API latency, and immutable audit trails.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 flex items-center gap-2 shadow-sm">
                        <Terminal className="w-4 h-4" /> Live Console
                    </button>
                    <button className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 flex items-center gap-2 transition-all">
                        <Download className="w-4 h-4" /> Export Logs
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {[
                    { id: "overview", label: "Health Overview", icon: <Activity className="w-4 h-4" /> },
                    { id: "audits", label: "Audit Trails", icon: <History className="w-4 h-4" /> },
                    { id: "infrastructure", label: "Infrastructure", icon: <Database className="w-4 h-4" /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${
                            activeTab === tab.id ? "text-orange-600" : "text-slate-400 hover:text-slate-900"
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Real-time Health Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: "API Latency", val: "42ms", status: "Optimal", color: "emerald", icon: <Activity /> },
                                { label: "DB Clusters", val: "Healthy", status: "99.99% Uptime", color: "emerald", icon: <Database /> },
                                { label: "Gateway Status", val: "Operational", status: "Primary Active", color: "emerald", icon: <Globe /> },
                                { label: "CPU Load", val: "14%", status: "Stable", color: "blue", icon: <Cpu /> },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4`}>
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">{stat.label}</p>
                                    <div className="flex items-center gap-1.5 mt-4">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-${stat.color}-500`} />
                                        <span className={`text-[10px] font-bold uppercase text-${stat.color}-600`}>{stat.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Audit Trail Preview (Brief) */}
                        <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden">
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                                <h3 className="text-lg font-bold text-white uppercase tracking-tight">Real-Time Audit Log</h3>
                                <div className="flex items-center gap-2 text-orange-500 text-xs font-black animate-pulse">
                                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                                    LIVE STREAM
                                </div>
                            </div>
                            <div className="p-4 md:p-8 font-mono text-sm space-y-3">
                                {[
                                    { time: "15:42:01", role: "ADMIN-01", action: "Release Settlement", target: "Global Tech", status: "LOGGED" },
                                    { time: "15:40:12", role: "SYS-AUTO", action: "Sanction Check", target: "Urban Threads", status: "PASSED" },
                                    { time: "15:38:45", role: "ADMIN-04", action: "Template Update", target: "VIP Pass", status: "ENFORCED" },
                                    { time: "15:35:22", role: "ADMIN-01", action: "KYC Approval", target: "Jane Doe", status: "VERIFIED" },
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 text-slate-400 group cursor-default hover:text-white transition-colors">
                                        <span className="text-slate-600 shrink-0">[{log.time}]</span>
                                        <span className="text-orange-500 font-bold shrink-0">{log.role}</span>
                                        <span className="flex-1 truncate">{log.action} for {log.target}</span>
                                        <span className="text-emerald-500 font-bold shrink-0">{log.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* PLACEHOLDERS for detailed views */}
                {activeTab !== "overview" && (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <History className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Module Config: {activeTab}</h3>
                        <p className="text-slate-500 max-w-sm mx-auto font-medium">Deep forensic tools and regional infrastructure monitoring are active.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
