"use client";

import { useState } from "react";
import { 
    Wallet, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight, 
    Clock, 
    CheckCircle2, 
    ChevronRight, 
    CreditCard, 
    Landmark,
    Download,
    BarChart3,
    AlertCircle
} from "lucide-react";

export default function BusinessRevenuePage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Revenue & Payouts</h1>
                    <p className="text-slate-500">Manage your earnings, wallet balance, and settlement schedule.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                    <button className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 flex items-center gap-2 transition-all">
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
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Available for Payout</p>
                                <p className="text-xl font-bold text-white">£31,200.00</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Pending Settlement</p>
                                <p className="text-xl font-bold text-white">£11,650.00</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Reward Credits</p>
                                <p className="text-xl font-bold text-orange-500">2,400 PTS</p>
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
                                    <span className="text-slate-500 font-medium">Settlement Rule:</span>
                                    <span className="text-slate-900 font-bold">T+3 Days</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Auto-Payout:</span>
                                    <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Enabled</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                        <SettingsIcon className="w-4 h-4" /> Payout Settings
                    </button>
                </div>
            </div>

            {/* Transactions & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Recent Transactions */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Recent Activity</h3>
                        <button className="text-orange-600 text-sm font-bold uppercase tracking-widest hover:text-orange-700">View All</button>
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
                                    { name: "Ticket Sale: Standard", type: "Sale", status: "Completed", amount: "+£0.00", date: "Yesterday" },
                                    { name: "Reward Issuance Fee", type: "Fee", status: "Completed", amount: "-£5.00", date: "Yesterday" },
                                ].map((tx, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-bold text-slate-900">{tx.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.date}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded-md text-slate-600 uppercase tracking-wider">{tx.type}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
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

                {/* Fees & Commissions Summary */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                        <h3 className="font-bold text-slate-900 uppercase tracking-tight mb-6">Revenue Breakdown</h3>
                        <div className="space-y-6">
                            {[
                                { label: "Ticket Sales", val: "£38,400", color: "bg-orange-500" },
                                { label: "Product Bundles", val: "£12,200", color: "bg-blue-500" },
                                { label: "Platform Fees", val: "-£4,200", color: "bg-slate-300" },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500">{item.label}</span>
                                        <span className="text-slate-900">{item.val}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} rounded-full`} style={{ width: i === 0 ? '70%' : i === 1 ? '20%' : '10%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Support Card */}
                    <div className="bg-orange-50 rounded-[2.5rem] border border-orange-100 p-8">
                        <h4 className="font-bold text-orange-900 mb-2">Need help with payments?</h4>
                        <p className="text-xs text-orange-700 leading-relaxed mb-6 font-medium">
                            Our finance team is available Monday to Friday for settlement disputes and early payout requests.
                        </p>
                        <button className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold text-sm shadow-sm hover:bg-orange-600 hover:text-white transition-all">
                            Open Finance Ticket
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

function SettingsIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    );
}
