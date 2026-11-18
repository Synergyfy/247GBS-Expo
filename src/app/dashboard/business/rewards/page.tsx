"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Gift,
    RefreshCw,
    Ticket,
    Users,
    Sparkles,
    CheckCircle2,
    ChevronDown,
    Plus,
} from "lucide-react";
import Modal from "@/app/component/Modal";

export default function BusinessRewardsPage() {
    const [syncing, setSyncing] = useState(false);
    const [syncBanner, setSyncBanner] = useState<string | null>(null);
    const [showSyncDetails, setShowSyncDetails] = useState(false);
    const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
    const [rewardTitle, setRewardTitle] = useState("");
    const [passCount, setPassCount] = useState("25");
    const [tierTarget, setTierTarget] = useState("MCOM Gold & Platinum Members");

    const [allocations, setAllocations] = useState([
        {
            id: "RWD-101",
            title: "Complimentary VIP Booth Pass + £20 MCOM Credit",
            target: "MCOM Gold & Platinum Members",
            allocated: "40 / 50 Claimed",
            source: "MCOM Rewards Auto-Sync",
            status: "Active",
        },
        {
            id: "RWD-102",
            title: "Buy 1 Get 1 Season Expo Day Pass",
            target: "Repeat Booth Visitors",
            allocated: "85 / 100 Claimed",
            source: "MCOM Loyalty Pool",
            status: "Active",
        },
        {
            id: "RWD-103",
            title: "25% Off Smart Home Hub Bundle Voucher",
            target: "All Live Stream Attendees",
            allocated: "112 / 150 Claimed",
            source: "MCOM Mall Coupon Bridge",
            status: "Synced",
        },
    ]);

    const handleSyncMcomRewards = () => {
        setSyncing(true);
        setTimeout(() => {
            setSyncing(false);
            setSyncBanner("Synced with MCOM Rewards: 3 active loyalty pools and 237 claimed passes reconciled.");
            setTimeout(() => setSyncBanner(null), 4000);
        }, 800);
    };

    const handleAllocate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!rewardTitle.trim()) return;
        setAllocations([
            {
                id: `RWD-10${allocations.length + 1}`,
                title: rewardTitle,
                target: tierTarget,
                allocated: `0 / ${passCount} Claimed`,
                source: "Bulk Ticket Allocation",
                status: "Active",
            },
            ...allocations,
        ]);
        setRewardTitle("");
        setIsAllocateModalOpen(false);
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        MCOM Rewards Sync & Ticket Allocations
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Dynamically sync loyalty perks with MCOM Rewards and allocate bulk complimentary tickets.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSyncMcomRewards}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:border-orange-500 hover:text-orange-600 transition-all"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin text-orange-600" : ""}`} />
                        {syncing ? "Syncing..." : "Sync MCOM Rewards"}
                    </button>
                    <button
                        onClick={() => setIsAllocateModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" /> Allocate Bulk Passes
                    </button>
                </div>
            </div>

            {syncBanner && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{syncBanner}</span>
                </div>
            )}

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Synced Reward Pools", value: String(allocations.length), sub: "Connected to MCOM", icon: Gift, color: "text-orange-600" },
                        { label: "Passes Claimed", value: "237", sub: "79.0% redemption rate", icon: Ticket, color: "text-emerald-600" },
                        { label: "VIP Loyalty Buyers", value: "148", sub: "Visited booth via perk", icon: Users, color: "text-blue-600" },
                        { label: "Upsell Revenue", value: "£6,420", sub: "From reward claimants", icon: Sparkles, color: "text-purple-600" },
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

            {/* Clean 3-Line Reward Allocations List */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        MCOM Rewards & Bulk Ticket Pools
                    </h2>
                    <Link
                        href="/dashboard/business/products/redemption"
                        className="text-[11px] font-bold text-orange-600 hover:underline"
                    >
                        View Redemption Log →
                    </Link>
                </div>

                {allocations.map((item) => (
                    <div
                        key={item.id}
                        className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors space-y-1"
                    >
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 truncate">
                                <span className="text-slate-900 font-extrabold">{item.id}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-orange-600">{item.source}</span>
                            </div>
                            <span className="text-emerald-600 shrink-0">{item.status}</span>
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.title}</p>

                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                            <span>Audience: <strong className="text-slate-700">{item.target}</strong></span>
                            <span className="font-extrabold text-slate-900">{item.allocated}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Collapsible MCOM Rewards Architecture Card */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800">
                <button
                    onClick={() => setShowSyncDetails(!showSyncDetails)}
                    className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left"
                >
                    <div>
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                            How MCOM Rewards & Bulk Ticket Allocation Work
                        </h3>
                        <p className="text-[11px] text-slate-400">
                            Automated loyalty distribution without manual campaign configuration.
                        </p>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                            showSyncDetails ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {showSyncDetails && (
                    <div className="px-3.5 pb-4 sm:px-4 pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                        <p>• <strong className="text-white">Dynamic MCOM Sync:</strong> Vouchers and loyalty tiers configured in your MCOM merchant account appear automatically.</p>
                        <p>• <strong className="text-white">Bulk Ticket Gifting:</strong> Allocate free event passes to high-value buyers to drive booth footfall and product conversions.</p>
                    </div>
                )}
            </div>

            {/* Allocate Bulk Passes Modal */}
            <Modal
                isOpen={isAllocateModalOpen}
                onClose={() => setIsAllocateModalOpen(false)}
                title="Allocate Bulk Reward Passes"
            >
                <form onSubmit={handleAllocate} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Reward / Allocation Title
                        </label>
                        <input
                            type="text"
                            required
                            value={rewardTitle}
                            onChange={(e) => setRewardTitle(e.target.value)}
                            placeholder="e.g. 25 Complimentary VIP Passes for Top Buyers"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Target MCOM Segment
                            </label>
                            <select
                                value={tierTarget}
                                onChange={(e) => setTierTarget(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-orange-500"
                            >
                                <option>MCOM Gold & Platinum Members</option>
                                <option>Repeat Booth Visitors</option>
                                <option>VIP Client Invite List</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Number of Passes
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="500"
                                value={passCount}
                                onChange={(e) => setPassCount(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsAllocateModalOpen(false)}
                            className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700"
                        >
                            Publish Allocation
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
