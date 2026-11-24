"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  TrendingUp,
  PieChart,
  Lock,
  Unlock,
  AlertTriangle,
  Download,
  RefreshCw,
  Settings,
  CreditCard,
  Globe,
  Wallet,
  X
} from "lucide-react";

export default function FinancialHubPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [settlements, setSettlements] = useState([
    { id: "BUS-44210", name: "Global Tech Corp", amount: "£42,000.00", date: "Feb 05, 2026", status: "In Escrow" },
    { id: "BUS-44211", name: "Urban Threads Co.", amount: "£8,450.00", date: "Today", status: "Processing" },
    { id: "BUS-44212", name: "EcoHome Solutions", amount: "£12,200.00", date: "Feb 08, 2026", status: "Disputed Hold" }
  ]);
  const [showBulkReleaseModal, setShowBulkReleaseModal] = useState(false);
  const [manageTarget, setManageTarget] = useState<(typeof settlements)[0] | null>(null);
  const [processors, setProcessors] = useState([
    { name: "Stripe Payments", status: "Primary Active", color: "text-emerald-600" },
    { name: "PayPal Express", status: "Failover Ready", color: "text-orange-600" }
  ]);
  const [configProcessor, setConfigProcessor] = useState<string | null>(null);
  const [showAddGatewayModal, setShowAddGatewayModal] = useState(false);
  const [newGatewayName, setNewGatewayName] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("GBP (£)");
  const [settlementCycle, setSettlementCycle] = useState("T+7");
  const [autoSweep, setAutoSweep] = useState(true);
  const [holdOnDispute, setHoldOnDispute] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleDownloadReport = () => {
    const header = "Business ID,Business Name,Held Amount,Release Date,Status";
    const rows = settlements.map(
      (s) => `"${s.id}","${s.name}","${s.amount}","${s.date}","${s.status}"`
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "247GBS-Admin-Settlement-Report.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Settlement report CSV downloaded!");
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Revenue & Settlements
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Platform revenue oversight, escrow releases, and payment gateway routing.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleDownloadReport}
            className="bg-white border border-slate-200/80 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Settlement Report</span>
          </button>
          <button
            type="button"
            onClick={() => setShowBulkReleaseModal(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-700 shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Bulk Release</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="flex gap-5 sm:gap-8 border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { id: "overview", label: "Overview & Escrow", icon: <PieChart className="w-4 h-4" /> },
          { id: "gateways", label: "Gateways & Currency", icon: <CreditCard className="w-4 h-4" /> }
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
        {activeTab === "overview" && (
          <div className="space-y-5 sm:space-y-6">
            {/* Revenue KPI Strip (Horizontal Scroll on Mobile with Peeping Card + Dot Slider) */}
            <div>
              <div className="flex md:grid md:grid-cols-3 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                <div className="w-[52%] min-w-[172px] sm:w-[200px] md:w-auto shrink-0 snap-start bg-slate-900 rounded-2xl p-3.5 sm:p-5 text-white relative overflow-hidden shadow-md flex flex-col justify-between">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <p className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 tracking-wider">
                        Total Volume
                      </p>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </div>
                    <h3 className="text-base sm:text-xl font-black leading-none">£4.85M</h3>
                  </div>
                  <p className="mt-1.5 text-emerald-400 text-[10px] sm:text-xs font-semibold whitespace-nowrap flex items-center gap-1">
                    <span>+18.2%</span>
                    <span className="text-slate-400 font-normal">vs last month</span>
                  </p>
                </div>

                <div className="w-[52%] min-w-[172px] sm:w-[200px] md:w-auto shrink-0 snap-start bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <p className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 tracking-wider truncate">
                        Commission Revenue
                      </p>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                    <h3 className="text-base sm:text-xl font-black text-slate-900 leading-none">£482,400</h3>
                  </div>
                  <p className="mt-1.5 text-emerald-600 text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                    10% Avg Commission
                  </p>
                </div>

                <div className="w-[52%] min-w-[172px] sm:w-[200px] md:w-auto shrink-0 snap-start bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <p className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 tracking-wider truncate">
                        Funds in Escrow
                      </p>
                      <Lock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    </div>
                    <h3 className="text-base sm:text-xl font-black text-orange-600 leading-none">£1.12M</h3>
                  </div>
                  <p className="mt-1.5 text-slate-400 text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                    Held for Settlement
                  </p>
                </div>
              </div>
              {/* Mobile Slider Dots Indicator */}
              <div className="flex items-center justify-center gap-1.5 mt-2 md:hidden">
                <span className="w-4 h-1 rounded-full bg-orange-600" />
                <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1 rounded-full bg-slate-300" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* Escrow & Settlements (Desktop Table + Mobile Stacked Rows) */}
              <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                    Escrow & Settlements
                  </h3>
                  <button
                    type="button"
                    onClick={handleDownloadReport}
                    className="text-orange-600 text-xs font-black uppercase tracking-wider hover:underline cursor-pointer"
                  >
                    Export All
                  </button>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-100">
                        <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          Business
                        </th>
                        <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          Held Amount
                        </th>
                        <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          Release Date
                        </th>
                        <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          Status
                        </th>
                        <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {settlements.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-xs sm:text-sm font-bold text-slate-900">{s.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">
                              ID: {s.id}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs sm:text-sm font-black text-slate-900">
                              {s.amount}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{s.date}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`text-[11px] font-black uppercase tracking-wider ${
                                s.status === "Processing"
                                  ? "text-orange-600"
                                  : s.status === "Disputed Hold"
                                  ? "text-red-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {s.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => setManageTarget(s)}
                              className="text-xs font-black text-orange-600 uppercase tracking-wider hover:underline cursor-pointer"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Stacked Settlements */}
                <div className="md:hidden divide-y divide-slate-100">
                  {settlements.map((s) => (
                    <div key={s.id} className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-extrabold text-sm text-slate-900">{s.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            ID: {s.id} • {s.date}
                          </p>
                        </div>
                        <span className="text-sm font-black text-slate-900">{s.amount}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span
                          className={`font-black uppercase text-[10px] tracking-wider ${
                            s.status === "Processing"
                              ? "text-orange-600"
                              : s.status === "Disputed Hold"
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {s.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => setManageTarget(s)}
                          className="font-black text-orange-600 uppercase text-[11px] cursor-pointer"
                        >
                          Manage &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chargeback & Gateway Failover (Colored Text, No Pills) */}
              <div className="space-y-5">
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                      Chargeback Monitor
                    </h3>
                    <AlertTriangle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-2xl font-black text-slate-900">0.12%</p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase">
                        Well below 1.0% threshold
                      </p>
                    </div>
                    <span className="text-emerald-600 text-[11px] font-black uppercase tracking-wider">
                      Healthy
                    </span>
                  </div>
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-500">Active Disputes</span>
                      <span className="text-slate-900">14</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-500">Potential Recovery</span>
                      <span className="text-slate-900">£4,200.00</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50/90 rounded-2xl sm:rounded-3xl border border-orange-200/70 p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-4 h-4 text-orange-600" />
                    <h4 className="font-extrabold text-sm text-orange-950">Gateway Failover</h4>
                  </div>
                  <p className="text-xs text-orange-800 leading-relaxed font-medium mb-4">
                    Main Gateway (Stripe) is <strong>Healthy</strong>. Automatic failover to PayPal Express is on standby.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("gateways")}
                    className="w-full py-2.5 bg-white text-orange-600 border border-orange-200 rounded-xl font-bold text-xs shadow-2xs hover:bg-orange-600 hover:text-white transition-all cursor-pointer"
                  >
                    Configure Routing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GATEWAYS & CURRENCY TAB */}
        {activeTab === "gateways" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs">
              <div className="pb-3 border-b border-slate-100 mb-3">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-orange-600" /> Payment Processors
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Manage active gateways and automatic failover rules.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {processors.map((proc) => (
                  <div key={proc.name} className="flex items-center justify-between py-3.5">
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {proc.name}
                      </h4>
                      <p className={`text-[10px] ${proc.color} font-black uppercase tracking-wider`}>
                        {proc.status}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConfigProcessor(proc.name)}
                      className="text-slate-400 hover:text-slate-900 p-1.5 cursor-pointer"
                      aria-label={`Configure ${proc.name}`}
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAddGatewayModal(true)}
                className="w-full mt-3 py-2.5 border border-dashed border-slate-300 rounded-xl text-slate-500 text-xs font-bold hover:border-orange-300 hover:text-orange-600 transition-all cursor-pointer"
              >
                + Add Payment Gateway
              </button>
            </div>

            <div className="space-y-5">
              <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2 pb-2.5 border-b border-slate-100">
                  <Globe className="w-4 h-4 text-orange-600" /> Currency & Settlement Cycle
                </h3>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                    Base Currency
                  </label>
                  <select
                    value={baseCurrency}
                    onChange={(e) => {
                      setBaseCurrency(e.target.value);
                      showToast(`Base currency updated to ${e.target.value}.`);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 outline-none"
                  >
                    <option>GBP (£)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">
                    Settlement Cycle
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["T+2", "T+7", "T+30"].map((cycle) => (
                      <button
                        key={cycle}
                        type="button"
                        onClick={() => {
                          setSettlementCycle(cycle);
                          showToast(`Settlement cycle set to ${cycle}.`);
                        }}
                        className={`py-2 rounded-xl text-xs font-bold border cursor-pointer transition-colors ${
                          cycle === settlementCycle
                            ? "bg-orange-600 text-white border-orange-600"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:border-orange-300"
                        }`}
                      >
                        {cycle}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl sm:rounded-3xl text-white shadow-lg">
                <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2 pb-3 border-b border-white/10">
                  <Wallet className="w-4 h-4 text-orange-400" /> Treasury Controls
                </h3>
                <div className="divide-y divide-white/10 text-xs">
                  <div className="flex items-center justify-between py-3">
                    <span className="font-bold">Auto-Sweep to Bank</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={autoSweep}
                      onClick={() => {
                        setAutoSweep((prev) => {
                          showToast(`Auto-Sweep to Bank ${!prev ? "enabled" : "disabled"}.`);
                          return !prev;
                        });
                      }}
                      className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
                        autoSweep ? "bg-emerald-500" : "bg-slate-600"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                          autoSweep ? "right-1" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="font-bold">Hold Funds on Dispute</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={holdOnDispute}
                      onClick={() => {
                        setHoldOnDispute((prev) => {
                          showToast(`Hold Funds on Dispute ${!prev ? "enabled" : "disabled"}.`);
                          return !prev;
                        });
                      }}
                      className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
                        holdOnDispute ? "bg-emerald-500" : "bg-slate-600"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                          holdOnDispute ? "right-1" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-4 sm:right-8 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold">
          {toastMsg}
        </div>
      )}

      {/* Bulk Release Confirmation Modal */}
      {showBulkReleaseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-2xl p-5 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Confirm Bulk Escrow Release</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Release all eligible settlements currently in escrow to exhibitor accounts? Disputed holds will remain protected.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => setShowBulkReleaseModal(false)} className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSettlements((prev) =>
                    prev.map((s) => (s.status === "In Escrow" ? { ...s, status: "Processing" } : s))
                  );
                  setShowBulkReleaseModal(false);
                  showToast("Eligible escrow funds queued for payout release!");
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
              >
                Release Funds
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Settlement Modal */}
      {manageTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">Manage Settlement</h3>
              <button type="button" onClick={() => setManageTarget(null)} className="w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p><strong className="text-slate-900">{manageTarget.name}</strong> ({manageTarget.id})</p>
              <p>Amount: <strong className="text-slate-900">{manageTarget.amount}</strong> • Status: <strong className="text-orange-600">{manageTarget.status}</strong></p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setSettlements((prev) =>
                    prev.map((s) => (s.id === manageTarget.id ? { ...s, status: "Disputed Hold" } : s))
                  );
                  showToast(`${manageTarget.name} placed on hold.`);
                  setManageTarget(null);
                }}
                className="px-3.5 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50"
              >
                Place Hold
              </button>
              <button
                type="button"
                onClick={() => {
                  setSettlements((prev) =>
                    prev.map((s) => (s.id === manageTarget.id ? { ...s, status: "Processing" } : s))
                  );
                  showToast(`${manageTarget.amount} released for ${manageTarget.name}!`);
                  setManageTarget(null);
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
              >
                Release Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configure Gateway Modal */}
      {configProcessor && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">Configure {configProcessor}</h3>
              <button type="button" onClick={() => setConfigProcessor(null)} className="w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Routing priority and webhook signature verification for <strong className="text-slate-900">{configProcessor}</strong> are active and synchronized with CHS.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => setConfigProcessor(null)} className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`${configProcessor} configuration saved.`);
                  setConfigProcessor(null);
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Gateway Modal */}
      {showAddGatewayModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">Add Payment Gateway</h3>
              <button type="button" onClick={() => setShowAddGatewayModal(false)} className="w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={newGatewayName}
              onChange={(e) => setNewGatewayName(e.target.value)}
              placeholder="e.g. Adyen, Worldpay, GoCardless"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-orange-500"
            />
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => setShowAddGatewayModal(false)} className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newGatewayName.trim()) return;
                  setProcessors((prev) => [
                    ...prev,
                    { name: newGatewayName.trim(), status: "Standby Ready", color: "text-blue-600" }
                  ]);
                  showToast(`${newGatewayName.trim()} added to gateway pool!`);
                  setNewGatewayName("");
                  setShowAddGatewayModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
              >
                Add Gateway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
