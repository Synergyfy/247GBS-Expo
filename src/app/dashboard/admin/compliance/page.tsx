"use client";

import { useState } from "react";
import { 
    ShieldCheck, 
    UserCheck, 
    FileCheck, 
    Lock, 
    Search, 
    AlertTriangle, 
    History,
    CheckCircle2,
    XCircle,
    Info,
    ExternalLink,
    Eye,
    Database,
    FileText,
    Gavel
} from "lucide-react";

export default function ComplianceHubPage() {
    const [activeTab, setActiveTab] = useState("kyc");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Compliance Hub</h1>
                    <p className="text-slate-500">Manage identity verification, regulatory screening, and data protection standards.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all">
                        <History className="w-4 h-4" /> Audit History
                    </button>
                    <button className="bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-orange-700 flex items-center gap-2 shadow-lg shadow-orange-200 transition-all">
                        <Gavel className="w-4 h-4" /> Legal Requests
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {[
                    { id: "kyc", label: "KYC / KYB", icon: <UserCheck className="w-4 h-4" /> },
                    { id: "screening", label: "Sanction Screening", icon: <ShieldCheck className="w-4 h-4" /> },
                    { id: "data", label: "Data Protection & Privacy", icon: <Lock className="w-4 h-4" /> },
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
                
                {/* KYC TAB */}
                {activeTab === "kyc" && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: "Verified Users", val: "124.2K", icon: <UserCheck />, color: "emerald" },
                                { label: "Pending KYB", val: "42", icon: <FileCheck />, color: "orange" },
                                { label: "Flagged Accounts", val: "12", icon: <AlertTriangle />, color: "red" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4`}>
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Identity Review Queue</h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input type="text" placeholder="Search identity..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Entity</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Document Type</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Submitted</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {[
                                            { name: "John Doe", type: "Gov ID", date: "12m ago", status: "In Progress" },
                                            { name: "Acme Corp Ltd", type: "Business License", date: "2h ago", status: "Reviewing" },
                                            { name: "Sarah Lane", type: "Passport", date: "5h ago", status: "New" },
                                        ].map((item, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <p className="text-sm font-bold text-slate-900">{item.name}</p>
                                                </td>
                                                <td className="px-8 py-5 text-sm text-slate-600 font-medium">{item.type}</td>
                                                <td className="px-8 py-5 text-xs text-slate-400 font-bold uppercase">{item.date}</td>
                                                <td className="px-8 py-5">
                                                    <span className="text-[10px] font-bold px-2 py-1 bg-orange-100 text-orange-700 rounded-md uppercase tracking-wider">{item.status}</span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline">Verify Docs</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* DATA PROTECTION TAB */}
                {activeTab === "data" && (
                    <div className="space-y-8">
                        {/* Data Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-orange-600" /> GDPR & Privacy Controls
                                </h3>
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Enforce GDPR Compliance</p>
                                            <p className="text-xs text-slate-500">Auto-anonymize data for EU users</p>
                                        </div>
                                        <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-xs font-black uppercase text-slate-400 mb-2">Data Retention Period (Months)</label>
                                        <div className="flex items-center gap-4">
                                            <input type="range" min="6" max="60" defaultValue="24" className="w-full accent-orange-600" />
                                            <span className="font-bold text-slate-900 text-sm w-12 text-center">24m</span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                                            <span className="text-xs font-black text-orange-700 uppercase tracking-widest">Retention Warning</span>
                                        </div>
                                        <p className="text-xs text-orange-800 leading-relaxed font-medium">
                                            Reducing retention will permanently delete archived user logs older than the new limit.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-orange-600" /> Data Requests (DSAR)
                                    </h3>
                                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-[10px] font-black uppercase">3 Pending</span>
                                </div>
                                <div className="flex-1 space-y-4">
                                    {[
                                        { id: "REQ-001", type: "Export", user: "user@example.com", due: "2 days" },
                                        { id: "REQ-002", type: "Deletion", user: "test@domain.com", due: "5 days" },
                                        { id: "REQ-003", type: "Export", user: "john.doe@web.com", due: "1 week" }
                                    ].map((req, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-black text-slate-900">{req.id}</span>
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${req.type === 'Deletion' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{req.type}</span>
                                                </div>
                                                <p className="text-xs text-slate-400">{req.user}</p>
                                            </div>
                                            <button className="text-slate-400 hover:text-orange-600"><Eye className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-slate-500 font-bold text-sm hover:bg-slate-50">
                                    View All Requests
                                </button>
                            </div>
                        </div>

                        {/* Consent Logs */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
                            <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                                <Database className="w-5 h-5 text-orange-400" /> Real-time Consent Log
                            </h3>
                            <div className="space-y-3 font-mono text-xs text-slate-400">
                                {[
                                    { time: "10:42:01", ip: "192.168.1.1", action: "CONSENT_GRANTED", type: "Cookies" },
                                    { time: "10:41:55", ip: "10.0.0.55", action: "CONSENT_REVOKED", type: "Marketing" },
                                    { time: "10:40:12", ip: "172.16.0.2", action: "CONSENT_GRANTED", type: "Terms" },
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 border-b border-white/5 pb-2 last:border-0">
                                        <span className="text-slate-600">{log.time}</span>
                                        <span className="text-orange-400">{log.ip}</span>
                                        <span className={log.action.includes("GRANTED") ? "text-emerald-400" : "text-red-400"}>{log.action}</span>
                                        <span className="text-slate-500">{log.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* PLACEHOLDER FOR SCREENING */}
                {activeTab === "screening" && (
                     <div className="bg-white rounded-[2.5rem] border border-slate-100 p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Sanction Screening</h3>
                        <p className="text-slate-500 max-w-sm mx-auto font-medium">Automatic sanction checks and AML screening rules are active.</p>
                    </div>
                )}

            </div>
        </div>
    );
}