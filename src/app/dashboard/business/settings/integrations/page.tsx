"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RefreshCw, CheckCircle2, Clock } from "lucide-react";

const SETTINGS_TABS = [
    { label: "CHS Business Profile", href: "/dashboard/business/settings" },
    { label: "Team & Permissions", href: "/dashboard/business/settings/team" },
    { label: "MCOM & CHS Integrations", href: "/dashboard/business/settings/integrations" },
    { label: "Security & Audit Logs", href: "/dashboard/business/settings/audits" },
];

export default function BusinessIntegrationsPage() {
    const pathname = usePathname();
    const [syncingId, setSyncingId] = useState<string | null>(null);

    const [integrations, setIntegrations] = useState([
        {
            id: "int-chs",
            name: "Central Hub Solution (CHS) Identity & Live Chat",
            category: "Core Identity & Branding",
            description: "Automatically syncs your business logo, booth banner, KYB badge, and live visitor chat.",
            lastSync: "2 mins ago",
            status: "Connected" as const,
        },
        {
            id: "int-mcom-mall",
            name: "MCOM Mall Product & Checkout Bridge",
            category: "E-Commerce & Fulfilment",
            description: "Powers 1-click product auto-import and direct 'Buy Now' checkout links on your booth.",
            lastSync: "In Roadmap",
            status: "Coming Soon" as const,
        },
        {
            id: "int-mcom-rewards",
            name: "MCOM Rewards Loyalty & Voucher Engine",
            category: "Loyalty & Ticket Perks",
            description: "Syncs visitor reward codes, promotional vouchers, and bulk complimentary pass allocations.",
            lastSync: "In Roadmap",
            status: "Coming Soon" as const,
        },
    ]);

    const handleTriggerSync = (id: string) => {
        const target = integrations.find((item) => item.id === id);
        if (!target || target.status !== "Connected") return;
        setSyncingId(id);
        setTimeout(() => {
            setIntegrations(
                integrations.map((item) =>
                    item.id === id ? { ...item, lastSync: "Just now" } : item
                )
            );
            setSyncingId(null);
        }, 700);
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="pb-3 border-b border-slate-200/80">
                <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                    MCOM & CHS Ecosystem Integrations
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    Manage your live bridges to Central Hub Solution (CHS), MCOM Mall, and MCOM Rewards.
                </p>
            </div>

            {/* Settings Sub-Navigation Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                {SETTINGS_TABS.map((tab) => {
                    const active = pathname === tab.href;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all ${
                                active
                                    ? "bg-slate-900 text-white"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-orange-500"
                            }`}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>

            {/* Clean 3-Line Integrations List */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                {integrations.map((item) => (
                    <div
                        key={item.id}
                        className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                        <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center justify-between sm:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5 truncate">
                                    <span className="text-orange-600">{item.category}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-400">
                                        {item.status === "Connected" ? `Synced ${item.lastSync}` : item.lastSync}
                                    </span>
                                </div>
                                {item.status === "Connected" ? (
                                    <span className="text-emerald-600 shrink-0 inline-flex items-center gap-1 font-bold">
                                        <CheckCircle2 className="w-3 h-3" /> Connected
                                    </span>
                                ) : (
                                    <span className="text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full shrink-0 inline-flex items-center gap-1 font-bold">
                                        <Clock className="w-3 h-3" /> Coming Soon
                                    </span>
                                )}
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</p>
                            <p className="text-[11px] text-slate-500">{item.description}</p>
                        </div>

                        {item.status === "Connected" ? (
                            <button
                                onClick={() => handleTriggerSync(item.id)}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors shrink-0 cursor-pointer"
                            >
                                <RefreshCw
                                    className={`w-3.5 h-3.5 ${syncingId === item.id ? "animate-spin" : ""}`}
                                />
                                {syncingId === item.id ? "Syncing..." : "Sync Now"}
                            </button>
                        ) : (
                            <button
                                disabled
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-400 rounded-lg text-[11px] font-bold uppercase tracking-wider cursor-not-allowed border border-slate-200/80 shrink-0"
                            >
                                <Clock className="w-3.5 h-3.5" /> Coming Soon
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
