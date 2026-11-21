"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SETTINGS_TABS = [
    { label: "CHS Business Profile", href: "/dashboard/business/settings" },
    { label: "Team & Permissions", href: "/dashboard/business/settings/team" },
    { label: "MCOM & CHS Integrations", href: "/dashboard/business/settings/integrations" },
    { label: "Security & Audit Logs", href: "/dashboard/business/settings/audits" },
];

export default function BusinessAuditLogsPage() {
    const pathname = usePathname();

    const logs = [
        {
            id: "AUD-902",
            actor: "David Wright (Owner)",
            action: "Imported 6 Products via MCOM Mall Auto-Import Bridge",
            ip: "82.132.214.19 • London, UK",
            time: "18 mins ago",
            status: "Verified",
        },
        {
            id: "AUD-901",
            actor: "CHS Identity Sync",
            action: "Updated Booth Logo & Cover Banner from Central Hub Solution",
            ip: "System Webhook",
            time: "2 hours ago",
            status: "Verified",
        },
        {
            id: "AUD-899",
            actor: "Amara Okafor (Booth Specialist)",
            action: "Adjusted VIP Executive Pass Quota (50 Passes — Within £250 Cap)",
            ip: "82.132.214.19 • London, UK",
            time: "Yesterday",
            status: "Verified",
        },
        {
            id: "AUD-894",
            actor: "David Wright (Owner)",
            action: "Requested £6,480.50 Settlement Payout to Barclays •••• 4821",
            ip: "82.132.214.19 • London, UK",
            time: "3 days ago",
            status: "Completed",
        },
    ];

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="pb-3 border-b border-slate-200/80">
                <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                    Security & Exhibitor Audit Trail
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    Immutable log of CHS sync events, MCOM catalog imports, ticket cap updates, and payouts.
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

            {/* Clean 3-Line Audit Log */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                {logs.map((log) => (
                    <div key={log.id} className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors space-y-1">
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 truncate">
                                <span className="text-slate-900 font-extrabold">{log.id}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-orange-600">{log.actor}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-400">{log.time}</span>
                            </div>
                            <span className="text-emerald-600 shrink-0">{log.status}</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{log.action}</p>
                        <p className="text-[11px] text-slate-500">{log.ip}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
