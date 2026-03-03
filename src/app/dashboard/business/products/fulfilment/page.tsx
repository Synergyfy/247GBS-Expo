"use client";

import { useState, useEffect } from "react";
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
    ArrowUpRight,
    Loader2
} from "lucide-react";
import { api } from "@/lib/api";

export default function FulfilmentPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        pendingShipments: 0,
        pickupReady: 0,
        serviceSlots: "0/0",
        inventoryAlerts: 0
    });
    const [inventory, setInventory] = useState<any[]>([]);
    const [points, setPoints] = useState<any[]>([]);
    const [slots, setSlots] = useState<any[]>([]);
    const [exceptions, setExceptions] = useState<any[]>([]);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [statsData, inventoryData, pointsData, slotsData, exceptionsData] = await Promise.all([
                api.get('/dashboard/business/products/fulfilment/stats'),
                api.get('/dashboard/business/products/fulfilment/inventory'),
                api.get('/dashboard/business/products/fulfilment/points'),
                api.get('/dashboard/business/products/fulfilment/slots'),
                api.get('/dashboard/business/products/fulfilment/exceptions')
            ]);

            setStats(statsData);
            setInventory(inventoryData);
            setPoints(pointsData);
            setSlots(slotsData);
            setExceptions(exceptionsData);
        } catch (error) {
            console.error("Failed to fetch fulfilment data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePoint = async (id: string, currentStatus: boolean) => {
        try {
            await api.patch(`/dashboard/business/products/fulfilment/points/${id}`, { active: !currentStatus });
            setPoints(points.map(p => p.id === id ? { ...p, active: !currentStatus } : p));
        } catch (error) {
            console.error("Failed to toggle point status:", error);
        }
    };

    const resolveException = async (id: string) => {
        try {
            await api.patch(`/dashboard/business/products/fulfilment/exceptions/${id}/resolve`, {});
            setExceptions(exceptions.filter(ex => ex.id !== id));
            setMessage({ type: 'success', text: 'Exception resolved!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error("Failed to resolve exception:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 animate-spin text-orange-600 mb-4" />
                <p className="text-slate-500 font-bold animate-pulse">Loading Logistics Hub...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Product Fulfilment</h1>
                    <p className="text-slate-500 text-lg">Manage bundle inventory, delivery schedules, and pickup points.</p>
                </div>
                <div className="flex items-center gap-4">
                    {message && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {message.text}
                        </div>
                    )}
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                            Export Manifest
                        </button>
                        <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2">
                            <Plus className="w-5 h-5" /> New Fulfilment Rule
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Pending Shipments", val: stats.pendingShipments, icon: Truck, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Pickup Ready", val: stats.pickupReady, icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Service Slots", val: stats.serviceSlots, icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Inventory Alerts", val: stats.inventoryAlerts, icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
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

                        <div className="overflow-x-auto text-balance">
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
                                    {inventory.length === 0 ? (
                                        <tr><td colSpan={4} className="p-12 text-center text-slate-400 italic">No bundles found.</td></tr>
                                    ) : (
                                        inventory.map((item, i) => (
                                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-8 py-5">
                                                    <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                                                </td>
                                                <td className="px-8 py-5 text-sm font-bold text-slate-600">{item.allocated}</td>
                                                <td className="px-8 py-5 text-sm font-bold text-slate-900">{item.stock === -1 ? 'Unlimited' : item.stock}</td>
                                                <td className="px-8 py-5">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.stock !== -1 && item.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                                                        }`}>
                                                        {item.stock !== -1 && item.stock < 10 ? 'Low Stock' : 'Healthy'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
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
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 h-full">
                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-600" /> Service Slots
                                    </h4>
                                    <div className="space-y-4">
                                        {slots.length === 0 ? (
                                            <p className="text-center py-6 text-slate-400 italic text-sm">No slots configured.</p>
                                        ) : (
                                            slots.map((slot, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-slate-500 font-medium">{slot.name} ({new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</span>
                                                        <span className="font-bold text-slate-900">{slot.booked} Booked</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-slate-200 rounded-full">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                                            style={{ width: `${Math.min((slot.booked / slot.capacity) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <button className="w-full mt-6 py-2 border-2 border-dashed border-slate-200 text-slate-400 font-bold text-xs uppercase rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all">
                                        Adjust Slot Capacity
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 h-full">
                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-emerald-600" /> Pickup Locations
                                    </h4>
                                    <div className="space-y-4">
                                        {points.length === 0 ? (
                                            <p className="text-center py-6 text-slate-400 italic text-sm">No pickup points.</p>
                                        ) : (
                                            points.map((loc, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-sm font-bold text-slate-700 block">{loc.name}</span>
                                                        <span className="text-[10px] text-slate-400 uppercase font-black">{loc.location}</span>
                                                    </div>
                                                    <div
                                                        onClick={() => togglePoint(loc.id, loc.active)}
                                                        className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors duration-300 ${loc.active ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                                    >
                                                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 ${loc.active ? 'right-0.5' : 'left-0.5'}`} />
                                                    </div>
                                                </div>
                                            ))
                                        )}
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
                            {exceptions.length === 0 ? (
                                <div className="p-8 text-center bg-white rounded-2xl border border-red-100">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                                    <p className="text-sm font-bold text-slate-900">All clear!</p>
                                    <p className="text-xs text-slate-500">No active logistics exceptions.</p>
                                </div>
                            ) : (
                                exceptions.map((ex, i) => (
                                    <div key={i} className="p-4 bg-white rounded-2xl border border-red-100 shadow-sm space-y-3">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-slate-900">{ex.type === 'OUT_OF_STOCK' ? 'Inventory Alert' : 'Logistics Alert'}</p>
                                            <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded uppercase">Urgent</span>
                                        </div>
                                        <p className="text-xs text-slate-500 leading-relaxed">{ex.message}</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => resolveException(ex.id)}
                                                className="flex-1 py-2 bg-emerald-600 text-white font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-emerald-700 transition-all shadow-sm"
                                            >
                                                Resolve
                                            </button>
                                            <button className="flex-1 py-2 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-orange-600 transition-all shadow-sm">
                                                Notify
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
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
