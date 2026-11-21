"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  DollarSign,
  FileText,
  Globe,
  ShieldCheck,
  Save,
  Plus,
  Trash2,
  HelpCircle,
  Lock,
  Server,
  X,
  CheckCircle2
} from "lucide-react";
import {
  DEFAULT_EVENT_CATEGORIES,
  getStoredCategories,
  saveStoredCategories
} from "@/data/categories";

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState("system");
  const [categories, setCategories] = useState<string[]>(DEFAULT_EVENT_CATEGORIES);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCategories(getStoredCategories());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddCategory = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`Category "${trimmed}" already exists`);
      return;
    }
    const updated = [...categories, trimmed];
    setCategories(updated);
    saveStoredCategories(updated);
    setNewCategoryName("");
    setIsAddingCategory(false);
    showToast(`Category "${trimmed}" added successfully`);
  };

  const handleRemoveCategory = (catToRemove: string) => {
    const updated = categories.filter((c) => c !== catToRemove);
    setCategories(updated);
    saveStoredCategories(updated);
    showToast(`Category "${catToRemove}" removed`);
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    saveStoredCategories(categories);
    setTimeout(() => {
      setIsSaving(false);
      showToast("System configuration and categories saved successfully!");
    }, 400);
  };

  const tabs = [
    { id: "system", label: "System Rules", icon: <Settings className="w-4 h-4" /> },
    { id: "financial", label: "Finance & Tax", icon: <DollarSign className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    { id: "templates", label: "Policy & Templates", icon: <FileText className="w-4 h-4" /> },
    { id: "gateways", label: "Payment Gateways", icon: <Globe className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 sm:top-24 right-4 sm:right-6 z-[9999] bg-slate-900/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-xl shadow-xl border border-white/10 flex items-center gap-2.5 max-w-xs sm:max-w-sm pointer-events-auto animate-in fade-in slide-in-from-top-2">
          <div className="w-5 h-5 rounded-lg bg-orange-600 flex items-center justify-center shrink-0 text-white">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-semibold flex-1 leading-tight">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            System Configuration
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Global system parameters, RBAC permissions, and operational policies.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSaveChanges}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-orange-700 transition-all shadow-md w-fit shrink-0 cursor-pointer disabled:opacity-75"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      {/* Horizontal Scrollable Navigation Tabs (Peeping on mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === tab.id
                ? "bg-orange-600 text-white shadow-xs"
                : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content (Flattened Single Card Container, Zero Nested Double Boxes) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* SYSTEM RULES */}
        {activeTab === "system" && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-5">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-tight">
              Ticket & Access Rules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                  Refund Window (Hours) <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <input
                  type="number"
                  defaultValue={72}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-sm font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Max Tickets Per User
                </label>
                <input
                  type="number"
                  defaultValue={10}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-sm font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECURITY ADMINISTRATION (Flattened, No Double Containers) */}
        {activeTab === "security" && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <section className="space-y-4">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2 uppercase tracking-tight">
                <ShieldCheck className="w-4 h-4 text-orange-600" /> Access Control & MFA
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 divide-y md:divide-y-0 border-b border-slate-100 pb-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">MFA Enforcement</p>
                      <p className="text-[11px] text-slate-500">Mandatory for all Admin roles</p>
                    </div>
                    <div className="w-11 h-6 bg-orange-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">
                      Session Timeout (Minutes)
                    </p>
                    <input
                      type="number"
                      defaultValue={30}
                      className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 md:pt-0">
                  <p className="font-bold text-slate-900 text-xs sm:text-sm mb-2">
                    IP Restrictions (Whitelist)
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add IP Address (e.g. 192.168.1.1)"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      className="bg-slate-900 text-white px-3 rounded-xl hover:bg-orange-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-700 inline-flex items-center gap-1.5">
                      192.168.1.1 <X className="w-3 h-3 cursor-pointer hover:text-red-500" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-orange-600" /> RBAC Permission Matrix
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Manage permissions for Super Admin, Finance, Compliance, and Support roles.
                  </p>
                </div>
                <button
                  type="button"
                  className="text-xs font-black text-orange-600 hover:underline shrink-0"
                >
                  Configure &rarr;
                </button>
              </div>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 pb-2 flex items-center gap-2 uppercase tracking-tight">
                <Server className="w-4 h-4 text-orange-600" /> Infrastructure Security
              </h3>
              <div className="divide-y divide-slate-100">
                {[
                  {
                    label: "Web Application Firewall (WAF)",
                    desc: "Enable advanced Layer 7 protection.",
                    active: true
                  },
                  {
                    label: "DDoS Protection",
                    desc: "Automated traffic scrubbing and rate limiting.",
                    active: true
                  },
                  {
                    label: "Key Management System (KMS)",
                    desc: "Rotate encryption keys every 90 days.",
                    active: false
                  },
                  {
                    label: "Backup Encryption",
                    desc: "AES-256 for all cross-region database backups.",
                    active: true
                  }
                ].map((policy, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">{policy.label}</p>
                      <p className="text-[11px] text-slate-500">{policy.desc}</p>
                    </div>
                    <div
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors shrink-0 ${
                        policy.active ? "bg-orange-600" : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                          policy.active ? "right-1" : "left-1"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* FINANCIAL SETTINGS */}
        {activeTab === "financial" && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <section className="space-y-4">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-tight">
                Commission & Fees
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Platform Service Fee (%)
                  </label>
                  <input
                    type="text"
                    defaultValue="5.0"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Exhibitor Commission (%)
                  </label>
                  <input
                    type="text"
                    defaultValue="2.5"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-sm font-bold"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight">
                Tax Configuration
              </h3>
              <div className="flex items-center justify-between py-3 border-y border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-black text-xs">
                    UK
                  </div>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-slate-900">
                      VAT (United Kingdom)
                    </p>
                    <p className="text-[11px] text-slate-500">Standard rate for exhibition tickets</p>
                  </div>
                </div>
                <span className="font-black text-sm text-slate-900">20%</span>
              </div>
              <button
                type="button"
                className="w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-slate-500 font-bold text-xs hover:border-orange-300 hover:text-orange-600 transition-all inline-flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add Tax Jurisdiction
              </button>
            </section>
          </div>
        )}

        {/* TEMPLATES & CATEGORIES */}
        {activeTab === "templates" && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <section className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight">
                    Event Categories
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Categories synced across platform event creation, filters, and business exhibitors.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(!isAddingCategory)}
                  className="text-orange-600 hover:text-orange-700 font-bold text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200/80 hover:bg-orange-100 transition-colors cursor-pointer shrink-0 w-fit"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingCategory ? "Close" : "New Category"}</span>
                </button>
              </div>

              {/* Inline category input form */}
              {isAddingCategory && (
                <form
                  onSubmit={handleAddCategory}
                  className="p-3 bg-orange-50/70 border border-orange-200 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 animate-in fade-in"
                >
                  <input
                    type="text"
                    autoFocus
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Enter category name (e.g. Artificial Intelligence, Logistics)..."
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500"
                  />
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="submit"
                      disabled={!newCategoryName.trim()}
                      className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      Add Category
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingCategory(false);
                        setNewCategoryName("");
                      }}
                      className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Dynamic Categories List */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl flex items-center gap-2 hover:border-slate-300 transition-all group"
                  >
                    <span className="text-xs font-bold text-slate-700">{cat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer rounded"
                      title={`Remove ${cat}`}
                      aria-label={`Remove ${cat}`}
                    >
                      <Trash2 className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="p-4 text-xs font-medium text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl w-full text-center">
                    No event categories registered. Click &quot;New Category&quot; above to add one.
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight">
                Ticket Policy Presets
              </h3>
              <div className="divide-y divide-slate-100">
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      Standard Early Bird
                    </h4>
                    <p className="text-xs text-slate-500">
                      15% discount, limited to first 100 tickets or 14 days before start.
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider shrink-0">
                    ID: T-EB15
                  </span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">VIP Bundle</h4>
                    <p className="text-xs text-slate-500">
                      Includes Digital Guide, VIP Lounge access, and Session Recordings.
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider shrink-0">
                    ID: T-VIPB
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PAYMENT GATEWAYS */}
        {activeTab === "gateways" && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-4">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-tight">
              Connected Payment Gateways
            </h3>
            <div className="divide-y divide-slate-100">
              {[
                {
                  name: "Stripe",
                  status: "Connected",
                  desc: "Primary gateway for UK cards, Apple Pay, and bank transfers."
                },
                {
                  name: "PayPal Express",
                  status: "Disconnected",
                  desc: "Alternative checkout gateway for international buyers."
                }
              ].map((gw, i) => (
                <div
                  key={i}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-slate-900">{gw.name}</h4>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider ${
                          gw.status === "Connected" ? "text-emerald-600" : "text-slate-400"
                        }`}
                      >
                        {gw.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{gw.desc}</p>
                  </div>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all w-fit shrink-0 ${
                      gw.status === "Connected"
                        ? "bg-white text-red-600 border border-red-200 hover:bg-red-50"
                        : "bg-slate-900 text-white hover:bg-orange-600"
                    }`}
                  >
                    {gw.status === "Connected" ? "Disconnect" : "Connect Gateway"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
