"use client";

import { useState } from "react";
import { 
    Settings, DollarSign, FileText, Globe, 
    ShieldCheck, Clock, Save, Plus, Trash2, HelpCircle,
    Lock, Shield, Server, Cpu, X
} from "lucide-react";

export default function ConfigurationPage() {
    const [activeTab, setActiveTab] = useState("system");

    const tabs = [
        { id: "system", label: "System Rules", icon: <Settings className="w-4 h-4" /> },
        { id: "financial", label: "Finance & Tax", icon: <DollarSign className="w-4 h-4" /> },
        { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
        { id: "templates", label: "Policy & Templates", icon: <FileText className="w-4 h-4" /> },
        { id: "gateways", label: "Payment Gateways", icon: <Globe className="w-4 h-4" /> }
    ];

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Platform Configuration</h1>
                    <p className="text-slate-500">Global system parameters and operational policies.</p>
                </div>
                <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 flex items-center gap-2">
                    <Save className="w-5 h-5" /> Save Changes
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm mb-8 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                            activeTab === tab.id 
                                ? "bg-orange-600 text-white shadow-md" 
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                
                {/* SYSTEM RULES */}
                {activeTab === "system" && (
                    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <section className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-4">Ticket & Access Rules</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        Refund Window (Hours) <HelpCircle className="w-3 h-3 text-slate-400" />
                                    </label>
                                    <input type="number" defaultValue={72} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Max Tickets Per User</label>
                                    <input type="number" defaultValue={10} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium" />
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* SECURITY ADMINISTRATION (PRD 13) */}
                {activeTab === "security" && (
                    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <section className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-orange-600" /> 13.1 Access Control
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">MFA Enforcement</p>
                                            <p className="text-xs text-slate-500">Mandatory for all Admin roles</p>
                                        </div>
                                        <div className="w-12 h-6 bg-orange-600 rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">Session Timeout (Min)</p>
                                        </div>
                                        <input type="number" defaultValue={30} className="w-20 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-center outline-none" />
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="font-bold text-slate-900 text-sm mb-2">IP Restrictions (Whitelist)</p>
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="Add IP Address" className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none" />
                                        <button className="bg-slate-900 text-white p-2 rounded-lg"><Plus className="w-4 h-4"/></button>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <span className="bg-white border border-slate-200 px-2 py-1 rounded text-[10px] font-bold text-slate-600 flex items-center gap-1">192.168.1.1 <X className="w-2 h-2 cursor-pointer"/></span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Lock className="w-4 h-4 text-orange-600" />
                                    <p className="font-bold text-slate-900 text-sm">RBAC Configuration</p>
                                </div>
                                <p className="text-xs text-slate-600 mb-4">Manage permissions for Super Admin, Finance, Compliance, and Support roles.</p>
                                <button className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">Configure Permissions &rarr;</button>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-4 flex items-center gap-2">
                                <Server className="w-5 h-5 text-orange-600" /> 13.2 Infrastructure Security
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: "Web Application Firewall (WAF)", desc: "Enable advanced layer 7 protection.", active: true },
                                    { label: "DDoS Protection", desc: "Automated traffic scrubbing and rate limiting.", active: true },
                                    { label: "Key Management System (KMS)", desc: "Rotate encryption keys every 90 days.", active: false },
                                    { label: "Backup Encryption", desc: "AES-256 for all cross-region database backups.", active: true },
                                ].map((policy, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{policy.label}</p>
                                            <p className="text-[10px] text-slate-500">{policy.desc}</p>
                                        </div>
                                        <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${policy.active ? 'bg-orange-600' : 'bg-slate-200'}`}>
                                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${policy.active ? 'right-1' : 'left-1'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* FINANCIAL SETTINGS */}
                {activeTab === "financial" && (
                    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <section className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-4">Commission & Fees</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Platform Service Fee (%)</label>
                                    <input type="text" defaultValue="5.0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Exhibitor Commission (%)</label>
                                    <input type="text" defaultValue="2.5" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium" />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-4">Tax Configuration</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-bold">UK</div>
                                        <div>
                                            <p className="font-bold text-sm">VAT (United Kingdom)</p>
                                            <p className="text-xs text-slate-500">Standard rate for exhibition tickets</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-slate-900">20%</span>
                                </div>
                                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:border-orange-200 hover:text-orange-600 transition-all flex items-center justify-center gap-2">
                                    <Plus className="w-4 h-4" /> Add Tax Jurisdiction
                                </button>
                            </div>
                        </section>
                    </div>
                )}

                {/* TEMPLATES & CATEGORIES */}
                {activeTab === "templates" && (
                    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                         <section className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-4">
                                <h3 className="text-lg font-bold text-slate-900">Event Categories</h3>
                                <button className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:underline"><Plus className="w-4 h-4"/> New Category</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Technology', 'Fintech', 'Digital Art', 'Health & Wellness', 'Sustainability', 'Global Trade'].map((cat) => (
                                    <div key={cat} className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-3 group">
                                        <span className="text-sm font-bold text-slate-700">{cat}</span>
                                        <button className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-3 h-3"/></button>
                                    </div>
                                ))}
                            </div>
                        </section>
                        
                        <section className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-4">Ticket Policy Presets</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-orange-200 transition-all cursor-pointer">
                                    <h4 className="font-bold text-slate-900 mb-2">Standard Early Bird</h4>
                                    <p className="text-xs text-slate-500 mb-4">15% discount, limited to first 100 tickets or 14 days before start.</p>
                                    <span className="text-[10px] font-black bg-white px-2 py-1 rounded-full text-slate-400">TEMPLATE ID: T-EB15</span>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-orange-200 transition-all cursor-pointer">
                                    <h4 className="font-bold text-slate-900 mb-2">VIP Bundle</h4>
                                    <p className="text-xs text-slate-500 mb-4">Includes Digital Guide, VIP Lounge access, and Session Recordings.</p>
                                    <span className="text-[10px] font-black bg-white px-2 py-1 rounded-full text-slate-400">TEMPLATE ID: T-VIPB</span>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* PAYMENT GATEWAYS */}
                {activeTab === "gateways" && (
                    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <section className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-4">Connected Gateways</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: "Stripe", status: "Connected", desc: "Primary gateway for cards and bank transfers." },
                                    { name: "PayPal", status: "Disconnected", desc: "Alternative gateway for global reach." }
                                ].map((gw, i) => (
                                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between">
                                        <div className="mb-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-slate-900">{gw.name}</h4>
                                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${gw.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>{gw.status}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 leading-relaxed">{gw.desc}</p>
                                        </div>
                                        <button className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${gw.status === 'Connected' ? 'bg-white text-red-600 border border-red-100 hover:bg-red-50' : 'bg-slate-900 text-white hover:bg-orange-600'}`}>
                                            {gw.status === 'Connected' ? 'Disconnect' : 'Connect'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
}