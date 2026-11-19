"use client";

import { useState } from "react";
import Modal from "../../../component/Modal";
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
  Video
} from "lucide-react";
import Link from "next/link";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "national" | "platform" | "business">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rulesExpanded, setRulesExpanded] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState<string | null>("nat-1");

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

  // Form state for creating events
  const [formData, setFormData] = useState({
    title: "",
    type: "platform" as "national" | "platform" | "business",
    category: "Workshop",
    organizer: "247GBS Academy",
    date: "",
    location: "Virtual Main Hall",
    capacity: "500",
    pricingType: "free" as "free" | "paid",
    price: "0",
    description: "",
    status: "Published" as "Published" | "Draft"
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newEvt: AdminEvent = {
      id: `evt-${Date.now()}`,
      title: formData.title,
      type: formData.type,
      typeLabel:
        formData.type === "national"
          ? "National Expo"
          : formData.type === "platform"
          ? `Platform-Led ${formData.category}`
          : "Business-Led Event",
      organizer: formData.type === "platform" ? "247GBS Admin" : formData.organizer || "247GBS Central",
      date: formData.date || "Upcoming 2026",
      location: formData.location || "Virtual Stage",
      attendees: 0,
      capacity: parseInt(formData.capacity, 10) || 500,
      pricing: formData.pricingType === "free" ? "Free Registration" : `£${parseFloat(formData.price || "0").toFixed(2)} Entry`,
      status: formData.status,
      description: formData.description || "Organized and verified by 247GBS Administration."
    };

    setEvents([newEvt, ...events]);
    setExpandedEvent(newEvt.id);
    setIsModalOpen(false);
    setFormData({
      title: "",
      type: "platform",
      category: "Workshop",
      organizer: "247GBS Academy",
      date: "",
      location: "Virtual Main Hall",
      capacity: "500",
      pricingType: "free",
      price: "0",
      description: "",
      status: "Published"
    });
  };

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
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Events Directory & Management
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Create 247GBS Platform-led workshops, orchestrate National Expos, and oversee business-hosted events.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3.5 py-2 rounded-xl font-bold text-xs hover:bg-orange-700 shadow-sm transition-all active:scale-95 shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Event</span>
        </button>
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
        {filteredEvents.map((event) => {
          const isExpanded = expandedEvent === event.id;
          return (
            <div
              key={event.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                event.type === "platform"
                  ? "border-blue-200/80 shadow-xs"
                  : event.type === "national"
                  ? "border-orange-200/80 shadow-xs"
                  : "border-slate-200/80 shadow-xs"
              }`}
            >
              <div
                onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                className="p-3.5 sm:p-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
              >
                {/* Line 1: Type Badge, Organizer, Status */}
                <div className="flex items-center justify-between gap-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        event.type === "platform"
                          ? "bg-blue-100 text-blue-700"
                          : event.type === "national"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {event.typeLabel}
                    </span>
                    <span className="text-slate-400 truncate">by {event.organizer}</span>
                  </div>
                  <span
                    className={`font-extrabold ${
                      event.status === "Published"
                        ? "text-emerald-600"
                        : event.status === "Planned"
                        ? "text-orange-600"
                        : "text-slate-500"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                {/* Line 2: Title & Details */}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                    {event.title}
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isExpanded ? "rotate-180 text-orange-600" : ""
                    }`}
                  />
                </div>

                {/* Line 3: Date, Location, Pricing */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                    <Calendar className="w-3 h-3 text-orange-600" />
                    {event.date}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>{event.location}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-900">{event.pricing}</span>
                  <span className="text-slate-300">•</span>
                  <span>
                    Bookings: <strong className="text-slate-900">{event.attendees}/{event.capacity}</strong>
                  </span>
                </div>
              </div>

              {/* Expanded Management Area */}
              {isExpanded && (
                <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-2.5 border-t border-slate-100 bg-slate-50/50 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Admin Controls:
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Live on Public Portal
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEvents((prev) =>
                            prev.map((e) =>
                              e.id === event.id
                                ? { ...e, status: e.status === "Published" ? "Draft" : "Published" }
                                : e
                            )
                          );
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 cursor-pointer"
                      >
                        {event.status === "Published" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEvents((prev) => prev.filter((e) => e.id !== event.id));
                        }}
                        className="px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-[11px] font-bold cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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

      {/* COMPREHENSIVE ADMIN CREATE EVENT MODAL (Storyline §6.2) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Platform or National Event"
      >
        <form className="space-y-3.5" onSubmit={handleCreateEvent}>
          {/* Ownership & Event Type Switcher */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
              Event Ownership & Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "platform", label: "Platform-Led", sub: "247GBS Activity" },
                { id: "national", label: "National Expo", sub: "Seasonal Flagship" },
                { id: "business", label: "Business-Led", sub: "On Behalf Of" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: t.id as any })}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.type === t.id
                      ? "border-orange-600 bg-orange-50/50 shadow-2xs font-extrabold"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">{t.label}</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">{t.sub}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
              Event Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold outline-none focus:border-orange-600 transition-all"
              placeholder="e.g. 247GBS Digital Seller Masterclass"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Format / Sub-Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-xl text-xs font-bold outline-none"
              >
                <option>Workshop</option>
                <option>Demonstration</option>
                <option>Seller Training</option>
                <option>Keynote Showcase</option>
                <option>Product Launch</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Date & Schedule
              </label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-xl text-xs font-medium outline-none"
                placeholder="e.g. Dec 10, 2026 • 15:00 GMT"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Location / Access Link
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-xl text-xs font-medium outline-none"
                placeholder="e.g. Virtual Main Hall"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Max Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-xl text-xs font-medium outline-none"
                placeholder="500"
              />
            </div>
          </div>

          {/* Pricing Model */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Pricing Structure
              </label>
              <select
                value={formData.pricingType}
                onChange={(e) => setFormData({ ...formData, pricingType: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-xl text-xs font-bold outline-none"
              >
                <option value="free">Free to Attend</option>
                <option value="paid">Paid Admission</option>
              </select>
            </div>
            {formData.pricingType === "paid" && (
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                  Price (£)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-xl text-xs font-bold outline-none"
                  placeholder="25.00"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
              Event Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium outline-none resize-none"
              placeholder="Summary of sessions, speakers, and live activities..."
            />
          </div>

          <div className="pt-2.5 flex gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2 border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-600 text-white py-2 rounded-xl font-bold text-xs shadow-sm hover:bg-orange-700 cursor-pointer"
            >
              Publish Event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
