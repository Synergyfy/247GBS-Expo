"use client";

import { useState } from "react";
import { Search, Filter, Download, FileText, User, Shield, DollarSign, ArrowRight } from "lucide-react";

// Mock Data for Audit Logs
const AUDIT_LOGS = [
    {
        id: "LOG-9921",
        timestamp: "2026-02-05 09:42:12",
        actor: "Super Admin (Frank)",
        role: "SUPER_ADMIN",
        action: "POLICY_UPDATE",
        details: "Updated global refund window from 48h to 72h",
        category: "GOVERNANCE",
        status: "SUCCESS"
    },
    {
        id: "LOG-9920",
        timestamp: "2026-02-05 09:15:00",
        actor: "Finance Bot",
        role: "SYSTEM",
        action: "SETTLEMENT_RELEASE",
        details: "Released batch #4421 to Exhibitor: TechFlow",
        category: "FINANCIAL",
        status: "SUCCESS"
    },
    {
        id: "LOG-9919",
        timestamp: "2026-02-05 08:55:23",
        actor: "Compliance Officer (Sarah)",
        role: "COMPLIANCE_ADMIN",
        action: "KYC_REJECT",
        details: "Rejected application #8821 due to blurred ID",
        category: "VERIFICATION",
        status: "WARNING"
    },
    {
        id: "LOG-9918",
        timestamp: "2026-02-04 14:30:10",
        actor: "Business: GreenEnergy",
        role: "BUSINESS",
        action: "EVENT_CREATE",
        details: "Created new event draft: 'Sustainable Future'",
        category: "BUSINESS_ACTION",
        status: "SUCCESS"
    },
    {
        id: "LOG-9917",
        timestamp: "2026-02-04 11:20:45",
        actor: "Support Agent (Mike)",
        role: "SUPPORT_ADMIN",
        action: "DISPUTE_RESOLVE",
        details: "Resolved dispute #DSP-112 in favor of Customer",
        category: "SUPPORT",
        status: "SUCCESS"
    }
];

export default function AuditPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("ALL");

    const filteredLogs = AUDIT_LOGS.filter(log => {
        const matchesSearch = 
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
            log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === "ALL" || log.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const getIcon = (category: string) => {
        switch (category) {
            case "FINANCIAL": return <DollarSign className="w-4 h-4 text-green-600" />;
            case "GOVERNANCE": return <Shield className="w-4 h-4 text-purple-600" />;
            case "VERIFICATION": return <User className="w-4 h-4 text-orange-600" />;
            default: return <FileText className="w-4 h-4 text-slate-500" />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Audit Log Viewer</h1>
                <p className="text-slate-500 max-w-2xl">
                    Comprehensive forensic trail of all platform activities, including admin actions, financial movements, and security events.
                </p>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search by Actor, Action ID, or Details..." 
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select 
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-orange-500"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="ALL">All Categories</option>
                        <option value="GOVERNANCE">Governance</option>
                        <option value="FINANCIAL">Financial</option>
                        <option value="VERIFICATION">Verification</option>
                        <option value="BUSINESS_ACTION">Business</option>
                    </select>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Actor / Role</th>
                                <th className="px-6 py-4">Action</th>
                                <th className="px-6 py-4">Details</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Metadata</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4 font-mono text-slate-500 text-xs">
                                        {log.timestamp}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{log.actor}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{log.role}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-slate-100 rounded-md">
                                                {getIcon(log.category)}
                                            </div>
                                            <span className="font-bold text-slate-700">{log.action}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                                        {log.details}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            log.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-orange-600 hover:bg-orange-50 p-2 rounded-lg transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {filteredLogs.length === 0 && (
                    <div className="p-12 text-center text-slate-400">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No audit logs found matching your criteria.</p>
                    </div>
                )}

                <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                    <span>Showing {filteredLogs.length} entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}