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
  Eye,
  Database,
  FileText,
  Gavel
} from "lucide-react";

export default function ComplianceHubPage() {
  const [activeTab, setActiveTab] = useState("sync");

  const complianceItems = [
    { name: "Global Tech Corp", type: "Identity Verification", date: "12m ago", status: "Verified" },
    { name: "Urban Threads Co.", type: "Event Content Audit", date: "2h ago", status: "Reviewing" },
    { name: "Apex Financial", type: "UK Sanction Check", date: "5h ago", status: "Cleared" }
  ];

  const stats = [
    { label: "Verified Accounts", val: "124.2K", sub: "Active users", icon: <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { label: "Event Compliance", val: "100%", sub: "Moderated listings", icon: <FileCheck className="w-4 h-4 text-orange-600 shrink-0" /> },
    { label: "Flagged Entities", val: "3", sub: "Under review", icon: <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" /> }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Compliance Checks
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Monitor identity synchronization, regulatory screening, and UK GDPR standards.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="bg-white border border-slate-200/80 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 inline-flex items-center gap-1.5 shadow-2xs"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>Audit History</span>
          </button>
          <button
            type="button"
            className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-700 inline-flex items-center gap-1.5 shadow-sm"
          >
            <Gavel className="w-3.5 h-3.5" />
            <span>Legal Requests</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="flex gap-5 sm:gap-8 border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { id: "sync", label: "Identity Verification Sync", icon: <UserCheck className="w-4 h-4" /> },
          { id: "screening", label: "Sanction Screening", icon: <ShieldCheck className="w-4 h-4" /> },
          { id: "data", label: "Data Protection & GDPR", icon: <Lock className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === tab.id ? "text-orange-600" : "text-slate-400 hover:text-slate-900"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "sync" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Horizontal Scroll KPI Cards on Mobile with Peeping Card + Dot Indicator */}
            <div>
              <div className="flex lg:grid lg:grid-cols-3 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="w-[52%] min-w-[172px] sm:w-[200px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="text-[11px] sm:text-xs font-bold text-slate-500 truncate">
                        {s.label}
                      </span>
                      {s.icon}
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-tight">
                      {s.val}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5 truncate">
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-2 lg:hidden">
                <span className="w-4 h-1 rounded-full bg-orange-600" />
                <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1 rounded-full bg-slate-300" />
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                  Regulatory & Sync Feed
                </h3>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search entity..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100">
                      <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Entity
                      </th>
                      <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Check Type
                      </th>
                      <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Timestamp
                      </th>
                      <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Status
                      </th>
                      <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {complianceItems.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4 text-xs sm:text-sm font-bold text-slate-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600 font-medium">
                          {item.type}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400 font-bold uppercase">
                          {item.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-black uppercase tracking-wider ${
                              item.status === "Verified" || item.status === "Cleared"
                                ? "text-emerald-600"
                                : "text-amber-600"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            className="text-orange-600 font-black text-xs uppercase tracking-wider hover:underline"
                          >
                            Inspect Log
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Rows (Colored Status Text) */}
              <div className="md:hidden divide-y divide-slate-100">
                {complianceItems.map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-slate-900 truncate">{item.name}</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {item.type} • {item.date}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className={`text-[11px] font-black uppercase tracking-wider ${
                          item.status === "Verified" || item.status === "Cleared"
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        {item.status}
                      </span>
                      <button
                        type="button"
                        className="text-[11px] font-bold text-orange-600"
                      >
                        Inspect &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DATA PROTECTION TAB */}
        {activeTab === "data" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2 pb-2.5 border-b border-slate-100">
                  <Lock className="w-4 h-4 text-orange-600" /> UK GDPR & Privacy Controls
                </h3>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      Enforce GDPR Compliance
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Auto-anonymize telemetry for UK/EU visitors
                    </p>
                  </div>
                  <div className="w-11 h-6 bg-emerald-500 rounded-full relative cursor-pointer shrink-0">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-xs" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                    Data Retention Period (Months)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="6"
                      max="60"
                      defaultValue="24"
                      className="w-full accent-orange-600"
                    />
                    <span className="font-black text-slate-900 text-xs w-10 text-right">24m</span>
                  </div>
                </div>

                <p className="text-[11px] text-orange-700 font-medium pt-2 border-t border-slate-100 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                  <span>
                    Reducing retention permanently purges archived user logs older than the active threshold.
                  </span>
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-600" /> Data Requests (DSAR)
                  </h3>
                  <span className="text-orange-600 text-xs font-black uppercase">3 Pending</span>
                </div>
                <div className="divide-y divide-slate-100 flex-1">
                  {[
                    { id: "REQ-001", type: "Export", user: "user@example.com" },
                    { id: "REQ-002", type: "Deletion", user: "test@domain.com" },
                    { id: "REQ-003", type: "Export", user: "john.doe@web.com" }
                  ].map((req, i) => (
                    <div key={i} className="flex items-center justify-between py-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-black text-slate-900">{req.id}</span>
                          <span>•</span>
                          <span
                            className={`font-bold uppercase ${
                              req.type === "Deletion" ? "text-red-600" : "text-blue-600"
                            }`}
                          >
                            {req.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{req.user}</p>
                      </div>
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-orange-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-lg">
              <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-orange-400" /> Real-Time Consent Stream
              </h3>
              <div className="divide-y divide-white/10 font-mono text-[11px] sm:text-xs text-slate-400">
                {[
                  { time: "10:42:01", ip: "192.168.1.1", action: "CONSENT_GRANTED", type: "Cookies" },
                  { time: "10:41:55", ip: "10.0.0.55", action: "CONSENT_REVOKED", type: "Marketing" },
                  { time: "10:40:12", ip: "172.16.0.2", action: "CONSENT_GRANTED", type: "Terms" }
                ].map((log, i) => (
                  <div key={i} className="flex flex-wrap items-center justify-between gap-2 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">{log.time}</span>
                      <span className="text-orange-400">{log.ip}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          log.action.includes("GRANTED") ? "text-emerald-400" : "text-red-400"
                        }
                      >
                        {log.action}
                      </span>
                      <span className="text-slate-500">({log.type})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREENING */}
        {activeTab === "screening" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1 uppercase tracking-tight">
              Automated Sanction & AML Screening
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto font-medium">
              UK OFSI sanction checks and AML rules are active across all CHS-connected accounts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
