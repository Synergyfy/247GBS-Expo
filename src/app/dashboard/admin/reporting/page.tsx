"use client";

import { useState } from "react";
import {
  Download,
  ShieldCheck,
  Briefcase,
  PieChart,
  Search,
  CheckCircle2,
  X,
  FileText
} from "lucide-react";

export default function ReportingHubPage() {
  const [activeTab, setActiveTab] = useState("internal");
  const [searchQuery, setSearchQuery] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const taxPackages = [
    { name: "Q1 VAT Return - UK", type: "Tax Filing", period: "Jan - Mar 2026", status: "Ready" },
    { name: "Annual AML Audit Pack", type: "Regulatory", period: "FY 2025", status: "Certified" },
    { name: "GDPR Consent Audit", type: "Compliance", period: "Dec 2025", status: "Archived" }
  ];

  const filteredPackages = taxPackages.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadReport = (title: string) => {
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}_2026.pdf`;
    showToast(`PDF generated & downloaded: ${filename}`);
  };

  const handleExportAll = () => {
    showToast("Compiling full reporting bundle: global_report_archive_2026.zip downloaded");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-4 sm:right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-3 max-w-sm sm:max-w-md animate-in fade-in slide-in-from-top-3">
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
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Global Reporting
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Regulatory output, internal performance metrics, and compliance audit packages.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportAll}
          className="px-4 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-all inline-flex items-center gap-1.5 shadow-sm w-fit shrink-0 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export All Data</span>
        </button>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab("internal")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "internal"
              ? "bg-orange-600 text-white shadow-xs"
              : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Internal Reports
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("external")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "external"
              ? "bg-orange-600 text-white shadow-xs"
              : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
          }`}
        >
          External & Regulatory
        </button>
      </div>

      <div>
        {activeTab === "internal" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    Updated Daily
                  </span>
                  <PieChart className="w-4 h-4 text-orange-600 shrink-0" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Revenue & Escrow Summary
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Monthly breakdown of gross volume, platform fees, and partner settlement shares.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">£1.24M YTD</span>
                <button
                  type="button"
                  onClick={() => handleDownloadReport("Revenue & Escrow Summary")}
                  className="text-xs font-black text-orange-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Generate PDF
                </button>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                    Real-Time
                  </span>
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Risk & Fraud Report
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Analysis of flagged transactions, chargeback rates, and blocked IP velocity patterns.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">0.12% Dispute Rate</span>
                <button
                  type="button"
                  onClick={() => handleDownloadReport("Risk & Fraud Report")}
                  className="text-xs font-black text-orange-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Generate PDF
                </button>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                    SLA Verified
                  </span>
                  <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Compliance & SLA Adherence
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Event moderation throughput, support response times, and 99.99% uptime metrics.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">99.99% SLA</span>
                <button
                  type="button"
                  onClick={() => handleDownloadReport("Compliance & SLA Adherence")}
                  className="text-xs font-black text-orange-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Generate PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "external" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                Regulator & Tax Packages
              </h3>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search filings..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Package Name
                    </th>
                    <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Type
                    </th>
                    <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Period
                    </th>
                    <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPackages.map((pkg, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {pkg.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                        {pkg.type}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">{pkg.period}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[11px] font-black uppercase tracking-wider ${
                            pkg.status === "Ready" ? "text-orange-600" : "text-emerald-600"
                          }`}
                        >
                          {pkg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDownloadReport(pkg.name)}
                          className="p-1.5 text-slate-400 hover:text-orange-600 transition-colors cursor-pointer"
                          title={`Download ${pkg.name}`}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Packages */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredPackages.map((pkg, i) => (
                <div key={i} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-extrabold text-sm text-slate-900 truncate">{pkg.name}</p>
                    <p className="text-xs text-slate-500 font-medium">
                      {pkg.type} • {pkg.period}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider ${
                        pkg.status === "Ready" ? "text-orange-600" : "text-emerald-600"
                      }`}
                    >
                      {pkg.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDownloadReport(pkg.name)}
                      className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-orange-600 cursor-pointer"
                      aria-label="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
