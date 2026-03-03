"use client";

import { useState, useEffect } from "react";
import {
    Activity,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    Clock,
    BarChart3,
    Search,
    Filter,
    Download,
    Eye,
    ShieldAlert,
    ChevronDown,
    Loader2
} from "lucide-react";
import { api } from "@/lib/api";

export default function RewardMonitoringPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [isEventsLoading, setIsEventsLoading] = useState(true);

    const [stats, setStats] = useState({
        issued: 0,
        redeemed: 0,
        expired: 0,
        flagged: 0
    });
    const [logs, setLogs] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isActionProcessing, setIsActionProcessing] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedEventId) {
            fetchMonitoringData();
        }
    }, [selectedEventId, searchTerm]);

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

    const fetchMonitoringData = async () => {
        if (!selectedEventId) return;
        setIsDataLoading(true);
        try {
            const [statsRes, logsRes, alertsRes] = await Promise.all([
                api.get(`/dashboard/business/rewards/monitoring/stats?eventId=${selectedEventId}`),
                api.get(`/dashboard/business/rewards/monitoring/logs?eventId=${selectedEventId}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""}`),
                api.get(`/dashboard/business/rewards/monitoring/alerts?eventId=${selectedEventId}`)
            ]);
            setStats(statsRes);
            setLogs(logsRes);
            setAlerts(alertsRes);
        } catch (err) {
            console.error("Failed to fetch monitoring data", err);
        } finally {
            setIsDataLoading(false);
        }
    };

    const handleBlockIP = async (ip: string) => {
        if (!confirm(`Are you sure you want to block IP: ${ip}?`)) return;
        setIsActionProcessing(true);
        try {
            await api.post(`/dashboard/business/rewards/monitoring/block-ip`, {
                ipAddress: ip,
                reason: "Suspicious activity detected via monitoring"
            });
            alert("IP Blocked successfully");
            fetchMonitoringData();
        } catch (err: any) {
            alert(err.message || "Failed to block IP");
        } finally {
            setIsActionProcessing(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Reward Monitoring</h1>
                    <p className="text-slate-500 text-lg">Real-time tracking of reward lifecycle and fraud detection.</p>
                </div>
                <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                    <Download className="w-5 h-5" /> Export Logs
                </button>
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

            {/* Monitoring Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Issued", val: stats.issued.toLocaleString(), icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Redeemed", val: stats.redeemed.toLocaleString(), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Expired", val: stats.expired.toLocaleString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Abuse Flags", val: stats.flagged.toLocaleString(), icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{isDataLoading ? "..." : stat.val}</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Abuse Detection Alerts */}
            {alerts.length > 0 && alerts.map((alert, idx) => (
                <div key={idx} className="bg-red-50 border border-red-100 p-6 rounded-[2rem] flex items-center gap-6 animate-pulse">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm shrink-0">
                        <AlertTriangle className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-red-900">{alert.type}</h4>
                        <p className="text-sm text-red-700 font-medium">{alert.message}</p>
                    </div>
                    <button
                        onClick={() => handleBlockIP(alert.ip)}
                        disabled={isActionProcessing}
                        className="px-6 py-2 bg-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-red-700 transition-all flex items-center gap-2"
                    >
                        {isActionProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Block IP"}
                    </button>
                </div>
            ))}

            {/* Real-time Logs */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Reward Lifecycle Logs</h2>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search user..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>
                        <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors"><Filter className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[300px]">
                    {isDataLoading ? (
                        <div className="flex items-center justify-center py-20 h-full">
                            <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <Activity className="w-12 h-12 mb-4 opacity-20" />
                            <p className="font-bold uppercase tracking-widest text-xs">No logs found for this period</p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User / Attendee</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reward Type</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-mono font-bold text-slate-400">{log.id}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-slate-900">{log.user}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">IP: {log.ip}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-bold text-slate-600">{log.reward}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${log.status === 'Redeemed' ? 'bg-emerald-100 text-emerald-700' :
                                                    log.status === 'Flagged' ? 'bg-red-100 text-red-700' :
                                                        log.status === 'Expired' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-500">{log.time}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 hover:bg-white text-slate-400 hover:text-orange-600 rounded-xl border border-transparent hover:border-slate-200 shadow-sm transition-all">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
