"use client";

import { useState, useEffect } from "react";
import {
    Link as LinkIcon,
    QrCode,
    UserCheck,
    Rocket,
    Copy,
    Plus,
    CheckCircle2,
    BarChart3,
    Search,
    Loader2,
    ChevronDown,
    AlertCircle,
} from "lucide-react";
import Modal from "@/app/component/Modal";
import { api } from "@/lib/api";

const GENERATORS = [
    { id: "LINK", label: "Custom Sales Link", icon: LinkIcon, desc: "Generate a trackable URL for any event tier." },
    { id: "QR_CODE", label: "QR Poster", icon: QrCode, desc: "Create high-res QR codes for physical marketing." },
    { id: "AGENT_CODE", label: "Agent Code", icon: UserCheck, desc: "Unique identifiers for field agents and staff." },
    { id: "CAMPAIGN_URL", label: "Campaign URL", icon: Rocket, desc: "Special links for seasonal or flash sale offers." },
];

const ASSET_BASE_URL = "https://expo.247gbs.com/s/";

export default function LinkCodeGenerationPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [isEventsLoading, setIsEventsLoading] = useState(true);

    const [tiers, setTiers] = useState<any[]>([]);
    const [links, setLinks] = useState<any[]>([]);
    const [isLinksLoading, setIsLinksLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [genType, setGenType] = useState("LINK");
    const [form, setForm] = useState({ name: "", tierId: "", customCode: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedEventId) {
            fetchLinks();
            fetchTiers();
        }
    }, [selectedEventId]);

    useEffect(() => {
        if (selectedEventId) fetchLinks();
    }, [searchTerm]);

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

    const fetchLinks = async () => {
        if (!selectedEventId) return;
        setIsLinksLoading(true);
        try {
            const url = `/dashboard/business/sales/links?eventId=${selectedEventId}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""}`;
            const data = await api.get(url);
            setLinks(Array.isArray(data) ? data : []);
        } catch {
            console.error("Failed to fetch sales assets");
        } finally {
            setIsLinksLoading(false);
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

    const openModal = (type: string) => {
        setGenType(type);
        setForm({ name: "", tierId: "", customCode: "" });
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleGenerate = async () => {
        if (!form.name) {
            setFormError("Please provide an internal label for this asset.");
            return;
        }
        setIsSaving(true);
        setFormError(null);
        try {
            await api.post(`/dashboard/business/sales/links?eventId=${selectedEventId}`, {
                name: form.name,
                type: genType,
                tierId: form.tierId || undefined,
                customCode: form.customCode || undefined,
            });
            setIsModalOpen(false);
            showMessage("success", "Asset generated successfully!");
            fetchLinks();
        } catch (err: any) {
            setFormError(err.message || "Failed to generate asset.");
        } finally {
            setIsSaving(false);
        }
    };

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(`${ASSET_BASE_URL}${code}`);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
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
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Link &amp; Code Generation</h1>
                    <p className="text-slate-500 text-lg">Create trackable assets for your sales channels.</p>
                </div>
                {message && (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                        {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {message.text}
                    </div>
                )}
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

            {/* Generator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {GENERATORS.map((g) => (
                    <button
                        key={g.id}
                        onClick={() => openModal(g.id)}
                        disabled={!selectedEventId}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all text-left group disabled:opacity-40"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mb-6 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                            <g.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{g.label}</h3>
                        <p className="text-slate-500 text-xs mb-6 leading-relaxed">{g.desc}</p>
                        <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest">
                            Generate Now <Plus className="w-4 h-4" />
                        </div>
                    </button>
                ))}
            </div>

            {/* Trackable Links Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Trackable Assets</h2>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search codes..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500"
                        />
                    </div>
                </div>

                {isLinksLoading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-orange-600" /></div>
                ) : !selectedEventId ? (
                    <div className="py-20 text-center">
                        <LinkIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Select an event to view assets</p>
                    </div>
                ) : links.length === 0 ? (
                    <div className="py-20 text-center">
                        <LinkIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs mb-4">No sales assets yet</p>
                        <button onClick={() => openModal("LINK")} className="text-orange-600 font-bold text-sm hover:underline">Generate your first asset →</button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-50">
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Name</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversion</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Copy</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {links.map((link) => (
                                    <tr key={link.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-slate-900">{link.name}</p>
                                            <p className="text-xs text-slate-400 font-mono mt-1">{link.code}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {link.type?.replace(/_/g, " ")}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <BarChart3 className="w-4 h-4 text-orange-500" />
                                                <span className="font-bold text-slate-700">{(link.hits || 0).toLocaleString()} clicks</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-bold text-emerald-600">{link.conversions || 0} Sales</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-black text-slate-900">{link.revenue || "₦0"}</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button
                                                onClick={() => copyToClipboard(link.code)}
                                                className={`p-2 rounded-xl border transition-all shadow-sm ${copiedCode === link.code ? "bg-emerald-500 text-white border-emerald-500" : "hover:bg-white text-slate-400 hover:text-orange-600 border-transparent hover:border-slate-200"}`}
                                            >
                                                {copiedCode === link.code ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Generate Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Generate: ${GENERATORS.find(g => g.id === genType)?.label}`}>
                <div className="space-y-5">
                    {formError && (
                        <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-100 px-4 py-3 rounded-xl text-sm font-bold">
                            <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Internal Label *</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                            placeholder="e.g. Instagram Spring Campaign"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Target Ticket Tier (optional)</label>
                        <select
                            value={form.tierId}
                            onChange={e => setForm(p => ({ ...p, tierId: e.target.value }))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                        >
                            <option value="">All Tiers</option>
                            {tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Custom Code (optional)</label>
                        <input
                            type="text"
                            value={form.customCode}
                            onChange={e => setForm(p => ({ ...p, customCode: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                            placeholder="e.g. spring26-insta"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-mono"
                        />
                        <p className="text-[10px] text-slate-400">Leave blank to auto-generate</p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <p className="text-[10px] font-black uppercase text-orange-600 mb-2">Preview URL</p>
                        <p className="text-sm font-mono font-bold text-orange-900">
                            {ASSET_BASE_URL}{form.customCode || "[auto-generated]"}
                        </p>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all text-xs uppercase tracking-widest">Cancel</button>
                        <button
                            onClick={handleGenerate}
                            disabled={isSaving}
                            className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate & Save"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
