"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, RefreshCw, ExternalLink, Save, Check } from "lucide-react";

export default function MyBoothPage() {
  const [activeTab, setActiveTab] = useState("branding");
  const [syncing, setSyncing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChsSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 700);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-5 pb-28">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            My Booth & Storefront
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Logo, banner, and KYB profile are automatically pulled from Central Hub Solution (CHS).
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleChsSync}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-orange-600 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Syncing..." : "Resync CHS"}</span>
          </button>
          <Link
            href="/dashboard/customer/booths/101"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors"
          >
            <span>Live View</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Full-Width Horizontal Tabs */}
      <div className="flex gap-4 border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { id: "branding", label: "CHS Branding Profile" },
          { id: "information", label: "Storefront Info" },
          { id: "contact", label: "Booth Contact" }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2.5 font-bold text-xs uppercase tracking-wider transition-colors relative whitespace-nowrap shrink-0 ${
              activeTab === tab.id
                ? "text-orange-600"
                : "text-slate-400 hover:text-slate-900"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="w-full">
        {/* BRANDING TAB (Single direct container spanning 100% full width, no double container) */}
        {activeTab === "branding" && (
          <div className="w-full space-y-3.5">
            <div className="flex items-center justify-between gap-2 px-0.5">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                  Central Hub Solution (CHS) Brand Assets
                </h3>
                <p className="text-[11px] text-slate-500">
                  Company logo and cover banner are automatically synchronized from your verified CHS business profile.
                </p>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider flex items-center gap-1 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" /> CHS Synced
              </span>
            </div>

            {/* Full-Width Live CHS Banner & Brand Header (Direct card, no double box) */}
            <div className="w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-sm">
              <div className="h-32 sm:h-44 relative w-full">
                <Image
                  src="/main_stage_banner.png"
                  alt="CHS Booth Banner"
                  fill
                  className="object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>

              <div className="p-3.5 sm:p-4 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-600 border border-white/20 text-white font-extrabold text-sm flex items-center justify-center shadow-md shrink-0">
                    AC
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block">
                      CHS Entity ID: RC-884920
                    </span>
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-tight truncate">
                      Acme Corporation Ltd
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      Booth A-101 • Enterprise Cloud & Logistics
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider shrink-0">
                  Auto-Updated from CHS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Legal Entity Name
                </span>
                <span className="font-bold text-slate-900">Acme Corporation Ltd</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  KYB Verification
                </span>
                <span className="font-bold text-emerald-600">Verified on CHS</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  MCOM Mall Store
                </span>
                <span className="font-bold text-orange-600">Connected (Auto-Import)</span>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "information" || activeTab === "contact") && (
          <div className="w-full bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5 space-y-4">
            {activeTab === "information" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Booth Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Acme Corporation"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs sm:text-sm font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Short Booth Tagline
                  </label>
                  <input
                    type="text"
                    defaultValue="Enterprise cloud infrastructure and automated B2B supply chain solutions."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs sm:text-sm font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Full Exhibitor Description
                  </label>
                  <textarea
                    defaultValue="Acme Corporation provides zero-downtime enterprise cloud deployment and global fulfillment nodes integrated directly with MCOM Mall."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none h-24 text-xs sm:text-sm font-medium text-slate-700 resize-none"
                  />
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Booth Representative Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Jane Smith"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs sm:text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      defaultValue="Head of Enterprise Partnerships"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs sm:text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Public Booth Email
                    </label>
                    <input
                      type="email"
                      defaultValue="sales@acmecorp.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs sm:text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Direct Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      defaultValue="+44 20 7946 0921"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs sm:text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-orange-700 shadow-xs transition-all inline-flex items-center gap-1.5"
              >
                {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                <span>{saved ? "Saved!" : "Save Details"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
