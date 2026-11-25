"use client";

import {
  Download,
  Bell,
  Search,
  Play,
  Timer,
  Star,
  Video,
  ArrowRight,
  X,
  CalendarCheck,
  ExternalLink
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ConsultationBooking,
  getConsultations,
  CONSULTATIONS_EVENT
} from "@/data/consultations";

const scheduleData = [
  {
    id: 1,
    time: "09:00 AM",
    duration: "45 MIN",
    title: "Opening Keynote: The Future of Digital Retail",
    speaker: "Sarah Johnson",
    role: "CEO at NextGen Commerce",
    track: "Main Stage",
    type: "Keynote",
    status: "Completed",
    isLive: false
  },
  {
    id: 2,
    time: "10:30 AM",
    duration: "60 MIN",
    title: "Panel: AI in Customer Support & Commerce",
    speaker: "Tech Leaders Panel",
    role: "Multi-Brand Discussion",
    track: "Workshop A",
    type: "Panel",
    status: "Live",
    isLive: true
  },
  {
    id: 3,
    time: "01:00 PM",
    duration: "90 MIN",
    title: "Product Demo: NextGen MCOM Mall Sync",
    speaker: "FutureTech Team",
    role: "Lead Systems Engineers",
    track: "Demo Hall B",
    type: "Demo",
    status: "Upcoming",
    isLive: false
  },
  {
    id: 4,
    time: "02:30 PM",
    duration: "60 MIN",
    title: "Workshop: Scaling Global Digital Booths",
    speaker: "Emily Chen",
    role: "Growth Director",
    track: "Workshop A",
    type: "Workshop",
    status: "Upcoming",
    isLive: false
  },
  {
    id: 5,
    time: "04:00 PM",
    duration: "45 MIN",
    title: "Closing Remarks & Live Buyer Networking",
    speaker: "247GBS Expo Host",
    role: "Executive Committee",
    track: "Main Stage",
    type: "Networking",
    status: "Upcoming",
    isLive: false
  }
];

export default function SchedulePage() {
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    setConsultations(getConsultations());
    const sync = () => setConsultations(getConsultations());
    window.addEventListener(CONSULTATIONS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSULTATIONS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedSlotIds, setSavedSlotIds] = useState<number[]>([2, 3]);
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  const [reminders, setReminders] = useState({
    email15Min: true,
    pushLive: true,
    smsUrgent: false
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleToggleSaveSlot = (id: number, title: string) => {
    setSavedSlotIds((prev) => {
      const exists = prev.includes(id);
      showToast(exists ? `Removed "${title}" from saved plan.` : `Saved "${title}" to your agenda!`);
      return exists ? prev.filter((item) => item !== id) : [...prev, id];
    });
  };

  const handleDownloadAgenda = () => {
    const lines = [
      "247GBS DIGITAL EXPO — LIVE EVENT SCHEDULE",
      "=========================================",
      "",
      ...scheduleData.map(
        (ev) => `[${ev.time} • ${ev.duration}] ${ev.title} (${ev.track}) — ${ev.speaker} [${ev.status}]`
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "247GBS-Expo-Agenda.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Agenda downloaded!");
  };

  const filteredEvents = scheduleData.filter((e) => {
    const matchesTab =
      activeTab === "All" || e.type === activeTab || e.track === activeTab;
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.track.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const scheduleStats = [
    {
      label: "Current Session",
      val: "AI in Customer Support",
      sub: "Workshop A • Live Now",
      icon: Play,
      iconColor: "text-red-600"
    },
    {
      label: "Up Next",
      val: "MCOM Mall Sync Demo",
      sub: "01:00 PM • Demo Hall B",
      icon: Timer,
      iconColor: "text-orange-600"
    },
    {
      label: "My Saved Plan",
      val: "3 Sessions",
      sub: "Reminders active",
      icon: Star,
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Compact Header (No decorative pills) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Live Event Schedule
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Interactive workshops, keynote speakers, and live exhibitor product demos.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDownloadAgenda}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/80 rounded-xl text-slate-700 text-[11px] font-bold hover:bg-slate-50 transition-all shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-orange-600" />
            <span>Agenda PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setShowRemindersModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 text-white rounded-xl text-[11px] font-bold hover:bg-orange-700 transition-all shadow-xs"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Reminders</span>
          </button>
        </div>
      </div>

      {/* My 1-on-1 Booth Consultations (Synced live with Business Consultations) */}
      {consultations.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-orange-600" />
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                My 1-on-1 Booth Consultations ({consultations.length})
              </h2>
            </div>
            <Link
              href="/dashboard/customer/booths"
              className="text-[11px] font-bold text-orange-600 hover:text-orange-700"
            >
              Book another booth →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {consultations.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-slate-200/80 p-3 flex items-start justify-between gap-3 bg-slate-50/50"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{c.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        c.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : c.status === "declined"
                          ? "bg-slate-100 text-slate-600 border-slate-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {c.status === "confirmed"
                        ? "Confirmed"
                        : c.status === "declined"
                        ? "Declined"
                        : "Pending"}
                    </span>
                    <span className="text-[11px] font-bold text-orange-600">{c.slot}</span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-900 truncate">{c.boothName}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{c.topic}</p>
                  {c.responseNote && (
                    <p className="text-[11px] text-slate-500 italic line-clamp-1">
                      &ldquo;{c.responseNote}&rdquo;
                    </p>
                  )}
                </div>
                {c.status === "confirmed" && c.meetingLink && (
                  <a
                    href={c.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold hover:bg-slate-800 shrink-0"
                  >
                    <span>Join</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Horizontal Scroll KPI Strip on Mobile (Peeping Card + Dot Slider, Inline Small Icons) */}
      <div>
        <div className="flex lg:grid lg:grid-cols-3 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {scheduleStats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="w-[46%] min-w-[156px] sm:w-[210px] lg:w-auto shrink-0 snap-start p-3 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {stat.label}
                  </span>
                  <IconComponent className={`w-3.5 h-3.5 ${stat.iconColor} shrink-0`} />
                </div>
                <p className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                  {stat.val}
                </p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-1.5 lg:hidden">
          <span className="w-3.5 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Search & Peeping Horizontal Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search session title, speaker, or hall..."
            className="w-full pl-8 pr-7 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium outline-none focus:border-orange-500 shadow-2xs"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5">
          {["All", "Keynote", "Panel", "Workshop", "Demo", "Main Stage"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all ${
                activeTab === tab
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Schedule List Container (Clean 3-Line Mobile Rows, Colored Text Metadata) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden divide-y divide-slate-100">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="p-3.5 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="space-y-1 min-w-0 flex-1">
              {/* Line 1: Time • Duration • Type • Track + Status */}
              <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span className="text-slate-900 font-extrabold shrink-0">{event.time}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400 shrink-0">{event.duration}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-orange-600 shrink-0">{event.type}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 truncate">{event.track}</span>
                </div>
                <span
                  className={`shrink-0 font-extrabold ${
                    event.status === "Live"
                      ? "text-red-600"
                      : event.status === "Completed"
                      ? "text-slate-400"
                      : "text-emerald-600"
                  }`}
                >
                  {event.status === "Live" ? "● LIVE NOW" : event.status}
                </span>
              </div>

              {/* Line 2: Session Title */}
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {event.title}
              </h3>

              {/* Line 3: Speaker & Role + Mobile Action */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <p className="text-[11px] text-slate-500 truncate">
                  <span className="font-semibold text-slate-700">{event.speaker}</span>
                  <span className="mx-1.5 text-slate-300">•</span>
                  <span>{event.role}</span>
                </p>

                <div className="shrink-0">
                  {event.status === "Live" ? (
                    <Link
                      href="/dashboard/customer/events/spring2026/lobby"
                      className="inline-flex items-center gap-1 bg-orange-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg hover:bg-orange-700 transition-all shadow-2xs"
                    >
                      <Video className="w-3 h-3" />
                      <span>Join Live</span>
                    </Link>
                  ) : event.status === "Completed" ? (
                    <span className="text-[11px] font-bold text-slate-400">Ended</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleSaveSlot(event.id, event.title)}
                      className={`inline-flex items-center gap-1 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all ${
                        savedSlotIds.includes(event.id)
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-900 text-white hover:bg-orange-600"
                      }`}
                    >
                      <span>{savedSlotIds.includes(event.id) ? "Saved ✓" : "Save Slot"}</span>
                      {!savedSlotIds.includes(event.id) && <ArrowRight className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-4 sm:right-8 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Session Reminders Modal */}
      {showRemindersModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                Session Reminders
              </h3>
              <button
                type="button"
                onClick={() => setShowRemindersModal(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {[
                { key: "email15Min" as const, label: "Email 15 mins before saved sessions" },
                { key: "pushLive" as const, label: "Browser alert when keynote goes live" },
                { key: "smsUrgent" as const, label: "SMS updates for schedule changes" }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-3 py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-xs font-medium text-slate-700">{item.label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={reminders[item.key]}
                    onClick={() =>
                      setReminders((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                    }
                    className={`w-10 h-5 rounded-full transition-colors p-0.5 shrink-0 ${
                      reminders[item.key] ? "bg-orange-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                        reminders[item.key] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRemindersModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRemindersModal(false);
                    showToast("Reminder preferences saved!");
                  }}
                  className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
