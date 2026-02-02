"use client";

import { useState } from "react";
import { 
    Gift, 
    Plus, 
    Users, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    ChevronRight, 
    Zap, 
    Ticket,
    Search,
    Download
} from "lucide-react";

export default function BusinessRewardsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Reward Management</h1>
                    <p className="text-slate-500">Distribute bulk tickets, manage loyalty campaigns, and track reward redemption.</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all">
                    <Plus className="w-5 h-5" /> Launch Reward Campaign
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Rewards", val: "150", icon: <Zap />, color: "orange" },
                    { label: "Redeemed", val: "84", icon: <CheckCircle2 />, color: "emerald" },
                    { label: "Bulk Tickets", val: "500", icon: <Ticket />, color: "blue" },
                    { label: "Reach", val: "1.2K", icon: <Users />, color: "purple" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4`}>
                            {stat.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{stat.val}</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Bulk Issuance Widget */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Active Campaigns</h3>
                        <div className="flex gap-2">
                            <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-orange-600 transition-colors"><Search className="w-5 h-5" /></button>
                            <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-orange-600 transition-colors"><Download className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Campaign Name</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Type</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Progress</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { name: "Early Bird VIP Giveaway", type: "Bulk Reward", status: "Active", progress: 65 },
                                    { name: "Loyalty Tier 3 Gift", type: "Automatic", status: "Scheduled", progress: 0 },
                                    { name: "Referral Bonus Tickets", type: "Referral", status: "Active", progress: 42 },
                                ].map((c, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-bold text-slate-900">{c.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Expires in 12 days</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded-md text-slate-600 uppercase tracking-wider">{c.type}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                                <span className="text-xs font-bold text-slate-700">{c.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="w-24">
                                                <div className="flex justify-between text-[10px] font-bold mb-1">
                                                    <span className="text-slate-400">{c.progress}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${c.progress}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="text-slate-300 group-hover:text-orange-600 transition-colors">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bulk Purchase Card */}
                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Ticket className="w-32 h-32" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 relative z-10">Bulk Purchase</h3>
                        <p className="text-sm text-slate-400 mb-8 relative z-10 leading-relaxed">
                            Buy discounted tickets in bulk to distribute as rewards to your loyal customers.
                        </p>
                        <div className="space-y-4 relative z-10">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">VIP Pass Bundle</p>
                                    <p className="text-lg font-bold">100 Tickets</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-orange-500 font-black text-xl">£1,200</p>
                                    <p className="text-[10px] line-through text-slate-500">£1,900</p>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-orange-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
                                Buy Bundle
                            </button>
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-orange-50 rounded-[2.5rem] border border-orange-100 p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-orange-900">Conversion Tip</h4>
                        </div>
                        <p className="text-xs text-orange-700 leading-relaxed font-medium mb-4">
                            Reward tickets have a **45% higher** attendee conversion rate than standard sales.
                        </p>
                        <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline">
                            Read Success Stories &rarr;
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
