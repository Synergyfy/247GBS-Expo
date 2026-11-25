"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Clock,
  MoreHorizontal,
  User,
  Gavel,
  ArrowRight
} from "lucide-react";
import {
  INITIAL_DISPUTES,
  STAGES,
  Dispute,
  getStoredDisputes,
  DISPUTES_EVENT
} from "./data";

export default function DisputesPage() {
  const router = useRouter();
  const [disputes, setDisputes] = useState<Dispute[]>(INITIAL_DISPUTES);
  const [mobileStage, setMobileStage] = useState<string>("ALL");

  useEffect(() => {
    setDisputes(getStoredDisputes());
    const sync = () => setDisputes(getStoredDisputes());
    window.addEventListener(DISPUTES_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(DISPUTES_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const mobileFiltered =
    mobileStage === "ALL"
      ? disputes
      : disputes.filter((d) => d.status === mobileStage);

  const handleIssueRuling = () => {
    const target = disputes.find((d) => d.status === "OPEN" || d.status === "REVIEW") || disputes[0];
    if (target) {
      router.push(`/dashboard/admin/disputes/${target.id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
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
          onClick={handleIssueRuling}
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
              <Link
                key={item.id}
                href={`/dashboard/admin/disputes/${item.id}`}
                className="p-3.5 sm:p-4 space-y-1.5 sm:space-y-2 hover:bg-slate-50/60 transition-colors block cursor-pointer group"
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
                    <span className="text-slate-400 font-mono text-[10px]">{item.id}</span>
                  </div>
                  <span className="text-slate-500 font-bold text-[10px] sm:text-xs">{stageObj?.label}</span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-orange-600 transition-colors leading-snug">
                  {item.subject}
                </h4>

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
                  <span className="flex items-center gap-1 text-slate-400 font-medium text-[11px]">
                    <Clock className="w-3 h-3" /> {item.date}
                  </span>
                  <span className="font-bold text-orange-600 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-xs">
                    <span>Review Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
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
                  <Link
                    key={item.id}
                    href={`/dashboard/admin/disputes/${item.id}`}
                    className="bg-white p-4 rounded-2xl shadow-2xs border border-slate-200/80 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group block"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider ${
                            item.priority === "CRITICAL"
                              ? "text-red-600"
                              : item.priority === "HIGH"
                              ? "text-orange-600"
                              : "text-blue-600"
                          }`}
                        >
                          {item.priority}
                        </span>
                      </div>
                      <span className="text-slate-400 group-hover:text-slate-600 p-0.5 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-0.5 line-clamp-2 group-hover:text-orange-600 transition-colors">
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
                  </Link>
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
