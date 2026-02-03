"use client";

import { useState } from "react";
import { 
    AlertTriangle, 
    ShieldAlert, 
    Zap, 
    Search, 
    Filter, 
    Activity, 
    UserX, 
    MoreVertical,
    TrendingDown,
    ArrowRight,
    MapPin,
    Smartphone,
    BarChart2,
    Target
} from "lucide-react";

export default function RiskFraudPage() {
    const [activeTab, setActiveTab] = useState("monitor");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Risk & Fraud Monitor</h1>
                    <p className="text-slate-500">Real-time threat detection, transaction velocity checks, and anomaly monitoring.</p>
                </div>
                <div className="flex gap-4 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl border border-orange-100 items-center">
                    <ShieldAlert className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">Threat Level: Low</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {[
                    { id: "monitor", label: "Live Monitor", icon: <Activity className="w-4 h-4" /> },
                    { id: "scoring", label: "Risk Scoring Matrix", icon: <Target className="w-4 h-4" /> },
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

            {/* LIVE MONITOR TAB */}
            {activeTab === "monitor" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
                    {/* Risk stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: "High Risk Events", val: "2", icon: <AlertTriangle />, color: "red" },
                            { label: "Velocity Triggers", val: "14", icon: <Activity />, color: "orange" },
                            { label: "Blocked Attempts", val: "128", icon: <UserX />, color: "slate" },
                            { label: "Fraud Savings", val: "£12.4K", icon: <TrendingDown />, color: "emerald" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Recent Anomaly Feed */}
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Active Anomalies</h3>
                                <button className="text-orange-600 text-sm font-bold uppercase tracking-widest hover:text-orange-700">View All Logs</button>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {[
                                    { title: "Geo-Anomaly Detection", desc: "User verified in London, then 5m later in Tokyo.", priority: "Critical", time: "12m ago" },
                                    { title: "Velocity Check Trigger", desc: "10 ticket attempts from same IP in < 1s.", priority: "High", time: "1h ago" },
                                    { title: "Multiple Device Login", desc: "Account JD-221 accessed from 4 distinct mobile OS.", priority: "Medium", time: "2h ago" },
                                ].map((a, i) => (
                                    <div key={i} className="p-6 flex items-start justify-between hover:bg-slate-50 transition-colors group">
                                        <div className="flex gap-6">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                                a.priority === 'Critical' ? 'bg-red-50 text-red-600' : 
                                                a.priority === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'
                                            }`}>
                                                <ShieldAlert className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{a.title}</h4>
                                                <p className="text-sm text-slate-500 font-medium">{a.desc}</p>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pt-1">{a.time}</span>
                                            </div>
                                        </div>
                                        <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-orange-600 transition-all opacity-0 group-hover:opacity-100">
                                            Investigate
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Risk Tools Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
                                <h3 className="text-xl font-bold mb-6">Detection Rules</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                                        <span className="text-sm font-bold">Velocity Limits</span>
                                        <div className="w-10 h-5 bg-orange-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                                        <span className="text-sm font-bold">IP Blacklisting</span>
                                        <div className="w-10 h-5 bg-orange-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                                        <span className="text-sm font-bold">Device Fingerprinting</span>
                                        <div className="w-10 h-5 bg-orange-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                                    </div>
                                </div>
                                <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm hover:bg-orange-50 transition-all">
                                    Adjust Thresholds
                                </button>
                            </div>

                            <div className="bg-orange-50 rounded-[2.5rem] border border-orange-100 p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Zap className="w-5 h-5 text-orange-600" />
                                    <h4 className="font-bold text-orange-900">Incident Response</h4>
                                </div>
                                <p className="text-xs text-orange-700 leading-relaxed font-medium mb-6">
                                    Emergency override is available for Super Admins. This freezes all outbound settlements immediately.
                                </p>
                                <button className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-red-700 transition-all">
                                    System Lock (Emergency)
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* SCORING MATRIX TAB */}
            {activeTab === "scoring" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Scoring Configuration */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-6">
                                <Target className="w-5 h-5 text-orange-600" /> Unified Risk Scoring
                            </h3>
                            
                            <div className="space-y-8">
                                {[
                                    { category: "Business Entity", factors: ["Credit Score", "Years in Operation", "Complaint Ratio"], score: 85 },
                                    { category: "Event Listing", factors: ["Content Clarity", "Ticket Price Variance", "Refund Policy"], score: 92 },
                                    { category: "User / Transaction", factors: ["Device Trust", "IP Geolocation", "Purchase Velocity"], score: 64 },
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-lg">{item.category}</h4>
                                                <p className="text-xs text-slate-500 font-bold uppercase mt-1">Weighting Factors:</p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-lg text-sm font-black ${
                                                item.score > 80 ? 'bg-emerald-100 text-emerald-700' : 
                                                item.score > 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                Avg Score: {item.score}/100
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            {item.factors.map(f => (
                                                <span key={f} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
                                                    {f}
                                                </span>
                                            ))}
                                            <button className="px-3 py-1 border border-dashed border-slate-300 rounded-lg text-xs font-bold text-slate-400 hover:text-orange-600 hover:border-orange-400">+ Add Factor</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Model Health */}
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl text-white">
                             <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                                <BarChart2 className="w-5 h-5 text-orange-400" /> Model Accuracy
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">False Positives</span>
                                        <span className="font-bold text-emerald-400">0.4%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full w-[0.4%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">Fraud Capture Rate</span>
                                        <span className="font-bold text-orange-400">98.2%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div className="bg-orange-500 h-2 rounded-full w-[98.2%]"></div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-white/10">
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Risk engine was last retrained 24h ago using the latest settlement datasets.
                                    </p>
                                    <button className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all">
                                        Force Retrain
                                    </button>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            )}
        </div>
    );
}