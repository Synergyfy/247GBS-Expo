"use client";

import { useState } from "react";
import { 
    Truck, 
    Link2, 
    Database, 
    Zap, 
    CheckCircle2, 
    Plus, 
    ArrowRight, 
    ExternalLink,
    ShieldCheck,
    Globe,
    CreditCard,
    Smartphone,
    Search,
    Code,
    Cpu
} from "lucide-react";
import Modal from "@/app/component/Modal";

const CATEGORIES = [
    { id: "logistics", label: "Logistics & Shipping", icon: Truck },
    { id: "payments", label: "Payment Gateways", icon: CreditCard },
    { id: "marketing", label: "Marketing & CRM", icon: Zap },
    { id: "pos", label: "POS Systems", icon: Smartphone },
    { id: "erp", label: "ERP & Accounting", icon: Cpu },
];

const CONNECTED = [
    { name: "DHL Express", cat: "Logistics", status: "Active", icon: Truck, color: "text-red-600" },
    { name: "Stripe", cat: "Payments", status: "Active", icon: CreditCard, color: "text-blue-600" },
    { name: "Salesforce", cat: "CRM", status: "Connected", icon: Zap, color: "text-sky-500" },
];

export default function IntegrationsHubPage() {
    const [activeCat, setActiveCat] = useState("all");

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Integrations Hub</h1>
                    <p className="text-slate-500 text-lg">Sync 247GBS with your existing tech stack and logistics partners.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <Code className="w-4 h-4" /> API Documentation
                    </button>
                </div>
            </div>

            {/* Sync Summary */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 top-0 p-10 opacity-10">
                    <Database className="w-48 h-48" />
                </div>
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                        <h2 className="text-xl font-bold uppercase tracking-widest">Global Sync Active</h2>
                    </div>
                    <p className="text-slate-400 max-w-lg leading-relaxed">
                        Your dashboard is currently syncing with <strong>3 active partners</strong>. All transaction data and fulfilment logs are being mirrored in real-time.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 relative z-10 w-full lg:w-auto">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                        <p className="text-[10px] font-black uppercase text-slate-500 mb-1">API Requests</p>
                        <p className="text-2xl font-black">12.4K</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                        <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Last Sync</p>
                        <p className="text-2xl font-black">2m ago</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Categories */}
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 ml-4">Partners by Category</p>
                    <button 
                        onClick={() => setActiveCat("all")}
                        className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeCat === 'all' ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Globe className="w-5 h-5" /> All Integrations
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button 
                            key={cat.id}
                            onClick={() => setActiveCat(cat.id)}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeCat === cat.id ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                        >
                            <cat.icon className="w-5 h-5" /> {cat.label}
                        </button>
                    ))}
                </div>

                {/* Integration Grid */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 16.1 Logistics Example */}
                        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm group hover:border-orange-200 transition-all flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <Truck className="w-8 h-8" />
                                </div>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">DHL Express</h3>
                            <p className="text-slate-500 text-xs mb-8 leading-relaxed">Automate shipping labels and real-time tracking for physical product redemptions.</p>
                            <button className="mt-auto w-full py-4 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                                Configure Webhooks <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm group hover:border-orange-200 transition-all flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <CreditCard className="w-8 h-8" />
                                </div>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Stripe Checkout</h3>
                            <p className="text-slate-500 text-xs mb-8 leading-relaxed">Direct connection for ticket sales and merchant payouts.</p>
                            <button className="mt-auto w-full py-4 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                                Payment Settings <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Marketplace Option */}
                        <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center group hover:border-orange-400 transition-all cursor-pointer">
                            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                                <Plus className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1">Add New Partner</h3>
                            <p className="text-xs text-slate-400">Browse 50+ marketplace apps</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
