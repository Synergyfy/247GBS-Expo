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
  Gavel,
  X,
  CheckCircle2,
  Download,
  Fingerprint
} from "lucide-react";

interface ComplianceItem {
  id: string;
  name: string;
  type: string;
  date: string;
  status: "Verified" | "Reviewing" | "Cleared";
  hash: string;
}

const INITIAL_ITEMS: ComplianceItem[] = [
  {
    id: "COMP-101",
    name: "Global Tech Corp",
    type: "Identity Verification",
    date: "12m ago",
    status: "Verified",
    hash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
  },
  {
    id: "COMP-102",
    name: "Urban Threads Co.",
    type: "Event Content Audit",
    date: "2h ago",
    status: "Reviewing",
    hash: "0x3a4b9c10284eef11029487bbaec385102948bbcd1947e8529348123abc456789"
  },
  {
    id: "COMP-103",
    name: "Apex Financial",
    type: "UK Sanction Check",
    date: "5h ago",
    status: "Cleared",
    hash: "0x98124beef8847192305712957129571029471928471928471928471928471928"
  }
];

interface DsarRequest {
  id: string;
  type: "Export" | "Deletion";
  user: string;
  submitted: string;
  status: "Pending" | "Processed";
}

const INITIAL_DSAR: DsarRequest[] = [
  { id: "REQ-001", type: "Export", user: "user@example.com", submitted: "1 day ago", status: "Pending" },
  { id: "REQ-002", type: "Deletion", user: "test@domain.com", submitted: "2 days ago", status: "Pending" },
  { id: "REQ-003", type: "Export", user: "john.doe@web.com", submitted: "3 days ago", status: "Pending" }
];

export default function ComplianceHubPage() {
  const [activeTab, setActiveTab] = useState("sync");
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>(INITIAL_ITEMS);
  const [dsarRequests, setDsarRequests] = useState<DsarRequest[]>(INITIAL_DSAR);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [inspectLog, setInspectLog] = useState<ComplianceItem | null>(null);
  const [selectedDsar, setSelectedDsar] = useState<DsarRequest | null>(null);
  const [showAuditHistory, setShowAuditHistory] = useState(false);
  const [showLegalRequests, setShowLegalRequests] = useState(false);
  const [gdprEnforced, setGdprEnforced] = useState(true);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredItems = complianceItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Verified Accounts", val: "124.2K", sub: "Active users", icon: <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { label: "Event Compliance", val: "100%", sub: "Moderated listings", icon: <FileCheck className="w-4 h-4 text-orange-600 shrink-0" /> },
    { label: "Flagged Entities", val: "3", sub: "Under review", icon: <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" /> }
  ];

  const handleUpdateStatus = (item: ComplianceItem, newStatus: ComplianceItem["status"]) => {
    setComplianceItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: newStatus } : i))
    );
    showToast(`${item.name} verification status set to ${newStatus}`);
    setInspectLog(null);
  };

  const handleProcessDsar = (req: DsarRequest) => {
    setDsarRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "Processed" } : r))
    );
    showToast(
      req.type === "Export"
        ? `GDPR data archive generated and dispatched to ${req.user}`
        : `Personal data purged for ${req.user}`
    );
    setSelectedDsar(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 sm:top-24 right-4 sm:right-8 z-[9999] bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 max-w-sm sm:max-w-md animate-in fade-in slide-in-from-top-3">
          <div className="w-7 h-7 rounded-xl bg-orange-600 flex items-center justify-center shrink-0 text-white">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold flex-1">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
            onClick={() => setShowAuditHistory(true)}
            className="bg-white border border-slate-200/80 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>Audit History</span>
          </button>
          <button
            type="button"
            onClick={() => setShowLegalRequests(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-700 inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
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
            className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
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
            {/* Horizontal Scroll KPI Cards on Mobile */}
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
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
                            onClick={() => setInspectLog(item)}
                            className="text-orange-600 font-black text-xs uppercase tracking-wider hover:underline cursor-pointer"
                          >
                            Inspect Log
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Rows */}
              <div className="md:hidden divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between gap-3">
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
                        onClick={() => setInspectLog(item)}
                        className="text-[11px] font-bold text-orange-600 cursor-pointer"
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
                  <button
                    type="button"
                    onClick={() => {
                      const nextVal = !gdprEnforced;
                      setGdprEnforced(nextVal);
                      showToast(`GDPR compliance auto-anonymization ${nextVal ? "enabled" : "disabled"}`);
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ${
                      gdprEnforced ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                    aria-label="Toggle GDPR Compliance"
                  >
                    <span
                      className={`block w-5 h-5 bg-white rounded-full shadow-xs transition-transform transform ${
                        gdprEnforced ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
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
                      className="w-full accent-orange-600 cursor-pointer"
                      onChange={(e) => showToast(`Retention adjusted to ${e.target.value} months`)}
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
                  <span className="text-orange-600 text-xs font-black uppercase">
                    {dsarRequests.filter((r) => r.status === "Pending").length} Pending
                  </span>
                </div>
                <div className="divide-y divide-slate-100 flex-1">
                  {dsarRequests.map((req) => (
                    <div key={req.id} className="flex items-center justify-between py-3">
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
                          {req.status === "Processed" && (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                              Processed
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{req.user}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedDsar(req)}
                        className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                        title="View DSAR Request"
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
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center space-y-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1 uppercase tracking-tight">
                Automated Sanction & AML Screening
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto font-medium">
                UK OFSI sanction checks and AML rules are active across all CHS-connected accounts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast("All connected accounts checked against UK OFSI sanctions list (0 hits)")}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Run Global AML Scan
            </button>
          </div>
        )}
      </div>

      {/* 1. INSPECT LOG FORENSIC MODAL */}
      {inspectLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Compliance Inspection</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {inspectLog.name} • {inspectLog.type}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectLog(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-slate-500 font-bold">Verification Status</span>
                <span className="font-black uppercase text-emerald-600">{inspectLog.status}</span>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                  Forensic Cryptographic Hash
                </span>
                <p className="font-mono text-[11px] bg-slate-900 text-slate-200 p-2.5 rounded-xl break-all">
                  {inspectLog.hash}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <p className="font-bold text-slate-700">Audit Checkpoint Summary</p>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  KYB verification submitted via Companies House gateway. Sanction screening returned clear with no PEP flags.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleUpdateStatus(inspectLog, "Cleared")}
                className="px-3.5 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Mark Cleared
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInspectLog(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DSAR REQUEST PROCESS MODAL */}
      {selectedDsar && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">DSAR Request Review</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedDsar.id} • {selectedDsar.type} Request
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDsar(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Requester Email:</span>
                <span className="font-bold text-slate-800">{selectedDsar.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Submitted:</span>
                <span className="font-bold text-slate-800">{selectedDsar.submitted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">UK GDPR SLA:</span>
                <span className="font-bold text-emerald-600">28 Days Remaining</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {selectedDsar.type === "Export"
                ? "This will generate an encrypted zip archive containing all telemetry, booking history, and receipts, sending a secure download link to the requester."
                : "This will permanently purge this user's profile and marketing telemetry across the platform in compliance with GDPR Right to Erasure."}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedDsar(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleProcessDsar(selectedDsar)}
                className={`px-4 py-2 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                  selectedDsar.type === "Deletion"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                {selectedDsar.type === "Deletion" ? "Purge Data" : "Export Archive"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. AUDIT HISTORY MODAL */}
      {showAuditHistory && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Compliance Audit History</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Past regulatory checks and verification logs
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAuditHistory(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto divide-y divide-slate-100 text-xs">
              {[
                { date: "Feb 05, 2026", title: "Quarterly GDPR Telemetry Audit", result: "100% Pass" },
                { date: "Jan 18, 2026", title: "OFSI Sanctions Sync Pass", result: "0 Violations" },
                { date: "Dec 12, 2025", title: "PCI-DSS Level 2 Penetration Test", result: "Certified" }
              ].map((h, idx) => (
                <div key={idx} className="pt-2 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{h.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{h.date}</p>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {h.result}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  showToast("Compliance audit pack downloaded");
                  setShowAuditHistory(false);
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit Pack</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. LEGAL REQUESTS MODAL */}
      {showLegalRequests && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Legal & Subpoena Registry</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Regulatory subpoenas and law enforcement inquiries
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowLegalRequests(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 text-center space-y-2">
              <Fingerprint className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-bold text-slate-800">No Active Subpoenas</p>
              <p className="text-slate-400 text-[11px]">
                Platform is currently in good standing with 0 active legal inquiries.
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowLegalRequests(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
