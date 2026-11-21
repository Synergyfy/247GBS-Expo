"use client";

import React, { useState } from "react";
import {
    Wallet,
    TrendingUp,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Download,
    ChevronDown,
    PoundSterling,
} from "lucide-react";
import Modal from "@/app/component/Modal";

export default function BusinessRevenuePage() {
    const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
    const [payoutRequested, setPayoutRequested] = useState(false);
    const [showSplitRules, setShowSplitRules] = useState(false);

    const transactions = [
        {
            id: "#TXN-9941",
            source: "MCOM Mall",
            title: "Smart Home Hub (Gen 4)",
            qty: "2 units",
            ref: "Order #ORD-7829",
            gross: "£259.98",
            split: "-£13.00 (5%)",
            net: "+£246.98",
            status: "Cleared",
            time: "2h ago",
        },
        {
            id: "#TXN-9938",
            source: "Event Tickets",
            title: "Standard Season Day Passes",
            qty: "14 tickets",
            ref: "£25 Template",
            gross: "£350.00",
            split: "-£35.00 (10%)",
            net: "+£315.00",
            status: "Cleared",
            time: "6h ago",
        },
        {
            id: "#TXN-9924",
            source: "Event Tickets",
            title: "VIP Executive Session Passes",
            qty: "3 tickets",
            ref: "£120 Template",
            gross: "£360.00",
            split: "-£28.80 (8%)",
            net: "+£331.20",
            status: "Pending",
            time: "1d ago",
        },
        {
            id: "#TXN-9910",
            source: "Bank Payout",
            title: "Settlement Withdrawal",
            qty: "Faster Payments",
            ref: "Barclays •••• 4821",
            gross: "£4,200.00",
            split: "£0.00",
            net: "-£4,200.00",
            status: "Paid Out",
            time: "3d ago",
        },
    ];

    const handlePayout = (e: React.FormEvent) => {
        e.preventDefault();
        setPayoutRequested(true);
        setTimeout(() => {
            setPayoutRequested(false);
            setIsPayoutModalOpen(false);
        }, 1500);
    };

    const getStatusColor = (status: string) => {
        if (status === "Cleared" || status === "Paid Out") return "text-emerald-600";
        return "text-amber-600";
    };

    return (
        <div className="space-y-5 pb-28">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        Revenue Ledger & Payouts
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Track net earnings from MCOM Mall product sales and Admin-capped event ticket splits.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsPayoutModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all shadow-sm"
                    >
                        <ArrowUpRight className="w-3.5 h-3.5" /> Request Payout
                    </button>
                </div>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Available Balance", value: "£6,480.50", sub: "Ready for instant payout", icon: Wallet, color: "text-emerald-600" },
                        { label: "30-Day Net Revenue", value: "£23,270.00", sub: "+19.4% vs prior period", icon: TrendingUp, color: "text-orange-600" },
                        { label: "Pending Clearance", value: "£1,120.00", sub: "Clears within 24h", icon: Clock, color: "text-amber-600" },
                        { label: "Total Paid Out", value: "£48,900.00", sub: "Barclays Business •••• 4821", icon: PoundSterling, color: "text-blue-600" },
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

            {/* Clean 3-Line Financial Ledger */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Recent Settlement Ledger
                    </h2>
                    <button className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-orange-600">
                        <Download className="w-3.5 h-3.5" /> Export CSV
                    </button>
                </div>

                {transactions.map((txn) => (
                    <div
                        key={txn.id}
                        className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors space-y-1.5"
                    >
                        {/* Line 1: Meta + Status */}
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <span className="font-mono text-slate-800 font-extrabold">{txn.id}</span>
                                <span>•</span>
                                <span>{txn.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-orange-600">{txn.source}</span>
                                <span>•</span>
                                <span className={getStatusColor(txn.status)}>{txn.status}</span>
                            </div>
                        </div>

                        {/* Line 2: Product/Session Title & Prominent Net Amount */}
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                                {txn.title} <span className="text-slate-400 font-semibold text-xs">({txn.qty})</span>
                            </p>
                            <span
                                className={`text-xs sm:text-sm font-extrabold shrink-0 ${
                                    txn.net.startsWith("+") ? "text-emerald-600" : "text-slate-900"
                                }`}
                            >
                                {txn.net}
                            </span>
                        </div>

                        {/* Line 3: Financial Details Breakdown */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-slate-400 pt-0.5 border-t border-slate-50">
                            <span>
                                Gross: <strong className="text-slate-600 font-semibold">{txn.gross}</strong> • Platform Split:{" "}
                                <strong className="text-slate-600 font-semibold">{txn.split}</strong>
                            </span>
                            <span className="font-mono text-[10px] text-slate-400">{txn.ref}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Collapsible Commission Split Summary */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800">
                <button
                    onClick={() => setShowSplitRules(!showSplitRules)}
                    className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left"
                >
                    <div>
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                            Your Active Exhibitor Commission Tier (Yearly Pro Partner — 5%)
                        </h3>
                        <p className="text-[11px] text-slate-400">
                            View how MCOM Mall sales and event pass splits are calculated.
                        </p>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                            showSplitRules ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {showSplitRules && (
                    <div className="px-3.5 pb-4 sm:px-4 pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                        <p>• <strong className="text-white">MCOM Mall Orders:</strong> 5% platform fee on direct product checkouts.</p>
                        <p>• <strong className="text-white">Event Passes:</strong> 8%–10% split based on the selected Admin Ticket Template.</p>
                    </div>
                )}
            </div>

            {/* Payout Modal */}
            <Modal
                isOpen={isPayoutModalOpen}
                onClose={() => setIsPayoutModalOpen(false)}
                title="Withdraw Cleared Balance"
            >
                {payoutRequested ? (
                    <div className="py-6 text-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                        <p className="text-xs font-extrabold uppercase text-slate-900">
                            Payout Dispatched to Barclays •••• 4821
                        </p>
                        <p className="text-[11px] text-slate-500">
                            £6,480.50 will arrive via Faster Payments within 2 hours.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handlePayout} className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Available Cleared Balance:</span>
                                <span className="font-extrabold text-emerald-600">£6,480.50</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Destination Account:</span>
                                <span className="font-bold text-slate-900">Barclays Business (•••• 4821)</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsPayoutModalOpen(false)}
                                className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700"
                            >
                                Confirm £6,480.50 Payout
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}
