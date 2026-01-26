"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// --- ICONS ---
const ArrowLeftIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const ChatIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
);

const CartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const PlayIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

export default function VirtualBoothPage() {
    const params = useParams();
    const boothId = params.id;
    const [activeTab, setActiveTab] = useState("products");

    // Mock Booth Data
    const booth = {
        name: "FutureTech Systems",
        id: boothId,
        location: "Booth A-102",
        tagline: "Building the next generation of enterprise cloud infrastructure.",
        description: "FutureTech Systems is a leader in scalable cloud solutions. Founded in 2018, we have helped over 500 startups migrate their infrastructure to the cloud with zero downtime and maximum efficiency.",
        banner: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
        logo: "/main_stage_banner.png", // Reusing for mock
        manager: "Jane Smith",
        email: "contact@futuretech.com",
        live: true,
    };

    const products = [
        { name: "Cloud Core Hub", price: "499.00", image: "https://images.unsplash.com/photo-1558223123-6447849e771c?q=80&w=300&auto=format&fit=crop" },
        { name: "Edge Guard Pro", price: "199.00", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop" },
        { name: "Global Sync Node", price: "899.00", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=300&auto=format&fit=crop" },
    ];

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Back Button */}
            <Link href="/dashboard/customer/booths" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 font-medium mb-6 transition-colors">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Expo Hall
            </Link>

            {/* Hero / Banner */}
            <div className="relative h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-2xl mb-12">
                <Image src={booth.banner} alt={booth.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white overflow-hidden p-2">
                            <div className="w-full h-full bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">FT</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl md:text-5xl font-bold text-white font-display uppercase tracking-tight">{booth.name}</h1>
                                {booth.live && (
                                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-lg shadow-red-600/40">LIVE</span>
                                )}
                            </div>
                            <p className="text-teal-400 font-medium text-lg mt-1">{booth.location} • San Francisco, CA</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-teal-50 transition-all flex items-center gap-2 shadow-lg active:scale-[0.98]">
                            <ChatIcon className="w-5 h-5 text-teal-600" /> Chat with Us
                        </button>
                        <button className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg active:scale-[0.98] shadow-teal-600/40">
                            Follow Booth
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Main Stage / Video Area */}
                    <div className="bg-slate-900 rounded-[2rem] aspect-video relative overflow-hidden shadow-2xl group cursor-pointer">
                        <Image src="/main_stage_banner.png" alt="Live Demo" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center bg-black/30 backdrop-blur-[2px]">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 ring-4 ring-white/10 group-hover:scale-110 transition-transform">
                                <PlayIcon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 font-display uppercase">Booth Live Demo</h3>
                            <p className="text-slate-300 max-w-sm">Scheduled to start in 2 hours. Click to get notified.</p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-8 border-b border-slate-200">
                        {["Products", "About", "Services", "Updates"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`pb-6 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab.toLowerCase() ? 'text-teal-600' : 'text-slate-400 hover:text-slate-900'}`}
                            >
                                {tab}
                                {activeTab === tab.toLowerCase() && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-t-full shadow-[0_-2px_8px_rgba(13,148,136,0.3)]"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeTab === "products" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {products.map((product, i) => (
                                    <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                                        <div className="h-48 rounded-2xl bg-slate-50 relative mb-6 overflow-hidden border border-slate-50">
                                            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-xl text-slate-900 mb-1">{product.name}</h4>
                                                <p className="text-slate-500 text-sm">Enterprise Cloud</p>
                                            </div>
                                            <span className="text-xl font-bold text-teal-600">£{product.price}</span>
                                        </div>
                                        <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-teal-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-teal-600/20 active:scale-[0.98]">
                                            <CartIcon className="w-5 h-5" /> Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "about" && (
                            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900 font-display uppercase tracking-tight">Our Mission</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    {booth.description}
                                </p>
                                <div className="grid grid-cols-2 gap-6 pt-6">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <h5 className="font-bold text-slate-900 mb-1">Company Culture</h5>
                                        <p className="text-sm text-slate-500">Innovation first, customer always.</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <h5 className="font-bold text-slate-900 mb-1">Expert Support</h5>
                                        <p className="text-sm text-slate-500">24/7 management for all nodes.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-8">
                    {/* Quick Contact Card */}
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                        <h4 className="font-bold text-slate-900 mb-6 text-lg relative font-display uppercase">Booth Staff</h4>
                        <div className="flex items-center gap-4 mb-8 relative">
                            <div className="w-16 h-16 rounded-full bg-teal-100 border-2 border-white shadow-md overflow-hidden relative">
                                <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt={booth.manager} fill className="object-cover" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{booth.manager}</div>
                                <div className="text-xs text-teal-600 font-bold uppercase tracking-tighter">Booth Manager</div>
                            </div>
                        </div>
                        <div className="space-y-4 relative">
                            <div className="flex items-center gap-3 text-slate-500 text-sm">
                                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                {booth.email}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-sm">
                                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                MCOM Mall Hub, Floor 2
                            </div>
                        </div>
                    </div>

                    {/* Schedule Mini List */}
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl">
                        <h4 className="font-bold mb-6 text-lg font-display uppercase tracking-wider text-teal-400">Booth Schedule</h4>
                        <div className="space-y-6">
                            {[
                                { time: "10:00 AM", event: "Live Q&A" },
                                { time: "02:00 PM", title: "Product Demo" },
                                { time: "04:30 PM", title: "Keynote" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 border-l-2 border-teal-600/30 pl-4 py-1">
                                    <div>
                                        <div className="text-xs font-bold text-teal-500 uppercase">{item.time || "TBD"}</div>
                                        <div className="font-medium text-slate-200">{item.event || item.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold text-sm backdrop-blur-sm">
                            Book Consultation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
