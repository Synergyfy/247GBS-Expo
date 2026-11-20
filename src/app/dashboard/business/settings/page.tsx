"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, RefreshCw, CheckCircle2, Lock } from "lucide-react";

const SETTINGS_TABS = [
    { label: "CHS Business Profile", href: "/dashboard/business/settings" },
    { label: "Team & Permissions", href: "/dashboard/business/settings/team" },
    { label: "MCOM & CHS Integrations", href: "/dashboard/business/settings/integrations" },
    { label: "Security & Audit Logs", href: "/dashboard/business/settings/audits" },
];

export default function BusinessSettingsPage() {
    const pathname = usePathname();
    const [saved, setSaved] = useState(false);
    const [syncingChs, setSyncingChs] = useState(false);

    const [profile, setProfile] = useState({
        companyName: "TechFlow Innovations Ltd",
        chsId: "CHS-UK-884920",
        mcomStoreSlug: "mcom-mall.com/store/techflow-uk",
        primaryContact: "david.wright@techflow.co.uk",
        vatNumber: "GB 948 2819 04",
        settlementBank: "Barclays Business •••• 4821",
    });

    const handleSyncChs = () => {
        setSyncingChs(true);
        setTimeout(() => {
            setSyncingChs(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 700);
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                            Business Settings & CHS Identity
                        </h1>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                            • KYB Verified
                        </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Manage your Central Hub Solution (CHS) organization profile, team access, and MCOM integrations.
                    </p>
                </div>

                <button
                    onClick={handleSyncChs}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all self-start sm:self-auto"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncingChs ? "animate-spin" : ""}`} />
                    {syncingChs ? "Syncing CHS..." : "Sync from CHS"}
                </button>
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

            {saved && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> CHS profile, logo, banner, and KYB details synced.
                </div>
            )}

            {/* Profile Form (Non-Editable Synced Fields) */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                                Synced Central Hub Solution (CHS) Identity
                            </h2>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                                <Lock className="w-2.5 h-2.5" /> Read-Only
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                            Company name, logo, banner, and KYB credentials are automatically inherited from CHS.
                        </p>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Registered Business Name
                            </label>
                            <span className="text-[9px] font-semibold text-slate-400">CHS Synced</span>
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={profile.companyName}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200/80 bg-slate-50 text-xs font-bold text-slate-900 cursor-not-allowed select-text outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                CHS Organization ID
                            </label>
                            <span className="text-[9px] font-semibold text-slate-400">Verified</span>
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={profile.chsId}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200/80 bg-slate-50 text-xs font-mono text-slate-700 cursor-not-allowed select-text outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Connected MCOM Mall Storefront
                            </label>
                            <span className="text-[9px] font-semibold text-slate-400">Linked</span>
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={profile.mcomStoreSlug}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200/80 bg-slate-50 text-xs text-slate-700 cursor-not-allowed select-text outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Primary Exhibitor Contact
                            </label>
                            <span className="text-[9px] font-semibold text-slate-400">KYB Primary</span>
                        </div>
                        <input
                            type="email"
                            readOnly
                            value={profile.primaryContact}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200/80 bg-slate-50 text-xs text-slate-700 cursor-not-allowed select-text outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                UK VAT / Tax Registration
                            </label>
                            <span className="text-[9px] font-semibold text-slate-400">Verified</span>
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={profile.vatNumber}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200/80 bg-slate-50 text-xs text-slate-700 cursor-not-allowed select-text outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Settlement Bank Account
                            </label>
                            <span className="text-[9px] font-semibold text-slate-400">Verified</span>
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={profile.settlementBank}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200/80 bg-slate-50 text-xs font-mono text-slate-700 cursor-not-allowed select-text outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
