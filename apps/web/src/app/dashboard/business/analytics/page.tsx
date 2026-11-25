"use client";

import React, { useState } from "react";
import {
    Users,
    MousePointerClick,
    ShoppingBag,
    TrendingUp,
    ChevronDown,
} from "lucide-react";

export default function BusinessAnalyticsPage() {
    const [timeframe, setTimeframe] = useState("30d");
    const [showInsights, setShowInsights] = useState(false);

    const topProducts = [
        { name: "Smart Home Hub (Gen 4)", views: "3,420", clicks: "612 Buy Now Clicks", conversion: "14.2%", revenue: "£11,240" },
        { name: "Enterprise Cloud Suite (1-Yr)", views: "2,190", clicks: "380 Buy Now Clicks", conversion: "11.8%", revenue: "£8,980" },
        { name: "AI Security Camera Pro", views: "1,840", clicks: "295 Buy Now Clicks", conversion: "9.6%", revenue: "£4,120" },
    ];

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        Booth & MCOM Conversion Analytics
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Visitor footfall, MCOM Mall &quot;Buy Now&quot; click-through rates, and live stream engagement.
                    </p>
                </div>

                <div className="flex items-center gap-1.5">
                    {["7d", "30d", "90d"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTimeframe(t)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                                timeframe === t
                                    ? "bg-orange-600 text-white"
                                    : "bg-white border border-slate-200 text-slate-600"
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Booth Visitors", value: "12,480", sub: "+28% vs last period", icon: Users, color: "text-blue-600" },
                        { label: "MCOM 'Buy Now' Clicks", value: "1,842", sub: "14.7% click-through", icon: MousePointerClick, color: "text-orange-600" },
                        { label: "Completed Orders", value: "184", sub: "9.9% checkout conversion", icon: ShoppingBag, color: "text-emerald-600" },
                        { label: "Avg. Order Value", value: "£134.50", sub: "+£18.20 with VIP pass", icon: TrendingUp, color: "text-purple-600" },
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

            {/* Clean 3-Line Top Performing MCOM Products */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Top Converting MCOM Mall Products
                    </h2>
                    <span className="text-[11px] font-bold text-emerald-600">Live Funnel Metrics</span>
                </div>

                {topProducts.map((prod, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors space-y-1">
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <span className="text-orange-600">Rank #{idx + 1} • {prod.clicks}</span>
                            <span className="text-emerald-600">{prod.conversion} Conv. Rate</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{prod.name}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Booth Views: <strong className="text-slate-700">{prod.views}</strong></span>
                            <span className="font-extrabold text-slate-900">{prod.revenue}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Collapsible AI Conversion Insights */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800">
                <button
                    onClick={() => setShowInsights(!showInsights)}
                    className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left"
                >
                    <div>
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                            CHS AI Conversion Recommendations
                        </h3>
                        <p className="text-[11px] text-slate-400">
                            Actionable tips from your booth traffic and live stream watch time.
                        </p>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                            showInsights ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {showInsights && (
                    <div className="px-3.5 pb-4 sm:px-4 pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                        <p>• Visitors who attend your live demo convert at <strong className="text-white">3.2x</strong> the rate of standard booth browsers.</p>
                        <p>• Pinning a £20 MCOM Reward voucher during the final 15 minutes of your session increased checkout completions by 28%.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
