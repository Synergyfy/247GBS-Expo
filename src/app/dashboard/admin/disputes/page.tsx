"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Clock,
  MoreHorizontal,
  User,
  Gavel,
  ArrowRight,
  X,
  CheckCircle2,
  Building2,
  FileText,
  DollarSign,
  ShieldCheck,
  Scale
} from "lucide-react";

interface Dispute {
  id: string;
  subject: string;
  complainant: string;
  respondent: string;
  status: "OPEN" | "REVIEW" | "MEDIATE" | "DECIDE";
  priority: "CRITICAL" | "HIGH" | "MEDIUM";
  date: string;
  amount: string;
  details: string;
  evidence: string;
}

const INITIAL_DISPUTES: Dispute[] = [
  {
    id: "DSP-4421",
    subject: "Refund Request: Event Cancelled",
    complainant: "Alice M.",
    respondent: "TechFlow Inc.",
    status: "OPEN",
    priority: "HIGH",
    date: "2h ago",
    amount: "£299.00",
    details:
      "Organizer postponed flagship event 24h before commencement. Attendee is requesting an immediate cash refund per platform escrow rules.",
    evidence:
      "Booking ref #BKG-9941. Attendee registered complaint within 48h SLA. Organizer offered non-refundable voucher."
  },
  {
    id: "DSP-4422",
    subject: "Ticket Not Received",
    complainant: "Bob D.",
    respondent: "Expo Organizer",
    status: "REVIEW",
    priority: "MEDIUM",
    date: "5h ago",
    amount: "£50.00",
    details:
      "Payment went through gateway successfully, but barcode token was not minted into the attendee's ticket vault due to webhook timeout.",
    evidence:
      "Stripe charge ID ch_3L9x0021A matched. Gateway settled £50.00. Pass generation script failed on ticket sync."
  },
  {
    id: "DSP-4420",
    subject: "Vendor Misrepresentation",
    complainant: "Sarah J.",
    respondent: "GreenEnergy Booth",
    status: "MEDIATE",
    priority: "CRITICAL",
    date: "1d ago",
    amount: "N/A",
    details:
      "Exhibitor promoted uncertified green technology claiming official ISO verification. Compliance team flagged the booth for misleading claims.",
    evidence:
      "Booth audit photo evidence uploaded. Certification registry returned zero records for registration #GEN-88."
  },
  {
    id: "DSP-4418",
    subject: "Duplicate Charge",
    complainant: "Mike R.",
    respondent: "Platform",
    status: "DECIDE",
    priority: "HIGH",
    date: "2d ago",
    amount: "£150.00",
    details:
      "Parallel checkout requests resulted in dual transaction entries for a single registered pass on checkout session #SES-881.",
    evidence:
      "Payment gateway confirms 2 authorizations 1.2s apart. Database records only 1 ticket pass issued."
  }
];

const STAGES: { id: Dispute["status"]; label: string; color: string }[] = [
  { id: "OPEN", label: "Open Intake", color: "border-slate-300" },
  { id: "REVIEW", label: "Under Review", color: "border-blue-500" },
  { id: "MEDIATE", label: "Mediation", color: "border-purple-500" },
  { id: "DECIDE", label: "Final Decision", color: "border-orange-500" }
];

export default function DisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>(INITIAL_DISPUTES);
  const [mobileStage, setMobileStage] = useState<string>("ALL");
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleUpdateStatus = (disputeId: string, newStatus: Dispute["status"]) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === disputeId ? { ...d, status: newStatus } : d))
    );
    if (selectedDispute && selectedDispute.id === disputeId) {
      setSelectedDispute({ ...selectedDispute, status: newStatus });
    }
    const targetStage = STAGES.find((s) => s.id === newStatus)?.label || newStatus;
    showToast(`Case ${disputeId} moved to ${targetStage}`);
  };

  const handleApproveRefund = (dispute: Dispute) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === dispute.id ? { ...d, status: "DECIDE" } : d))
    );
    setSelectedDispute(null);
    showToast(`Refund of ${dispute.amount} approved for ${dispute.complainant}`);
  };

  const handleDismissDispute = (dispute: Dispute) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === dispute.id ? { ...d, status: "DECIDE" } : d))
    );
    setSelectedDispute(null);
    showToast(`Dispute ${dispute.id} dismissed in favor of ${dispute.respondent}`);
  };

  const handleEscalateMediation = (dispute: Dispute) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === dispute.id ? { ...d, status: "MEDIATE" } : d))
    );
    setSelectedDispute(null);
    showToast(`Dispute ${dispute.id} escalated to arbitration mediation`);
  };

  const handleIssueRulingHeader = () => {
    // Open the first pending dispute for review
    const pending =
      disputes.find((d) => d.status === "OPEN" || d.status === "REVIEW") || disputes[0];
    if (pending) {
      setSelectedDispute(pending);
    } else {
      showToast("All active disputes currently resolved");
    }
  };

  const mobileFiltered =
    mobileStage === "ALL"
      ? disputes
      : disputes.filter((d) => d.status === mobileStage);

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 relative">
      {/* Toast Notification — Smooth Slide-in with framer-motion */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed top-20 sm:top-24 right-4 sm:right-6 z-[9999] bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-xl shadow-xl border border-white/10 flex items-center gap-2.5 max-w-xs sm:max-w-sm pointer-events-auto"
          >
            <div className="w-5 h-5 rounded-lg bg-orange-600 flex items-center justify-center shrink-0 text-white">
              <CheckCircle2 className="w-3 h-3" />
            </div>
            <p className="text-[11px] sm:text-xs font-semibold flex-1 leading-tight">{toastMessage}</p>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase truncate">
            Dispute Center
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
            Arbitration workflow for customer and business disputes.
          </p>
        </div>
        <button
          type="button"
          onClick={handleIssueRulingHeader}
          className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs hover:bg-orange-700 transition-all shadow-sm w-fit shrink-0 cursor-pointer"
        >
          <Gavel className="w-3.5 h-3.5" />
          <span>Issue Ruling</span>
        </button>
      </div>

      {/* MOBILE & TABLET VIEW (< lg): Horizontal Stage Filter + Stacked List */}
      <div className="lg:hidden space-y-3.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5">
          <button
            type="button"
            onClick={() => setMobileStage("ALL")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              mobileStage === "ALL"
                ? "bg-orange-600 text-white shadow-xs"
                : "bg-white border border-slate-200/80 text-slate-600"
            }`}
          >
            All ({disputes.length})
          </button>
          {STAGES.map((stage) => {
            const count = disputes.filter((d) => d.status === stage.id).length;
            const isActive = mobileStage === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setMobileStage(stage.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? "bg-orange-600 text-white shadow-xs"
                    : "bg-white border border-slate-200/80 text-slate-600"
                }`}
              >
                {stage.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Unified Mobile Dispute List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {mobileFiltered.map((item) => {
            const stageObj = STAGES.find((s) => s.id === item.status);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedDispute(item)}
                className="p-4 space-y-2 hover:bg-slate-50/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-black ${
                        item.priority === "CRITICAL"
                          ? "text-red-600"
                          : item.priority === "HIGH"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }`}
                    >
                      {item.priority}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 font-mono">{item.id}</span>
                  </div>
                  <span className="text-slate-500 font-bold">{stageObj?.label}</span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-sm">{item.subject}</h4>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold">{item.complainant}</span>
                    <span className="text-slate-300">vs</span>
                    <span className="font-semibold">{item.respondent}</span>
                  </div>
                  <span className="font-extrabold text-slate-900">Claim: {item.amount}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="flex items-center gap-1 text-slate-400 font-medium">
                    <Clock className="w-3 h-3" /> {item.date}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDispute(item);
                    }}
                    className="font-bold text-orange-600 inline-flex items-center gap-1 hover:text-orange-700 cursor-pointer"
                  >
                    <span>Review Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {mobileFiltered.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs font-medium">
              No disputes found in this category
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP KANBAN BOARD (lg:grid-cols-4) */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-5">
        {STAGES.map((stage) => {
          const stageItems = disputes.filter((d) => d.status === stage.id);

          return (
            <div key={stage.id} className="flex flex-col">
              <div
                className={`flex items-center justify-between p-3.5 bg-white border-t-4 ${stage.color} rounded-t-2xl border-x border-b border-slate-200/80 mb-3`}
              >
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
                  {stage.label}
                </h3>
                <span className="text-slate-500 text-xs font-black">{stageItems.length}</span>
              </div>

              <div className="space-y-3">
                {stageItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedDispute(item)}
                    className="bg-white p-4 rounded-2xl shadow-2xs border border-slate-200/80 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider ${
                          item.priority === "CRITICAL"
                            ? "text-red-600"
                            : item.priority === "HIGH"
                            ? "text-orange-600"
                            : "text-blue-600"
                        }`}
                      >
                        {item.priority} PRIORITY
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDispute(item);
                        }}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 rounded"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-0.5 line-clamp-2">
                      {item.subject}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-400 mb-3 font-mono">
                      ID: {item.id}
                    </p>

                    <div className="space-y-1.5 mb-3 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.complainant}</span>
                        <span className="text-slate-300">vs</span>
                        <span className="truncate">{item.respondent}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-extrabold text-slate-800">
                        <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>Claim: {item.amount}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.date}
                      </span>
                      <span className="font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        <span>Review</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}

                {stageItems.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl">
                    No active disputes
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CASE REVIEW & ARBITRATION RULING MODAL */}
      {selectedDispute && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                    {selectedDispute.id}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      selectedDispute.priority === "CRITICAL"
                        ? "bg-red-50 text-red-600 border border-red-200"
                        : selectedDispute.priority === "HIGH"
                        ? "bg-orange-50 text-orange-600 border border-orange-200"
                        : "bg-blue-50 text-blue-600 border border-blue-200"
                    }`}
                  >
                    {selectedDispute.priority}
                  </span>
                  <span className="text-xs font-bold text-slate-400">•</span>
                  <span className="text-xs font-bold text-slate-500">
                    {STAGES.find((s) => s.id === selectedDispute.status)?.label}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {selectedDispute.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDispute(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Parties & Claim Info */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                  <User className="w-3 h-3" /> Complainant
                </span>
                <span className="font-extrabold text-slate-900 block truncate">
                  {selectedDispute.complainant}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> Respondent
                </span>
                <span className="font-extrabold text-slate-900 block truncate">
                  {selectedDispute.respondent}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> Claim Amount
                </span>
                <span className="font-black text-orange-600 block">
                  {selectedDispute.amount}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Filed Time
                </span>
                <span className="font-extrabold text-slate-700 block">
                  {selectedDispute.date}
                </span>
              </div>
            </div>

            {/* Case Background & Details */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                Case Details
              </span>
              <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                {selectedDispute.details}
              </p>
            </div>

            {/* Forensic Evidence Log */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" /> Evidence & Audit Record
              </span>
              <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] leading-relaxed">
                {selectedDispute.evidence}
              </div>
            </div>

            {/* Advance Case Stage */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                Workflow Stage
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {STAGES.map((stg) => {
                  const isCurrent = selectedDispute.status === stg.id;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => handleUpdateStatus(selectedDispute.id, stg.id)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-center transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                      }`}
                    >
                      {stg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ruling Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                Issue Ruling
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleApproveRefund(selectedDispute)}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Approve Refund</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDismissDispute(selectedDispute)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Dismiss Claim</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleEscalateMediation(selectedDispute)}
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Escalate</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedDispute(null)}
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
