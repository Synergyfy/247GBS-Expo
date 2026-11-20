"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Settings,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Phone,
  Globe,
  Building,
  Ticket,
  Wallet,
  Sparkles,
  ExternalLink
} from "lucide-react";

const PROFILE_TABS = [
  { label: "Profile", href: "/dashboard/customer/profile", icon: User },
  { label: "Account", href: "/dashboard/customer/settings", icon: Settings },
];

export default function CustomerProfilePage() {
  const pathname = usePathname();
  const [syncingChs, setSyncingChs] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Synced profile data from Central Hub Solution (CHS)
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+44 7911 123456",
    country: "United Kingdom",
    organization: "Apex Enterprise Logistics",
    roleTitle: "Head of Digital Operations",
    chsId: "CHS-ATT-948210",
    passportTier: "VIP Season Pass",
    passportCode: "GBX-88219-X22",
    mcomPoints: "850 Pts",
    lastSynced: "Just now"
  });

  const handleSyncFromChs = () => {
    setSyncingChs(true);
    setTimeout(() => {
      setSyncingChs(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    }, 750);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-12">
      {/* 100% Full-Width Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight uppercase">
              Profile
            </h1>
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Attendee
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Manage your Central Hub Solution profile and synced event passport identity.
          </p>
        </div>

        {/* Sync from CHS Action Button */}
        <button
          type="button"
          onClick={handleSyncFromChs}
          disabled={syncingChs}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all active:scale-95 disabled:opacity-70 self-start sm:self-auto shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncingChs ? "animate-spin" : ""}`} />
          <span>{syncingChs ? "Syncing from CHS..." : "Sync from CHS"}</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        {PROFILE_TABS.map((tab) => {
          const active = pathname === tab.href;
          const IconComp = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all ${
                active
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-orange-500 hover:text-slate-900"
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Sync Success Feedback Alert */}
      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2.5 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your attendee identity, passport status, and contact details are fully synced with Central Hub Solution.</span>
        </div>
      )}

      {/* Hero Showcase Card: Synced CHS Identity */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-xl font-extrabold shadow-md shrink-0">
              JD
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {profile.fullName}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase border border-emerald-200">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {profile.roleTitle} • {profile.organization}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] font-mono font-bold text-slate-600">
                <span>CHS ID: {profile.chsId}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 text-[11px]">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Passport Tier</span>
            <span className="font-extrabold text-orange-600 flex items-center gap-1 bg-orange-50 px-2.5 py-1 rounded-lg">
              <Ticket className="w-3 h-3" />
              {profile.passportTier}
            </span>
          </div>
        </div>

        {/* 2-Column Info Grid: Ecosystem Bridges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Digital Passport</span>
            <p className="text-xs font-mono font-bold text-slate-900">{profile.passportCode}</p>
            <span className="text-[10px] text-emerald-600 font-bold">● Entry Verified</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Unified Wallet</span>
            <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-orange-600" />
              {profile.mcomPoints}
            </p>
            <span className="text-[10px] text-slate-500 font-medium">Ready for session discounts</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Identity Authority</span>
            <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Central Hub Solution
            </p>
            <span className="text-[10px] text-slate-500 font-medium">Single Sign-On Connected</span>
          </div>
        </div>
      </div>

      {/* Main Profile Form: Synced from CHS */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-5">
        <div>
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            Synced Personal & Professional Information
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            These fields are synchronized with your verified Central Hub Solution account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Verified Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-500 font-medium cursor-not-allowed"
              />
            </div>
            <p className="text-[10px] text-slate-400">Email is governed by your primary Central Hub Solution login.</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Country / Region</label>
            <input
              type="text"
              value={profile.country}
              onChange={(e) => setProfile({ ...profile, country: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Organization / Company</label>
            <input
              type="text"
              value={profile.organization}
              onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Job Title / Role</label>
            <input
              type="text"
              value={profile.roleTitle}
              onChange={(e) => setProfile({ ...profile, roleTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400">
            Last synced from Central Hub Solution: <strong className="text-slate-600">{profile.lastSynced}</strong>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

