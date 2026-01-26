"use client";

import { useState } from "react";
import Modal from "../../../component/Modal";
import Tooltip from "../../../component/Tooltip";

// --- HELP ICONS ---
const ShieldIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);

export default function ExhibitorQueuePage() {
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedExhibitor, setSelectedExhibitor] = useState<any>(null);

    const exhibitors = [
        { id: 1, name: "Urban Threads Co.", owner: "Mark Riley", tier: "Yearly Pro", date: "Jan 26, 2026", status: "Pending" },
        { id: 2, name: "EcoHome Solutions", owner: "Sarah Lane", tier: "PAYG", date: "Jan 25, 2026", status: "Reviewing" },
        { id: 3, name: "GamerSpace Tech", owner: "Alex Chen", tier: "Yearly Pro", date: "Jan 26, 2026", status: "Pending" },
        { id: 4, name: "Zenith Apparel", owner: "David Wu", tier: "PAYG", date: "Jan 24, 2026", status: "Pending" },
        { id: 5, name: "Aqua Marine Gear", owner: "Linda Frost", tier: "Yearly Pro", date: "Jan 26, 2026", status: "Pending" }
    ];

    const handleReview = (ex: any) => {
        setSelectedExhibitor(ex);
        setIsReviewOpen(true);
    };

    return (
        <div className="max-w-6xl space-y-10">

            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Exhibitor Approval Queue</h1>
                <p className="text-slate-500 font-medium">Verify credentials and branding compliance before booths go live.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-white rounded-xl text-xs font-black uppercase text-indigo-600 border border-indigo-100 shadow-sm">All Pending (5)</button>
                        <button className="px-4 py-2 text-xs font-black uppercase text-slate-400 hover:text-slate-600 transition-colors">Requires Follow-up</button>
                    </div>
                    <div className="text-xs font-bold text-slate-400 tracking-widest uppercase">Verified System Active</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {exhibitors.map((item) => (
                        <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-50 flex items-center justify-center text-indigo-700 font-black text-xl border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    {item.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">{item.name}</h3>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mt-0.5">
                                        <span>Manager: {item.owner}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span>Applied {item.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <div className="text-center">
                                    <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border mb-1 ${item.tier === 'Yearly Pro' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                                        {item.tier}
                                    </div>
                                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pricing Plan</div>
                                </div>

                                <button
                                    onClick={() => handleReview(item)}
                                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10"
                                >
                                    Review Booth
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                title={`Booth Review: ${selectedExhibitor?.name}`}
            >
                <div className="space-y-8">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Compliance Checklist</h4>
                        <div className="space-y-3">
                            {[
                                "Legal entity verified (KYC)",
                                "Branding high-quality (no placeholders)",
                                "Products comply with safety policy",
                                "Return policy clearly stated"
                            ].map((check, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked={i < 2} />
                                    {check}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsReviewOpen(false)}
                            className="flex-1 bg-red-50 text-red-600 py-4 rounded-xl font-black uppercase text-xs hover:bg-red-100 transition-colors"
                        >
                            Reject Booth
                        </button>
                        <button
                            onClick={() => setIsReviewOpen(false)}
                            className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-black uppercase text-xs shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all"
                        >
                            Verify & Approve
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
