"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  UserCheck,
  Banknote,
  Loader2,
  MapPin,
  Ticket,
  X
} from "lucide-react";
import Modal from "@/app/component/Modal";

interface EventSubmission {
  id: string;
  title: string;
  host: string;
  format: "Digital Expo" | "Workshop" | "Webinar" | "Hybrid";
  tickets: string;
  price: string;
  submitted: string;
  description: string;
  capacity: number;
  category: string;
  location: string;
  status: "Pending" | "Approved" | "Rejected";
  rejectionReason?: string;
}

const INITIAL_EVENTS: EventSubmission[] = [
  {
    id: "EVT-101",
    title: "Annual Tech Symposium 2026",
    host: "Global Tech Corp",
    format: "Digital Expo",
    tickets: "VIP Pass, General Access",
    price: "£0 - £250",
    submitted: "1h ago",
    description:
      "A comprehensive 24/7 digital showcase of enterprise AI, cloud infrastructure, and live product demos for UK and international buyers.",
    capacity: 5000,
    category: "Technology",
    location: "Virtual Main Hall A",
    status: "Pending"
  },
  {
    id: "EVT-102",
    title: "Summer Sustainable Fashion Week",
    host: "Urban Threads Co.",
    format: "Hybrid",
    tickets: "Runway VIP, Standard",
    price: "£45 - £120",
    submitted: "3h ago",
    description:
      "Experience the latest trends in ethical and digital fashion. Featuring top UK designers, 3D booth showcases, and live buyer Q&A sessions.",
    capacity: 2000,
    category: "Fashion & Retail",
    location: "Hybrid Venue B • London",
    status: "Pending"
  },
  {
    id: "EVT-103",
    title: "FinTech Cross-Border Trade Workshop",
    host: "Apex Financial Systems",
    format: "Workshop",
    tickets: "Executive Tier, Standard",
    price: "£75 - £199",
    submitted: "5h ago",
    description:
      "Interactive workshop covering multi-currency escrow settlements, B2B trade financing, and automated compliance workflows.",
    capacity: 800,
    category: "Fintech",
    location: "Virtual Auditorium 2",
    status: "Pending"
  },
  {
    id: "EVT-104",
    title: "Clean Energy & Grid Innovation Summit",
    host: "GreenEnergy Pro",
    format: "Webinar",
    tickets: "Season Pass Included",
    price: "£25 - £90",
    submitted: "1d ago",
    description:
      "Keynote presentations and live technical demonstrations of commercial solar microgrids and battery storage solutions.",
    capacity: 3500,
    category: "Sustainability",
    location: "Virtual Hall C",
    status: "Approved"
  }
];

export default function ApprovalQueuePage() {
  const [events, setEvents] = useState<EventSubmission[]>(INITIAL_EVENTS);
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "capacity">("newest");

  const [selectedEvent, setSelectedEvent] = useState<EventSubmission | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredEvents = events
    .filter((e) => {
      const matchesStatus = statusFilter === "All" || e.status === statusFilter;
      const matchesSearch =
        !searchTerm.trim() ||
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "capacity") return b.capacity - a.capacity;
      if (sortOrder === "oldest") return b.id.localeCompare(a.id);
      return a.id.localeCompare(b.id);
    });

  const handleApprove = () => {
    if (!selectedEvent) return;
    setLoading(true);
    setTimeout(() => {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === selectedEvent.id ? { ...ev, status: "Approved", rejectionReason: undefined } : ev
        )
      );
      setLoading(false);
      setShowEventModal(false);
      setSelectedEvent(null);
    }, 600);
  };

  const handleRejectSubmit = () => {
    if (!selectedEvent || !rejectionReason.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === selectedEvent.id
            ? { ...ev, status: "Rejected", rejectionReason: rejectionReason.trim() }
            : ev
        )
      );
      setLoading(false);
      setShowEventModal(false);
      setSelectedEvent(null);
      setIsRejecting(false);
      setRejectionReason("");
    }, 600);
  };

  const openModerationModal = (ev: EventSubmission) => {
    setSelectedEvent(ev);
    setIsRejecting(false);
    setRejectionReason(ev.rejectionReason || "");
    setShowEventModal(true);
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-7xl mx-auto">
      {/* Compact Header */}
      <div>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
          Event Approval Queue
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Moderate business event submissions, ticket pricing caps, and hall allocations.
        </p>
      </div>

      {/* Filter Tabs (Peeping Horizontal Scroll) & Search Toolbar */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5">
          {(["All", "Pending", "Approved", "Rejected"] as const).map((status) => {
            const count =
              status === "All" ? events.length : events.filter((e) => e.status === status).length;
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shrink-0 flex items-center gap-1 ${
                  isActive
                    ? "bg-orange-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                <span>{status}</span>
                <span
                  className={`text-[10px] font-bold ${
                    isActive ? "text-orange-100" : "text-slate-400"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search event, host, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-7 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500 shadow-2xs"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="px-2.5 py-2 bg-white border border-slate-200/80 rounded-xl outline-none text-[11px] font-bold text-slate-700 shrink-0 shadow-2xs"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="capacity">Largest Capacity</option>
          </select>
        </div>
      </div>

      {/* Redesigned Event Submissions Container — Clean 3-Line Mobile Cards + Desktop Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Desktop Table Header */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-5 py-3 bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-4">Event & Category</div>
          <div className="col-span-3">Host Business & Hall</div>
          <div className="col-span-2">Pricing & Capacity</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredEvents.map((e) => (
              <div
                key={e.id}
                className="p-3.5 sm:p-4 lg:px-5 lg:py-3.5 hover:bg-slate-50/60 transition-colors"
              >
                {/* MOBILE & TABLET LAYOUT: Crisp 3-Line Scannable Card */}
                <div className="lg:hidden space-y-2">
                  {/* Line 1: Event Title + Right-Aligned Status */}
                  <div className="flex items-start justify-between gap-2.5">
                    <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                      {e.title}
                    </h3>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide shrink-0 mt-0.5 ${
                        e.status === "Approved"
                          ? "text-emerald-600"
                          : e.status === "Rejected"
                          ? "text-red-600"
                          : "text-amber-600"
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>

                  {/* Line 2: Host • Category • Format (Single clean line) */}
                  <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 min-w-0 truncate">
                    <span className="font-semibold text-slate-700 truncate">{e.host}</span>
                    <span className="text-slate-300 shrink-0">•</span>
                    <span className="text-orange-600 font-semibold shrink-0">{e.category}</span>
                    <span className="text-slate-300 shrink-0">•</span>
                    <span className="text-slate-400 shrink-0">{e.format}</span>
                  </div>

                  {/* Line 3: Unified Meta & Action Footer Row */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold min-w-0 truncate">
                      <span className="font-bold text-slate-900">{e.price}</span>
                      <span className="text-slate-300">•</span>
                      <span>{e.capacity.toLocaleString()} Pax</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 font-normal">{e.submitted}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => openModerationModal(e)}
                      className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg font-bold text-[11px] hover:bg-orange-600 transition-all inline-flex items-center gap-1 shrink-0"
                    >
                      <span>{e.status === "Pending" ? "Moderate" : "Details"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {e.status === "Rejected" && e.rejectionReason && (
                    <p className="text-[11px] text-red-600 font-medium pt-1">
                      Reason: {e.rejectionReason}
                    </p>
                  )}
                </div>

                {/* DESKTOP LAYOUT: 12-Col Grid */}
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
                  <div className="col-span-4 min-w-0">
                    <h3 className="text-[13px] font-bold text-slate-900 truncate">{e.title}</h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mt-0.5">
                      <span className="text-slate-400">{e.id}</span>
                      <span>•</span>
                      <span className="text-orange-600 font-semibold">{e.category}</span>
                      <span>•</span>
                      <span>{e.format}</span>
                    </div>
                  </div>

                  <div className="col-span-3 min-w-0 text-xs">
                    <div className="font-semibold text-slate-800 truncate">{e.host}</div>
                    <div className="text-[11px] text-slate-400 truncate">{e.location}</div>
                  </div>

                  <div className="col-span-2 text-xs">
                    <div className="font-bold text-slate-900">{e.price}</div>
                    <div className="text-[11px] text-slate-400">
                      {e.capacity.toLocaleString()} Pax • {e.submitted}
                    </div>
                  </div>

                  <div className="col-span-1">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        e.status === "Approved"
                          ? "text-emerald-600"
                          : e.status === "Rejected"
                          ? "text-red-600"
                          : "text-amber-600"
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>

                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => openModerationModal(e)}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-bold text-[11px] hover:bg-orange-600 transition-all inline-flex items-center gap-1"
                    >
                      <span>{e.status === "Pending" ? "Moderate" : "Details"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 px-4 text-center">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
              No Event Submissions Found
            </h3>
            <p className="text-[11px] text-slate-500 mb-3 max-w-xs mx-auto">
              No events match your current search or filter status.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatusFilter("All");
                setSearchTerm("");
              }}
              className="px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-[11px] font-bold hover:bg-orange-700 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* EVENT MODERATION MODAL */}
      <Modal
        isOpen={showEventModal}
        onClose={() => {
          if (!loading) {
            setShowEventModal(false);
            setSelectedEvent(null);
            setIsRejecting(false);
            setRejectionReason("");
          }
        }}
        title="Event Moderation Dossier"
      >
        {selectedEvent && (
          <div className="space-y-4">
            {!isRejecting ? (
              <>
                <div className="pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    <span className="text-slate-400">{selectedEvent.id}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-orange-600">{selectedEvent.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-700">{selectedEvent.format}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Host: {selectedEvent.host}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-[11px] pb-2.5 border-b border-slate-100">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Hall / Location
                    </p>
                    <p className="font-semibold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
                      {selectedEvent.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Max Capacity
                    </p>
                    <p className="font-semibold text-slate-800 flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-orange-600 shrink-0" />
                      {selectedEvent.capacity.toLocaleString()} Attendees
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Ticket Pricing Range
                    </p>
                    <p className="font-semibold text-slate-800 flex items-center gap-1">
                      <Banknote className="w-3 h-3 text-emerald-600 shrink-0" />
                      {selectedEvent.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Ticket Templates
                    </p>
                    <p className="font-semibold text-slate-800 flex items-center gap-1">
                      <Ticket className="w-3 h-3 text-orange-600 shrink-0" />
                      {selectedEvent.tickets}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Event Overview & Schedule Scope
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="flex gap-2 pt-2.5 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setIsRejecting(true)}
                    className="flex-1 py-2 border border-red-200 text-red-600 rounded-xl font-bold text-[11px] hover:bg-red-50 transition-all flex items-center justify-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleApprove}
                    className="flex-[1.5] py-2 bg-orange-600 text-white rounded-xl font-bold text-[11px] hover:bg-orange-700 transition-all flex items-center justify-center gap-1 shadow-xs"
                  >
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Publish
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3.5">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5 mb-1">
                    <AlertCircle className="w-4 h-4 text-red-600" /> State Reason for Rejection
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Specify why this event is being rejected. The host business will be notified immediately.
                  </p>
                </div>

                <textarea
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-xs font-medium h-24 resize-none"
                  placeholder="e.g. Ticket price exceeds the £500 seasonal pass cap..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />

                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setIsRejecting(false)}
                    className="flex-1 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={loading || !rejectionReason.trim()}
                    onClick={handleRejectSubmit}
                    className="flex-[1.5] py-2 bg-red-600 text-white rounded-xl font-bold text-xs hover:bg-red-700 transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      "Confirm Rejection"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
