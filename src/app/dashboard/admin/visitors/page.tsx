"use client";

import React, { useState } from "react";
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
    Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Visitor {
    id: string;
    name: string;
    email: string;
    type: 'Guest' | 'Standard' | 'VIP';
    country: string;
    joinDate: string;
    ticketsPurchased: number;
    totalSpent: string;
    lastActive: string;
}

const MOCK_VISITORS: Visitor[] = [
    {
        id: "v_1",
        name: "Samuel Etim",
        email: "samuel@example.com",
        type: "VIP",
        country: "Nigeria",
        joinDate: "2026-01-05",
        ticketsPurchased: 8,
        totalSpent: "£620.00",
        lastActive: "2 hours ago"
    },
    {
        id: "v_2",
        name: "Emma Wilson",
        email: "emma.w@domain.com",
        type: "Standard",
        country: "UK",
        joinDate: "2026-01-12",
        ticketsPurchased: 3,
        totalSpent: "£145.00",
        lastActive: "Active now"
    },
    {
        id: "v_3",
        name: "Chen Wei",
        email: "chen.wei@china-hub.cn",
        type: "Guest",
        country: "China",
        joinDate: "2026-02-05",
        ticketsPurchased: 0,
        totalSpent: "£0.00",
        lastActive: "5 days ago"
    },
    {
        id: "v_4",
        name: "Isabella Garcia",
        email: "isabella@tech.es",
        type: "VIP",
        country: "Spain",
        joinDate: "2025-12-15",
        ticketsPurchased: 12,
        totalSpent: "£1,240.00",
        lastActive: "1 day ago"
    }
];

export default function AdminVisitorsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");

    const filteredVisitors = MOCK_VISITORS.filter(visitor => {
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
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Visitor Analytics</h1>
                <p className="text-slate-500 font-medium">Monitor user registrations, ticket distributions, and platform engagement metrics.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Visitors</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-3xl font-black text-slate-900">42,891</span>
                            <p className="text-[10px] font-bold text-emerald-600 mt-1">+12% from last month</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"><User className="w-6 h-6" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Ticket Revenue</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-3xl font-black text-slate-900">£284k</span>
                            <p className="text-[10px] font-bold text-emerald-600 mt-1">+5.4% growth</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600"><CreditCard className="w-6 h-6" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Active Passes</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-3xl font-black text-slate-900">8,412</span>
                            <p className="text-[10px] font-bold text-blue-600 mt-1">19% conversion rate</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600"><Award className="w-6 h-6" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Retention</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-3xl font-black text-slate-900">64%</span>
                            <p className="text-[10px] font-bold text-orange-600 mt-1">-2% churn risk</p>
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
                        placeholder="Filter by name, email or ID..."
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

            {/* Visitor Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Visitor Profile</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Account Type</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Engagement</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Last Active</th>
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
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tickets</span>
                                                <div className="flex items-center gap-1.5">
                                                    <Ticket className="w-3.5 h-3.5 text-orange-400" />
                                                    <span className="text-sm font-black text-slate-900">{visitor.ticketsPurchased}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Spent</span>
                                                <span className="text-sm font-black text-slate-900">{visitor.totalSpent}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-bold text-slate-600">{visitor.lastActive}</p>
                                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-1">
                                                <MapPin className="w-3 h-3" /> {visitor.country}
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

                {/* Footer Controls */}
                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Page 1 of 429</p>
                        <div className="flex h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-1/4 rounded-full" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase text-slate-400 hover:bg-white hover:text-blue-600 transition-all">
                            <ChevronLeft className="w-4 h-4" /> Prev
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-900 rounded-xl text-xs font-black uppercase text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                            Next <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
