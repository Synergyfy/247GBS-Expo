"use client";

import { useState } from "react";
import { 
    Package, 
    Truck, 
    MapPin, 
    Calendar, 
    Clock, 
    ChevronRight, 
    Plus, 
    Filter, 
    Search,
    AlertCircle,
    CheckCircle2,
    Settings2,
    ArrowUpRight
} from "lucide-react";

export default function FulfilmentPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Product Fulfilment</h1>
                    <p className="text-slate-500 text-lg">Manage bundle inventory, delivery schedules, and pickup points.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                        Export Manifest
                    </button>
                    <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" /> New Fulfilment Rule
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Pending Shipments", val: "24", icon: Truck, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Pickup Ready", val: "15", icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Service Slots", val: "8/20", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Inventory Alerts", val: "2", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 10.1 Bundle Management (Inventory & Delivery) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
                            <h3 className="font-bold text-xl text-slate-900 uppercase tracking-tight flex items-center gap-2">
                                <Package className="text-orange-600 w-5 h-5" /> Bundle Inventory
                            </h3>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" placeholder="Search bundles..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bundle Item</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Allocated</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">In Stock</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { name: "Premium Gift Set (VIP)", allocated: 120, stock: 42, status: "Low Stock" },
                                        { name: "Standard Goodie Bag", allocated: 500, stock: 450, status: "Healthy" },
                                        { name: "Exhibition Digital Pass", allocated: 1200, stock: "Unlimited", status: "Active" },
                                    ].map((item, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-8 py-5">
                                                <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-bold text-slate-600">{item.allocated}</td>
                                            <td className="px-8 py-5 text-sm font-bold text-slate-900">{item.stock}</td>
                                            <td className="px-8 py-5">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                    item.status === 'Low Stock' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 10.1 Delivery & Pickup Schedules */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12">
                        <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-2">
                            <Truck className="text-orange-600 w-5 h-5" /> Logistics Control
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-600" /> Service Slots
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500 font-medium">Morning (09:00 - 12:00)</span>
                                            <span className="font-bold text-slate-900">12 Booked</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 rounded-full">
                                            <div className="h-full bg-blue-500 rounded-full w-[60%]" />
                                        </div>
                                        <div className="flex justify-between items-center text-sm pt-2">
                                            <span className="text-slate-500 font-medium">Afternoon (13:00 - 17:00)</span>
                                            <span className="font-bold text-slate-900">18 Booked</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 rounded-full">
                                            <div className="h-full bg-blue-500 rounded-full w-[90%]" />
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-2 border-2 border-dashed border-slate-200 text-slate-400 font-bold text-xs uppercase rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all">
                                        Adjust Slot Capacity
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-emerald-600" /> Pickup Locations
                                    </h4>
                                    <div className="space-y-4">
                                        {[
                                            { name: "Main Hall Information Desk", active: true },
                                            { name: "South Gate Kiosk B", active: true },
                                            { name: "VIP Lounge Redemption", active: false },
                                        ].map((loc, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-slate-700">{loc.name}</span>
                                                <div className={`w-8 h-4 rounded-full relative cursor-pointer ${loc.active ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${loc.active ? 'right-0.5' : 'left-0.5'}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-6 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs uppercase rounded-xl hover:bg-slate-50 transition-all">
                                        Manage Locations
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exception Handling Sidebar (10.3) */}
                <div className="space-y-8">
                    <div className="bg-red-50 rounded-[2.5rem] border border-red-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-red-900 uppercase tracking-tight">Active Exceptions</h3>
                        </div>
                        
                        <div className="space-y-4">
                            {[
                                { title: "Out-of-stock Trigger", desc: "Premium Gift Set is < 10% remaining.", action: "Switch to Substitution" },
                                { title: "Pickup Delay", desc: "Heavy traffic at Main Hall Desk.", action: "Notify Customers" },
                            ].map((ex, i) => (
                                <div key={i} className="p-4 bg-white rounded-2xl border border-red-100 shadow-sm space-y-3">
                                    <p className="text-sm font-bold text-slate-900">{ex.title}</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">{ex.desc}</p>
                                    <button className="w-full py-2 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-red-700 transition-all">
                                        {ex.action}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Settings2 className="w-32 h-32" />
                        </div>
                        <h3 className="text-xl font-bold mb-6 relative z-10">Fulfilment Automation</h3>
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between py-2 border-b border-white/10">
                                <span className="text-sm font-medium text-slate-400">Auto-Substitution</span>
                                <div className="w-10 h-5 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-white/10">
                                <span className="text-sm font-medium text-slate-400">Delay Notifications</span>
                                <div className="w-10 h-5 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-white/10">
                                <span className="text-sm font-medium text-slate-400">Auto-Refund Trigger</span>
                                <div className="w-10 h-5 bg-slate-600 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                            </div>
                        </div>
                        <button className="w-full py-4 mt-8 bg-white/10 hover:bg-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/10">
                            Advanced Logic Rules
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
