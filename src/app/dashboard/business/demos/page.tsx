"use client";

import { useState, useEffect } from "react";
import Modal from "../../../component/Modal";
import Tooltip from "../../../component/Tooltip";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

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
    const [isLoading, setIsLoading] = useState(true);
    const [demos, setDemos] = useState<any[]>([]);
    const [selectedDemo, setSelectedDemo] = useState<any>(null);
    const [analyticsData, setAnalyticsData] = useState<any>(null);

    useEffect(() => {
        fetchDemos();
    }, []);

    const fetchDemos = async () => {
        try {
            const data = await api.get('/business/demos');
            setDemos(data);
        } catch (error) {
            console.error("Failed to fetch demos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setModalMode('create');
        setSelectedDemo(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (demo: any) => {
        setModalMode('edit');
        setSelectedDemo(demo);
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const payload = {
            title: formData.get('title'),
            type: formData.get('type'),
            speakerName: formData.get('speakerName'),
            startTime: `${formData.get('date')}T${formData.get('time')}:00Z`, // Simple ISO conversion
            description: formData.get('description'),
            maxAttendees: parseInt(formData.get('maxAttendees') as string) || null,
            meetingLink: formData.get('meetingLink'),
        };

        try {
            if (modalMode === 'create') {
                await api.post('/business/demos', payload);
            } else {
                await api.patch(`/business/demos/${selectedDemo.id}`, payload);
            }
            fetchDemos();
            setIsModalOpen(false);
        } catch (error) {
            alert("Failed to save demo session");
        }
    };

    const handleStartEarly = async (id: string) => {
        try {
            await api.post(`/business/demos/${id}/start`, {});
            fetchDemos();
        } catch (error) {
            alert("Failed to start session");
        }
    };

    const handleViewAnalytics = async (demo: any) => {
        try {
            const analytics = await api.get(`/business/demos/${demo.id}/analytics`);
            setAnalyticsData(analytics);
            setSelectedDemo(demo);
            setIsAnalyticsOpen(true);
        } catch (error) {
            alert("Failed to fetch analytics");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
        );
    }

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

                {/* Demos List */}
                {demos.map((demo) => (
                    <div key={demo.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 shrink-0">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${demo.status === 'LIVE' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-700'}`}>
                                {demo.status}
                            </span>
                        </div>
                        <div className="mb-6">
                            <div className="text-sm font-bold text-orange-600 mb-1">
                                {new Date(demo.startTime).toLocaleString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric', 
                                    hour: 'numeric', 
                                    minute: '2-digit' 
                                })}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{demo.title}</h3>
                            <p className="text-slate-500 text-sm mt-2 line-clamp-2">{demo.description || "No description provided."}</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-500">Total Views</span>
                                <span className="font-bold text-slate-900">{demo.views}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Leads Captured</span>
                                <span className="font-bold text-orange-600">{demo.leads}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => handleOpenEdit(demo)}
                                className="flex-1 border border-slate-200 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Edit Details
                            </button>
                            {demo.status === 'UPCOMING' ? (
                                <button
                                    onClick={() => handleStartEarly(demo.id)}
                                    className="flex-1 bg-orange-600 text-white font-bold py-2.5 rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
                                >
                                    Start Early
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleViewAnalytics(demo)}
                                    className="flex-1 bg-slate-900 text-white font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
                                >
                                    View Analytics
                                </button>
                            )}
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

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === 'create' ? "Schedule New Session" : "Edit Session Details"}
            >
                <form className="space-y-5" onSubmit={handleSave}>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                            Session Title
                            <Tooltip content="Catchy title to attract attendees">
                                <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                            </Tooltip>
                        </label>
                        <input name="title" required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="e.g. Q1 Product Reveal" defaultValue={selectedDemo?.title || ""} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Session Type
                                <Tooltip content="The format of your live session">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <select name="type" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10 bg-white" defaultValue={selectedDemo?.type || "Product Launch"}>
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
                            <input name="speakerName" required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="e.g. John Doe" defaultValue={selectedDemo?.speakerName || ""} />
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
                            <input name="date" required type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" defaultValue={selectedDemo?.startTime?.split('T')[0] || ""} />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Time (UTC)
                                <Tooltip content="Select a time slot (we'll auto-convert for attendees)">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input name="time" required type="time" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" defaultValue={selectedDemo?.startTime?.split('T')[1]?.substring(0, 5) || ""} />
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                            Description
                            <Tooltip content="Summarize what attendees will gain from this session">
                                <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                            </Tooltip>
                        </label>
                        <textarea name="description" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none h-24" placeholder="Join us for..." defaultValue={selectedDemo?.description || ""}></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Max Attendees
                                <Tooltip content="Limit capacity to create exclusivity and urgency">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input name="maxAttendees" type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="Unlimited" defaultValue={selectedDemo?.maxAttendees || ""} />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Meeting Link
                                <Tooltip content="The URL where the session will be hosted (Zoom, Meet, etc.)">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input name="meetingLink" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="https://zoom.us/..." defaultValue={selectedDemo?.meetingLink || ""} />
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
                title={`Session Analytics: ${selectedDemo?.title}`}
            >
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-xs text-slate-500 font-bold mb-1">TOTAL VIEWERS</div>
                            <div className="text-2xl font-bold text-slate-900">{analyticsData?.views || 0}</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-xs text-slate-500 font-bold mb-1">AVG. WATCH TIME</div>
                            <div className="text-2xl font-bold text-slate-900">{Math.round((analyticsData?.avgWatchTime || 0) / 60)}m</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-xs text-slate-500 font-bold mb-1">INTERACTIONS</div>
                            <div className="text-2xl font-bold text-slate-900">{analyticsData?.interactions || 0}</div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <div className="text-xs text-orange-600 font-bold mb-1">LEADS CAPTURED</div>
                            <div className="text-2xl font-bold text-orange-700">{analyticsData?.leads || 0}</div>
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
