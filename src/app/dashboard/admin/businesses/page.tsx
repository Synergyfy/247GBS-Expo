"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    Globe,
    Building2,
    CheckCircle2,
    ShieldCheck,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Trophy,
    TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Business {
    id: string;
    name: string;
    owner: string;
    email: string;
    cac: string;
    status: 'Approved' | 'Verified' | 'Premium';
    dateApproved: string;
    revenue: string;
    eventsHeld: number;
    location: string;
}

const MOCK_BUSINESSES: Business[] = [
    {
        id: "biz_1",
        name: "TechGlobal Solutions Ltd",
        owner: "Abiodun Okoro",
        email: "contact@techglobal.com",
        cac: "RC1234567",
        status: "Premium",
        dateApproved: "2026-01-15",
        revenue: "£1.2M",
        eventsHeld: 14,
        location: "Lagos, Nigeria"
    },
    {
        id: "biz_2",
        name: "Creative Wave Media",
        owner: "Sarah Jenkins",
        email: "sarah@creativewave.uk",
        cac: "UK-998877",
        status: "Verified",
        dateApproved: "2026-02-01",
        revenue: "£450k",
        eventsHeld: 5,
        location: "London, UK"
    },
    {
        id: "biz_3",
        name: "GreenEnergy Pro",
        owner: "Hans Miller",
        email: "info@greenpro.de",
        cac: "DE-443322",
        status: "Approved",
        dateApproved: "2026-02-10",
        revenue: "£890k",
        eventsHeld: 8,
        location: "Berlin, Germany"
    },
    {
        id: "biz_4",
        name: "Finest Retail Corp",
        owner: "Anita Desai",
        email: "admin@finestretail.in",
        cac: "IN-112233",
        status: "Premium",
        dateApproved: "2026-01-20",
        revenue: "£2.5M",
        eventsHeld: 22,
        location: "Mumbai, India"
    }
];

export default function AdminBusinessesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredBusinesses = MOCK_BUSINESSES.filter(biz => {
        const matchesSearch = biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            biz.owner.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || biz.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">Global Network</div>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Approved Businesses</h1>
                <p className="text-slate-500 font-medium">Manage and monitor all verified exhibitors and merchant partners on the platform.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Partners</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">1,248</span>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Building2 className="w-5 h-5" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Tier</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">142</span>
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><Trophy className="w-5 h-5" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">890</span>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><ShieldCheck className="w-5 h-5" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">£14.2M</span>
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><TrendingUp className="w-5 h-5" /></div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by business name or owner..."
                        className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-600/10 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
                    {["All", "Approved", "Verified", "Premium"].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${statusFilter === status ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden shadow-slate-200/50">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Business & CAC</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Owner & Location</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Activity</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        <AnimatePresence>
                            {filteredBusinesses.map((biz) => (
                                <motion.tr
                                    key={biz.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-slate-50/50 transition-colors group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                                <Building2 className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 leading-tight">{biz.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">CAC: {biz.cac}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <p className="font-bold text-slate-700">{biz.owner}</p>
                                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mt-1">
                                                <MapPin className="w-3 h-3" /> {biz.location}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${biz.status === 'Premium' ? 'bg-orange-100 text-orange-600' :
                                                biz.status === 'Verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            <CheckCircle2 className="w-3 h-3" />
                                            {biz.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex gap-6">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Events</p>
                                                <p className="text-sm font-black text-slate-900">{biz.eventsHeld}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rev</p>
                                                <p className="text-sm font-black text-slate-900">{biz.revenue}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm">
                                                <Mail className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-orange-600 transition-all shadow-sm">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {filteredBusinesses.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-4">
                            <Building2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">No businesses found</h3>
                        <p className="text-slate-400 text-sm font-medium">Try adjusting your search or filters.</p>
                    </div>
                )}

                {/* Pagination Placeholder */}
                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400">Showing {filteredBusinesses.length} of 1,248 results</p>
                    <div className="flex gap-2">
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
