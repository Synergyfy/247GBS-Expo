"use client";

import { useState } from "react";
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
    Gavel
} from "lucide-react";
import Link from "next/link";
import Modal from "@/app/component/Modal";

export default function SupportTicketsPage() {
    const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
    const [tickets, setTickets] = useState([
        { id: "SPT-1024", subject: "Refund for Order #GBX-221", type: "Refund Dispute", status: "In Arbitration", priority: "High", time: "2 hours ago" },
        { id: "SPT-1023", subject: "API Integration Error", type: "Technical Support", status: "Resolved", priority: "Medium", time: "1 day ago" },
        { id: "SPT-1022", subject: "Booth Banner Upload Failed", type: "General Inquiry", status: "Open", priority: "Low", time: "2 days ago" },
    ]);

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
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] flex items-center gap-6 shadow-sm">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                    <Gavel className="w-7 h-7" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-blue-900 uppercase tracking-tight">Arbitration Notice</h4>
                    <p className="text-sm text-blue-700 font-medium">You have <span className="font-bold">1 active case</span> in the Arbitration stage. Final decisions will be made by the platform admin within 48 hours.</p>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all">Review Case</button>
            </div>

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
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <p className="text-xs font-mono font-bold text-slate-400 mb-1">{ticket.id}</p>
                                        <p className="font-bold text-slate-900 text-sm">{ticket.subject}</p>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-medium text-slate-600">{ticket.type}</td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[10px] font-black uppercase ${
                                            ticket.priority === 'High' ? 'text-red-600' : 
                                            ticket.priority === 'Medium' ? 'text-orange-600' : 'text-blue-600'
                                        }`}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 
                                            ticket.status === 'In Arbitration' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-slate-400">{ticket.time}</td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-slate-300 group-hover:text-orange-600 transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* New Ticket Modal */}
            <Modal isOpen={isNewTicketModalOpen} onClose={() => setIsNewTicketModalOpen(false)} title="Open Support Ticket">
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Reason for Contact</label>
                        <select className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-bold">
                            <option>Technical Issue</option>
                            <option>Payment / Settlement Dispute</option>
                            <option>Customer Refund Dispute</option>
                            <option>Account Suspension Appeal</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Subject</label>
                        <input type="text" placeholder="Summary of the issue" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Detailed Description</label>
                        <textarea rows={4} placeholder="Please provide all relevant details..." className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
                    </div>

                    <button type="button" onClick={() => setIsNewTicketModalOpen(false)} className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg uppercase tracking-widest text-xs">
                        Submit Ticket
                    </button>
                </form>
            </Modal>
        </div>
    );
}
