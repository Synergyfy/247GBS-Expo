"use client";

import { useState, useEffect } from "react";
import {
    Link2,
    ShieldCheck,
    Database,
    ArrowRight,
    CheckCircle2,
    RefreshCw,
    ExternalLink,
    Plus,
    Activity,
    ChevronDown,
    Loader2,
    X,
    Server,
    Key
} from "lucide-react";
import { api } from "@/lib/api";
import Modal from "@/app/component/Modal";

export default function LoyaltyIntegrationPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [isEventsLoading, setIsEventsLoading] = useState(true);

    const [status, setStatus] = useState<any>(null);
    const [integrations, setIntegrations] = useState<any[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(false);

    // Modal State
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [activeIntegration, setActiveIntegration] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [config, setConfig] = useState<any>({ apiKey: "", webhookUrl: "" });

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedEventId) {
            fetchIntegrationData();
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

    const fetchIntegrationData = async () => {
        if (!selectedEventId) return;
        setIsDataLoading(true);
        try {
            const [statusRes, listRes] = await Promise.all([
                api.get(`/dashboard/business/rewards/integrations/status?eventId=${selectedEventId}`),
                api.get(`/dashboard/business/rewards/integrations/list?eventId=${selectedEventId}`)
            ]);
            setStatus(statusRes);
            setIntegrations(listRes);
        } catch (err) {
            console.error("Failed to fetch integration data", err);
        } finally {
            setIsDataLoading(false);
        }
    };

    const handleConnect = async () => {
        if (!activeIntegration || !selectedEventId) return;
        setIsProcessing(true);
        try {
            await api.post(`/dashboard/business/rewards/integrations/connect?eventId=${selectedEventId}`, {
                name: activeIntegration.name,
                type: activeIntegration.type,
                config: config
            });
            alert(`${activeIntegration.name} connected successfully!`);
            setIsConnectModalOpen(false);
            fetchIntegrationData();
        } catch (err: any) {
            alert(err.message || "Failed to connect integration");
        } finally {
            setIsProcessing(false);
        }
    };

    const openConnectModal = (item: any) => {
        setActiveIntegration(item);
        setConfig(item.config || { apiKey: "", webhookUrl: "" });
        setIsConnectModalOpen(true);
    };

    const formatTime = (dateStr: string) => {
        if (!dateStr) return "Never";
        const date = new Date(dateStr);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Loyalty Integration</h1>
                    <p className="text-slate-500 text-lg">Connect your external systems to automate reward distribution.</p>
                </div>
            </div>

            {/* Event Selector */}
            <div className="relative inline-block w-full max-w-md">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Event Context</label>
                <div className="relative">
                    <select
                        value={selectedEventId}
                        onChange={e => setSelectedEventId(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer shadow-sm pr-12"
                    >
                        {isEventsLoading ? (
                            <option>Loading events...</option>
                        ) : events.length > 0 ? (
                            events.map(ev => <option key={ev.id} value={ev.id}>{ev.title || ev.name}</option>)
                        ) : (
                            <option value="">No events found</option>
                        )}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
            </div>

            {/* Sync Status */}
            {status && (
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                            <RefreshCw className={`w-6 h-6 ${status.syncActive ? 'animate-spin-slow' : ''}`} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">System Sync {status.syncActive ? 'Active' : 'Inactive'}</p>
                            <p className="text-xs text-slate-500 font-medium">Last sync completed {formatTime(status.lastSyncTime)}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right border-r border-slate-100 pr-6">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Synced Profiles</p>
                            <p className="text-xl font-bold text-slate-900">{(status.syncedProfiles || 0).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">API Status</p>
                            <p className={`text-xl font-bold flex items-center gap-2 justify-end ${status.apiStatus === 'Healthy' ? 'text-emerald-600' : 'text-orange-600'}`}>
                                {status.apiStatus} <div className={`w-2 h-2 rounded-full ${status.apiStatus === 'Healthy' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Integration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isDataLoading ? (
                    <div className="col-span-full py-20 flex justify-center">
                        <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
                    </div>
                ) : integrations.map((item) => (
                    <div key={item.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>
                                {item.icon === 'ShieldCheck' ? <ShieldCheck className="w-6 h-6" /> : <Database className="w-6 h-6" />}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                                }`}>
                                {item.status}
                            </span>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed">{item.desc}</p>
                        </div>

                        <button
                            onClick={() => openConnectModal(item)}
                            disabled={item.status === 'Coming Soon'}
                            className={`mt-8 w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm ${item.status === 'Coming Soon' ? 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-60 desaturate' :
                                item.status === 'Connected'
                                    ? 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-200'
                                }`}>
                            {item.status === 'Coming Soon' ? 'COMING SOON' : (item.status === 'Connected' ? 'Configure Settings' : 'Connect Now')}
                            {item.status !== 'Coming Soon' && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                ))}
            </div>

            {/* Connect Modal */}
            <Modal
                isOpen={isConnectModalOpen}
                onClose={() => setIsConnectModalOpen(false)}
                title={activeIntegration?.status === 'Connected' ? 'Integration Settings' : `Connect ${activeIntegration?.name || 'Integration'}`}
                maxWidth="2xl"
            >
                <div className="p-8">
                    {activeIntegration && (
                        <p className="text-slate-500 font-medium mb-8">Configure your {activeIntegration.name} authentication.</p>
                    )}


                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-2">
                                <Key className="w-3 h-3" /> API Key / Secret Token
                            </label>
                            <input
                                type="password"
                                value={config.apiKey}
                                onChange={e => setConfig({ ...config, apiKey: e.target.value })}
                                placeholder="sk-..."
                                className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-inner"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-2">
                                <Server className="w-3 h-3" /> Instance URL
                            </label>
                            <input
                                type="text"
                                value={config.webhookUrl}
                                onChange={e => setConfig({ ...config, webhookUrl: e.target.value })}
                                placeholder="https://your-crm.com/api"
                                className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-inner"
                            />
                        </div>

                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                            <p className="text-xs text-orange-800 leading-relaxed font-medium">
                                <span className="font-bold">Security Note:</span> Your API keys are encrypted at rest and never shared with third parties. We use these only to sync reward data with your {activeIntegration?.name} account.
                            </p>
                        </div>

                        <button
                            onClick={handleConnect}
                            disabled={isProcessing || !config.apiKey}
                            className="w-full py-5 bg-orange-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : (activeIntegration?.status === 'Connected' ? 'Update Settings' : 'Initialize Connection')}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
