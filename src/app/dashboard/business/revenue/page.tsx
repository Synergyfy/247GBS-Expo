"use client";

import { useState } from "react";
import { 
    Wallet, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight, 
    Clock, 
    CheckCircle2, 
    Loader2,
    ShieldCheck,
    ChevronRight, 
    CreditCard, 
    Landmark,
    Download,
    BarChart3,
    AlertCircle
} from "lucide-react";

import Modal from "@/app/component/Modal";

export default function BusinessRevenuePage() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [settlementRule, setSettlementRule] = useState("T+3");
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsSettingsOpen(false);
        }, 1500);
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Revenue & Payouts</h1>
                    <p className="text-slate-500 text-lg">Manage your earnings, wallet balance, and settlement schedule.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                    <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 flex items-center gap-2 transition-all">
                        <ArrowUpRight className="w-4 h-4" /> Request Early Payout
                    </button>
                </div>
            </div>

            {/* Wallet Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 1. Main Wallet Card */}
                <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Wallet className="w-48 h-48" />
                    </div>
                    
                    <div className="relative z-10 space-y-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/20">
                                <Wallet className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest text-slate-400">Total Business Balance</span>
                        </div>

                        <div>
                            <div className="text-6xl md:text-7xl font-black tracking-tighter">£42,850<span className="text-3xl font-bold text-slate-500">.00</span></div>
                            <div className="flex items-center gap-2 mt-4 text-emerald-400 font-bold">
                                <TrendingUp className="w-5 h-5" />
                                <span>+£12,400 this month</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Available</p>
                                <p className="text-xl font-bold text-white">£31,200.00</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Pending</p>
                                <p className="text-xl font-bold text-white">£11,650.00</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Dispute Holds</p>
                                <p className="text-xl font-bold text-orange-500">£840.00</p>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Refund Reserve</p>
                                <p className="text-xl font-bold text-white">£2,000.00</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Payout Schedule Card */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Payout Schedule</h3>
                        <div className="space-y-6">
                            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <p className="text-xs text-orange-700 font-bold uppercase tracking-widest mb-1">Next Settlement</p>
                                <p className="text-xl font-black text-orange-900">Friday, Feb 6</p>
                                <p className="text-xs text-orange-600 mt-1 font-medium">Estimated: £8,450.00</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Active Rule:</span>
                                    <span className="text-orange-600 font-black">{settlementRule} Days</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Auto-Payout:</span>
                                    <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Enabled</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsSettingsOpen(true)}
                        className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                    >
                        <SettingsIcon className="w-4 h-4" /> Payout Settings
                    </button>
                </div>
            </div>

            {/* Transactions & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Recent Transactions */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                        <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Financial Ledger</h3>
                        <button className="text-orange-600 text-[10px] font-black uppercase tracking-widest hover:text-orange-700">View All Transactions</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Transaction</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Type</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { name: "Ticket Sale: VIP Access", type: "Sale", status: "Completed", amount: "+£19.00", date: "Today, 10:42 AM" },
                                    { name: "Settlement Payout", type: "Withdrawal", status: "Processing", amount: "-£12,000.00", date: "Today, 09:00 AM" },
                                    { name: "Customer Refund Request", type: "Refund", status: "Disputed", amount: "-£49.00", date: "Yesterday" },
                                    { name: "Ticket Sale: Standard", type: "Sale", status: "Completed", amount: "+£0.00", date: "Yesterday" },
                                ].map((tx, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-bold text-slate-900">{tx.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.date}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded-md text-slate-600 uppercase tracking-wider">{tx.type}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${
                                                    tx.status === 'Completed' ? 'bg-emerald-500' : 
                                                    tx.status === 'Disputed' ? 'bg-red-500' : 'bg-orange-500'
                                                }`} />
                                                <span className="text-xs font-bold text-slate-700">{tx.status}</span>
                                            </div>
                                        </td>
                                        <td className={`px-8 py-5 text-sm font-black text-right ${tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>
                                            {tx.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reserves & Security */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldCheck className="text-orange-600 w-6 h-6" />
                            <h3 className="font-bold text-slate-900 uppercase tracking-tight">Refund Reserve</h3>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-6">
                            A minimum balance of <span className="font-bold text-slate-900">£2,000.00</span> is held to cover immediate refund requests and chargebacks.
                        </p>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-slate-400 uppercase">Reserve Level</span>
                                <span className="text-emerald-600">100% Filled</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Quick Support Card */}
                    <div className="bg-orange-50 rounded-[2.5rem] border border-orange-100 p-8 shadow-sm">
                        <h4 className="font-bold text-orange-900 mb-2 uppercase tracking-tight">Finance Desk</h4>
                        <p className="text-xs text-orange-700 leading-relaxed mb-6 font-medium">
                            Request a limit increase for your early payouts or dispute a platform fee.
                        </p>
                        <button className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-orange-600 hover:text-white transition-all">
                            Open Finance Ticket
                        </button>
                    </div>
                </div>
            </div>

            {/* Payout Settings Modal */}
            <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Settlement Configuration">
                <form onSubmit={handleSaveSettings} className="space-y-8">
                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Select Settlement Cycle</label>
                        <div className="grid gap-3">
                            {[
                                { id: "T+1", label: "Accelerated (T+1)", desc: "Next-day settlements for low-risk businesses.", fee: "1.5% extra fee" },
                                { id: "T+3", label: "Standard (T+3)", desc: "Default cycle for all verified exhibitors.", fee: "Free" },
                                { id: "T+7", label: "Extended (T+7)", desc: "Higher security for high-ticket transactions.", fee: "Free" },
                            ].map(rule => (
                                <div 
                                    key={rule.id}
                                    onClick={() => setSettlementRule(rule.id)}
                                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                        settlementRule === rule.id ? "border-orange-600 bg-orange-50 shadow-md" : "border-slate-100 hover:border-orange-200"
                                    }`}
                                >
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{rule.label}</p>
                                        <p className="text-xs text-slate-500">{rule.desc}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${rule.fee === 'Free' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {rule.fee}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-800 leading-relaxed font-medium">
                            Changes to your settlement cycle require manual review by our risk team and may take up to 48 hours to activate.
                        </p>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={() => setIsSettingsOpen(false)} className="flex-1 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Cancel</button>
                        <button 
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 py-4 bg-orange-600 text-white font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-orange-700 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Request Change"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

function SettingsIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    );
}
