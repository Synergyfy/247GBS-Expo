"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QrCode, Ticket, Calendar, Wallet, Zap, ShieldCheck } from "lucide-react";
import Modal from "@/app/component/Modal";

// --- ICONS ---
const PlayIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
);

export default function CustomerDashboard() {
    const [showPassport, setShowPassport] = useState(false);

    return (
        <>
            {/* WELCOME BANNER */}
            <div className="relative rounded-3xl overflow-hidden bg-orange-600 text-white p-10 mb-12 shadow-2xl">
                <div className="absolute inset-0 opacity-40">
                    <Image
                        src="/main_stage_banner.png"
                        alt="Main Stage"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 animate-pulse">LIVE NOW</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Effectiveness of AI in modern businesses</h1>
                    <p className="text-slate-300 text-lg mb-8">Join keynote speaker Sarah Johnson on the Main Stage discussing the future of digital retail.</p>
                    <div className="flex gap-4">
                        <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                            <PlayIcon className="w-5 h-5" /> Watch Stream
                        </button>
                        <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors">
                            View Schedule
                        </button>
                    </div>
                </div>
            </div>

            {/* DASHBOARD GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                
                {/* 1. DIGITAL PASSPORT WIDGET */}
                <div 
                    onClick={() => setShowPassport(true)}
                    className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl flex flex-col justify-between group cursor-pointer hover:shadow-2xl transition-all hover:scale-[1.02]"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <QrCode className="w-32 h-32" />
                    </div>
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-orange-600 text-[10px] font-black tracking-[0.2em] px-2 py-0.5 rounded uppercase inline-block">
                                Active Pass
                            </div>
                            <Ticket className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-1">John Doe</h3>
                        <p className="text-slate-400 text-sm font-mono tracking-wider">VIP ACCESS • GBX-88219</p>
                    </div>
                    <div className="mt-8">
                        <button 
                            className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            <QrCode className="w-4 h-4" /> View Entry QR
                        </button>
                    </div>
                </div>

                {/* 2. WALLET WIDGET */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl flex flex-col justify-between">
                    <div className="absolute -right-10 -bottom-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
                    <div>
                        <div className="flex items-center gap-2 mb-2 opacity-90">
                            <Wallet className="w-5 h-5" />
                            <span className="font-bold text-sm uppercase tracking-wider">Expo Wallet</span>
                        </div>
                        <div className="text-4xl font-bold mb-1">£1,250.00</div>
                        <div className="text-orange-100 text-xs">+£500.00 this week</div>
                    </div>
                    <div className="flex gap-3 mt-6 relative z-10">
                        <button className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl font-medium transition-colors text-sm backdrop-blur-sm">History</button>
                        <button className="flex-1 bg-white text-orange-600 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform text-sm">Top Up</button>
                    </div>
                </div>

                {/* 3. SCHEDULE WIDGET */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-orange-600" />
                            <h3 className="font-bold text-lg text-slate-900">Up Next</h3>
                        </div>
                        <Link href="/dashboard/customer/schedule" className="text-xs font-bold text-orange-600 hover:underline">View Full</Link>
                    </div>
                    <div className="space-y-4 flex-1">
                        {[
                            { time: "11:30 AM", title: "Networking: Tech Founders", status: "Starting in 10m" },
                            { time: "02:00 PM", title: "Design Systems Workshop", status: "Registered" },
                        ].map((event, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="bg-white text-slate-900 font-bold px-3 py-2 rounded-lg text-xs text-center border border-slate-200 shadow-sm min-w-[70px]">
                                    {event.time}
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-900 line-clamp-1">{event.title}</div>
                                    <div className={`text-xs font-medium ${i === 0 ? 'text-orange-600 animate-pulse' : 'text-slate-500'}`}>{event.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FEATURED BOOTHS CAROUSEL */}
            <section className="mb-12">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Featured Booths</h2>
                        <p className="text-slate-500">Top exhibitors chosen for you</p>
                    </div>
                    <a href="/dashboard/customer/booths" className="text-orange-600 font-semibold hover:underline">View All</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                            <div className="h-48 rounded-xl bg-slate-200 relative mb-4 overflow-hidden">
                                <Image
                                    src={`https://images.unsplash.com/photo-15567407${i}-e83484fce328?q=80&w=400&auto=format&fit=crop`}
                                    alt="Booth"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md text-slate-900">
                                    BOOTH A-{100 + i}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-1">TechFlow Solutions</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">Providing enterprise-grade cloud architecture for modern startups.</p>
                            <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                <div className="flex gap-2 text-xs font-medium text-slate-600">
                                    <span className="bg-slate-100 px-2 py-1 rounded">SaaS</span>
                                    <span className="bg-slate-100 px-2 py-1 rounded">Cloud</span>
                                </div>
                                <Link href="/dashboard/customer/booths/101" className="text-orange-600 text-sm font-bold group-hover:underline">Visit Booth &rarr;</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PASSPORT MODAL */}
            <Modal
                isOpen={showPassport}
                onClose={() => setShowPassport(false)}
                title="My Digital Passport"
            >
                <div className="relative bg-[#1a1a1a] text-white p-8 rounded-[32px] overflow-hidden shadow-2xl border border-white/10 mx-auto">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/40 to-orange-900/40 opacity-50" />
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Zap className="w-40 h-40" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className="bg-orange-600 text-[10px] font-black tracking-[0.2em] px-2 py-0.5 rounded uppercase mb-2 inline-block">
                                    Official Entry Pass
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter">247GBS EXPO</h3>
                            </div>
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                                <ShieldCheck className="w-6 h-6 text-orange-500" />
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Pass Holder</p>
                            <p className="text-xl font-bold tracking-tight">John Doe</p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Access Tier</p>
                                <p className="font-bold text-orange-500">VIP ACCESS</p>
                            </div>
                            <div>
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Event</p>
                                <p className="font-bold uppercase tracking-tighter text-xs mt-0.5">Global Innovation Fair</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10">
                            <div className="bg-white p-3 rounded-2xl mb-4">
                                {/* Fake QR Code */}
                                <div className="grid grid-cols-6 gap-0.5 w-32 h-32">
                                    {[...Array(36)].map((_, i) => (
                                        <div key={i} className={`w-full h-full ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold tracking-widest mb-1 uppercase">Scan at entry</p>
                            <p className="text-sm font-mono font-bold tracking-tighter">GBX-88219-X22</p>
                        </div>
                    </div>
                </div>
                <p className="text-center text-xs text-slate-400 mt-4 max-w-xs mx-auto">
                    This QR code is unique to your identity. Do not share it. Valid for one entry per day.
                </p>
            </Modal>
        </>
    );
}
