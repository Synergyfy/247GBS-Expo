"use client";

import React, { useState, useEffect, useCallback } from "react";
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
    Wallet,
    Loader2,
    ShieldCheck
} from "lucide-react";
import { api } from "@/lib/api";

interface OrderRecord {
    id: string;
    totalAmount: string;
    status: string;
    createdAt: string;
    user: { name: string; email: string };
    booth: { name: string };
}

interface RevenueStats {
    totalRevenue: number;
    totalOrders: number;
    totalTickets: number;
    recentOrders: OrderRecord[];
    platformCommission: number;
    security: {
        disputedOrders: number;
        chargebackRate: number;
        blockedIPs: number;
        onlineScanners: number;
        systemStatus: string;
        escrowAmount: number;
    };
}

export default function FinancialHubPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [stats, setStats] = useState<RevenueStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStats = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            const res = await api.get("/admin/revenue/stats");
            if (res.success && res.data) {
                // Defensive ensure numbers
                const data = res.data;
                setStats({
                    ...data,
                    totalRevenue: Number(data.totalRevenue || 0),
                    platformCommission: Number(data.platformCommission || 0),
                    security: {
                        ...data.security,
                        escrowAmount: Number(data.security?.escrowAmount || 0),
                        chargebackRate: Number(data.security?.chargebackRate || 0)
                    }
                });
            }
        } catch (e: any) {
            setError(e.message || "Failed to load financial data");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchStats(); }, [fetchStats]);

    const formatCurrency = (v: any) => {
        const value = Number(v) || 0;
        return new Intl.NumberFormat('en-GB', { 
            style: 'currency', 
            currency: 'GBP', 
            maximumFractionDigits: 0 
        }).format(value);
    };

    return (
        <div className="p-2 space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Financial Hub</h1>
                    <p className="text-slate-500 font-medium">Platform revenue oversight, escrow management, and gateway configuration.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchStats} className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all bg-white" title="Refresh">
                        <RefreshCw className={`w-5 h-5 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 shadow-lg flex items-center gap-2 transition-all">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {[
                    { id: "overview", label: "Overview & Settlements", icon: <PieChart className="w-4 h-4" /> },
                    { id: "gateways", label: "Gateways", icon: <CreditCard className="w-4 h-4" /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${
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

            {isLoading && !stats ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Synchronizing platform ledger...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-32 gap-6 bg-red-50/50 rounded-[3rem] border border-red-100">
                    <AlertTriangle className="w-16 h-16 text-red-500" />
                    <div className="text-center">
                        <h3 className="text-lg font-black text-red-900 uppercase tracking-tighter">Connection Failed</h3>
                        <p className="text-red-600 font-medium mt-1">{error}</p>
                    </div>
                    <button onClick={fetchStats} className="px-8 py-3 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-xl shadow-red-200">Reconnect</button>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {activeTab === "overview" && stats && (
                        <div className="space-y-8">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-6 opacity-10">
                                        <Banknote className="w-32 h-32" />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Total Gross Volume</p>
                                        <h3 className="text-5xl font-black tracking-tight">{formatCurrency(stats.totalRevenue)}</h3>
                                        <div className="flex items-center gap-2 mt-4 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                            <ArrowUpRight className="w-4 h-4" /> Lifetime platform volume
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Commission (Est.)</p>
                                        <h3 className="text-5xl font-black text-slate-900 tracking-tight">{formatCurrency(stats.platformCommission)}</h3>
                                        <div className="flex items-center gap-2 mt-4 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                                            <TrendingUp className="w-4 h-4" /> 10% Gross Margin
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                                    <div className="relative z-10">
                                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Orders Processed</p>
                                        <h3 className="text-5xl font-black text-orange-600 tracking-tight">{stats.totalOrders}</h3>
                                        <div className="flex items-center gap-2 mt-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            <CheckCircle2 className="w-4 h-4" /> Across {stats.totalTickets} items
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Recent Ledger */}
                                <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                                    <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                                        <h3 className="font-black text-slate-900 uppercase tracking-tight">Recent Order Ledger</h3>
                                        <button className="text-orange-600 text-xs font-black uppercase tracking-widest hover:text-orange-700">Full Audit Log</button>
                                    </div>
                                    <div className="flex-1 overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50/50 border-b border-slate-50">
                                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Transaction</th>
                                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Merchant</th>
                                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Amount</th>
                                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {stats.recentOrders.map((order) => (
                                                    <tr key={order.id} className="hover:bg-orange-50/30 transition-colors group">
                                                        <td className="px-8 py-5">
                                                            <p className="text-sm font-black text-slate-900">{order.user?.name || 'Customer'}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{new Date(order.createdAt).toLocaleString()}</p>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <span className="text-xs font-bold text-slate-600">{order.booth?.name || 'Expo Vendor'}</span>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <span className="text-sm font-black text-slate-900">£{order.totalAmount}</span>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'PENDING' ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`} />
                                                                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{order.status}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {stats.recentOrders.length === 0 && (
                                                    <tr>
                                                        <td colSpan={4} className="px-8 py-10 text-center text-slate-400 font-bold text-sm">No transaction history found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Security & Failover - LIVE integration */}
                                <div className="space-y-6">
                                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="font-black text-slate-900 uppercase tracking-tight">Security Status</h3>
                                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                                <ShieldCheck className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="p-5 bg-slate-50 rounded-2xl">
                                                <div className="flex justify-between items-start mb-1">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chargeback Risk</p>
                                                    <span className="text-[10px] font-black text-red-600">{stats.security.disputedOrders} Active</span>
                                                </div>
                                                <p className="text-2xl font-black text-slate-900">{stats.security.chargebackRate.toFixed(2)}%</p>
                                                <div className="w-full h-1 bg-slate-200 mt-2 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${Math.min(100, stats.security.chargebackRate * 10)}%` }} />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                                                    <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-1">Escrowed</p>
                                                    <p className="text-sm font-black text-orange-900">{formatCurrency(stats.security.escrowAmount)}</p>
                                                </div>
                                                <div className="text-center p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Scanners</p>
                                                    <p className="text-sm font-black text-blue-900">{stats.security.onlineScanners} Online</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-4 text-orange-400">
                                                <RefreshCw className="w-5 h-5" />
                                                <h4 className="font-black uppercase tracking-widest text-sm">System Status</h4>
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                                Platform health is <span className="text-emerald-400 font-bold underline">{stats.security.systemStatus}</span>. Real-time telemetry monitoring {stats.security.blockedIPs} blocked nodes.
                                            </p>
                                            <button className="w-full mt-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/10">
                                                Open Audit Dashboard
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "gateways" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                                <div>
                                    <h3 className="font-black text-xl text-slate-900 flex items-center gap-3 mb-2 uppercase tracking-tighter">
                                        <CreditCard className="w-6 h-6 text-orange-600" /> Platform Gateways
                                    </h3>
                                    <p className="text-slate-500 font-medium text-sm">Automated processor switching and merchant settlement rules.</p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-10 bg-[#635BFF] rounded-xl flex items-center justify-center text-white font-black text-[10px] uppercase">Stripe</div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Direct Gateway</h4>
                                                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-wider">Operational & Priority</p>
                                            </div>
                                        </div>
                                        <Settings className="w-5 h-5 text-slate-300 curson-pointer hover:text-slate-900 transition-colors" />
                                    </div>

                                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 opacity-60">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-10 bg-[#003087] rounded-xl flex items-center justify-center text-white font-black text-[10px] uppercase">PayPal</div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Express Checkout</h4>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Standby Mode</p>
                                            </div>
                                        </div>
                                        <Settings className="w-5 h-5 text-slate-300" />
                                    </div>

                                    <button className="w-full py-5 border-2 border-dashed border-slate-100 rounded-3xl text-slate-300 font-black uppercase tracking-widest text-[10px] hover:border-orange-200 hover:text-orange-600 transition-all">
                                        + Connected Apps
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                                <h3 className="font-black text-xl text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
                                    <Globe className="w-6 h-6 text-orange-600" /> Currency Controls
                                </h3>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest text-center">Base Settlement Asset</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['GBP', 'USD', 'EUR'].map(cur => (
                                                <button key={cur} className={`py-4 rounded-2xl font-black text-sm border transition-all ${cur === 'GBP' ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-slate-50 border-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                                                    {cur}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Clock className="w-5 h-5 text-orange-600" />
                                            <span className="font-black text-orange-900 uppercase tracking-widest text-xs">Standard Settlement: T+3</span>
                                        </div>
                                        <p className="text-xs text-orange-700/60 font-medium leading-relaxed">
                                            Payments are automatically batch-settled 72 hours after transaction verification.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}