"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Plus,
    Users,
    Ticket,
    TrendingUp,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Settings,
    QrCode,
    ChevronDown,
} from "lucide-react";

export default function BusinessEventsPage() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [showPipelineInfo, setShowPipelineInfo] = useState(false);

    const events = [
        {
            id: "evt-1",
            title: "Global Tech & AI Innovation Expo 2026",
            category: "Technology",
            type: "Season Expo",
            date: "15–20 Mar 2026",
            status: "Published",
            approvalStage: "Approved & Live",
            registrations: 412,
            capacity: 500,
            revenue: "£8,450",
            priceRange: "£0 – £120 (Admin Cap Compliant)",
        },
        {
            id: "evt-2",
            title: "Enterprise Cloud & FinTech Showcase",
            category: "FinTech",
            type: "Live Booth Session",
            date: "12 Apr 2026",
            status: "Pending Approval",
            approvalStage: "Admin Moderation Queue",
            registrations: 0,
            capacity: 300,
            revenue: "£0",
            priceRange: "£25 – £95 (Admin Cap Compliant)",
        },
        {
            id: "evt-3",
            title: "Summer Retail & MCOM Commerce Summit",
            category: "E-Commerce",
            type: "Product Launch",
            date: "10–15 Jun 2026",
            status: "Draft",
            approvalStage: "Ticket Template Setup",
            registrations: 0,
            capacity: 1000,
            revenue: "£0",
            priceRange: "£0 – £50 (General Pass Template)",
        },
    ];

    const filteredEvents = events.filter((e) => {
        if (activeFilter === "all") return true;
        return e.status.toLowerCase().includes(activeFilter.toLowerCase());
    });

    const getStatusColor = (status: string) => {
        if (status === "Published") return "text-emerald-600";
        if (status === "Pending Approval") return "text-orange-600";
        return "text-slate-500";
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        My Events & Sessions
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Host custom booth events, manage Admin-capped ticket templates, and track approvals.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/dashboard/business/events/tickets"
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:border-orange-500 hover:text-orange-600 transition-all"
                    >
                        Ticket Tiers & Caps
                    </Link>
                    <Link
                        href="/dashboard/business/events/create"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all shadow-sm"
                    >
                        <Plus className="w-3.5 h-3.5" /> Create Event
                    </Link>
                </div>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Hosted Events", value: "3", sub: "1 Live • 1 Pending • 1 Draft", icon: Calendar, color: "text-orange-600" },
                        { label: "Total Registrations", value: "412", sub: "82.4% capacity filled", icon: Users, color: "text-blue-600" },
                        { label: "Ticket Revenue", value: "£8,450", sub: "Within Admin price caps", icon: TrendingUp, color: "text-emerald-600" },
                        { label: "Reward Passes", value: "65", sub: "Allocated via MCOM Rewards", icon: Ticket, color: "text-purple-600" },
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

            {/* Filter Tabs & Quick Sub-Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 sm:pb-0">
                    {[
                        { id: "all", label: "All Events (3)" },
                        { id: "published", label: "Published (1)" },
                        { id: "pending", label: "Pending Review (1)" },
                        { id: "draft", label: "Drafts (1)" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveFilter(tab.id)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all ${
                                activeFilter === tab.id
                                    ? "bg-orange-600 text-white shadow-sm"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] font-bold">
                    <Link
                        href="/dashboard/business/verification"
                        className="inline-flex items-center gap-1 text-slate-600 hover:text-orange-600"
                    >
                        <QrCode className="w-3.5 h-3.5" /> Verify Passes
                    </Link>
                    <span className="text-slate-300">•</span>
                    <Link
                        href="/dashboard/business/events/configuration"
                        className="inline-flex items-center gap-1 text-slate-600 hover:text-orange-600"
                    >
                        <Settings className="w-3.5 h-3.5" /> Event Rules
                    </Link>
                </div>
            </div>

            {/* Clean 3-Line Event Cards */}
            <div className="space-y-3">
                {filteredEvents.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm hover:border-orange-300 transition-all space-y-2.5"
                    >
                        {/* Line 1: Metadata & Colored Text Status */}
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 min-w-0 truncate">
                                <span className="text-orange-600">{event.date}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-600">{event.type}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-400 truncate">{event.category}</span>
                            </div>
                            <span className={`shrink-0 ${getStatusColor(event.status)}`}>{event.status}</span>
                        </div>

                        {/* Line 2: Event Title & Approval Stage */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                                {event.title}
                            </h3>
                            <span className="text-[11px] font-semibold text-slate-500">
                                Stage: <strong className="text-slate-700">{event.approvalStage}</strong>
                            </span>
                        </div>

                        {/* Line 3: Metrics + Compact Action Buttons */}
                        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
                                <span>
                                    Passes: <strong className="text-slate-900">{event.registrations}/{event.capacity}</strong>
                                </span>
                                <span className="text-slate-300">•</span>
                                <span>
                                    Sales: <strong className="text-emerald-600">{event.revenue}</strong>
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-500">{event.priceRange}</span>
                            </div>

                            <div className="flex items-center justify-end gap-2 shrink-0">
                                <Link
                                    href="/dashboard/business/events/tickets"
                                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700 hover:border-orange-500 hover:text-orange-600 transition-colors"
                                >
                                    Tickets
                                </Link>
                                <Link
                                    href={`/dashboard/business/events/${event.id}`}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors"
                                >
                                    Manage <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Collapsible Admin Approval & Ticket Cap Rules */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800">
                <button
                    onClick={() => setShowPipelineInfo(!showPipelineInfo)}
                    className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left"
                >
                    <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                            Admin Event Approval & Price Cap Policy
                        </h3>
                        <p className="text-[11px] text-slate-400 truncate">
                            All exhibitor events use Admin-approved ticket templates so pricing never exceeds season caps.
                        </p>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            showPipelineInfo ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {showPipelineInfo && (
                    <div className="px-3.5 pb-4 sm:px-4 pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                        <p>
                            • <strong className="text-white">Step 1 (Template Selection):</strong> Select from Admin-configured General, VIP, or MCOM Reward ticket templates.
                        </p>
                        <p>
                            • <strong className="text-white">Step 2 (Admin Moderation):</strong> Events are reviewed by Super Admin to ensure schedule and ticket caps align with the active Season Expo.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
