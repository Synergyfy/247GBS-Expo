"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  RefreshCw,
  Calendar,
  Type,
  Clock,
  Palette,
  AlertCircle,
  CheckCircle2,
  Eye,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TICKER_EVENTS, TickerEvent } from "@/data/ticker";

export default function TickerSetupPage() {
  const [events, setEvents] = useState<TickerEvent[]>(TICKER_EVENTS);
  const [deleteTarget, setDeleteTarget] = useState<TickerEvent | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTicker, setNewTicker] = useState({
    season: "",
    event: "",
    dates: "",
    color: "orange" as TickerEvent["color"],
    isActive: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleUpdate = (id: string, field: keyof TickerEvent, value: any) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const handleAdd = () => {
    setNewTicker({
      season: "",
      event: "",
      dates: "",
      color: "orange",
      isActive: true
    });
    setIsAddModalOpen(true);
  };

  const handleConfirmAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicker.season.trim() || !newTicker.event.trim()) return;
    const created: TickerEvent = {
      id: Math.random().toString(36).substr(2, 9),
      season: newTicker.season.trim().toUpperCase(),
      dates: newTicker.dates.trim() || "TBD",
      event: newTicker.event.trim(),
      color: newTicker.color,
      isActive: newTicker.isActive
    };
    setEvents((prev) => [...prev, created]);
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const target = events.find((e) => e.id === id);
    if (target) setDeleteTarget(target);
  };

  const confirmDeleteTicker = () => {
    if (!deleteTarget) return;
    setEvents(events.filter((e) => e.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Banner Ticker Controller
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Configure the live seasonal announcements rolling across the public landing page header.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-slate-800 border border-slate-200/80 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all shadow-2xs"
          >
            <Plus className="w-4 h-4 text-orange-600" />
            <span>Add Ticker Item</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-orange-600 text-white rounded-xl font-bold text-xs hover:bg-orange-700 transition-all shadow-md disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSaving ? "Deploying..." : "Deploy to Live"}</span>
          </button>
        </div>
      </div>

      {/* Live Preview Banner (Placed at top for instant mobile visibility) */}
      <div className="bg-slate-950 rounded-2xl sm:rounded-3xl p-4 sm:p-5 overflow-hidden border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                Live Header Preview
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Active items scrolling on the public navbar
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-3 overflow-hidden">
            <div className="flex items-center gap-8 animate-scroll whitespace-nowrap">
              {events
                .filter((e) => e.isActive)
                .map((e, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-black text-xs text-white uppercase tracking-tight">
                      {e.season}
                    </span>
                    <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full">
                      <span className="text-[10px] font-black text-orange-400">{e.dates}</span>
                      <span className="w-1 h-1 bg-white/30 rounded-full" />
                      <span className="text-[10px] font-bold text-white/75">{e.event}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 22s linear infinite;
            width: max-content;
          }
        `}</style>
      </div>

      {/* Ticker Items Grid */}
      <div className="space-y-3.5">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`bg-white rounded-2xl sm:rounded-3xl border p-4 sm:p-5 shadow-2xs transition-all ${
              event.isActive
                ? "border-slate-200/80"
                : "border-slate-200/50 opacity-60 bg-slate-50/50"
            }`}
          >
            {/* Top Row on Mobile: Index + Active Toggle + Delete */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 font-black text-xs flex items-center justify-center">
                  #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdate(event.id, "isActive", !event.isActive)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      event.isActive ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        event.isActive ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {event.isActive ? "Active on Banner" : "Hidden"}
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(event.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Remove Ticker Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* 2-Column Mobile / 4-Column Desktop Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  <Calendar className="w-3 h-3 text-orange-600" /> Season Label
                </label>
                <input
                  type="text"
                  value={event.season}
                  onChange={(e) => handleUpdate(event.id, "season", e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 outline-none text-xs sm:text-sm font-bold text-slate-900"
                  placeholder="e.g. SUMMER 2026"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  <Type className="w-3 h-3 text-blue-600" /> Event Heading
                </label>
                <input
                  type="text"
                  value={event.event}
                  onChange={(e) => handleUpdate(event.id, "event", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 outline-none text-xs sm:text-sm font-bold text-slate-900"
                  placeholder="e.g. Brand Launches"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  <Clock className="w-3 h-3 text-emerald-600" /> Dates
                </label>
                <input
                  type="text"
                  value={event.dates}
                  onChange={(e) => handleUpdate(event.id, "dates", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 outline-none text-xs sm:text-sm font-bold text-slate-900"
                  placeholder="e.g. July 15-24"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  <Palette className="w-3 h-3 text-purple-600" /> Theme Accent
                </label>
                <select
                  value={event.color}
                  onChange={(e) => handleUpdate(event.id, "color", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 outline-none text-xs sm:text-sm font-bold text-slate-900 cursor-pointer"
                >
                  <option value="orange">Orange</option>
                  <option value="emerald">Emerald</option>
                  <option value="blue">Blue</option>
                  <option value="amber">Amber</option>
                  <option value="cyan">Cyan</option>
                  <option value="purple">Purple</option>
                  <option value="rose">Rose</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-white/10 text-xs font-bold whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ticker Configuration Deployed to Live!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-900 mb-1">No Ticker Items</h3>
          <p className="text-xs text-slate-500 mb-4">Add your first seasonal announcement.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="px-5 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold"
          >
            Create Item
          </button>
        </div>
      )}

      {/* Delete Ticker Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-2xl p-5 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Remove Ticker Item</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Remove <strong className="text-slate-900">{deleteTarget.season} — {deleteTarget.event}</strong> from the homepage ticker banner?
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteTicker}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Ticker Item Modal (Mobile Responsive) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-slate-100 flex items-center justify-between gap-2">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 truncate">
                Add Ticker Item
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmAddTicker} className="p-4 sm:p-5 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    <Calendar className="w-3 h-3 text-orange-600" /> Season Label
                  </label>
                  <input
                    type="text"
                    required
                    value={newTicker.season}
                    onChange={(e) => setNewTicker({ ...newTicker, season: e.target.value.toUpperCase() })}
                    placeholder="e.g. SUMMER 2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 outline-none text-xs sm:text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    <Clock className="w-3 h-3 text-emerald-600" /> Dates
                  </label>
                  <input
                    type="text"
                    required
                    value={newTicker.dates}
                    onChange={(e) => setNewTicker({ ...newTicker, dates: e.target.value })}
                    placeholder="e.g. July 15-24"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 outline-none text-xs sm:text-sm font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  <Type className="w-3 h-3 text-blue-600" /> Event Heading
                </label>
                <input
                  type="text"
                  required
                  value={newTicker.event}
                  onChange={(e) => setNewTicker({ ...newTicker, event: e.target.value })}
                  placeholder="e.g. Global Brand Launches"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 outline-none text-xs sm:text-sm font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    <Palette className="w-3 h-3 text-purple-600" /> Theme Accent
                  </label>
                  <select
                    value={newTicker.color}
                    onChange={(e) => setNewTicker({ ...newTicker, color: e.target.value as TickerEvent["color"] })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 outline-none text-xs sm:text-sm font-bold text-slate-900 cursor-pointer"
                  >
                    <option value="orange">Orange</option>
                    <option value="emerald">Emerald</option>
                    <option value="blue">Blue</option>
                    <option value="amber">Amber</option>
                    <option value="cyan">Cyan</option>
                    <option value="purple">Purple</option>
                    <option value="rose">Rose</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Active on Banner</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={newTicker.isActive}
                    onClick={() => setNewTicker({ ...newTicker, isActive: !newTicker.isActive })}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      newTicker.isActive ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        newTicker.isActive ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-xs cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
