"use client";

import React, { useState, useCallback } from "react";
import {
    QrCode,
    CheckCircle2,
    XCircle,
    Users,
    Ticket,
    ShieldCheck,
    Search,
    Camera,
    Sparkles,
    Copy,
    Check,
    ArrowRight,
    MapPin,
    Calendar,
    Award,
} from "lucide-react";
import QRScannerModal from "@/app/component/QRScannerModal";

interface VerifiedPassDetails {
    valid: boolean;
    code: string;
    holder: string;
    role: string;
    tier: string;
    event: string;
    gate: string;
    seat?: string;
    message: string;
    perks: string[];
    verificationId: string;
    verifiedAt: string;
}

// Master pass registry simulating Central Hub and Expo verified pass database
const KNOWN_PASS_REGISTRY: Record<string, Omit<VerifiedPassDetails, "verificationId" | "verifiedAt">> = {
    "PASS-2026-8841": {
        valid: true,
        code: "PASS-2026-8841",
        holder: "Dr. Hannah Abbott",
        role: "Keynote Speaker & Executive",
        tier: "VIP Executive Pass",
        event: "Global Tech & AI Innovation Expo",
        gate: "Gate 1 — VIP Fast Track",
        seat: "Executive Zone A • Row 1",
        message: "VIP clearance verified. Keynote and lounge privileges unlocked.",
        perks: [
            "Waives £75 Season Entry Fee",
            "VIP Networking Lounge Access",
            "Priority Consultation Queue",
            "Complimentary Keynote Recording",
        ],
    },
    "PASS-2026-7719": {
        valid: true,
        code: "PASS-2026-7719",
        holder: "Sophia Martinez",
        role: "MCOM Loyalty Member",
        tier: "MCOM Reward Gift Pass",
        event: "Global Tech & AI Innovation Expo",
        gate: "Gate 2 — General & Partner Access",
        seat: "General Admission",
        message: "Complimentary loyalty pass confirmed. Eligible for booth sponsor drop.",
        perks: [
            "100 MCOM Reward Points Bonus",
            "Complimentary Booth Gift Bag",
            "Digital Voucher Unlocked",
            "0% Platform Fee Entry",
        ],
    },
    "PASS-2026-5530": {
        valid: true,
        code: "PASS-2026-5530",
        holder: "Liam Gallagher",
        role: "Registered Trade Attendee",
        tier: "Standard Season Day Pass",
        event: "Global Tech & AI Innovation Expo",
        gate: "Gate 3 — North Concourse",
        seat: "General Admission",
        message: "Standard Day Pass valid for exhibition hall and demo stages.",
        perks: [
            "Full Exhibition Hall Access",
            "Live Stage Broadcast View",
            "Directory Listing Search",
        ],
    },
    "GBX-88219-X22": {
        valid: true,
        code: "GBX-88219-X22",
        holder: "Alex Rivera",
        role: "All-Season Ticket Holder",
        tier: "Annual All-Access Pass",
        event: "Global Innovation Fair (Spring 2026)",
        gate: "All Gates — VIP Fast Track",
        seat: "Universal All-Access",
        message: "Annual All-Access Pass verified. Valid across all 4 seasons in 2026.",
        perks: [
            "4 Seasons Entry Guaranteed",
            "Waives £75 Season Entry Fee",
            "VIP Networking Lounge",
            "100 MCOM Reward Pts",
        ],
    },
    "WRK-99402-A12": {
        valid: true,
        code: "WRK-99402-A12",
        holder: "Marcus Vance",
        role: "Executive Workshop Attendee",
        tier: "Executive Workshop Pass",
        event: "AI Workshop: Future of Retail",
        gate: "Workshop Room A",
        seat: "Workshop Desk 14",
        message: "Workshop seat reservation confirmed. Interactive Q&A enabled.",
        perks: [
            "Live Interactive Q&A Access",
            "Full Session Recording Access",
            "Speaker Slidedeck Download",
        ],
    },
    "PASS-2026-1029": {
        valid: false,
        code: "PASS-2026-1029",
        holder: "Unknown Visitor",
        role: "Unverified Attendee",
        tier: "Expired Single Day Pass",
        event: "Winter Retail Showcase 2025",
        gate: "Rejected at Gate B",
        message: "Pass expired on Dec 14, 2025. Not valid for current season.",
        perks: [],
    },
};

export default function TicketVerificationPage() {
    const [passCode, setPassCode] = useState("");
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);
    const [scanResult, setScanResult] = useState<VerifiedPassDetails | null>(null);

    // Dynamic KPI stats
    const [stats, setStats] = useState({
        totalCheckedIn: 289,
        vipPasses: 37,
        mcomPasses: 65,
        rejectedScans: 4,
    });

    const [scanHistory, setScanHistory] = useState([
        {
            code: "PASS-2026-8841",
            holder: "Dr. Hannah Abbott",
            tier: "VIP Executive Pass",
            event: "Global Tech & AI Innovation Expo",
            status: "Verified",
            time: "4 mins ago",
        },
        {
            code: "PASS-2026-7719",
            holder: "Sophia Martinez",
            tier: "MCOM Reward Gift Pass",
            event: "Global Tech & AI Innovation Expo",
            status: "Verified",
            time: "18 mins ago",
        },
        {
            code: "PASS-2026-1029",
            holder: "Unknown Visitor",
            tier: "Expired Single Day Pass",
            event: "Winter Retail Showcase",
            status: "Rejected",
            time: "42 mins ago",
        },
        {
            code: "PASS-2026-5530",
            holder: "Liam Gallagher",
            tier: "Standard Season Day Pass",
            event: "Global Tech & AI Innovation Expo",
            status: "Verified",
            time: "1h ago",
        },
    ]);

    const executeVerification = useCallback((rawCode: string) => {
        const clean = rawCode.trim().toUpperCase();
        if (!clean) return;

        const isKnownInvalid = clean.includes("INVALID") || clean.includes("EXP") || clean.includes("REJ");
        const matched = KNOWN_PASS_REGISTRY[clean];

        const verificationToken = `VER-${Math.floor(100000 + Math.random() * 900000)}`;
        const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        let result: VerifiedPassDetails;

        if (matched) {
            result = {
                ...matched,
                verificationId: verificationToken,
                verifiedAt: timestamp,
            };
        } else if (isKnownInvalid) {
            result = {
                valid: false,
                code: clean,
                holder: "Unverified Visitor",
                role: "Unregistered Guest",
                tier: "Expired / Invalid Pass",
                event: "Global Tech & AI Innovation Expo",
                gate: "Gate Entry Denied",
                message: "Pass rejected — duplicate, cancelled or expired.",
                perks: [],
                verificationId: verificationToken,
                verifiedAt: timestamp,
            };
        } else {
            // Standard verified pass for arbitrary valid codes
            result = {
                valid: true,
                code: clean,
                holder: "Verified Expo Attendee",
                role: "Registered Business Guest",
                tier: "General Access Pass",
                event: "Global Tech & AI Innovation Expo (Spring 2026)",
                gate: "Gate 2 — Standard Entrance",
                seat: "General Admission",
                message: "Access granted — Pass authenticated with Central Hub Solutions.",
                perks: ["General Exhibition Hall Access", "Live Booth Demonstrations"],
                verificationId: verificationToken,
                verifiedAt: timestamp,
            };
        }

        setScanResult(result);
        setPassCode(clean);

        // Update statistics
        setStats((prev) => ({
            ...prev,
            totalCheckedIn: result.valid ? prev.totalCheckedIn + 1 : prev.totalCheckedIn,
            vipPasses: result.valid && result.tier.includes("VIP") ? prev.vipPasses + 1 : prev.vipPasses,
            mcomPasses: result.valid && result.tier.includes("MCOM") ? prev.mcomPasses + 1 : prev.mcomPasses,
            rejectedScans: !result.valid ? prev.rejectedScans + 1 : prev.rejectedScans,
        }));

        // Prepend to scan history
        setScanHistory((prev) => [
            {
                code: result.code,
                holder: result.holder,
                tier: result.tier,
                event: result.event,
                status: result.valid ? "Verified" : "Rejected",
                time: "Just now",
            },
            ...prev,
        ]);
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeVerification(passCode);
    };

    const handleCopyCode = (code: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code);
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 1500);
        }
    };

    return (
        <div className="space-y-4 sm:space-y-5 pb-12">
            {/* Header */}
            <div className="pb-2.5 sm:pb-3 border-b border-slate-200/80">
                <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                    Ticket & Access Pass Verification
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    Validate visitor QR codes, Season Passes, and MCOM Reward tickets at your booth or session gate.
                </p>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Total Checked In", value: stats.totalCheckedIn.toString(), sub: "Today's active session", icon: CheckCircle2, color: "text-emerald-600" },
                        { label: "VIP Passes", value: stats.vipPasses.toString(), sub: "Priority consultation", icon: ShieldCheck, color: "text-orange-600" },
                        { label: "MCOM Reward Passes", value: stats.mcomPasses.toString(), sub: "Loyalty & gift passes", icon: Ticket, color: "text-purple-600" },
                        { label: "Rejected Scans", value: stats.rejectedScans.toString(), sub: "Duplicate or expired", icon: XCircle, color: "text-red-600" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="w-[44%] min-w-[136px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs"
                        >
                            <div className="flex items-center justify-between gap-1.5 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                                    {stat.label}
                                </span>
                                <stat.icon className={`w-3.5 h-3.5 shrink-0 ${stat.color}`} />
                            </div>
                            <p className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                {stat.value}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">{stat.sub}</p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-1 lg:hidden">
                    <span className="w-4 h-1 rounded-full bg-orange-600" />
                    <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                </div>
            </div>

            {/* Instant Pass Verification & QR Scanner Launcher */}
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2.5 sm:space-y-3">
                {/* Single Compact Header Row */}
                <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 truncate">
                        <QrCode className="w-4 h-4 text-orange-600 shrink-0" />
                        <span className="truncate">Instant Pass Verification</span>
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Scanner Ready
                    </span>
                </div>

                {/* Mobile Full-Width Primary Scanner Trigger */}
                <div className="block sm:hidden">
                    <button
                        type="button"
                        onClick={() => setIsScannerOpen(true)}
                        className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                    >
                        <Camera className="w-4 h-4 text-orange-400" />
                        <span>Scan QR with Camera</span>
                    </button>
                </div>

                {/* Input Form with Compact Inline Action */}
                <form onSubmit={handleFormSubmit} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={passCode}
                            onChange={(e) => setPassCode(e.target.value)}
                            placeholder="Scan QR or enter pass ID (e.g. PASS-2026-8841)..."
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 font-mono font-medium"
                        />
                    </div>
                    {/* Desktop Camera Trigger */}
                    <button
                        type="button"
                        onClick={() => setIsScannerOpen(true)}
                        className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                    >
                        <Camera className="w-3.5 h-3.5 text-orange-400" />
                        <span>Scan QR</span>
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700 transition-colors shrink-0 cursor-pointer"
                    >
                        Verify
                    </button>
                </form>

                {/* Quick Pass Presets — Horizontal Scroll Snap */}
                <div className="pt-0.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-orange-500" />
                        Quick Test:
                    </span>
                    {/* Preset Pass Selector Chips */}
                    {[
                        { code: "PASS-2026-8841", label: "VIP Pass" },
                        { code: "PASS-2026-7719", label: "MCOM Reward" },
                        { code: "PASS-2026-5530", label: "Standard Day" },
                        { code: "GBX-88219-X22", label: "Season Pass" },
                        { code: "PASS-2026-1029", label: "Expired Pass" },
                    ].map((sample) => (
                        <button
                            key={sample.code}
                            type="button"
                            onClick={() => executeVerification(sample.code)}
                            className="shrink-0 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                        >
                            {sample.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Standalone Pass Details & Verification Result Card (Un-nested to eliminate double container effect) */}
            {scanResult && (
                <div
                    className={`rounded-xl border p-3.5 sm:p-5 transition-all animate-in fade-in slide-in-from-top-2 duration-200 shadow-xs ${
                        scanResult.valid
                            ? "bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 border-emerald-200"
                            : "bg-gradient-to-br from-red-50/70 via-white to-slate-50 border-red-200"
                    }`}
                >
                        {/* Clean Header: Full-Width Attendee Name & Pass Code Row */}
                        <div className="pb-2.5 border-b border-slate-200/80 space-y-1.5">
                            {/* Row 1: Full-Width Attendee Name with Green Pulse Badge */}
                            <div className="flex items-center gap-2 w-full">
                                <div
                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                        scanResult.valid ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
                                    }`}
                                >
                                    {scanResult.valid ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                        <XCircle className="w-4 h-4" />
                                    )}
                                </div>
                                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                                    {scanResult.holder}
                                </h3>
                                {scanResult.valid ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0 ml-auto">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>Valid</span>
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 shrink-0 ml-auto">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        <span>Invalid</span>
                                    </span>
                                )}
                            </div>

                            {/* Row 2: Pass Code */}
                            <div className="flex items-center justify-between text-xs pt-0.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    Pass Code
                                </span>
                                <div className="font-mono text-[11px] sm:text-xs font-bold text-slate-900 bg-white/90 border border-slate-200 px-2 py-0.5 rounded flex items-center gap-1.5 shadow-2xs">
                                    <span>{scanResult.code}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleCopyCode(scanResult.code)}
                                        className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                                        title="Copy Pass Code"
                                    >
                                        {copiedCode ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Pass Metadata: 100% Width Each (Stacked for Full Readability Without Truncation) */}
                        <div className="py-2.5 space-y-2.5 text-xs border-b border-slate-200/80 divide-y divide-slate-100">
                            {/* Pass Tier (100% Width) */}
                            <div className="w-full space-y-0.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                    Pass Tier
                                </span>
                                <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                    {scanResult.tier}
                                </p>
                                <p className="text-[11px] text-slate-500 font-medium">{scanResult.role}</p>
                            </div>

                            {/* Gate Location (100% Width) */}
                            <div className="w-full space-y-0.5 pt-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-slate-400" /> Gate Location
                                </span>
                                <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                    {scanResult.gate}
                                </p>
                                {scanResult.seat && (
                                    <p className="text-[11px] text-slate-500 font-medium">{scanResult.seat}</p>
                                )}
                            </div>

                            {/* Event & Session (100% Width) */}
                            <div className="w-full space-y-0.5 pt-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-slate-400" /> Event & Session
                                </span>
                                <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                    {scanResult.event}
                                </p>
                                <p className="text-[10px] font-mono text-slate-500">
                                    Token: {scanResult.verificationId} • {scanResult.verifiedAt}
                                </p>
                            </div>
                        </div>

                        {/* Entitlements & Perks (Compact 2-col Grid on Mobile) */}
                        {scanResult.perks.length > 0 && (
                            <div className="py-2.5 space-y-1.5 border-b border-slate-200/80">
                                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                    <Award className="w-3 h-3 text-orange-500" /> Authorized Attendee Perks
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5">
                                    {scanResult.perks.map((perk, idx) => (
                                        <div
                                            key={idx}
                                            className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs"
                                        >
                                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                            <span className="truncate">{perk}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Footer: Note & Dismiss Button */}
                        <div className="pt-2.5 flex items-center justify-between gap-2.5">
                            <p className="text-[10px] sm:text-[11px] text-slate-500 italic leading-snug">
                                {scanResult.message}
                            </p>
                            <button
                                type="button"
                                onClick={() => setScanResult(null)}
                                className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                )}

            {/* Clean 3-Line Scan Log */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Recent Check-In Log
                    </h2>
                    <span className="text-[11px] font-bold text-slate-400">{scanHistory.length} scans</span>
                </div>

                {scanHistory.map((item, idx) => (
                    <div key={idx} className="p-3 sm:p-4 hover:bg-slate-50/70 transition-colors space-y-1">
                        {/* Line 1 */}
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 truncate">
                                <span className="text-slate-900 font-extrabold">{item.code}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-orange-600 truncate">{item.tier}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-400 shrink-0">{item.time}</span>
                            </div>
                            <span
                                className={`shrink-0 font-bold ${
                                    item.status === "Verified" ? "text-emerald-600" : "text-red-600"
                                }`}
                            >
                                {item.status}
                            </span>
                        </div>

                        {/* Line 2 */}
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.holder}</p>

                        {/* Line 3 */}
                        <p className="text-[11px] text-slate-500 truncate">{item.event}</p>
                    </div>
                ))}
            </div>

            {/* Interactive QR Scanner Modal */}
            <QRScannerModal
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={(detectedCode) => executeVerification(detectedCode)}
            />
        </div>
    );
}
