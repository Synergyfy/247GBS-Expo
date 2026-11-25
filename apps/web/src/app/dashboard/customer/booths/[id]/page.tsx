"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MessageSquare,
  ExternalLink,
  Play,
  X,
  Mail,
  MapPin,
  Calendar,
  ChevronDown,
  ShoppingBag
} from "lucide-react";

export default function VirtualBoothPage() {
  const params = useParams();
  const boothId = params.id;
  const [activeTab, setActiveTab] = useState("products");
  const [scheduleExpanded, setScheduleExpanded] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const booth = {
    name: "FutureTech Systems",
    id: boothId,
    location: "Booth A-102 • San Francisco, CA",
    tagline: "Building the next generation of enterprise cloud infrastructure.",
    description:
      "FutureTech Systems is a leader in scalable cloud solutions. Founded in 2018, we have helped over 500 enterprises migrate their infrastructure to the cloud with zero downtime and maximum efficiency.",
    banner: "/hero.webp",
    manager: "Jane Smith",
    email: "contact@futuretech.com",
    live: true
  };

  // Default fallback products
  const defaultProducts = [
    {
      name: "Cloud Core Hub X1",
      description:
        "High-availability enterprise cloud router with automated failover and hardware encryption.",
      price: "499.00",
      image: "/ideal.png",
      mcomUrl: "http://localhost:3003/marketplace",
      buttonLabel: "Buy Now"
    },
    {
      name: "Edge Guard Pro Appliance",
      description:
        "Real-time zero-trust firewall and DDoS mitigation node for distributed retail branches.",
      price: "199.00",
      image: "/main_stage_banner.png",
      mcomUrl: "http://localhost:3003/marketplace",
      buttonLabel: "Book Now"
    },
    {
      name: "Global Sync Node S4",
      description:
        "Multi-region storage replication server with plug-and-play MCOM inventory synchronization.",
      price: "899.00",
      image: "/f265f1748035f3fe5d0e6839698aecfc.jpg",
      mcomUrl: "http://localhost:3003/marketplace",
      buttonLabel: "Order Now"
    }
  ];

  const [liveProducts, setLiveProducts] = useState<any[]>([]);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "Jane Smith", text: "Welcome to FutureTech Systems! How can I help you today?", time: "Just now", isSelf: false }
  ]);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultSlot, setConsultSlot] = useState("Today • 04:30 PM");
  const [consultNote, setConsultNote] = useState("");
  const [boothToast, setBoothToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setBoothToast(msg);
    setTimeout(() => setBoothToast(null), 3000);
  };

  const handleSendBoothChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: "You", text, time: "Now", isSelf: true }
    ]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "Jane Smith",
          text: "Thanks for reaching out! Our solutions engineer has received your message and will reply shortly.",
          time: "Now",
          isSelf: false
        }
      ]);
    }, 600);
  };

  useEffect(() => {
    async function fetchMallCatalog() {
      try {
        const mallApiUrl =
          process.env.NEXT_PUBLIC_MCOM_MALL_API_URL || "http://localhost:3006/api/v1";
        const mallWebUrl =
          process.env.NEXT_PUBLIC_MCOM_MALL_URL || "http://localhost:3003";

        const res = await fetch(`${mallApiUrl}/product/public?limit=6`, {
          headers: { Accept: "application/json" }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            const mapped = json.data.map((item: any) => {
              // Convert minor units (pence) to pounds if price is > 1000
              const rawPrice = Number(item.price) || 0;
              const formattedPrice =
                rawPrice >= 1000 ? (rawPrice / 100).toFixed(2) : rawPrice.toFixed(2);

              const firstMedia = Array.isArray(item.media)
                ? item.media[0]
                : typeof item.media === "string" && item.media.startsWith("http")
                ? item.media
                : "/ideal.png";

              return {
                id: item.id,
                name: item.title,
                description: item.shortDescription || item.description || "",
                price: formattedPrice,
                image: firstMedia,
                mcomUrl: item.productUrl || `${mallWebUrl}/marketplace?product=${item.id}`,
                buttonLabel: item.buttonLabel || "Buy Now"
              };
            });

            setLiveProducts(mapped);
            setIsLiveSynced(true);
          }
        }
      } catch (err) {
        console.warn("MCOM Mall live catalog fetch: fallback active", err);
      }
    }

    fetchMallCatalog();
  }, []);

  const displayProducts = liveProducts.length > 0 ? liveProducts : defaultProducts;

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Compact Back Link */}
      <Link
        href="/dashboard/customer/booths"
        className="inline-flex items-center gap-1.5 text-slate-500 hover:text-orange-600 text-xs font-bold transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Expo Hall</span>
      </Link>

      {/* Compact Booth Banner (CHS Synced Branding) */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md">
        <div className="h-36 sm:h-48 relative">
          <Image src={booth.banner} alt={booth.name} fill className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="p-4 sm:p-5 -mt-12 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-orange-600 rounded-xl shadow-md flex items-center justify-center border-2 border-white text-white font-extrabold text-sm sm:text-base shrink-0">
              FT
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                <span className="text-orange-400">{booth.location}</span>
                {booth.live && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span className="text-red-400 font-extrabold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      LIVE
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-white uppercase tracking-tight truncate">
                {booth.name}
              </h1>
              <p className="text-[11px] text-slate-300 truncate">{booth.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowLiveChat(true)}
              className="bg-white text-slate-900 px-3 py-1.5 rounded-xl font-bold text-[11px] hover:bg-orange-50 transition-all inline-flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
              <span>Live Chat</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFollowing((prev) => {
                  const next = !prev;
                  triggerToast(next ? `Now following ${booth.name}!` : `Unfollowed ${booth.name}.`);
                  return next;
                });
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-[11px] transition-all shadow-xs ${
                isFollowing
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-orange-600 text-white hover:bg-orange-700"
              }`}
            >
              {isFollowing ? "Following ✓" : "Follow Booth"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column: Main Booth Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Compact Live Demo Video Stream */}
          {isPlayingVideo ? (
            <div className="bg-slate-900 rounded-2xl aspect-video relative overflow-hidden shadow-sm border border-slate-200/80">
              {/* Live Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>LIVE DEMO STREAM</span>
              </div>

              {/* Close / Return Button */}
              <button
                type="button"
                onClick={() => setIsPlayingVideo(false)}
                className="absolute top-3 right-3 z-20 w-8 h-8 bg-slate-950/80 hover:bg-slate-950 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                title="Close video"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>

              <iframe
                src="https://www.youtube-nocookie.com/embed/L_LUpnjgPso?autoplay=1&rel=0&modestbranding=1"
                title="Booth Live Product Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div
              onClick={() => setIsPlayingVideo(true)}
              className="bg-slate-900 rounded-2xl aspect-video relative overflow-hidden shadow-sm group cursor-pointer border border-slate-200/80"
            >
              {/* Live Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>LIVE DEMO</span>
              </div>

              <Image
                src="/main_stage_banner.png"
                alt="Live Demo"
                fill
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center bg-black/30">
                <div className="w-12 h-12 bg-orange-600 group-hover:bg-orange-500 rounded-full flex items-center justify-center mb-2 shadow-lg border border-white/30 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight">
                  Booth Live Product Demo
                </h3>
                <p className="text-slate-300 text-[11px] max-w-xs mt-0.5">
                  Watch live demonstration or browse products below.
                </p>
              </div>
            </div>
          )}

          {/* Horizontal Scrollable Tabs */}
          <div className="flex gap-5 sm:gap-7 border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: "products", label: "Products & Offers" },
              { id: "about", label: "About Exhibitor" },
              { id: "services", label: "B2B Services" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? "text-orange-600"
                    : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "products" && (
              <div className="space-y-3">
                {isLiveSynced && (
                  <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
                    <span className="font-semibold text-slate-700">Official Product Showcase</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 text-[10px]">
                      <ShoppingBag className="w-3 h-3" />
                      Live from MCOM Mall
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {displayProducts.map((product, i) => (
                    <div
                      key={product.id || i}
                      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="h-36 rounded-xl bg-slate-100 relative mb-3 overflow-hidden">
                          {product.image.startsWith("http") ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                        </div>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                            {product.name}
                          </h4>
                          <span className="text-xs sm:text-sm font-extrabold text-orange-600 shrink-0">
                            £{product.price}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] leading-relaxed mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <a
                        href={product.mcomUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-orange-600 text-white py-2 rounded-xl font-bold text-xs hover:bg-orange-700 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>{product.buttonLabel || "Buy Now"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">
                  Exhibitor Profile (Verified)
                </h3>
                <p className="text-slate-600 leading-relaxed text-xs">{booth.description}</p>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Company Culture</h5>
                    <p className="text-[11px] text-slate-500">Innovation first, customer always.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Enterprise SLA</h5>
                    <p className="text-[11px] text-slate-500">24/7 management for all nodes.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900">Custom Cloud Migration</h4>
                    <p className="text-[11px] text-slate-500">
                      End-to-end architecture audit and zero-downtime deployment.
                    </p>
                  </div>
                  <span className="font-bold text-orange-600 shrink-0">From £1,500</span>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900">Dedicated DevOps Retainer</h4>
                    <p className="text-[11px] text-slate-500">
                      24/7 SLA monitoring and automated cluster scaling.
                    </p>
                  </div>
                  <span className="font-bold text-orange-600 shrink-0">£450/mo</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Compact Booth Staff & Collapsible Schedule */}
        <div className="space-y-4">
          {/* Booth Staff Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-tight">
              Booth Representative
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                JS
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                  {booth.manager}
                </div>
                <div className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                  Booth Manager
                </div>
              </div>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{booth.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>MCOM Mall Hub, Virtual Floor 2</span>
              </div>
            </div>
          </div>

          {/* Collapsible Booth Schedule Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <button
              type="button"
              onClick={() => setScheduleExpanded((prev) => !prev)}
              className="w-full p-4 flex items-center justify-between gap-2 text-left hover:bg-slate-50/60 transition-colors"
              aria-expanded={scheduleExpanded}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Calendar className="w-4 h-4 text-orange-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    Booth Live Sessions
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    10:00 AM Live Q&A • 02:00 PM Product Demo
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                  scheduleExpanded ? "rotate-180 text-orange-600" : ""
                }`}
              />
            </button>

            {scheduleExpanded && (
              <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="divide-y divide-slate-100">
                  {[
                    { time: "10:00 AM", title: "Live Q&A with Engineering", status: "Live" },
                    { time: "02:00 PM", title: "Cloud Core X1 Architecture Demo", status: "Upcoming" },
                    { time: "04:30 PM", title: "1-on-1 Enterprise Consultations", status: "Open" }
                  ].map((item, i) => (
                    <div key={i} className="py-2 flex items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900">{item.title}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{item.time}</div>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          item.status === "Live" ? "text-orange-600" : "text-emerald-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowConsultModal(true)}
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-orange-600 text-white transition-all font-bold text-xs"
                >
                  Book 1-on-1 Consultation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Toast */}
      {boothToast && (
        <div className="fixed top-6 right-4 sm:right-8 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold">
          {boothToast}
        </div>
      )}

      {/* Live Booth Chat Modal */}
      {showLiveChat && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                  Live Chat • {booth.name}
                </h3>
                <p className="text-[11px] text-emerald-600 font-semibold">Jane Smith is online</p>
              </div>
              <button
                type="button"
                onClick={() => setShowLiveChat(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-slate-50/50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.isSelf ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-3 py-2 rounded-xl text-xs max-w-[85%] ${
                      msg.isSelf
                        ? "bg-orange-600 text-white"
                        : "bg-white border border-slate-200 text-slate-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {msg.sender} • {msg.time}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendBoothChat} className="p-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question about products or pricing..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1-on-1 Consultation Booking Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                Book 1-on-1 Consultation
              </h3>
              <button
                type="button"
                onClick={() => setShowConsultModal(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Select Time Slot</label>
                <select
                  value={consultSlot}
                  onChange={(e) => setConsultSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-orange-500"
                >
                  <option>Today • 04:30 PM</option>
                  <option>Tomorrow • 10:00 AM</option>
                  <option>Tomorrow • 02:00 PM</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Topic / Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={consultNote}
                  onChange={(e) => setConsultNote(e.target.value)}
                  placeholder="Enterprise migration, volume pricing, etc."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-orange-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConsultModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowConsultModal(false);
                    setConsultNote("");
                    triggerToast(`1-on-1 Consultation booked for ${consultSlot}!`);
                  }}
                  className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
