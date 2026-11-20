"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  User,
  Building2,
  DollarSign,
  FileText,
  ShieldCheck,
  Scale,
  X,
  CheckCircle2,
  AlertCircle,
  History,
  Send,
  Lock,
  Calendar
} from "lucide-react";
import { INITIAL_DISPUTES, STAGES, Dispute } from "../data";

export default function DisputeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id as string;

  const initialDispute =
    INITIAL_DISPUTES.find((d) => d.id.toLowerCase() === rawId?.toLowerCase()) ||
    INITIAL_DISPUTES[0];

  const [dispute, setDispute] = useState<Dispute>(initialDispute);
  const [internalNote, setInternalNote] = useState("");
  const [timeline, setTimeline] = useState([
    {
      actor: dispute.complainant,
      action: "Dispute Logged",
      time: dispute.date,
      desc: "Complainant submitted formal dispute and requested platform review."
    },
    {
      actor: "Escrow Protocol",
      action: "Funds Frozen",
      time: "1h ago",
      desc: `Automated hold placed on payout settlement batch for ${dispute.respondent}.`
    },
    {
      actor: "Compliance Officer",
      action: "Case Assigned",
      time: "45m ago",
      desc: "Case triaged and placed in compliance review queue."
    }
  ]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleUpdateStage = (newStage: Dispute["status"]) => {
    setDispute((prev) => ({ ...prev, status: newStage }));
    const stageName = STAGES.find((s) => s.id === newStage)?.label || newStage;
    setTimeline((prev) => [
      {
        actor: "Admin",
        action: `Moved to ${stageName}`,
        time: "Just now",
        desc: `Case stage transitioned to ${stageName}.`
      },
      ...prev
    ]);
    showToast(`Case stage changed to ${stageName}`);
  };

  const handleApproveRefund = () => {
    setDispute((prev) => ({ ...prev, status: "DECIDE" }));
    setTimeline((prev) => [
      {
        actor: "Admin",
        action: "Ruling: Refund Approved",
        time: "Just now",
        desc: `Authorized refund release of ${dispute.amount} to ${dispute.complainant}.`
      },
      ...prev
    ]);
    showToast(`Refund of ${dispute.amount} approved for ${dispute.complainant}`);
  };

  const handleDismissDispute = () => {
    setDispute((prev) => ({ ...prev, status: "DECIDE" }));
    setTimeline((prev) => [
      {
        actor: "Admin",
        action: "Ruling: Claim Dismissed",
        time: "Just now",
        desc: `Dispute dismissed in favor of ${dispute.respondent}. Escrow hold released.`
      },
      ...prev
    ]);
    showToast(`Dispute dismissed in favor of ${dispute.respondent}`);
  };

  const handleEscalateMediation = () => {
    setDispute((prev) => ({ ...prev, status: "MEDIATE" }));
    setTimeline((prev) => [
      {
        actor: "Admin",
        action: "Ruling: Escalated to Mediation",
        time: "Just now",
        desc: "Dispute transferred to external mediation arbitration board."
      },
      ...prev
    ]);
    showToast(`Case ${dispute.id} escalated to mediation board`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNote.trim()) return;
    setTimeline((prev) => [
      {
        actor: "Admin Note",
        action: "Investigation Entry",
        time: "Just now",
        desc: internalNote.trim()
      },
      ...prev
    ]);
    setInternalNote("");
    showToast("Investigation note recorded");
  };

  const currentStageObj = STAGES.find((s) => s.id === dispute.status);

  return (
    <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4 pb-24 lg:pb-12 relative">
      {/* Toast Notification — Smooth Slide-in */}
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

      {/* Back button & Navigation */}
      <div>
        <Link
          href="/dashboard/admin/disputes"
          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Disputes</span>
        </Link>
      </div>

      {/* Main Header — Compact & Refined */}
      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded">
              {dispute.id}
            </span>
            <span
              className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                dispute.priority === "CRITICAL"
                  ? "bg-red-50 text-red-600 border border-red-100"
                  : dispute.priority === "HIGH"
                  ? "bg-orange-50 text-orange-600 border border-orange-100"
                  : "bg-blue-50 text-blue-600 border border-blue-100"
              }`}
            >
              {dispute.priority}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500">
              {currentStageObj?.label}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-400 font-medium">
            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
            <span>{dispute.date}</span>
            {dispute.sla && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-orange-600 font-bold">{dispute.sla}</span>
              </>
            )}
          </div>
        </div>

        <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight leading-snug">
          {dispute.subject}
        </h1>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Left Column (2 Cols): Case Information & Evidence */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {/* Parties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Complainant */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3 text-blue-600" /> Complainant
                </span>
                <span className="text-[9px] font-bold uppercase bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                  Claimant
                </span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">{dispute.complainant}</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">{dispute.complainantEmail}</p>
              </div>
            </div>

            {/* Respondent */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-purple-600" /> Respondent
                </span>
                <span className="text-[9px] font-bold uppercase bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">
                  Exhibitor
                </span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">{dispute.respondent}</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">{dispute.respondentEmail}</p>
              </div>
            </div>
          </div>

          {/* Incident Description */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
            <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
              <span>Incident Details</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-100">
              {dispute.details}
            </p>
          </div>

          {/* Forensic Evidence & Audit Record */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
            <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Forensic Evidence</span>
            </h3>
            <div className="bg-slate-950 text-emerald-400 font-mono text-[10px] sm:text-[11px] p-3 rounded-xl leading-relaxed overflow-x-auto shadow-inner border border-slate-800">
              <div className="text-slate-400 text-[9px] mb-1 uppercase tracking-widest pb-1 border-b border-slate-800">
                // FORENSIC AUDIT RECORD • HASH VERIFIED
              </div>
              {dispute.evidence}
            </div>
          </div>

          {/* Audit History & Investigation Timeline */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5">
            <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span>Case History</span>
            </h3>

            <div className="space-y-2 divide-y divide-slate-100">
              {timeline.map((item, idx) => (
                <div key={idx} className="pt-2 first:pt-0 space-y-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-900">{item.action}</span>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  <p className="text-[10px] text-slate-400">By: {item.actor}</p>
                </div>
              ))}
            </div>

            {/* Add note — Clean, single-line input + button on all screen sizes */}
            <form onSubmit={handleAddNote} className="pt-2 border-t border-slate-100 flex items-center gap-1.5 sm:gap-2">
              <input
                type="text"
                placeholder="Add note..."
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                className="flex-1 min-w-0 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-orange-500 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="whitespace-nowrap shrink-0 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors inline-flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Send className="w-3 h-3 shrink-0" />
                <span>Add Note</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (1 Col): Ruling Actions & Workflow Stage */}
        <div className="space-y-3 sm:space-y-4">
          {/* Ruling Actions */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5">
            <div>
              <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-800">
                Arbitration Ruling
              </h3>
              <p className="text-[10px] text-slate-500">
                Issue a legally binding settlement decision.
              </p>
            </div>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={handleApproveRefund}
                className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Approve Refund ({dispute.amount})</span>
              </button>

              <button
                type="button"
                onClick={handleDismissDispute}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <X className="w-3.5 h-3.5" />
                <span>Dismiss Dispute</span>
              </button>

              <button
                type="button"
                onClick={handleEscalateMediation}
                className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Escalate to Mediation</span>
              </button>
            </div>
          </div>

          {/* Workflow Stage Advancement */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div>
              <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-800">
                Workflow Stage
              </h3>
              <p className="text-[10px] text-slate-500">
                Current: <span className="font-bold text-slate-700">{currentStageObj?.label}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {STAGES.map((stg) => {
                const isActive = dispute.status === stg.id;
                return (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => handleUpdateStage(stg.id)}
                    className={`py-1.5 px-2 rounded-lg text-[10px] sm:text-[11px] font-bold text-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100"
                    }`}
                  >
                    {stg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Financial & Security Overview */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-800">
              Escrow & Security State
            </h3>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] sm:text-[11px]">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3 text-orange-600" /> Escrow Status
                </span>
                <span className="font-bold text-slate-900">Held in Escrow</span>
              </div>

              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] sm:text-[11px]">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-600" /> Dispute Value
                </span>
                <span className="font-black text-orange-600">{dispute.amount}</span>
              </div>

              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] sm:text-[11px]">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-600" /> Category
                </span>
                <span className="font-bold text-slate-700">{dispute.category || "General"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
