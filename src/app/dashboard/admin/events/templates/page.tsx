"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Ticket,
  Plus,
  Trash2,
  Settings,
  X,
  Layers,
  CheckCircle2,
  Check
} from "lucide-react";
import {
  DEFAULT_EVENT_CATEGORIES,
  getStoredCategories,
  saveStoredCategories
} from "@/data/categories";
import {
  GlobalTicketTemplate,
  DEFAULT_TICKET_TEMPLATES,
  getStoredTicketTemplates,
  saveStoredTicketTemplates
} from "@/data/ticketTemplates";

export default function TicketTemplatesPage() {
  // Categories State
  const [categories, setCategories] = useState<string[]>(DEFAULT_EVENT_CATEGORIES);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Templates State
  const [templates, setTemplates] = useState<GlobalTicketTemplate[]>(DEFAULT_TICKET_TEMPLATES);
  const [templateToDelete, setTemplateToDelete] = useState<GlobalTicketTemplate | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    setCategories(getStoredCategories());
    setTemplates(getStoredTicketTemplates());

    const handleCategorySync = (e: any) => {
      if (e?.detail && Array.isArray(e.detail)) {
        setCategories(e.detail);
      }
    };

    const handleTemplateSync = (e: any) => {
      if (e?.detail && Array.isArray(e.detail)) {
        setTemplates(e.detail);
      }
    };

    window.addEventListener("event_categories_changed", handleCategorySync);
    window.addEventListener("ticket_templates_changed", handleTemplateSync);
    return () => {
      window.removeEventListener("event_categories_changed", handleCategorySync);
      window.removeEventListener("ticket_templates_changed", handleTemplateSync);
    };
  }, []);

  // Category Actions
  const handleAddCategory = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`Category "${trimmed}" already exists`);
      return;
    }
    const updated = [...categories, trimmed];
    setCategories(updated);
    saveStoredCategories(updated);
    setNewCategoryName("");
    setIsAddingCategory(false);
    showToast(`Category "${trimmed}" added successfully`);
  };

  const handleRemoveCategory = (catToRemove: string) => {
    const updated = categories.filter((c) => c !== catToRemove);
    setCategories(updated);
    saveStoredCategories(updated);
    showToast(`Category "${catToRemove}" removed`);
  };

  const handleDeleteTemplate = (id: string, name: string) => {
    const updated = templates.filter((t) => t.id !== id);
    setTemplates(updated);
    saveStoredTicketTemplates(updated);
    showToast(`Template "${name}" deleted`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 relative pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 sm:top-24 right-4 sm:right-6 z-[9999] bg-slate-900/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-xl shadow-xl border border-white/10 flex items-center gap-2.5 max-w-xs sm:max-w-sm pointer-events-auto animate-in fade-in slide-in-from-top-2">
          <div className="w-5 h-5 rounded-lg bg-orange-600 flex items-center justify-center shrink-0 text-white">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-semibold flex-1 leading-tight">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Back Link */}
      <div>
        <Link
          href="/dashboard/admin/events"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors group cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs hover:border-orange-200"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-orange-600" />
          <span>Back to Events Directory</span>
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-orange-50 text-orange-600 rounded-lg border border-orange-200/80">
              <Ticket className="w-4 h-4" />
            </span>
            <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase leading-snug">
              Ticket Templates & Event Categories
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1">
            Global ticket pricing caps, attendee access presets, and centralized event categories.
          </p>
        </div>

        <Link
          href="/dashboard/admin/events/templates/create"
          className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-orange-600 shadow-sm transition-all active:scale-95 shrink-0 w-fit cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Template</span>
        </Link>
      </div>

      {/* 1. EVENT & PRODUCT CATEGORIES */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-600" />
            <span>Event & Product Categories</span>
          </h3>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            Platform-wide categories available during event scheduling, news drafting, and booth registration.
          </p>
        </div>

        {/* Category Badges with Inline Adder */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl hover:border-slate-300 transition-all group"
            >
              <span className="text-xs font-bold text-slate-700">{cat}</span>
              <button
                type="button"
                onClick={() => handleRemoveCategory(cat)}
                className="text-slate-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer rounded"
                title={`Remove ${cat}`}
                aria-label={`Remove ${cat}`}
              >
                <X className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          ))}

          {isAddingCategory ? (
            <form
              onSubmit={handleAddCategory}
              className="inline-flex items-center gap-1.5 bg-white border-2 border-orange-500 rounded-xl px-2.5 py-1 shadow-xs animate-in fade-in"
            >
              <input
                type="text"
                autoFocus
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setIsAddingCategory(false);
                    setNewCategoryName("");
                  }
                }}
                placeholder="Category name..."
                className="w-36 sm:w-44 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                disabled={!newCategoryName.trim()}
                className="text-orange-600 hover:text-orange-700 disabled:opacity-30 p-0.5 cursor-pointer"
                title="Add Category"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategoryName("");
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingCategory(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-orange-600 hover:border-orange-400 hover:bg-orange-50/50 transition-all text-xs font-bold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          )}

          {categories.length === 0 && !isAddingCategory && (
            <div className="p-3 text-xs font-medium text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl w-full text-center">
              No categories configured yet. Click &quot;Add Category&quot; above to create one.
            </div>
          )}
        </div>
      </div>

      {/* 2. GLOBAL TICKET TEMPLATES & PRICING CAPS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-orange-600" />
              <span>Global Ticket Templates & Pricing Caps</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Standardized pricing caps and tier guidelines enforced when platform and partners host events.
            </p>
          </div>

          <Link
            href="/dashboard/admin/events/templates/create"
            className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3.5 py-2 rounded-xl font-bold hover:bg-orange-600 transition-all text-xs w-fit cursor-pointer shadow-xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Template</span>
          </Link>
        </div>

        {templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((temp) => (
              <div
                key={temp.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-orange-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {temp.status}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                      <Ticket className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">{temp.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mb-1">Access: {temp.access}</p>
                  {temp.description && (
                    <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                      {temp.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                  <span className="text-xs font-black text-orange-600 uppercase tracking-wider font-mono">
                    CAP: {temp.priceRange}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/dashboard/admin/events/templates/create?edit=${temp.id}`}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Template"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setTemplateToDelete(temp)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Template"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 sm:p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto border border-orange-200">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                No Ticket Templates Found
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                You haven&apos;t created any global ticket templates yet. Templates define pricing caps,
                access tiers, and platform revenue splits for new events.
              </p>
            </div>
            <Link
              href="/dashboard/admin/events/templates/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Template</span>
            </Link>
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {templateToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-4 sm:p-5 space-y-3 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
                <Trash2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Delete Ticket Template</h3>
                <p className="text-[11px] text-slate-500 font-medium">Confirmation required</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">&quot;{templateToDelete.name}&quot;</strong>? This template will no longer be available for newly scheduled events.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setTemplateToDelete(null)}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDeleteTemplate(templateToDelete.id, templateToDelete.name);
                  setTemplateToDelete(null);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer shadow-xs"
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
