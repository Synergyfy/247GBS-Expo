"use client";

import React, { useState } from "react";
import {
    Plus,
    Trash2,
    Save,
    RefreshCw,
    Calendar,
    Type,
    Clock,
    Palette,
    ToggleLeft as Toggle,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TICKER_EVENTS, TickerEvent } from "@/data/ticker";

export default function TickerSetupPage() {
    const [events, setEvents] = useState<TickerEvent[]>(TICKER_EVENTS);
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleUpdate = (id: string, field: keyof TickerEvent, value: any) => {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
    };

    const handleAdd = () => {
        const newEvent: TickerEvent = {
            id: Math.random().toString(36).substr(2, 9),
            season: "NEW SEASON",
            dates: "Dates Here",
            event: "Event Name",
            color: "orange",
            isActive: true
        };
        setEvents([...events, newEvent]);
    };

    const handleDelete = (id: string) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }, 1500);
    };

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase">Banner Ticker Setup</h1>
                    <p className="text-slate-500 font-medium italic">Configure the seasonal events and announcements displayed in the global navigation ticker.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Add Event
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-[2rem] font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {isSaving ? (
                            <RefreshCw className="w-6 h-6 animate-spin" />
                        ) : (
                            <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        )}
                        {isSaving ? "Saving Changes..." : "Deploy to Live"}
                    </button>
                </div>
            </div>

            {/* Main Configuration Grid */}
            <div className="grid gap-6">
                <AnimatePresence>
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                            className={`bg-white rounded-[2.5rem] border-2 p-8 shadow-sm transition-all ${event.isActive ? "border-slate-100" : "border-slate-100 opacity-60 grayscale bg-slate-50/50"
                                }`}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                {/* Status & Index */}
                                <div className="lg:col-span-1 flex flex-col items-center gap-2">
                                    <span className="text-4xl font-black text-slate-200">{index + 1}</span>
                                    <button
                                        onClick={() => handleUpdate(event.id, 'isActive', !event.isActive)}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors ${event.isActive ? "bg-green-500" : "bg-slate-300"}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${event.isActive ? "translate-x-6" : "translate-x-0"}`} />
                                    </button>
                                </div>

                                {/* Inputs */}
                                <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {/* Season Label */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                                            <Calendar className="w-3 h-3 text-orange-600" /> Season / Time
                                        </label>
                                        <input
                                            type="text"
                                            value={event.season}
                                            onChange={(e) => handleUpdate(event.id, 'season', e.target.value.toUpperCase())}
                                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500 outline-none font-bold text-slate-900 transition-all"
                                            placeholder="e.g., SUMMER 2026"
                                        />
                                    </div>

                                    {/* Event Name */}
                                    <div className="space-y-2 lg:col-span-2 xl:col-span-1">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                                            <Type className="w-3 h-3 text-blue-600" /> Event Heading
                                        </label>
                                        <input
                                            type="text"
                                            value={event.event}
                                            onChange={(e) => handleUpdate(event.id, 'event', e.target.value)}
                                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500 outline-none font-bold text-slate-900 transition-all"
                                            placeholder="e.g., Global Brand Launches"
                                        />
                                    </div>

                                    {/* Dates */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                                            <Clock className="w-3 h-3 text-emerald-600" /> Event Dates
                                        </label>
                                        <input
                                            type="text"
                                            value={event.dates}
                                            onChange={(e) => handleUpdate(event.id, 'dates', e.target.value)}
                                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500 outline-none font-bold text-slate-900 transition-all"
                                            placeholder="e.g., July 15-24"
                                        />
                                    </div>

                                    {/* Color Theme */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                                            <Palette className="w-3 h-3 text-purple-600" /> Accent Color
                                        </label>
                                        <select
                                            value={event.color}
                                            onChange={(e) => handleUpdate(event.id, 'color', e.target.value)}
                                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500 outline-none font-bold text-slate-900 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="orange">Orange</option>
                                            <option value="emerald">Emerald</option>
                                            <option value="blue">Blue</option>
                                            <option value="amber">Amber</option>
                                            <option value="cyan">Cyan</option>
                                            <option value="purple">Purple</option>
                                            <option value="rose">Rose</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="lg:col-span-1 flex justify-center">
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="p-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                        title="Remove Ticker Item"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Live Preview (Simulated) */}
            <div className="mt-12 bg-slate-900 rounded-[3rem] p-10 overflow-hidden relative border border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <RefreshCw className="w-32 h-32" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <Eye className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Live Preview</h3>
                            <p className="text-slate-400 text-sm font-medium">How the ticker appears to visitors.</p>
                        </div>
                    </div>

                    <div className="flex-1 max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md overflow-hidden">
                        <div className="flex items-center gap-12 animate-scroll whitespace-nowrap">
                            {events.filter(e => e.isActive).map((e, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="font-black text-xs text-white uppercase tracking-tighter">{e.season}</span>
                                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                        <span className="text-[10px] font-black text-orange-500">{e.dates}</span>
                                        <div className="w-1 h-1 bg-white/10 rounded-full" />
                                        <span className="text-[10px] font-bold text-white/40">{e.event}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-scroll {
                        animation: scroll 20s linear infinite;
                        width: max-content;
                    }
                `}</style>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-3 border border-white/10"
                    >
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <span className="font-bold">Ticker Configuration Deployed Successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {events.length === 0 && (
                <div className="text-center py-40">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No Ticker Items</h3>
                    <p className="text-slate-500 font-medium mb-8">Add your first seasonal event to get started.</p>
                    <button
                        onClick={handleAdd}
                        className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold shadow-xl shadow-orange-600/30 hover:bg-orange-700 transition-all"
                    >
                        Create Item
                    </button>
                </div>
            )}
        </div>
    );
}

function Eye({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
