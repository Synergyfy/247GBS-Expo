"use client";

import React, { useState } from "react";
import {
  Search,
  MoreVertical,
  Mail,
  Building2,
  ShieldCheck,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Trophy,
  TrendingUp,
  X,
  CheckCircle2,
  Send,
  AlertTriangle,
  Sparkles,
  Ban
} from "lucide-react";

interface Business {
  id: string;
  name: string;
  owner: string;
  email: string;
  cac: string;
  status: "Standard" | "Verified" | "Premium";
  dateSynced: string;
  revenue: string;
  eventsHeld: number;
  location: string;
  suspended?: boolean;
}

const INITIAL_BUSINESSES: Business[] = [
  {
    id: "biz_1",
    name: "TechGlobal Solutions Ltd",
    owner: "Abiodun Okoro",
    email: "contact@techglobal.com",
    cac: "RC-1234567",
    status: "Premium",
    dateSynced: "2026-01-15",
    revenue: "£1.2M",
    eventsHeld: 14,
    location: "Lagos, Nigeria"
  },
  {
    id: "biz_2",
    name: "Creative Wave Media",
    owner: "Sarah Jenkins",
    email: "sarah@creativewave.uk",
    cac: "UK-998877",
    status: "Verified",
    dateSynced: "2026-02-01",
    revenue: "£450k",
    eventsHeld: 5,
    location: "London, UK"
  },
  {
    id: "biz_3",
    name: "GreenEnergy Pro",
    owner: "Hans Miller",
    email: "info@greenpro.de",
    cac: "DE-443322",
    status: "Standard",
    dateSynced: "2026-02-10",
    revenue: "£890k",
    eventsHeld: 8,
    location: "Berlin, Germany"
  },
  {
    id: "biz_4",
    name: "Finest Retail Corp",
    owner: "Anita Desai",
    email: "admin@finestretail.in",
    cac: "IN-112233",
    status: "Premium",
    dateSynced: "2026-01-20",
    revenue: "£2.5M",
    eventsHeld: 22,
    location: "Mumbai, India"
  }
];

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Popups State
  const [emailModalBiz, setEmailModalBiz] = useState<Business | null>(null);
  const [emailSubject, setEmailSubject] = useState("Exhibition Notice & Verification Status");
  const [emailBody, setEmailBody] = useState("");

  const [overviewModalBiz, setOverviewModalBiz] = useState<Business | null>(null);
  const [actionMenuBiz, setActionMenuBiz] = useState<Business | null>(null);
  const [deleteConfirmBiz, setDeleteConfirmBiz] = useState<Business | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const filteredBusinesses = businesses.filter((biz) => {
    const matchesSearch =
      biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      biz.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      biz.cac.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || biz.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Partners", val: "1,248", sub: "Active accounts", icon: <Building2 className="w-4 h-4 text-blue-600 shrink-0" /> },
    { label: "Premium Tier", val: "142", sub: "Yearly PRO booths", icon: <Trophy className="w-4 h-4 text-orange-600 shrink-0" /> },
    { label: "Verified Entities", val: "890", sub: "KYB approved", icon: <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { label: "Partner GMV", val: "£14.2M", sub: "Gross trade volume", icon: <TrendingUp className="w-4 h-4 text-purple-600 shrink-0" /> }
  ];

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailModalBiz) return;
    showToast(`Dispatch sent to ${emailModalBiz.name} (${emailModalBiz.email})`);
    setEmailModalBiz(null);
    setEmailBody("");
  };

  const handleToggleTier = (biz: Business) => {
    const nextTier: Business["status"] =
      biz.status === "Standard" ? "Verified" : biz.status === "Verified" ? "Premium" : "Standard";
    setBusinesses((prev) =>
      prev.map((b) => (b.id === biz.id ? { ...b, status: nextTier } : b))
    );
    showToast(`${biz.name} upgraded to ${nextTier} tier`);
    setActionMenuBiz(null);
  };

  const handleToggleSuspend = (biz: Business) => {
    const nextSuspended = !biz.suspended;
    setBusinesses((prev) =>
      prev.map((b) => (b.id === biz.id ? { ...b, suspended: nextSuspended } : b))
    );
    showToast(
      nextSuspended ? `${biz.name} suspended from expo directory` : `${biz.name} reactivated`
    );
    setActionMenuBiz(null);
  };

  const handleDeleteBusiness = () => {
    if (!deleteConfirmBiz) return;
    setBusinesses((prev) => prev.filter((b) => b.id !== deleteConfirmBiz.id));
    showToast(`${deleteConfirmBiz.name} permanently removed`);
    setDeleteConfirmBiz(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 relative">
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

      {/* Compact Header */}
      <div>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
          Registered Businesses
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Monitor verified exhibitors, booth activity, and seasonal partner tiers.
        </p>
      </div>

      {/* Horizontal Scroll KPI Cards on Mobile */}
      <div>
        <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {stats.map((s, i) => (
            <div
              key={i}
              className="w-[50%] min-w-[168px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 truncate">
                  {s.label}
                </span>
                {s.icon}
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-tight">
                {s.val}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5 truncate">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2 lg:hidden">
          <span className="w-4 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Search & Horizontal Scrollable Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search business name, owner, or registration ID..."
            className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:border-orange-500 text-xs sm:text-sm font-medium shadow-2xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5 md:pb-0">
          {["All", "Premium", "Verified", "Standard"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === status
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Directory Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Business & Reg ID
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Owner & Location
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Tier Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Activity
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBusinesses.map((biz) => (
                <tr key={biz.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-sm text-slate-900 leading-tight">
                      {biz.name}
                      {biz.suspended && (
                        <span className="ml-2 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                          Suspended
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                      ID: {biz.cac}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-xs text-slate-800">{biz.owner}</p>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3" /> {biz.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-black uppercase tracking-wider ${
                        biz.status === "Premium"
                          ? "text-orange-600"
                          : biz.status === "Verified"
                          ? "text-emerald-600"
                          : "text-blue-600"
                      }`}
                    >
                      {biz.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-5">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase">Events</p>
                        <p className="text-xs font-black text-slate-900">{biz.eventsHeld}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase">Revenue</p>
                        <p className="text-xs font-black text-slate-900">{biz.revenue}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEmailModalBiz(biz);
                          setEmailBody(
                            `Hello ${biz.owner},\n\nWe are reviewing your exhibitor account for ${biz.name}. Please confirm your booth registration details for the upcoming expo.`
                          );
                        }}
                        className="p-2 bg-white border border-slate-200/80 rounded-lg text-slate-500 hover:text-orange-600 hover:border-orange-200 transition-all cursor-pointer"
                        title="Email Business"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setOverviewModalBiz(biz)}
                        className="p-2 bg-white border border-slate-200/80 rounded-lg text-slate-500 hover:text-orange-600 hover:border-orange-200 transition-all cursor-pointer"
                        title="Open Booth Dossier"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActionMenuBiz(biz)}
                        className="p-2 bg-slate-900 text-white rounded-lg hover:bg-orange-600 transition-all cursor-pointer"
                        title="More Options"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked List */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredBusinesses.map((biz) => (
            <div key={biz.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-extrabold text-sm text-slate-900 truncate">
                    {biz.name}
                    {biz.suspended && (
                      <span className="ml-1.5 text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                        Suspended
                      </span>
                    )}
                  </p>
                  <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
                    {biz.owner} • {biz.location}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-black uppercase tracking-wider shrink-0 ${
                    biz.status === "Premium"
                      ? "text-orange-600"
                      : biz.status === "Verified"
                      ? "text-emerald-600"
                      : "text-blue-600"
                  }`}
                >
                  {biz.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-400 font-bold text-[10px] uppercase">
                    {biz.cac}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-700">{biz.eventsHeld} Events</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-black text-slate-900">{biz.revenue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEmailModalBiz(biz);
                      setEmailBody(
                        `Hello ${biz.owner},\n\nWe are reviewing your exhibitor account for ${biz.name}.`
                      );
                    }}
                    className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-orange-600 cursor-pointer"
                    aria-label="Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOverviewModalBiz(biz)}
                    className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-orange-600 cursor-pointer"
                    aria-label="View Booth Dossier"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActionMenuBiz(biz)}
                    className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-orange-600 cursor-pointer"
                    aria-label="Manage Business"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="py-12 text-center px-4">
            <h3 className="text-sm font-black text-slate-900 uppercase">No businesses found</h3>
            <p className="text-slate-400 text-xs mt-0.5">Try adjusting your search or filter.</p>
          </div>
        )}

        {/* Footer Pagination */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500">
            Page {currentPage} of 1 • Showing {filteredBusinesses.length} of 1,248 partners
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => showToast("Loaded next page of partners")}
              className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 1. EMAIL BUSINESS MODAL */}
      {emailModalBiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Message Exhibitor
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Direct dispatch to {emailModalBiz.name} ({emailModalBiz.email})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEmailModalBiz(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Message Body
                </label>
                <textarea
                  rows={4}
                  required
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEmailModalBiz(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. BUSINESS OVERVIEW DOSSIER MODAL */}
      {overviewModalBiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {overviewModalBiz.name}
                  </h3>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      overviewModalBiz.status === "Premium"
                        ? "bg-orange-50 text-orange-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {overviewModalBiz.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Registration ID: {overviewModalBiz.cac}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOverviewModalBiz(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Owner</span>
                <span className="font-bold text-slate-800">{overviewModalBiz.owner}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Location</span>
                <span className="font-bold text-slate-800">{overviewModalBiz.location}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Events Held</span>
                <span className="font-black text-slate-900">{overviewModalBiz.eventsHeld} Hosted</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Platform GMV</span>
                <span className="font-black text-orange-600">{overviewModalBiz.revenue}</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200/60 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">KYB & Sanction Clearance Active</span>
              </div>
              <span className="text-[10px] font-black uppercase text-emerald-700">Verified</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setOverviewModalBiz(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Redirecting to storefront for ${overviewModalBiz.name}...`);
                  setOverviewModalBiz(null);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Booth</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. BUSINESS ACTION MENU MODAL */}
      {actionMenuBiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Manage Partner</h3>
                <p className="text-[11px] text-slate-500 font-medium truncate max-w-[200px]">
                  {actionMenuBiz.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActionMenuBiz(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleToggleTier(actionMenuBiz)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-orange-50 text-slate-700 hover:text-orange-600 text-xs font-bold transition-colors cursor-pointer text-left"
              >
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Switch Tier (Current: {actionMenuBiz.status})</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleSuspend(actionMenuBiz)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-700 text-xs font-bold transition-colors cursor-pointer text-left"
              >
                <Ban className="w-4 h-4 text-amber-600" />
                <span>
                  {actionMenuBiz.suspended ? "Reactivate Account" : "Suspend Account"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmBiz(actionMenuBiz);
                  setActionMenuBiz(null);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 text-xs font-bold transition-colors cursor-pointer text-left"
              >
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Delete Exhibitor</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActionMenuBiz(null)}
                className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. CLEAN DELETE CONFIRMATION MODAL (No bulky icon, concise buttons) */}
      {deleteConfirmBiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Delete Exhibitor</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Are you sure you want to delete &ldquo;{deleteConfirmBiz.name}&rdquo;? All booth data and event registrations will be removed.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteConfirmBiz(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteBusiness}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
