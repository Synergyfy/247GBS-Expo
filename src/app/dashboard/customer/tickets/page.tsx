"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  QrCode,
  Plus,
  History,
  Download,
  ShieldCheck,
  Check,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import Modal from "@/app/component/Modal";

interface TicketData {
  id: string;
  event: string;
  type: string;
  date: string;
  time?: string;
  location: string;
  status: "Active" | "Confirmed" | "Used";
  bundle: string[];
  qrCode: string;
}

const activeTickets: TicketData[] = [
  {
    id: "T-88219",
    event: "Global Innovation Fair (Spring 2026)",
    type: "VIP All-Season Pass",
    date: "Apr 10 – Apr 19, 2026",
    location: "Virtual Main Hall & All Booths",
    status: "Active",
    bundle: ["Waives £75 Season Entry Fee", "VIP Networking Lounge", "100 MCOM Reward Pts"],
    qrCode: "GBX-88219-X22"
  },
  {
    id: "T-99402",
    event: "AI Workshop: Future of Retail",
    type: "Executive Workshop Pass",
    date: "Apr 12, 2026",
    time: "02:00 PM",
    location: "Workshop Room A",
    status: "Confirmed",
    bundle: ["Live Q&A Access", "Session Recording"],
    qrCode: "WRK-99402-A12"
  }
];

const pastTickets: TicketData[] = [
  {
    id: "T-10023",
    event: "Winter Tech Expo 2025",
    type: "Standard Visitor Pass",
    date: "Dec 05 – Dec 14, 2025",
    location: "Virtual Main Hall",
    status: "Used",
    bundle: [],
    qrCode: "OLD-10023"
  }
];

export default function MyTicketsPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [expandedBundleId, setExpandedBundleId] = useState<string | null>(null);

  const tickets = activeTab === "active" ? activeTickets : pastTickets;

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            My Tickets & Season Passes
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Manage your event access codes, QR passes, and seasonal wallet benefits.
          </p>
        </div>
        <Link
          href="/tickets"
          className="inline-flex items-center gap-1 bg-orange-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs hover:bg-orange-700 transition-all shadow-xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Get Pass</span>
        </Link>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="flex gap-5 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("active")}
          className={`pb-2.5 font-bold text-xs uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "active"
              ? "border-orange-600 text-orange-600"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          Active Passes ({activeTickets.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`pb-2.5 font-bold text-xs uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "history"
              ? "border-orange-600 text-orange-600"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          Past Events ({pastTickets.length})
        </button>
      </div>

      {/* Ticket Grid (Clean Colored Text Metadata + Collapsible Benefits) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 items-start">
        {tickets.map((ticket) => {
          const isBundleOpen = expandedBundleId === ticket.id;
          return (
            <div
              key={ticket.id}
              className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all shadow-2xs ${
                ticket.status === "Active"
                  ? "border-orange-200/90"
                  : "border-slate-200/80"
              }`}
            >
              {/* Top Row: Pass Type • Code + Status (Colored Text, No Pills) */}
              <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider mb-1">
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span className="text-orange-600 truncate">{ticket.type}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono text-slate-500 shrink-0">{ticket.qrCode}</span>
                </div>
                <span
                  className={`font-extrabold shrink-0 ${
                    ticket.status === "Active"
                      ? "text-emerald-600"
                      : ticket.status === "Confirmed"
                      ? "text-blue-600"
                      : "text-slate-400"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 leading-snug">
                {ticket.event}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-medium mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {ticket.date}
                  {ticket.time && ` • ${ticket.time}`}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {ticket.location}
                </span>
              </div>

              {/* Collapsible Included Benefits */}
              {ticket.bundle.length > 0 && (
                <div className="mb-3 border-t border-slate-100 pt-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedBundleId((prev) => (prev === ticket.id ? null : ticket.id))
                    }
                    className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 hover:text-orange-600 transition-colors"
                  >
                    <span>Included Pass Perks ({ticket.bundle.length})</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isBundleOpen ? "rotate-180 text-orange-600" : ""
                      }`}
                    />
                  </button>
                  {isBundleOpen && (
                    <ul className="mt-2 space-y-1 bg-slate-50 p-2.5 rounded-xl text-[11px] font-medium text-slate-600">
                      {ticket.bundle.map((item) => (
                        <li key={item} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-orange-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                {ticket.status === "Active" || ticket.status === "Confirmed" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedTicket(ticket)}
                      className="flex-1 bg-slate-900 text-white py-2 rounded-xl font-bold text-xs hover:bg-orange-600 transition-all flex items-center justify-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View QR & Code</span>
                    </button>
                    {ticket.status === "Active" && (
                      <Link
                        href="/dashboard/customer/events/spring2026/lobby"
                        className="px-3 py-2 bg-orange-600 text-white rounded-xl font-bold text-xs hover:bg-orange-700 transition-all inline-flex items-center gap-1"
                      >
                        <span>Enter Lobby</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                    <button
                      type="button"
                      className="p-2 border border-slate-200/80 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      aria-label="Download pass"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setShowFeedbackModal(true);
                    }}
                    className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-xl font-bold text-xs hover:bg-orange-600 hover:text-white transition-all"
                  >
                    Rate Past Event (+20 MCOM Pts)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {tickets.length === 0 && (
        <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
          <History className="w-7 h-7 text-slate-300 mx-auto mb-2" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5">No tickets found</h3>
          <p className="text-[11px] text-slate-500">
            You haven&apos;t purchased any passes in this category yet.
          </p>
        </div>
      )}

      {/* Compact QR Modal */}
      <Modal
        isOpen={!!selectedTicket && !showFeedbackModal}
        onClose={() => setSelectedTicket(null)}
        title="Digital Access Pass"
      >
        {selectedTicket && (
          <div className="space-y-3 text-center">
            <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Authenticated Digital Pass
                </span>
                <h3 className="text-xs sm:text-sm font-bold">{selectedTicket.event}</h3>
                <p className="text-orange-400 font-bold tracking-wider text-[10px] uppercase mb-4">
                  {selectedTicket.type}
                </p>

                <div className="bg-white p-3 rounded-xl w-32 h-32 mx-auto mb-3 flex items-center justify-center">
                  <div className="grid grid-cols-6 gap-0.5 w-full h-full">
                    {[...Array(36)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-full h-full ${
                          i % 2 === 0 || i % 3 === 0 ? "bg-slate-900" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="font-mono text-xs font-bold tracking-widest text-orange-400">
                  {selectedTicket.qrCode}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-left bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px]">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Access Tier</p>
                <p className="font-bold text-slate-900">{selectedTicket.type}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Verification</p>
                <p className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Encrypted QR
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Enter code <strong>{selectedTicket.qrCode}</strong> at the virtual lobby gate or scan at physical venue terminals.
            </p>
          </div>
        )}
      </Modal>

      {/* Compact Feedback Modal */}
      <Modal
        isOpen={showFeedbackModal}
        onClose={() => {
          setShowFeedbackModal(false);
          setSelectedTicket(null);
          setRating(0);
          setReviewText("");
          setIsSubmitted(false);
        }}
        title={isSubmitted ? "Feedback Submitted" : "Rate Event Experience"}
      >
        {selectedTicket && (
          <div className="space-y-4">
            {!isSubmitted ? (
              <>
                <div className="text-center">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {selectedTicket.event}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Earn +20 MCOM Reward Points for sharing your feedback.
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-transform hover:scale-110 ${
                        rating >= star ? "text-amber-400" : "text-slate-200"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-xs resize-none"
                  rows={3}
                  placeholder="Share your thoughts on the sessions and booths..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  disabled={rating === 0}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-all disabled:opacity-50"
                >
                  Submit Review
                </button>
              </>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Thank You!</h3>
                <p className="text-xs text-slate-500">
                  +20 MCOM Points have been credited to your MCOM Rewards balance.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setSelectedTicket(null);
                    setIsSubmitted(false);
                    setRating(0);
                    setReviewText("");
                  }}
                  className="w-full py-2.5 bg-orange-600 text-white rounded-xl font-bold text-xs hover:bg-orange-700 transition-all"
                >
                  Back to Pass Wallet
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
