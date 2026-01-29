"use client";

import { useState } from "react";
import Modal from "../../../component/Modal";
import Tooltip from "../../../component/Tooltip";

// --- HELP ICONS ---
const InfoIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

const TrendUpIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);

export default function LiveDemosPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

    const [demos, setDemos] = useState([
        { id: 1, title: "Product Launch: Gen 2 Series", time: "TOMORROW, 10:00 AM", attendees: 142, status: "UPCOMING" },
    ]);

    const handleOpenCreate = () => {
        setModalMode('create');
        setIsModalOpen(true);
    };

    const handleOpenEdit = () => {
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleSave_Mock = (e: React.FormEvent) => {
        e.preventDefault();
        if (modalMode === 'create') {
            setDemos([...demos, { id: Date.now(), title: "New Q&A Session", time: "NEXT WEEK", attendees: 0, status: "UPCOMING" }]);
        }
        setIsModalOpen(false);
    };

    const handleStartEarly = () => {
        alert("Starting stream environment... (Mock Action)");
    };

    const handleViewAnalytics = () => {
        setIsAnalyticsOpen(true);
    };

    return (
        <div className="max-w-5xl">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Live Demos</h1>
                    <p className="text-slate-500">Schedule webinars and live product showcases.</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-transform active:scale-95"
                >
                    + Schedule Session
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* UPCOMING CARDS MAPPED */}
                {demos.map((demo) => (
                    <div key={demo.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{demo.status}</span>
                        </div>
                        <div className="mb-6">
                            <div className="text-sm font-bold text-orange-600 mb-1">{demo.time}</div>
                            <h3 className="text-xl font-bold text-slate-900">{demo.title}</h3>
                            <p className="text-slate-500 text-sm mt-2">A deep dive into the new features of our flagship product line with Q&A.</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-500">Registered Attendees</span>
                                <span className="font-bold text-slate-900">{demo.attendees}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5">
                                <div className="bg-orange-500 h-1.5 rounded-full w-[45%]"></div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleOpenEdit}
                                className="flex-1 border border-slate-200 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Edit Details
                            </button>
                            <button
                                onClick={handleStartEarly}
                                className="flex-1 bg-orange-600 text-white font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                            >
                                Start Early
                            </button>
                        </div>
                    </div>
                ))}

                {/* PAST CARD (Static) */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 opacity-75 hover:opacity-100 transition-opacity">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">ENDED</span>
                    </div>
                    <div className="mb-6">
                        <div className="text-sm font-bold text-slate-500 mb-1">JAN 24, 2:00 PM</div>
                        <h3 className="text-xl font-bold text-slate-700">Q1 Industry Trends Panel</h3>
                        <p className="text-slate-500 text-sm mt-2">Recorded session available for replay.</p>
                    </div>

                    <div className="flex gap-8 mb-6">
                        <div>
                            <div className="text-2xl font-bold text-slate-900">854</div>
                            <div className="text-xs text-slate-500 font-medium">TOTAL VIEWS</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-emerald-600">42</div>
                            <div className="text-xs text-slate-500 font-medium">LEADS CAPTURED</div>
                        </div>
                    </div>

                    <button
                        onClick={handleViewAnalytics}
                        className="w-full border border-slate-200 bg-white text-slate-600 font-bold py-2.5 rounded-xl hover:bg-slate-50"
                    >
                        View Analytics
                    </button>
                </div>

            </div>

            {/* SCHEDULE MODAL */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === 'create' ? "Schedule New Session" : "Edit Session Details"}
            >
                <form className="space-y-5" onSubmit={handleSave_Mock}>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                            Session Title
                            <Tooltip content="Catchy title to attract attendees">
                                <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                            </Tooltip>
                        </label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="e.g. Q1 Product Reveal" defaultValue={modalMode === 'edit' ? "Product Launch: Gen 2 Series" : ""} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Session Type
                                <Tooltip content="The format of your live session">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10 bg-white">
                                <option>Product Launch</option>
                                <option>Q&A Session</option>
                                <option>Webinar</option>
                                <option>Live Tutorial</option>
                                <option>Networking</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Speaker Name
                                <Tooltip content="Who will be leading the session?">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="e.g. John Doe" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Date
                                <Tooltip content="The day your session will go live">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Time (UTC)
                                <Tooltip content="Select a time slot (we'll auto-convert for attendees)">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input type="time" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                            Description
                            <Tooltip content="Summarize what attendees will gain from this session">
                                <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                            </Tooltip>
                        </label>
                        <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none h-24" placeholder="Join us for..." defaultValue={modalMode === 'edit' ? "A deep dive into..." : ""}></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Max Attendees
                                <Tooltip content="Limit capacity to create exclusivity and urgency">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="Unlimited" />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Meeting Link
                                <Tooltip content="The URL where the session will be hosted (Zoom, Meet, etc.)">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="https://zoom.us/..." />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl">Cancel</button>
                        <button type="submit" className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-colors">
                            {modalMode === 'create' ? 'Schedule Event' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* ANALYTICS MODAL */}
            <Modal
                isOpen={isAnalyticsOpen}
                onClose={() => setIsAnalyticsOpen(false)}
                title="Session Analytics: Q1 Trends"
            >
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-xs text-slate-500 font-bold mb-1">TOTAL VIEWERS</div>
                            <div className="text-2xl font-bold text-slate-900">854</div>
                            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
                                <TrendUpIcon className="w-3 h-3" /> +12% vs last event
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-xs text-slate-500 font-bold mb-1">AVG. WATCH TIME</div>
                            <div className="text-2xl font-bold text-slate-900">18m 20s</div>
                            <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mt-1">
                                Top 5% of exhibitors
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-xs text-slate-500 font-bold mb-1">INTERACTIONS</div>
                            <div className="text-2xl font-bold text-slate-900">312</div>
                            <div className="text-xs text-slate-400 mt-1">Chats, polls & reactions</div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <div className="text-xs text-orange-600 font-bold mb-1">LEADS CAPTURED</div>
                            <div className="text-2xl font-bold text-orange-700">42</div>
                            <div className="text-xs text-orange-600/80 mt-1">High Intent</div>
                        </div>
                    </div>

                    {/* Engagement Graph Mock */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-3 text-sm">Engagement Over Time</h4>
                        <div className="h-32 flex items-end justify-between gap-1">
                            {[40, 65, 45, 80, 50, 90, 85, 60, 75, 55, 60, 40].map((h, i) => (
                                <div key={i} className="bg-slate-200 hover:bg-orange-400 transition-colors w-full rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {h} Viewers
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mt-2">
                            <span>00:00</span>
                            <span>15:00</span>
                            <span>30:00</span>
                        </div>
                    </div>

                    <button onClick={() => setIsAnalyticsOpen(false)} className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-slate-800">
                        Close Report
                    </button>
                </div>
            </Modal>
        </div>
    );
}
