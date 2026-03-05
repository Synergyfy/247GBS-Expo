"use client";

import { useState, useEffect } from "react";
import { LifeBuoy, MessageSquare, FileText, Search, ExternalLink, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function BusinessSupportPage() {
    const [stats, setStats] = useState({ tickets: 0, chats: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [tickets, chats] = await Promise.all([
                    api.get('/dashboard/business/revenue/tickets'),
                    api.get('/dashboard/business/support/chat')
                ]);
                setStats({
                    tickets: tickets.filter((t: any) => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length,
                    chats: chats.filter((c: any) => c.status === 'OPEN').length
                });
            } catch (err) {
                console.error("Failed to fetch support stats:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Support & Dispute Center</h1>
                    <p className="text-slate-500 font-medium">Global business assistance and transaction resolution desk.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Global Support Online</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Knowledge Base */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col group hover:border-orange-200 transition-all">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-8 border border-orange-100/50 group-hover:scale-110 transition-transform">
                        <LifeBuoy className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-xl">Help Documentation</h3>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                        Access our comprehensive library of guides on event setup, payouts, and customer management.
                    </p>
                    <button className="mt-auto group/btn flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors">
                        Explore Guides <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Live Chat */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col group hover:border-blue-200 transition-all">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 border border-blue-100/50 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-900 text-xl">Live Support</h3>
                        {stats.chats > 0 && (
                            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-tighter">
                                {stats.chats} Active
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                        Talk directly to technical experts. Average response time: <span className="text-blue-600 font-bold">Under 2 mins</span>.
                    </p>
                    <Link href="/dashboard/business/support/chat" className="mt-auto bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all text-center">
                        {stats.chats > 0 ? "Return to Chat" : "Initiate Chat"}
                    </Link>
                </div>

                {/* Resolution Center */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col group hover:border-emerald-200 transition-all">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 border border-emerald-100/50 group-hover:scale-110 transition-transform">
                        <FileText className="w-8 h-8" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-900 text-xl">Resolutions</h3>
                        {stats.tickets > 0 && (
                            <span className="px-3 py-1 bg-orange-600 text-white text-[10px] font-black rounded-full uppercase tracking-tighter">
                                {stats.tickets} Pending
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                        Open formal disputes for transactions, platform fees, or payout limit increases.
                    </p>
                    <Link href="/dashboard/business/support/tickets" className="mt-auto border-2 border-slate-900 text-slate-900 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all text-center">
                        Manage Tickets
                    </Link>
                </div>
            </div>

            {/* Platform Status */}
            <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/10">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">System Integrity</h4>
                        <p className="text-slate-400 text-sm">All platform services are operational. Payouts are processing normally.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Uptime</p>
                        <p className="font-mono text-emerald-400">99.98%</p>
                    </div>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Status History</button>
                </div>
            </div>
        </div>
    );
}
import { ShieldCheck } from "lucide-react";
