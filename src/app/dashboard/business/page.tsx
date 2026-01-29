"use client";

// --- ICONS ---
const StoreIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
);
const TrendUpIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);
const EyeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
);
const UserGroupIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

export default function BusinessDashboardPage() {
    return (
        <>
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500">Welcome back, here is what is happening at your booth today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50">Preview Booth</button>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 shadow-lg shadow-orange-200">Go Live Now</button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Total Views", val: "12.5K", icon: <EyeIcon />, trend: "+12%", color: "orange" },
                    { label: "Active Leads", val: "342", icon: <UserGroupIcon />, trend: "+5%", color: "orange" },
                    { label: "Product Sales", val: "£4,200", icon: <StoreIcon />, trend: "+8.2%", color: "orange" },
                    { label: "Avg. Duration", val: "4m 12s", icon: <TrendUpIcon />, trend: "+2%", color: "orange" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-orange-50 text-orange-600`}>
                                {stat.icon}
                            </div>
                            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">{stat.trend}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.val}</h3>
                        <p className="text-slate-500 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Action Card: Booth Setup */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-900">Booth Completion</h3>
                        <span className="text-sm font-semibold text-orange-600">85% Completed</span>
                    </div>
                    <div className="p-6">
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
                            <div className="bg-orange-600 h-2 rounded-full w-[85%]"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 opacity-50">
                                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">✓</div>
                                <span className="text-slate-500 line-through">Upload Business Logo & Banner</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 opacity-50">
                                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">✓</div>
                                <span className="text-slate-500 line-through">Add first 5 products</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-orange-200 shadow-sm ring-2 ring-orange-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full border-2 border-orange-500"></div>
                                    <span className="text-slate-900 font-medium">Schedule your first Live Demo</span>
                                </div>
                                <button className="text-sm font-semibold text-orange-600 hover:text-orange-700">Start Now &rarr;</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Widget: Upcoming Schedule */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-6">Upcoming Live Context</h3>
                    <div className="space-y-6">
                        {[
                            { time: "10:00 AM", title: "Product Launch Q&A", status: "Live Soon" },
                            { time: "02:30 PM", title: "Industry Panel", status: "Scheduled" },
                            { time: "04:00 PM", title: "Networking Hour", status: "Scheduled" }
                        ].map((event, i) => (
                            <div key={i} className="flex gap-4 relative pl-4 border-l-2 border-slate-100">
                                <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-orange-500 animate-pulse' : 'bg-slate-300'}`}></div>
                                <div>
                                    <div className="text-xs font-semibold text-slate-500 mb-1">{event.time}</div>
                                    <div className="font-medium text-slate-900">{event.title}</div>
                                    <div className={`text-xs mt-1 ${i === 0 ? 'text-orange-600 font-bold' : 'text-slate-400'}`}>{event.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                        + Add New Session
                    </button>
                </div>

            </div>
        </>
    );
}
