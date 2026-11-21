"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Bell, Video, Lock, CheckCircle2 } from "lucide-react";

export default function EventConfigurationPage() {
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        enforceAccessPassGate: true,
        autoSyncMcomProducts: true,
        allowChsLiveChat: true,
        sendPassReminders: true,
        recordLiveStream: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-5 pb-12">
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
                        Event Lobby & Access Gate Configuration
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Configure Event Day Access Pass gating, MCOM Mall shelf overlays, and CHS chat rules.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    className="px-4 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all self-start sm:self-auto"
                >
                    {saved ? "Saved!" : "Save Rules"}
                </button>
            </div>

            {saved && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Event configuration updated across all active booth sessions.
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                {[
                    {
                        key: "enforceAccessPassGate" as const,
                        title: "Enforce Event Day Access Pass Gate",
                        desc: "Require visitors to hold a valid paid, seasonal, or MCOM Reward pass before entering the live event lobby.",
                        icon: Lock,
                    },
                    {
                        key: "autoSyncMcomProducts" as const,
                        title: "Pin MCOM Mall Product Shelf Inside Live Lobby",
                        desc: "Display your synced MCOM Mall products with direct 'Buy Now' checkout links underneath your livestream.",
                        icon: Video,
                    },
                    {
                        key: "allowChsLiveChat" as const,
                        title: "Enable CHS Live Booth Chat & AI Assistant",
                        desc: "Route attendee questions during live sessions directly to your Central Hub Solution (CHS) inbox.",
                        icon: ShieldCheck,
                    },
                    {
                        key: "sendPassReminders" as const,
                        title: "Automated 24h & 1h Event Pass Reminders",
                        desc: "Send QR access pass reminders to registered attendees prior to session start.",
                        icon: Bell,
                    },
                ].map((item) => (
                    <div
                        key={item.key}
                        className="p-3.5 sm:p-4 flex items-center justify-between gap-4"
                    >
                        <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="flex items-center gap-1.5">
                                <item.icon className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                                <p className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</p>
                            </div>
                            <p className="text-[11px] text-slate-500">{item.desc}</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => toggleSetting(item.key)}
                            className={`w-10 h-5.5 rounded-full transition-colors p-0.5 shrink-0 ${
                                settings[item.key] ? "bg-orange-600" : "bg-slate-200"
                            }`}
                        >
                            <div
                                className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
                                    settings[item.key] ? "translate-x-4.5" : "translate-x-0"
                                }`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
