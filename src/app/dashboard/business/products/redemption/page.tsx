"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    QrCode,
    CheckCircle2,
    Clock,
    Ticket,
    ArrowLeft,
    Search,
    Sparkles,
    ChevronDown,
} from "lucide-react";

export default function RedemptionTrackingPage() {
    const [voucherCode, setVoucherCode] = useState("");
    const [verifyFeedback, setVerifyFeedback] = useState<string | null>(null);
    const [showRules, setShowRules] = useState(false);

    const [redemptions, setRedemptions] = useState([
        {
            code: "MCOM-VIP-8921",
            customer: "Clara Oswald",
            offer: "25% Off Smart Home Bundle",
            channel: "MCOM Rewards App",
            status: "Redeemed",
            time: "14 mins ago",
            value: "£64.00 Saved",
        },
        {
            code: "EXPO-GIFT-3310",
            customer: "Daniel Craig",
            offer: "Free Booth Consultation + Merch Pack",
            channel: "Season Pass Bonus",
            status: "Redeemed",
            time: "1h ago",
            value: "£45.00 Value",
        },
        {
            code: "MCOM-LKY-7741",
            customer: "Elena Rostova",
            offer: "£20 MCOM Mall Product Credit",
            channel: "Loyalty Milestone",
            status: "Pending",
            time: "3h ago",
            value: "£20.00 Credit",
        },
        {
            code: "EXPO-VIP-1104",
            customer: "Marcus Rashford",
            offer: "Priority Demo Access + 15% Discount",
            channel: "VIP Ticket Perk",
            status: "Expired",
            time: "2d ago",
            value: "£30.00 Value",
        },
    ]);

    const handleRedeemCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (!voucherCode.trim()) return;
        const normalized = voucherCode.trim().toUpperCase();
        setRedemptions([
            {
                code: normalized,
                customer: "Walk-in / Live Booth Visitor",
                offer: "MCOM Promotional Voucher",
                channel: "Live Booth Redemption",
                status: "Redeemed",
                time: "Just now",
                value: "£25.00 Value",
            },
            ...redemptions,
        ]);
        setVerifyFeedback(`Voucher ${normalized} verified and redeemed.`);
        setVoucherCode("");
        setTimeout(() => setVerifyFeedback(null), 4000);
    };

    const getStatusColor = (status: string) => {
        if (status === "Redeemed") return "text-emerald-600";
        if (status === "Pending") return "text-amber-600";
        return "text-red-600";
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <Link
                        href="/dashboard/business/products"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-orange-600 uppercase tracking-wider mb-1 transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to MCOM Products
                    </Link>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        Voucher & MCOM Reward Redemptions
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Validate visitor MCOM Rewards codes, promotional vouchers, and ticket perks.
                    </p>
                </div>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Total Redeemed", value: "312", sub: "Across active events", icon: CheckCircle2, color: "text-emerald-600" },
                        { label: "Active Vouchers", value: "84", sub: "Ready for claim", icon: Ticket, color: "text-orange-600" },
                        { label: "Conversion Rate", value: "68.5%", sub: "+11% vs last expo", icon: Sparkles, color: "text-blue-600" },
                        { label: "Pending Claims", value: "19", sub: "Expiring in 48h", icon: Clock, color: "text-amber-600" },
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

            {/* Quick Voucher Code Validation Box */}
            <form
                onSubmit={handleRedeemCode}
                className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
            >
                <div className="flex items-center gap-2 flex-1">
                    <QrCode className="w-4 h-4 text-orange-600 shrink-0" />
                    <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        placeholder="Enter visitor MCOM voucher or reward code (e.g. MCOM-VIP-8921)..."
                        className="w-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-colors shrink-0"
                >
                    Validate & Redeem
                </button>
            </form>

            {verifyFeedback && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                    <span>{verifyFeedback}</span>
                </div>
            )}

            {/* Clean 3-Line Redemptions List */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Recent Redemption Log
                    </h2>
                    <span className="text-[11px] font-bold text-slate-400">{redemptions.length} records</span>
                </div>

                {redemptions.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors space-y-1"
                    >
                        {/* Line 1 */}
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 truncate">
                                <span className="text-slate-900 font-extrabold">{item.code}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-orange-600">{item.channel}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-400">{item.time}</span>
                            </div>
                            <span className={`shrink-0 ${getStatusColor(item.status)}`}>{item.status}</span>
                        </div>

                        {/* Line 2 */}
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {item.offer}
                        </p>

                        {/* Line 3 */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Visitor: <strong className="text-slate-700">{item.customer}</strong></span>
                            <span className="font-bold text-slate-900">{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Collapsible MCOM Sync Info */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800">
                <button
                    onClick={() => setShowRules(!showRules)}
                    className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left"
                >
                    <div>
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                            MCOM Rewards Auto-Reconciliation
                        </h3>
                        <p className="text-[11px] text-slate-400">
                            How redeemed codes reconcile with your MCOM Mall inventory and loyalty ledger.
                        </p>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                            showRules ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {showRules && (
                    <div className="px-3.5 pb-4 sm:px-4 pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                        <p>• Every code validated here is immediately marked used across MCOM Mall & MCOM Rewards.</p>
                        <p>• Season Pass bonus vouchers do not deduct from your booth commission margin.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
