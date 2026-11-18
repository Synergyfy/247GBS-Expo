"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MessageSquare,
  ExternalLink,
  Play,
  Mail,
  MapPin,
  Calendar,
  ChevronDown
} from "lucide-react";

export default function VirtualBoothPage() {
  const params = useParams();
  const boothId = params.id;
  const [activeTab, setActiveTab] = useState("products");
  const [scheduleExpanded, setScheduleExpanded] = useState(false);

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

  // Per meeting directive: Product Name, Description, Price, Image, and Buy Now button linking to MCOM Mall
  const products = [
    {
      name: "Cloud Core Hub X1",
      description:
        "High-availability enterprise cloud router with automated failover and hardware encryption.",
      price: "499.00",
      image: "/ideal.png",
      mcomUrl: "https://mcommall.com/products/cloud-core-hub-x1"
    },
    {
      name: "Edge Guard Pro Appliance",
      description:
        "Real-time zero-trust firewall and DDoS mitigation node for distributed retail branches.",
      price: "199.00",
      image: "/main_stage_banner.png",
      mcomUrl: "https://mcommall.com/products/edge-guard-pro"
    },
    {
      name: "Global Sync Node S4",
      description:
        "Multi-region storage replication server with plug-and-play MCOM inventory synchronization.",
      price: "899.00",
      image: "/f265f1748035f3fe5d0e6839698aecfc.jpg",
      mcomUrl: "https://mcommall.com/products/global-sync-node"
    }
  ];

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
              className="bg-white text-slate-900 px-3 py-1.5 rounded-xl font-bold text-[11px] hover:bg-orange-50 transition-all inline-flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
              <span>Live Chat</span>
            </button>
            <button
              type="button"
              className="bg-orange-600 text-white px-3.5 py-1.5 rounded-xl font-bold text-[11px] hover:bg-orange-700 transition-all shadow-xs"
            >
              Follow Booth
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column: Main Booth Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Compact Live Demo Video Stream */}
          <div className="bg-slate-900 rounded-2xl aspect-video relative overflow-hidden shadow-sm group cursor-pointer border border-slate-200/80">
            <Image
              src="/main_stage_banner.png"
              alt="Live Demo"
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center bg-black/30">
              <div className="w-11 h-11 bg-white/20 backdrop-blur-xs rounded-full flex items-center justify-center mb-2 border border-white/30 group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight">
                Booth Live Product Demo
              </h3>
              <p className="text-slate-300 text-[11px] max-w-xs mt-0.5">
                Watch live demonstration or browse MCOM Mall products below.
              </p>
            </div>
          </div>

          {/* Horizontal Scrollable Tabs */}
          <div className="flex gap-5 sm:gap-7 border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: "products", label: "MCOM Mall Products" },
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {products.map((product, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-36 rounded-xl bg-slate-100 relative mb-3 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
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
                      <span>Buy Now on MCOM Mall</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">
                  Exhibitor Profile (CHS Verified)
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
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-orange-600 text-white transition-all font-bold text-xs"
                >
                  Book 1-on-1 Consultation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
