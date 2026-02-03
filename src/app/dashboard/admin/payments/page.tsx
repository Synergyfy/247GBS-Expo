"use client";

import { useState } from "react";
import { 
    Banknote, 
    ArrowUpRight, 
    ArrowDownRight, 
    TrendingUp, 
    PieChart, 
    Lock, 
    Unlock, 
    AlertTriangle,
    Download,
    CheckCircle2,
    RefreshCw,
    Settings,
    CreditCard,
    Globe,
    Clock,
    Wallet
} from "lucide-react";

export default function FinancialHubPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Financial Hub</h1>
                    <p className="text-slate-500">Platform revenue oversight, escrow management, and gateway configuration.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all">
                        <Download className="w-4 h-4" /> Settlement Report
                    </button>
                    <button className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 flex items-center gap-2 transition-all">
                        <Unlock className="w-4 h-4" /> Bulk Release
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {[
                    { id: "overview", label: "Overview & Escrow", icon: <PieChart className="w-4 h-4" /> },
                    { id: "gateways", label: "Gateways & Currency", icon: <CreditCard className="w-4 h-4" /> },
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
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Platform Revenue Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <Banknote className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Total Gross Volume</p>
                                    <h3 className="text-4xl font-black">£4.85M</h3>
                                    <div className="flex items-center gap-2 mt-4 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                        <ArrowUpRight className="w-4 h-4" /> +18.2% vs last month
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Commission Revenue</p>
                                    <h3 className="text-4xl font-black text-slate-900">£482,400</h3>
                                    <div className="flex items-center gap-2 mt-4 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                                        <TrendingUp className="w-4 h-4" /> 10% Avg Commission
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                                <div className="relative z-10">
                                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Funds in Escrow</p>
                                    <h3 className="text-4xl font-black text-orange-600">£1.12M</h3>
                                    <div className="flex items-center gap-2 mt-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        <Lock className="w-4 h-4" /> Held for Settlement
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Recent Settlements */}
                            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Escrow & Settlements</h3>
                                    <button className="text-orange-600 text-sm font-bold uppercase tracking-widest hover:text-orange-700">View All Transactions</button>
                                </div>
                                <div className="flex-1 overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Business</th>
                                                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Held Amount</th>
                                                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Settlement Date</th>
                                                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                                <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {[
                                                { name: "Global Tech Corp", amount: "£42,000.00", date: "Feb 05, 2026", status: "In Escrow" },
                                                { name: "Urban Threads Co.", amount: "£8,450.00", date: "Today", status: "Processing" },
                                                { name: "EcoHome Solutions", amount: "£12,200.00", date: "Feb 08, 2026", status: "Disputed Hold" },
                                            ].map((s, i) => (
                                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <p className="text-sm font-bold text-slate-900">{s.name}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: BUS-4421{i}</p>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <span className="text-sm font-black text-slate-900">{s.amount}</span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <p className="text-xs font-bold text-slate-600">{s.date}</p>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${
                                                                s.status === 'Processing' ? 'bg-orange-500 animate-pulse' : 
                                                                s.status === 'Disputed Hold' ? 'bg-red-500' : 'bg-blue-500'
                                                            }`} />
                                                            <span className="text-xs font-bold text-slate-700">{s.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline">Manage</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Risk & Fraud Mini Panel */}
                            <div className="space-y-8">
                                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                                    <h3 className="font-bold text-slate-900 uppercase tracking-tight mb-6">Chargeback Monitoring</h3>
                                    <div className="space-y-6">
                                        <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-xs font-black text-red-700 uppercase tracking-widest">Alert Level</p>
                                                <AlertTriangle className="w-4 h-4 text-red-600" />
                                            </div>
                                            <p className="text-xl font-black text-red-900">0.12%</p>
                                            <p className="text-[10px] text-red-600 mt-1 font-bold">Standard Threshold: 1.0%</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-sm font-bold">
                                                <span className="text-slate-500">Active Disputes:</span>
                                                <span className="text-slate-900">14</span>
                                            </div>
                                            <div className="flex justify-between text-sm font-bold">
                                                <span className="text-slate-500">Potential Recovery:</span>
                                                <span className="text-slate-900">£4,200.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-orange-50 rounded-[2.5rem] border border-orange-100 p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <RefreshCw className="w-5 h-5 text-orange-600" />
                                        <h4 className="font-bold text-orange-900">Gateway Failover</h4>
                                    </div>
                                    <p className="text-xs text-orange-700 leading-relaxed font-medium mb-6">
                                        Main Gateway (Stripe) is **Healthy**. Automatic failover to PayPal is standby.
                                    </p>
                                    <button className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold text-sm shadow-sm hover:bg-orange-600 hover:text-white transition-all">
                                        Configure Routing
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* GATEWAY & CURRENCY CONFIGURATION */}
                {activeTab === "gateways" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Gateway Configuration */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-2">
                                    <CreditCard className="w-5 h-5 text-orange-600" /> Payment Gateways
                                </h3>
                                <p className="text-slate-500 text-sm">Manage active processors and failover rules.</p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-[#635BFF] rounded-md flex items-center justify-center text-white font-bold text-xs">Stripe</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Stripe Payments</h4>
                                            <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Primary Active</p>
                                        </div>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-900"><Settings className="w-5 h-5" /></button>
                                </div>

                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-[#003087] rounded-md flex items-center justify-center text-white font-bold text-xs">PayPal</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">PayPal Express</h4>
                                            <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Failover Ready</p>
                                        </div>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-900"><Settings className="w-5 h-5" /></button>
                                </div>

                                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-orange-200 hover:text-orange-600 transition-all">
                                    + Add Gateway
                                </button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Currency & Settlement */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-orange-600" /> Currency & Settlement
                                </h3>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-black uppercase text-slate-400 mb-2">Base Currency</label>
                                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none">
                                            <option>GBP (£)</option>
                                            <option>USD ($)</option>
                                            <option>EUR (€)</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-xs font-black uppercase text-slate-400 mb-2">Settlement Cycle</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['T+2', 'T+7', 'T+30'].map((cycle) => (
                                                <button key={cycle} className={`py-2 rounded-xl text-sm font-bold border ${cycle === 'T+7' ? 'bg-orange-600 text-white border-orange-600' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                                                    {cycle}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-2 font-medium">Standard payout frequency for verified merchants.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Wallet Settings */}
                            <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl text-white">
                                <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                                    <Wallet className="w-5 h-5 text-orange-400" /> Treasury Controls
                                </h3>
                                <div className="flex items-center justify-between py-4 border-b border-white/10">
                                    <span className="text-sm font-bold">Auto-Sweep to Bank</span>
                                    <div className="w-10 h-5 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <span className="text-sm font-bold">Hold Funds on Dispute</span>
                                    <div className="w-10 h-5 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}