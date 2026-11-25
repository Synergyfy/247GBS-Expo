"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Video,
  User,
  Search,
  Lock,
  AlertTriangle,
  X,
  ExternalLink,
} from "lucide-react";
import {
  ConsultationBooking,
  ConsultationStatus,
  getConsultations,
  decideConsultationBooking,
  CONSULTATIONS_EVENT,
} from "@/data/consultations";

const STATUS_STYLE: Record<
  ConsultationStatus,
  { label: string; badge: string }
> = {
  pending: {
    label: "Pending",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  declined: {
    label: "Declined",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

export default function BusinessConsultationsPage() {
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | ConsultationStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Irreversible Decision Modal
  const [decisionTarget, setDecisionTarget] = useState<{
    booking: ConsultationBooking;
    decision: "confirmed" | "declined";
  } | null>(null);
  const [responseNote, setResponseNote] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    setMounted(true);
    setBookings(getConsultations());
    const sync = () => setBookings(getConsultations());
    window.addEventListener(CONSULTATIONS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSULTATIONS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const openDecisionModal = (
    booking: ConsultationBooking,
    decision: "confirmed" | "declined"
  ) => {
    setDecisionTarget({ booking, decision });
    setResponseNote("");
    setMeetingLink(
      decision === "confirmed"
        ? `https://meet.247gbs.com/booth/${booking.id.toLowerCase()}`
        : ""
    );
  };

  const handleConfirmDecision = () => {
    if (!decisionTarget) return;
    const { booking, decision } = decisionTarget;
    const updated = decideConsultationBooking(
      booking.id,
      decision,
      responseNote,
      meetingLink
    );
    setBookings(updated);
    setDecisionTarget(null);
    showToast(
      `Consultation ${booking.id} ${decision === "confirmed" ? "confirmed" : "declined"} — attendee notified.`
    );
  };

  const filtered = bookings.filter((b) => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchesQuery =
      !q ||
      b.customerName.toLowerCase().includes(q) ||
      b.topic.toLowerCase().includes(q) ||
      b.slot.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
          <CalendarCheck className="w-4 h-4" />
          <span>1-on-1 Booth Appointments</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Booth Consultations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Review and confirm 1-on-1 consultation requests booked by attendees from your virtual booth.
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Total Requests</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Pending</p>
          <p className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Confirmed</p>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{confirmedCount}</p>
        </div>
      </div>

      {/* Search + Status Filters */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search attendee, slot, or topic..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(["all", "pending", "confirmed", "declined"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                statusFilter === st
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
          <CalendarCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No consultation requests</p>
          <p className="text-xs text-slate-500 mt-1">
            When an attendee clicks &ldquo;Book 1-on-1 Consultation&rdquo; on your booth, it appears here live.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const st = STATUS_STYLE[item.status];
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {item.id}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-[11px] font-bold">
                      <Clock className="w-3 h-3" />
                      {item.slot}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${st.badge}`}
                    >
                      {st.label}
                    </span>
                    <span className="text-[11px] text-slate-400">• {item.requestedAt}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{item.customerName}</span>
                    </h3>
                    <span className="text-xs text-slate-500">{item.customerEmail}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {item.topic}
                  </p>

                  {item.status !== "pending" && (
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-slate-500">
                      <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>
                        Final decision recorded{item.decidedAt ? ` (${item.decidedAt})` : ""}
                        {item.responseNote ? ` — "${item.responseNote}"` : ""}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {item.status === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => openDecisionModal(item, "confirmed")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openDecisionModal(item, "declined")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </>
                  )}
                  {item.status === "confirmed" && item.meetingLink && (
                    <a
                      href={item.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Room</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal (Portal + Safe Viewport Insets) */}
      {mounted &&
        decisionTarget &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 pt-20 pb-24 lg:pt-24 lg:pb-8 lg:pl-68">
            <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md max-h-full flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0 bg-white">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={`w-4 h-4 ${
                      decisionTarget.decision === "confirmed"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  />
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {decisionTarget.decision === "confirmed"
                      ? "Confirm 1-on-1 Consultation?"
                      : "Decline Consultation Request?"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDecisionTarget(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4 overflow-y-auto flex-1">
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-xs text-amber-900 font-medium">
                  <strong>Final decision:</strong> This action for{" "}
                  <strong>{decisionTarget.booking.customerName}</strong> ({decisionTarget.booking.slot}) is{" "}
                  <strong>irreversible</strong> and immediately notifies the attendee.
                </div>

                {decisionTarget.decision === "confirmed" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Video Meeting Room Link
                    </label>
                    <input
                      type="url"
                      value={meetingLink}
                      onChange={(e) => setMeetingLink(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {decisionTarget.decision === "confirmed"
                      ? "Message to Attendee (Optional)"
                      : "Reason for Declining (Optional)"}
                  </label>
                  <textarea
                    rows={3}
                    value={responseNote}
                    onChange={(e) => setResponseNote(e.target.value)}
                    placeholder={
                      decisionTarget.decision === "confirmed"
                        ? "e.g. Excited to show you our live demo!"
                        : "e.g. Slot unavailable — please pick Tomorrow at 2:00 PM."
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-100 shrink-0 bg-white">
                <button
                  type="button"
                  onClick={() => setDecisionTarget(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDecision}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold cursor-pointer ${
                    decisionTarget.decision === "confirmed"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {decisionTarget.decision === "confirmed" ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Slot</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Confirm Decline</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
