"use client";

import React, { useState } from "react";
import {
    QrCode,
    CheckCircle2,
    XCircle,
    Users,
    Ticket,
    ShieldCheck,
    Search,
} from "lucide-react";

export default function TicketVerificationPage() {
    const [passCode, setPassCode] = useState("");
    const [scanResult, setScanResult] = useState<{
        valid: boolean;
        code: string;
        holder: string;
        tier: string;
        message: string;
    } | null>(null);

    const [scanHistory, setScanHistory] = useState([
        {
            code: "PASS-2026-8841",
            holder: "Dr. Hannah Abbott",
            tier: "VIP Executive Pass",
            event: "Global Tech & AI Innovation Expo",
            status: "Verified",
            time: "4 mins ago",
        },
        {
            code: "PASS-2026-7719",
            holder: "Sophia Martinez",
            tier: "MCOM Reward Gift Pass",
            event: "Global Tech & AI Innovation Expo",
            status: "Verified",
            time: "18 mins ago",
        },
        {
            code: "PASS-2026-1029",
            holder: "Unknown Visitor",
            tier: "Expired Single Day Pass",
            event: "Winter Retail Showcase",
            status: "Rejected",
            time: "42 mins ago",
        },
        {
            code: "PASS-2026-5530",
            holder: "Liam Gallagher",
            tier: "Standard Season Day Pass",
            event: "Global Tech & AI Innovation Expo",
            status: "Verified",
            time: "1h ago",
        },
    ]);

    const handleVerifyPass = (e: React.FormEvent) => {
        e.preventDefault();
        if (!passCode.trim()) return;
        const normalized = passCode.trim().toUpperCase();
        const isInvalid = normalized.includes("INVALID") || normalized.includes("EXP");

        const result = {
            valid: !isInvalid,
            code: normalized,
            holder: isInvalid ? "Unverified Holder" : "Verified Expo Attendee",
            tier: isInvalid ? "Expired / Invalid Pass" : "Admin Cap-Compliant Event Pass",
            message: isInvalid
                ? "Pass rejected — expired or already used."
                : "Access granted — Event Day Pass verified.",
        };

        setScanResult(result);
        setScanHistory([
            {
                code: normalized,
                holder: result.holder,
                tier: result.tier,
                event: "Global Tech & AI Innovation Expo",
                status: result.valid ? "Verified" : "Rejected",
                time: "Just now",
            },
            ...scanHistory,
        ]);
        setPassCode("");
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header (No Decorative Status Pill) */}
            <div className="pb-3 border-b border-slate-200/80">
                <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                    Ticket & Access Pass Verification
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    Validate visitor QR codes, Season Passes, and MCOM Reward tickets at your booth or session gate.
                </p>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Total Checked In", value: "289", sub: "Today's active session", icon: CheckCircle2, color: "text-emerald-600" },
                        { label: "VIP Passes", value: "37", sub: "Priority consultation", icon: ShieldCheck, color: "text-orange-600" },
                        { label: "MCOM Reward Passes", value: "65", sub: "Loyalty & gift passes", icon: Ticket, color: "text-purple-600" },
                        { label: "Rejected Scans", value: "4", sub: "Duplicate or expired", icon: XCircle, color: "text-red-600" },
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

            {/* Compact Pass Scanner Input Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-orange-600" /> Instant Pass Verification
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        Scanner Ready
                    </span>
                </div>

                <form onSubmit={handleVerifyPass} className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={passCode}
                            onChange={(e) => setPassCode(e.target.value)}
                            placeholder="Scan QR or enter pass ID (e.g. PASS-2026-8841)..."
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-orange-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700 transition-colors shrink-0"
                    >
                        Verify Pass
                    </button>
                </form>

                {scanResult && (
                    <div
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                            scanResult.valid
                                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                                : "bg-red-50 border-red-200 text-red-900"
                        }`}
                    >
                        <div className="space-y-0.5">
                            <p className="font-extrabold uppercase tracking-wider">
                                {scanResult.code} • {scanResult.tier}
                            </p>
                            <p className="text-[11px]">{scanResult.message}</p>
                        </div>
                        <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider ${
                                scanResult.valid ? "text-emerald-700" : "text-red-700"
                            }`}
                        >
                            {scanResult.valid ? "VALID" : "REJECTED"}
                        </span>
                    </div>
                )}
            </div>

            {/* Clean 3-Line Scan Log */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Recent Check-In Log
                    </h2>
                    <span className="text-[11px] font-bold text-slate-400">{scanHistory.length} scans</span>
                </div>

                {scanHistory.map((item, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors space-y-1">
                        {/* Line 1 */}
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 truncate">
                                <span className="text-slate-900 font-extrabold">{item.code}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-orange-600">{item.tier}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-400">{item.time}</span>
                            </div>
                            <span
                                className={`shrink-0 ${
                                    item.status === "Verified" ? "text-emerald-600" : "text-red-600"
                                }`}
                            >
                                {item.status}
                            </span>
                        </div>

                        {/* Line 2 */}
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.holder}</p>

                        {/* Line 3 */}
                        <p className="text-[11px] text-slate-500 truncate">{item.event}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
