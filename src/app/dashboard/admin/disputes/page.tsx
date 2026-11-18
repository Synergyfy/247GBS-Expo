"use client";

import { useState } from "react";
import {
  AlertCircle,
  Clock,
  MoreHorizontal,
  User,
  Gavel,
  ArrowRight
} from "lucide-react";

const DISPUTES = [
  {
    id: "DSP-4421",
    subject: "Refund Request: Event Cancelled",
    complainant: "Alice M.",
    respondent: "TechFlow Inc.",
    status: "OPEN",
    priority: "HIGH",
    date: "2h ago",
    amount: "£299.00"
  },
  {
    id: "DSP-4422",
    subject: "Ticket Not Received",
    complainant: "Bob D.",
    respondent: "Expo Organizer",
    status: "REVIEW",
    priority: "MEDIUM",
    date: "5h ago",
    amount: "£50.00"
  },
  {
    id: "DSP-4420",
    subject: "Vendor Misrepresentation",
    complainant: "Sarah J.",
    respondent: "GreenEnergy Booth",
    status: "MEDIATE",
    priority: "CRITICAL",
    date: "1d ago",
    amount: "N/A"
  },
  {
    id: "DSP-4418",
    subject: "Duplicate Charge",
    complainant: "Mike R.",
    respondent: "Platform",
    status: "DECIDE",
    priority: "HIGH",
    date: "2d ago",
    amount: "£150.00"
  }
];

const STAGES = [
  { id: "OPEN", label: "Open Intake", color: "border-slate-300" },
  { id: "REVIEW", label: "Under Review", color: "border-blue-500" },
  { id: "MEDIATE", label: "Mediation", color: "border-purple-500" },
  { id: "DECIDE", label: "Final Decision", color: "border-orange-500" }
];

export default function DisputesPage() {
  const [mobileStage, setMobileStage] = useState<string>("ALL");

  const mobileFiltered =
    mobileStage === "ALL"
      ? DISPUTES
      : DISPUTES.filter((d) => d.status === mobileStage);

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Dispute Center
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Arbitration workflow for customer and business disputes.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs hover:bg-orange-700 transition-all shadow-sm w-fit shrink-0"
        >
          <Gavel className="w-3.5 h-3.5" />
          <span>Issue Ruling</span>
        </button>
      </div>

      {/* MOBILE & TABLET VIEW (< lg): Peeping Horizontal Stage Filter + Stacked List */}
      <div className="lg:hidden space-y-3.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5">
          <button
            type="button"
            onClick={() => setMobileStage("ALL")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              mobileStage === "ALL"
                ? "bg-orange-600 text-white shadow-xs"
                : "bg-white border border-slate-200/80 text-slate-600"
            }`}
          >
            All ({DISPUTES.length})
          </button>
          {STAGES.map((stage) => {
            const count = DISPUTES.filter((d) => d.status === stage.id).length;
            const isActive = mobileStage === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setMobileStage(stage.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
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

        {/* Unified Mobile Dispute List (Colored Text instead of Pills) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {mobileFiltered.map((item) => {
            const stageObj = STAGES.find((s) => s.id === item.status);
            return (
              <div key={item.id} className="p-4 space-y-2 hover:bg-slate-50/60 transition-colors">
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
                    <span className="text-slate-400">{item.id}</span>
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
                    className="font-bold text-orange-600 inline-flex items-center gap-1"
                  >
                    <span>Review Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP KANBAN BOARD (lg:grid-cols-4) */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-5">
        {STAGES.map((stage) => {
          const stageItems = DISPUTES.filter((d) => d.status === stage.id);

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
                    className="bg-white p-4 rounded-2xl shadow-2xs border border-slate-200/80 hover:border-orange-300 transition-all cursor-pointer group"
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
                      <button type="button" className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-0.5 line-clamp-2">
                      {item.subject}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-400 mb-3">ID: {item.id}</p>

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
                      <span className="font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform">
                        Review &rarr;
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
    </div>
  );
}
