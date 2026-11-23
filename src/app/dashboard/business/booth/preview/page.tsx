"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Play,
  X,
  Mail,
  MapPin,
  Calendar,
  ChevronDown,
  ShoppingBag,
  Eye,
  Edit3
} from "lucide-react";

export default function BusinessBoothLivePreviewPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [scheduleExpanded, setScheduleExpanded] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const booth = {
    name: "Acme Corporation Ltd",
    initials: "AC",
    location: "Booth A-101 • London, UK",
    tagline: "Enterprise Cloud & Logistics Infrastructure for Modern Retailers.",
    description:
      "Acme Corporation Ltd delivers high-availability cloud hardware, automated inventory synchronization, and edge security solutions across Europe and North America.",
    banner: "/main_stage_banner.png",
    manager: "Alex Morgan",
    email: "exhibitor@acmecorp.co.uk",
    live: true
  };

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
      } catch {
        // Fallback to default products silently
      }
    }
    fetchMallCatalog();
  }, []);

  const displayProducts = liveProducts.length > 0 ? liveProducts : defaultProducts;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-5 pb-24 lg:pb-10">
      {/* Business Preview Top Bar (Keeps User Inside Business Dashboard) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200/80">
        <Link
          href="/dashboard/business/booth"
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-orange-600 text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Booth & Storefront</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-200/70 text-[10px] font-extrabold uppercase tracking-wider whitespace-nowrap shrink-0">
            <Eye className="w-3 h-3" />
            Live Exhibitor Preview
          </span>
          <Link
            href="/dashboard/business/booth"
            className="inline-flex items-center gap-1 px-3 py-1 bg-slate-900 text-white rounded-lg text-[11px] font-bold hover:bg-orange-600 transition-colors whitespace-nowrap shrink-0"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit Booth</span>
          </Link>
        </div>
      </div>

      {/* Booth Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md">
        <div className="h-36 sm:h-48 relative">
          <Image src={booth.banner} alt={booth.name} fill className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="p-4 sm:p-5 -mt-12 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-orange-600 rounded-xl shadow-md flex items-center justify-center border-2 border-white text-white font-extrabold text-sm sm:text-base shrink-0">
              {booth.initials}
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

          <Link
            href="/dashboard/business/products"
            className="bg-orange-600 text-white px-3.5 py-1.5 rounded-xl font-bold text-[11px] hover:bg-orange-700 transition-all shadow-xs w-fit shrink-0"
          >
            Manage Products
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Interactive Booth Video Preview */}
          {isPlayingVideo ? (
            <div className="bg-slate-900 rounded-2xl aspect-video relative overflow-hidden shadow-sm border border-slate-200/80">
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>LIVE DEMO STREAM</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPlayingVideo(false)}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                aria-label="Close video stream"
              >
                <X className="w-4 h-4" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="Booth Live Product Demo"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              onClick={() => setIsPlayingVideo(true)}
              className="bg-slate-900 rounded-2xl aspect-video relative overflow-hidden group cursor-pointer shadow-sm"
            >
              <Image
                src="/main_stage_banner.png"
                alt="Booth Live Product Demo"
                fill
                className="object-cover opacity-55 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>LIVE DEMO</span>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 group-hover:bg-orange-600 transition-all mb-2.5">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
                <h3 className="text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                  Booth Live Product Demo
                </h3>
                <p className="text-slate-300 text-[11px] max-w-sm mt-0.5">
                  Click to preview how attendees experience your live demonstration stream.
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
                className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap shrink-0 cursor-pointer ${
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
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                  About {booth.name}
                </h3>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  {booth.description}
                </p>
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Founded</div>
                    <div className="text-sm font-extrabold text-slate-900">2018</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Clients</div>
                    <div className="text-sm font-extrabold text-slate-900">500+</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Uptime</div>
                    <div className="text-sm font-extrabold text-emerald-600">99.99%</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
                {[
                  { title: "Enterprise Cloud Migration", desc: "Zero-downtime architectural deployment with dedicated support." },
                  { title: "24/7 Edge Security Monitoring", desc: "Real-time DDoS mitigation and compliance auditing." },
                  { title: "MCOM Inventory Integration", desc: "Automated multi-warehouse catalog and fulfillment sync." }
                ].map((srv, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{srv.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{srv.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Booth Representative
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center font-bold text-orange-600 text-xs shrink-0">
                AM
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                  {booth.manager}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Exhibitor Owner
                </div>
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{booth.email}</span>
              </div>
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">London, United Kingdom</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <button
              type="button"
              onClick={() => setScheduleExpanded((prev) => !prev)}
              className="w-full p-4 flex items-center justify-between gap-2 text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
