"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Bell,
  Tv,
  ShieldCheck,
  Smartphone,
  Globe,
  CheckCircle2,
  Lock,
  LogOut,
  Moon,
  Volume2,
  X
} from "lucide-react";

export default function CustomerSettingsPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Experience and playback preferences
  const [streamQuality, setStreamQuality] = useState("1080p");
  const [autoplayDemos, setAutoplayDemos] = useState(true);
  const [chatNotifications, setChatNotifications] = useState(true);
  const [sessionAlerts, setSessionAlerts] = useState(true);
  const [rewardDropAlerts, setRewardDropAlerts] = useState(true);
  const [autoLockPassport, setAutoLockPassport] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-12">
      {/* 100% Full-Width Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight uppercase">
            Account Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Configure live stream preferences, session notifications, and account security.
          </p>
        </div>
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
              <p className="text-xs font-bold text-white">Settings Saved</p>
              <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                Account preferences saved successfully.
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

      <form onSubmit={handleSave} className="space-y-5">
        {/* Stream Playback Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                Expo Stage & Stream Playback
              </h2>
              <p className="text-[11px] text-slate-500">
                Adjust visual quality and interactive presentation settings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Default Stream Quality</label>
              <select
                value={streamQuality}
                onChange={(e) => setStreamQuality(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              >
                <option value="auto">Auto (Adaptive Bitrate)</option>
                <option value="1080p">1080p Full HD (Recommended)</option>
                <option value="720p">720p Mobile Data Saver</option>
                <option value="4k">4K Ultra HD</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Expo Timezone Display</label>
              <input
                type="text"
                disabled
                value="Europe/London (GMT+1) • Synced"
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-500 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="flex items-center justify-between gap-3 p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl cursor-pointer transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Autoplay Booth Product Demos</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Begin video demo playback when navigating into an exhibitor booth.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoplayDemos}
                onChange={(e) => setAutoplayDemos(e.target.checked)}
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 shrink-0"
              />
            </label>
          </div>
        </div>

        {/* Notifications & Reminders Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                Event Alerts & Communications
              </h2>
              <p className="text-[11px] text-slate-500">
                Choose how and when to receive notifications during the expo.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center justify-between gap-3 p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl cursor-pointer transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Keynote Session Reminders</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Receive an alert 15 minutes before your reserved sessions begin.
                </span>
              </div>
              <input
                type="checkbox"
                checked={sessionAlerts}
                onChange={(e) => setSessionAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 shrink-0"
              />
            </label>

            <label className="flex items-center justify-between gap-3 p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl cursor-pointer transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Exhibitor Chat Messages</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Notify when a booth specialist replies to your questions.
                </span>
              </div>
              <input
                type="checkbox"
                checked={chatNotifications}
                onChange={(e) => setChatNotifications(e.target.checked)}
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 shrink-0"
              />
            </label>

            <label className="flex items-center justify-between gap-3 p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl cursor-pointer transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-900 block">MCOM Rewards & Gift Quota Drops</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Get notified when live stages drop attendee bonus points.
                </span>
              </div>
              <input
                type="checkbox"
                checked={rewardDropAlerts}
                onChange={(e) => setRewardDropAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 shrink-0"
              />
            </label>
          </div>
        </div>

        {/* Security & Pass Devices Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                Security & Connected Pass Sessions
              </h2>
              <p className="text-[11px] text-slate-500">
                Single sign-on status and active digital passport devices.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Current Web Session</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase">
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Chrome on Linux • IP Verified</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-400 self-start sm:self-auto">
                Logged in via CHS SSO
              </span>
            </div>

            <label className="flex items-center justify-between gap-3 p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl cursor-pointer transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Auto-Lock Passport Code After Verification</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Require fresh authentication before displaying your QR pass code again.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoLockPassport}
                onChange={(e) => setAutoLockPassport(e.target.checked)}
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 shrink-0"
              />
            </label>
          </div>
        </div>

        {/* Save & Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95"
          >
            Save Account Settings
          </button>
        </div>
      </form>
    </div>
  );
}

