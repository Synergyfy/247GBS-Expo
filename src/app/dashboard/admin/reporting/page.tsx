"use client";

import { useState } from "react";
import { 
    BarChart3, 
    FileText, 
    Download, 
    Calendar, 
    ArrowRight, 
    ShieldCheck, 
    Briefcase, 
    PieChart,
    Search
} from "lucide-react";

export default function ReportingHubPage() {
    const [activeTab, setActiveTab] = useState("internal");

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Reporting Hub</h1>
                    <p className="text-slate-500">Regulatory output, internal performance metrics, and compliance audit packages.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg">
                        <Download className="w-4 h-4" /> Export All Data
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit">
                <button
                    onClick={() => setActiveTab("internal")}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'internal' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    14.1 Internal Reports
                </button>
                <button
                    onClick={() => setActiveTab("external")}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'external' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    14.2 External & Regulatory
                </button>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                
                {activeTab === "internal" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Revenue Summary */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <PieChart className="w-5 h-5 text-orange-600" /> Revenue Summary
                                </h3>
                                <button className="text-xs font-bold text-orange-600 hover:underline">Generate &rarr;</button>
                            </div>
                            <p className="text-xs text-slate-500">Monthly breakdown of gross volume, platform fees, and partner shares.</p>
                            <div className="h-32 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
                                <BarChart3 className="w-8 h-8 text-slate-200" />
                            </div>
                        </div>

                        {/* Risk Dashboard */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-red-600" /> Risk & Fraud Report
                                </h3>
                                <button className="text-xs font-bold text-orange-600 hover:underline">Generate &rarr;</button>
                            </div>
                            <p className="text-xs text-slate-500">Analysis of flagged transactions, chargeback rates, and blocked IP patterns.</p>
                            <div className="h-32 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
                                <BarChart3 className="w-8 h-8 text-slate-200" />
                            </div>
                        </div>

                        {/* Compliance Status */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-blue-600" /> Compliance & SLA
                                </h3>
                                <button className="text-xs font-bold text-orange-600 hover:underline">Generate &rarr;</button>
                            </div>
                            <p className="text-xs text-slate-500">Verification throughput, support response times, and platform uptime adherence.</p>
                            <div className="h-32 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
                                <BarChart3 className="w-8 h-8 text-slate-200" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "external" && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="font-bold text-lg text-slate-900">Regulator & Tax Packages</h3>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type="text" placeholder="Search filings..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs" />
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/30">
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Package Name</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Type</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Period</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {[
                                            { name: "Q1 VAT Return - UK", type: "Tax Filing", period: "Jan - Mar 2026", status: "Ready" },
                                            { name: "Annual AML Audit Pack", type: "Regulatory", period: "FY 2025", status: "Certified" },
                                            { name: "GDPR Consent Audit", type: "Compliance", period: "Dec 2025", status: "Archived" },
                                        ].map((pkg, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-slate-100 rounded-lg"><FileText className="w-4 h-4 text-slate-500" /></div>
                                                        <span className="text-sm font-bold text-slate-900">{pkg.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-tight">{pkg.type}</td>
                                                <td className="px-8 py-5 text-xs font-medium text-slate-400">{pkg.period}</td>
                                                <td className="px-8 py-5">
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${pkg.status === 'Ready' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>{pkg.status}</span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button className="p-2 text-slate-400 hover:text-orange-600 transition-colors"><Download className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}