"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  User,
  Store,
  MoreVertical,
  Gavel,
  X
} from "lucide-react";

export default function SupportCenterPage() {
  const [activeTab, setActiveTab] = useState("open");
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<"All" | "High" | "Medium" | "Low">("All");
  const [tickets, setTickets] = useState([
    {
      id: "SUP-9921",
      user: "John Doe",
      business: "Global Tech Corp",
      reason: "Pass Token validation assistance",
      status: "Open",
      priority: "High",
      time: "2h ago"
    },
    {
      id: "SUP-9942",
      user: "Sarah Lane",
      business: "Urban Threads Co.",
      reason: "Duplicate season pass charge inquiry",
      status: "Reviewing",
      priority: "Medium",
      time: "5h ago"
    },
    {
      id: "SUP-9955",
      user: "Alex Chen",
      business: "Skyline Media",
      reason: "Booth live stream configuration question",
      status: "Awaiting Reply",
      priority: "Low",
      time: "1d ago"
    }
  ]);
  const [selectedTicket, setSelectedTicket] = useState<(typeof tickets)[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const [resolveTarget, setResolveTarget] = useState<(typeof tickets)[0] | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const cyclePriority = () => {
    const order: Array<"All" | "High" | "Medium" | "Low"> = ["All", "High", "Medium", "Low"];
    setPriorityFilter((prev) => order[(order.indexOf(prev) + 1) % order.length]);
  };

  const filtered = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === "All" || t.priority === priorityFilter;
    const matchesTab =
      activeTab === "closed"
        ? t.status === "Resolved"
        : activeTab === "arbitration"
        ? t.status === "Escalated"
        : t.status !== "Resolved";
    return matchesSearch && matchesPriority && matchesTab;
  });

  return (
    <div className="space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header (No decorative status pill) */}
      <div>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
          Platform Support & Helpdesk
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Resolve attendee inquiries, exhibitor technical requests, and CHS live chat escalations.
        </p>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="flex gap-5 sm:gap-8 border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { id: "open", label: "Active Tickets", count: 14, icon: <AlertCircle className="w-4 h-4" /> },
          { id: "arbitration", label: "Escalated", count: 3, icon: <Gavel className="w-4 h-4" /> },
          { id: "closed", label: "Resolved", count: 128, icon: <CheckCircle2 className="w-4 h-4" /> }
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
            <span className="text-[10px] font-black opacity-75">({tab.count})</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Search & Priority Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Ticket ID, User, or Business..."
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:border-orange-500 text-xs sm:text-sm font-medium shadow-2xs"
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
        <button
          type="button"
          onClick={cyclePriority}
          className={`px-4 py-2.5 border rounded-xl inline-flex items-center justify-center gap-1.5 text-xs font-bold shadow-2xs w-fit cursor-pointer transition-colors ${
            priorityFilter !== "All"
              ? "bg-orange-50 border-orange-300 text-orange-700"
              : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Filter className="w-3.5 h-3.5 text-orange-600" />
          <span>Priority: {priorityFilter}</span>
        </button>
      </div>

      {/* Unified Support Tickets Container (No bulky left icon box, colored text priority) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden divide-y divide-slate-100">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 hover:bg-slate-50/60 transition-colors"
          >
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center justify-between sm:justify-start gap-2 text-[11px] font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-400 uppercase tracking-wider">
                    {d.id}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">{d.time}</span>
                </div>
                <span
                  className={`font-black uppercase tracking-wider ${
                    d.priority === "High"
                      ? "text-red-600"
                      : d.priority === "Medium"
                      ? "text-amber-600"
                      : "text-blue-600"
                  }`}
                >
                  {d.priority} Priority
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                {d.reason}
              </h3>

              <div className="flex flex-wrap items-center gap-3.5 text-xs text-slate-600 font-medium pt-0.5">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-600" /> {d.user}
                </span>
                <span className="flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-orange-600" /> {d.business}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2.5 lg:pt-0 border-t border-slate-100 lg:border-0 shrink-0 relative">
              <button
                type="button"
                onClick={() => setSelectedTicket(d)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open Ticket</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setOpenMenuId((prev) => (prev === d.id ? null : d.id))}
                className="p-2 border border-slate-200/80 text-slate-400 rounded-xl hover:bg-slate-50 cursor-pointer"
                aria-label="Ticket options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {openMenuId === d.id && (
                <div className="absolute right-0 top-12 z-30 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setTickets((prev) =>
                        prev.map((t) => (t.id === d.id ? { ...t, status: "Escalated", priority: "High" } : t))
                      );
                      setOpenMenuId(null);
                      showToast(`Ticket ${d.id} escalated to Arbitration.`);
                    }}
                    className="w-full text-left px-3.5 py-2 text-amber-700 hover:bg-amber-50"
                  >
                    Escalate Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResolveTarget(d);
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-3.5 py-2 text-emerald-700 hover:bg-emerald-50"
                  >
                    Mark Resolved
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {toastMsg && (
        <div className="fixed top-6 right-4 sm:right-8 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold">
          {toastMsg}
        </div>
      )}

      {/* Ticket Detail & Reply Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                  {selectedTicket.id} • {selectedTicket.priority} Priority
                </h3>
                <p className="text-[11px] text-slate-500">
                  {selectedTicket.user} ({selectedTicket.business})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                <p className="font-bold text-slate-900 mb-1">{selectedTicket.reason}</p>
                <p>Submitted {selectedTicket.time} • Status: <strong>{selectedTicket.status}</strong></p>
              </div>
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response to the user or exhibitor..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-orange-500"
              />
              <div className="flex justify-between items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const target = selectedTicket;
                    setSelectedTicket(null);
                    setResolveTarget(target);
                  }}
                  className="px-3 py-2 rounded-xl border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-50"
                >
                  Resolve Ticket
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTicket(null)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!replyText.trim()) return;
                      showToast(`Reply sent on ${selectedTicket.id}!`);
                      setReplyText("");
                      setSelectedTicket(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Confirmation Modal */}
      {resolveTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-2xl p-5 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Resolve Support Ticket</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mark ticket <strong className="text-slate-900">{resolveTarget.id}</strong> ({resolveTarget.reason}) as resolved and notify {resolveTarget.user}?
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setResolveTarget(null)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setTickets((prev) =>
                    prev.map((t) => (t.id === resolveTarget.id ? { ...t, status: "Resolved" } : t))
                  );
                  showToast(`Ticket ${resolveTarget.id} marked as Resolved.`);
                  setResolveTarget(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
              >
                Resolve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
