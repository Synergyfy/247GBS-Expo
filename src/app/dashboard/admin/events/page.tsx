"use client";

import { useState } from "react";
import {
  Calendar,
  Plus,
  ArrowRight,
  ChevronDown,
  Percent,
  Sparkles,
  Globe,
  Building2,
  Users,
  CheckCircle2,
  Filter,
  Search,
  ExternalLink,
  ShieldCheck,
  Video,
  MapPin,
  Ticket,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import Modal from "@/app/component/Modal";

interface AdminEvent {
  id: string;
  title: string;
  type: "national" | "platform" | "business";
  typeLabel: string;
  organizer: string;
  date: string;
  location: string;
  attendees: number;
  capacity: number;
  pricing: string;
  status: "Published" | "Draft" | "Planned" | "Completed";
  description: string;
}

export default function AdminEventsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "national" | "platform" | "business">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rulesExpanded, setRulesExpanded] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "publish" | "unpublish" | "delete";
    event: AdminEvent;
  } | null>(null);

  const [events, setEvents] = useState<AdminEvent[]>([
    {
      id: "nat-1",
      title: "Autumn Digital Expo 2026 (Flagship)",
      type: "national",
      typeLabel: "National Expo",
      organizer: "247GBS Central",
      date: "Oct 10 – Oct 19, 2026",
      location: "UK Platform-Wide Hybrid",
      attendees: 1240,
      capacity: 2500,
      pricing: "£75 Access Pass",
      status: "Published",
      description: "Platform-wide flagship seasonal exhibition featuring live exhibitor pavilions and masterclasses."
    },
    {
      id: "nat-2",
      title: "Winter Frost & Fire Tech Summit 2026",
      type: "national",
      typeLabel: "National Expo",
      organizer: "247GBS Central",
      date: "Dec 05 – Dec 14, 2026",
      location: "ExCeL London & Virtual",
      attendees: 0,
      capacity: 3000,
      pricing: "£75 Access Pass",
      status: "Planned",
      description: "End-of-year seasonal climax bringing together UK enterprises and digital commerce innovators."
    },
    {
      id: "plat-1",
      title: "247GBS Merchant Onboarding & Selling Masterclass",
      type: "platform",
      typeLabel: "Platform-Led Workshop",
      organizer: "247GBS Academy",
      date: "Nov 24, 2026 • 14:00 GMT",
      location: "Live Stream & Interactive Q&A",
      attendees: 340,
      capacity: 500,
      pricing: "Free (100% Platform Sponsored)",
      status: "Published",
      description: "Official 247GBS training on optimizing digital booths, MCOM Mall product linking, and sales conversion."
    },
    {
      id: "plat-2",
      title: "AI Integration & Automated Checkout Demonstration",
      type: "platform",
      typeLabel: "Platform-Led Demonstration",
      organizer: "247GBS Tech Team",
      date: "Dec 02, 2026 • 11:00 GMT",
      location: "Virtual Main Hall",
      attendees: 185,
      capacity: 300,
      pricing: "Free for Registered Members",
      status: "Published",
      description: "Live demonstration of new Stripe & PayPal Sandbox flows and autonomous inventory replication."
    },
    {
      id: "biz-1",
      title: "Enterprise Cloud Hub X1 Product Drop",
      type: "business",
      typeLabel: "Business-Led Showcase",
      organizer: "Acme Cloud Corp",
      date: "Nov 28, 2026 • 16:00 GMT",
      location: "Booth Pavilion 4",
      attendees: 215,
      capacity: 250,
      pricing: "£25.00 Ticket Bundle",
      status: "Published",
      description: "Live hardware demonstration of new failover routers with exclusive MCOM Mall bundle discounts."
    }
  ]);

  const filteredEvents = events.filter((e) => {
    const matchesTab = activeTab === "all" || e.type === activeTab;
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase leading-snug">
            Events Directory & Management
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
            Create 247GBS Platform-led workshops, orchestrate National Expos, and oversee business-hosted events.
          </p>
        </div>

        {/* Natural width button (Never stretches to full width, never squeezes header typography) */}
        <Link
          href="/dashboard/admin/events/create"
          className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3.5 py-2 rounded-xl font-bold text-xs hover:bg-orange-700 shadow-sm transition-all active:scale-95 shrink-0 w-fit self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Event</span>
        </Link>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {[
            { id: "all", label: `All Events (${events.length})` },
            { id: "national", label: `National Expos (${events.filter((e) => e.type === "national").length})` },
            { id: "platform", label: `Platform-Led (${events.filter((e) => e.type === "platform").length})` },
            { id: "business", label: `Business-Led (${events.filter((e) => e.type === "business").length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-xs font-extrabold"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events or organizer..."
            className="w-full bg-white border border-slate-200/80 rounded-xl pl-8 pr-3 py-1.5 text-xs font-medium outline-none focus:border-orange-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all p-3.5 sm:p-4 space-y-3"
          >
            {/* Top Row: Scope Badge, Host, Title, Status & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      event.type === "platform"
                        ? "text-blue-600"
                        : event.type === "national"
                        ? "text-orange-600"
                        : "text-slate-600"
                    }`}
                  >
                    {event.typeLabel}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Host: <strong className="text-slate-700">{event.organizer}</strong>
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight leading-snug">
                  {event.title}
                </h3>
              </div>

              {/* Status Badge & Actions */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                    event.status === "Published"
                      ? "text-emerald-600"
                      : event.status === "Planned"
                      ? "text-amber-600"
                      : "text-slate-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      event.status === "Published"
                        ? "bg-emerald-500"
                        : event.status === "Planned"
                        ? "bg-amber-500"
                        : "bg-slate-400"
                    }`}
                  />
                  {event.status}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setConfirmAction({
                      type: event.status === "Published" ? "unpublish" : "publish",
                      event
                    })
                  }
                  className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
                >
                  {event.status === "Published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmAction({ type: "delete", event })}
                  className="px-2.5 py-1 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <p className="text-xs text-slate-600 leading-relaxed">
                {event.description}
              </p>
            )}

            {/* Clean Structured Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2.5 border-t border-slate-100 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-600 truncate">
                <Calendar className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span className="truncate font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 truncate">
                <Ticket className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-bold text-slate-900 truncate">{event.pricing}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 truncate">
                <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">
                  <strong className="text-slate-900">{event.attendees}</strong>/{event.capacity} booked
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collapsible Commission & Package Rules Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => setRulesExpanded((prev) => !prev)}
          className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
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

      {/* Confirmation Modal for Publish / Unpublish / Delete */}
      {confirmAction && (
        <Modal
          isOpen={!!confirmAction}
          onClose={() => setConfirmAction(null)}
          title={
            confirmAction.type === "delete"
              ? "Confirm Delete Event"
              : confirmAction.type === "publish"
              ? "Confirm Publish Event"
              : "Confirm Unpublish Event"
          }
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                {confirmAction.type === "delete"
                  ? `Are you sure you want to delete "${confirmAction.event.title}"?`
                  : confirmAction.type === "publish"
                  ? `Publish "${confirmAction.event.title}" to public directory?`
                  : `Unpublish "${confirmAction.event.title}"?`}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {confirmAction.type === "delete"
                  ? "This action cannot be undone. All registrations and directory listings associated with this event will be permanently removed."
                  : confirmAction.type === "publish"
                  ? "This event will immediately appear in the public events directory and calendar for attendees to view and book passes."
                  : "This event will be moved to Draft status and hidden from public visitors. Existing ticket holders will retain their booking records."}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmAction(null)}
                className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmAction.type === "delete") {
                    setEvents((prev) => prev.filter((item) => item.id !== confirmAction.event.id));
                  } else {
                    const newStatus = confirmAction.type === "publish" ? "Published" : "Draft";
                    setEvents((prev) =>
                      prev.map((item) =>
                        item.id === confirmAction.event.id ? { ...item, status: newStatus } : item
                      )
                    );
                  }
                  setConfirmAction(null);
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider text-white rounded-lg transition-all shadow-xs cursor-pointer ${
                  confirmAction.type === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : confirmAction.type === "publish"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-slate-900 hover:bg-slate-800"
                }`}
              >
                {confirmAction.type === "delete"
                  ? "Delete"
                  : confirmAction.type === "publish"
                  ? "Publish"
                  : "Unpublish"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
