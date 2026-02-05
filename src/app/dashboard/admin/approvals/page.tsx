"use client";

import { useState } from "react";
import { 
    ClipboardList, 
    Search, 
    CheckCircle2, 
    XCircle, 
    MoreVertical, 
    Store, 
    Calendar, 
    AlertCircle,
    ArrowRight,
    UserCheck,
    Banknote,
    FileText,
    Shield,
    Info,
    Check,
    X,
    Loader2,
    MapPin,
    Ticket
} from "lucide-react";
import Modal from "@/app/component/Modal";

interface Business {
    name: string;
    manager: string;
    type: string;
    risk: string;
    submitted: string;
    email: string;
    documents: string[];
    bankStatus: string;
}

interface Event {
    id: string;
    title: string;
    host: string;
    tickets: string;
    price: string;
    submitted: string;
    description: string;
    capacity: number;
    category: string;
    location: string;
}

export default function ApprovalQueuePage() {
    const [activeTab, setActiveTab] = useState("businesses");
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [loading, setLoading] = useState(false);

    const businesses: Business[] = [
        { 
            name: "Global Tech Corp", 
            manager: "Jane Smith", 
            type: "Exhibitor", 
            risk: "Low", 
            submitted: "2h ago", 
            email: "jane@globaltech.com",
            documents: ["Certificate of Incorporation.pdf", "Tax_Compliance.pdf"],
            bankStatus: "Verified"
        },
        { 
            name: "Urban Threads Co.", 
            manager: "Mark Riley", 
            type: "Retailer", 
            risk: "Medium", 
            submitted: "5h ago", 
            email: "mark@urbanthreads.com",
            documents: ["Business_ID.pdf", "Vat_Certificate.pdf"],
            bankStatus: "Pending"
        },
        { 
            name: "Skyline Media", 
            manager: "Alex Chen", 
            type: "Partner", 
            risk: "High", 
            submitted: "1d ago", 
            email: "alex@skylinemedia.io",
            documents: ["Partnership_Agreement.pdf"],
            bankStatus: "Failed Check"
        },
    ];

    const events: Event[] = [
        { 
            id: "E-101",
            title: "Annual Tech Symposium", 
            host: "Global Tech Corp", 
            tickets: "VIP, GA", 
            price: "£0 - £500", 
            submitted: "1h ago",
            description: "A comprehensive showcase of upcoming technologies and networking opportunities for industry professionals.",
            capacity: 5000,
            category: "Technology",
            location: "Virtual Main Hall"
        },
        { 
            id: "E-102",
            title: "Summer Fashion Week", 
            host: "Urban Threads", 
            tickets: "Runway, GA", 
            price: "£45 - £120", 
            submitted: "3h ago",
            description: "Experience the latest trends in digital and physical fashion. Featuring top designers and live runway shows.",
            capacity: 2000,
            category: "Fashion",
            location: "Hybrid Venue B"
        },
    ];

    const handleApprove = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowReviewModal(false);
            setShowEventModal(false);
            setSelectedBusiness(null);
            setSelectedEvent(null);
        }, 1500);
    };

    const handleRejectSubmit = () => {
        if (!rejectionReason.trim()) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowReviewModal(false);
            setShowEventModal(false);
            setSelectedBusiness(null);
            setSelectedEvent(null);
            setIsRejecting(false);
            setRejectionReason("");
        }, 1500);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Approval Queue</h1>
                    <p className="text-slate-500">Review and moderate business registrations and new event submissions.</p>
                </div>
                <div className="flex gap-4 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl border border-orange-100">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">12 Items Pending Review</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {[
                    { id: "businesses", label: "Business KYB", count: 5, icon: <Store className="w-4 h-4" /> },
                    { id: "events", label: "Event Moderation", count: 7, icon: <Calendar className="w-4 h-4" /> },
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
                
                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" placeholder="Search queue..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500" />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm font-bold">
                            <option>High Risk First</option>
                            <option>Oldest First</option>
                            <option>Newest First</option>
                        </select>
                    </div>
                </div>

                {/* LIST */}
                <div className="grid gap-6">
                    {activeTab === "businesses" ? (
                        businesses.map((b, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 p-6 flex flex-col lg:flex-row items-center gap-8 hover:shadow-lg transition-all group">
                                <div className="w-16 h-16 rounded-3xl bg-orange-50 flex items-center justify-center text-orange-600 font-black text-2xl shrink-0">
                                    {b.name[0]}
                                </div>
                                <div className="flex-1 space-y-2 text-center lg:text-left">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{b.name}</h3>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                                        <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> {b.manager}</span>
                                        <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> KYB Pending</span>
                                        <span className={`px-2 py-0.5 rounded-md ${
                                            b.risk === 'Low' ? 'bg-emerald-50 text-emerald-600' : 
                                            b.risk === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                        }`}>Risk: {b.risk}</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 shrink-0">
                                    <button 
                                        onClick={() => {
                                            setSelectedBusiness(b);
                                            setShowReviewModal(true);
                                        }}
                                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center gap-2"
                                    >
                                        Review Dossier <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        events.map((e, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 p-6 flex flex-col lg:flex-row items-center gap-8 hover:shadow-lg transition-all group">
                                <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                    <Calendar className="w-8 h-8" />
                                </div>
                                <div className="flex-1 space-y-2 text-center lg:text-left">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{e.title}</h3>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                                        <span className="flex items-center gap-1"><Store className="w-3 h-3" /> {e.host}</span>
                                        <span className="flex items-center gap-1"><Banknote className="w-3 h-3" /> {e.price}</span>
                                        <span className="text-orange-600 font-black">Content Verification Required</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 shrink-0">
                                    <button 
                                        onClick={() => {
                                            setSelectedEvent(e);
                                            setShowEventModal(true);
                                        }}
                                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center gap-2"
                                    >
                                        Moderate Content <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* REVIEW MODAL */}
            <Modal
                isOpen={showReviewModal}
                onClose={() => {
                    if (!loading) {
                        setShowReviewModal(false);
                        setSelectedBusiness(null);
                        setIsRejecting(false);
                        setRejectionReason("");
                    }
                }}
                title="Business Verification Dossier"
            >
                {selectedBusiness && (
                    <div className="space-y-6">
                        {!isRejecting ? (
                            <>
                                {/* Business Header */}
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                                        {selectedBusiness.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{selectedBusiness.name}</h3>
                                        <p className="text-xs text-slate-500 font-medium">{selectedBusiness.email}</p>
                                    </div>
                                    <div className="ml-auto">
                                         <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                                            selectedBusiness.risk === 'Low' ? 'bg-emerald-100 text-emerald-700' : 
                                            selectedBusiness.risk === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            Risk: {selectedBusiness.risk}
                                        </span>
                                    </div>
                                </div>

                                {/* Verification Details */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Legal Manager</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><UserCheck className="w-4 h-4 text-orange-600" /> {selectedBusiness.manager}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bank Status</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><Banknote className="w-4 h-4 text-orange-600" /> {selectedBusiness.bankStatus}</p>
                                    </div>
                                </div>

                                {/* Documents */}
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Submitted Documents</p>
                                    <div className="space-y-2">
                                        {selectedBusiness.documents.map((doc, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-orange-200 transition-colors group cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-orange-600" />
                                                    <span className="text-xs font-medium text-slate-600">{doc}</span>
                                                </div>
                                                <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-orange-600" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 pt-6 border-t border-slate-100">
                                    <button 
                                        disabled={loading}
                                        onClick={() => setIsRejecting(true)}
                                        className="flex-1 py-4 border-2 border-slate-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" /> Reject
                                    </button>
                                    <button 
                                        disabled={loading}
                                        onClick={handleApprove}
                                        className="flex-[2] py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Approve Business</>}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-600" /> Rejection Reason
                                </h4>
                                <p className="text-xs text-slate-500 mb-6">Explain why this business is being rejected. This will be sent to the business manager.</p>
                                
                                <textarea 
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium h-32 resize-none"
                                    placeholder="e.g. Identity document is blurred, Please re-upload your VAT certificate..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                />

                                <div className="flex gap-4 mt-8">
                                    <button 
                                        disabled={loading}
                                        onClick={() => setIsRejecting(false)}
                                        className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        disabled={loading || !rejectionReason.trim()}
                                        onClick={handleRejectSubmit}
                                        className="flex-[2] py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Rejection"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
            {/* EVENT MODAL */}
            <Modal
                isOpen={showEventModal}
                onClose={() => {
                    if (!loading) {
                        setShowEventModal(false);
                        setSelectedEvent(null);
                        setIsRejecting(false);
                        setRejectionReason("");
                    }
                }}
                title="Event Moderation Dossier"
            >
                {selectedEvent && (
                    <div className="space-y-6">
                        {!isRejecting ? (
                            <>
                                {/* Event Header */}
                                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{selectedEvent.title}</h3>
                                        <p className="text-xs text-slate-500 font-medium">{selectedEvent.host}</p>
                                    </div>
                                    <div className="ml-auto">
                                         <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider">
                                            {selectedEvent.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600" /> {selectedEvent.location}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacity</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><UserCheck className="w-4 h-4 text-blue-600" /> {selectedEvent.capacity.toLocaleString()} Pax</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><Banknote className="w-4 h-4 text-blue-600" /> {selectedEvent.price}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiers</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><Ticket className="w-4 h-4 text-blue-600" /> {selectedEvent.tickets}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description</p>
                                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        {selectedEvent.description}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 pt-6 border-t border-slate-100">
                                    <button 
                                        disabled={loading}
                                        onClick={() => setIsRejecting(true)}
                                        className="flex-1 py-4 border-2 border-slate-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" /> Reject
                                    </button>
                                    <button 
                                        disabled={loading}
                                        onClick={handleApprove}
                                        className="flex-[2] py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Approve Event</>}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-600" /> Rejection Reason
                                </h4>
                                <p className="text-xs text-slate-500 mb-6">Explain why this event content is being rejected. This will be sent to the host.</p>
                                
                                <textarea 
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium h-32 resize-none"
                                    placeholder="e.g. Inappropriate content, capacity mismatch, invalid documentation..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                />

                                <div className="flex gap-4 mt-8">
                                    <button 
                                        disabled={loading}
                                        onClick={() => setIsRejecting(false)}
                                        className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        disabled={loading || !rejectionReason.trim()}
                                        onClick={handleRejectSubmit}
                                        className="flex-[2] py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Rejection"}
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
