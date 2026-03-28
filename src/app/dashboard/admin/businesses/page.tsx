"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Search,
    Mail,
    Globe,
    Building2,
    CheckCircle2,
    ShieldCheck,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    MapPin,
    TrendingUp,
    Loader2,
    AlertCircle,
    RefreshCw,
    Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

interface Business {
    id: string;
    name: string;
    ownerName: string;
    email: string;
    category: string;
    location: string;
    website: string | null;
    phoneNumber: string | null;
    joinedAt: string;
    revenue: number;
    boothId: string | null;
}

interface Stats {
    total: number;
    totalRevenue: number;
}

const PAGE_SIZE = 10;

export default function AdminBusinessesPage() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, totalRevenue: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);

    const fetchBusinesses = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            const res = await api.get("/admin/businesses");
            setBusinesses(res.data || []);
            setStats(res.stats || { total: 0, totalRevenue: 0 });
        } catch (e: any) {
            setError(e.message || "Failed to load businesses");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchBusinesses(); }, [fetchBusinesses]);

    const filtered = businesses.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.ownerName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const formatCurrency = (v: number) =>
        v >= 1_000_000 ? `£${(v / 1_000_000).toFixed(1)}M` :
        v >= 1_000 ? `£${(v / 1_000).toFixed(0)}k` : `£${v.toFixed(0)}`;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">Global Network</div>
                </div>
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Registered Businesses</h1>
                        <p className="text-slate-500 font-medium">Manage and monitor all business accounts and their booth profiles.</p>
                    </div>
                    <button onClick={fetchBusinesses} className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all" title="Refresh">
                        <RefreshCw className="w-4 h-4 text-slate-500" />
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Businesses</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">{isLoading ? "—" : stats.total}</span>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Building2 className="w-5 h-5" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">With Booth Setup</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">{isLoading ? "—" : businesses.filter(b => b.boothId).length}</span>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><ShieldCheck className="w-5 h-5" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">{isLoading ? "—" : formatCurrency(stats.totalRevenue)}</span>
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><TrendingUp className="w-5 h-5" /></div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by business name, owner or email..."
                        className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-600/10 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden shadow-slate-200/50">
                {isLoading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <AlertCircle className="w-12 h-12 text-red-400" />
                        <p className="text-red-600 font-medium">{error}</p>
                        <button onClick={fetchBusinesses} className="px-6 py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all">Try Again</button>
                    </div>
                ) : (
                    <>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Business</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Owner & Contact</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Revenue</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <AnimatePresence>
                                    {paginated.map((biz) => (
                                        <motion.tr
                                            key={biz.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 font-black text-lg group-hover:bg-orange-600 group-hover:text-white transition-all">
                                                        {biz.name[0]?.toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 leading-tight">{biz.name}</p>
                                                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mt-1">
                                                            <MapPin className="w-3 h-3" /> {biz.location}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="font-bold text-slate-700">{biz.ownerName || "—"}</p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">{biz.email}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                                    biz.boothId ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                                }`}>
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    {biz.category}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-black text-slate-900">{formatCurrency(biz.revenue)}</p>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <a href={`mailto:${biz.email}`} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm">
                                                        <Mail className="w-4 h-4" />
                                                    </a>
                                                    {biz.website && (
                                                        <a href={biz.website} target="_blank" rel="noreferrer" className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm">
                                                            <Globe className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>

                        {filtered.length === 0 && (
                            <div className="py-20 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-4">
                                    <Building2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">No businesses found</h3>
                                <p className="text-slate-400 text-sm font-medium">Try adjusting your search.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-xs font-bold text-slate-400">
                                Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} businesses
                            </p>
                            <div className="flex gap-2">
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-40">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-40">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
