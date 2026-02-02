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
    FileText
} from "lucide-react";

export default function ApprovalQueuePage() {
    const [activeTab, setActiveTab] = useState("businesses");

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
                        [
                            { name: "Global Tech Corp", manager: "Jane Smith", type: "Exhibitor", risk: "Low", submitted: "2h ago" },
                            { name: "Urban Threads Co.", manager: "Mark Riley", type: "Retailer", risk: "Medium", submitted: "5h ago" },
                            { name: "Skyline Media", manager: "Alex Chen", type: "Partner", risk: "High", submitted: "1d ago" },
                        ].map((b, i) => (
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
                                    <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all">Review Dossier</button>
                                    <button className="p-2.5 border border-slate-200 text-emerald-600 rounded-xl hover:bg-emerald-50"><CheckCircle2 className="w-6 h-6" /></button>
                                    <button className="p-2.5 border border-slate-200 text-red-600 rounded-xl hover:bg-red-50"><XCircle className="w-6 h-6" /></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        [
                            { title: "Annual Tech Symposium", host: "Global Tech Corp", tickets: "VIP, GA", price: "£0 - £500", submitted: "1h ago" },
                            { title: "Summer Fashion Week", host: "Urban Threads", tickets: "Runway, GA", price: "£45 - £120", submitted: "3h ago" },
                        ].map((e, i) => (
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
                                    <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all">Moderate Content</button>
                                    <button className="p-2.5 border border-slate-200 text-emerald-600 rounded-xl hover:bg-emerald-50"><CheckCircle2 className="w-6 h-6" /></button>
                                    <button className="p-2.5 border border-slate-200 text-red-600 rounded-xl hover:bg-red-50"><XCircle className="w-6 h-6" /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
