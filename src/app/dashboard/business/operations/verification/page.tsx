"use client";

import { useState } from "react";
import { 
    QrCode, 
    Search, 
    CheckCircle2, 
    XCircle, 
    Smartphone, 
    RefreshCw, 
    User, 
    MoreVertical,
    Clock,
    AlertCircle,
    ShieldCheck,
    History,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LiveVerificationPage() {
    const [verifying, setVerifying] = useState(false);
    const [lastScan, setLastScan] = useState<any>(null);
    const [scanMode, setScanMode] = useState(true); // true = Camera, false = Manual

    const handleMockVerify = () => {
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            const isSuccess = Math.random() > 0.2;
            setLastScan({
                status: isSuccess ? 'Success' : 'Invalid',
                user: isSuccess ? 'Sarah Johnson' : 'Unknown',
                ticketType: isSuccess ? 'VIP GOLD PASS' : 'Expired/Unknown',
                id: isSuccess ? 'GBX-88219-X22' : '---',
                timestamp: new Date().toLocaleTimeString(),
                avatar: isSuccess ? 'SJ' : '?'
            });
        }, 1200);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/dashboard/business/operations" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Operations
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Live Verification Terminal</h1>
                        <p className="text-slate-500 text-lg">Secure entry control and real-time ticket validation.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl border border-emerald-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">Active Station: Hall A Entry</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 9.2 Scanner Terminal */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Smartphone className="w-64 h-64" />
                        </div>
                        
                        <div className="relative z-10 max-w-xl mx-auto text-center space-y-10 w-full">
                            <div className="flex justify-center">
                                <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 ${
                                    verifying ? "bg-orange-600 animate-pulse" : "bg-white/10 backdrop-blur-xl border border-white/20"
                                }`}>
                                    <QrCode className={`w-16 h-16 ${verifying ? "text-white" : "text-orange-500"}`} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-4xl font-black tracking-tight uppercase">Ready to Scan</h2>
                                <p className="text-slate-400 text-lg max-w-xs mx-auto leading-relaxed">Position the visitor's ticket QR code in the viewport or enter manually.</p>
                            </div>

                            <div className="space-y-6 pt-4">
                                <div className="flex gap-3 justify-center">
                                    <div className="relative flex-1 max-w-sm">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input 
                                            type="text" 
                                            placeholder="Enter Ticket ID Manually..."
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-mono placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-inner"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleMockVerify}
                                        disabled={verifying}
                                        className="bg-orange-600 hover:bg-orange-700 text-white px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-orange-600/20 active:scale-95 flex items-center justify-center min-w-[120px]"
                                    >
                                        {verifying ? <RefreshCw className="w-6 h-6 animate-spin" /> : "Verify"}
                                    </button>
                                </div>
                                <div className="flex justify-center gap-8">
                                    <button onClick={() => setScanMode(true)} className={`text-[10px] font-black uppercase tracking-[0.2em] pb-2 border-b-2 transition-all ${scanMode ? 'border-orange-500 text-white' : 'border-transparent text-slate-500'}`}>Camera Mode</button>
                                    <button onClick={() => setScanMode(false)} className={`text-[10px] font-black uppercase tracking-[0.2em] pb-2 border-b-2 transition-all ${!scanMode ? 'border-orange-500 text-white' : 'border-transparent text-slate-500'}`}>Manual Entry</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 9.2 Verification Result Overlay/State */}
                    {lastScan && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`bg-white rounded-[2.5rem] p-10 border-4 shadow-2xl relative overflow-hidden ${
                                lastScan.status === 'Success' ? 'border-emerald-500' : 'border-red-500'
                            }`}
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                                {lastScan.status === 'Success' ? <ShieldCheck className="w-32 h-32 text-emerald-500" /> : <XCircle className="w-32 h-32 text-red-500" />}
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                                <div className="flex items-center gap-8">
                                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg ${
                                        lastScan.status === 'Success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                        {lastScan.status === 'Success' ? <CheckCircle2 className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
                                    </div>
                                    <div>
                                        <h3 className={`text-3xl font-black uppercase tracking-tight ${
                                            lastScan.status === 'Success' ? 'text-emerald-700' : 'text-red-700'
                                        }`}>
                                            {lastScan.status === 'Success' ? 'Access Granted' : 'Invalid Ticket'}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 mt-2">
                                            <span className="text-slate-900 font-black uppercase text-sm tracking-widest">{lastScan.user}</span>
                                            <span className="text-orange-600 font-bold uppercase text-sm tracking-widest bg-orange-50 px-2 rounded">{lastScan.ticketType}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right border-l-2 border-slate-100 pl-10 hidden md:block">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Passport ID</p>
                                    <p className="text-xl font-mono font-bold text-slate-900">{lastScan.id}</p>
                                    <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">{lastScan.timestamp}</p>
                                </div>
                                <button onClick={() => setLastScan(null)} className="md:hidden w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold">Dismiss</button>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Live Log Sidebar */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col h-full max-h-[800px]">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <h3 className="font-bold text-lg text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <History className="w-5 h-5 text-orange-600" /> Recent Scans
                            </h3>
                            <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-2 py-1 rounded-full animate-pulse">LIVE</span>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 bg-white hover:bg-slate-50 transition-all cursor-default group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                                        <User className="w-5 h-5 text-slate-400 group-hover:text-orange-600 transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-slate-900 truncate">Visitor #{1042 + i}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">General • 13:42:0{i}</p>
                                    </div>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                </div>
                            ))}
                        </div>
                        
                        <div className="p-6 border-t border-slate-50 bg-slate-50/20 text-center">
                            <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-orange-600 transition-colors">View All Session Logs</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
