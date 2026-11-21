"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Lock,
  RefreshCw,
  Ban,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  X,
  AlertTriangle,
  Store,
  Tag,
  DollarSign
} from "lucide-react";
import { INITIAL_BUSINESSES, Business } from "../../data";

export default function AdminViewBoothPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id as string;

  const foundBiz =
    INITIAL_BUSINESSES.find(
      (b) => b.id.toLowerCase() === rawId?.toLowerCase() || b.cac.toLowerCase() === rawId?.toLowerCase()
    ) || INITIAL_BUSINESSES[0];

  const [business, setBusiness] = useState<Business>(foundBiz);
  const [activeTab, setActiveTab] = useState<"branding" | "information" | "contact" | "products">("branding");
  const [syncing, setSyncing] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleResync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      showToast(`Companies House profile re-synced for ${business.name}`);
    }, 800);
  };

  const handleToggleSuspend = () => {
    const nextSuspended = !business.suspended;
    setBusiness((prev) => ({ ...prev, suspended: nextSuspended }));
    setShowSuspendModal(false);
    showToast(
      nextSuspended
        ? `Exhibitor ${business.name} suspended from digital expo`
        : `Exhibitor ${business.name} restored to active status`
    );
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEmailModal(false);
    showToast(`Notice dispatched to ${business.email}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-3.5 sm:space-y-4 pb-24 lg:pb-12 relative overflow-x-clip">
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
          href="/dashboard/admin/businesses"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors group cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs hover:border-orange-200"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-orange-600" />
          <span>Back to Registered Businesses</span>
        </Link>
      </div>

      {/* Header — Admin Booth Inspection Bar */}
      <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded">
                {business.cac}
              </span>
              <span
                className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  business.status === "Premium"
                    ? "bg-orange-50 text-orange-600 border border-orange-200"
                    : business.status === "Verified"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    : "bg-blue-50 text-blue-600 border border-blue-200"
                }`}
              >
                {business.status} Tier
              </span>
              {business.suspended && (
                <span className="text-[9px] font-black uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
                  Suspended
                </span>
              )}
              <span className="text-slate-300">•</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500">
                {business.boothNumber || "Booth A-101"}
              </span>
            </div>
            <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
              {business.name}
            </h1>
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{business.location}</span>
              <span className="text-slate-300">•</span>
              <span>Owner: {business.owner}</span>
            </p>
          </div>

          {/* Admin Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={handleResync}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-orange-600 ${syncing ? "animate-spin" : ""}`} />
              <span>{syncing ? "Syncing..." : "Resync CHS"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEmailText(
                  `Hello ${business.owner},\n\nWe are conducting a routine administrative audit of your booth "${business.name}" (${business.cac}). Please verify your catalog and product pricing.`
                );
                setShowEmailModal(true);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>Send Notice</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSuspendModal(true)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                business.suspended
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              <Ban className="w-3.5 h-3.5" />
              <span>{business.suspended ? "Restore Booth" : "Suspend"}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-t border-slate-100 pt-2.5 overflow-x-auto no-scrollbar">
          {[
            { id: "branding", label: "Branding Profile" },
            { id: "information", label: "Storefront Info" },
            { id: "products", label: `Catalog (${business.products?.length || 0})` },
            { id: "contact", label: "Booth Contact" }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-1.5 font-bold text-xs uppercase tracking-wider transition-colors relative whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "text-orange-600"
                  : "text-slate-400 hover:text-slate-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}

      {/* 1. BRANDING PROFILE */}
      {activeTab === "branding" && (
        <div className="space-y-3.5">
          {/* Live Cover Banner & Brand Avatar */}
          <div className="w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-sm">
            <div className="h-32 sm:h-44 relative w-full">
              <Image
                src={business.banner || "/main_stage_banner.png"}
                alt="Booth Banner"
                fill
                className="object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-600 border border-white/20 text-white font-extrabold text-sm flex items-center justify-center shadow-md shrink-0">
                  {business.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block">
                    Entity ID: {business.cac}
                  </span>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight truncate">
                    {business.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {business.boothNumber || "Booth A-101"} • {business.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Legal Entity Name
              </span>
              <span className="font-bold text-slate-900 block truncate">{business.name}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                KYB Verification Status
              </span>
              <span className="font-bold text-emerald-600 block">Verified Entity (CHS Synced)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                MCOM Storefront Integration
              </span>
              <span className="font-bold text-orange-600 block">Live & Active</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. STOREFRONT INFO */}
      {activeTab === "information" && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                Storefront Setup & Description
              </h3>
              <p className="text-[11px] text-slate-500">
                Administrative view of verified storefront copy displayed to expo attendees.
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1 shrink-0">
              <Lock className="w-2.5 h-2.5" /> Read-Only Audit
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Booth Display Name
              </label>
              <input
                type="text"
                readOnly
                value={business.name}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 cursor-not-allowed outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Short Tagline
              </label>
              <input
                type="text"
                readOnly
                value={business.tagline || "Enterprise solutions and verified business products."}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 cursor-not-allowed outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Full Exhibitor Description
              </label>
              <textarea
                readOnly
                value={business.description || "Official verified exhibitor on the 247GBS Digital Expo."}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 h-24 text-xs font-medium text-slate-700 resize-none cursor-not-allowed outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. PRODUCTS & CATALOG */}
      {activeTab === "products" && (
        <div className="space-y-3">
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                MCOM Showcase Catalog
              </h3>
              <p className="text-[11px] text-slate-500">
                Products and services synchronized to this exhibitor&apos;s digital storefront.
              </p>
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
              {business.products?.length || 0} Listed Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {business.products && business.products.length > 0 ? (
              business.products.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between"
                >
                  <div className="h-32 relative bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-slate-900/90 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-md">
                      {item.price}
                    </span>
                  </div>
                  <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-slate-400">Storefront Button</span>
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        {item.buttonLabel}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs bg-white rounded-xl border border-dashed border-slate-200 col-span-full">
                No products currently listed on this booth storefront.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. BOOTH CONTACT */}
      {activeTab === "contact" && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 space-y-4">
          <div className="border-b border-slate-100 pb-2.5">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
              Verified Booth Representatives & Channels
            </h3>
            <p className="text-[11px] text-slate-500">
              Administrative contact coordinates filed during registration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-500" /> Account Owner
              </span>
              <p className="font-bold text-slate-900 text-xs sm:text-sm">{business.owner}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-500" /> Official Email
              </span>
              <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">{business.email}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-500" /> Contact Phone
              </span>
              <p className="font-bold text-slate-900 text-xs sm:text-sm">
                {business.phone || "+44 20 7946 0912"}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-500" /> Official Website
              </span>
              <p className="font-bold text-orange-600 text-xs sm:text-sm truncate">
                {business.website || "https://247gbs.com"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUSPEND CONFIRMATION MODAL */}
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-4 sm:p-5 space-y-3 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                {business.suspended ? "Restore Booth Access" : "Suspend Booth & Storefront"}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {business.suspended
                  ? `Are you sure you want to restore "${business.name}"? Their booth will immediately reappear in the live expo directory.`
                  : `Are you sure you want to suspend "${business.name}"? Their booth and products will be hidden from public attendees.`}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSuspendModal(false)}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleToggleSuspend}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer shadow-xs ${
                  business.suspended
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {business.suspended ? "Restore" : "Suspend"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMAIL / NOTICE MODAL */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-4 sm:p-5 space-y-3 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Dispatch Notice to Exhibitor</h3>
                <p className="text-[11px] text-slate-500">{business.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-3">
              <textarea
                rows={4}
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-orange-500 text-slate-800"
              />
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Send Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
