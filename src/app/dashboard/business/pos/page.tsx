"use client";

import { ScanLine, Users, CheckCircle2, AlertCircle, Smartphone } from "lucide-react";

export default function BusinessPosPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">POS Console</h1>
                <p className="text-slate-500">Manage on-site check-ins, validate tickets, and register staff devices.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Check-in System Setup (Section 9.1) */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Smartphone className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-6">Device Management</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed"> Register scanners and assign staff roles before the event starts to ensure seamless live verification.</p>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    <span className="font-bold text-sm">Main Hall Scanner A</span>
                                </div>
                                <span className="text-[10px] font-black uppercase bg-emerald-500 px-2 py-0.5 rounded text-white">Online</span>
                            </div>
                        </div>
                        <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-700 transition-all flex items-center gap-2">
                            <ScanLine className="w-4 h-4" /> Pair New Device
                        </button>
                    </div>
                </div>

                {/* Crowd Control (Section 9.3) */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Real-time Attendance</h3>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Main Zone Occupancy</span>
                                    <span className="text-2xl font-black text-slate-900">842 / 2,000</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '42%' }} />
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-blue-700 font-medium">Flow is currently stable. Peak expected at 02:00 PM during the AI Keynote.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
