"use client";

import { useState, useEffect } from "react";
import {
    Zap,
    Calendar,
    Percent,
    ShoppingBag,
    MapPin,
    Plus,
    Clock,
    TrendingUp,
    MoreVertical,
    Target,
    Filter,
    ArrowRight,
    Info,
    Ticket,
    Loader2,
    ChevronDown,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import Modal from "@/app/component/Modal";
import Tooltip from "@/app/component/Tooltip";
import { api } from "@/lib/api";

const CAMPAIGN_TYPES = [
    { id: "PROMO", label: "General Promotion", desc: "Run a simple discount code for your event.", icon: Percent, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "FLASH", label: "Flash Sale", desc: "Limited time offer with a countdown timer.", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
    { id: "BUNDLE", label: "Bundle Offer", desc: "Tickets combined with products/services.", icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50" },
    { id: "GEO", label: "Geo-Targeted", desc: "Offers available to specific regions only.", icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const EMPTY_FORM = {
    name: "",
    description: "",
    type: "PROMO",
    discountType: "PERCENTAGE",
    discountValue: "",
    code: "",
    location: "",
    targetTierId: "",
    startDate: "",
    endDate: "",
};

export default function CampaignManagementPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [isEventsLoading, setIsEventsLoading] = useState(true);

    const [tiers, setTiers] = useState<any[]>([]);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialType, setInitialType] = useState("PROMO");
    const [form, setForm] = useState({ ...EMPTY_FORM });
    const [isSaving, setIsSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedEventId) {
            fetchCampaigns();
            fetchTiers();
        }
    }, [selectedEventId]);

    const fetchEvents = async () => {
        setIsEventsLoading(true);
        try {
            const data = await api.get("/dashboard/business/events");
            const list = data.events || [];
            setEvents(list);
            if (list.length > 0) setSelectedEventId(list[0].id);
        } catch {
            console.error("Failed to fetch events");
        } finally {
            setIsEventsLoading(false);
        }
    };

    const fetchCampaigns = async () => {
        if (!selectedEventId) return;
        setIsLoading(true);
        try {
            const data = await api.get(`/dashboard/business/sales/campaigns?eventId=${selectedEventId}`);
            setCampaigns(Array.isArray(data) ? data : []);
        } catch {
            console.error("Failed to fetch campaigns");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTiers = async () => {
        if (!selectedEventId) return;
        try {
            const data = await api.get(`/dashboard/business/events/${selectedEventId}/ticket-tiers`);
            setTiers(Array.isArray(data) ? data : []);
        } catch {
            console.error("Failed to fetch ticket tiers");
        }
    };

    const openModal = (type = "PROMO") => {
        setInitialType(type);
        setForm({ ...EMPTY_FORM, type });
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.discountValue || !form.startDate || !form.endDate) {
            setFormError("Name, Discount Value, Start and End dates are required.");
            return;
        }
        setIsSaving(true);
        setFormError(null);
        try {
            await api.post(`/dashboard/business/sales/campaigns?eventId=${selectedEventId}`, {
                ...form,
                discountValue: parseFloat(form.discountValue),
                targetTierId: form.targetTierId || undefined,
                location: form.location || undefined,
                description: form.description || undefined,
                code: form.code || undefined,
            });
            setIsModalOpen(false);
            showMessage("success", "Campaign launched successfully!");
            fetchCampaigns();
        } catch (err: any) {
            setFormError(err.message || "Failed to create campaign.");
        } finally {
            setIsSaving(false);
        }
    };

    const showMessage = (type: "success" | "error", text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 4000);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Campaign Management</h1>
                    <p className="text-slate-500 text-lg">Scale your attendance with targeted promotions and flash sales.</p>
                </div>
                <div className="flex items-center gap-3">
                    {message && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                            {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {message.text}
                        </div>
                    )}
                    <button
                        onClick={() => openModal()}
                        disabled={!selectedEventId}
                        className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <Plus className="w-5 h-5" /> Launch New Campaign
                    </button>
                </div>
            </div>

            {/* Event Selector */}
            <div className="relative inline-block w-full max-w-md">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Select Event</label>
                <select
                    value={selectedEventId}
                    onChange={e => setSelectedEventId(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer shadow-sm pr-12"
                >
                    {isEventsLoading ? <option>Loading events...</option> : events.length > 0 ? (
                        events.map(ev => <option key={ev.id} value={ev.id}>{ev.title || ev.name}</option>)
                    ) : <option value="">No events found</option>}
                </select>
                <ChevronDown className="absolute right-4 bottom-4 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Campaign Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {CAMPAIGN_TYPES.map((type) => (
                    <div key={type.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-orange-200 transition-all">
                        <div className={`w-16 h-16 rounded-[1.5rem] ${type.bg} ${type.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <type.icon className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-tight">{type.label}</h3>
                        <p className="text-slate-500 text-xs mb-8">{type.desc}</p>
                        <button
                            onClick={() => openModal(type.id)}
                            disabled={!selectedEventId}
                            className="mt-auto px-6 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all disabled:opacity-40"
                        >
                            Configure
                        </button>
                    </div>
                ))}
            </div>

            {/* Active Campaigns Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Active &amp; Scheduled Campaigns</h2>
                    <button onClick={fetchCampaigns} className="p-2 text-slate-400 hover:text-orange-600 transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                {isLoading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-orange-600" /></div>
                ) : !selectedEventId ? (
                    <div className="py-20 text-center">
                        <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Select an event to view campaigns</p>
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="py-20 text-center">
                        <Zap className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs mb-4">No campaigns yet</p>
                        <button onClick={() => openModal()} className="text-orange-600 font-bold text-sm hover:underline">Launch your first campaign →</button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign Name</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Offer</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Info</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {campaigns.map((camp) => (
                                    <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${camp.status === "Live" ? "bg-emerald-500" : camp.status === "Ended" ? "bg-slate-300" : "bg-blue-400"}`} />
                                                <p className="font-bold text-slate-900">{camp.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{camp.type}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${camp.status === "Live" ? "bg-emerald-100 text-emerald-700" : camp.status === "Ended" ? "bg-slate-100 text-slate-500" : "bg-blue-100 text-blue-700"}`}>
                                                {camp.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-black text-orange-600">{camp.discount}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                                <span className="font-bold text-slate-900">{camp.sales} Tix</span>
                                                {camp.expiry && (
                                                    <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {camp.expiry}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            {camp.location && (
                                                <span className="text-[10px] font-bold text-slate-400 flex items-center justify-end gap-1">
                                                    <MapPin className="w-3 h-3" /> {camp.location}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create Campaign Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Launch New Campaign">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {formError && (
                        <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-100 px-4 py-3 rounded-xl text-sm font-bold">
                            <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Campaign Name *</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                            placeholder="e.g. Winter Flash Sale"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Campaign Type</label>
                        <select
                            value={form.type}
                            onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                        >
                            {CAMPAIGN_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Target Ticket Tier</label>
                            <Tooltip content="Which ticket tier will this discount apply to?"><Info className="w-3.5 h-3.5 text-slate-400 cursor-help" /></Tooltip>
                        </div>
                        <div className="relative">
                            <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <select
                                value={form.targetTierId}
                                onChange={e => setForm(p => ({ ...p, targetTierId: e.target.value }))}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-bold appearance-none"
                            >
                                <option value="">All Tiers</option>
                                {tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Discount Type</label>
                            <select
                                value={form.discountType}
                                onChange={e => setForm(p => ({ ...p, discountType: e.target.value }))}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold appearance-none"
                            >
                                <option value="PERCENTAGE">Percentage %</option>
                                <option value="FIXED">Fixed Amount ₦</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Value *</label>
                            <input
                                type="number"
                                value={form.discountValue}
                                onChange={e => setForm(p => ({ ...p, discountValue: e.target.value }))}
                                placeholder="20"
                                min="0"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Start Date *</label>
                            <input
                                type="datetime-local"
                                value={form.startDate}
                                onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">End Date *</label>
                            <input
                                type="datetime-local"
                                value={form.endDate}
                                onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Promo Code (optional)</label>
                            <input
                                type="text"
                                value={form.code}
                                onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                                placeholder="SPRING20"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-mono font-bold"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Location (Geo, optional)</label>
                            <input
                                type="text"
                                value={form.location}
                                onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                                placeholder="e.g. UK Only"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>
                    </div>

                    {form.location && (
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                                <Target className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-emerald-600">Geo-Targeting Active</p>
                                <p className="text-xs text-emerald-800 font-medium">Campaign visible only to users in <span className="font-bold">{form.location}</span>.</p>
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Launch Campaign <ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
