"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Zap,
  Activity,
  UserX,
  TrendingDown,
  Target,
  X,
  CheckCircle2,
  Lock,
  Sliders,
  ShieldAlert
} from "lucide-react";

interface Anomaly {
  id: string;
  title: string;
  desc: string;
  priority: "Critical" | "High" | "Medium";
  time: string;
  ip: string;
  user: string;
}

const INITIAL_ANOMALIES: Anomaly[] = [
  {
    id: "ANOM-01",
    title: "Geo-Anomaly Detection",
    desc: "User verified in London, then 5m later in Tokyo.",
    priority: "Critical",
    time: "12m ago",
    ip: "185.220.101.5",
    user: "user_8829 (London/Tokyo)"
  },
  {
    id: "ANOM-02",
    title: "Velocity Check Trigger",
    desc: "10 ticket attempts from same IP in < 1s.",
    priority: "High",
    time: "1h ago",
    ip: "194.26.29.112",
    user: "guest_checkout_ip"
  },
  {
    id: "ANOM-03",
    title: "Multiple Device Login",
    desc: "Account JD-221 accessed from 4 distinct mobile OS.",
    priority: "Medium",
    time: "2h ago",
    ip: "82.165.197.1",
    user: "JD-221 (John Doe)"
  }
];

export default function RiskFraudPage() {
  const [activeTab, setActiveTab] = useState("monitor");
  const [anomalies, setAnomalies] = useState<Anomaly[]>(INITIAL_ANOMALIES);

  // Modals
  const [investigateAnomaly, setInvestigateAnomaly] = useState<Anomaly | null>(null);
  const [showThresholds, setShowThresholds] = useState(false);
  const [showEmergencyLock, setShowEmergencyLock] = useState(false);
  const [systemLocked, setSystemLocked] = useState(false);

  // Thresholds state
  const [velocityLimit, setVelocityLimit] = useState(15);
  const [maxFailures, setMaxFailures] = useState(5);
  const [detectionRules, setDetectionRules] = useState<{ [key: string]: boolean }>({
    "Velocity Limits": true,
    "IP Blacklisting": true,
    "Device Fingerprinting": true
  });

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const kpiStats = [
    {
      label: "High Risk Events",
      value: "2",
      sub: "Flagged for review",
      icon: AlertTriangle,
      iconColor: "text-red-600"
    },
    {
      label: "Velocity Triggers",
      value: "14",
      sub: "Rate limit hits",
      icon: Activity,
      iconColor: "text-orange-600"
    },
    {
      label: "Blocked Attempts",
      value: "128",
      sub: "Auto-rejected IPs",
      icon: UserX,
      iconColor: "text-slate-700"
    },
    {
      label: "Fraud Savings",
      value: "£12.4K",
      sub: "Protected volume",
      icon: TrendingDown,
      iconColor: "text-emerald-600"
    }
  ];

  const handleFreezeUser = (anomaly: Anomaly) => {
    setAnomalies((prev) => prev.filter((a) => a.id !== anomaly.id));
    showToast(`Account ${anomaly.user} frozen and blocked from ticketing`);
    setInvestigateAnomaly(null);
  };

  const handleDismissAnomaly = (anomaly: Anomaly) => {
    setAnomalies((prev) => prev.filter((a) => a.id !== anomaly.id));
    showToast(`Anomaly "${anomaly.title}" dismissed as false positive`);
    setInvestigateAnomaly(null);
  };

  const handleToggleEmergencyLock = () => {
    const next = !systemLocked;
    setSystemLocked(next);
    showToast(
      next
        ? "EMERGENCY SYSTEM FREEZE ACTIVATED: Outbound settlements halted"
        : "Emergency freeze lifted. Regular transactions restored."
    );
    setShowEmergencyLock(false);
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-7xl mx-auto relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 sm:top-24 right-4 sm:right-8 z-[9999] bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 max-w-sm sm:max-w-md animate-in fade-in slide-in-from-top-3">
          <div className="w-7 h-7 rounded-xl bg-orange-600 flex items-center justify-center shrink-0 text-white">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold flex-1">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Risk & Fraud Monitor
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Real-time threat detection, transaction velocity checks, and anomaly monitoring.
          </p>
        </div>
        {systemLocked && (
          <span className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 animate-pulse w-fit">
            <ShieldAlert className="w-4 h-4" /> EMERGENCY LOCK ACTIVE
          </span>
        )}
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="flex gap-5 sm:gap-8 border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { id: "monitor", label: "Live Monitor", icon: <Activity className="w-4 h-4" /> },
          { id: "scoring", label: "Risk Scoring Matrix", icon: <Target className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
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

      {/* LIVE MONITOR TAB */}
      {activeTab === "monitor" && (
        <div className="space-y-5 sm:space-y-6">
          {/* Horizontal Scroll KPI Strip on Mobile */}
          <div>
            <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
              {kpiStats.map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={i}
                    className="w-[50%] min-w-[168px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="text-[11px] sm:text-xs font-bold text-slate-500 truncate">
                        {stat.label}
                      </span>
                      <IconComponent className={`w-3.5 h-3.5 ${stat.iconColor} shrink-0`} />
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                      {stat.value}
                    </div>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 mt-0.5 truncate">
                      {stat.sub}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-2 lg:hidden">
              <span className="w-4 h-1 rounded-full bg-orange-600" />
              <span className="w-1.5 h-1 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1 rounded-full bg-slate-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Active Anomalies Feed */}
            <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                  Active Anomalies
                </h3>
                <button
                  type="button"
                  onClick={() => showToast("Loaded all historic forensic anomaly records (128 archived)")}
                  className="text-orange-600 text-xs font-black uppercase tracking-wider hover:underline cursor-pointer"
                >
                  View All Logs
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {anomalies.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center justify-between sm:justify-start gap-2 text-[11px] font-bold">
                        <span
                          className={`font-black uppercase tracking-wider ${
                            a.priority === "Critical"
                              ? "text-red-600"
                              : a.priority === "High"
                              ? "text-orange-600"
                              : "text-amber-600"
                          }`}
                        >
                          {a.priority} Severity
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400">{a.time}</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900">{a.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{a.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInvestigateAnomaly(a)}
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all w-fit shrink-0 cursor-pointer shadow-xs"
                    >
                      Investigate
                    </button>
                  </div>
                ))}

                {anomalies.length === 0 && (
                  <div className="p-8 text-center text-slate-400">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">All anomalies resolved</p>
                    <p className="text-[11px] text-slate-400">System is operating normally.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Risk Tools Sidebar */}
            <div className="space-y-5">
              <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-lg">
                <h3 className="text-sm sm:text-base font-extrabold mb-3 pb-2 border-b border-white/10">
                  Detection Rules
                </h3>
                <div className="divide-y divide-white/10 text-xs">
                  {["Velocity Limits", "IP Blacklisting", "Device Fingerprinting"].map(
                    (rule, idx) => {
                      const isEnabled = detectionRules[rule] ?? true;
                      return (
                        <div key={idx} className="flex items-center justify-between py-3">
                          <span className="font-bold text-slate-200">{rule}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const nextVal = !isEnabled;
                              setDetectionRules((prev) => ({ ...prev, [rule]: nextVal }));
                              showToast(`${rule} ${nextVal ? "activated" : "deactivated"}`);
                            }}
                            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 ${
                              isEnabled ? "bg-orange-600" : "bg-slate-700"
                            }`}
                            aria-label={`Toggle ${rule}`}
                          >
                            <span
                              className={`block w-5 h-5 bg-white rounded-full shadow-xs transition-transform transform ${
                                isEnabled ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      );
                    }
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowThresholds(true)}
                  className="w-full mt-4 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-orange-50 transition-all cursor-pointer"
                >
                  Adjust Thresholds
                </button>
              </div>

              <div className="bg-orange-50/90 rounded-2xl sm:rounded-3xl border border-orange-200/70 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <h4 className="font-extrabold text-sm text-orange-950">Incident Response</h4>
                </div>
                <p className="text-xs text-orange-800 leading-relaxed font-medium mb-4">
                  Emergency override freezes all outbound settlements immediately.
                </p>
                <button
                  type="button"
                  onClick={() => setShowEmergencyLock(true)}
                  className="w-full py-2.5 bg-red-600 text-white rounded-xl font-bold text-xs shadow-sm hover:bg-red-700 transition-all cursor-pointer"
                >
                  {systemLocked ? "Lift System Lock" : "System Lock (Emergency)"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCORING MATRIX TAB */}
      {activeTab === "scoring" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Target className="w-4 h-4 text-orange-600" /> Unified Risk Scoring Matrix
            </h3>

            <div className="divide-y divide-slate-100">
              {[
                {
                  category: "Business Entity (KYB Verified)",
                  factors: ["Credit Score", "Years in Operation", "Complaint Ratio"],
                  score: 85
                },
                {
                  category: "Attendee Purchase Velocity",
                  factors: ["IP Reputation", "BIN Geo Match", "Rapid Retries"],
                  score: 92
                },
                {
                  category: "Settlement Disbursement",
                  factors: ["Bank Validation", "Holding Period", "Chargeback Rate"],
                  score: 78
                }
              ].map((matrix, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900">{matrix.category}</span>
                    <span className="text-xs font-black text-emerald-600">{matrix.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${matrix.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Weighted factors: {matrix.factors.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 1. INVESTIGATE ANOMALY MODAL */}
      {investigateAnomaly && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-red-600">
                  {investigateAnomaly.priority} Severity Incident
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  {investigateAnomaly.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInvestigateAnomaly(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Affected Subject:</span>
                <span className="font-bold text-slate-800">{investigateAnomaly.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Origin IP Address:</span>
                <span className="font-mono font-bold text-slate-800">{investigateAnomaly.ip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Detection Timestamp:</span>
                <span className="font-bold text-slate-800">{investigateAnomaly.time}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {investigateAnomaly.desc}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleDismissAnomaly(investigateAnomaly)}
                className="px-3.5 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold cursor-pointer"
              >
                Dismiss False Positive
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleFreezeUser(investigateAnomaly)}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer shadow-xs"
                >
                  Freeze Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. THRESHOLD SETTINGS MODAL */}
      {showThresholds && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Adjust Risk Thresholds</h3>
                <p className="text-xs text-slate-500 font-medium">Configure automated rate limiting</p>
              </div>
              <button
                type="button"
                onClick={() => setShowThresholds(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Max Ticket Checkout Attempts / Min</span>
                  <span className="text-orange-600">{velocityLimit} req/min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={velocityLimit}
                  onChange={(e) => setVelocityLimit(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Max Consecutive Login Failures</span>
                  <span className="text-orange-600">{maxFailures} attempts</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={maxFailures}
                  onChange={(e) => setMaxFailures(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowThresholds(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast("Threshold limits successfully saved");
                  setShowThresholds(false);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer shadow-xs"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. EMERGENCY LOCK CONFIRMATION MODAL */}
      {showEmergencyLock && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {systemLocked ? "Lift Emergency Lock" : "Emergency System Freeze"}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                {systemLocked
                  ? "Are you sure you want to lift the emergency freeze and resume outbound settlements?"
                  : "This will immediately halt all outbound settlements, ticket disbursements, and gateway transfers across the platform."}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowEmergencyLock(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleToggleEmergencyLock}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer shadow-xs"
              >
                {systemLocked ? "Lift Lock" : "Freeze System"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
