"use client";

import { useState } from "react";
import Tooltip from "../../../component/Tooltip";
import Modal from "../../../component/Modal";

export default function EventPlannerPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const events = [
        { title: "Spring Awakening Expo", date: "MAR 15 - MAR 20", exhibitors: 215, status: "Active" },
        { title: "Summer Splash Showcase", date: "JUN 10 - JUN 15", exhibitors: 450, status: "Planned" },
        { title: "Autumn Harvest Fair", date: "SEP 22 - SEP 27", exhibitors: 0, status: "Upcoming" },
        { title: "Frost & Fire Festival", date: "DEC 01 - DEC 06", exhibitors: 0, status: "Upcoming" }
    ];

    return (
        <div className="max-w-6xl space-y-10">

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Event Planner</h1>
                    <p className="text-slate-500 font-medium">Orchestrate the 4 seasonal exhibition cycles and platform packages.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95"
                >
                    + Create Seasonal Event
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.map((event, i) => (
                    <div key={i} className={`bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative group hover:shadow-2xl transition-all duration-500 ${event.status === 'Active' ? 'ring-2 ring-indigo-500/10' : ''}`}>

                        {/* Status Badge */}
                        <div className="absolute top-8 right-8">
                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-sm ${event.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                    event.status === 'Planned' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' :
                                        'bg-slate-100 text-slate-500 border border-slate-200'
                                }`}>
                                {event.status}
                            </span>
                        </div>

                        <div className="mb-10">
                            <div className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] mb-2">{event.date}</div>
                            <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-tight">{event.title}</h3>
                        </div>

                        <div className="flex gap-10 border-t border-slate-100 pt-8">
                            <div>
                                <div className="text-3xl font-black text-slate-900">{event.exhibitors}</div>
                                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Confirmed Booths</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-slate-900">12%</div>
                                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Market Reach</div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button className="flex-1 border border-slate-200 text-slate-500 font-bold text-xs py-3 rounded-xl hover:bg-slate-50 uppercase tracking-widest">Edit Layout</button>
                            <button className="flex-1 bg-slate-950 text-white font-bold text-xs py-3 rounded-xl hover:bg-slate-800 uppercase tracking-widest">Pricing Panel</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Package Configuration Settings</h3>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-xl">
                            Platform-wide pricing for EXHIBITORS. Adjust the commission split and base registration fees for the upcoming Frost & Fire event.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                                <div className="font-black uppercase text-indigo-400 text-xs mb-1">Standard PAYG</div>
                                <div className="text-2xl font-black mb-2">12.5% COMMISSION</div>
                                <div className="text-[10px] text-slate-500 font-bold">£50 REGISTRATION FEE</div>
                            </div>
                            <div className="p-6 bg-indigo-600 rounded-2xl border border-indigo-400 shadow-xl shadow-indigo-900/40">
                                <div className="font-black uppercase text-indigo-100 text-xs mb-1">Yearly PRO</div>
                                <div className="text-2xl font-black mb-2">5% COMMISSION</div>
                                <div className="text-[10px] text-indigo-200 font-bold">£1,200 ANNUAL ACCESS</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border-8 border-white/5 flex flex-col items-center justify-center text-center">
                            <div className="text-xs font-black uppercase text-slate-500 tracking-tighter">Avg. Fee per Merchant</div>
                            <div className="text-4xl font-black">£215</div>
                            <div className="text-[10px] text-emerald-400 font-black">+£12 YOY</div>
                        </div>
                    </div>
                </div>
                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Global Event Wizard">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Event Title</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl font-bold outline-none focus:border-indigo-600 transition-all" placeholder="e.g. Winter Tech Summit" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Start Date</label>
                                <input type="date" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl font-bold outline-none" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">End Date</label>
                                <input type="date" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl font-bold outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-400 font-black uppercase text-xs hover:text-slate-600">Dismiss</button>
                        <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-black uppercase text-xs shadow-lg shadow-indigo-200">Confirm Schedule</button>
                    </div>
                </form>
            </Modal>

        </div>
    );
}
