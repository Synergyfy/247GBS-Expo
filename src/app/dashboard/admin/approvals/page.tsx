"use client";

import { useState, useEffect, useCallback } from "react";
import { 
    ClipboardList, 
    Search, 
    CheckCircle2, 
    XCircle, 
    Store, 
    Calendar, 
    AlertCircle,
    ArrowRight,
    UserCheck,
    Banknote,
    FileText,
    Loader2,
    MapPin,
    Ticket,
    RefreshCw
} from "lucide-react";
import Modal from "@/app/component/Modal";
import { api } from "@/lib/api";

interface PendingEvent {
    id: string;
    name: string;
    type: string;
    organizer: string;
    createdAt: string;
}

interface FinanceTicket {
    id: string;
    subject: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    createdAt: string;
    booth: { name: string } | null;
}

export default function ApprovalQueuePage() {
    const [activeTab, setActiveTab] = useState("events");
    const [events, setEvents] = useState<PendingEvent[]>([]);
    const [financeTickets, setFinanceTickets] = useState<FinanceTicket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedEvent, setSelectedEvent] = useState<PendingEvent | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<FinanceTicket | null>(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchPending = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            const data = await api.get("/admin/approvals/pending");
            setEvents(data.events || []);
            setFinanceTickets(data.financeTickets || []);
        } catch (e: any) {
            setError(e.message || "Failed to load approvals");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPending();
    }, [fetchPending]);

    const handleEventAction = async (action: "approve" | "reject") => {
        if (!selectedEvent) return;
        setActionLoading(true);
        try {
            await api.post(`/admin/approvals/event/${selectedEvent.id}/${action}`, {});
            await fetchPending();
            setShowEventModal(false);
            setSelectedEvent(null);
            setIsRejecting(false);
            setRejectionReason("");
        } catch (e: any) {
            alert(e.message || "Action failed");
        } finally {
            setActionLoading(false);
        }
    };

    const handleTicketAction = async (action: "approve" | "reject") => {
        if (!selectedTicket) return;
        setActionLoading(true);
        try {
            await api.post(`/admin/approvals/finance-ticket/${selectedTicket.id}/${action}`, {});
            await fetchPending();
            setShowTicketModal(false);
            setSelectedTicket(null);
            setIsRejecting(false);
            setRejectionReason("");
        } catch (e: any) {
            alert(e.message || "Action failed");
        } finally {
            setActionLoading(false);
        }
    };

    const filteredEvents = events.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredTickets = financeTickets.filter(t =>
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.booth?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPending = events.length + financeTickets.length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Approval Queue</h1>
                    <p className="text-slate-500">Review and moderate event submissions and finance tickets.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchPending} className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all" title="Refresh">
                        <RefreshCw className="w-4 h-4 text-slate-500" />
                    </button>
                    {totalPending > 0 && (
                        <div className="flex gap-4 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl border border-orange-100">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm font-bold uppercase tracking-wider">{totalPending} Items Pending Review</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {[
                    { id: "events", label: "Event Moderation", count: events.length, icon: <Calendar className="w-4 h-4" /> },
                    { id: "finance", label: "Finance Tickets", count: financeTickets.length, icon: <Banknote className="w-4 h-4" /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${
                            activeTab === tab.id ? "text-orange-600" : "text-slate-400 hover:text-slate-900"
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${activeTab === tab.id ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {tab.count}
                        </span>
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* Search */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search queue..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center min-h-[300px] text-center gap-4">
                        <AlertCircle className="w-12 h-12 text-red-400" />
                        <p className="text-red-600 font-medium">{error}</p>
                        <button onClick={fetchPending} className="px-6 py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all">
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {activeTab === "events" ? (
                            filteredEvents.length === 0 ? (
                                <div className="flex flex-col items-center justify-center min-h-[300px] text-center gap-3">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                                    <p className="text-slate-500 font-medium">No pending events to review.</p>
                                </div>
                            ) : (
                                filteredEvents.map((e) => (
                                    <div key={e.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-6 flex flex-col lg:flex-row items-center gap-8 hover:shadow-lg transition-all group">
                                        <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                            <Calendar className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1 space-y-2 text-center lg:text-left">
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{e.name}</h3>
                                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                                                <span className="flex items-center gap-1"><Store className="w-3 h-3" /> {e.organizer}</span>
                                                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {e.type}</span>
                                                <span className="text-orange-600 font-black">Content Verification Required</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 shrink-0">
                                            <button
                                                onClick={() => { setSelectedEvent(e); setShowEventModal(true); }}
                                                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center gap-2"
                                            >
                                                Moderate Content <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )
                        ) : (
                            filteredTickets.length === 0 ? (
                                <div className="flex flex-col items-center justify-center min-h-[300px] text-center gap-3">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                                    <p className="text-slate-500 font-medium">No open finance tickets.</p>
                                </div>
                            ) : (
                                filteredTickets.map((t) => (
                                    <div key={t.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-6 flex flex-col lg:flex-row items-center gap-8 hover:shadow-lg transition-all group">
                                        <div className="w-16 h-16 rounded-3xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                                            <Ticket className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1 space-y-2 text-center lg:text-left">
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{t.subject}</h3>
                                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                                                <span className="flex items-center gap-1"><Store className="w-3 h-3" /> {t.booth?.name || "Unknown Booth"}</span>
                                                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {t.type}</span>
                                                <span className={`px-2 py-0.5 rounded-md ${
                                                    t.priority === 'HIGH' ? 'bg-red-50 text-red-600' :
                                                    t.priority === 'NORMAL' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                                                }`}>Priority: {t.priority}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 shrink-0">
                                            <button
                                                onClick={() => { setSelectedTicket(t); setShowTicketModal(true); }}
                                                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center gap-2"
                                            >
                                                Review Ticket <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                )}
            </div>

            {/* EVENT MODAL */}
            <Modal isOpen={showEventModal} onClose={() => { if (!actionLoading) { setShowEventModal(false); setSelectedEvent(null); setIsRejecting(false); setRejectionReason(""); } }} title="Event Moderation">
                {selectedEvent && (
                    <div className="space-y-6">
                        {!isRejecting ? (
                            <>
                                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{selectedEvent.name}</h3>
                                        <p className="text-xs text-slate-500 font-medium">{selectedEvent.organizer} · {selectedEvent.type}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submitted</p>
                                        <p className="text-sm font-bold text-slate-700">{new Date(selectedEvent.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</p>
                                        <p className="text-sm font-bold text-slate-700">{selectedEvent.type}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-6 border-t border-slate-100">
                                    <button disabled={actionLoading} onClick={() => setIsRejecting(true)} className="flex-1 py-4 border-2 border-slate-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                                        <XCircle className="w-5 h-5" /> Reject
                                    </button>
                                    <button disabled={actionLoading} onClick={() => handleEventAction("approve")} className="flex-[2] py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg">
                                        {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Approve Event</>}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-red-600" /> Rejection Reason</h4>
                                <p className="text-xs text-slate-500 mb-6">This reason will be recorded against the event.</p>
                                <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium h-32 resize-none" placeholder="e.g. Inappropriate content, capacity mismatch..." value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
                                <div className="flex gap-4 mt-8">
                                    <button disabled={actionLoading} onClick={() => setIsRejecting(false)} className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">Back</button>
                                    <button disabled={actionLoading || !rejectionReason.trim()} onClick={() => handleEventAction("reject")} className="flex-[2] py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                                        {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Rejection"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal>

            {/* FINANCE TICKET MODAL */}
            <Modal isOpen={showTicketModal} onClose={() => { if (!actionLoading) { setShowTicketModal(false); setSelectedTicket(null); setIsRejecting(false); setRejectionReason(""); } }} title="Finance Ticket Review">
                {selectedTicket && (
                    <div className="space-y-6">
                        {!isRejecting ? (
                            <>
                                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                    <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                                        <Ticket className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{selectedTicket.subject}</h3>
                                        <p className="text-xs text-slate-500 font-medium">{selectedTicket.booth?.name || "No Booth"} · {selectedTicket.type}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                                            selectedTicket.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                        }`}>{selectedTicket.priority}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</p>
                                    <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">{selectedTicket.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submitted</p>
                                        <p className="text-sm font-bold text-slate-700">{new Date(selectedTicket.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                                        <p className="text-sm font-bold text-slate-700">{selectedTicket.status}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-6 border-t border-slate-100">
                                    <button disabled={actionLoading} onClick={() => setIsRejecting(true)} className="flex-1 py-4 border-2 border-slate-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                                        <XCircle className="w-5 h-5" /> Close Ticket
                                    </button>
                                    <button disabled={actionLoading} onClick={() => handleTicketAction("approve")} className="flex-[2] py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg">
                                        {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Resolve Ticket</>}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-red-600" /> Close Ticket</h4>
                                <p className="text-xs text-slate-500 mb-6">Confirm why this ticket is being closed without resolution.</p>
                                <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium h-32 resize-none" placeholder="e.g. Duplicate request, insufficient documentation..." value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
                                <div className="flex gap-4 mt-8">
                                    <button disabled={actionLoading} onClick={() => setIsRejecting(false)} className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">Back</button>
                                    <button disabled={actionLoading || !rejectionReason.trim()} onClick={() => handleTicketAction("reject")} className="flex-[2] py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                                        {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Close"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}
