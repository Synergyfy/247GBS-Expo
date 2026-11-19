"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Ticket,
    ShieldCheck,
    ArrowLeft,
    Users,
    TrendingUp,
    Gift,
    ChevronDown,
    Sliders,
} from "lucide-react";
import Modal from "@/app/component/Modal";

interface TicketTier {
    id: string;
    name: string;
    templateName: string;
    minCap: number;
    maxCap: number;
    currentPrice: number;
    sold: number;
    quota: number;
    status: string;
}

export default function TicketTiersPage() {
    const [showCapPolicy, setShowCapPolicy] = useState(false);
    const [editingTier, setEditingTier] = useState<TicketTier | null>(null);
    const [priceInput, setPriceInput] = useState<number>(0);
    const [quotaInput, setQuotaInput] = useState<number>(0);

    const [tiers, setTiers] = useState<TicketTier[]>([
        {
            id: "T-01",
            name: "Standard Booth & Keynote Pass",
            templateName: "Admin General Access Template",
            minCap: 0,
            maxCap: 50,
            currentPrice: 25,
            sold: 310,
            quota: 400,
            status: "Active",
        },
        {
            id: "T-02",
            name: "VIP Executive Demo & Consultation Pass",
            templateName: "Admin VIP Tier Template",
            minCap: 50,
            maxCap: 250,
            currentPrice: 120,
            sold: 37,
            quota: 50,
            status: "Active",
        },
        {
            id: "T-03",
            name: "MCOM Loyalty & Referral Gift Pass",
            templateName: "Admin Reward Pass Template",
            minCap: 0,
            maxCap: 0,
            currentPrice: 0,
            sold: 65,
            quota: 100,
            status: "Synced with MCOM Rewards",
        },
    ]);

    const openEditModal = (tier: TicketTier) => {
        setEditingTier(tier);
        setPriceInput(tier.currentPrice);
        setQuotaInput(tier.quota);
    };

    const handleSaveTier = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTier) return;
        const clampedPrice = Math.min(Math.max(priceInput, editingTier.minCap), editingTier.maxCap);
        setTiers(
            tiers.map((t) =>
                t.id === editingTier.id ? { ...t, currentPrice: clampedPrice, quota: quotaInput } : t
            )
        );
        setEditingTier(null);
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
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        Ticket Tiers & Admin Price Caps
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Configure ticket pricing within Super Admin season pass caps and allocate MCOM Reward passes.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/dashboard/business/sales/links"
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:border-orange-500 hover:text-orange-600 transition-all"
                    >
                        Assign Pass Links
                    </Link>
                    <Link
                        href="/dashboard/business/events/create"
                        className="px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all"
                    >
                        + New Event Pass
                    </Link>
                </div>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Passes Issued", value: "412", sub: "Across 3 active templates", icon: Ticket, color: "text-orange-600" },
                        { label: "Gross Ticket Sales", value: "£12,190", sub: "100% cap compliant", icon: TrendingUp, color: "text-emerald-600" },
                        { label: "MCOM Gift Passes", value: "65 / 100", sub: "Synced to MCOM Rewards", icon: Gift, color: "text-purple-600" },
                        { label: "Remaining Quota", value: "138", sub: "Available for booking", icon: Users, color: "text-blue-600" },
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

            {/* Clean 3-Line Ticket Tier Rows */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Active Admin Ticket Templates
                    </h2>
                    <span className="text-[11px] font-bold text-emerald-600">Season Cap Enforced</span>
                </div>

                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                        <div className="min-w-0 flex-1 space-y-1">
                            {/* Line 1 */}
                            <div className="flex items-center justify-between sm:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5 truncate">
                                    <span className="text-slate-900 font-extrabold">{tier.id}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-orange-600">{tier.templateName}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500">
                                        Admin Cap: £{tier.minCap}–£{tier.maxCap}
                                    </span>
                                </div>
                                <span className="text-emerald-600 shrink-0">{tier.status}</span>
                            </div>

                            {/* Line 2 */}
                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{tier.name}</p>

                            {/* Line 3 */}
                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                                <span>
                                    Your Price:{" "}
                                    <strong className="text-slate-900">
                                        {tier.currentPrice === 0 ? "Free / Gift" : `£${tier.currentPrice}`}
                                    </strong>
                                </span>
                                <span className="text-slate-300">•</span>
                                <span>
                                    Issued: <strong className="text-slate-900">{tier.sold} / {tier.quota}</strong>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                            <button
                                onClick={() => openEditModal(tier)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors"
                            >
                                <Sliders className="w-3.5 h-3.5" /> Adjust Price / Quota
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Collapsible Admin Price Cap Explanation */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800">
                <button
                    onClick={() => setShowCapPolicy(!showCapPolicy)}
                    className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left"
                >
                    <div className="flex items-center gap-2.5 min-w-0">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
                                Why Ticket Prices Are Capped by Admin Templates
                            </h3>
                            <p className="text-[11px] text-slate-400 truncate">
                                Protects visitor trust and aligns booth sessions with Seasonal Expo pass tiers.
                            </p>
                        </div>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            showCapPolicy ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {showCapPolicy && (
                    <div className="px-3.5 pb-4 sm:px-4 pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                        <p>• Super Admin defines maximum price ceilings per template so exhibitors cannot overcharge above the Season Expo Pass.</p>
                        <p>• Need a higher custom ceiling for an executive summit? Request a custom template review via Support.</p>
                    </div>
                )}
            </div>

            {/* Edit Price / Quota Modal */}
            <Modal
                isOpen={!!editingTier}
                onClose={() => setEditingTier(null)}
                title={`Configure ${editingTier?.id || ""}`}
            >
                {editingTier && (
                    <form onSubmit={handleSaveTier} className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                            <p className="font-bold text-slate-900">{editingTier.name}</p>
                            <p className="text-slate-500">
                                Template: <strong className="text-orange-600">{editingTier.templateName}</strong> (Allowed Cap: £{editingTier.minCap} – £{editingTier.maxCap})
                            </p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Ticket Price (£{editingTier.minCap} – £{editingTier.maxCap})
                            </label>
                            <input
                                type="number"
                                min={editingTier.minCap}
                                max={editingTier.maxCap}
                                disabled={editingTier.maxCap === 0}
                                value={priceInput}
                                onChange={(e) => setPriceInput(Number(e.target.value))}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 disabled:bg-slate-100"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Total Pass Quota
                            </label>
                            <input
                                type="number"
                                min={editingTier.sold}
                                value={quotaInput}
                                onChange={(e) => setQuotaInput(Number(e.target.value))}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setEditingTier(null)}
                                className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}
