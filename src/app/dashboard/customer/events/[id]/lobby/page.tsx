"use client";

import React, { useState } from "react";
import {
  Play,
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

const LIVE_SHOWCASE_PRODUCTS = [
  {
    id: "mcom-1",
    name: "Cloud Core Hub X1",
    booth: "FutureTech Systems",
    price: "£499.00",
    image: "/ideal.png",
    mcomUrl: "https://mcommall.com/products/cloud-core-hub"
  },
  {
    id: "mcom-2",
    name: "Edge Guard Pro Appliance",
    booth: "TechFlow Solutions",
    price: "£199.00",
    image: "/hero.webp",
    mcomUrl: "https://mcommall.com/products/edge-guard-pro"
  },
  {
    id: "mcom-3",
    name: "Smart Solar Micro-Inverter",
    booth: "GreenGrid Energy",
    price: "£349.00",
    image: "/f265f1748035f3fe5d0e6839698aecfc.jpg",
    mcomUrl: "https://mcommall.com/products/solar-micro-inverter"
  }
];

export default function EventLobbyPage() {
  const params = useParams();
  const id = params.id as string;
  const data = LOBBY_DATA[id as keyof typeof LOBBY_DATA] || LOBBY_DATA.default;

  // Per meeting directive: Attendees enter their access pass code before entering the live event
  const [passCode, setPassCode] = useState("GBX-88219-X22");
  const [isPassVerified, setIsPassVerified] = useState(false);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(CHAT_MESSAGES);
  const [activeTab, setActiveTab] = useState("chat");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: "John Doe (You)",
      message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: "JD"
    };

    setChat([...chat, newMessage]);
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

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
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
              <ShieldCheck className="w-3.5 h-3.5" /> Pass Verified (GBX-88219-X22)
            </span>
          )}
          <button
            type="button"
            className="p-2 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs text-slate-600"
            aria-label="Share event"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ACCESS PASS CODE VERIFICATION GATE (Meeting Requirement: Prompt for Pass Code on Event Day) */}
      {!isPassVerified && (
        <div className="bg-white rounded-2xl border border-orange-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600 uppercase tracking-wider">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Event Day Access Pass Gate</span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">
              Enter your Access Pass Code to unlock the live stream & exhibitor showcase
            </h2>
            <p className="text-[11px] text-slate-500">
              Your active VIP Season Pass code has been pre-filled below for instant entry.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (passCode.trim()) setIsPassVerified(true);
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={passCode}
              onChange={(e) => setPassCode(e.target.value)}
              placeholder="Enter Pass Code (e.g. GBX-88219-X22)"
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-xl font-bold text-xs hover:bg-orange-700 transition-colors shadow-xs whitespace-nowrap"
            >
              Validate & Enter Live
            </button>
          </form>
        </div>
      )}

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
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-md group border border-slate-200/80">
            <Image
              src={data.videoPlaceholder}
              alt="Main Stage"
              fill
              className="object-cover opacity-80"
            />

            {/* Player Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPassVerified(true)}
                    className="w-8 h-8 bg-orange-600 rounded-xl flex items-center justify-center text-white hover:bg-orange-700 transition-colors"
                  >
                    <Play className="w-4 h-4 fill-white" />
                  </button>
                  <button
                    type="button"
                    className="w-8 h-8 bg-white/15 backdrop-blur-xs rounded-xl flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-white text-[10px] font-bold tracking-wider px-1">
                    LIVE • 01:24:45
                  </span>
                </div>
                <button
                  type="button"
                  className="w-8 h-8 bg-white/15 backdrop-blur-xs rounded-xl flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

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
                  Featured Session Products (MCOM Mall)
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
                    <span>Buy on MCOM Mall</span>
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
                      <span className="font-bold text-slate-900">{msg.user}</span>
                      <span className="text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{msg.message}</p>
                  </div>
                ))}

              {activeTab === "participants" && (
                <div className="divide-y divide-slate-100">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-center justify-between py-2 text-xs">
                      <span className="font-bold text-slate-700">Attendee #{1000 + i}</span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">Online</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "schedule" && (
                <div className="divide-y divide-slate-100">
                  {[
                    { time: "10:00 AM", title: "Opening Ceremony", type: "Live" },
                    { time: "11:30 AM", title: "Keynote Session", type: "Up Next" },
                    { time: "01:00 PM", title: "Networking Break", type: "Scheduled" },
                    { time: "02:30 PM", title: "MCOM Product Showcases", type: "Scheduled" }
                  ].map((item, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        <span className="text-[10px] font-medium text-slate-400">{item.time}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
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
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask speaker or chat with attendees..."
                    className="w-full pl-3.5 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-orange-600 text-white rounded-lg flex items-center justify-center hover:bg-orange-700 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
