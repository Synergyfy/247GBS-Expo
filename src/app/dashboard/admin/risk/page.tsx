"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Zap,
  Activity,
  UserX,
  TrendingDown,
  BarChart2,
  Target,
  Plus
} from "lucide-react";

export default function RiskFraudPage() {
  const [activeTab, setActiveTab] = useState("monitor");

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

  return (
    <div className="space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header (No decorative status pill) */}
      <div>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
          Risk & Fraud Monitor
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Real-time threat detection, transaction velocity checks, and anomaly monitoring.
        </p>
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

      {/* LIVE MONITOR TAB */}
      {activeTab === "monitor" && (
        <div className="space-y-5 sm:space-y-6">
          {/* Horizontal Scroll KPI Strip on Mobile (Peeping 3rd Card + Dot Slider) */}
          <div>
            <div className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
              {kpiStats.map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={i}
                    className="w-[42%] min-w-[144px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                        {stat.label}
                      </span>
                      <IconComponent className={`w-3.5 h-3.5 ${stat.iconColor} shrink-0`} />
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                      {stat.value}
                    </div>
                    <p className="text-[10px] font-medium text-slate-400 mt-1 truncate">
                      {stat.sub}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* Mobile Slider Dots Indicator */}
            <div className="flex items-center justify-center gap-1.5 mt-2 lg:hidden">
              <span className="w-4 h-1 rounded-full bg-orange-600" />
              <span className="w-1.5 h-1 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1 rounded-full bg-slate-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Active Anomalies Feed (No bulky left icon box, colored text priority) */}
            <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                  Active Anomalies
                </h3>
                <button
                  type="button"
                  className="text-orange-600 text-xs font-black uppercase tracking-wider hover:underline"
                >
                  View All Logs
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  {
                    title: "Geo-Anomaly Detection",
                    desc: "User verified in London, then 5m later in Tokyo.",
                    priority: "Critical",
                    time: "12m ago"
                  },
                  {
                    title: "Velocity Check Trigger",
                    desc: "10 ticket attempts from same IP in < 1s.",
                    priority: "High",
                    time: "1h ago"
                  },
                  {
                    title: "Multiple Device Login",
                    desc: "Account JD-221 accessed from 4 distinct mobile OS.",
                    priority: "Medium",
                    time: "2h ago"
                  }
                ].map((a, i) => (
                  <div
                    key={i}
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
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all w-fit shrink-0"
                    >
                      Investigate
                    </button>
                  </div>
                ))}
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
                    (rule, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3">
                        <span className="font-bold text-slate-200">{rule}</span>
                        <div className="w-10 h-5 bg-orange-600 rounded-full relative">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                        </div>
                      </div>
                    )
                  )}
                </div>
                <button
                  type="button"
                  className="w-full mt-4 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-orange-50 transition-all"
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
                  className="w-full py-2.5 bg-red-600 text-white rounded-xl font-bold text-xs shadow-sm hover:bg-red-700 transition-all"
                >
                  System Lock (Emergency)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCORING MATRIX TAB (Colored Text instead of Pills) */}
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
                  category: "Event Listing",
                  factors: ["Content Clarity", "Ticket Price Variance", "Refund Policy"],
                  score: 92
                },
                {
                  category: "User / Transaction",
                  factors: ["Device Trust", "IP Geolocation", "Purchase Velocity"],
                  score: 64
                }
              ].map((item, i) => (
                <div key={i} className="py-4 space-y-2">
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{item.category}</h4>
                    <span
                      className={`text-xs font-black uppercase tracking-wider ${
                        item.score > 80
                          ? "text-emerald-600"
                          : item.score > 60
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      Avg: {item.score}/100
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs text-slate-500 font-semibold">
                    <span>{item.factors.join(" • ")}</span>
                    <button
                      type="button"
                      className="text-[11px] font-black text-orange-600 hover:underline inline-flex items-center gap-0.5 uppercase tracking-wider"
                    >
                      <Plus className="w-3 h-3" /> Add Factor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl sm:rounded-3xl text-white shadow-lg space-y-5 h-fit">
            <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2 pb-3 border-b border-white/10">
              <BarChart2 className="w-4 h-4 text-orange-400" /> Model Accuracy
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-400 font-semibold">False Positives</span>
                  <span className="font-black text-emerald-400">0.4%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-[4%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-400 font-semibold">Fraud Capture Rate</span>
                  <span className="font-black text-orange-400">98.2%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full w-[98.2%]" />
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  Risk engine was last retrained 24h ago using the latest settlement datasets.
                </p>
                <button
                  type="button"
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs transition-all"
                >
                  Force Retrain
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
