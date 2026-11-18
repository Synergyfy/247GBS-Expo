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
    Search
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
    const [eventDate, setEventDate] = useState("2026-04-18");
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

            {/* Sleek Segmented Stepper */}
            <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                {[
                    { num: 1, short: "Details", full: "1. Event Details" },
                    { num: 2, short: "Partners", full: "2. Co-Hosts & Partners" },
                    { num: 3, short: "Tickets", full: "3. Ticket Templates" },
                    { num: 4, short: "Review", full: "4. Review & Submit" },
                ].map((s) => (
                    <button
                        key={s.num}
                        type="button"
                        onClick={() => setStep(s.num)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all truncate ${
                            step === s.num
                                ? "bg-white text-orange-600 shadow-xs font-extrabold"
                                : step > s.num
                                ? "text-emerald-700 font-bold hover:text-emerald-800"
                                : "text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        <span className="sm:hidden">{s.num}. {s.short}</span>
                        <span className="hidden sm:inline">{s.full}</span>
                    </button>
                ))}
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
                            <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-orange-600" /> Step 1: Event Schedule & Scope
                            </h2>

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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                        Max Attendee Capacity
                                    </label>
                                    <input
                                        type="number"
                                        value={capacity}
                                        onChange={(e) => setCapacity(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                                    />
                                </div>
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
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                    <Users className="w-4 h-4 text-orange-600" /> Step 2: Partners & Co-Hosts (Storyline §4.4)
                                </h2>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Optional Collaboration
                                </span>
                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed">
                                Invite registered business partners to co-host, demo products, or bundle promotional deals inside this session. Invited partners must accept before being displayed publicly.
                            </p>

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
                                            <option value="Co-Host & Sponsor">Co-Host & Sponsor</option>
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
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                    >
                                        <UserPlus className="w-3.5 h-3.5" /> Send Invitation
                                    </button>
                                </div>
                            </div>

                            {/* Active Invitations List */}
                            <div className="space-y-2">
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
                                            className="p-3 bg-white border border-slate-200/90 rounded-xl flex items-center justify-between gap-3 shadow-2xs"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                                    <Building2 className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-extrabold text-slate-900 truncate">
                                                        {partner.name}
                                                    </p>
                                                    <p className="text-[10px] text-slate-500 font-medium">
                                                        Role: <strong className="text-orange-600">{partner.role}</strong>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                                    {partner.status}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemovePartner(partner.id)}
                                                    className="w-6 h-6 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                                                    title="Remove partner"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
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
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                    <Ticket className="w-4 h-4 text-orange-600" /> Step 3: Select Admin Ticket Template
                                </h2>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
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
                            <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Step 4: Compliance & Partner Summary
                            </h2>

                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Event Title:</span>
                                    <span className="font-bold text-slate-900">{title || "Live AI Product Showcase"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Date & Capacity:</span>
                                    <span className="font-bold text-slate-900">{eventDate} • {capacity} Passes</span>
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
