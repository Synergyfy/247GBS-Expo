"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    Plus, 
    Search, 
    MoreVertical, 
    Ticket, 
    Users, 
    TrendingUp, 
    Calendar,
    Clock,
    MapPin,
    ArrowRight
} from "lucide-react";

const mockEvents = [
    {
        id: "ev-101",
        title: "Global Innovation Fair (Spring 2026)",
        status: "Published",
        pipelineStep: 5, // 1: Draft, 2: Submitted, 3: Under Review, 4: Approved, 5: Published, 6: Live
        date: "April 10-19, 2026",
        location: "Virtual Main Hall",
        ticketsSold: 1240,
        capacity: 5000,
        revenue: "£24,500",
        type: "Hybrid"
    },
    {
        id: "ev-102",
        title: "AI & Future of Retail Workshop",
        status: "Draft",
        pipelineStep: 1,
        date: "May 15, 2026",
        location: "Demo Room B",
        ticketsSold: 0,
        capacity: 200,
        revenue: "£0",
        type: "Virtual"
    }
];

const PIPELINE_STEPS = ["Draft", "Submitted", "Under Review", "Approved", "Published", "Live"];

export default function BusinessEventsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Events & Ticketing</h1>
                    <p className="text-slate-500 text-lg">Manage your exhibition events, ticket configurations, and track sales.</p>
                </div>
                <Link 
                    href="/dashboard/business/events/create" 
                    className="flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 uppercase tracking-widest text-xs"
                >
                    <Plus className="w-5 h-5" /> Create New Event
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                            <Ticket className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">1,240</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none mt-1">Total Tickets Sold</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+5.2%</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">842</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none mt-1">Unique Attendees</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+8.4%</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">£24,500</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none mt-1">Total Revenue</p>
                </div>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search events..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="flex-1 md:flex-none px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none outline-none text-xs font-bold uppercase tracking-widest">
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                        <option>Completed</option>
                    </select>
                    <select className="flex-1 md:flex-none px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none outline-none text-xs font-bold uppercase tracking-widest">
                        <option>Latest First</option>
                        <option>Oldest First</option>
                        <option>High Sales</option>
                    </select>
                </div>
            </div>

            {/* Events List */}
            <div className="grid gap-8">
                {mockEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all overflow-hidden group">
                        <div className="p-8 flex flex-col lg:flex-row gap-10 items-start lg:items-center">
                            {/* Date Card */}
                            <div className="w-full lg:w-32 h-32 bg-slate-50 rounded-3xl flex flex-col items-center justify-center border border-slate-100 shrink-0 group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                                <span className="text-orange-600 font-black text-2xl uppercase leading-none mb-1">{event.date.split(" ")[0]}</span>
                                <span className="text-slate-900 font-bold text-xl">{event.date.split(" ")[1].split("-")[0]}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        event.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {event.status}
                                    </span>
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {event.type}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-tight uppercase tracking-tight">
                                    {event.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" /> {event.date}</span>
                                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-500" /> {event.location}</span>
                                </div>

                                {/* Pipeline Progress (11.2) */}
                                <div className="pt-4 border-t border-slate-50">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Approval Pipeline</p>
                                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{PIPELINE_STEPS[event.pipelineStep - 1]}</span>
                                    </div>
                                    <div className="flex gap-1 h-1.5 w-full max-w-sm">
                                        {PIPELINE_STEPS.map((_, i) => (
                                            <div 
                                                key={i} 
                                                className={`flex-1 rounded-full transition-all duration-1000 ${
                                                    i < event.pipelineStep ? 'bg-orange-500' : 'bg-slate-100'
                                                }`} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-6 px-8 py-6 lg:py-0 border-t lg:border-t-0 lg:border-l border-slate-100 shrink-0 w-full lg:w-auto">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sales Volume</p>
                                    <p className="text-lg font-bold text-slate-900">{event.ticketsSold.toLocaleString()} / {event.capacity.toLocaleString()}</p>
                                    <div className="w-32 h-1.5 bg-slate-50 rounded-full mt-3 overflow-hidden shadow-inner">
                                        <div 
                                            className="h-full bg-orange-500 transition-all duration-1000" 
                                            style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="text-right lg:text-left">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Gross Revenue</p>
                                    <p className="text-xl font-black text-slate-900">{event.revenue}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex lg:flex-col gap-3 shrink-0 w-full lg:w-auto">
                                <Link 
                                    href={`/dashboard/business/events/${event.id}`}
                                    className="flex-1 lg:flex-none p-4 bg-slate-900 text-white rounded-2xl hover:bg-orange-600 transition-all flex items-center justify-center shadow-lg"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button className="flex-1 lg:flex-none p-4 border border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
