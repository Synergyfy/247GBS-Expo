"use client";

import { useState } from "react";
import { 
    QrCode, 
    CheckCircle2, 
    XCircle, 
    Search, 
    Users, 
    Smartphone, 
    RefreshCw, 
    AlertCircle,
    ArrowRight,
    User
} from "lucide-react";

export default function VerificationTerminalPage() {
    const [scanMode, setScanMode] = useState(true);
    const [ticketCode, setTicketCode] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [lastScan, setLastScan] = useState<any>(null);

    const handleVerify = () => {
        setVerifying(true);
        // Mock verification delay
        setTimeout(() => {
            setVerifying(false);
            setLastScan({
                status: "Success",
                user: "John Doe",
                ticketType: "VIP NETWORKER",
                id: ticketCode || "GBX-88219-X22",
                timestamp: new Date().toLocaleTimeString()
            });
            setTicketCode("");
        }, 1500);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Verification Terminal</h1>
                    <p className="text-slate-500">Live entry control and ticket validation for active events.</p>
                </div>
                <div className="flex items-center gap-4 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-wider">Systems Online: 4 Scanners Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Scanning Console */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Smartphone className="w-40 h-40" />
                        </div>

                        <div className="relative z-10 max-w-xl mx-auto text-center space-y-8">
                            <div className="flex justify-center">
                                <div className="w-24 h-24 bg-orange-600 rounded-[2rem] flex items-center justify-center shadow-lg shadow-orange-600/20">
                                    <QrCode className="w-12 h-12" />
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="text-3xl font-black mb-2">Ready to Scan</h2>
                                <p className="text-slate-400">Position the ticket QR code in front of the camera or enter the code manually below.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input 
                                            type="text" 
                                            placeholder="Enter Passport ID (e.g. GBX-000...)"
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 text-lg font-mono uppercase tracking-widest"
                                            value={ticketCode}
                                            onChange={(e) => setTicketCode(e.target.value)}
                                        />
                                    </div>
                                    <button 
                                        onClick={handleVerify}
                                        disabled={!ticketCode || verifying}
                                        className="px-8 bg-orange-600 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all disabled:opacity-50"
                                    >
                                        {verifying ? <RefreshCw className="w-6 h-6 animate-spin" /> : "Verify"}
                                    </button>
                                </div>
                                <div className="flex justify-center gap-6">
                                    <button onClick={() => setScanMode(true)} className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition-all ${scanMode ? 'border-orange-500 text-white' : 'border-transparent text-slate-500'}`}>Camera Mode</button>
                                    <button onClick={() => setScanMode(false)} className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition-all ${!scanMode ? 'border-orange-500 text-white' : 'border-transparent text-slate-500'}`}>Manual Entry</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Last Action / Success Feedback */}
                    {lastScan && (
                        <div className={`bg-white rounded-[2.5rem] p-8 border-4 animate-in zoom-in-95 duration-300 ${
                            lastScan.status === 'Success' ? 'border-emerald-500' : 'border-red-500'
                        }`}>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${
                                        lastScan.status === 'Success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                        {lastScan.status === 'Success' ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900">{lastScan.status === 'Success' ? 'Access Granted' : 'Invalid Ticket'}</h3>
                                        <div className="flex gap-4 mt-1">
                                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{lastScan.user}</span>
                                            <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">{lastScan.ticketType}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Passport ID</p>
                                    <p className="text-lg font-mono font-bold text-slate-900">{lastScan.id}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{lastScan.timestamp}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Live Stats & Logs */}
                <div className="space-y-8">
                    {/* Capacity Widget */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-900 uppercase tracking-tight">Zone Occupancy</h3>
                            <Users className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-slate-500">Virtual Hall A</span>
                                    <span className="text-slate-900">842 / 5,000</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 rounded-full w-[16.8%]" />
                                </div>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <p className="text-xs text-orange-700 leading-relaxed font-medium">
                                    <AlertCircle className="w-3 h-3 inline mr-1" />
                                    Crowd velocity is currently **Low**. Expected peak in 2 hours.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Check-ins Log */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-900 uppercase tracking-tight">Live Log</h3>
                            <RefreshCw className="w-4 h-4 text-slate-300" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                                        <User className="w-4 h-4 text-slate-300" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-900">Sarah Johnson Checked-in</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">VIP Pass • 10:42:0{i}</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
