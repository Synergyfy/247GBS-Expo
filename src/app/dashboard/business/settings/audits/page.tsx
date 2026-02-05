"use client";

import { useState } from "react";
import { 
    History, 
    Search, 
    Filter, 
    Download, 
    ShieldCheck, 
    User, 
    Settings, 
    Package, 
    Database,
    Clock,
    Eye,
    ChevronRight
} from "lucide-react";

export default function BusinessAuditLogsPage() {
    const [mockLogs] = useState([
        { id: "TX-4012", staff: "Sarah Smith", action: "Updated Settlement Rule", target: "Finance Config", time: "10 mins ago", role: "Finance Manager", color: "text-blue-600", bg: "bg-blue-50", icon: Settings },
        { id: "TX-4011", staff: "Frank Doe", action: "Created Ticket Tier: VIP Platinum", target: "Ticket Manager", time: "1 hour ago", role: "Business Admin", color: "text-orange-600", bg: "bg-orange-50", icon: Package },
        { id: "TX-4010", staff: "Michael Scott", action: "Bulk Allocation: 50 Tickets", target: "Rewards Engine", time: "2 hours ago", role: "POS Operator", color: "text-emerald-600", bg: "bg-emerald-50", icon: ShieldCheck },
        { id: "TX-4009", staff: "Frank Doe", action: "Pairing New Device: Scanner B", target: "Operations Setup", time: "Yesterday", role: "Business Admin", color: "text-purple-600", bg: "bg-purple-50", icon: Database },
    ]);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Business Audit Trails</h1>
                    <p className="text-slate-500 text-lg">Immutable activity logs for organization security and accountability.</p>
                </div>
                <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                    <Download className="w-4 h-4" /> Export Audit Log (CSV)
                </button>
            </div>

            {/* Verification Banner */}
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                    <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-emerald-900 uppercase tracking-tight">Immutable Integrity Check</h4>
                    <p className="text-sm text-emerald-700 font-medium">All audit logs are cryptographically hashed and mirrored to the 247GBS governance chain. Records cannot be deleted or modified.</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search by staff, action or ID..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
                        <Filter className="w-3 h-3" /> All Roles
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
                        <Clock className="w-3 h-3" /> All Time
                    </button>
                </div>
            </div>

            {/* Audit Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Timestamp</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Staff Member</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Action Performed</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Module</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Reference</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {mockLogs.map((log, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-slate-900">{log.time}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Feb 4, 2026</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{log.staff}</p>
                                                <p className="text-[10px] text-orange-600 font-bold uppercase tracking-tighter">{log.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg ${log.bg} ${log.color} flex items-center justify-center`}>
                                                <log.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">{log.action}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {log.target}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-xs font-mono font-bold text-slate-400 hover:text-orange-600 flex items-center gap-1 justify-end ml-auto group">
                                            {log.id} <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
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
