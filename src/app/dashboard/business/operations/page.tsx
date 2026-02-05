"use client";

import { useState } from "react";
import { 
    Smartphone, 
    Users, 
    RefreshCw, 
    CheckCircle2, 
    XCircle, 
    Plus, 
    ShieldCheck, 
    Zap,
    ArrowRight,
    Loader2,
    Database
} from "lucide-react";
import Modal from "@/app/component/Modal";

export default function EventOperationsSetupPage() {
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncSuccess, setSyncSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setSyncSuccess(true);
            setTimeout(() => setSyncSuccess(false), 3000);
        }, 2000);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">EVENT-DAY OPERATIONS</h1>
                    <p className="text-slate-500 text-lg">System setup and staff management for live event control.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={handleSync}
                        disabled={isSyncing}
                        className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${
                            syncSuccess ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-orange-600"
                        }`}
                    >
                        {isSyncing ? <RefreshCw className="w-5 h-5 animate-spin" /> : syncSuccess ? <CheckCircle2 className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                        {isSyncing ? "Syncing Database..." : syncSuccess ? "Database Synced" : "Sync Ticket Database"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 9.1 Device Registration */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <div>
                                <h3 className="font-bold text-xl text-slate-900">Device Registration</h3>
                                <p className="text-sm text-slate-500">Pair and manage hardware scanners or mobile devices.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(true)} className="p-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: "Main Hall Scanner A", type: "Handheld POS", status: "Online", battery: "84%" },
                                    { name: "VIP Lounge Phone", type: "iOS Device", status: "Online", battery: "92%" },
                                    { name: "Staff Entry Tablet", type: "Android Tablet", status: "Offline", battery: "0%" },
                                ].map((device, i) => (
                                    <div key={i} className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-orange-600 shadow-sm transition-colors border border-slate-100">
                                                <Smartphone className="w-6 h-6" />
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                device.status === 'Online' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                                            }`}>
                                                {device.status}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-1">{device.name}</h4>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">{device.type}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className="text-xs font-bold text-slate-500">Battery: {device.battery}</span>
                                            <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline">Ping Device</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 9.1 Staff Roles */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="font-bold text-xl text-slate-900">Staff Assignments</h3>
                            <button className="text-orange-600 font-bold text-sm flex items-center gap-2 hover:underline">
                                <Plus className="w-4 h-4" /> Assign New Role
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Zone</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { name: "Michael Scott", zone: "Main Hall", role: "Verification Lead", status: "Active" },
                                        { name: "Pam Beesly", zone: "VIP Lounge", role: "Guest Relations", status: "Break" },
                                        { name: "Dwight Schrute", zone: "Exhibitor Entry", role: "Security Compliance", status: "Active" },
                                    ].map((staff, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                                                        {staff.name.charAt(0)}
                                                    </div>
                                                    <span className="font-bold text-slate-900 text-sm">{staff.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-slate-600">{staff.zone}</td>
                                            <td className="px-8 py-5 text-sm font-medium text-slate-500">{staff.role}</td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                    <span className="text-xs font-bold text-slate-700">{staff.status}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-8">
                    
                    {/* System Test Panel */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Zap className="w-32 h-32" />
                        </div>
                        <h3 className="text-xl font-bold mb-6 relative z-10">Scanner System Test</h3>
                        <div className="space-y-4 relative z-10">
                            {[
                                { label: "Network Latency", val: "12ms", status: "OK" },
                                { label: "QR API Status", val: "Operational", status: "OK" },
                                { label: "DB Mirror Sync", val: "99.9%", status: "OK" },
                            ].map((test, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{test.label}</p>
                                        <p className="text-sm font-bold text-slate-200">{test.val}</p>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-4 mt-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 hover:text-white transition-all">
                                Run Full Diagnostic
                            </button>
                        </div>
                    </div>

                    {/* Operational Tips */}
                    <div className="bg-orange-50 rounded-[2.5rem] border border-orange-100 p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-orange-900">Security Best Practice</h4>
                        </div>
                        <p className="text-xs text-orange-700 leading-relaxed font-medium mb-6">
                            Ensure all staff devices are Bound to the network MAC address to prevent unauthorized login attempts during the live window.
                        </p>
                        <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                            Security Guidelines <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Device Pairing Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Pair New Device">
                <div className="space-y-8 text-center py-4">
                    <div className="w-24 h-24 bg-orange-50 text-orange-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                        <Smartphone className="w-12 h-12" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 uppercase">Awaiting Connection</h3>
                        <p className="text-sm text-slate-500 mt-2 leading-relaxed">Enter this pairing code on the device's <br /> <strong>247GBS Scanner App</strong></p>
                    </div>
                    
                    <div className="flex justify-center gap-3">
                        {["8", "4", "2", "1"].map((code, i) => (
                            <div key={i} className="w-14 h-16 bg-slate-50 border-2 border-slate-200 rounded-xl flex items-center justify-center text-2xl font-black text-orange-600 shadow-sm">
                                {code}
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 space-y-3">
                        <div className="flex items-center gap-2 justify-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Looking for local hardware...
                        </div>
                        <button onClick={() => setIsModalOpen(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all">
                            Cancel Pairing
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
