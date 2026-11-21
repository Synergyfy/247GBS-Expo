"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    Users,
    Ticket,
    TrendingUp,
    Clock,
    QrCode,
    Share2,
    Settings,
    CheckCircle2,
} from "lucide-react";

export default function ManageSingleEventPage() {
    const params = useParams();
    const eventId = params?.id || "evt-1";
    const [copied, setCopied] = useState(false);

    const attendees = [
        { name: "Dr. Hannah Abbott", email: "h.abbott@medtech.uk", tier: "VIP Access Template", paid: "£120", status: "Checked In", time: "10 mins ago" },
        { name: "Liam Gallagher", email: "liam@oasis-ventures.co.uk", tier: "General Access Template", paid: "£25", status: "Registered", time: "1h ago" },
        { name: "Sophia Martinez", email: "sophia@cloudscale.io", tier: "MCOM Reward Pass", paid: "Gift Pass", status: "Checked In", time: "2h ago" },
        { name: "Noah Williams", email: "noah@retailgroup.com", tier: "General Access Template", paid: "£25", status: "Registered", time: "4h ago" },
    ];

    const handleCopyLink = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <Link
                        href="/dashboard/business/events"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-orange-600 uppercase tracking-wider mb-1 transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to My Events
                    </Link>
                    <div className="flex items-center gap-2">
                        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                            Global Tech & AI Innovation Expo ({String(eventId).toUpperCase()})
                        </h1>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                            • Published
                        </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        15–20 Mar 2026 • Booth #B-42 Live Stream & Product Showcase
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:border-orange-500 hover:text-orange-600 transition-all"
                    >
                        <Share2 className="w-3.5 h-3.5" /> {copied ? "Link Copied!" : "Share Event"}
                    </button>
                    <Link
                        href="/dashboard/business/verification"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all"
                    >
                        <QrCode className="w-3.5 h-3.5" /> Verify Passes
                    </Link>
                </div>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Passes Issued", value: "412 / 500", sub: "82.4% capacity", icon: Users, color: "text-blue-600" },
                        { label: "Checked In", value: "289", sub: "70.1% turnout rate", icon: CheckCircle2, color: "text-emerald-600" },
                        { label: "Ticket Revenue", value: "£8,450", sub: "Admin cap compliant", icon: TrendingUp, color: "text-orange-600" },
                        { label: "Reward Passes", value: "65", sub: "Via MCOM Rewards", icon: Ticket, color: "text-purple-600" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="w-[42%] min-w-[144px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-1.5 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                                    {stat.label}
                                </span>
                                <stat.icon className={`w-3.5 h-3.5 shrink-0 ${stat.color}`} />
                            </div>
                            <p className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                {stat.value}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">{stat.sub}</p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-1.5 lg:hidden">
                    <span className="w-4 h-1 rounded-full bg-orange-600" />
                    <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                </div>
            </div>

            {/* Attendee Roster */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                            Registered Attendees & Pass Holders
                        </h2>
                        <p className="text-[11px] text-slate-500">
                            Real-time attendee check-in status and ticket template breakdown.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/business/events/tickets"
                        className="text-[11px] font-bold text-orange-600 hover:underline"
                    >
                        Manage Templates →
                    </Link>
                </div>

                {attendees.map((att, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors space-y-1">
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 truncate">
                                <span className="text-orange-600">{att.tier}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-400">{att.time}</span>
                            </div>
                            <span
                                className={
                                    att.status === "Checked In" ? "text-emerald-600" : "text-blue-600"
                                }
                            >
                                {att.status}
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{att.name}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>{att.email}</span>
                            <span className="font-extrabold text-slate-900">{att.paid}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
