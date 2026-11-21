"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Ticket,
  Percent,
  Clock,
  ShieldAlert,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Loader2,
  Info,
  ChevronDown,
  Share2,
  Gift,
  Layers,
  Globe
} from "lucide-react";
import Modal from "@/app/component/Modal";
import Tooltip from "@/app/component/Tooltip";

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState("parameters");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-7xl mx-auto relative">
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
        <div className="min-w-0 flex-1">
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Platform Governance
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Configure global platform rules, ticket pricing templates, and ecosystem integrations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => showToast("Governance parameters saved successfully")}
          className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs hover:bg-orange-700 shadow-xs transition-all shrink-0 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save</span>
        </button>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="flex gap-4 sm:gap-7 border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { id: "parameters", label: "System Parameters", icon: <Settings className="w-4 h-4" /> },
          { id: "financial", label: "Commission & Tax", icon: <Percent className="w-4 h-4" /> },
          { id: "ecosystem", label: "Ecosystem & API", icon: <Share2 className="w-4 h-4" /> },
          { id: "policies", label: "SLA & Policies", icon: <ShieldAlert className="w-4 h-4" /> }
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
        {/* SYSTEM PARAMETERS (Flattened, No Nested Double Boxes) */}
        {activeTab === "parameters" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2 pb-2.5 border-b border-slate-100">
                <Clock className="w-4 h-4 text-orange-600" /> Redemption & Expiry
              </h3>
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                    Default Refund Window (Hours)
                  </label>
                  <input
                    type="number"
                    defaultValue={48}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                    Ticket Validity Post-Event (Days)
                  </label>
                  <input
                    type="number"
                    defaultValue={30}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2 pb-2.5 border-b border-slate-100">
                <Gift className="w-4 h-4 text-orange-600" /> MCOM Reward & Loyalty Ratios
              </h3>
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                    Points per £1 Spent
                  </label>
                  <input
                    type="number"
                    defaultValue={10}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                    Redemption Value (Points per £1)
                  </label>
                  <input
                    type="number"
                    defaultValue={100}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs md:col-span-2">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <ShieldAlert className="w-4 h-4 text-orange-600" /> Access & Security Controls
              </h3>
              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between py-3.5">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      Enforce MFA for Admins
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Require multi-factor authentication for all administrative roles
                    </p>
                  </div>
                  <div className="w-11 h-6 bg-orange-600 rounded-full relative cursor-pointer shrink-0">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-xs" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3.5">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      Geo-Fencing Validation
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Restrict live verification terminals by authorized IP location
                    </p>
                  </div>
                  <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer shrink-0">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FINANCIAL */}
        {activeTab === "financial" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs p-4 sm:p-6 space-y-5">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight pb-3 border-b border-slate-100">
              Fee & Tax Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">
                  Platform Commission (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    defaultValue={10}
                    className="w-full pl-3.5 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-orange-500 outline-none"
                  />
                  <Percent className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">
                  Partner/Affiliate Share (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    defaultValue={5}
                    className="w-full pl-3.5 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-orange-500 outline-none"
                  />
                  <Percent className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">
                  Global VAT/Tax Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    defaultValue={20}
                    className="w-full pl-3.5 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-orange-500 outline-none"
                  />
                  <Percent className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-start gap-3 text-xs">
              <ShieldAlert className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <p className="text-slate-600 leading-relaxed font-medium">
                <strong className="text-slate-900">Impact Notice:</strong> Changing commission rates applies to all new transactions immediately. Payouts for held escrow funds use the rate active at the time of sale.
              </p>
            </div>
          </div>
        )}

        {/* ECOSYSTEM & API (Flattened Rows, No Nested Double Boxes) */}
        {activeTab === "ecosystem" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Globe className="w-4 h-4 text-orange-600" /> Ecosystem & Central Solution Sync
              </h3>
              <div className="divide-y divide-slate-100">
                {[
                  { name: "Central Hub Solution (CHS)", type: "Identity & KYB Sync", status: "Active" },
                  { name: "MCOM Mall", type: "Product Auto-Import", status: "Active" },
                  { name: "MCOM Rewards", type: "Loyalty & Pass Sync", status: "Active" },
                  { name: "Stripe Connect", type: "Escrow & Payouts", status: "Active" }
                ].map((partner, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {partner.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">{partner.type}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                        {partner.status}
                      </span>
                      <button type="button" className="p-1 text-slate-400 hover:text-orange-600">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl sm:rounded-3xl text-white shadow-lg space-y-4">
              <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2 pb-3 border-b border-white/10">
                <Share2 className="w-4 h-4 text-orange-400" /> API Access Control
              </h3>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                  Global Rate Limit (Req/Min)
                </label>
                <input
                  type="number"
                  defaultValue={5000}
                  className="w-full px-3.5 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm font-mono focus:border-orange-500 outline-none"
                />
              </div>
              <div className="py-3 border-y border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold">Public API Key</span>
                  <span className="text-[11px] text-orange-400 cursor-pointer hover:underline font-bold">
                    Regenerate
                  </span>
                </div>
                <div className="font-mono text-xs text-slate-400 break-all">
                  pk_live_51Msz...234xS
                </div>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Allow CHS Webhooks</span>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Sandbox Mode</span>
                  <div className="w-10 h-5 bg-slate-600 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POLICIES */}
        {activeTab === "policies" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <ShieldAlert className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1 uppercase tracking-tight">
              Legal & SLA Standards
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto font-medium">
              Platform terms, exhibitor SLAs, and UK GDPR standards are enforced across all halls.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
