"use client";

import { useState } from "react";
import {
  Activity,
  Database,
  Globe,
  Cpu,
  Terminal,
  History,
  Download
} from "lucide-react";

export default function SystemHealthPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const healthStats = [
    {
      label: "API Latency",
      value: "42ms",
      statusText: "Optimal",
      statusColor: "text-emerald-600",
      icon: Activity,
      iconColor: "text-emerald-600"
    },
    {
      label: "DB Clusters",
      value: "Healthy",
      statusText: "99.99% Uptime",
      statusColor: "text-emerald-600",
      icon: Database,
      iconColor: "text-emerald-600"
    },
    {
      label: "CHS Gateway",
      value: "Active",
      statusText: "Primary Connected",
      statusColor: "text-emerald-600",
      icon: Globe,
      iconColor: "text-emerald-600"
    },
    {
      label: "CPU Load",
      value: "14%",
      statusText: "Stable",
      statusColor: "text-blue-600",
      icon: Cpu,
      iconColor: "text-blue-600"
    }
  ];

  return (
    <div className="space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            System Health & Telemetry
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Monitor infrastructure performance, API latency, and CHS cluster connectivity.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="bg-white border border-slate-200/80 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span>Live Console</span>
          </button>
          <button
            type="button"
            className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-700 shadow-sm inline-flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="flex gap-5 sm:gap-8 border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { id: "overview", label: "Health Overview", icon: <Activity className="w-4 h-4" /> },
          { id: "audits", label: "Audit Stream", icon: <History className="w-4 h-4" /> },
          { id: "infrastructure", label: "Infrastructure", icon: <Database className="w-4 h-4" /> }
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
            {/* Horizontal Scroll Health Cards on Mobile (Peeping Card + Dot Slider) */}
            <div>
              <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                {healthStats.map((stat, i) => {
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
                      <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-none">
                        {stat.value}
                      </h3>
                      <p className={`text-[10px] sm:text-[11px] font-bold mt-0.5 truncate ${stat.statusColor}`}>
                        {stat.statusText}
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
                <span className="w-1.5 h-1 rounded-full bg-slate-300" />
              </div>
            </div>

            {/* Real-Time Audit Log Stream */}
            <div className="bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight">
                  Real-Time Telemetry Stream
                </h3>
                <span className="text-orange-400 text-[10px] font-black uppercase tracking-wider">
                  Live Stream
                </span>
              </div>
              <div className="p-4 sm:p-6 font-mono text-xs divide-y divide-white/10">
                {[
                  {
                    time: "15:42:01",
                    role: "ADMIN-01",
                    action: "Release Settlement",
                    target: "Global Tech",
                    status: "LOGGED"
                  },
                  {
                    time: "15:40:12",
                    role: "SYS-AUTO",
                    action: "CHS Identity Sync",
                    target: "Urban Threads",
                    status: "PASSED"
                  },
                  {
                    time: "15:38:45",
                    role: "ADMIN-04",
                    action: "Template Update",
                    target: "VIP Pass",
                    status: "ENFORCED"
                  },
                  {
                    time: "15:35:22",
                    role: "ADMIN-01",
                    action: "Event Approved",
                    target: "Tech Symposium",
                    status: "PUBLISHED"
                  }
                ].map((log, i) => (
                  <div
                    key={i}
                    className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-slate-500 shrink-0">[{log.time}]</span>
                      <span className="text-orange-400 font-bold shrink-0">{log.role}</span>
                      <span className="truncate">
                        {log.action} • {log.target}
                      </span>
                    </div>
                    <span className="text-emerald-400 font-bold text-[10px] shrink-0">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab !== "overview" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <History className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1 uppercase tracking-tight">
              Module Telemetry: {activeTab}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto font-medium">
              Deep forensic tools and regional infrastructure clusters are online and reporting healthy status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
