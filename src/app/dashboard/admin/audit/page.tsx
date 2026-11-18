"use client";

import { useState } from "react";
import { Search, Download, FileText, ArrowRight, X } from "lucide-react";

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
    action: "EVENT_REJECT",
    details: "Rejected event #EVT-109 due to pricing cap violation",
    category: "VERIFICATION",
    status: "WARNING"
  },
  {
    id: "LOG-9918",
    timestamp: "2026-02-04 14:30:10",
    actor: "Business: GreenEnergy",
    role: "BUSINESS",
    action: "EVENT_CREATE",
    details: "Submitted new event: 'Sustainable Future Summit'",
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

  const filteredLogs = AUDIT_LOGS.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "ALL" || log.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "FINANCIAL":
        return "text-emerald-600";
      case "GOVERNANCE":
        return "text-purple-600";
      case "VERIFICATION":
        return "text-orange-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Audit Trail
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium max-w-2xl">
            Immutable forensic log of administrative actions, financial movements, and event approvals.
          </p>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5 w-fit shrink-0 shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-orange-600" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Search & Horizontal Scrollable Category Filter (Peeps out on mobile) */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by Actor, Action ID, or Details..."
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:border-orange-500 text-xs sm:text-sm font-medium shadow-2xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 md:pb-0">
          {[
            { id: "ALL", label: "All Logs" },
            { id: "GOVERNANCE", label: "Governance" },
            { id: "FINANCIAL", label: "Financial" },
            { id: "VERIFICATION", label: "Moderation" },
            { id: "BUSINESS_ACTION", label: "Business" }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                filterCategory === cat.id
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Audit Container (Desktop Table + Mobile Stacked Rows, Colored Text Status) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase font-black text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actor / Role</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500 text-xs whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-xs">{log.actor}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                      {log.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-xs">{log.action}</span>
                      <span className={`text-[10px] font-black uppercase ${getCategoryColor(log.category)}`}>
                        {log.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs max-w-xs truncate">
                    {log.details}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider ${
                        log.status === "SUCCESS" ? "text-emerald-600" : "text-orange-600"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="text-orange-600 hover:bg-orange-50 p-1.5 rounded-lg transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Forensic List (No bulky icon box, colored text metadata) */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold min-w-0">
                  <span className="font-extrabold text-xs text-slate-900">{log.action}</span>
                  <span className="text-slate-300">•</span>
                  <span className={`font-black uppercase text-[10px] ${getCategoryColor(log.category)}`}>
                    {log.category}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider shrink-0 ${
                    log.status === "SUCCESS" ? "text-emerald-600" : "text-orange-600"
                  }`}
                >
                  {log.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{log.details}</p>
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[11px] text-slate-400">
                <span className="font-bold text-slate-600">{log.actor}</span>
                <span className="font-mono">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs font-bold">No audit logs found matching your criteria.</p>
          </div>
        )}

        <div className="bg-slate-50/80 px-4 sm:px-6 py-3.5 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-bold">
          <span>Showing {filteredLogs.length} entries</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
            >
              Prev
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
