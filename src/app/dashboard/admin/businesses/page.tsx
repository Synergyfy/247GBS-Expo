"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MoreVertical,
  Mail,
  Building2,
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
  Ban,
  Check
} from "lucide-react";

import { INITIAL_BUSINESSES, Business } from "./data";

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Contextual dropdown state
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modals State
  const [emailModalBiz, setEmailModalBiz] = useState<Business | null>(null);
  const [emailSubject, setEmailSubject] = useState("Exhibition Notice & Verification Status");
  const [emailBody, setEmailBody] = useState("");

  const [overviewModalBiz, setOverviewModalBiz] = useState<Business | null>(null);
  const [suspendConfirmBiz, setSuspendConfirmBiz] = useState<Business | null>(null);
  const [tierConfirmState, setTierConfirmState] = useState<{
    biz: Business;
    newTier: Business["status"];
  } | null>(null);
  const [deleteConfirmBiz, setDeleteConfirmBiz] = useState<Business | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Close contextual menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".action-menu-container")) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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
    { label: "Verified Entities", val: "890", sub: "Active verified", icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { label: "Partner GMV", val: "£14.2M", sub: "Gross trade volume", icon: <TrendingUp className="w-4 h-4 text-purple-600 shrink-0" /> }
  ];

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailModalBiz) return;
    showToast(`Dispatch sent to ${emailModalBiz.name} (${emailModalBiz.email})`);
    setEmailModalBiz(null);
    setEmailBody("");
  };

  const handleConfirmTierChange = () => {
    if (!tierConfirmState) return;
    const { biz, newTier } = tierConfirmState;
    setBusinesses((prev) =>
      prev.map((b) => (b.id === biz.id ? { ...b, status: newTier } : b))
    );
    showToast(`${biz.name} tier updated to ${newTier}`);
    setTierConfirmState(null);
    setActiveMenuId(null);
  };

  const handleConfirmSuspend = () => {
    if (!suspendConfirmBiz) return;
    const nextSuspended = !suspendConfirmBiz.suspended;
    setBusinesses((prev) =>
      prev.map((b) => (b.id === suspendConfirmBiz.id ? { ...b, suspended: nextSuspended } : b))
    );
    showToast(
      nextSuspended
        ? `${suspendConfirmBiz.name} suspended from expo directory`
        : `${suspendConfirmBiz.name} reactivated`
    );
    setSuspendConfirmBiz(null);
    setActiveMenuId(null);
  };

  const handleDeleteBusiness = () => {
    if (!deleteConfirmBiz) return;
    setBusinesses((prev) => prev.filter((b) => b.id !== deleteConfirmBiz.id));
    showToast(`${deleteConfirmBiz.name} permanently removed`);
    setDeleteConfirmBiz(null);
    setActiveMenuId(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 relative">
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
              className="w-[46%] min-w-[150px] sm:w-[180px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
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
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-visible">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-visible">
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
                    <div className="flex items-center justify-end gap-1.5 relative action-menu-container">
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
                      <Link
                        href={`/dashboard/admin/businesses/${biz.id}/booth`}
                        className="p-2 bg-white border border-slate-200/80 rounded-lg text-slate-500 hover:text-orange-600 hover:border-orange-200 transition-all cursor-pointer inline-flex items-center justify-center"
                        title="View Booth in Admin"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(activeMenuId === biz.id ? null : biz.id)}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${
                          activeMenuId === biz.id
                            ? "bg-orange-600 text-white"
                            : "bg-slate-900 text-white hover:bg-orange-600"
                        }`}
                        title="Actions"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {/* CONTEXTUAL DROPDOWN MENU */}
                      {activeMenuId === biz.id && (
                        <div className="absolute right-0 top-full mt-1.5 z-40 bg-white border border-slate-200 rounded-2xl shadow-xl w-56 p-2 space-y-2 text-left animate-in fade-in zoom-in-95">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">
                              Switch Tier
                            </label>
                            <select
                              value={biz.status}
                              onChange={(e) => {
                                const newTier = e.target.value as Business["status"];
                                setTierConfirmState({ biz, newTier });
                                setActiveMenuId(null);
                              }}
                              className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-orange-500 cursor-pointer"
                            >
                              <option value="Standard">Standard Tier</option>
                              <option value="Verified">Verified Tier</option>
                              <option value="Premium">Premium Tier</option>
                            </select>
                          </div>

                          <div className="pt-1.5 border-t border-slate-100 space-y-1">
                            <Link
                              href={`/dashboard/admin/businesses/${biz.id}/booth`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-colors cursor-pointer text-left"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                              <span>View Booth in Admin</span>
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                setSuspendConfirmBiz(biz);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors cursor-pointer text-left"
                            >
                              <Ban className="w-3.5 h-3.5 text-amber-600" />
                              <span>{biz.suspended ? "Reactivate Account" : "Suspend Account"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setDeleteConfirmBiz(biz);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                            >
                              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                              <span>Delete Exhibitor</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked List */}
        <div className="md:hidden divide-y divide-slate-100 overflow-visible">
          {filteredBusinesses.map((biz) => (
            <div key={biz.id} className="p-4 space-y-2 relative action-menu-container">
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
                  <Link
                    href={`/dashboard/admin/businesses/${biz.id}/booth`}
                    className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-orange-600 cursor-pointer inline-flex items-center justify-center"
                    aria-label="View Booth in Admin"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveMenuId(activeMenuId === biz.id ? null : biz.id)}
                    className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-orange-600 cursor-pointer"
                    aria-label="Manage Business"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mobile Contextual Dropdown */}
              {activeMenuId === biz.id && (
                <div className="mt-2 p-2 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-left animate-in fade-in">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase px-1 mb-1">
                      Switch Tier
                    </label>
                    <select
                      value={biz.status}
                      onChange={(e) => {
                        const newTier = e.target.value as Business["status"];
                        setTierConfirmState({ biz, newTier });
                        setActiveMenuId(null);
                      }}
                      className="w-full text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 cursor-pointer"
                    >
                      <option value="Standard">Standard Tier</option>
                      <option value="Verified">Verified Tier</option>
                      <option value="Premium">Premium Tier</option>
                    </select>
                  </div>

                  <div className="pt-1.5 border-t border-slate-200">
                    <Link
                      href={`/dashboard/admin/businesses/${biz.id}/booth`}
                      onClick={() => setActiveMenuId(null)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-orange-600 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      <span>View Booth in Admin</span>
                    </Link>
                  </div>

                  <div className="pt-1.5 border-t border-slate-200 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSuspendConfirmBiz(biz);
                        setActiveMenuId(null);
                      }}
                      className="flex-1 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-700 cursor-pointer text-center"
                    >
                      {biz.suspended ? "Reactivate" : "Suspend"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteConfirmBiz(biz);
                        setActiveMenuId(null);
                      }}
                      className="flex-1 py-1.5 bg-red-50 border border-red-200 rounded-lg text-xs font-bold text-red-600 hover:bg-red-100 cursor-pointer text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
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
              onClick={() => setCurrentPage((p) => p + 1)}
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
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
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

      {/* 2. CONFIRM TIER SWITCH MODAL */}
      {tierConfirmState && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Switch Partner Tier</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Are you sure you want to change &ldquo;{tierConfirmState.biz.name}&rdquo; from{" "}
                <span className="font-bold text-slate-700">{tierConfirmState.biz.status}</span> to{" "}
                <span className="font-bold text-orange-600">{tierConfirmState.newTier}</span>?
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setTierConfirmState(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmTierChange}
                className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors cursor-pointer shadow-xs"
              >
                Update Tier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONFIRM SUSPEND / REACTIVATE MODAL */}
      {suspendConfirmBiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {suspendConfirmBiz.suspended ? "Reactivate Exhibitor" : "Suspend Exhibitor"}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                {suspendConfirmBiz.suspended
                  ? `Are you sure you want to reactivate "${suspendConfirmBiz.name}"? They will regain full access to host events and display booths.`
                  : `Are you sure you want to suspend "${suspendConfirmBiz.name}"? They will not be able to host events or receive bookings until reactivated.`}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSuspendConfirmBiz(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSuspend}
                className={`px-4 py-2 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                  suspendConfirmBiz.suspended
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {suspendConfirmBiz.suspended ? "Reactivate" : "Suspend"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. CONFIRM DELETE MODAL */}
      {deleteConfirmBiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Delete Exhibitor</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Are you sure you want to delete &ldquo;{deleteConfirmBiz.name}&rdquo;? All booth data and event registrations will be permanently removed.
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
