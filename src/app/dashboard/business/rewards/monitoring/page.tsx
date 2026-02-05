"use client";

import { useState } from "react";
import { 
    Activity, 
    TrendingUp, 
    AlertTriangle, 
    CheckCircle2, 
    Clock, 
    BarChart3,
    Search,
    Filter,
    Download,
    Eye,
    ShieldAlert
} from "lucide-react";

export default function RewardMonitoringPage() {
    const [mockLogs] = useState([
        { id: "RL-901", user: "Alice Walker", reward: "VIP Lounge Pass", status: "Redeemed", time: "2 mins ago", ip: "192.168.1.1" },
        { id: "RL-902", user: "Bob Marley", reward: "Digital Goodie Bag", status: "Issued", time: "15 mins ago", ip: "104.22.1.4" },
        { id: "RL-903", user: "Charlie Davis", reward: "Early Bird General", status: "Expired", time: "1 hour ago", ip: "82.4.15.22" },
        { id: "RL-904", user: "David Miller", reward: "Workshop Access", status: "Flagged", time: "3 hours ago", ip: "172.16.0.5" },
    ]);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Reward Monitoring</h1>
                    <p className="text-slate-500 text-lg">Real-time tracking of reward lifecycle and fraud detection.</p>
                </div>
                <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                    <Download className="w-5 h-5" /> Export Logs
                </button>
            </div>

            {/* Monitoring Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Issued", val: "4,250", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Redeemed", val: "2,105", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Expired", val: "142", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Abuse Flags", val: "3", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Abuse Detection Alert */}
            <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm shrink-0">
                    <AlertTriangle className="w-7 h-7" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-red-900">Abuse Pattern Detected</h4>
                    <p className="text-sm text-red-700 font-medium">Multiple redemption attempts from the same IP range (172.16.x.x) within 5 minutes. <span className="underline cursor-pointer">Review activity</span></p>
                </div>
                <button className="px-6 py-2 bg-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-red-700 transition-all">Block IP</button>
            </div>

            {/* Real-time Logs */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Reward Lifecycle Logs</h2>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search user..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                        </div>
                        <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors"><Filter className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User / Attendee</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reward Type</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {mockLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <p className="text-xs font-mono font-bold text-slate-400">{log.id}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-bold text-slate-900">{log.user}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">IP: {log.ip}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-slate-600">{log.reward}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            log.status === 'Redeemed' ? 'bg-emerald-100 text-emerald-700' : 
                                            log.status === 'Flagged' ? 'bg-red-100 text-red-700' :
                                            log.status === 'Expired' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-slate-500">{log.time}</p>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-white text-slate-400 hover:text-orange-600 rounded-xl border border-transparent hover:border-slate-200 shadow-sm transition-all">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
