"use client";

import { useState, useEffect } from "react";
import { ScanLine, Users, CheckCircle2, AlertCircle, Smartphone, Loader2, Plus } from "lucide-react";
import { api } from "@/lib/api";
import Modal from "@/app/component/Modal";

export default function BusinessPosPage() {
    const [devices, setDevices] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPairing, setIsPairing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState("");

    const eventId = "default-event-id"; // Should come from context in a real app

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [devicesData, statsData] = await Promise.all([
                api.get(`/dashboard/business/pos/devices?eventId=${eventId}`),
                api.get(`/dashboard/business/pos/attendance?eventId=${eventId}`)
            ]);
            setDevices(devicesData);
            setStats(statsData);
        } catch (err) {
            console.error("Failed to fetch POS data", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePairDevice = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPairing(true);
        setError("");
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const deviceId = formData.get("deviceId") as string;

        try {
            await api.post(`/dashboard/business/pos/pair?eventId=${eventId}`, {
                name,
                deviceId,
                type: "MOBILE",
            });
            await fetchData();
            setIsModalOpen(false);
        } catch (err: any) {
            setError(err.message || "Failed to pair device");
        } finally {
            setIsPairing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">POS Console</h1>
                    <p className="text-slate-500">Manage on-site check-ins, validate tickets, and register staff devices.</p>
                </div>
                <button
                    onClick={fetchData}
                    className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                >
                    <Loader2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Check-in System Setup */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Smartphone className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-6">Device Management</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed"> Register scanners and assign staff roles before the event starts to ensure seamless live verification.</p>

                        <div className="space-y-4 mb-8 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                            {devices.map((device) => (
                                <div key={device.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${device.status === 'ONLINE' ? 'text-emerald-400' : 'text-slate-500'}`} />
                                        <div>
                                            <span className="font-bold text-sm block">{device.name}</span>
                                            <span className="text-[10px] text-slate-500 uppercase">{device.deviceId}</span>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded text-white ${device.status === 'ONLINE' ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                                        {device.status}
                                    </span>
                                </div>
                            ))}
                            {devices.length === 0 && (
                                <div className="text-center py-4 text-slate-500 border-2 border-dashed border-white/5 rounded-2xl">
                                    No devices paired yet
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 flex items-center gap-2"
                        >
                            <ScanLine className="w-4 h-4" /> Pair New Device
                        </button>
                    </div>
                </div>

                {/* Crowd Control */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Real-time Attendance</h3>
                        <div className="space-y-8">
                            {stats && (
                                <>
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stats.occupancy.label}</span>
                                            <span className="text-2xl font-black text-slate-900">{stats.occupancy.scanned} / {stats.occupancy.total}</span>
                                        </div>
                                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${stats.status === 'CRITICAL' ? 'bg-red-500' : stats.status === 'BUSY' ? 'bg-orange-500' : 'bg-emerald-500'}`}
                                                style={{ width: `${stats.occupancy.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`p-4 rounded-2xl border flex items-start gap-3 ${stats.status === 'CRITICAL' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}>
                                        <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${stats.status === 'CRITICAL' ? 'text-red-600' : 'text-blue-600'}`} />
                                        <p className={`text-xs font-medium ${stats.status === 'CRITICAL' ? 'text-red-700' : 'text-blue-700'}`}>
                                            {stats.insight}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pair Device Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Pair New Device">
                <form onSubmit={handlePairDevice} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Device Name</label>
                        <input name="name" type="text" required placeholder="e.g. Front Entrance Tablet" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Unique Device ID</label>
                        <input name="deviceId" type="text" required placeholder="Found in Scanner App settings" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium" />
                    </div>
                    <button
                        type="submit"
                        disabled={isPairing}
                        className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        {isPairing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ScanLine className="w-4 h-4" />}
                        Pair Device
                    </button>
                </form>
            </Modal>
        </div>
    );
}
