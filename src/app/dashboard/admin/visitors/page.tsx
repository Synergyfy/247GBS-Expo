"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Mail,
  User,
  Ticket,
  CreditCard,
  History,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  MapPin,
  Award,
  X,
  CheckCircle2,
  QrCode,
  Download,
  ShieldAlert,
  Send
} from "lucide-react";

interface Visitor {
  id: string;
  name: string;
  email: string;
  type: "Guest" | "Standard" | "VIP";
  country: string;
  joinDate: string;
  ticketsPurchased: number;
  totalSpent: string;
  lastActive: string;
  revoked?: boolean;
}

const INITIAL_VISITORS: Visitor[] = [
  {
    id: "v_1",
    name: "Samuel Etim",
    email: "samuel@example.com",
    type: "VIP",
    country: "Nigeria",
    joinDate: "2026-01-05",
    ticketsPurchased: 8,
    totalSpent: "£620.00",
    lastActive: "2 hours ago"
  },
  {
    id: "v_2",
    name: "Emma Wilson",
    email: "emma.w@domain.com",
    type: "Standard",
    country: "UK",
    joinDate: "2026-01-12",
    ticketsPurchased: 3,
    totalSpent: "£145.00",
    lastActive: "Active now"
  },
  {
    id: "v_3",
    name: "Chen Wei",
    email: "chen.wei@china-hub.cn",
    type: "Guest",
    country: "China",
    joinDate: "2026-02-05",
    ticketsPurchased: 0,
    totalSpent: "£0.00",
    lastActive: "5 days ago"
  },
  {
    id: "v_4",
    name: "Isabella Garcia",
    email: "isabella@tech.es",
    type: "VIP",
    country: "Spain",
    joinDate: "2025-12-15",
    ticketsPurchased: 12,
    totalSpent: "£1,240.00",
    lastActive: "1 day ago"
  }
];

export default function AdminVisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>(INITIAL_VISITORS);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Contextual menu state
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modals
  const [selectedVisitorForDossier, setSelectedVisitorForDossier] = useState<Visitor | null>(null);
  const [resendConfirmVisitor, setResendConfirmVisitor] = useState<Visitor | null>(null);
  const [tierConfirmState, setTierConfirmState] = useState<{
    visitor: Visitor;
    newType: Visitor["type"];
  } | null>(null);
  const [revokeConfirmVisitor, setRevokeConfirmVisitor] = useState<Visitor | null>(null);

  // Toast
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
      if (!target.closest(".visitor-menu-container")) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || visitor.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const stats = [
    { label: "Total Visitors", val: "42,891", sub: "+12% this month", icon: <User className="w-4 h-4 text-blue-600 shrink-0" /> },
    { label: "Ticket Revenue", val: "£284k", sub: "+5.4% growth", icon: <CreditCard className="w-4 h-4 text-orange-600 shrink-0" /> },
    { label: "Active Passes", val: "8,412", sub: "19% conversion", icon: <Award className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { label: "Retention", val: "64%", sub: "Repeat visitors", icon: <History className="w-4 h-4 text-purple-600 shrink-0" /> }
  ];

  const handleConfirmTierChange = () => {
    if (!tierConfirmState) return;
    const { visitor, newType } = tierConfirmState;
    setVisitors((prev) =>
      prev.map((item) => (item.id === visitor.id ? { ...item, type: newType } : item))
    );
    showToast(`${visitor.name}'s pass updated to ${newType}`);
    setTierConfirmState(null);
    setActiveMenuId(null);
  };

  const handleConfirmRevoke = () => {
    if (!revokeConfirmVisitor) return;
    const nextRevoked = !revokeConfirmVisitor.revoked;
    setVisitors((prev) =>
      prev.map((item) =>
        item.id === revokeConfirmVisitor.id ? { ...item, revoked: nextRevoked } : item
      )
    );
    showToast(
      nextRevoked
        ? `Pass revoked for ${revokeConfirmVisitor.name}`
        : `Pass reactivated for ${revokeConfirmVisitor.name}`
    );
    setRevokeConfirmVisitor(null);
    setActiveMenuId(null);
  };

  const handleConfirmResend = () => {
    if (!resendConfirmVisitor) return;
    showToast(`Pass confirmation dispatched to ${resendConfirmVisitor.email}`);
    setResendConfirmVisitor(null);
    setActiveMenuId(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-4 sm:right-8 z-[9999] bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 max-w-sm sm:max-w-md animate-in fade-in slide-in-from-top-3">
          <div className="w-7 h-7 rounded-xl bg-orange-600 flex items-center justify-center shrink-0 text-white">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold flex-1">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Compact Header */}
      <div>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
          Attendees & Visitors
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Monitor attendee registrations, season pass redemptions, and platform engagement.
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

      {/* Control Bar: Search + Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Filter by visitor name or email..."
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
          {["All", "VIP", "Standard", "Guest"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                typeFilter === type
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Visitor Directory */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-visible">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Visitor Profile
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Pass Tier
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Engagement
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Last Active
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-sm text-slate-900 leading-tight">
                      {visitor.name}
                      {visitor.revoked && (
                        <span className="ml-2 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                          Revoked
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {visitor.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-black uppercase tracking-wider ${
                        visitor.type === "VIP"
                          ? "text-purple-600"
                          : visitor.type === "Standard"
                          ? "text-blue-600"
                          : "text-slate-500"
                      }`}
                    >
                      {visitor.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-6">
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase block">
                          Tickets
                        </span>
                        <div className="flex items-center gap-1">
                          <Ticket className="w-3.5 h-3.5 text-orange-500" />
                          <span className="text-xs font-black text-slate-900">
                            {visitor.ticketsPurchased}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase block">
                          Spent
                        </span>
                        <span className="text-xs font-black text-slate-900">
                          {visitor.totalSpent}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-700">{visitor.lastActive}</p>
                    <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3" /> {visitor.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 relative visitor-menu-container">
                      <button
                        type="button"
                        onClick={() => setSelectedVisitorForDossier(visitor)}
                        className="p-2 bg-white border border-slate-200/80 rounded-lg text-slate-500 hover:text-orange-600 hover:border-orange-200 transition-all cursor-pointer"
                        title="View Attendee Dossier"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenuId(activeMenuId === visitor.id ? null : visitor.id)
                        }
                        className={`p-2 rounded-lg transition-all cursor-pointer ${
                          activeMenuId === visitor.id
                            ? "bg-orange-600 text-white"
                            : "bg-white border border-slate-200/80 text-slate-500 hover:text-orange-600"
                        }`}
                        title="More Options"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {/* CONTEXTUAL DROPDOWN MENU */}
                      {activeMenuId === visitor.id && (
                        <div className="absolute right-0 top-full mt-1.5 z-40 bg-white border border-slate-200 rounded-2xl shadow-xl w-56 p-2 space-y-2 text-left animate-in fade-in zoom-in-95">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">
                              Pass Tier
                            </label>
                            <select
                              value={visitor.type}
                              onChange={(e) => {
                                const newType = e.target.value as Visitor["type"];
                                setTierConfirmState({ visitor, newType });
                                setActiveMenuId(null);
                              }}
                              className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-orange-500 cursor-pointer"
                            >
                              <option value="Guest">Guest</option>
                              <option value="Standard">Standard Pass</option>
                              <option value="VIP">VIP All-Access</option>
                            </select>
                          </div>

                          <div className="pt-1.5 border-t border-slate-100 space-y-1">
                            <button
                              type="button"
                              onClick={() => {
                                setResendConfirmVisitor(visitor);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer text-left"
                            >
                              <Mail className="w-3.5 h-3.5 text-orange-600" />
                              <span>Resend Pass Email</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setRevokeConfirmVisitor(visitor);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                            >
                              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                              <span>{visitor.revoked ? "Reactivate Pass" : "Revoke Pass"}</span>
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
          {filteredVisitors.map((visitor) => (
            <div key={visitor.id} className="p-4 space-y-2 relative visitor-menu-container">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-extrabold text-sm text-slate-900 truncate">
                    {visitor.name}
                    {visitor.revoked && (
                      <span className="ml-1.5 text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                        Revoked
                      </span>
                    )}
                  </p>
                  <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
                    {visitor.email}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-black uppercase tracking-wider shrink-0 ${
                    visitor.type === "VIP"
                      ? "text-purple-600"
                      : visitor.type === "Standard"
                      ? "text-blue-600"
                      : "text-slate-500"
                  }`}
                >
                  {visitor.type}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-500 flex items-center gap-1 font-semibold">
                    <MapPin className="w-3 h-3 text-slate-400" /> {visitor.country}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-700">
                    {visitor.ticketsPurchased} Tickets
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-black text-slate-900">{visitor.totalSpent}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedVisitorForDossier(visitor)}
                    className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-orange-600 cursor-pointer"
                    aria-label="Inspect Visitor"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMenuId(activeMenuId === visitor.id ? null : visitor.id)
                    }
                    className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-orange-600 cursor-pointer"
                    aria-label="Visitor Options"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mobile Contextual Menu */}
              {activeMenuId === visitor.id && (
                <div className="mt-2 p-2 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-left animate-in fade-in">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase px-1 mb-1">
                      Switch Pass Tier
                    </label>
                    <select
                      value={visitor.type}
                      onChange={(e) => {
                        const newType = e.target.value as Visitor["type"];
                        setTierConfirmState({ visitor, newType });
                        setActiveMenuId(null);
                      }}
                      className="w-full text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 cursor-pointer"
                    >
                      <option value="Guest">Guest</option>
                      <option value="Standard">Standard Pass</option>
                      <option value="VIP">VIP All-Access</option>
                    </select>
                  </div>

                  <div className="pt-1.5 border-t border-slate-200 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setResendConfirmVisitor(visitor);
                        setActiveMenuId(null);
                      }}
                      className="flex-1 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-center"
                    >
                      Resend Pass
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRevokeConfirmVisitor(visitor);
                        setActiveMenuId(null);
                      }}
                      className="flex-1 py-1.5 bg-red-50 border border-red-200 rounded-lg text-xs font-bold text-red-600 hover:bg-red-100 cursor-pointer text-center"
                    >
                      {visitor.revoked ? "Reactivate" : "Revoke"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Controls with Working Pagination */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500">
            Page {currentPage} of 429 • Showing {filteredVisitors.length} of 42,891
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => Math.min(429, p + 1));
                showToast(`Loaded page ${currentPage + 1} of attendees`);
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 1. VISITOR DOSSIER & QR PASS MODAL */}
      {selectedVisitorForDossier && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Attendee Dossier</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedVisitorForDossier.name} ({selectedVisitorForDossier.email})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVisitorForDossier(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QR Pass Box */}
            <div className="bg-slate-900 rounded-2xl p-4 text-white text-center space-y-2">
              <div className="w-20 h-20 bg-white rounded-xl mx-auto flex items-center justify-center text-slate-900 shadow-md">
                <QrCode className="w-14 h-14 text-slate-900" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase text-orange-400 tracking-wider">
                  247GBS Verified Pass
                </p>
                <p className="text-xs font-mono font-bold text-slate-300">
                  {selectedVisitorForDossier.id.toUpperCase()}-SECURE-QR
                </p>
              </div>
              <p className="text-[10px] text-slate-400">
                {selectedVisitorForDossier.revoked
                  ? "PASS STATUS: REVOKED BY ADMIN"
                  : "PASS STATUS: ACTIVE & SCANNABLE"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Tier</span>
                <span className="font-extrabold text-slate-900">
                  {selectedVisitorForDossier.type} Pass
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Country</span>
                <span className="font-extrabold text-slate-900">
                  {selectedVisitorForDossier.country}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Tickets Purchased
                </span>
                <span className="font-black text-orange-600">
                  {selectedVisitorForDossier.ticketsPurchased} Passes
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Total Spend
                </span>
                <span className="font-black text-slate-900">
                  {selectedVisitorForDossier.totalSpent}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedVisitorForDossier(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`QR Pass downloaded for ${selectedVisitorForDossier.name}`);
                  setSelectedVisitorForDossier(null);
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CONFIRM RESEND TICKET EMAIL MODAL */}
      {resendConfirmVisitor && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Resend Ticket Pass</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Dispatch an updated access pass and QR code to &ldquo;{resendConfirmVisitor.email}&rdquo;?
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setResendConfirmVisitor(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmResend}
                className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONFIRM TIER CHANGE MODAL */}
      {tierConfirmState && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Change Pass Tier</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Are you sure you want to change &ldquo;{tierConfirmState.visitor.name}&rdquo; from{" "}
                <span className="font-bold text-slate-700">{tierConfirmState.visitor.type}</span> to{" "}
                <span className="font-bold text-orange-600">{tierConfirmState.newType}</span>?
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

      {/* 4. CONFIRM REVOKE / REACTIVATE MODAL */}
      {revokeConfirmVisitor && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {revokeConfirmVisitor.revoked ? "Reactivate Pass" : "Revoke Access Pass"}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                {revokeConfirmVisitor.revoked
                  ? `Are you sure you want to restore access for "${revokeConfirmVisitor.name}"? Their pass will become valid immediately.`
                  : `Are you sure you want to revoke the pass for "${revokeConfirmVisitor.name}"? They will be barred from entry until reactivated.`}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setRevokeConfirmVisitor(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRevoke}
                className={`px-4 py-2 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                  revokeConfirmVisitor.revoked
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {revokeConfirmVisitor.revoked ? "Reactivate" : "Revoke"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
