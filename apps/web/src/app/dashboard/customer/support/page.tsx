"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  LifeBuoy,
  Plus,
  CheckCircle2,
  Clock,
  Scale,
  AlertCircle,
  X,
  Send,
  ShieldCheck,
  Search,
} from "lucide-react";
import {
  Dispute,
  STAGES,
  getStoredDisputes,
  createCustomerDispute,
  DISPUTES_EVENT,
} from "@/app/dashboard/admin/disputes/data";
import { getStoredUser } from "@/lib/auth";

const STAGE_STYLES: Record<
  Dispute["status"],
  { label: string; badge: string }
> = {
  OPEN: {
    label: "Open Intake",
    badge: "bg-slate-100 text-slate-700 border-slate-200",
  },
  REVIEW: {
    label: "Under Review",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  MEDIATE: {
    label: "Mediation",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  DECIDE: {
    label: "Final Decision",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

const CATEGORIES = [
  "Ticket Refund",
  "Ticketing & Delivery",
  "Booth / Exhibitor Issue",
  "Billing Duplicate",
  "General Support",
];

export default function CustomerSupportPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [statusFilter, setStatusFilter] = useState<"ALL" | Dispute["status"]>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // New Case Form
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [subject, setSubject] = useState("");
  const [respondent, setRespondent] = useState("Expo Organizer");
  const [bookingRef, setBookingRef] = useState("");
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    setMounted(true);
    setDisputes(getStoredDisputes());
    const sync = () => setDisputes(getStoredDisputes());
    window.addEventListener(DISPUTES_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(DISPUTES_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmitCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !details.trim()) return;

    const user = getStoredUser();
    const created = createCustomerDispute({
      category,
      subject,
      respondent,
      amount: amount.trim() ? (amount.trim().startsWith("£") ? amount.trim() : `£${amount.trim()}`) : "N/A",
      bookingRef,
      details,
      complainant: user?.name || "Alex Thompson",
      complainantEmail: user?.email || "alex.thompson@example.com",
    });

    setDisputes(getStoredDisputes());
    setIsModalOpen(false);
    setSubject("");
    setRespondent("Expo Organizer");
    setBookingRef("");
    setAmount("");
    setDetails("");
    showToast(`Case ${created.id} submitted to Platform Admin. You'll be notified of updates.`);
  };

  const filtered = disputes.filter((d) => {
    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchesQuery =
      !q ||
      d.id.toLowerCase().includes(q) ||
      d.subject.toLowerCase().includes(q) ||
      d.respondent.toLowerCase().includes(q) ||
      (d.category || "").toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const activeCount = disputes.filter((d) => d.status !== "DECIDE").length;
  const resolvedCount = disputes.filter((d) => d.status === "DECIDE").length;

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            <LifeBuoy className="w-4 h-4" />
            <span>Attendee Protection & Escrow Support</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Support & Disputes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track ticket refunds, missing passes, or booth issues directly with 247GBS Expo Arbitration.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs sm:text-sm hover:bg-orange-700 transition-colors shadow-sm w-fit cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>File Dispute / Ticket</span>
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Total Cases</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{disputes.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500">In Progress</p>
          <p className="text-xl sm:text-2xl font-black text-blue-600 mt-1">{activeCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Resolved</p>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{resolvedCount}</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search case ID, subject, or booth..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <button
            type="button"
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer ${
              statusFilter === "ALL"
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            All ({disputes.length})
          </button>
          {STAGES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer ${
                statusFilter === st.id
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cases List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
          <ShieldCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No support cases found</p>
          <p className="text-xs text-slate-500 mt-1">
            Need help with a ticket, refund, or exhibitor? File a dispute and our Admin team will review it within 48h.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const st = STAGE_STYLES[item.status];
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        {item.id}
                      </span>
                      {item.category && (
                        <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-bold">
                          {item.category}
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${st.badge}`}
                      >
                        {st.label}
                      </span>
                      <span className="text-[11px] text-slate-400">• {item.date}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {item.subject}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 shrink-0">
                    {item.amount && item.amount !== "N/A" && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 font-extrabold">
                        {item.amount}
                      </span>
                    )}
                    {item.sla && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.sla}</span>
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.details}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  <span>
                    Against: <strong className="text-slate-800">{item.respondent}</strong>
                    {item.bookingRef ? ` • Ref: ${item.bookingRef}` : ""}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <Scale className="w-3.5 h-3.5 text-orange-500" />
                    <span>Synced with Platform Arbitration</span>
                  </span>
                </div>

                {item.ruling && (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 flex items-start gap-2 text-xs text-emerald-900 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Admin Ruling:</strong> {item.ruling}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* New Dispute / Support Modal (Portal + Safe Viewport Insets) */}
      {mounted &&
        isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 pt-20 pb-24 lg:pt-24 lg:pb-8 lg:pl-68">
            <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg max-h-full flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0 bg-white">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                    247GBS Attendee Support
                  </p>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                    File a Dispute or Support Case
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitCase} className="flex flex-col flex-1 min-h-0">
                <div className="p-5 space-y-4 overflow-y-auto flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Issue Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-orange-500"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Exhibitor / Organizer *
                      </label>
                      <input
                        type="text"
                        required
                        value={respondent}
                        onChange={(e) => setRespondent(e.target.value)}
                        placeholder="e.g. FutureTech Systems"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Refund request for Spring 2026 VIP Pass"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Booking / Pass Reference
                      </label>
                      <input
                        type="text"
                        value={bookingRef}
                        onChange={(e) => setBookingRef(e.target.value)}
                        placeholder="e.g. GBX-88219-X22"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Disputed Amount (Optional)
                      </label>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. £99.00"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Details & Evidence *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Describe what happened so our Admin Arbitration team can review and resolve your case..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 flex items-start gap-2 text-[11px] text-slate-600">
                    <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>
                      Your case goes straight to the 247GBS Admin Dispute Center (48h SLA) and you&apos;ll receive real-time notifications on rulings.
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-100 shrink-0 bg-white">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Case</span>
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
