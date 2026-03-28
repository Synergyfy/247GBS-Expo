"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Search,
    Filter,
    MoreVertical,
    Mail,
    User,
    Ticket,
    CreditCard,
    History,
    ChevronLeft,
    ChevronRight,
    Search as SearchIcon,
    ArrowUpRight,
    MapPin,
    Calendar,
    Award,
    Loader2,
    AlertCircle,
    RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

interface Visitor {
    id: string;
    name: string;
    email: string;
    type: string;
    country: string;
    joinDate: string;
    ticketsPurchased: number;
    totalSpent: string;
    lastActive: string;
    scanned: boolean;
}

interface Stats {
    totalVisitors: number;
    scannedIn: number;
    pending: number;
    scanRate: number;
}

export default function AdminVisitorsPage() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [stats, setStats] = useState<Stats>({ totalVisitors: 0, scannedIn: 0, pending: 0, scanRate: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [page, setPage] = useState(1);

    const fetchVisitors = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            const res = await api.get("/admin/visitors");
            if (res.success) {
                setStats(res.data.stats);
                const mapped = res.data.recentVisitors.map((v: any) => ({
                    id: v.id,
                    name: v.user?.name || "Unknown",
                    email: v.user?.email || "N/A",
                    type: v.type,
                    country: "N/A", // Not in schema yet, but keeping for UI
                    joinDate: new Date(v.createdAt).toLocaleDateString(),
                    ticketsPurchased: 1, // Single ticket per row in 'recent'
                    totalSpent: `£${v.price}`,
                    lastActive: v.scannedAt ? `Scanned ${new Date(v.scannedAt).toLocaleTimeString()}` : "Not scanned",
                    scanned: v.scanned
                }));
                setVisitors(mapped);
            }
        } catch (e: any) {
            setError(e.message || "Failed to load visitors");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchVisitors(); }, [fetchVisitors]);

    const filteredVisitors = visitors.filter(visitor => {
        const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            visitor.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "All" || visitor.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">Audience Insights</div>
                </div>
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Visitor Analytics</h1>
                        <p className="text-slate-500 font-medium">Monitor user registrations, ticket distributions, and platform engagement metrics.</p>
                    </div>
                    <button onClick={fetchVisitors} className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all" title="Refresh">
                        <RefreshCw className={`w-4 h-4 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Visitors</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-3xl font-black text-slate-900">{isLoading ? "—" : stats.totalVisitors}</span>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">Total tickets issued</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"><User className="w-6 h-6" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Scanned In</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-3xl font-black text-slate-900">{isLoading ? "—" : stats.scannedIn}</span>
                            <p className="text-[10px] font-bold text-emerald-600 mt-1">{stats.scanRate}% scan rate</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600"><CheckCircle2 className="w-6 h-6" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Pending Access</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-3xl font-black text-slate-900">{isLoading ? "—" : stats.pending}</span>
                            <p className="text-[10px] font-bold text-blue-600 mt-1">Awaiting validation</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600"><Award className="w-6 h-6" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Success Rate</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-3xl font-black text-slate-900">{isLoading ? "—" : `${stats.scanRate}%`}</span>
                            <p className="text-[10px] font-bold text-orange-600 mt-1">Operational efficiency</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600"><History className="w-6 h-6" /></div>
                    </div>
                </div>
            </div>

            {/* Control Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search recent visitors by name or email..."
                        className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
                    {["All", "VIP", "Standard", "Guest"].map(type => (
                        <button
                            key={type}
                            onClick={() => setTypeFilter(type)}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${typeFilter === type ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden shadow-slate-200/50">
                {isLoading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <AlertCircle className="w-12 h-12 text-red-400" />
                        <p className="text-red-600 font-medium">{error}</p>
                        <button onClick={fetchVisitors} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all">Try Again</button>
                    </div>
                ) : (
                    <>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Visitor Profile</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Account Type</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Engagement</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Activity Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Settings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <AnimatePresence>
                                    {filteredVisitors.map((visitor) => (
                                        <motion.tr
                                            key={visitor.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-blue-50/20 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-black group-hover:bg-blue-600 group-hover:text-white transition-all overflow-hidden border-2 border-transparent group-hover:border-blue-100">
                                                        {visitor.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 leading-tight">{visitor.name}</p>
                                                        <p className="text-[11px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                                                            <Mail className="w-3 h-3" /> {visitor.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${visitor.type === 'VIP' ? 'bg-purple-100 text-purple-600' :
                                                        visitor.type === 'Standard' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                                                    }`}>
                                                    {visitor.type === 'VIP' && <Award className="w-3 h-3" />}
                                                    {visitor.type}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex gap-8">
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Price</span>
                                                        <div className="flex items-center gap-1.5">
                                                            <Ticket className="w-3.5 h-3.5 text-orange-400" />
                                                            <span className="text-sm font-black text-slate-900">{visitor.totalSpent}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Purchased</span>
                                                        <span className="text-sm font-black text-slate-900">{visitor.joinDate}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <p className={`text-sm font-bold ${visitor.scanned ? 'text-emerald-600' : 'text-orange-600'}`}>
                                                        {visitor.lastActive}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-1">
                                                        <History className="w-3 h-3" /> {visitor.scanned ? "Validation Success" : "Validation Required"}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </button>
                                                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all ml-2 opacity-0 group-hover:opacity-100 shadow-sm">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>

                        {filteredVisitors.length === 0 && (
                            <div className="py-20 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-4">
                                    <User className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">No visitors found</h3>
                                <p className="text-slate-400 text-sm font-medium">No recent ticket activity matches your criteria.</p>
                            </div>
                        )}

                        {/* Footer Controls */}
                        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Activity Only</p>
                            </div>
                            <div className="flex gap-2">
                                <button disabled className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase text-slate-400 opacity-40">
                                    <ChevronLeft className="w-4 h-4" /> Prev
                                </button>
                                <button disabled className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-900 rounded-xl text-xs font-black uppercase text-white opacity-40">
                                    Next <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const CheckCircle2 = (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);
