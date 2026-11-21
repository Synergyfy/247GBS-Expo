"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, CheckCircle2 } from "lucide-react";
import Modal from "@/app/component/Modal";

export default function BusinessSupportTicketsPage() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [subject, setSubject] = useState("");
    const [category, setCategory] = useState("MCOM Mall Product Sync");
    const [priority, setPriority] = useState("Normal");

    const [tickets, setTickets] = useState([
        {
            id: "SUP-409",
            subject: "Request Custom VIP Price Cap for Q3 Enterprise Summit",
            category: "Admin Ticket Templates",
            priority: "High Priority",
            status: "In Progress",
            updated: "35 mins ago",
        },
        {
            id: "SUP-388",
            subject: "MCOM Mall Auto-Import Image Resolution Check",
            category: "MCOM Mall Product Sync",
            priority: "Normal",
            status: "Resolved",
            updated: "2 days ago",
        },
        {
            id: "SUP-352",
            subject: "CHS Verified KYB Badge Refresh on Booth Banner",
            category: "CHS Branding Sync",
            priority: "Normal",
            status: "Resolved",
            updated: "1 week ago",
        },
    ]);

    const handleCreateTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim()) return;
        setTickets([
            {
                id: `SUP-${410 + tickets.length}`,
                subject: subject.trim(),
                category,
                priority,
                status: "Open",
                updated: "Just now",
            },
            ...tickets,
        ]);
        setSubject("");
        setIsCreateOpen(false);
    };

    const getStatusColor = (status: string) => {
        if (status === "Resolved") return "text-emerald-600";
        if (status === "In Progress") return "text-orange-600";
        return "text-blue-600";
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <Link
                        href="/dashboard/business/support"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-orange-600 uppercase tracking-wider mb-1 transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Support Center
                    </Link>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        My Support Tickets
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Track technical inquiries and Admin template escalation requests.
                    </p>
                </div>

                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-700 transition-all self-start sm:self-auto"
                >
                    <Plus className="w-3.5 h-3.5" /> New Support Ticket
                </button>
            </div>

            {/* Clean 3-Line Support Tickets List */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                {tickets.map((t) => (
                    <div
                        key={t.id}
                        className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors space-y-1"
                    >
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 truncate">
                                <span className="text-slate-900 font-extrabold">{t.id}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-orange-600">{t.category}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-400">{t.updated}</span>
                            </div>
                            <span className={`shrink-0 ${getStatusColor(t.status)}`}>{t.status}</span>
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-slate-900">{t.subject}</p>

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Priority: <strong className="text-slate-700">{t.priority}</strong></span>
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                                <CheckCircle2 className="w-3 h-3" /> Assigned to Exhibitor Desk
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                title="Open Exhibitor Support Ticket"
            >
                <form onSubmit={handleCreateTicket} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Subject
                        </label>
                        <input
                            type="text"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Describe what you need help with..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Topic
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-orange-500"
                            >
                                <option>MCOM Mall Product Sync</option>
                                <option>CHS Branding Sync</option>
                                <option>Admin Ticket Templates</option>
                                <option>Payouts & Settlement</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                Priority
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-orange-500"
                            >
                                <option>Normal</option>
                                <option>High Priority</option>
                                <option>Urgent (Live Event)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsCreateOpen(false)}
                            className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700"
                        >
                            Submit Ticket
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
