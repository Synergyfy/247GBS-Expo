"use client";

import { useState, useEffect } from "react";
import {
    QrCode,
    Search,
    CheckCircle2,
    XCircle,
    Package,
    RefreshCw,
    Loader2,
    User,
    MoreVertical,
    History,
    ShieldCheck,
    CreditCard,
    ArrowLeft,
    AlertCircle,
    Download
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

export default function RedemptionProcessingPage() {
    const [verifying, setVerifying] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [redemptionSuccess, setRedemptionSuccess] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [orders, setOrders] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [lastScan, setLastScan] = useState<any>(null); // Still used for current active selection/view
    const [stats, setStats] = useState<any>({ redeemed: 142, total: 500, queueTime: "~2m", activeStaff: 4 });
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        fetchSidebarData();
    }, []);

    const fetchSidebarData = async () => {
        try {
            const [statsData, historyData] = await Promise.all([
                api.get('/dashboard/business/products/redemption/stats'),
                api.get('/dashboard/business/products/redemption/history')
            ]);
            setStats(statsData);
            setHistory(historyData);
        } catch (error) {
            console.error("Failed to fetch redemption sidebar data:", error);
        }
    };

    const handleScan = async (searchId?: string) => {
        const idToSearch = searchId || identifier;
        if (!idToSearch) return;

        setVerifying(true);
        setError(null);
        setOrders([]);
        setLastScan(null);
        setRedemptionSuccess(false);

        try {
            const data = await api.get(`/dashboard/business/products/redemption/visitor/${idToSearch}`);
            if (data && data.length > 0) {
                setOrders(data);
                // For the UI, we'll pick the first order to display in the main view or allow selection
                // The current UI seems built for one visitor at a time
                setLastScan({
                    status: 'Success',
                    user: data[0].user?.name || 'Visitor',
                    items: data.flatMap((order: any) =>
                        order.items.map((item: any) => ({
                            name: item.product?.name || 'Product',
                            qty: item.quantity,
                            sku: item.product?.sku || 'SKU'
                        }))
                    ),
                    id: data[0].id,
                    timestamp: new Date().toLocaleTimeString(),
                    originalOrders: data // save all orders for bulk redemption if needed
                });
            } else {
                setError("No pending orders found for this visitor.");
                setLastScan({ status: 'Invalid' });
            }
        } catch (error: any) {
            console.error("Scan error:", error);
            setError(error.message || "Failed to verify visitor.");
            setLastScan({ status: 'Invalid' });
        } finally {
            setVerifying(false);
        }
    };

    const handleRedeem = async () => {
        if (!lastScan || !lastScan.originalOrders) return;

        setIsConfirming(true);
        try {
            // Redeem all found orders for this visitor
            await Promise.all(lastScan.originalOrders.map((order: any) =>
                api.post(`/dashboard/business/products/redemption/redeem/${order.id}`, {})
            ));

            setRedemptionSuccess(true);
            fetchSidebarData();
            setTimeout(() => {
                setLastScan(null);
                setRedemptionSuccess(false);
                setIdentifier("");
                setOrders([]);
            }, 3000);
        } catch (error: any) {
            console.error("Redemption error:", error);
            setError(error.message || "Failed to process redemption.");
        } finally {
            setIsConfirming(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/dashboard/business/products/fulfilment" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Fulfilment
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Redemption Processing</h1>
                        <p className="text-slate-500 text-lg">Scan visitor tickets to issue bundled products and services.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl border border-emerald-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">Connected to Inventory Mirror</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 10.2 Scanner & Processing */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[450px]">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Package className="w-64 h-64" />
                        </div>

                        <div className="relative z-10 max-w-xl mx-auto text-center space-y-10 w-full">
                            <div className="flex justify-center">
                                <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 ${verifying ? "bg-orange-600 animate-pulse" : "bg-white/10 backdrop-blur-xl border border-white/20 hover:border-orange-500/50 cursor-pointer"
                                    }`} onClick={() => handleScan()}>
                                    <QrCode className={`w-16 h-16 ${verifying ? "text-white" : "text-orange-500"}`} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-4xl font-black tracking-tight uppercase">Product Scanner</h2>
                                <p className="text-slate-400 text-lg max-w-sm mx-auto leading-relaxed">Scan a QR to view eligible product redemptions for this visitor.</p>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <div className="flex gap-3 justify-center w-full">
                                    <div className="relative flex-1 max-w-xs">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input
                                            type="text"
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleScan()}
                                            placeholder="Manual Ticket ID..."
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-mono placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleScan()}
                                        disabled={verifying || !identifier}
                                        className="bg-orange-600 hover:bg-orange-700 text-white px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-orange-600/20 active:scale-95 flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {verifying ? <Loader2 className="w-6 h-6 animate-spin" /> : "Verify"}
                                    </button>
                                </div>
                                {error && (
                                    <p className="text-red-400 text-sm font-bold bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20">
                                        <AlertCircle className="w-4 h-4 inline mr-2" />
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 10.2 Redemption Entitlement View */}
                    <AnimatePresence>
                        {lastScan && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`bg-white rounded-[2.5rem] border-4 shadow-2xl overflow-hidden relative ${redemptionSuccess ? 'border-emerald-500' : 'border-slate-100'
                                    }`}
                            >
                                {redemptionSuccess ? (
                                    <div className="p-16 text-center space-y-6">
                                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-110">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-900 uppercase">Redemption Complete</h3>
                                        <p className="text-slate-500 max-w-sm mx-auto font-medium">Inventory has been updated and a confirmation has been sent to the customer.</p>
                                    </div>
                                ) : lastScan.status === 'Success' ? (
                                    <div className="flex flex-col">
                                        <div className="p-8 md:p-10 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl shadow-sm">
                                                    {lastScan.user.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{lastScan.user}</h3>
                                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">ID: {identifier}</p>
                                                </div>
                                            </div>
                                            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4" /> Entitled to Rewards
                                            </div>
                                        </div>

                                        <div className="p-8 md:p-10 space-y-8">
                                            <div>
                                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Eligible Bundle Items</h4>
                                                <div className="space-y-4">
                                                    {lastScan.items.map((item: any, i: number) => (
                                                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-orange-200 transition-all">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-orange-600 shadow-sm transition-colors">
                                                                    <Package className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-slate-900">{item.name}</p>
                                                                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">{item.sku}</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="text-lg font-black text-slate-900">x{item.qty}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100 flex items-center gap-4">
                                                <AlertCircle className="w-6 h-6 text-orange-600 shrink-0" />
                                                <p className="text-xs text-orange-800 font-medium leading-relaxed">
                                                    Confirming this redemption will permanently mark these items as <strong>Redeemed</strong> and deduct from your active exhibition stock.
                                                </p>
                                            </div>

                                            <div className="flex gap-4 pt-4">
                                                <button onClick={() => { setLastScan(null); setIdentifier(""); }} className="flex-1 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Cancel</button>
                                                <button
                                                    onClick={handleRedeem}
                                                    disabled={isConfirming}
                                                    className="flex-[2] py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2"
                                                >
                                                    {isConfirming ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm & Issue Items"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-16 text-center space-y-6">
                                        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <XCircle className="w-12 h-12" />
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Invalid Ticket</h3>
                                        <p className="text-slate-500 max-w-sm mx-auto font-medium">{error || "This ticket does not exist or has already been redeemed for all bundled assets."}</p>
                                        <button onClick={() => { setLastScan(null); setIdentifier(""); setError(null); }} className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all">Dismiss</button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Redemption Stats/History Sidebar */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-slate-900 uppercase tracking-tight">Live Fulfillment</h3>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session #1</span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-slate-500 uppercase">Bundles Redeemed</span>
                                    <span className="text-slate-900">{stats.redeemed} / {stats.total}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${stats.total > 0 ? (stats.redeemed / stats.total) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>

                            <div className="pt-6 grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Queue Time</p>
                                    <p className="text-xl font-bold text-slate-900">{stats.queueTime}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Staff Active</p>
                                    <p className="text-xl font-bold text-slate-900">{stats.activeStaff}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <h3 className="font-bold text-lg text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <History className="w-5 h-5 text-orange-600" /> Confirmations
                            </h3>
                        </div>

                        <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[400px]">
                            {history.length === 0 ? (
                                <p className="text-center py-8 text-slate-400 text-sm italic">No recent redemptions.</p>
                            ) : (
                                history.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 bg-white hover:bg-slate-50 transition-all cursor-default group">
                                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                            <User className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-900 truncate">{item.user?.name || "Visitor"}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase truncate">
                                                {item.items?.map((it: any) => it.product?.name).join(', ') || "No items"}
                                            </p>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    </div>
                                ))
                            )}
                        </div>

                        {history.length > 0 && (
                            <div className="p-6 border-t border-slate-50 text-center">
                                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-orange-600 transition-colors flex items-center justify-center gap-2 mx-auto">
                                    <Download className="w-3 h-3" /> Download Session Manifest
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
