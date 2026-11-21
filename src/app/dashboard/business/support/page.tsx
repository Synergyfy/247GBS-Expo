"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    HelpCircle,
    MessageSquare,
    BookOpen,
    ChevronDown,
    Plus,
    ExternalLink,
} from "lucide-react";

export default function BusinessSupportCenterPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        {
            q: "How do my booth logo and banner update from Central Hub Solution (CHS)?",
            a: "Your booth branding is automatically linked to your verified CHS business profile. Any logo or cover update made in CHS syncs immediately to your 247GBS Expo booth.",
        },
        {
            q: "Why are my event ticket prices capped by Admin Templates?",
            a: "Super Admin configures ticket templates (General, VIP, and MCOM Reward Passes) with price ceilings so single-booth sessions never exceed the overall Season Expo Pass pricing.",
        },
        {
            q: "How do visitors buy my products during a live booth session?",
            a: "Every product in your booth features a direct 'Buy Now on MCOM Mall' link or 1-click Auto-Import sync so checkout and logistics are handled seamlessly.",
        },
    ];

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        Exhibitor Help & Support Desk
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Get assistance with CHS branding sync, MCOM Mall auto-import, or Admin ticket approvals.
                    </p>
                </div>

                <Link
                    href="/dashboard/business/support/tickets"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all self-start sm:self-auto"
                >
                    <Plus className="w-3.5 h-3.5" /> My Support Tickets
                </Link>
            </div>

            {/* Horizontal-Scroll Quick Support Cards */}
            <div>
                <div className="flex lg:grid lg:grid-cols-3 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        {
                            label: "Support Tickets",
                            value: "1 Open Case",
                            sub: "Avg response under 30 mins",
                            icon: MessageSquare,
                            color: "text-orange-600",
                            href: "/dashboard/business/support/tickets",
                        },
                        {
                            label: "CHS Live Concierge",
                            value: "24/7 Live Chat",
                            sub: "Direct technical assistance",
                            icon: HelpCircle,
                            color: "text-emerald-600",
                            href: "/dashboard/business/messages",
                        },
                        {
                            label: "MCOM Merchant Docs",
                            value: "Integration Guide",
                            sub: "Catalog & reward sync rules",
                            icon: BookOpen,
                            color: "text-blue-600",
                            href: "/dashboard/business/products",
                        },
                    ].map((card, i) => (
                        <Link
                            key={i}
                            href={card.href}
                            className="w-[42%] min-w-[155px] sm:w-[210px] lg:w-auto shrink-0 snap-start bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm hover:border-orange-400 transition-all block"
                        >
                            <div className="flex items-center justify-between gap-1.5 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                                    {card.label}
                                </span>
                                <card.icon className={`w-3.5 h-3.5 shrink-0 ${card.color}`} />
                            </div>
                            <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
                                {card.value} <ExternalLink className="w-3 h-3 text-slate-400" />
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">{card.sub}</p>
                        </Link>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-1.5 lg:hidden">
                    <span className="w-4 h-1 rounded-full bg-orange-600" />
                    <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                </div>
            </div>

            {/* Collapsible FAQ Accordion */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Frequently Asked Exhibitor Questions
                    </h2>
                </div>

                {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                        <div key={idx} className="p-3.5 sm:p-4">
                            <button
                                onClick={() => setOpenFaq(isOpen ? null : idx)}
                                className="w-full flex items-center justify-between gap-3 text-left"
                            >
                                <span className="text-xs sm:text-sm font-bold text-slate-900">{faq.q}</span>
                                <ChevronDown
                                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {isOpen && (
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{faq.a}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
