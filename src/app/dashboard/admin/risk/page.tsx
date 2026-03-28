"use client";

import { useState, useEffect, useCallback } from "react";
import { 
    AlertTriangle, 
    ShieldAlert, 
    Zap, 
    Search, 
    Filter, 
    Activity, 
    UserX, 
    MoreVertical,
    TrendingDown,
    ArrowRight,
    MapPin,
    Smartphone,
    BarChart2,
    Target,
    Loader2,
    AlertCircle,
    RefreshCw
} from "lucide-react";
import { api } from "@/lib/api";

interface RiskStats {
    highRiskEvents: number;
    velocityTriggers: number;
    blockedAttempts: number;
    fraudSavings: number;
    threatLevel: string;
}

interface Anomaly {
    id: string;
    title: string;
    desc: string;
    priority: string;
    time: string;
    type: string;
}

interface Rule {
    id: string;
    name: string;
    enabled: boolean;
    threshold?: string;
    totalBlocked?: number;
}

interface ScoringFactor {
    category: string;
    factors: string[];
    score: number;
}

interface ModelHealth {
    falsePositives: string;
    fraudCaptureRate: string;
    lastRetrained: string;
    status: string;
}

export default function RiskFraudPage() {
    const [activeTab, setActiveTab] = useState("monitor");
    const [stats, setStats] = useState<RiskStats | null>(null);
    const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
    const [rules, setRules] = useState<Rule[]>([]);
    const [scoring, setScoring] = useState<ScoringFactor[]>([]);
    const [health, setHealth] = useState<ModelHealth | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            const [statsRes, anomaliesRes, rulesRes, scoringRes, healthRes] = await Promise.all([
                api.get("/admin/risk/stats"),
                api.get("/admin/risk/anomalies"),
                api.get("/admin/risk/rules"),
                api.get("/admin/risk/scoring"),
                api.get("/admin/risk/health")
            ]);

            if (statsRes.success) setStats(statsRes.data);
            if (anomaliesRes.success) setAnomalies(anomaliesRes.data);
            if (rulesRes.success) setRules(rulesRes.data);
            if (scoringRes.success) setScoring(scoringRes.data);
            if (healthRes.success) setHealth(healthRes.data);
        } catch (e: any) {
            setError(e.message || "Failed to load risk data");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (isLoading && !stats) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm text-center">Initialising Risk Monitor...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Risk & Fraud Monitor</h1>
                    <p className="text-slate-500">Real-time threat detection, transaction velocity checks, and anomaly monitoring.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={fetchData} className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all" title="Refresh">
                        <RefreshCw className={`w-4 h-4 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <div className={`flex gap-4 px-4 py-2 rounded-xl border items-center ${
                        stats?.threatLevel === 'HIGH' ? 'bg-red-50 text-red-700 border-red-100' : 
                        stats?.threatLevel === 'MEDIUM' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                        'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                        <ShieldAlert className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-wider">Threat Level: {stats?.threatLevel || 'Unknown'}</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {[
                    { id: "monitor", label: "Live Monitor", icon: <Activity className="w-4 h-4" /> },
                    { id: "scoring", label: "Risk Scoring Matrix", icon: <Target className="w-4 h-4" /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${
                            activeTab === tab.id ? "text-orange-600" : "text-slate-400 hover:text-slate-900"
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-bold">{error}</p>
                </div>
            )}

            {/* LIVE MONITOR TAB */}
            {activeTab === "monitor" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
                    {/* Risk stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: "High Risk Events", val: stats?.highRiskEvents, icon: <AlertTriangle />, color: "red" },
                            { label: "Velocity Triggers", val: stats?.velocityTriggers, icon: <Activity />, color: "orange" },
                            { label: "Blocked Attempts", val: stats?.blockedAttempts, icon: <UserX />, color: "slate" },
                            { label: "Fraud Savings", val: `£${(stats?.fraudSavings || 0) / 1000}K`, icon: <TrendingDown />, color: "emerald" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">{stat.val ?? '—'}</h3>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Recent Anomaly Feed */}
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Active Anomalies</h3>
                                <button className="text-orange-600 text-sm font-bold uppercase tracking-widest hover:text-orange-700">View All Logs</button>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {anomalies.map((a, i) => (
                                    <div key={i} className="p-6 flex items-start justify-between hover:bg-slate-50 transition-colors group">
                                        <div className="flex gap-6">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                                a.priority === 'Critical' ? 'bg-red-50 text-red-600' : 
                                                a.priority === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'
                                            }`}>
                                                <ShieldAlert className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{a.title}</h4>
                                                <p className="text-sm text-slate-500 font-medium">{a.desc}</p>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pt-1">{a.time}</span>
                                            </div>
                                        </div>
                                        <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-orange-600 transition-all opacity-0 group-hover:opacity-100">
                                            Investigate
                                        </button>
                                    </div>
                                ))}
                                {anomalies.length === 0 && (
                                    <div className="p-12 text-center">
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active anomalies detected</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Risk Tools Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
                                <h3 className="text-xl font-bold mb-6">Detection Rules</h3>
                                <div className="space-y-4">
                                    {rules.map((rule) => (
                                        <div key={rule.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                                            <div>
                                                <p className="text-sm font-bold">{rule.name}</p>
                                                {rule.threshold && <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Limit: {rule.threshold}</p>}
                                                {rule.totalBlocked !== undefined && <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Total Blocked: {rule.totalBlocked}</p>}
                                            </div>
                                            <div className={`w-10 h-5 rounded-full relative transition-colors ${rule.enabled ? 'bg-orange-600' : 'bg-slate-700'}`}>
                                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${rule.enabled ? 'right-1' : 'left-1'}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm hover:bg-orange-50 transition-all">
                                    Adjust Thresholds
                                </button>
                            </div>

                            <div className="bg-orange-50 rounded-[2.5rem] border border-orange-100 p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Zap className="w-5 h-5 text-orange-600" />
                                    <h4 className="font-bold text-orange-900">Incident Response</h4>
                                </div>
                                <p className="text-xs text-orange-700 leading-relaxed font-medium mb-6">
                                    Emergency override is available for Super Admins. This freezes all outbound settlements immediately.
                                </p>
                                <button className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-red-700 transition-all">
                                    System Lock (Emergency)
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* SCORING MATRIX TAB */}
            {activeTab === "scoring" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Scoring Configuration */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-6">
                                <Target className="w-5 h-5 text-orange-600" /> Unified Risk Scoring
                            </h3>
                            
                            <div className="space-y-8">
                                {scoring.map((item, i) => (
                                    <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-lg">{item.category}</h4>
                                                <p className="text-xs text-slate-500 font-bold uppercase mt-1">Weighting Factors:</p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-lg text-sm font-black ${
                                                item.score > 80 ? 'bg-emerald-100 text-emerald-700' : 
                                                item.score > 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                Avg Score: {item.score}/100
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            {item.factors.map(f => (
                                                <span key={f} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
                                                    {f}
                                                </span>
                                            ))}
                                            <button className="px-3 py-1 border border-dashed border-slate-300 rounded-lg text-xs font-bold text-slate-400 hover:text-orange-600 hover:border-orange-400">+ Add Factor</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Model Health */}
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl text-white">
                             <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                                <BarChart2 className="w-5 h-5 text-orange-400" /> Model Accuracy
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">False Positives</span>
                                        <span className="font-bold text-emerald-400">{health?.falsePositives || '—'}</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: health?.falsePositives || '0%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">Fraud Capture Rate</span>
                                        <span className="font-bold text-orange-400">{health?.fraudCaptureRate || '—'}</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: health?.fraudCaptureRate || '0%' }}></div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-white/10">
                                    <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-[0.1em]">
                                        Model Status: <span className={health?.status === 'HEALTHY' ? 'text-emerald-400' : 'text-red-400'}>{health?.status || 'UNKNOWN'}</span>
                                    </p>
                                    <p className="text-xs text-slate-500 leading-relaxed mt-2">
                                        Risk engine was last retrained {health?.lastRetrained || '—'} using the latest settlement datasets.
                                    </p>
                                    <button className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all">
                                        Force Retrain
                                    </button>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            )}
        </div>
    );
}