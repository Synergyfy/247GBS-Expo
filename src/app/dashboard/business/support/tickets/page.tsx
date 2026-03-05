"use client";

import { useState, useEffect } from "react";
import {
    MessageSquare,
    Plus,
    Search,
    Filter,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    ArrowLeft,
    User,
    Gavel,
    Loader2
} from "lucide-react";
import Link from "next/link";
import Modal from "@/app/component/Modal";
import { api } from "@/lib/api";

export default function SupportTicketsPage() {
    const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
    const [tickets, setTickets] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [form, setForm] = useState({ subject: "", description: "", type: "GENERAL", priority: "NORMAL" });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/dashboard/business/revenue/tickets');
            setTickets(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch tickets", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.subject || !form.description) return;
        setIsSaving(true);
        setError(null);
        try {
            await api.post('/dashboard/business/revenue/tickets', form);
            setIsNewTicketModalOpen(false);
            setForm({ subject: "", description: "", type: "GENERAL", priority: "NORMAL" });
            fetchTickets();
        } catch (err: any) {
            setError(err.message || "Failed to submit ticket");
        } finally {
            setIsSaving(false);
        }
    };

    const getPriorityColor = (p: string) => {
        switch (p?.toUpperCase()) {
            case 'HIGH': return 'text-red-600';
            case 'NORMAL': return 'text-orange-600';
            case 'LOW': return 'text-blue-600';
            default: return 'text-slate-400';
        }
    };

    const getStatusStyles = (s: string) => {
        switch (s?.toUpperCase()) {
            case 'RESOLVED': return 'bg-emerald-100 text-emerald-700';
            case 'CLOSED': return 'bg-slate-100 text-slate-500';
            case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700';
            default: return 'bg-orange-100 text-orange-700';
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/dashboard/business/support" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Support
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Resolution Center</h1>
                        <p className="text-slate-500 text-lg">Track and manage your support requests and customer disputes.</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsNewTicketModalOpen(true)}
                    className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                >
                    <Plus className="w-4 h-4" /> Open New Ticket
                </button>
            </div>

            {/* Arbitration Banner (13.2) */}
            {tickets.some(t => t.status === 'OPEN') && (
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] flex items-center gap-6 shadow-sm">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                        <Gavel className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-blue-900 uppercase tracking-tight">Active Cases</h4>
                        <p className="text-sm text-blue-700 font-medium">You have <span className="font-bold">{tickets.filter(t => t.status === 'OPEN').length} active case(s)</span>. Our team will review and respond within 48 hours.</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all">Review Recent</button>
                </div>
            )}

            {/* Tickets Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
                    <h2 className="text-xl font-bold text-slate-900">Support History</h2>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search tickets..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                        </div>
                        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-orange-600 transition-colors"><Filter className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID & Subject</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Updated</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-orange-600 mx-auto" />
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Loading Ticket History...</p>
                                    </td>
                                </tr>
                            ) : tickets.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-4" />
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No support tickets found</p>
                                    </td>
                                </tr>
                            ) : (
                                tickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-mono font-bold text-slate-400 mb-1">{ticket.id.slice(0, 8)}</p>
                                            <p className="font-bold text-slate-900 text-sm">{ticket.subject}</p>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-medium text-slate-600">{ticket.type}</td>
                                        <td className="px-8 py-6">
                                            <span className={`text-[10px] font-black uppercase ${getPriorityColor(ticket.priority)}`}>
                                                {ticket.priority}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyles(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-slate-400">
                                            {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-slate-300 group-hover:text-orange-600 transition-colors">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* New Ticket Modal */}
            <Modal isOpen={isNewTicketModalOpen} onClose={() => setIsNewTicketModalOpen(false)} title="Open Support Ticket">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-xs font-bold">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Reason for Contact</label>
                        <select
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                        >
                            <option value="GENERAL">General Support</option>
                            <option value="TECH">Technical Issue</option>
                            <option value="DISPUTE">Payment / Settlement Dispute</option>
                            <option value="REFUND">Customer Refund Dispute</option>
                            <option value="APPEAL">Account Suspension Appeal</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Priority</label>
                        <select
                            value={form.priority}
                            onChange={(e) => setForm({ ...form, priority: e.target.value })}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                        >
                            <option value="LOW">Low</option>
                            <option value="NORMAL">Normal</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Subject</label>
                        <input
                            type="text"
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            placeholder="Summary of the issue"
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Detailed Description</label>
                        <textarea
                            rows={4}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Please provide all relevant details..."
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Ticket"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
