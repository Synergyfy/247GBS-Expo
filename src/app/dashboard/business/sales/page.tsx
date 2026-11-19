"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    TrendingUp,
    ShoppingBag,
    Ticket,
    Link2,
    Gift,
    ArrowUpRight,
    ChevronDown,
} from "lucide-react";

export default function SalesAndPromotionsHubPage() {
    const [showAttributionInfo, setShowAttributionInfo] = useState(false);

    const channels = [
        {
            name: "MCOM Mall Direct Booth Links",
            type: "Product Catalog Checkout",
            conversions: "184 Orders",
            revenue: "£14,820",
            growth: "+24% vs last month",
            status: "Synced",
            href: "/dashboard/business/products",
        },
        {
            name: "Referral & Pass Assignment Links",
            type: "Ticket & Guest Invite Links",
            conversions: "312 Passes",
            revenue: "£7,800",
            growth: "+18% conversion",
            status: "Active",
            href: "/dashboard/business/sales/links",
        },
        {
            name: "MCOM Rewards Loyalty Allocations",
            type: "Complimentary Ticket & Voucher Perks",
            conversions: "96 Redemptions",
            revenue: "£3,450 Upsell",
            growth: "68.5% claim rate",
            status: "Synced",
            href: "/dashboard/business/rewards",
        },
    ];

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        Sales & Referral Performance
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Track MCOM Mall product conversions, ticket referral links, and MCOM Rewards redemptions.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/dashboard/business/rewards"
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:border-orange-500 hover:text-orange-600 transition-all"
                    >
                        MCOM Rewards
                    </Link>
                    <Link
                        href="/dashboard/business/sales/links"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all"
                    >
                        <Link2 className="w-3.5 h-3.5" /> Ticket & Referral Links
                    </Link>
                </div>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Total Gross Sales", value: "£26,070", sub: "MCOM Mall + Event Passes", icon: TrendingUp, color: "text-emerald-600" },
                        { label: "MCOM Mall Orders", value: "184", sub: "Via 'Buy Now' links", icon: ShoppingBag, color: "text-orange-600" },
                        { label: "Referral Passes", value: "312", sub: "Via tracked invite links", icon: Ticket, color: "text-blue-600" },
                        { label: "MCOM Reward Claims", value: "96", sub: "Loyalty & gift passes", icon: Gift, color: "text-purple-600" },
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

            {/* Clean 3-Line Channel Performance List */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Active Conversion Channels
                    </h2>
                    <span className="text-[11px] font-bold text-emerald-600">Real-Time Attribution</span>
                </div>

                {channels.map((ch, idx) => (
                    <div
                        key={idx}
                        className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                        <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center justify-between sm:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5 truncate">
                                    <span className="text-orange-600">{ch.type}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500">{ch.growth}</span>
                                </div>
                                <span className="text-emerald-600 shrink-0">{ch.status}</span>
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{ch.name}</p>

                            <div className="flex items-center gap-3 text-[11px] text-slate-500">
                                <span>
                                    Volume: <strong className="text-slate-900">{ch.conversions}</strong>
                                </span>
                                <span className="text-slate-300">•</span>
                                <span>
                                    Attributed Revenue: <strong className="text-emerald-600">{ch.revenue}</strong>
                                </span>
                            </div>
                        </div>

                        <Link
                            href={ch.href}
                            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors shrink-0"
                        >
                            Open Channel <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Collapsible Attribution Info */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800">
                <button
                    onClick={() => setShowAttributionInfo(!showAttributionInfo)}
                    className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left"
                >
                    <div>
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                            Unified MCOM Mall & Ticket Referral Attribution
                        </h3>
                        <p className="text-[11px] text-slate-400">
                            How product clicks, ticket invites, and MCOM Rewards sync to your revenue ledger.
                        </p>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                            showAttributionInfo ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {showAttributionInfo && (
                    <div className="px-3.5 pb-4 sm:px-4 pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                        <p>• Every booth product click carries your Exhibitor ID to MCOM Mall for instant order attribution.</p>
                        <p>• Ticket referral links allow you to assign complimentary or discounted passes directly to VIP clients.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
