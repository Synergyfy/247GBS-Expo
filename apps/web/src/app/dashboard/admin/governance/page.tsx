"use client";

import { useState, useEffect } from "react";
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
  Globe,
  FileText,
  Edit3
} from "lucide-react";
import Modal from "@/app/component/Modal";
import Tooltip from "@/app/component/Tooltip";

type PolicyCategory = "terms" | "exhibitor" | "gdpr";

interface PolicyDocument {
  id: string;
  category: PolicyCategory;
  title: string;
  version: string;
  status: "Published" | "Draft";
  updatedAt: string;
  content: string;
}

const POLICY_STORAGE_KEY = "expo_governance_policies_v1";

const DEFAULT_POLICIES: PolicyDocument[] = [
  {
    id: "pol-terms-1",
    category: "terms",
    title: "247GBS Digital Expo Platform Terms of Service",
    version: "v2.4",
    status: "Published",
    updatedAt: "Nov 21, 2026",
    content:
      "By accessing 247GBS Digital Expo, purchasing event passes, or participating in virtual trade halls, attendees and exhibitors agree to abide by Central Hub Solution (CHS) conduct, ticketing caps, and MCOM Ecosystem transaction policies."
  },
  {
    id: "pol-exhibitor-1",
    category: "exhibitor",
    title: "Exhibitor Booth & Marketplace SLA Agreement",
    version: "v1.9",
    status: "Published",
    updatedAt: "Nov 20, 2026",
    content:
      "Verified exhibitors must maintain accurate MCOM Mall product listings, honour Super Admin ticket price caps, respond to live visitor inquiries within 24 hours, and fulfil all purchased digital/physical goods per MCOM fulfilment standards."
  },
  {
    id: "pol-gdpr-1",
    category: "gdpr",
    title: "UK GDPR & Data Protection Compliance Policy",
    version: "v3.1",
    status: "Published",
    updatedAt: "Nov 19, 2026",
    content:
      "247GBS Digital Expo processes attendee and business identity data under UK GDPR and CHS governance protocols. Users retain full rights to access, export, rectify, or request erasure of personal data via their Account Settings."
  }
];

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState("parameters");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [allowChsWebhooks, setAllowChsWebhooks] = useState(true);
  const [sandboxMode, setSandboxMode] = useState(false);
  const [enforceMfa, setEnforceMfa] = useState(true);
  const [geoFencing, setGeoFencing] = useState(false);
  const [publicApiKey, setPublicApiKey] = useState("pk_live_51Msz...234xS");
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [configPartner, setConfigPartner] = useState<{ name: string; type: string; status: string } | null>(null);

  // SLA & Policies document management state
  const [policySubTab, setPolicySubTab] = useState<PolicyCategory>("terms");
  const [policies, setPolicies] = useState<PolicyDocument[]>(DEFAULT_POLICIES);
  const [editingPolicy, setEditingPolicy] = useState<PolicyDocument | null>(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState<PolicyDocument | null>(null);
  const [policyForm, setPolicyForm] = useState<{
    title: string;
    version: string;
    status: "Published" | "Draft";
    content: string;
  }>({ title: "", version: "v1.0", status: "Published", content: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(POLICY_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PolicyDocument[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPolicies(parsed);
        }
      }
    } catch {
      // keep defaults
    }
  }, []);

  const persistPolicies = (next: PolicyDocument[]) => {
    setPolicies(next);
    try {
      localStorage.setItem(POLICY_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage quota errors
    }
  };

  const openCreatePolicy = () => {
    setEditingPolicy(null);
    setPolicyForm({ title: "", version: "v1.0", status: "Draft", content: "" });
    setShowPolicyModal(true);
  };

  const openEditPolicy = (doc: PolicyDocument) => {
    setEditingPolicy(doc);
    setPolicyForm({
      title: doc.title,
      version: doc.version,
      status: doc.status,
      content: doc.content
    });
    setShowPolicyModal(true);
  };

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyForm.title.trim() || !policyForm.content.trim()) return;
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    if (editingPolicy) {
      const next = policies.map((p) =>
        p.id === editingPolicy.id
          ? {
              ...p,
              title: policyForm.title.trim(),
              version: policyForm.version.trim() || "v1.0",
              status: policyForm.status,
              content: policyForm.content.trim(),
              updatedAt: today
            }
          : p
      );
      persistPolicies(next);
      showToast("Policy document updated.");
    } else {
      const created: PolicyDocument = {
        id: `pol-${policySubTab}-${Date.now()}`,
        category: policySubTab,
        title: policyForm.title.trim(),
        version: policyForm.version.trim() || "v1.0",
        status: policyForm.status,
        content: policyForm.content.trim(),
        updatedAt: today
      };
      persistPolicies([created, ...policies]);
      showToast("Policy document created.");
    }
    setShowPolicyModal(false);
    setEditingPolicy(null);
  };

  const handleDeletePolicy = () => {
    if (!policyToDelete) return;
    const next = policies.filter((p) => p.id !== policyToDelete.id);
    persistPolicies(next);
    setPolicyToDelete(null);
    showToast("Policy document deleted.");
  };

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
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enforceMfa}
                    onClick={() => {
                      setEnforceMfa((prev) => {
                        showToast(`Admin MFA enforcement ${!prev ? "enabled" : "disabled"}.`);
                        return !prev;
                      });
                    }}
                    className={`w-11 h-6 rounded-full relative cursor-pointer shrink-0 transition-colors ${
                      enforceMfa ? "bg-orange-600" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-xs transition-all ${
                        enforceMfa ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
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
                  <button
                    type="button"
                    role="switch"
                    aria-checked={geoFencing}
                    onClick={() => {
                      setGeoFencing((prev) => {
                        showToast(`Geo-Fencing Validation ${!prev ? "enabled" : "disabled"}.`);
                        return !prev;
                      });
                    }}
                    className={`w-11 h-6 rounded-full relative cursor-pointer shrink-0 transition-colors ${
                      geoFencing ? "bg-orange-600" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-xs transition-all ${
                        geoFencing ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
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
                      <button
                        type="button"
                        onClick={() => setConfigPartner(partner)}
                        className="p-1 text-slate-400 hover:text-orange-600 cursor-pointer"
                        title={`Configure ${partner.name}`}
                      >
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
                  <button
                    type="button"
                    onClick={() => setShowRegenModal(true)}
                    className="text-[11px] text-orange-400 cursor-pointer hover:underline font-bold"
                  >
                    Regenerate
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-400 break-all">
                  {publicApiKey}
                </div>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Allow CHS Webhooks</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={allowChsWebhooks}
                    onClick={() => {
                      setAllowChsWebhooks((prev) => {
                        const next = !prev;
                        showToast(`CHS Webhooks ${next ? "enabled" : "disabled"}.`);
                        return next;
                      });
                    }}
                    className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
                      allowChsWebhooks ? "bg-emerald-500" : "bg-slate-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                        allowChsWebhooks ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Sandbox Mode</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={sandboxMode}
                    onClick={() => {
                      setSandboxMode((prev) => {
                        const next = !prev;
                        showToast(`Sandbox Mode ${next ? "activated" : "deactivated"}.`);
                        return next;
                      });
                    }}
                    className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
                      sandboxMode ? "bg-orange-500" : "bg-slate-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                        sandboxMode ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POLICIES */}
        {activeTab === "policies" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
            {/* Header + Sub-Tabs */}
            <div className="p-4 sm:p-6 border-b border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight">
                    SLA & Legal Policy Documents
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    Create, update, and publish platform Terms, Exhibitor Agreements, and UK GDPR documents.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openCreatePolicy}
                  className="inline-flex items-center justify-center gap-1.5 bg-slate-900 text-white px-3.5 py-2 rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors cursor-pointer shrink-0 w-fit"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Document</span>
                </button>
              </div>

              {/* 3 Dedicated Document Tabs: Terms / Exhibitor / GDPR */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5">
                {(
                  [
                    { id: "terms", label: "Terms Documents" },
                    { id: "exhibitor", label: "Exhibitor Documents" },
                    { id: "gdpr", label: "GDPR Documents" }
                  ] as const
                ).map((sub) => {
                  const count = policies.filter((p) => p.category === sub.id).length;
                  const active = policySubTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setPolicySubTab(sub.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                        active
                          ? "bg-orange-600 text-white border-orange-600 shadow-xs"
                          : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span>{sub.label}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                          active ? "bg-white/20 text-white" : "bg-white text-slate-600 border border-slate-200"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Document List for Active Tab */}
            <div className="p-4 sm:p-6">
              {policies.filter((p) => p.category === policySubTab).length > 0 ? (
                <div className="space-y-3">
                  {policies
                    .filter((p) => p.category === policySubTab)
                    .map((doc) => (
                      <div
                        key={doc.id}
                        className="p-4 rounded-2xl border border-slate-200/80 hover:border-orange-200 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                      >
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                doc.status === "Published"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }`}
                            >
                              {doc.status}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                              {doc.version}
                            </span>
                            <span className="text-[10px] font-medium text-slate-400">
                              Updated {doc.updatedAt}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                            {doc.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {doc.content}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => openEditPolicy(doc)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-orange-300 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPolicyToDelete(doc)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                            aria-label={`Delete ${doc.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="py-10 text-center space-y-3 border border-dashed border-slate-200 rounded-2xl">
                  <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">No documents in this tab yet</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Create a policy document to enforce across all 247GBS Expo halls.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={openCreatePolicy}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Document</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Create / Edit Policy Document Modal */}
      <Modal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        title={
          editingPolicy
            ? "Edit Policy Document"
            : policySubTab === "terms"
            ? "New Terms Document"
            : policySubTab === "exhibitor"
            ? "New Exhibitor Document"
            : "New GDPR Document"
        }
      >
        <form onSubmit={handleSavePolicy} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Document Title
            </label>
            <input
              type="text"
              required
              value={policyForm.title}
              onChange={(e) => setPolicyForm({ ...policyForm, title: e.target.value })}
              placeholder="e.g. Exhibitor Booth SLA 2026"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Version
              </label>
              <input
                type="text"
                required
                value={policyForm.version}
                onChange={(e) => setPolicyForm({ ...policyForm, version: e.target.value })}
                placeholder="v1.0"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Status
              </label>
              <select
                value={policyForm.status}
                onChange={(e) =>
                  setPolicyForm({
                    ...policyForm,
                    status: e.target.value as "Published" | "Draft"
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-orange-500"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Policy Content
            </label>
            <textarea
              rows={5}
              required
              value={policyForm.content}
              onChange={(e) => setPolicyForm({ ...policyForm, content: e.target.value })}
              placeholder="Enter legal terms, SLA commitments, or GDPR clauses..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-orange-500 resize-y"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowPolicyModal(false)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 cursor-pointer"
            >
              {editingPolicy ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Policy Confirmation Modal */}
      <Modal
        isOpen={Boolean(policyToDelete)}
        onClose={() => setPolicyToDelete(null)}
        title="Delete Policy Document"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-bold text-slate-900">{policyToDelete?.title}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setPolicyToDelete(null)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeletePolicy}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Regenerate API Key Confirmation Modal */}
      <Modal
        isOpen={showRegenModal}
        onClose={() => setShowRegenModal(false)}
        title="Regenerate Public API Key"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Regenerating the public API key will immediately invalidate <code className="font-mono text-slate-900">{publicApiKey}</code>. Existing integrations will need the new key.
          </p>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowRegenModal(false)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                const suffix = Math.random().toString(36).substring(2, 7);
                setPublicApiKey(`pk_live_51Msz...${suffix}`);
                setShowRegenModal(false);
                showToast("New Public API Key generated!");
              }}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
            >
              Regenerate
            </button>
          </div>
        </div>
      </Modal>

      {/* Partner Sync Configuration Modal */}
      <Modal
        isOpen={!!configPartner}
        onClose={() => setConfigPartner(null)}
        title={configPartner ? `Configure ${configPartner.name}` : "Partner Config"}
      >
        {configPartner && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Integration scope: <strong className="text-slate-900">{configPartner.type}</strong> • Status:{" "}
              <strong className="text-emerald-600">{configPartner.status}</strong>
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfigPartner(null)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const name = configPartner.name;
                  setConfigPartner(null);
                  showToast(`${name} sync verified and updated!`);
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
              >
                Test & Save Sync
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
