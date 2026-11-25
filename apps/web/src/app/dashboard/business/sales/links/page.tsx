"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    Link2,
    Copy,
    CheckCircle2,
    Ticket,
    Users,
    ArrowLeft,
    Plus,
    Send,
    ExternalLink,
} from "lucide-react";
import Modal from "@/app/component/Modal";
import {
    DEFAULT_SALES_LINKS,
    SalesInviteLink,
    getStoredSalesLinks,
    createSalesInviteLink,
    SALES_LINKS_EVENT,
} from "@/data/salesLinks";

export default function SalesAndTicketAssignmentLinksPage() {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState("VIP Executive Pass (Gift)");
    const [ticketQty, setTicketQty] = useState("5");
    const [links, setLinks] = useState<SalesInviteLink[]>(DEFAULT_SALES_LINKS);
    const [origin, setOrigin] = useState("");

    useEffect(() => {
        setOrigin(window.location.origin);
        setLinks(getStoredSalesLinks());
        const sync = () => setLinks(getStoredSalesLinks());
        window.addEventListener(SALES_LINKS_EVENT, sync);
        window.addEventListener("storage", sync);
        return () => {
            window.removeEventListener(SALES_LINKS_EVENT, sync);
            window.removeEventListener("storage", sync);
        };
    }, []);

    const buildInviteUrl = (code: string) =>
        `${origin || "https://247gbs-expo.com"}/tickets?invite=${encodeURIComponent(code)}`;

    const handleCopy = (id: string, code: string) => {
        const url = buildInviteUrl(code);
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(url).catch(() => {});
        }
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleAssignTickets = (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipientEmail.trim()) return;
        createSalesInviteLink({
            recipientEmail,
            template: selectedTemplate,
            ticketQty,
        });
        setLinks(getStoredSalesLinks());
        setRecipientEmail("");
        setIsAssignModalOpen(false);
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <Link
                        href="/dashboard/business/sales"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-orange-600 uppercase tracking-wider mb-1 transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Sales & Referral Hub
                    </Link>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        Sales Links & Direct Ticket Assignment
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Generate referral links or assign complimentary/discounted event passes directly to clients.
                    </p>
                </div>

                <button
                    onClick={() => setIsAssignModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all self-start sm:self-auto"
                >
                    <Plus className="w-3.5 h-3.5" /> Assign Passes / Create Link
                </button>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-3 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Active Share Links", value: String(links.length), sub: "Tracking referrals & gifts", icon: Link2, color: "text-orange-600" },
                        { label: "Passes Claimed", value: "242", sub: "69.1% claim conversion", icon: Ticket, color: "text-emerald-600" },
                        { label: "VIP Invites Sent", value: "85", sub: "Direct email assignments", icon: Users, color: "text-blue-600" },
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
                </div>
            </div>

            {/* Clean 3-Line Links List */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Active Referral & Ticket Assignment Links
                    </h2>
                    <span className="text-[11px] font-bold text-slate-400">{links.length} links</span>
                </div>

                {links.map((lnk) => (
                    <div
                        key={lnk.id}
                        className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                        <div className="min-w-0 flex-1 space-y-1">
                            {/* Line 1 */}
                            <div className="flex items-center justify-between sm:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5 truncate">
                                    <span className="text-slate-900 font-extrabold">{lnk.id}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-orange-600">{lnk.template}</span>
                                </div>
                                <span className="text-emerald-600 shrink-0">{lnk.status}</span>
                            </div>

                            {/* Line 2 */}
                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{lnk.title}</p>

                            {/* Line 3 */}
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                                <span className="truncate text-slate-400 font-mono text-[10px]">
                                    /tickets?invite={lnk.code}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="font-semibold text-slate-700">{lnk.allocated}</span>
                                <span className="text-slate-300">•</span>
                                <span className="font-extrabold text-emerald-600">{lnk.revenue}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                            <Link
                                href={`/tickets?invite=${encodeURIComponent(lnk.code)}`}
                                target="_blank"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white text-slate-700 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5" /> Open
                            </Link>
                            <button
                                onClick={() => handleCopy(lnk.id, lnk.code)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors cursor-pointer"
                            >
                                {copiedId === lnk.id ? (
                                    <>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" /> Copy Link
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Assign Passes Modal */}
            <Modal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                title="Assign Tickets / Generate Link"
            >
                <form onSubmit={handleAssignTickets} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Client / Partner Email or Group Name
                        </label>
                        <input
                            type="text"
                            required
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            placeholder="e.g. vip-buyers@enterprise.co.uk"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Admin Pass Template
                            </label>
                            <select
                                value={selectedTemplate}
                                onChange={(e) => setSelectedTemplate(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-orange-500"
                            >
                                <option>VIP Executive Pass (Gift)</option>
                                <option>Standard Season Day Pass (20% Off)</option>
                                <option>MCOM Reward Loyalty Pass</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Pass Quota
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="500"
                                value={ticketQty}
                                onChange={(e) => setTicketQty(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsAssignModalOpen(false)}
                            className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700"
                        >
                            <Send className="w-3.5 h-3.5" /> Create & Assign
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
