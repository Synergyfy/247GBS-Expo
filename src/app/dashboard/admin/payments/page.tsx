"use client";

import { useState } from "react";

// --- ICONS ---
const BankIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
);
const WalletIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export default function FinancialHubPage() {
    const transactions = [
        { provider: "Global Tech", amount: "£8,450.00", fee: "£422.50", date: "Jan 26, 2026", status: "In Escrow" },
        { provider: "Fashion Hub", amount: "£1,250.00", fee: "£62.50", date: "Jan 25, 2026", status: "Awaiting Payout" },
        { provider: "Zenith Apparel", amount: "£4,300.00", fee: "£537.50", date: "Jan 24, 2026", status: "Completed" },
    ];

    return (
        <div className="max-w-6xl space-y-10">

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Financial Hub</h1>
                    <p className="text-slate-500 font-medium">Platform fee reconciliation, escrow management, and seller payouts.</p>
                </div>
                <button className="bg-orange-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all active:scale-95 flex items-center gap-2">
                    <BankIcon className="w-4 h-4" /> Run Batch Payout
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ESCROW OVERVIEW */}
                <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Total Funds in Escrow</h3>
                        <div className="text-5xl font-black text-slate-900 mb-10 tracking-tighter">£124.8K</div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-4">
                                <span className="font-bold text-slate-500">Service Hold-backs</span>
                                <span className="font-black text-slate-900">£42,900</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-4">
                                <span className="font-bold text-slate-500">Platform Fees (Pending)</span>
                                <span className="font-black text-orange-600">£15,620</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-slate-500">Awaiting Shipment</span>
                                <span className="font-black text-orange-600">£66,280</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                </div>

                {/* RECONCILIATION TABLE */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Recent Reconciliation</h3>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/30 border-b border-slate-100">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Provider</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Sale Amount</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Platform Fee</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {transactions.map((tx, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="font-bold text-slate-900 text-sm">{tx.provider}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase">{tx.date}</div>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-black text-slate-900">{tx.amount}</td>
                                        <td className="px-8 py-5 text-sm font-black text-orange-600">{tx.fee}</td>
                                        <td className="px-8 py-5">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${tx.status === 'Completed' ? 'bg-orange-100 text-orange-700' :
                                                    tx.status === 'In Escrow' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-orange-100 text-orange-700'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                        <button className="text-[10px] font-black border border-slate-200 bg-white px-6 py-2 rounded-lg text-slate-400 hover:text-orange-600 uppercase tracking-widest">Load Full Statement</button>
                    </div>
                </div>

            </div>

            {/* PAYOUT LOGS */}
            <div className="bg-orange-600 rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl font-black uppercase mb-4 leading-tight">Payout Configuration</h3>
                        <p className="text-slate-400 font-medium leading-relaxed mb-8">
                            Platform fees are currently set to be withheld automatically upon sale completion. Merchant payouts are batched every Monday at 00:00 UTC.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-4 py-2 bg-orange-600 rounded-xl text-xs font-black uppercase tracking-widest">7 Day Hold</div>
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest">Instant for Trusted</div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="w-72 h-40 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-8 shadow-2xl relative overflow-hidden group hover:rotate-2 transition-transform">
                            <div className="relative z-10">
                                <div className="text-[10px] font-black uppercase text-white/60 mb-1">Weekly Payout Pool</div>
                                <div className="text-4xl font-black tracking-tighter">£42,900</div>
                                <div className="flex justify-between items-end mt-4">
                                    <div className="text-[10px] font-black uppercase text-orange-300">Next Run: MON</div>
                                    <WalletIcon className="w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity" />
                                </div>
                            </div>
                            <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
