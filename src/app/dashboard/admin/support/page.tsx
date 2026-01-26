"use client";

import { useState } from "react";

// --- ICONS ---
const AlertIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);
const ChatIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
);

export default function ModerationSupportPage() {
    const [activeTab, setActiveTab] = useState("tickets");

    const tickets = [
        { id: "T-842", user: "Urban Threads", subject: "Payout Delay Query", priority: "High", status: "Open" },
        { id: "T-841", user: "John Buyer", subject: "Missing Download Link", priority: "Medium", status: "In Progress" },
        { id: "T-840", user: "EcoHome Solutions", subject: "Banner Image Error", priority: "Low", status: "Resolved" }
    ];

    const disputes = [
        { id: "D-102", buyer: "Alice Won", seller: "Global Tech", item: "Premium Watch 1", status: "Under Review" },
        { id: "D-101", buyer: "Bob Ross", seller: "Urban Threads", item: "Summer Hoodie", status: "Settled" }
    ];

    return (
        <div className="max-w-6xl space-y-10">

            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Moderation & Support</h1>
                <p className="text-slate-500 font-medium">Manage platform integrity, resolve disputes, and support our users.</p>
            </div>

            {/* TABS */}
            <div className="flex gap-10 border-b border-slate-200">
                {["Tickets", "Disputes", "System Logs"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`pb-6 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab.toLowerCase() ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-900'}`}
                    >
                        {tab}
                        {activeTab === tab.toLowerCase() && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full shadow-[0_-2px_8px_rgba(79,70,229,0.3)]"></div>
                        )}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2">
                    {activeTab === "tickets" && (
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                <h3 className="font-black text-slate-900 uppercase text-lg">Active Desk</h3>
                                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">3 Open Tickets</span>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {tickets.map((t) => (
                                    <div key={t.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${t.priority === 'High' ? 'bg-red-50 text-red-600' : t.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
                                                <ChatIcon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-sm mb-0.5">{t.subject}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">BY: {t.user} • {t.id}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded border uppercase ${t.status === 'Open' ? 'border-indigo-100 text-indigo-700' : 'border-slate-200 text-slate-400'}`}>{t.status}</span>
                                            <button className="text-xs font-black text-indigo-600 uppercase hover:underline">View</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "disputes" && (
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="font-black text-slate-900 uppercase text-lg">Dispute Resolution Console</h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {disputes.map((d) => (
                                    <div key={d.id} className="p-8 flex flex-col md:flex-row justify-between md:items-center gap-6">
                                        <div className="space-y-2">
                                            <div className="text-xl font-black text-slate-900 uppercase tracking-tight">{d.id}: {d.item}</div>
                                            <div className="flex items-center gap-3 text-xs font-bold text-slate-400 tracking-widest uppercase">
                                                <span>Buyer: {d.buyer}</span>
                                                <span className="text-slate-200 w-1 h-1 rounded-full bg-slate-200"></span>
                                                <span>Seller: {d.seller}</span>
                                            </div>
                                        </div>
                                        <button className="bg-slate-950 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-colors">Mediate</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1 space-y-8">
                    {/* POLICY SNAPSHOT */}
                    <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-black uppercase text-xs text-indigo-200 tracking-widest mb-6">Moderator Quick-Takedown</h4>
                            <p className="text-sm font-medium text-white/80 leading-relaxed mb-8">
                                Instantly disable any booth or product that violates platform T&Cs. Merchant will be notified via automated mediation email.
                            </p>
                            <input type="text" placeholder="Enter Booth ID..." className="w-full bg-indigo-900/20 border border-indigo-400 rounded-xl px-4 py-3 text-sm font-bold placeholder:text-indigo-300 outline-none mb-4" />
                            <button className="w-full bg-white text-red-600 py-3 rounded-xl font-black uppercase text-xs shadow-lg hover:bg-slate-50 transition-colors">
                                Disable Instantly
                            </button>
                        </div>
                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -translate-y-12 translate-x-12"></div>
                    </div>

                    {/* INTEGRITY STATS */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                <AlertIcon className="w-5 h-5" />
                            </div>
                            <h4 className="font-black uppercase text-sm text-slate-900 tracking-widest">Platform Safety</h4>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase mb-2">
                                    <span>Resolved Disputes</span>
                                    <span>98.2%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                    <div className="bg-indigo-600 h-1.5 rounded-full w-[98.2%] shadow-sm shadow-indigo-200"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase mb-2">
                                    <span>Merchant Integrity Score</span>
                                    <span>AA+ (Trust)</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                    <div className="bg-emerald-500 h-1.5 rounded-full w-[85%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
