"use client";

import { useState } from "react";
import { 
    MessageSquare, 
    Search, 
    Filter, 
    AlertCircle, 
    Clock, 
    CheckCircle2, 
    ArrowRight,
    User,
    Store,
    MoreVertical,
    FileText,
    Gavel
} from "lucide-react";

export default function DisputeCenterPage() {
    const [activeTab, setActiveTab] = useState("open");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dispute & Arbitration</h1>
                    <p className="text-slate-500">Resolve conflicts between customers and businesses regarding tickets or fulfilment.</p>
                </div>
                <div className="flex gap-4 bg-red-50 text-red-700 px-4 py-2 rounded-xl border border-red-100">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">3 High Priority Disputes</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {[
                    { id: "open", label: "Active Disputes", count: 14, icon: <AlertCircle className="w-4 h-4" /> },
                    { id: "arbitration", label: "In Arbitration", count: 3, icon: <Gavel className="w-4 h-4" /> },
                    { id: "closed", label: "Resolved", count: 128, icon: <CheckCircle2 className="w-4 h-4" /> },
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
                
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" placeholder="Search by Ticket ID or User..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500" />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-sm font-bold text-slate-600">
                            <Filter className="w-4 h-4" /> Priority
                        </button>
                    </div>
                </div>

                {/* Dispute List */}
                <div className="grid gap-6">
                    {[
                        { id: "DIS-9921", user: "John Doe", business: "Global Tech", reason: "Product not received", status: "Open", priority: "High", time: "2h ago" },
                        { id: "DIS-9942", user: "Sarah Lane", business: "Urban Threads", reason: "Duplicate charge", status: "Reviewing", priority: "Medium", time: "5h ago" },
                        { id: "DIS-9955", user: "Alex Chen", business: "Skyline Media", reason: "Invalid ticket QR", status: "Awaiting Evidence", priority: "Low", time: "1d ago" },
                    ].map((d, i) => (
                        <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col lg:flex-row items-center gap-8 hover:shadow-lg transition-all">
                            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 ${
                                d.priority === 'High' ? 'bg-red-50 text-red-600' : 
                                d.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                                <MessageSquare className="w-8 h-8" />
                            </div>
                            
                            <div className="flex-1 space-y-4 text-center lg:text-left">
                                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{d.id}</span>
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${
                                        d.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                                    }`}>{d.priority} Priority</span>
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase"><Clock className="w-3 h-3" /> {d.time}</span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-slate-900">{d.reason}</h3>
                                
                                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
                                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                                        <User className="w-4 h-4 text-orange-600" /> {d.user}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                                        <Store className="w-4 h-4 text-orange-600" /> {d.business}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 shrink-0">
                                <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center gap-2">
                                    Analyze Evidence <ArrowRight className="w-4 h-4" />
                                </button>
                                <button className="p-3 border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50"><MoreVertical className="w-5 h-5" /></button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}