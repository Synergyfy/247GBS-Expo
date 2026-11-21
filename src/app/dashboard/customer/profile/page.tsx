"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Phone,
  Globe,
  Building,
  Ticket,
  Wallet,
  Sparkles,
  ExternalLink,
  X
} from "lucide-react";

export default function CustomerProfilePage() {
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
    mcomPoints: "850 Pts"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-12">
      {/* 100% Full-Width Header */}
      <div className="pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight uppercase">
            Profile Settings
          </h1>
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Attendee
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Your attendee profile and event passport identity are automatically synchronized with Central Hub Solution.
        </p>
      </div>

      {/* Floating Toast Notification (Slides in from top-right) */}
      <AnimatePresence>
        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-6 right-4 sm:right-8 z-50 bg-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-white/10 flex items-start sm:items-center gap-3 max-w-sm sm:max-w-md"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 text-white shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0 pr-1">
              <p className="text-xs font-bold text-white">Profile Synced</p>
              <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                Your attendee identity, passport status, and contact details are fully synced with Central Hub Solution.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSavedSuccess(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg ml-auto shrink-0 transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
            Automatically synchronized with Central Hub Solution (CHS)
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

