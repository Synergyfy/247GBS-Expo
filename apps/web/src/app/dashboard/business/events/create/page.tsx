"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    Ticket,
    ShieldCheck,
    Check,
    CheckCircle2,
    AlertCircle,
    Sparkles,
    Users,
    UserPlus,
    X,
    Building2,
    Search,
    Globe,
    MapPin,
    Video,
    Clock,
    Info,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import Tooltip from "@/app/component/Tooltip";
import {
    GlobalTicketTemplate,
    DEFAULT_TICKET_TEMPLATES,
    getStoredTicketTemplates
} from "@/data/ticketTemplates";

interface InvitedPartner {
    id: string;
    name: string;
    category: string;
    role: string;
    status: "Pending Acceptance" | "Accepted";
}

const AVAILABLE_PARTNERS = [
    { id: "p1", name: "Apex Logistics UK", category: "Supply Chain & Fulfillment" },
    { id: "p2", name: "Beauty Bar UK", category: "Retail & Cosmetics" },
    { id: "p3", name: "EcoTech Clean Solutions", category: "Sustainability & CleanTech" },
    { id: "p4", name: "Skyline Media Group", category: "Digital Marketing & PR" },
    { id: "p5", name: "HealthHub Innovations", category: "Wellness & MedTech" },
];

export default function CreateEventPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState("");
    const [format, setFormat] = useState<"virtual" | "physical" | "hybrid">("virtual");
    const [isFormatOpen, setIsFormatOpen] = useState(true);
    const [eventDate, setEventDate] = useState("2026-04-18");
    const [startTime, setStartTime] = useState("10:00");
    const [endTime, setEndTime] = useState("12:00");
    const [virtualLink, setVirtualLink] = useState("https://meet.google.com/abc-defg-hij");
    const [physicalVenue, setPhysicalVenue] = useState("ExCeL London, Hall 4, Royal Victoria Dock");
    const [physicalSpaces, setPhysicalSpaces] = useState("150");
    const [capacity, setCapacity] = useState("300");
    const [selectedTemplateId, setSelectedTemplateId] = useState("tpl-general");
    const [ticketPrice, setTicketPrice] = useState<number>(25);
    const [rewardQuota, setRewardQuota] = useState("50");
    const [submitted, setSubmitted] = useState(false);

    // Business Partnership Workflow (Storyline §4.4)
    const [partnerSearch, setPartnerSearch] = useState("");
    const [selectedPartnerId, setSelectedPartnerId] = useState(AVAILABLE_PARTNERS[0].id);
    const [partnerRole, setPartnerRole] = useState("Co-Host");
    const [invitedPartners, setInvitedPartners] = useState<InvitedPartner[]>([
        {
            id: "p1",
            name: "Apex Logistics UK",
            category: "Supply Chain & Fulfillment",
            role: "Co-Host & Logistics Sponsor",
            status: "Pending Acceptance"
        }
    ]);

    const handleAddPartner = () => {
        const p = AVAILABLE_PARTNERS.find((item) => item.id === selectedPartnerId);
        if (!p) return;
        if (invitedPartners.some((item) => item.id === p.id)) return;
        setInvitedPartners([
            ...invitedPartners,
            {
                id: p.id,
                name: p.name,
                category: p.category,
                role: partnerRole,
                status: "Pending Acceptance"
            }
        ]);
    };

    const [ticketTemplates, setTicketTemplates] = useState<GlobalTicketTemplate[]>(DEFAULT_TICKET_TEMPLATES);

    useEffect(() => {
        const list = getStoredTicketTemplates();
        setTicketTemplates(list);
        if (list.length > 0 && !list.some((t) => t.id === selectedTemplateId)) {
            setSelectedTemplateId(list[0].id);
            setTicketPrice(list[0].defaultPrice ?? (list[0].isGiftOnly || list[0].maxPrice === 0 ? 0 : Math.round((list[0].minPrice + list[0].maxPrice) / 2)));
        }

        const handleSync = (e: any) => {
            const updated = e?.detail && Array.isArray(e.detail) ? e.detail : getStoredTicketTemplates();
            setTicketTemplates(updated);
        };

        window.addEventListener("ticket_templates_changed", handleSync);
        window.addEventListener("storage", handleSync);
        return () => {
            window.removeEventListener("ticket_templates_changed", handleSync);
            window.removeEventListener("storage", handleSync);
        };
    }, []);

    const handleRemovePartner = (id: string) => {
        setInvitedPartners(invitedPartners.filter((p) => p.id !== id));
    };

    const activeTemplate =
        ticketTemplates.find((t) => t.id === selectedTemplateId) ||
        ticketTemplates[0] ||
        DEFAULT_TICKET_TEMPLATES[0];

    const isPriceValid =
        ticketPrice >= activeTemplate.minPrice && ticketPrice <= activeTemplate.maxPrice;

    const handleTemplateSelect = (tplId: string) => {
        const tpl = ticketTemplates.find((t) => t.id === tplId);
        setSelectedTemplateId(tplId);
        if (tpl) {
            if (tpl.isGiftOnly || tpl.maxPrice === 0) {
                setTicketPrice(0);
            } else {
                const def = tpl.defaultPrice ?? Math.round((tpl.minPrice + tpl.maxPrice) / 2);
                setTicketPrice(def);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPriceValid) return;
        setSubmitted(true);
        setTimeout(() => {
            router.push("/dashboard/business/events");
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-2.5 sm:space-y-4 pb-10">
            {/* Compact Header */}
            <div className="pb-2 sm:pb-2.5 border-b border-slate-200/80">
                <Link
                    href="/dashboard/business/events"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-orange-600 uppercase tracking-wider mb-0.5 transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" /> Back to My Events
                </Link>
                <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase leading-snug">
                    Create Event
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    Configure your event details, schedule, and ticket template for Expo visitors.
                </p>
            </div>

            {/* Streamlined Timeline Stepper */}
            <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-2xs">
                <div className="flex items-center justify-between relative max-w-lg mx-auto">
                    {/* Timeline Connector Track & Fill (Contained within track bounds) */}
                    <div className="absolute left-4 right-4 top-3.5 sm:top-4 -translate-y-1/2 h-0.5 bg-slate-200 z-0 overflow-hidden">
                        <div
                            className="h-full bg-orange-600 transition-all duration-300"
                            style={{ width: `${((step - 1) / 3) * 100}%` }}
                        />
                    </div>

                    {[
                        { num: 1, title: "Schedule" },
                        { num: 2, title: "Partners" },
                        { num: 3, title: "Tickets" },
                        { num: 4, title: "Review" },
                    ].map((s) => {
                        const isCompleted = step > s.num;
                        const isCurrent = step === s.num;

                        return (
                            <button
                                key={s.num}
                                type="button"
                                onClick={() => setStep(s.num)}
                                className="relative z-10 flex flex-col items-center group cursor-pointer"
                            >
                                <div
                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[11px] sm:text-xs transition-all ${
                                        isCurrent
                                            ? "bg-orange-600 text-white ring-3 ring-orange-100 shadow-sm"
                                            : isCompleted
                                            ? "bg-orange-600 text-white shadow-2xs"
                                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                                    }`}
                                >
                                    {isCompleted ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" /> : s.num}
                                </div>
                                <span
                                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 transition-colors hidden sm:block ${
                                        isCurrent
                                            ? "text-orange-600 font-extrabold"
                                            : isCompleted
                                            ? "text-slate-900 font-bold"
                                            : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                                >
                                    {s.title}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase">
                        Event Submitted to Admin Approval Queue
                    </h2>
                    <p className="text-xs text-slate-600">
                        Your event &quot;{title || "New Booth Showcase"}&quot; uses the{" "}
                        <strong>{activeTemplate.name}</strong> (£{ticketPrice}) and is compliant with Season Pass caps.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-3.5 sm:p-5 space-y-3.5 sm:space-y-4">
                    {step === 1 && (
                        <div className="space-y-3.5 sm:space-y-4">
                            <div className="pb-2 sm:pb-2.5 border-b border-slate-100">
                                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-orange-600" /> Event Schedule & Format
                                </h2>
                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                    Choose attendance format (virtual, physical, or hybrid), schedule times, and capacity.
                                </p>
                            </div>

                            {/* Attendance Format Selection (Flat on form surface, zero double container) */}
                            <div className="space-y-2">
                                <div
                                    onClick={() => setIsFormatOpen(!isFormatOpen)}
                                    className="flex items-center justify-between cursor-pointer select-none group"
                                >
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                            Attendance Format
                                        </span>
                                        <Tooltip content="Choose virtual stream, in-person venue, or hybrid format.">
                                            <Info className="w-3 h-3 text-slate-400 group-hover:text-slate-600 shrink-0" />
                                        </Tooltip>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        {!isFormatOpen && (
                                            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200/80 px-2 py-0.5 rounded-md whitespace-nowrap">
                                                {format === "virtual" && "Virtual"}
                                                {format === "physical" && "Physical"}
                                                {format === "hybrid" && "Hybrid"}
                                            </span>
                                        )}
                                        <div className="w-5 h-5 rounded flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
                                            {isFormatOpen ? (
                                                <ChevronUp className="w-3.5 h-3.5" />
                                            ) : (
                                                <ChevronDown className="w-3.5 h-3.5" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {isFormatOpen && (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
                                        {[
                                            {
                                                id: "virtual" as const,
                                                label: "Virtual Event",
                                                sub: "Google Meet / Livestream",
                                                icon: Video,
                                            },
                                            {
                                                id: "physical" as const,
                                                label: "Physical Venue",
                                                sub: "In-Person Stage or Booth",
                                                icon: MapPin,
                                            },
                                            {
                                                id: "hybrid" as const,
                                                label: "Hybrid Event",
                                                sub: "Venue + Online Stream",
                                                icon: Globe,
                                            },
                                        ].map((f) => {
                                            const isSelected = format === f.id;
                                            const Icon = f.icon;
                                            return (
                                                <button
                                                    key={f.id}
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFormat(f.id);
                                                    }}
                                                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center sm:flex-col sm:items-start gap-2 ${
                                                        isSelected
                                                            ? "border-orange-500 bg-orange-50/50 shadow-2xs font-extrabold"
                                                            : "border-slate-200 hover:border-slate-300 bg-white"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                                                            isSelected ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-500"
                                                        }`}
                                                    >
                                                        <Icon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-xs font-extrabold text-slate-900 leading-tight">
                                                            {f.label}
                                                        </div>
                                                        <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                                                            {f.sub}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                    <span>Event / Session Title</span>
                                    <Tooltip content="The public headline shown across event listings and attendee calendars.">
                                        <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                    </Tooltip>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Live AI Product Launch & Q&A"
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                />
                            </div>

                            {/* Schedule & Times */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                        <span>Event Date</span>
                                        <Tooltip content="The scheduled calendar date for this live event session.">
                                            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                        </Tooltip>
                                    </label>
                                    <input
                                        type="date"
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                        <span>Start Time</span>
                                        <Tooltip content="Scheduled start time for attendee check-in and broadcast.">
                                            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                        </Tooltip>
                                    </label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                        <span>End Time</span>
                                        <Tooltip content="Estimated closing time for your presentation or demo.">
                                            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                        </Tooltip>
                                    </label>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>

                            {/* Conditional Format Fields: Virtual / Meet Link */}
                            {(format === "virtual" || format === "hybrid") && (
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                        <span>Online Joining Link (Google Meet / Zoom / Livestream)</span>
                                        <Tooltip content="URL link where attendees will stream your virtual session.">
                                            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                        </Tooltip>
                                    </label>
                                    <input
                                        type="url"
                                        value={virtualLink}
                                        onChange={(e) => setVirtualLink(e.target.value)}
                                        placeholder="https://meet.google.com/abc-defg-hij"
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            )}

                            {/* Conditional Format Fields: Physical Venue & Space Capacity */}
                            {(format === "physical" || format === "hybrid") && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                            <span>Physical Venue Name & Address</span>
                                            <Tooltip content="Street address and exhibition hall name for in-person visitors.">
                                                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                            </Tooltip>
                                        </label>
                                        <input
                                            type="text"
                                            value={physicalVenue}
                                            onChange={(e) => setPhysicalVenue(e.target.value)}
                                            placeholder="e.g. ExCeL London, Hall 4, Royal Victoria Dock, E16 1XL"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                                <span>Physical Space / Seating Capacity</span>
                                                <Tooltip content="Maximum seated capacity supported by your physical room or booth.">
                                                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                                </Tooltip>
                                            </label>
                                            <input
                                                type="number"
                                                value={physicalSpaces}
                                                onChange={(e) => setPhysicalSpaces(e.target.value)}
                                                placeholder="150"
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                                <span>Check-in Terminal Mode</span>
                                                <Tooltip content="Choose automated QR code scanning terminal or manual guest list check-in.">
                                                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                                </Tooltip>
                                            </label>
                                            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-orange-500">
                                                <option>QR Scanner Terminal Active</option>
                                                <option>Manual Door List Check-in</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Max Total Passes */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                    <span>Total Attendee Ticket Cap</span>
                                    <Tooltip content="Maximum tickets that can be issued across all pass holders.">
                                        <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                    </Tooltip>
                                </label>
                                <input
                                    type="number"
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700 cursor-pointer"
                                >
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="pb-3 border-b border-slate-100">
                                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                    <Users className="w-4 h-4 text-orange-600" /> Co-Hosts & Partners <span className="text-[10px] font-bold text-slate-400 lowercase font-normal">(optional)</span>
                                </h2>
                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                    Invite registered businesses to co-host, demo products, or bundle promotions.
                                </p>
                            </div>

                            {/* Partner Invite Controls (Flat layout on form surface, zero double container) */}
                            <div className="space-y-3">
                                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                    <UserPlus className="w-3.5 h-3.5 text-orange-600" /> Add Co-Hosting Partner
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                                            <span>Search Registered Business</span>
                                            <Tooltip content="Select an exhibitor from the verified platform registry.">
                                                <Info className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                            </Tooltip>
                                        </label>
                                        <select
                                            value={selectedPartnerId}
                                            onChange={(e) => setSelectedPartnerId(e.target.value)}
                                            className="w-full bg-slate-50/70 border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-orange-500 focus:bg-white transition-colors"
                                        >
                                            {AVAILABLE_PARTNERS.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name} ({p.category})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                                            <span>Contribution Role</span>
                                            <Tooltip content="Designated partner role such as guest speaker, co-host, or sponsor.">
                                                <Info className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                            </Tooltip>
                                        </label>
                                        <select
                                            value={partnerRole}
                                            onChange={(e) => setPartnerRole(e.target.value)}
                                            className="w-full bg-slate-50/70 border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-orange-500 focus:bg-white transition-colors"
                                        >
                                            <option value="Co-Host & Logistics Sponsor">Co-Host & Logistics Sponsor</option>
                                            <option value="Guest Speaker / Presenter">Guest Speaker / Presenter</option>
                                            <option value="Live Product Demonstration">Live Product Demonstration</option>
                                            <option value="Bundle Deal Contributor">Bundle Deal Contributor</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleAddPartner}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                    >
                                        <UserPlus className="w-3.5 h-3.5" /> Send Invitation
                                    </button>
                                </div>
                            </div>

                            {/* Active Invitations List (Redesigned 2-Tier Mobile Layout, Zero Truncation) */}
                            <div className="space-y-2.5">
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                                    Invited Session Partners ({invitedPartners.length})
                                </label>

                                {invitedPartners.length === 0 ? (
                                    <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                                        No partner businesses invited. You can host this event solo or add partners above.
                                    </div>
                                ) : (
                                    invitedPartners.map((partner) => (
                                        <div
                                            key={partner.id}
                                            className="p-3.5 bg-white border border-slate-200/90 rounded-xl shadow-2xs space-y-2.5"
                                        >
                                            {/* Tier 1: Icon, Full Business Name, and Remove Action */}
                                            <div className="flex items-start justify-between gap-2.5">
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                                        <Building2 className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                                                            {partner.name}
                                                        </h4>
                                                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                                            {partner.category}
                                                        </p>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleRemovePartner(partner.id)}
                                                    className="w-7 h-7 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                                    title="Remove partner"
                                                    aria-label="Remove partner"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Tier 2: Role & Status Badges with Full Responsive Width */}
                                            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                                                <div className="text-[11px] font-bold text-slate-600">
                                                    Role: <span className="text-orange-600 font-extrabold">{partner.role}</span>
                                                </div>
                                                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                                                    {partner.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 cursor-pointer"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700 cursor-pointer"
                                >
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="pb-3 border-b border-slate-100">
                                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                    <Ticket className="w-4 h-4 text-orange-600" /> Ticket Pricing & Templates
                                </h2>
                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                    Select an Admin-approved template and set pricing within the season cap.
                                </p>
                            </div>

                            <div className="space-y-2">
                                {ticketTemplates.map((tpl) => {
                                    const selected = tpl.id === selectedTemplateId;
                                    return (
                                        <div
                                            key={tpl.id}
                                            onClick={() => handleTemplateSelect(tpl.id)}
                                            className={`p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                                                selected
                                                    ? "border-orange-500 bg-orange-50/40 ring-1 ring-orange-500/20 shadow-2xs"
                                                    : "border-slate-200 bg-white hover:border-slate-300"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                                                <span className="text-orange-600 truncate">{tpl.commission || "10% Platform Split"}</span>
                                                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded text-[10px] font-bold shrink-0">
                                                    {tpl.isGiftOnly || tpl.maxPrice === 0 ? "Free (£0 Cap)" : `Cap: £${tpl.minPrice} – £${tpl.maxPrice}`}
                                                </span>
                                            </div>
                                            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                                {tpl.name}
                                            </h4>
                                            <p className="text-[11px] text-slate-500 leading-normal">{tpl.description}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                        <span>Your Ticket Price (£{activeTemplate.minPrice} – £{activeTemplate.maxPrice} Cap)</span>
                                        <Tooltip content="Set your attendee pass price within the admin-approved price cap.">
                                            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                        </Tooltip>
                                    </label>
                                    <input
                                        type="number"
                                        min={activeTemplate.minPrice}
                                        max={activeTemplate.maxPrice}
                                        value={ticketPrice}
                                        onChange={(e) => setTicketPrice(Number(e.target.value))}
                                        disabled={activeTemplate.maxPrice === 0}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 disabled:bg-slate-100"
                                    />
                                    {!isPriceValid && (
                                        <p className="text-[11px] font-bold text-red-600 flex items-center gap-1 mt-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> Price cannot exceed Admin cap of £
                                            {activeTemplate.maxPrice}.
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                        <span>Total Pass Quota</span>
                                        <Tooltip content="Total number of passes allocated for this event session.">
                                            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                                        </Tooltip>
                                    </label>
                                    <input
                                        type="number"
                                        value={rewardQuota}
                                        onChange={(e) => setRewardQuota(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 cursor-pointer"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="button"
                                    disabled={!isPriceValid}
                                    onClick={() => setStep(4)}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700 disabled:opacity-50 cursor-pointer"
                                >
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-4">
                            <div className="pb-3 border-b border-slate-100">
                                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Review & Confirmation
                                </h2>
                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                    Verify your event schedule, venue or joining link, co-hosts, and ticket pricing.
                                </p>
                            </div>

                            {/* Main Event Showcase Card */}
                            <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-2.5 shadow-2xs">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-100/90 text-orange-700">
                                        {format === "virtual" && <Video className="w-3 h-3" />}
                                        {format === "physical" && <MapPin className="w-3 h-3" />}
                                        {format === "hybrid" && <Globe className="w-3 h-3" />}
                                        {format === "virtual"
                                            ? "Virtual Stream"
                                            : format === "physical"
                                            ? "In-Person Venue"
                                            : "Hybrid Event"}
                                    </span>
                                    <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        {eventDate} • {startTime} - {endTime}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                                        {title || "Untitled Booth Showcase"}
                                    </h3>
                                    {(format === "physical" || format === "hybrid") && (
                                        <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 mt-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            <span>{physicalVenue} • <strong className="text-slate-800">{physicalSpaces} Seats</strong></span>
                                        </p>
                                    )}
                                    {(format === "virtual" || format === "hybrid") && (
                                        <p className="text-xs text-blue-600 font-medium flex items-center gap-1.5 mt-1 break-all">
                                            <Video className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                            <span>{virtualLink || "Google Meet Link"}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Structured 2-Column Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Ticket & Pricing Box */}
                                <div className="p-3.5 bg-white border border-slate-200/90 rounded-2xl space-y-2.5 shadow-2xs">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
                                        <Ticket className="w-3.5 h-3.5 text-orange-600" /> Ticket & Pricing
                                    </div>
                                    <div className="space-y-1.5 text-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500 font-medium">Template</span>
                                            <span className="font-bold text-slate-900 text-right">{activeTemplate.name}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500 font-medium">Ticket Price</span>
                                            <span className="font-extrabold text-emerald-600 text-sm">£{ticketPrice}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500 font-medium">Total Passes</span>
                                            <span className="font-bold text-slate-900">{capacity} Passes</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500 font-medium">Total Pass Quota</span>
                                            <span className="font-bold text-slate-900">{rewardQuota} Passes</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Co-Hosts & Partners Box */}
                                <div className="p-3.5 bg-white border border-slate-200/90 rounded-2xl space-y-2.5 shadow-2xs">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
                                        <Users className="w-3.5 h-3.5 text-orange-600" /> Co-Hosts ({invitedPartners.length})
                                    </div>
                                    {invitedPartners.length > 0 ? (
                                        <div className="space-y-2">
                                            {invitedPartners.map((p) => (
                                                <div key={p.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                                                    <div className="min-w-0 pr-2">
                                                        <div className="font-bold text-slate-900 truncate">{p.name}</div>
                                                        <div className="text-[10px] text-slate-500">{p.role}</div>
                                                    </div>
                                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                                                        Pending
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-400 font-medium italic pt-2">
                                            Solo Host — No external co-hosts invited.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Compliance Note */}
                            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>
                                    Ready for review. All ticket tiers and price caps comply with season guidelines.
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 cursor-pointer shadow-xs transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}
