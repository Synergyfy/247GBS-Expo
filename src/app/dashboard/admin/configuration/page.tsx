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
export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState("system");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Interactive Security & System state
  const [mfaEnforced, setMfaEnforced] = useState(true);
  const [ipInput, setIpInput] = useState("");
  const [whitelistedIps, setWhitelistedIps] = useState<string[]>(["192.168.1.1"]);
  const [showRbacModal, setShowRbacModal] = useState(false);
  const [securityPolicies, setSecurityPolicies] = useState([
    { label: "Web Application Firewall (WAF)", desc: "Enable advanced Layer 7 protection.", active: true },
    { label: "DDoS Protection", desc: "Automated traffic scrubbing and rate limiting.", active: true },
    { label: "Key Management System (KMS)", desc: "Rotate encryption keys every 90 days.", active: false },
    { label: "Backup Encryption", desc: "AES-256 for all cross-region database backups.", active: true }
  ]);

  // Interactive Tax Jurisdictions
  const [taxes, setTaxes] = useState([
    { code: "UK", name: "VAT (United Kingdom)", desc: "Standard rate for exhibition tickets", rate: "20%" }
  ]);
  const [showAddTaxModal, setShowAddTaxModal] = useState(false);
  const [newTax, setNewTax] = useState({ code: "", name: "", rate: "" });

  // Interactive Payment Gateways with Disconnect Confirmation Modal
  const [gateways, setGateways] = useState([
    { name: "Stripe", status: "Connected" as "Connected" | "Disconnected", desc: "Primary gateway for UK cards, Apple Pay, and bank transfers." },
    { name: "PayPal Express", status: "Disconnected" as "Connected" | "Disconnected", desc: "Alternative checkout gateway for international buyers." }
  ]);
  const [disconnectTarget, setDisconnectTarget] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("System configuration saved successfully!");
    }, 400);
  };

  const tabs = [
    { id: "system", label: "System Rules", icon: <Settings className="w-4 h-4" /> },
    { id: "financial", label: "Finance & Tax", icon: <DollarSign className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
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
                    <button
                      type="button"
                      role="switch"
                      aria-checked={mfaEnforced}
                      onClick={() => {
                        setMfaEnforced((prev) => {
                          showToast(`MFA Enforcement ${!prev ? "enabled" : "disabled"}.`);
                          return !prev;
                        });
                      }}
                      className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${
                        mfaEnforced ? "bg-orange-600" : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          mfaEnforced ? "right-1" : "left-1"
                        }`}
                      />
                    </button>
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
                      value={ipInput}
                      onChange={(e) => setIpInput(e.target.value)}
                      placeholder="Add IP Address (e.g. 192.168.1.1)"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const clean = ipInput.trim();
                        if (!clean) return;
                        if (!whitelistedIps.includes(clean)) {
                          setWhitelistedIps((prev) => [...prev, clean]);
                          showToast(`Added ${clean} to IP Whitelist.`);
                        }
                        setIpInput("");
                      }}
                      className="bg-slate-900 text-white px-3 rounded-xl hover:bg-orange-600 cursor-pointer"
                      aria-label="Add IP address"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {whitelistedIps.map((ip) => (
                      <span
                        key={ip}
                        className="bg-slate-100 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-700 inline-flex items-center gap-1.5"
                      >
                        {ip}
                        <button
                          type="button"
                          onClick={() => {
                            setWhitelistedIps((prev) => prev.filter((item) => item !== ip));
                            showToast(`Removed ${ip} from whitelist.`);
                          }}
                          className="hover:text-red-500 cursor-pointer"
                          aria-label={`Remove ${ip}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
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
                  onClick={() => setShowRbacModal(true)}
                  className="text-xs font-black text-orange-600 hover:underline shrink-0 cursor-pointer"
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
                {securityPolicies.map((policy, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">{policy.label}</p>
                      <p className="text-[11px] text-slate-500">{policy.desc}</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={policy.active}
                      onClick={() => {
                        setSecurityPolicies((prev) =>
                          prev.map((item, idx) => (idx === i ? { ...item, active: !item.active } : item))
                        );
                        showToast(`${policy.label} ${!policy.active ? "enabled" : "disabled"}.`);
                      }}
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors shrink-0 ${
                        policy.active ? "bg-orange-600" : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                          policy.active ? "right-1" : "left-1"
                        }`}
                      />
                    </button>
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
              <div className="divide-y divide-slate-100 border-y border-slate-100">
                {taxes.map((tx, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-black text-xs">
                        {tx.code}
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-slate-900">{tx.name}</p>
                        <p className="text-[11px] text-slate-500">{tx.desc}</p>
                      </div>
                    </div>
                    <span className="font-black text-sm text-slate-900">{tx.rate}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowAddTaxModal(true)}
                className="w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-slate-500 font-bold text-xs hover:border-orange-300 hover:text-orange-600 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Tax Jurisdiction
              </button>
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
              {gateways.map((gw, i) => (
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
                    onClick={() => {
                      if (gw.status === "Connected") {
                        setDisconnectTarget(gw.name);
                      } else {
                        setGateways((prev) =>
                          prev.map((item) =>
                            item.name === gw.name ? { ...item, status: "Connected" } : item
                          )
                        );
                        showToast(`${gw.name} connected successfully!`);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all w-fit shrink-0 cursor-pointer ${
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

      {/* RBAC Matrix Modal */}
      {showRbacModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md border border-slate-200 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">RBAC Permission Matrix</h3>
              <button type="button" onClick={() => setShowRbacModal(false)} className="w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {[
                { role: "Super Admin", perms: "Full Platform Control, Gateways, Governance" },
                { role: "Finance Admin", perms: "Settlements, Payout Releases, Tax Rules" },
                { role: "Support Lead", perms: "Tickets, Disputes, Pass Verification" }
              ].map((r) => (
                <div key={r.role} className="py-2.5 flex justify-between gap-2">
                  <span className="font-bold text-slate-900">{r.role}</span>
                  <span className="text-slate-500 text-right">{r.perms}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button type="button" onClick={() => { setShowRbacModal(false); showToast("RBAC matrix confirmed."); }} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Tax Jurisdiction Modal */}
      {showAddTaxModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-2xl p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">Add Tax Jurisdiction</h3>
              <button type="button" onClick={() => setShowAddTaxModal(false)} className="w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input type="text" placeholder="Country Code (e.g. EU, US)" value={newTax.code} onChange={(e) => setNewTax({ ...newTax, code: e.target.value.toUpperCase() })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-orange-500" />
            <input type="text" placeholder="Tax Name (e.g. EU VAT)" value={newTax.name} onChange={(e) => setNewTax({ ...newTax, name: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-orange-500" />
            <input type="text" placeholder="Rate (e.g. 19%)" value={newTax.rate} onChange={(e) => setNewTax({ ...newTax, rate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-orange-500" />
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => setShowAddTaxModal(false)} className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">Cancel</button>
              <button
                type="button"
                onClick={() => {
                  if (!newTax.code.trim() || !newTax.name.trim()) return;
                  setTaxes((prev) => [...prev, { code: newTax.code.trim(), name: newTax.name.trim(), desc: "Custom regional tax rate", rate: newTax.rate.trim() || "0%" }]);
                  setNewTax({ code: "", name: "", rate: "" });
                  setShowAddTaxModal(false);
                  showToast("Tax jurisdiction added!");
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disconnect Gateway Confirmation Modal */}
      {disconnectTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-2xl p-5 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Disconnect Payment Gateway</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to disconnect <strong className="text-slate-900">{disconnectTarget}</strong>? Live checkout transactions using this gateway will be paused.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => setDisconnectTarget(null)} className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setGateways((prev) =>
                    prev.map((item) =>
                      item.name === disconnectTarget ? { ...item, status: "Disconnected" } : item
                    )
                  );
                  showToast(`${disconnectTarget} disconnected.`);
                  setDisconnectTarget(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
