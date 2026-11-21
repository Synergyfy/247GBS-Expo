"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Ticket,
  Save,
  CheckCircle2,
  Info,
  DollarSign,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Check,
  Percent
} from "lucide-react";
import Tooltip from "@/app/component/Tooltip";
import {
  GlobalTicketTemplate,
  getStoredTicketTemplates,
  saveStoredTicketTemplates
} from "@/data/ticketTemplates";

export default function CreateTicketTemplatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams?.get("edit");

  const [name, setName] = useState("");
  const [access, setAccess] = useState("General");
  const [isGiftOnly, setIsGiftOnly] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [commission, setCommission] = useState("10% Platform Split");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Draft">("Active");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (editId) {
      const stored = getStoredTicketTemplates();
      const existing = stored.find((t) => t.id === editId);
      if (existing) {
        setName(existing.name);
        setAccess(existing.access);
        setIsGiftOnly(Boolean(existing.isGiftOnly));
        setMinPrice(existing.minPrice);
        setMaxPrice(existing.maxPrice);
        setCommission(existing.commission || "10% Platform Split");
        setDescription(existing.description || "");
        setStatus(existing.status === "Draft" ? "Draft" : "Active");
      }
    }
  }, [editId]);

  const accessOptions = [
    "General",
    "Full Hall + Lounge",
    "Specific Booth",
    "Keynote & Workshop Only",
    "VIP All-Access Pass"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setIsSubmitting(true);

    const priceRange = isGiftOnly ? "GIFT ONLY" : `£${minPrice} - £${maxPrice}`;

    setTimeout(() => {
      const stored = getStoredTicketTemplates();

      if (editId) {
        // Update existing template
        const updated = stored.map((t) =>
          t.id === editId
            ? {
                ...t,
                name: trimmed,
                access,
                minPrice,
                maxPrice,
                isGiftOnly,
                priceRange,
                status,
                commission,
                description
              }
            : t
        );
        saveStoredTicketTemplates(updated);
      } else {
        // Create new template
        const newTemplate: GlobalTicketTemplate = {
          id: `tpl_${Date.now()}`,
          name: trimmed,
          access,
          minPrice,
          maxPrice,
          isGiftOnly,
          priceRange,
          status,
          commission,
          description
        };
        saveStoredTicketTemplates([...stored, newTemplate]);
      }

      setSubmitted(true);
      setTimeout(() => {
        router.push("/dashboard/admin/events/templates");
      }, 700);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4 pb-14">
      {/* Top Header with Back Navigation */}
      <div className="pb-2.5 sm:pb-3 border-b border-slate-200/80">
        <Link
          href="/dashboard/admin/events/templates"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-orange-600 uppercase tracking-wider mb-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Ticket Templates
        </Link>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase leading-snug">
          {editId ? "Edit Ticket Template" : "Create Global Ticket Template"}
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
          Establish price boundaries, access tiers, and platform revenue splits for platform and partner events.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2 animate-in fade-in">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase">
            {editId ? "Ticket Template Updated Successfully" : "Ticket Template Created Successfully"}
          </h2>
          <p className="text-xs text-slate-600">
            &quot;{name}&quot; is now saved as a platform global preset. Redirecting back to templates...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card 1: Template Identity & Access Tier */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Template Identity & Access Tier</span>
              </h2>
              <span className="self-start sm:self-auto text-[10px] font-black uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200/80 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                Global Preset
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <span>Template Name</span>
                  <span className="text-orange-600">*</span>
                  <Tooltip content="The public headline of this ticket tier (e.g. Standard Day Pass, VIP Experience).">
                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Standard Day Pass"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <span>Access Level</span>
                  <span className="text-orange-600">*</span>
                </label>
                <div className="relative">
                  <select
                    value={access}
                    onChange={(e) => setAccess(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-orange-500 appearance-none cursor-pointer"
                  >
                    {accessOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Template Description (Optional)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what access, perks, and booth privileges are included..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>
          </div>

          {/* Card 2: Pricing Cap Configuration */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="border-b border-slate-100 pb-2.5">
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Pricing Cap & Tier Boundaries</span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Set maximum and minimum ticket price boundaries enforced when organizers create events under this template.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-6 py-1">
                <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="priceType"
                    checked={!isGiftOnly}
                    onChange={() => setIsGiftOnly(false)}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Paid Tier (Capped)</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Exhibitors can price tickets freely within the defined bounds
                    </span>
                  </div>
                </label>

                <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="priceType"
                    checked={isGiftOnly}
                    onChange={() => setIsGiftOnly(true)}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Gift Only / Free</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Complimentary attendee admission, platform-sponsored
                    </span>
                  </div>
                </label>
              </div>

              {!isGiftOnly ? (
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Allowed Price Cap Range (£)
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Minimum Price</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          £
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Maximum Cap</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          £
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-1 flex items-center gap-2 text-xs font-medium text-slate-600">
                  <Info className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>
                    This ticket template will be designated as complimentary/gift-only. Attendees will not be charged admission.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Platform Split & Status */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="border-b border-slate-100 pb-2.5">
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Platform Split & Status</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Platform Split Note
                </label>
                <input
                  type="text"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  placeholder="e.g. 10% Platform Split"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Preset Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Active" | "Draft")}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Active">Active (Available for Events)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Live Template Showcase Preview */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Live Preset Preview</span>
              </span>
              <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                {status}
              </span>
            </div>

            <div className="space-y-2 pt-0.5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {name.trim() || "Untitled Ticket Template"}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">Access: {access}</p>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs sm:text-sm font-black text-orange-600 uppercase font-mono block">
                    CAP: {isGiftOnly ? "GIFT ONLY" : `£${minPrice} - £${maxPrice}`}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block">{commission}</span>
                </div>
              </div>
              {description.trim() ? (
                <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 leading-relaxed">
                  {description}
                </p>
              ) : (
                <p className="text-[11px] text-slate-400 italic border-t border-slate-100 pt-2">
                  No description provided yet.
                </p>
              )}
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Link
              href="/dashboard/admin/events/templates"
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? "Saving Preset..." : editId ? "Save Changes" : "Create Ticket Template"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
