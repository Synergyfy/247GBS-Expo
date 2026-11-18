"use client";

import { useState } from "react";
import Modal from "../../../component/Modal";
import { Calendar, Plus, ArrowRight, ChevronDown, Percent } from "lucide-react";
import Link from "next/link";

export default function EventPlannerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // First seasonal event expanded by default; users can collapse/expand any card
  const [expandedEvent, setExpandedEvent] = useState<number | null>(0);
  const [rulesExpanded, setRulesExpanded] = useState(false);

  const events = [
    {
      title: "Spring Awakening Expo",
      date: "Mar 15 – Mar 20",
      exhibitors: 215,
      reach: "18%",
      status: "Active"
    },
    {
      title: "Summer Splash Showcase",
      date: "Jun 10 – Jun 15",
      exhibitors: 450,
      reach: "24%",
      status: "Planned"
    },
    {
      title: "Autumn Harvest Fair",
      date: "Sep 22 – Sep 27",
      exhibitors: 0,
      reach: "12%",
      status: "Upcoming"
    },
    {
      title: "Frost & Fire Festival",
      date: "Dec 01 – Dec 06",
      exhibitors: 0,
      reach: "15%",
      status: "Upcoming"
    }
  ];

  const toggleEvent = (index: number) => {
    setExpandedEvent((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Events Directory & Planner
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Orchestrate the 4 seasonal exhibition cycles and commission packages.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1 bg-orange-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs hover:bg-orange-700 shadow-sm transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Event</span>
        </button>
      </div>

      {/* Collapsible Seasonal Cycles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
        {events.map((event, i) => {
          const isOpen = expandedEvent === i;
          return (
            <div
              key={i}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                event.status === "Active"
                  ? "border-orange-300/80 shadow-2xs"
                  : "border-slate-200/80 shadow-2xs"
              }`}
            >
              {/* Collapsible Header Button */}
              <button
                type="button"
                onClick={() => toggleEvent(i)}
                className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50/60 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-[10px] uppercase tracking-wider">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        event.status === "Active"
                          ? "text-emerald-600"
                          : event.status === "Planned"
                          ? "text-orange-600"
                          : "text-slate-400"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {event.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {!isOpen && (
                    <span className="text-[11px] font-semibold text-slate-500">
                      {event.exhibitors} booths
                    </span>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-orange-600" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Collapsible Body */}
              {isOpen && (
                <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-2.5 border-t border-slate-100 space-y-3">
                  <div className="grid grid-cols-2 gap-3 bg-slate-50/70 rounded-xl p-2.5">
                    <div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900">
                        {event.exhibitors}
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
                        Confirmed Booths
                      </div>
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900">
                        {event.reach}
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
                        Market Reach
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 border border-slate-200 text-slate-700 font-bold text-[11px] py-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      Edit Layout
                    </button>
                    <Link
                      href="/dashboard/admin/passes"
                      className="flex-1 bg-slate-900 text-white font-bold text-[11px] py-2 rounded-xl hover:bg-orange-600 transition-colors text-center inline-flex items-center justify-center gap-1"
                    >
                      <span>Pass Pricing</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Compact Collapsible Commission & Package Rules Card (Replaces bulky dark banner) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => setRulesExpanded((prev) => !prev)}
          className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50/60 transition-colors"
          aria-expanded={rulesExpanded}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Percent className="w-4 h-4 text-orange-600 shrink-0" />
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                Exhibitor Package & Commission Rules
              </h3>
              <p className="text-[11px] text-slate-500 truncate">
                PAYG 12.5% • Yearly PRO 5% • Avg. Merchant Fee £215
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
              rulesExpanded ? "rotate-180 text-orange-600" : ""
            }`}
          />
        </button>

        {rulesExpanded && (
          <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-2.5 border-t border-slate-100 space-y-3">
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2 flex items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900">Standard PAYG</span>
                  <span className="text-slate-400 text-[11px] block">
                    £50 base registration fee per event
                  </span>
                </div>
                <span className="font-extrabold text-orange-600 text-xs shrink-0">
                  12.5% Commission
                </span>
              </div>

              <div className="py-2 flex items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900">Yearly PRO Partner</span>
                  <span className="text-slate-400 text-[11px] block">
                    £1,200 annual all-season access pass
                  </span>
                </div>
                <span className="font-extrabold text-emerald-600 text-xs shrink-0">
                  5% Commission
                </span>
              </div>

              <div className="py-2 flex items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900">Avg. Fee per Merchant</span>
                  <span className="text-emerald-600 text-[10px] font-bold block">
                    +£12 YoY growth
                  </span>
                </div>
                <span className="font-extrabold text-slate-900 text-xs shrink-0">£215</span>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Link
                href="/dashboard/admin/passes"
                className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-[11px] font-bold hover:bg-orange-600 transition-colors inline-flex items-center gap-1"
              >
                <span>Configure Pass Tiers</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Seasonal Event"
      >
        <form
          className="space-y-3.5"
          onSubmit={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
          }}
        >
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
              Event Title
            </label>
            <input
              type="text"
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold outline-none focus:border-orange-600 transition-all"
              placeholder="e.g. Winter Tech Summit 2026"
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Start Date
              </label>
              <input
                type="date"
                className="w-full bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-xl text-xs font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                End Date
              </label>
              <input
                type="date"
                className="w-full bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-xl text-xs font-bold outline-none"
              />
            </div>
          </div>

          <div className="pt-2.5 flex gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2 border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-600 text-white py-2 rounded-xl font-bold text-xs shadow-sm hover:bg-orange-700"
            >
              Confirm Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
