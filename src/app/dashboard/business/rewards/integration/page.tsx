"use client";

import { useState } from "react";
import { 
    Link2, 
    ShieldCheck, 
    Database, 
    ArrowRight, 
    CheckCircle2, 
    RefreshCw,
    ExternalLink,
    Plus,
    Activity
} from "lucide-react";

const INTEGRATIONS = [
    { 
        id: "247gbs", 
        name: "247GBS Rewards", 
        desc: "Native integration with our platform-wide loyalty points system.", 
        status: "Connected", 
        icon: ShieldCheck,
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
    { 
        id: "crm", 
        name: "CRM Platforms", 
        desc: "Sync attendee data and reward history with Salesforce, HubSpot, or Zoho.", 
        status: "Coming Soon", 
        isComingSoon: true,
        icon: Database,
        color: "text-purple-600",
        bg: "bg-purple-50"
    }
];

export default function LoyaltyIntegrationPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Loyalty Integration</h1>
                    <p className="text-slate-500 text-lg">Connect your external systems to automate reward distribution.</p>
                </div>
            </div>

            {/* Sync Status */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <RefreshCw className="w-6 h-6 animate-spin-slow" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">System Sync Active</p>
                        <p className="text-xs text-slate-500 font-medium">Last sync completed 4 minutes ago</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-right border-r border-slate-100 pr-6">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Synced Profiles</p>
                        <p className="text-xl font-bold text-slate-900">12,402</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">API Status</p>
                        <p className="text-xl font-bold text-emerald-600 flex items-center gap-2 justify-end">
                            Healthy <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </p>
                    </div>
                </div>
            </div>

            {/* Integration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INTEGRATIONS.map((item) => (
                    <div key={item.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                item.status === 'Connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                            }`}>
                                {item.status}
                            </span>
                        </div>
                        
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed">{item.desc}</p>
                        </div>

                        <button 
                            disabled={item.isComingSoon}
                            className={`mt-8 w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm ${
                            item.isComingSoon ? 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-60 desaturate' :
                            item.status === 'Connected' 
                            ? 'bg-slate-50 text-slate-600 hover:bg-slate-100' 
                            : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-200'
                        }`}>
                            {item.isComingSoon ? 'COMING SOON' : (item.status === 'Connected' ? 'Configure Settings' : 'Connect Now')}
                            {!item.isComingSoon && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                ))}
            </div>

            {/* Webhook Section */}
            {/* <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Activity className="w-48 h-48" />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Developer Webhooks</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Listen for real-time events like <span className="text-orange-500 font-bold">reward.redeemed</span> or <span className="text-orange-500 font-bold">loyalty.milestone</span> to trigger actions in your own application.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-8 py-4 bg-orange-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all">
                            Manage Endpoints
                        </button>
                        <button className="px-8 py-4 bg-white/10 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                            View API Docs <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
