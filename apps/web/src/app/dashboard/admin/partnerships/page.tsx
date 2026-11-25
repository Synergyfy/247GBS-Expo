"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Handshake,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Mail,
  Building2,
  X,
  Check,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  Lock,
  AlertTriangle,
  Send,
  Copy,
} from "lucide-react";
import {
  getPartnershipTiers,
  savePartnershipTiers,
  getPartnershipInquiries,
  decidePartnershipInquiry,
  sendPartnershipEmail,
  PARTNERSHIPS_EVENT,
  PartnershipTier,
  PartnershipInquiry,
  InquiryStatus,
} from "@/data/partnerships";

const MAX_BENEFITS_PER_TIER = 8;

const STATUS_BADGE: Record<
  InquiryStatus,
  { label: string; className: string }
> = {
  under_review: {
    label: "Under Review",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  declined: {
    label: "Declined",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

export default function AdminPartnershipsPage() {
  const [activeTab, setActiveTab] = useState<"inquiries" | "tiers">("inquiries");
  const [tiers, setTiers] = useState<PartnershipTier[]>([]);
  const [inquiries, setInquiries] = useState<PartnershipInquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | InquiryStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Tier Editor Modal
  const [editingTier, setEditingTier] = useState<PartnershipTier | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PartnershipTier | null>(null);
  // Irreversible Decision Confirmation Modal
  const [decisionTarget, setDecisionTarget] = useState<{
    inquiry: PartnershipInquiry;
    decision: "approved" | "declined";
  } | null>(null);
  const [decisionNote, setDecisionNote] = useState("");
  // Email Partner Modal
  const [emailTarget, setEmailTarget] = useState<PartnershipInquiry | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadData = () => {
    setTiers(getPartnershipTiers());
    setInquiries(getPartnershipInquiries());
  };

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener(PARTNERSHIPS_EVENT, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(PARTNERSHIPS_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenDecision = (
    inquiry: PartnershipInquiry,
    decision: "approved" | "declined"
  ) => {
    setDecisionTarget({ inquiry, decision });
    setDecisionNote("");
  };

  const handleConfirmDecision = () => {
    if (!decisionTarget) return;
    const { inquiry, decision } = decisionTarget;
    const updated = decidePartnershipInquiry(inquiry.id, decision, decisionNote);
    setInquiries(updated);
    setDecisionTarget(null);
    setDecisionNote("");
    showToast(
      `Application ${inquiry.id} permanently marked as ${STATUS_BADGE[decision].label}. Business notified.`
    );
  };

  const handleOpenEmail = (inq: PartnershipInquiry) => {
    setEmailTarget(inq);
    setEmailSubject(`247GBS Expo Partnership — ${inq.tierName} (${inq.id})`);
    setEmailBody(
      `Hi ${inq.contactName},\n\nThank you for your interest in the ${inq.tierName} package for ${inq.companyName}. We'd love to discuss next steps for the upcoming expo season.\n\nBest regards,\n247GBS Expo Partnerships Team`
    );
    setCopiedEmail(false);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailTarget || !emailBody.trim()) return;
    const updated = sendPartnershipEmail(emailTarget.id, emailSubject, emailBody);
    setInquiries(updated);
    showToast(`Message sent to ${emailTarget.contactName} (${emailTarget.email}) & delivered to Business portal.`);
    setEmailTarget(null);
  };

  const handleCopyEmail = () => {
    if (!emailTarget) return;
    navigator.clipboard?.writeText(emailTarget.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleOpenAddTier = () => {
    setEditingTier({
      id: `tier-${Date.now()}`,
      name: "",
      price: "£499",
      period: "/ season",
      description: "",
      features: ["Featured Expo Directory Placement"],
      cta: "Apply Now",
      popular: false,
    });
    setNewFeature("");
    setIsBenefitsOpen(false);
  };

  const handleSaveTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTier || !editingTier.name.trim()) return;

    const exists = tiers.some((t) => t.id === editingTier.id);
    const updated = exists
      ? tiers.map((t) => (t.id === editingTier.id ? editingTier : t))
      : [...tiers, editingTier];

    setTiers(updated);
    savePartnershipTiers(updated);
    setEditingTier(null);
    showToast(`Saved "${editingTier.name}" — live on /partnership.`);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const updated = tiers.filter((t) => t.id !== deleteTarget.id);
    setTiers(updated);
    savePartnershipTiers(updated);
    showToast(`Removed tier "${deleteTarget.name}".`);
    setDeleteTarget(null);
  };

  const addFeatureToEditing = () => {
    if (!editingTier || !newFeature.trim()) return;
    if (editingTier.features.length >= MAX_BENEFITS_PER_TIER) return;
    setEditingTier({
      ...editingTier,
      features: [...editingTier.features, newFeature.trim()],
    });
    setNewFeature("");
  };

  const removeFeatureFromEditing = (idx: number) => {
    if (!editingTier) return;
    setEditingTier({
      ...editingTier,
      features: editingTier.features.filter((_, i) => i !== idx),
    });
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchesQuery =
      !q ||
      inq.companyName.toLowerCase().includes(q) ||
      inq.contactName.toLowerCase().includes(q) ||
      inq.tierName.toLowerCase().includes(q) ||
      inq.id.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const underReviewCount = inquiries.filter((i) => i.status === "under_review").length;
  const approvedCount = inquiries.filter((i) => i.status === "approved").length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            <Handshake className="w-4 h-4" />
            <span>Sponsorships & Strategic Partners</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Partnerships Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage custom Expo sponsorship tiers and partner applications. Standard exhibitors onboard separately via CHS Business Membership.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/partnership"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
          >
            <span>View Public Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          {activeTab === "tiers" && (
            <button
              onClick={handleOpenAddTier}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs sm:text-sm hover:bg-orange-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Tier</span>
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-500">Total Inquiries</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{inquiries.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-500">Under Review</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{underReviewCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-500">Approved Partners</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{approvedCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-500">Live Public Tiers</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{tiers.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "inquiries"
              ? "border-orange-600 text-orange-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Partner Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => setActiveTab("tiers")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "tiers"
              ? "border-orange-600 text-orange-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Partnership Tiers ({tiers.length})
        </button>
      </div>

      {/* Tab 1: Inquiries */}
      {activeTab === "inquiries" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search company, contact, or tier..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(["all", "under_review", "approved", "declined"] as const).map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      statusFilter === st
                        ? "bg-slate-900 text-white"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {st === "all" ? "All" : STATUS_BADGE[st].label}
                  </button>
                )
              )}
            </div>
          </div>

          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <Handshake className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No matching partnership inquiries</p>
              <p className="text-xs text-slate-500 mt-1">
                New applications submitted on /partnership will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredInquiries.map((inq) => {
                const badge = STATUS_BADGE[inq.status];
                return (
                  <div
                    key={inq.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          {inq.id}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                          <Sparkles className="w-3 h-3" />
                          {inq.tierName}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                        <span className="text-xs text-slate-400">• {inq.submittedAt}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{inq.companyName}</span>
                        </h3>
                        <span className="text-xs font-medium text-slate-600">
                          {inq.contactName} ({inq.email})
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                        {inq.message}
                      </p>

                      {inq.status !== "under_review" && (
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500 pt-1">
                          <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>
                            Final decision recorded{inq.decidedAt ? ` (${inq.decidedAt})` : ""}
                            {inq.decisionNote ? ` — "${inq.decisionNote}"` : ""}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenEmail(inq)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>
                          Email{inq.emailsSent ? ` (${inq.emailsSent})` : ""}
                        </span>
                      </button>
                      {inq.status === "under_review" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleOpenDecision(inq, "approved")}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDecision(inq, "declined")}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs font-bold transition-colors cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Decline</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Live Partnership Tiers */}
      {activeTab === "tiers" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between bg-white ${
                tier.popular ? "border-orange-500 ring-1 ring-orange-500/20" : "border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-extrabold text-slate-900">{tier.name}</h3>
                  {tier.popular && (
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider shrink-0">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-black text-slate-900">{tier.price}</span>
                  <span className="text-xs font-semibold text-slate-500">{tier.period}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {tier.description}
                </p>

                <ul className="space-y-1.5 mb-5">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setEditingTier({ ...tier, features: [...tier.features] });
                    setNewFeature("");
                    setIsBenefitsOpen(false);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Tier</span>
                </button>
                <button
                  onClick={() => setDeleteTarget(tier)}
                  aria-label={`Delete ${tier.name}`}
                  className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Tier Modal */}
      {mounted &&
        editingTier &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 pt-20 pb-24 lg:pt-24 lg:pb-8 lg:pl-68">
            <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg max-h-full flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0 bg-white">
                <h2 className="text-base font-extrabold text-slate-900">
                  {tiers.some((t) => t.id === editingTier.id)
                    ? "Edit Partnership Tier"
                    : "Add Partnership Tier"}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditingTier(null)}
                  aria-label="Close modal"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTier} className="flex flex-col flex-1 min-h-0">
                <div className="p-5 space-y-4 overflow-y-auto flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tier Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editingTier.name}
                        onChange={(e) =>
                          setEditingTier({ ...editingTier, name: e.target.value })
                        }
                        placeholder="e.g. Premier Sponsor"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        required
                        value={editingTier.cta}
                        onChange={(e) =>
                          setEditingTier({ ...editingTier, cta: e.target.value })
                        }
                        placeholder="Apply for Premier"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Price Display
                      </label>
                      <input
                        type="text"
                        required
                        value={editingTier.price}
                        onChange={(e) =>
                          setEditingTier({ ...editingTier, price: e.target.value })
                        }
                        placeholder="£799 or Custom"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Billing Period
                      </label>
                      <input
                        type="text"
                        value={editingTier.period}
                        onChange={(e) =>
                          setEditingTier({ ...editingTier, period: e.target.value })
                        }
                        placeholder="/ season"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingTier.description}
                      onChange={(e) =>
                        setEditingTier({ ...editingTier, description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingTier.popular}
                      onChange={(e) =>
                        setEditingTier({ ...editingTier, popular: e.target.checked })
                      }
                      className="w-4 h-4 accent-orange-600 rounded"
                    />
                    <span>Highlight as Recommended tier on /partnership</span>
                  </label>

                  <div className="rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setIsBenefitsOpen((prev) => !prev)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-800">
                        Included Benefits
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`text-[11px] font-bold ${
                            editingTier.features.length >= MAX_BENEFITS_PER_TIER
                              ? "text-orange-600"
                              : "text-slate-500"
                          }`}
                        >
                          {editingTier.features.length} / {MAX_BENEFITS_PER_TIER}
                        </span>
                        {isBenefitsOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </span>
                    </button>

                    {isBenefitsOpen && (
                      <div className="p-3 space-y-2 border-t border-slate-200 bg-white">
                        <div className="space-y-1.5 max-h-44 overflow-y-auto pr-0.5">
                          {editingTier.features.map((feat, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700"
                            >
                              <span className="min-w-0 break-words">{feat}</span>
                              <button
                                type="button"
                                onClick={() => removeFeatureFromEditing(idx)}
                                className="text-slate-400 hover:text-red-600 shrink-0 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {editingTier.features.length >= MAX_BENEFITS_PER_TIER ? (
                          <p className="text-[11px] font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">
                            Maximum of {MAX_BENEFITS_PER_TIER} benefits reached so pricing cards stay balanced.
                          </p>
                        ) : (
                          <div className="flex gap-2 pt-1">
                            <input
                              type="text"
                              value={newFeature}
                              onChange={(e) => setNewFeature(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addFeatureToEditing();
                                }
                              }}
                              placeholder="Add a benefit..."
                              className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-orange-500"
                            />
                            <button
                              type="button"
                              onClick={addFeatureToEditing}
                              className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shrink-0 cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-100 shrink-0 bg-white">
                  <button
                    type="button"
                    onClick={() => setEditingTier(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save & Publish</span>
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* Email Partner Modal */}
      {mounted &&
        emailTarget &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 pt-20 pb-24 lg:pt-24 lg:pb-8 lg:pl-68">
            <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg max-h-full flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0 bg-white">
                <div className="min-w-0 pr-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                    Contact Partner Applicant
                  </p>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                    {emailTarget.companyName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailTarget(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendEmail} className="flex flex-col flex-1 min-h-0">
                <div className="p-5 space-y-4 overflow-y-auto flex-1">
                  <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="min-w-0 text-xs">
                      <span className="font-bold text-slate-500 mr-1.5">To:</span>
                      <span className="font-semibold text-slate-900 break-all">
                        {emailTarget.contactName} &lt;{emailTarget.email}&gt;
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-slate-100 shrink-0 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedEmail ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-100 shrink-0 bg-white">
                  <button
                    type="button"
                    onClick={() => setEmailTarget(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* Irreversible Decision Confirmation Modal */}
      {mounted &&
        decisionTarget &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 pt-20 pb-24 lg:pt-24 lg:pb-8 lg:pl-68">
            <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md max-h-full flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={`w-4 h-4 ${
                      decisionTarget.decision === "approved"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  />
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {decisionTarget.decision === "approved"
                      ? "Approve Partnership Application?"
                      : "Decline Partnership Application?"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDecisionTarget(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4 overflow-y-auto">
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-xs text-amber-900 font-medium">
                  <strong>Final decision:</strong> Approving or declining{" "}
                  <strong>{decisionTarget.inquiry.companyName}</strong> ({decisionTarget.inquiry.tierName}) is{" "}
                  <strong>irreversible</strong> and will notify the business immediately.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {decisionTarget.decision === "approved"
                      ? "Onboarding Note (Optional)"
                      : "Reason for Declining (Optional)"}
                  </label>
                  <textarea
                    rows={3}
                    value={decisionNote}
                    onChange={(e) => setDecisionNote(e.target.value)}
                    placeholder={
                      decisionTarget.decision === "approved"
                        ? "e.g. Approved for Spring 2026 Main Hall Pavilion..."
                        : "e.g. Seasonal sponsor slots are currently full..."
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-100 shrink-0 bg-white">
                <button
                  type="button"
                  onClick={() => setDecisionTarget(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDecision}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold cursor-pointer ${
                    decisionTarget.decision === "approved"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {decisionTarget.decision === "approved" ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Approval</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Confirm Decline</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Delete Confirmation Modal */}
      {mounted &&
        deleteTarget &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 pt-20 pb-24 lg:pt-24 lg:pb-8 lg:pl-68">
            <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-sm p-5 shadow-2xl space-y-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Delete Partnership Tier?
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  This will remove <strong>{deleteTarget.name}</strong> from the public{" "}
                  <code>/partnership</code> page immediately.
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
                >
                  Delete Tier
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
