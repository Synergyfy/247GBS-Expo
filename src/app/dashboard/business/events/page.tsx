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
        date: "May 15, 2026",
        location: "Demo Room B",
        ticketsSold: 0,
        capacity: 200,
        revenue: "£0",
        type: "Virtual"
    }
];

export default function BusinessEventsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Events & Ticketing</h1>
                    <p className="text-slate-500">Manage your exhibition events, ticket configurations, and track sales.</p>
                </div>
                <Link 
                    href="/dashboard/business/events/create" 
                    className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                >
                    <Plus className="w-5 h-5" /> Create New Event
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                            <Ticket className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">1,240</h3>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Tickets Sold</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+5.2%</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">842</h3>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Unique Attendees</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+8.4%</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">£24,500</h3>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Revenue</p>
                </div>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search events..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="flex-1 md:flex-none px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none outline-none">
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                        <option>Completed</option>
                    </select>
                    <select className="flex-1 md:flex-none px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none outline-none">
                        <option>Latest First</option>
                        <option>Oldest First</option>
                        <option>High Sales</option>
                    </select>
                </div>
            </div>

            {/* Events List */}
            <div className="grid gap-6">
                {mockEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                        <div className="p-6 flex flex-col lg:flex-row gap-8 items-center">
                            {/* Date Card */}
                            <div className="w-full lg:w-32 h-32 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 shrink-0">
                                <span className="text-orange-600 font-black text-2xl uppercase">{event.date.split(" ")[0]}</span>
                                <span className="text-slate-900 font-bold text-xl">{event.date.split(" ")[1].split("-")[0]}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-4 text-center lg:text-left">
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        event.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {event.status}
                                    </span>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        {event.type}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                    {event.title}
                                </h3>
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
                                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {event.date}</span>
                                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:flex gap-8 px-8 py-4 lg:py-0 border-t lg:border-t-0 lg:border-l border-slate-100 text-center lg:text-left shrink-0">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sales</p>
                                    <p className="text-lg font-bold text-slate-900">{event.ticketsSold} / {event.capacity}</p>
                                    <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-2">
                                        <div 
                                            className="h-full bg-orange-500 rounded-full" 
                                            style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Revenue</p>
                                    <p className="text-lg font-bold text-slate-900">{event.revenue}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex lg:flex-col gap-2 shrink-0">
                                <Link 
                                    href={`/dashboard/business/events/${event.id}`}
                                    className="p-3 bg-slate-900 text-white rounded-xl hover:bg-orange-600 transition-all flex items-center justify-center"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button className="p-3 border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center">
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
