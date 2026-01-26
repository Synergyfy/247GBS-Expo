"use client";

import React from "react";

// --- ICONS ---
const DownloadIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const WalletIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

export default function RewardsPage() {
    const orders = [
        { id: "EXP-4001", title: "Premium Tech Bundle", price: "299.00", date: "Jan 24, 2026", type: "DIGITAL ITEM" },
        { id: "EXP-4002", title: "Business Strategy Consultation", price: "150.00", date: "Jan 25, 2026", type: "SERVICE" },
    ];

    const transactions = [
        { date: "Jan 24, 2026", desc: "Wallet Top-up", status: "Completed", amount: "+£500.00", isCredit: true },
        { date: "Jan 23, 2026", desc: "Booth Purchase: TechFlow", status: "Completed", amount: "-£299.00", isCredit: false },
        { date: "Jan 22, 2026", desc: "Service Booking: Emily Chen", status: "Completed", amount: "-£150.00", isCredit: false },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display">My Rewards & Orders</h1>
                <p className="text-slate-500">Track your purchases, manage your wallet, and unlock exclusive expo benefits.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* WALLET CARD */}
                <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl lg:col-span-1 ring-1 ring-white/20">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <WalletIcon className="w-5 h-5 opacity-80" />
                                <h3 className="font-semibold text-white/90 uppercase tracking-wider text-xs">Expo Wallet Balance</h3>
                            </div>
                            <div className="text-5xl font-bold mb-8">£1,250.00</div>
                        </div>
                        <div className="space-y-3 mt-auto">
                            <button className="w-full bg-white text-teal-700 py-3.5 rounded-xl font-bold shadow-lg hover:bg-slate-100 transition-all active:scale-[0.98]">
                                Top Up Wallet
                            </button>
                            <button className="w-full bg-white/20 py-3.5 rounded-xl font-bold hover:bg-white/30 transition-all backdrop-blur-sm active:scale-[0.98]">
                                Withdraw Funds
                            </button>
                        </div>
                    </div>
                    {/* Decorative Shapes */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -left-10 -top-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"></div>
                </div>

                {/* RECENT ORDERS */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 lg:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-xl text-slate-900">Recent Orders</h3>
                        <button className="text-sm font-semibold text-teal-600 hover:text-teal-700">View All</button>
                    </div>
                    <div className="space-y-6">
                        {orders.map((order, i) => (
                            <div key={order.id} className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                <div className="w-20 h-20 bg-slate-50 rounded-2xl shrink-0 border border-slate-100 flex items-center justify-center">
                                    <span className="text-slate-300 font-bold text-2xl tracking-tighter">#{i + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-slate-900 text-lg">{order.title}</h4>
                                        <span className="text-lg font-bold text-slate-900">£{order.price}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 mb-2">Order {order.id}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${order.type === 'DIGITAL ITEM' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {order.type}
                                        </span>
                                        <span className="text-xs text-slate-400">• {order.date}</span>
                                    </div>
                                </div>
                                <div className="shrink-0 flex items-center">
                                    <button className="flex items-center gap-2 text-teal-600 font-bold text-sm bg-teal-50 px-5 py-2.5 rounded-xl hover:bg-teal-100 transition-colors">
                                        {order.type === 'DIGITAL ITEM' ? (
                                            <><DownloadIcon className="w-4 h-4" /> Download</>
                                        ) : 'Manage Session'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TRANSACTION HISTORY */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-xl text-slate-900">Transaction History</h3>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50">Filter</button>
                        <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50">Export</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-slate-100">
                            <tr>
                                <th className="pb-4 font-semibold text-slate-500 text-sm">Date</th>
                                <th className="pb-4 font-semibold text-slate-500 text-sm">Description</th>
                                <th className="pb-4 font-semibold text-slate-500 text-sm">Status</th>
                                <th className="pb-4 font-semibold text-slate-500 text-sm text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {transactions.map((tx, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-5 text-sm text-slate-600">{tx.date}</td>
                                    <td className="py-5">
                                        <div className="text-sm font-bold text-slate-900">{tx.desc}</div>
                                        <div className="text-[10px] text-slate-400 font-medium tracking-tight">REFERENCE: {Math.random().toString(36).substring(7).toUpperCase()}</div>
                                    </td>
                                    <td className="py-5">
                                        <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className={`py-5 text-sm font-bold text-right ${tx.isCredit ? 'text-emerald-600' : 'text-slate-900'}`}>
                                        {tx.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* REWARDS CARD */}
            <div className="bg-white rounded-3xl border border-dotted border-slate-300 p-10 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">Loyalty Rewards Coming Soon!</h3>
                <p className="text-slate-500 max-w-lg mx-auto mb-8">
                    Participate in live sessions, review booths, and earn points that can be redeemed for exclusive exhibition vouchers.
                </p>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold opacity-50 cursor-not-allowed">
                    Join Rewards Program
                </button>
            </div>
        </div>
    );
}
