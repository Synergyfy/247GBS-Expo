"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, ShieldCheck, Plus, QrCode } from "lucide-react";
import Modal from "@/app/component/Modal";

const SETTINGS_TABS = [
    { label: "CHS Business Profile", href: "/dashboard/business/settings" },
    { label: "Team & Permissions", href: "/dashboard/business/settings/team" },
    { label: "MCOM & CHS Integrations", href: "/dashboard/business/settings/integrations" },
    { label: "Security & Audit Logs", href: "/dashboard/business/settings/audits" },
];

export default function BusinessTeamSettingsPage() {
    const pathname = usePathname();
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteName, setInviteName] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("Booth Specialist");

    const [members, setMembers] = useState([
        {
            name: "David Wright",
            email: "david.wright@techflow.co.uk",
            role: "Exhibitor Owner",
            permissions: "Full Booth, MCOM Catalog & Payout Access",
            status: "Active",
        },
        {
            name: "Amara Okafor",
            email: "amara@techflow.co.uk",
            role: "Booth Specialist",
            permissions: "CHS Live Chat, Product Showcase & Event Hosting",
            status: "Active",
        },
        {
            name: "lucas.m@techflow.co.uk",
            email: "lucas.m@techflow.co.uk",
            role: "Pass Verifier",
            permissions: "QR Ticket Verification & Attendee Check-In",
            status: "Invited",
        },
    ]);

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail.trim()) return;
        setMembers([
            ...members,
            {
                name: inviteName.trim() || inviteEmail.trim(),
                email: inviteEmail.trim(),
                role: inviteRole,
                permissions: "Assigned Exhibitor Role",
                status: "Invited",
            },
        ]);
        setInviteName("");
        setInviteEmail("");
        setIsInviteOpen(false);
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        Team & Booth Staff Permissions
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Manage booth specialists, CHS live chat reps, and event pass verifiers.
                    </p>
                </div>

                <button
                    onClick={() => setIsInviteOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all self-start sm:self-auto"
                >
                    <Plus className="w-3.5 h-3.5" /> Invite Staff Member
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

            {/* Horizontal-Scroll Role Cards */}
            <div>
                <div className="flex lg:grid lg:grid-cols-3 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Exhibitor Owners", value: "1 Seat", sub: "Full financial & CHS control", icon: ShieldCheck, color: "text-orange-600" },
                        { label: "Booth Specialists", value: "1 Seat", sub: "Live chat & MCOM catalog", icon: Users, color: "text-blue-600" },
                        { label: "Pass Verifiers", value: "1 Seat", sub: "Ticket QR scanning only", icon: QrCode, color: "text-emerald-600" },
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

            {/* Clean 3-Line Team Roster */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                {members.map((m, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors space-y-1">
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <span className="text-orange-600">{m.role}</span>
                            <span className={m.status === "Active" ? "text-emerald-600" : "text-amber-600"}>
                                {m.status}
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{m.name}</p>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                            <span>{m.email}</span>
                            <span className="text-slate-600 font-medium">{m.permissions}</span>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isInviteOpen}
                onClose={() => setIsInviteOpen(false)}
                title="Invite Booth Staff Member"
            >
                <form onSubmit={handleInvite} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={inviteName}
                            onChange={(e) => setInviteName(e.target.value)}
                            placeholder="e.g. Chloe Bennett"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Work Email
                        </label>
                        <input
                            type="email"
                            required
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            placeholder="chloe@techflow.co.uk"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Assigned Role
                        </label>
                        <select
                            value={inviteRole}
                            onChange={(e) => setInviteRole(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-orange-500"
                        >
                            <option>Booth Specialist</option>
                            <option>Pass Verifier</option>
                            <option>Exhibitor Owner</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsInviteOpen(false)}
                            className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700"
                        >
                            Send Invite
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
