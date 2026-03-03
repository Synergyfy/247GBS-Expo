"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Ticket,
    Users,
    TrendingUp,
    ArrowLeft,
    Settings,
    QrCode,
    Link as LinkIcon,
    BarChart3,
    Play,
    Edit3,
    CheckCircle2,
    Calendar,
    MapPin,
    Copy,
    ExternalLink,
    Loader2,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function EventManagementPage() {
    const params = useParams();
    const eventId = params.id as string;
    const [activeTab, setActiveTab] = useState("overview");
    const [event, setEvent] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchEventDetails();
    }, [eventId]);

    const fetchEventDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [eventData, txData] = await Promise.all([
                api.get(`/dashboard/business/events/${eventId}`),
                api.get(`/dashboard/business/events/${eventId}/transactions`).catch(() => []),
            ]);
            setEvent(eventData);
            setTransactions(Array.isArray(txData) ? txData : []);
        } catch (err: any) {
            console.error("Failed to fetch event details:", err);
            setError(err.message || "Failed to load event details.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyLink = () => {
        const link = event?.salesLink || `https://expo.247gbs.com/tickets/${eventId}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const ticketsSold = event?.ticketsSold ?? event?._count?.tickets ?? 0;
    const capacity = event?.capacity ?? event?.tickets?.reduce((acc: number, t: any) => acc + (t.quantity || 0), 0) ?? 0;
    const revenue = event?.revenue ?? `₦${(ticketsSold * (event?.tickets?.[0]?.price || 0)).toLocaleString()}`;
    const checkIns = event?.checkIns ?? event?._count?.checkIns ?? 0;
    const conversion = capacity > 0 ? ((ticketsSold / capacity) * 100).toFixed(1) + "%" : "—";

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-orange-600 mb-4" />
                <p className="text-slate-500 font-bold animate-pulse">Loading Event...</p>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Could not load event</h3>
                <p className="text-slate-500 max-w-sm">{error || "Event not found."}</p>
                <Link href="/dashboard/business/events" className="flex items-center gap-2 text-orange-600 font-bold hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Events
                </Link>
            </div>
        );
    }

    const salesLink = event?.salesLink || `https://expo.247gbs.com/tickets/${eventId}`;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/dashboard/business/events" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Events
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-black text-slate-900">{event.title || event.name}</h1>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${event.status === 'Published' || event.status === 'PUBLISHED'
                                ? 'bg-emerald-100 text-emerald-700'
                                : event.status === 'LIVE'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-slate-100 text-slate-500'
                                }`}>
                                {event.status}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(event.startDate)} — {formatDate(event.endDate)}
                            </span>
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {event.location || "Virtual"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link
                        href={`/dashboard/business/events/configuration?eventId=${eventId}`}
                        className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 flex items-center gap-2 shadow-sm"
                    >
                        <Edit3 className="w-4 h-4" /> Configure
                    </Link>
                    <button className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 flex items-center gap-2 transition-all">
                        <Play className="w-4 h-4" /> Go to Live Control
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200 overflow-x-auto scrollbar-hide">
                {["Overview", "Tickets", "Sales & Marketing", "Verification", "Analytics"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab.toLowerCase() ? "text-orange-600" : "text-slate-400 hover:text-slate-900"
                            }`}
                    >
                        {tab}
                        {activeTab === tab.toLowerCase() && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-t-full shadow-[0_-2px_10px_rgba(234,88,12,0.4)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* CONTENT AREA */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">

                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: "Ticket Sales", val: ticketsSold.toLocaleString(), icon: <Ticket />, total: `/ ${capacity.toLocaleString()}` },
                                { label: "Revenue", val: revenue, icon: <TrendingUp />, total: "Gross" },
                                { label: "Check-ins", val: checkIns.toLocaleString(), icon: <CheckCircle2 />, total: "Attendees" },
                                { label: "Conversion", val: conversion, icon: <BarChart3 />, total: "Rate" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                                        {stat.icon}
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-2xl font-bold text-slate-900">{stat.val}</h3>
                                        <span className="text-xs text-slate-400 font-bold">{stat.total}</span>
                                    </div>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Sales Link Widget */}
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <LinkIcon className="w-32 h-32" />
                                </div>
                                <h3 className="text-xl font-bold mb-6 relative z-10">Event Sales Channel</h3>
                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Public Sales Link</label>
                                        <div className="flex gap-2">
                                            <div className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono truncate">
                                                {salesLink}
                                            </div>
                                            <button
                                                onClick={handleCopyLink}
                                                className={`p-3 rounded-xl transition-all ${copied ? 'bg-emerald-600' : 'bg-orange-600 hover:bg-orange-700'}`}
                                            >
                                                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="flex-1 bg-white text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
                                            <QrCode className="w-4 h-4" /> Download QR Poster
                                        </button>
                                        <button className="flex-1 bg-white/10 border border-white/10 text-white py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                                            <ExternalLink className="w-4 h-4" /> Preview Page
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Recent Transactions</h3>
                                {transactions.length === 0 ? (
                                    <div className="py-10 text-center">
                                        <Ticket className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">No transactions yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {transactions.slice(0, 5).map((tx: any, i: number) => (
                                            <div key={tx.id || i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs uppercase">
                                                        {tx.user?.name ? tx.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : "?"}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">{tx.user?.name || "Anonymous"} purchased {tx.ticketType || "ticket"}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                            {tx.createdAt ? new Date(tx.createdAt).toLocaleTimeString() : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-slate-900">+₦{Number(tx.amount || 0).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {transactions.length > 5 && (
                                    <button className="w-full mt-6 py-3 text-sm font-bold text-orange-600 hover:text-orange-700 uppercase tracking-widest">
                                        View All Sales &rarr;
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* OTHER TABS */}
                {activeTab !== "overview" && (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Settings className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Module Config: {activeTab}</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">This section is being configured with your platform settlement rules.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
