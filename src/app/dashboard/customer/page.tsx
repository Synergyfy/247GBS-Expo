"use client";

import Image from "next/image";
import Link from "next/link";

// --- ICONS ---
const PlayIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
);

export default function CustomerDashboard() {
    return (
        <>
            {/* WELCOME BANNER */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-10 mb-12 shadow-2xl">
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

            {/* FEATURED BOOTHS CAROUSEL */}
            <section className="mb-12">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Featured Booths</h2>
                        <p className="text-slate-500">Top exhibitors chosen for you</p>
                    </div>
                    <a href="/dashboard/customer/booths" className="text-teal-600 font-semibold hover:underline">View All</a>
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
                                <Link href="/dashboard/customer/booths/101" className="text-teal-600 text-sm font-bold group-hover:underline">Visit Booth &rarr;</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* MY ACTIVITY */}
            <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900 mb-4">My Schedule</h3>
                    <div className="space-y-4">
                        {[
                            { time: "11:30 AM", title: "Networking: Tech Founders", status: "Joined" },
                            { time: "02:00 PM", title: "Design Systems Workshop", status: "Registered" },
                        ].map((event, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="bg-teal-50 text-teal-700 font-bold px-3 py-2 rounded-lg text-sm text-center min-w-[80px]">
                                    {event.time}
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900">{event.title}</div>
                                    <div className="text-xs text-slate-500">{event.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg text-white/90 mb-1">Expo Wallet</h3>
                        <div className="text-4xl font-bold mb-6">£1,250.00</div>
                        <div className="flex gap-3">
                            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors">History</button>
                            <button className="bg-white text-teal-600 px-4 py-2 rounded-lg font-bold shadow-lg">Top Up</button>
                        </div>
                    </div>
                    {/* Decor */}
                    <div className="absolute -right-10 -bottom-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </section>
        </>
    );
}
