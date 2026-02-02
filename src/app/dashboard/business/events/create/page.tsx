"use client";

import { useState } from "react";
import { 
    Plus, 
    ArrowRight, 
    ArrowLeft, 
    Check, 
    Upload, 
    Calendar, 
    Clock, 
    Ticket, 
    ShoppingBag, 
    Layout, 
    Globe,
    Monitor,
    MapPin,
    Users
} from "lucide-react";
import Link from "next/link";

const WIZARD_STEPS = [
    "Venue Format",
    "Basic Details",
    "Schedule",
    "Ticket Config",
    "Bundled Items",
    "Review"
];

export default function CreateEventWizard() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Form State
    const [format, setFormat] = useState("virtual");
    const [eventDetails, setEventDetails] = useState({ title: "", description: "" });
    const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

    const handleNext = () => setStep(prev => Math.min(prev + 1, WIZARD_STEPS.length - 1));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Wizard Header */}
            <div className="flex items-center justify-between">
                <Link href="/dashboard/business/events" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back to Events
                </Link>
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {step + 1} of {WIZARD_STEPS.length}</p>
                    <h2 className="text-lg font-bold text-slate-900">{WIZARD_STEPS[step]}</h2>
                </div>
            </div>

            {/* Step Progress Bar */}
            <div className="flex gap-2 h-1.5">
                {WIZARD_STEPS.map((_, i) => (
                    <div 
                        key={i} 
                        className={`flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-orange-600' : 'bg-slate-200'}`}
                    />
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 md:p-12">
                    
                    {/* STEP 0: FORMAT */}
                    {step === 0 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center max-w-2xl mx-auto mb-12">
                                <h1 className="text-3xl font-black text-slate-900 mb-4">Choose Event Format</h1>
                                <p className="text-slate-500">Select how your attendees will experience this event.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { id: "virtual", label: "Virtual", desc: "100% Online in Digital Hall", icon: <Monitor className="w-8 h-8" /> },
                                    { id: "physical", label: "Physical", desc: "On-site at a venue", icon: <MapPin className="w-8 h-8" /> },
                                    { id: "hybrid", label: "Hybrid", desc: "Both online and physical", icon: <Globe className="w-8 h-8" /> },
                                ].map((item) => (
                                    <div 
                                        key={item.id}
                                        onClick={() => setFormat(item.id)}
                                        className={`p-8 rounded-3xl border-2 cursor-pointer transition-all ${
                                            format === item.id 
                                                ? "border-orange-600 bg-orange-50 ring-4 ring-orange-50" 
                                                : "border-slate-100 hover:border-orange-200 bg-white"
                                        }`}
                                    >
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                                            format === item.id ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-400"
                                        }`}>
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.label}</h3>
                                        <p className="text-slate-500 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 1: BASIC DETAILS */}
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Event Title</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Annual Tech Symposium"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Description</label>
                                        <textarea 
                                            rows={6}
                                            placeholder="Describe what makes this event unique..."
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-orange-500 transition-all resize-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Event Banner</label>
                                    <div className="border-4 border-dashed border-slate-100 rounded-[2rem] h-64 flex flex-col items-center justify-center text-slate-400 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer group">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white shadow-sm transition-all">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <p className="font-bold">Click to upload banner</p>
                                        <p className="text-xs mt-1">Recommended: 1200x400px (Max 2MB)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: SCHEDULE */}
                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-900">
                                        <Calendar className="w-5 h-5 text-orange-600" /> Date & Time
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Start Date</label>
                                                <input type="date" className="w-full p-3 bg-white border border-slate-200 rounded-xl" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">End Date</label>
                                                <input type="date" className="w-full p-3 bg-white border border-slate-200 rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Start Time</label>
                                                <input type="time" className="w-full p-3 bg-white border border-slate-200 rounded-xl" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">End Time</label>
                                                <input type="time" className="w-full p-3 bg-white border border-slate-200 rounded-xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-900">
                                        <Clock className="w-5 h-5 text-orange-600" /> Session Timetable
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div>
                                                <p className="font-bold text-sm">Opening Keynote</p>
                                                <p className="text-xs text-slate-500">09:00 AM - 10:00 AM</p>
                                            </div>
                                            <button className="text-slate-400 hover:text-red-500 transition-colors">
                                                <Plus className="w-4 h-4 rotate-45" />
                                            </button>
                                        </div>
                                        <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center gap-2">
                                            <Plus className="w-4 h-4" /> Add Session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: TICKETS */}
                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="font-bold text-lg text-slate-900">Select Ticket Templates</h3>
                                    <div className="grid gap-4">
                                        {[
                                            { id: "ga", name: "General Access", icon: <Ticket className="w-5 h-5" /> },
                                            { id: "vip", name: "VIP Experience", icon: <ShieldCheck className="w-5 h-5" /> },
                                            { id: "bundle", name: "Product Bundle", icon: <Plus className="w-5 h-5" /> },
                                        ].map(t => (
                                            <div 
                                                key={t.id} 
                                                onClick={() => setSelectedTickets(prev => prev.includes(t.id) ? prev.filter(x => x !== t.id) : [...prev, t.id])}
                                                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                                                    selectedTickets.includes(t.id) ? "border-orange-600 bg-orange-50" : "border-slate-100"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedTickets.includes(t.id) ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                        {t.icon}
                                                    </div>
                                                    <span className="font-bold text-slate-900">{t.name}</span>
                                                </div>
                                                {selectedTickets.includes(t.id) && <Check className="w-5 h-5 text-orange-600" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 bg-slate-900 rounded-3xl text-white">
                                    <h3 className="font-bold text-lg mb-6 text-orange-400 uppercase tracking-widest">Inventory Control</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Total Capacity</label>
                                            <div className="flex items-center gap-4">
                                                <Users className="w-6 h-6 text-orange-500" />
                                                <input type="number" placeholder="5000" className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 w-full focus:outline-none focus:border-orange-500" />
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <p className="text-xs text-slate-400">The system will automatically stop sales once capacity is reached.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: BUNDLES */}
                    {step === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-12">
                            <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                                <ShoppingBag className="w-12 h-12" />
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 mb-4">Attach Products & Services</h1>
                            <p className="text-slate-500 max-w-lg mx-auto mb-12">
                                Increase ticket value by bundling your existing shop products or services directly with the access pass.
                            </p>
                            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2 mx-auto">
                                <Plus className="w-5 h-5" /> Browse My Products
                            </button>
                        </div>
                    )}

                    {/* STEP 5: REVIEW */}
                    {step === 5 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-12">
                            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                                <Check className="w-12 h-12" />
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 mb-4">Ready for Approval?</h1>
                            <p className="text-slate-500 max-w-lg mx-auto mb-12">
                                Your event will be submitted to the 247GBS Admin for review. Once approved, it will be published to the global marketplace.
                            </p>
                            <div className="max-w-md mx-auto p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left mb-12">
                                <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Summary Preview</h4>
                                <div className="space-y-2 text-sm">
                                    <p className="flex justify-between"><span>Format:</span> <span className="font-bold uppercase">{format}</span></p>
                                    <p className="flex justify-between"><span>Tickets:</span> <span className="font-bold">{selectedTickets.length} Categories</span></p>
                                    <p className="flex justify-between"><span>Capacity:</span> <span className="font-bold">5,000</span></p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Wizard Actions */}
                <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between">
                    <button 
                        onClick={handleBack}
                        disabled={step === 0}
                        className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-900 disabled:opacity-0 transition-all"
                    >
                        Back
                    </button>
                    <button 
                        onClick={step === WIZARD_STEPS.length - 1 ? () => {} : handleNext}
                        className="px-10 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all flex items-center gap-2"
                    >
                        {step === WIZARD_STEPS.length - 1 ? "Submit for Approval" : <>Next Step <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </div>
            </div>
        </div>
    );
}

function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    );
}
