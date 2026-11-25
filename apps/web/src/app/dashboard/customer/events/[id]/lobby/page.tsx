"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  X,
  Users,
  MessageSquare,
  Calendar,
  Share2,
  Maximize2,
  Volume2,
  Store,
  Users2,
  HelpCircle,
  Trophy,
  Send,
  KeyRound,
  ShieldCheck,
  ExternalLink,
  ShoppingBag
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  LiveChatMessage,
  INITIAL_LIVE_CHAT,
  getStoredLiveChat,
  postLiveChatMessage
} from "@/data/eventLiveChat";

const LOBBY_DATA = {
  spring2026: {
    title: "Global Innovation Fair 2026",
    organizer: "TechGlobal Inc.",
    viewers: "5,432",
    status: "Live Now",
    mainStageTitle: "Opening Keynote: The Future of Digital Ecosystems",
    presenter: "Dr. Sarah Chen, CEO of TechGlobal",
    videoPlaceholder: "/main_stage_banner.png"
  },
  default: {
    title: "Virtual Event Lobby",
    organizer: "Event Organizer",
    viewers: "1,204",
    status: "Live",
    mainStageTitle: "Main Session: Introduction to the Expo",
    presenter: "Event Moderator",
    videoPlaceholder: "/main_stage_banner.png"
  }
};

const CHAT_MESSAGES = [
  {
    id: 1,
    user: "Alex Thompson",
    message: "Amazing insights on the MCOM Mall product integration!",
    time: "10:42 AM",
    avatar: "AT"
  },
  {
    id: 2,
    user: "Maria Garcia",
    message: "Just ordered the Cloud Core Hub directly from the live showcase.",
    time: "10:43 AM",
    avatar: "MG"
  },
  {
    id: 3,
    user: "James Wilson",
    message: "The virtual booth experience is super fast on mobile.",
    time: "10:44 AM",
    avatar: "JW"
  }
];

const MCOM_MALL_BASE_URL =
  process.env.NEXT_PUBLIC_MCOM_MALL_URL || "https://mcommall.centralhubsolution.com";

const LIVE_SHOWCASE_PRODUCTS = [
  {
    id: "mcom-1",
    name: "Cloud Core Hub X1",
    booth: "FutureTech Systems",
    price: "£499.00",
    image: "/ideal.png",
    mcomUrl: `${MCOM_MALL_BASE_URL}/products/cloud-core-hub`,
    buttonLabel: "Buy Now"
  },
  {
    id: "mcom-2",
    name: "Edge Guard Pro Appliance",
    booth: "TechFlow Solutions",
    price: "£199.00",
    image: "/hero.webp",
    mcomUrl: `${MCOM_MALL_BASE_URL}/products/edge-guard-pro`,
    buttonLabel: "Book Now"
  },
  {
    id: "mcom-3",
    name: "Smart Solar Micro-Inverter",
    booth: "GreenGrid Energy",
    price: "£349.00",
    image: "/f265f1748035f3fe5d0e6839698aecfc.jpg",
    mcomUrl: `${MCOM_MALL_BASE_URL}/products/solar-micro-inverter`,
    buttonLabel: "Buy Now"
  }
];

export default function EventLobbyPage() {
  const params = useParams();
  const id = params.id as string;
  const data = LOBBY_DATA[id as keyof typeof LOBBY_DATA] || LOBBY_DATA.default;

  // Per meeting directive: Attendees enter their access pass code before entering the live event
  const [passCode, setPassCode] = useState("GBX-88219-X22");
  const [passError, setPassError] = useState("");
  const [isPassVerified, setIsPassVerified] = useState(false);
  const [isPlayingStage, setIsPlayingStage] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const DEFAULT_AGENDA = [
    { time: "10:00 AM", title: "Opening Ceremony", speaker: "Expo Main Host", type: "Live" },
    { time: "11:30 AM", title: "Keynote Session", speaker: "Industry Panel", type: "Up Next" },
    { time: "01:00 PM", title: "Networking Break", speaker: "Open Hall", type: "Scheduled" },
    { time: "02:30 PM", title: "MCOM Product Showcases", speaker: "Exhibitor Spotlight", type: "Scheduled" }
  ];
  const [agendaItems, setAgendaItems] = useState(DEFAULT_AGENDA);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("expo_event_agenda_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAgendaItems(
            parsed.map((item: { time?: string; title?: string; speaker?: string }, idx: number) => ({
              time: item.time || "TBA",
              title: item.title || "Scheduled Session",
              speaker: item.speaker || "Event Host",
              type: idx === 0 ? "Live" : idx === 1 ? "Up Next" : "Scheduled"
            }))
          );
        }
      }
    } catch {
      // keep default agenda
    }
  }, []);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<LiveChatMessage[]>(INITIAL_LIVE_CHAT);
  const [activeTab, setActiveTab] = useState("chat");

  useEffect(() => {
    const refreshChat = () => setChat(getStoredLiveChat());
    refreshChat();
    window.addEventListener("expo_live_chat_changed", refreshChat);
    window.addEventListener("storage", refreshChat);
    return () => {
      window.removeEventListener("expo_live_chat_changed", refreshChat);
      window.removeEventListener("storage", refreshChat);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const next = postLiveChatMessage({
      user: "John Doe (You)",
      role: "customer",
      message
    });
    setChat(next);
    setMessage("");
  };

  const quickDesks = [
    {
      label: "Exhibition Hall",
      count: "450 Booths",
      href: "/dashboard/customer/booths",
      icon: Store,
      iconColor: "text-blue-600"
    },
    {
      label: "Live Schedule",
      count: "12 Sessions",
      href: "/dashboard/customer/schedule",
      icon: Calendar,
      iconColor: "text-purple-600"
    },
    {
      label: "MCOM Rewards",
      count: "850 Points",
      href: "/dashboard/customer/rewards",
      icon: Trophy,
      iconColor: "text-orange-600"
    },
    {
      label: "My Pass Wallet",
      count: "VIP Active",
      href: "/dashboard/customer/tickets",
      icon: HelpCircle,
      iconColor: "text-emerald-600"
    }
  ];

  const [shareToast, setShareToast] = useState<string | null>(null);

  const handleShareEvent = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setShareToast("Event lobby link copied to clipboard!");
    setTimeout(() => setShareToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {shareToast && (
        <div className="fixed top-6 right-4 sm:right-8 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{shareToast}</span>
        </div>
      )}
      {/* Compact Lobby Header (Colored text instead of pills) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mb-0.5">
            <span className="text-red-600 flex items-center gap-1 font-extrabold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              {data.status}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-orange-600">{data.organizer}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{data.viewers} Watching</span>
          </div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            {data.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {isPassVerified && (
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Pass Verified ({passCode.trim().toUpperCase()})
            </span>
          )}
          <button
            type="button"
            onClick={handleShareEvent}
            className="p-2 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs text-slate-600 cursor-pointer"
            aria-label="Share event"
            title="Copy event link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* BLOCKING ACCESS PASS GATE — Nothing on the live stage is visible until validated */}
      {!isPassVerified ? (
        <div className="min-h-[60vh] flex items-center justify-center py-6">
          <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xl p-5 sm:p-8 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-[10px] font-extrabold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                Live Event Entry Gate
              </div>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-900 leading-snug">
                Validate Your Access Pass to Enter
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your active pass code is pre-filled below. You can edit or switch it if you prefer to use a Season or Admin Pass.
              </p>
            </div>

            {/* Quick Pass Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[
                { label: "Event Pass", code: "GBX-88219-X22" },
                { label: "VIP Season Pass", code: "GBX-VIP-2026" }
              ].map((preset) => (
                <button
                  key={preset.code}
                  type="button"
                  onClick={() => {
                    setPassCode(preset.code);
                    setPassError("");
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                    passCode.trim().toUpperCase() === preset.code
                      ? "bg-orange-50 border-orange-300 text-orange-700"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {preset.label}: {preset.code}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (passCode.trim().length < 4) {
                  setPassError("Please enter a valid access pass code.");
                  return;
                }
                setPassError("");
                setIsPassVerified(true);
                setIsPlayingStage(true);
              }}
              className="space-y-3"
            >
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Access Pass Code
                </label>
                <input
                  type="text"
                  value={passCode}
                  onChange={(e) => {
                    setPassCode(e.target.value);
                    if (passError) setPassError("");
                  }}
                  placeholder="Enter Pass Code (e.g. GBX-88219-X22)"
                  className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white uppercase"
                />
                {passError && (
                  <p className="text-[11px] font-semibold text-red-600">{passError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Validate &amp; Enter Live</span>
              </button>
            </form>

            <div className="text-center pt-1">
              <Link
                href="/dashboard/customer/events"
                className="text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors"
              >
                ← Return to Events
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Horizontal Scroll Quick Desk Cards on Mobile (Peeping Card + Dot Slider) */}
      <div>
        <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {quickDesks.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={i}
                href={item.href}
                className="w-[42%] min-w-[144px] sm:w-[190px] lg:w-auto shrink-0 snap-start p-3 sm:p-4 bg-white border border-slate-200/80 rounded-2xl shadow-2xs hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {item.count}
                  </span>
                  <IconComponent className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-orange-600 transition-colors truncate">
                  {item.label}
                </h3>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-1.5 lg:hidden">
          <span className="w-3.5 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Main Stage + Live Chat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Main Stage Area (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Video Player Section */}
          {isPlayingStage ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-slate-200/80">
              {/* LIVE Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>● LIVE BROADCAST</span>
              </div>

              {/* Close / Return Button */}
              <button
                type="button"
                onClick={() => setIsPlayingStage(false)}
                className="absolute top-3 right-3 z-20 w-8 h-8 bg-slate-950/80 hover:bg-slate-950 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                title="Return to preview"
                aria-label="Return to preview"
              >
                <X className="w-4 h-4" />
              </button>

              <iframe
                src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1&rel=0&modestbranding=1"
                title="Main Stage Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsPassVerified(true);
                setIsPlayingStage(true);
              }}
              className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-md group cursor-pointer border border-slate-200/80"
            >
              {/* LIVE Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>● LIVE BROADCAST</span>
              </div>

              <Image
                src={data.videoPlaceholder}
                alt="Main Stage"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />

              {/* Big Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-orange-600 group-hover:bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 border-2 border-white/40">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>

              {/* Player Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 sm:p-5 pointer-events-none">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-[10px] font-bold tracking-wider px-1 bg-black/50 rounded-md py-0.5 backdrop-blur-xs">
                      LIVE • 01:24:45
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/90 text-[10px] font-bold">
                    <span>Click to Stream</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compact Stage Info */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900">
                {data.mainStageTitle}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Speaker: <span className="text-orange-600 font-bold">{data.presenter}</span> •{" "}
                <span className="text-emerald-600 font-bold">+50 MCOM Pts for attending</span>
              </p>
            </div>
            <Link
              href="/dashboard/customer/booths"
              className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-[11px] font-bold hover:bg-orange-600 transition-colors shrink-0 w-fit"
            >
              Visit Speaker Booth
            </Link>
          </div>

          {/* LIVE EXHIBITOR PRODUCT SHOWCASE (Meeting Directive: Direct MCOM Mall Purchase Links) */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-orange-600" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">
                  Featured Session Products
                </h3>
              </div>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                Direct Checkout
              </span>
            </div>

            <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
              {LIVE_SHOWCASE_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="w-[68%] min-w-[200px] sm:w-auto shrink-0 snap-start border border-slate-100 rounded-xl p-2.5 flex flex-col justify-between gap-2 bg-slate-50/50"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0 bg-slate-200">
                      <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-slate-400 truncate">{prod.booth}</p>
                      <h4 className="text-xs font-bold text-slate-900 truncate">{prod.name}</h4>
                      <p className="text-xs font-extrabold text-orange-600">{prod.price}</p>
                    </div>
                  </div>
                  <a
                    href={prod.mcomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>{prod.buttonLabel || "Buy Now"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Live Chat & Schedule (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col h-[380px] sm:h-[460px] overflow-hidden">
            {/* Chat Header Tabs */}
            <div className="flex p-1.5 bg-slate-50 border-b border-slate-100">
              {[
                { id: "chat", icon: <MessageSquare className="w-3.5 h-3.5" />, label: "Live Chat" },
                { id: "participants", icon: <Users className="w-3.5 h-3.5" />, label: "Audience" },
                { id: "schedule", icon: <Calendar className="w-3.5 h-3.5" />, label: "Agenda" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-orange-600 shadow-2xs"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Chat / Audience / Schedule Content */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 custom-scrollbar">
              {activeTab === "chat" &&
                chat.map((msg) => (
                  <div key={msg.id} className="space-y-0.5 border-b border-slate-50 pb-2.5 last:border-0">
                    <div className="flex items-center justify-between text-[10px]">
                      <button
                        type="button"
                        onClick={() => {
                          setMessage((prev) => `@${msg.user} ${prev.replace(/^@[^ ]+\s*/, "")}`);
                          chatInputRef.current?.focus();
                        }}
                        className="font-bold text-slate-900 hover:text-orange-600 transition-colors cursor-pointer inline-flex items-center gap-1"
                        title={`Mention ${msg.user}`}
                      >
                        <span>{msg.user}</span>
                        {msg.role === "business" && (
                          <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-[9px] font-black uppercase">
                            Host
                          </span>
                        )}
                      </button>
                      <span className="text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{msg.message}</p>
                  </div>
                ))}

              {activeTab === "participants" && (
                <div className="divide-y divide-slate-100">
                  {[
                    { name: "Alex Thompson", role: "VIP Pass", initials: "AT" },
                    { name: "Sarah Chen", role: "Season Pass", initials: "SC" },
                    { name: "Marcus Okafor", role: "Buyer", initials: "MO" },
                    { name: "Elena Rostova", role: "VIP Pass", initials: "ER" },
                    { name: "David Mensah", role: "Explorer", initials: "DM" },
                    { name: "Priya Patel", role: "Season Pass", initials: "PP" }
                  ].map((person) => (
                    <div key={person.name} className="flex items-center justify-between gap-2 py-2.5 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("chat");
                          setMessage((prev) => `@${person.name} ${prev.replace(/^@[^ ]+\s*/, "")}`);
                          setTimeout(() => chatInputRef.current?.focus(), 50);
                        }}
                        className="flex items-center gap-2 min-w-0 text-left group cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-full bg-orange-50 text-orange-600 border border-orange-100 font-black text-[10px] flex items-center justify-center shrink-0">
                          {person.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 group-hover:text-orange-600 truncate transition-colors">
                            {person.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{person.role}</p>
                        </div>
                      </button>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase shrink-0">Online</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "schedule" && (
                <div className="divide-y divide-slate-100">
                  {agendaItems.map((item, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                        <span className="text-[10px] font-medium text-slate-400">
                          {item.time}
                          {item.speaker ? ` • ${item.speaker}` : ""}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                          item.type === "Live"
                            ? "text-orange-600"
                            : item.type === "Up Next"
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Input */}
            {activeTab === "chat" && (
              <div className="p-3 bg-white border-t border-slate-100">
                <form onSubmit={handleSendMessage} className="relative">
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask speaker or chat with attendees..."
                    className="w-full pl-3.5 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-orange-600 text-white rounded-lg flex items-center justify-center hover:bg-orange-700 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
