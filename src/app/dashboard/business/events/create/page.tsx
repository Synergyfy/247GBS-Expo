"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    Ticket,
    ShieldCheck,
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
    Clock
} from "lucide-react";

const ADMIN_TICKET_TEMPLATES = [
    {
        id: "tpl-general",
        name: "Standard Season Day Pass Template",
        minPrice: 0,
        maxPrice: 50,
        defaultPrice: 25,
        commission: "10% Admin Split",
        description: "Admin-approved general booth & keynote access template. Capped at £50 maximum.",
    },
    {
        id: "tpl-vip",
        name: "VIP Executive Workshop Template",
        minPrice: 50,
        maxPrice: 250,
        defaultPrice: 120,
        commission: "8% Admin Split",
        description: "Includes 1-on-1 consultation room access & MCOM voucher perk. Capped at £250 maximum.",
    },
    {
        id: "tpl-reward",
        name: "MCOM Loyalty Reward Pass (Gift Only)",
        minPrice: 0,
        maxPrice: 0,
        defaultPrice: 0,
        commission: "0% Fee • Loyalty Gift",
        description: "Complimentary pass distributed via MCOM Rewards and sales referral links.",
    },
];

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

    const handleRemovePartner = (id: string) => {
        setInvitedPartners(invitedPartners.filter((p) => p.id !== id));
    };

    const activeTemplate =
        ADMIN_TICKET_TEMPLATES.find((t) => t.id === selectedTemplateId) || ADMIN_TICKET_TEMPLATES[0];

    const isPriceValid =
        ticketPrice >= activeTemplate.minPrice && ticketPrice <= activeTemplate.maxPrice;

    const handleTemplateSelect = (tplId: string) => {
        const tpl = ADMIN_TICKET_TEMPLATES.find((t) => t.id === tplId);
        setSelectedTemplateId(tplId);
        if (tpl) {
            setTicketPrice(tpl.defaultPrice);
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
        <div className="max-w-3xl mx-auto space-y-5 pb-12">
            {/* Compact Header */}
            <div className="pb-3 border-b border-slate-200/80">
                <Link
                    href="/dashboard/business/events"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-orange-600 uppercase tracking-wider mb-1 transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to My Events
                </Link>
                <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                    Create Event
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    Configure your event details, schedule, and ticket template for Expo visitors.
                </p>
            </div>

            {/* Elegant Numbered Timeline Stepper (No Text Truncation) */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-5 shadow-2xs">
                <div className="flex items-center justify-between relative max-w-lg mx-auto">
                    {/* Background Connector Bar */}
                    <div className="absolute left-6 right-6 top-4 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
                    <div
                        className="absolute left-6 top-4 -translate-y-1/2 h-0.5 bg-orange-600 transition-all duration-300 z-0"
                        style={{ width: `${((step - 1) / 3) * 100}%` }}
                    />

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
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                                        isCurrent
                                            ? "bg-orange-600 text-white ring-4 ring-orange-100 shadow-sm"
                                            : isCompleted
                                            ? "bg-emerald-600 text-white shadow-2xs"
                                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                                    }`}
                                >
                                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                                </div>
                                <span
                                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1.5 transition-colors hidden sm:block ${
                                        isCurrent
                                            ? "text-orange-600 font-extrabold"
                                            : isCompleted
                                            ? "text-emerald-700 font-bold"
                                            : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                                >
                                    {s.title}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Mobile Active Step Indicator Banner (Zero truncation) */}
                <div className="sm:hidden mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Step {step} of 4
                    </span>
                    <span className="font-extrabold text-orange-600 uppercase tracking-tight text-xs">
                        {step === 1 && "1. Event Schedule & Scope"}
                        {step === 2 && "2. Co-Hosts & Partners"}
                        {step === 3 && "3. Ticket Pricing & Templates"}
                        {step === 4 && "4. Review & Confirmation"}
                    </span>
                </div>
            </div>

            {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-2">
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
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5 space-y-4">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="pb-3 border-b border-slate-100">
                                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-orange-600" /> Event Schedule & Format
                                </h2>
                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                    Choose attendance format (virtual, physical, or hybrid), schedule times, and capacity.
                                </p>
                            </div>

                            {/* Event Format Selection */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                                    Attendance Format
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
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
                                                onClick={() => setFormat(f.id)}
                                                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center sm:flex-col sm:items-start gap-2.5 ${
                                                    isSelected
                                                        ? "border-orange-500 bg-orange-50/50 shadow-2xs"
                                                        : "border-slate-200 hover:border-slate-300 bg-white"
                                                }`}
                                            >
                                                <div
                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                                        isSelected
                                                            ? "bg-orange-600 text-white"
                                                            : "bg-slate-100 text-slate-500"
                                                    }`}
                                                >
                                                    <Icon className="w-4 h-4" />
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
                            </div>

                            {/* Title */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                    Event / Session Title
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
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                        Event Date
                                    </label>
                                    <input
                                        type="date"
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                        End Time
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
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                        Online Joining Link (Google Meet / Zoom / Livestream)
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
                                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                            Physical Venue Name & Address
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
                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                                Physical Space / Seating Capacity
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
                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                                Check-in Terminal Mode
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
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                    Total Attendee Ticket Cap
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
                                    Next: Invite Partners & Co-Hosts →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div>
                                    <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                        <Users className="w-4 h-4 text-orange-600" /> Co-Hosts & Partners
                                    </h2>
                                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                        Invite registered businesses to co-host, demo products, or bundle promotions.
                                    </p>
                                </div>
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 shrink-0">
                                    Optional
                                </span>
                            </div>

                            {/* Partner Invite Input Card */}
                            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
                                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                    <UserPlus className="w-3.5 h-3.5 text-orange-600" /> Add Co-Hosting Partner
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                                            Search Registered Business
                                        </label>
                                        <select
                                            value={selectedPartnerId}
                                            onChange={(e) => setSelectedPartnerId(e.target.value)}
                                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-orange-500"
                                        >
                                            {AVAILABLE_PARTNERS.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name} ({p.category})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                                            Contribution Role
                                        </label>
                                        <select
                                            value={partnerRole}
                                            onChange={(e) => setPartnerRole(e.target.value)}
                                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-orange-500"
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
                                    Next: Select Ticket Template →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div>
                                    <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                        <Ticket className="w-4 h-4 text-orange-600" /> Ticket Pricing & Templates
                                    </h2>
                                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                        Select an Admin-approved template and set pricing within the season cap.
                                    </p>
                                </div>
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                    Price Cap Enforced
                                </span>
                            </div>

                            <div className="space-y-2.5">
                                {ADMIN_TICKET_TEMPLATES.map((tpl) => {
                                    const selected = tpl.id === selectedTemplateId;
                                    return (
                                        <div
                                            key={tpl.id}
                                            onClick={() => handleTemplateSelect(tpl.id)}
                                            className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1 ${
                                                selected
                                                    ? "border-orange-600 bg-orange-50/40"
                                                    : "border-slate-200 hover:border-slate-300"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                                                <span className="text-orange-600 truncate">{tpl.commission}</span>
                                                <span className="text-slate-900 shrink-0 whitespace-nowrap">
                                                    {tpl.maxPrice === 0 ? "Free Pass (£0 Cap)" : `Cap: £${tpl.minPrice}–£${tpl.maxPrice}`}
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                                                {tpl.name}
                                            </p>
                                            <p className="text-[11px] text-slate-500">{tpl.description}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                        Your Ticket Price (£{activeTemplate.minPrice} – £{activeTemplate.maxPrice} Cap)
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
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                        MCOM Rewards Complimentary Allocation
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
                                    Next: Review & Submit →
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
                                    Verify all details, invited partners, and pricing before submitting for moderation.
                                </p>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Event Title:</span>
                                    <span className="font-bold text-slate-900">{title || "Live AI Product Showcase"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Format:</span>
                                    <span className="font-bold uppercase text-orange-600">
                                        {format === "virtual"
                                            ? "Virtual (Online Stream / Meet)"
                                            : format === "physical"
                                            ? "Physical (In-Person Venue)"
                                            : "Hybrid (Venue + Livestream)"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Date & Time:</span>
                                    <span className="font-bold text-slate-900">
                                        {eventDate} ({startTime} - {endTime})
                                    </span>
                                </div>
                                {(format === "virtual" || format === "hybrid") && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Online Link:</span>
                                        <span className="font-medium text-blue-600 truncate max-w-[200px]">
                                            {virtualLink || "Google Meet Link"}
                                        </span>
                                    </div>
                                )}
                                {(format === "physical" || format === "hybrid") && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Venue & Spaces:</span>
                                        <span className="font-bold text-slate-900">
                                            {physicalVenue} ({physicalSpaces} seats)
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Total Capacity:</span>
                                    <span className="font-bold text-slate-900">{capacity} Passes</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Invited Co-Hosts:</span>
                                    <span className="font-bold text-slate-900">
                                        {invitedPartners.length > 0
                                            ? invitedPartners.map((p) => p.name).join(", ")
                                            : "Solo Host (No external partners)"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Admin Template:</span>
                                    <span className="font-bold text-orange-600">{activeTemplate.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Ticket Price:</span>
                                    <span className="font-extrabold text-emerald-600">
                                        £{ticketPrice} (Within £{activeTemplate.maxPrice} Admin Cap)
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">MCOM Rewards Gift Quota:</span>
                                    <span className="font-bold text-slate-900">{rewardQuota} Passes</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 cursor-pointer"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 cursor-pointer shadow-xs"
                                >
                                    <Sparkles className="w-3.5 h-3.5" /> Submit to Admin Queue
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}
