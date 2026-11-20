"use client";

import React, { useState } from "react";
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
  CheckSquare,
  Square,
  Percent,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Tooltip from "@/app/component/Tooltip";

export const ADMIN_TICKET_TEMPLATES = [
  {
    id: "tpl-general",
    name: "Standard Season Day Pass Template",
    minPrice: 0,
    maxPrice: 50,
    defaultPrice: 25,
    commission: "10% Platform Split",
    description: "Admin-approved general booth & keynote access template. Capped at £50 maximum.",
  },
  {
    id: "tpl-vip",
    name: "VIP Executive Workshop Template",
    minPrice: 50,
    maxPrice: 250,
    defaultPrice: 120,
    commission: "8% Platform Split",
    description: "Includes 1-on-1 consultation room access & MCOM voucher perk. Capped at £250 maximum.",
  },
  {
    id: "tpl-free",
    name: "Platform-Sponsored Complimentary Pass",
    minPrice: 0,
    maxPrice: 0,
    defaultPrice: 0,
    commission: "0% Fee • Platform Funded",
    description: "Free public access pass distributed directly via 247GBS Academy and central marketing.",
  },
];

export interface RegisteredBusiness {
  id: string;
  name: string;
  category: string;
  cac: string;
  status: "Verified" | "Premium" | "Standard";
  location: string;
}

export const REGISTERED_BUSINESSES: RegisteredBusiness[] = [
  {
    id: "biz_1",
    name: "TechGlobal Solutions Ltd",
    category: "Enterprise Cloud & AI",
    cac: "RC-1234567",
    status: "Premium",
    location: "London, UK"
  },
  {
    id: "biz_2",
    name: "Acme Corporation Ltd",
    category: "Supply Chain & B2B Cloud",
    cac: "RC-884920",
    status: "Verified",
    location: "Manchester, UK"
  },
  {
    id: "biz_3",
    name: "Creative Wave Media",
    category: "Digital Marketing & PR",
    cac: "UK-998877",
    status: "Verified",
    location: "London, UK"
  },
  {
    id: "biz_4",
    name: "Apex Logistics UK",
    category: "Freight & Fulfillment",
    cac: "UK-771122",
    status: "Verified",
    location: "Birmingham, UK"
  },
  {
    id: "biz_5",
    name: "GreenEnergy Pro",
    category: "CleanTech & Sustainability",
    cac: "DE-443322",
    status: "Standard",
    location: "Berlin / UK Branch"
  },
  {
    id: "biz_6",
    name: "Finest Retail Corp",
    category: "E-Commerce & Consumer Goods",
    cac: "IN-112233",
    status: "Premium",
    location: "London, UK"
  },
  {
    id: "biz_7",
    name: "Skyline Media Group",
    category: "Broadcast & Keynote Media",
    cac: "UK-554433",
    status: "Verified",
    location: "Edinburgh, UK"
  },
  {
    id: "biz_8",
    name: "EcoTech Clean Solutions",
    category: "Commercial Hygiene & Tech",
    cac: "UK-221199",
    status: "Verified",
    location: "Leeds, UK"
  }
];

export default function AdminCreateEventPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1: Scope, Schedule & Format
  const [ownershipType, setOwnershipType] = useState<"platform" | "national" | "business">("platform");
  const [isOwnershipOpen, setIsOwnershipOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Workshop");
  const [format, setFormat] = useState<"virtual" | "physical" | "hybrid">("virtual");
  const [isFormatOpen, setIsFormatOpen] = useState(true);
  const [eventDate, setEventDate] = useState("2026-10-18");
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("16:00");
  const [timezone, setTimezone] = useState("GMT (UK)");
  const [virtualLink, setVirtualLink] = useState("https://meet.google.com/exp-gbs-2026");
  const [physicalVenue, setPhysicalVenue] = useState("ExCeL London, Hall 4, Royal Victoria Dock, E16 1XL");
  const [physicalSpaces, setPhysicalSpaces] = useState("250");
  const [capacity, setCapacity] = useState("500");

  // Step 2: Business Assignment ("On Behalf Of" Search & Multi-Select)
  const [businessSearch, setBusinessSearch] = useState("");
  const [selectedBusinessIds, setSelectedBusinessIds] = useState<string[]>(["biz_1"]);

  // Step 3: Tickets & Pricing
  const [pricingType, setPricingType] = useState<"free" | "paid">("free");
  const [selectedTemplateId, setSelectedTemplateId] = useState("tpl-general");
  const [ticketPrice, setTicketPrice] = useState<number>(25);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const activeTemplate =
    ADMIN_TICKET_TEMPLATES.find((t) => t.id === selectedTemplateId) || ADMIN_TICKET_TEMPLATES[0];

  const isPriceValid =
    pricingType === "free" ||
    (ticketPrice >= activeTemplate.minPrice && ticketPrice <= activeTemplate.maxPrice);

  const filteredBusinesses = REGISTERED_BUSINESSES.filter(
    (b) =>
      b.name.toLowerCase().includes(businessSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(businessSearch.toLowerCase()) ||
      b.cac.toLowerCase().includes(businessSearch.toLowerCase()) ||
      b.location.toLowerCase().includes(businessSearch.toLowerCase())
  );

  const handleSelectAll = () => {
    setSelectedBusinessIds(filteredBusinesses.map((b) => b.id));
  };

  const handleClearSelection = () => {
    setSelectedBusinessIds([]);
  };

  const toggleBusiness = (id: string) => {
    if (selectedBusinessIds.includes(id)) {
      setSelectedBusinessIds(selectedBusinessIds.filter((item) => item !== id));
    } else {
      setSelectedBusinessIds([...selectedBusinessIds, id]);
    }
  };

  const handleTemplateSelect = (tplId: string) => {
    const tpl = ADMIN_TICKET_TEMPLATES.find((t) => t.id === tplId);
    setSelectedTemplateId(tplId);
    if (tpl) {
      setTicketPrice(tpl.defaultPrice);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPriceValid || !title.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      router.push("/dashboard/admin/events");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-2.5 sm:space-y-4 pb-10">
      {/* Compact Header */}
      <div className="pb-2 sm:pb-2.5 border-b border-slate-200/80">
        <Link
          href="/dashboard/admin/events"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-orange-600 uppercase tracking-wider mb-0.5 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Events Directory
        </Link>
        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase leading-snug">
          Create Platform or National Event
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
          Orchestrate platform-wide workshops, flagship seasonal summits, or host events on behalf of businesses.
        </p>
      </div>

      {/* Streamlined Timeline Stepper */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-2xs">
        <div className="flex items-center justify-between relative max-w-lg mx-auto">
          {/* Timeline Connector Track & Fill */}
          <div className="absolute left-4 right-4 top-3.5 sm:top-4 -translate-y-1/2 h-0.5 bg-slate-200 z-0 overflow-hidden">
            <div
              className="h-full bg-orange-600 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
          </div>

          {[
            { num: 1, title: "Schedule" },
            { num: 2, title: "Businesses" },
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
            Event Successfully Published to Directory
          </h2>
          <p className="text-xs text-slate-600">
            &quot;{title || "New Platform Event"}&quot; is now live across the 247GBS Expo calendar and directory.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-3.5 sm:p-5 space-y-3.5 sm:space-y-4">
          {/* STEP 1: Event Schedule & Format */}
          {step === 1 && (
            <div className="space-y-3.5 sm:space-y-4">
              <div className="pb-2 sm:pb-2.5 border-b border-slate-100">
                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-orange-600" /> Event Scope, Schedule & Format
                </h2>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Select ownership scope, choose attendance format (online, physical, or hybrid), and pick dates.
                </p>
              </div>

              {/* Event Ownership & Scope (Flat in form flow, zero nested container) */}
              <div className="space-y-2">
                <div
                  onClick={() => setIsOwnershipOpen(!isOwnershipOpen)}
                  className="flex items-center justify-between cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Event Ownership
                    </span>
                    <Tooltip content="Choose whether this is a platform-sponsored activity, flagship expo, or hosted on behalf of businesses.">
                      <Info className="w-3 h-3 text-slate-400 group-hover:text-slate-600 shrink-0" />
                    </Tooltip>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!isOwnershipOpen && (
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200/80 px-2 py-0.5 rounded-md whitespace-nowrap">
                        {ownershipType === "platform" && "Platform-Led"}
                        {ownershipType === "national" && "National Expo"}
                        {ownershipType === "business" && "Business-Led"}
                      </span>
                    )}
                    <div className="w-5 h-5 rounded flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
                      {isOwnershipOpen ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>
                </div>

                {isOwnershipOpen && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
                    {[
                      { id: "platform" as const, label: "Platform-Led", sub: "247GBS Activity / Training" },
                      { id: "national" as const, label: "National Expo", sub: "Seasonal Flagship Summit" },
                      { id: "business" as const, label: "Business-Led", sub: "Host On Behalf Of Businesses" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOwnershipType(t.id);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          ownershipType === t.id
                            ? "border-orange-500 bg-orange-50/50 shadow-2xs font-extrabold"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-900 leading-tight">{t.label}</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{t.sub}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Sub-category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <span>Event Title</span>
                    <Tooltip content="Public headline shown in listings and attendee registrations.">
                      <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 247GBS Digital Seller Masterclass 2026"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <span>Sub-Category</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-orange-500"
                  >
                    <option>Workshop</option>
                    <option>Demonstration</option>
                    <option>Seller Training</option>
                    <option>Keynote Showcase</option>
                    <option>Product Launch</option>
                    <option>Networking Session</option>
                  </select>
                </div>
              </div>

              {/* Attendance Format (Flat in form flow, zero nested container) */}
              <div className="space-y-2">
                <div
                  onClick={() => setIsFormatOpen(!isFormatOpen)}
                  className="flex items-center justify-between cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Attendance Format
                    </span>
                    <Tooltip content="Online sessions provide stream links, physical sessions specify venue addresses, and hybrid accommodates both.">
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
                        sub: "Online Stream / Meet Link",
                        icon: Video,
                      },
                      {
                        id: "physical" as const,
                        label: "Physical Venue",
                        sub: "In-Person Hall or Booth",
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

              {/* Conditional Location / Link Fields */}
              {(format === "virtual" || format === "hybrid") && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-orange-600" />
                    <span>Online Joining / Livestream Link</span>
                    <Tooltip content="Direct URL link where attendees will join your livestream or Google Meet / Zoom.">
                      <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
                    </Tooltip>
                  </label>
                  <input
                    type="url"
                    value={virtualLink}
                    onChange={(e) => setVirtualLink(e.target.value)}
                    placeholder="https://meet.google.com/abc-defg-hij or YouTube livestream URL"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}

              {(format === "physical" || format === "hybrid") && (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-600" />
                      <span>Physical Venue Name & Street Address</span>
                      <Tooltip content="Full venue street address and exhibition hall for in-person visitors.">
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
                        <span>Physical Seating Space Capacity</span>
                      </label>
                      <input
                        type="number"
                        value={physicalSpaces}
                        onChange={(e) => setPhysicalSpaces(e.target.value)}
                        placeholder="250"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                        <span>Terminal Check-In Mode</span>
                      </label>
                      <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-orange-500">
                        <option>QR Scanner Terminal Active</option>
                        <option>Manual Door List Check-in</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Date & Time Pickers (Picked, NOT Typed In) */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-600" />
                    <span>Event Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    <span>Start Time</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    <span>End Time</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-orange-500 font-bold"
                  >
                    <option>GMT (UK)</option>
                    <option>CET (Europe)</option>
                    <option>EST (US East)</option>
                    <option>WAT (West Africa)</option>
                  </select>
                </div>
              </div>

              {/* Total Attendee Ticket Cap */}
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
                  disabled={!title.trim()}
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Business Assignment ("On Behalf Of" Search & Multi-Select) */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-orange-600" />
                  {ownershipType === "business"
                    ? "Participating Businesses (On Behalf Of)"
                    : "Primary Organizer & Partner Businesses"}
                </h2>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {ownershipType === "business"
                    ? "Search registered platform businesses to host this event on their behalf. You can select one, several, or all."
                    : "Organized under 247GBS Platform Central. You may attach participating partner businesses below."}
                </p>
              </div>

              {/* Search Bar & Multi-Select Controls (Flat on form surface, zero double container) */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={businessSearch}
                      onChange={(e) => setBusinessSearch(e.target.value)}
                      placeholder="Search businesses by name, RC number, category, or location..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-orange-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 hover:border-orange-500 hover:text-orange-600 transition-all cursor-pointer"
                    >
                      Select All ({filteredBusinesses.length})
                    </button>
                    <button
                      type="button"
                      onClick={handleClearSelection}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-500 hover:border-slate-300 transition-all cursor-pointer"
                    >
                      Clear All
                    </button>
                    <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200 shrink-0">
                      {selectedBusinessIds.length} Selected
                    </span>
                  </div>
                </div>

                {/* Selectable Businesses Directory List */}
                <div className="max-h-72 overflow-y-auto rounded-lg border border-slate-200 divide-y divide-slate-100 bg-white">
                  {filteredBusinesses.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No businesses found matching &quot;{businessSearch}&quot;.
                    </div>
                  ) : (
                    filteredBusinesses.map((biz) => {
                      const isSelected = selectedBusinessIds.includes(biz.id);
                      return (
                        <div
                          key={biz.id}
                          onClick={() => toggleBusiness(biz.id)}
                          className={`p-3 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                            isSelected ? "bg-orange-50/50 hover:bg-orange-50/70" : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              type="button"
                              className="text-orange-600 shrink-0"
                              aria-label={`Select ${biz.name}`}
                            >
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 text-orange-600" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-300" />
                              )}
                            </button>
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-950 font-black text-xs flex items-center justify-center shrink-0">
                              {biz.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                                  {biz.name}
                                </h4>
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                                    biz.status === "Premium"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-emerald-100 text-emerald-700"
                                  }`}
                                >
                                  {biz.status}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 font-medium truncate">
                                {biz.category} • <span className="font-mono">{biz.cac}</span> • {biz.location}
                              </p>
                            </div>
                          </div>

                          {isSelected && (
                            <span className="text-[10px] font-bold text-orange-600 shrink-0 hidden sm:inline-flex items-center gap-1">
                              <Check className="w-3 h-3" /> Selected Host
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Navigation Actions */}
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

          {/* STEP 3: Ticket Pricing & Templates */}
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

              {/* Pricing Type Toggle */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Pricing Structure
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPricingType("free")}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      pricingType === "free"
                        ? "border-orange-600 bg-orange-50 text-orange-700 shadow-2xs"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    Free Platform-Sponsored
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricingType("paid")}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      pricingType === "paid"
                        ? "border-orange-600 bg-orange-50 text-orange-700 shadow-2xs"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    Paid Ticket Access
                  </button>
                </div>
              </div>

              {pricingType === "paid" && (
                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Choose Template & Pricing
                  </label>

                  <div className="space-y-2">
                    {ADMIN_TICKET_TEMPLATES.map((tpl) => {
                      const selected = tpl.id === selectedTemplateId;
                      return (
                        <div
                          key={tpl.id}
                          onClick={() => handleTemplateSelect(tpl.id)}
                          className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                            selected
                              ? "border-orange-500 bg-orange-50/40 ring-1 ring-orange-500/20 shadow-2xs"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          {/* Top Row: Commission and Cap Badges */}
                          <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                            <span className="text-orange-600">{tpl.commission}</span>
                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded text-[10px] font-bold shrink-0">
                              {tpl.maxPrice === 0 ? "Free (£0 Cap)" : `Cap: £${tpl.minPrice} – £${tpl.maxPrice}`}
                            </span>
                          </div>

                          {/* Full-width Title */}
                          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                            {tpl.name}
                          </h4>

                          {/* Description */}
                          <p className="text-[11px] text-slate-500 leading-normal">{tpl.description}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Ticket Price Input (Flat layout on form, zero double container) */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                      <span>Ticket Price (£)</span>
                      <span className="text-[10px] font-semibold text-slate-500 lowercase">
                        allowed: £{activeTemplate.minPrice} – £{activeTemplate.maxPrice}
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                        £
                      </span>
                      <input
                        type="number"
                        min={activeTemplate.minPrice}
                        max={activeTemplate.maxPrice}
                        value={ticketPrice}
                        onChange={(e) => setTicketPrice(Number(e.target.value))}
                        disabled={activeTemplate.maxPrice === 0}
                        className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 text-xs font-extrabold text-slate-900 focus:outline-none focus:border-orange-500 bg-white disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </div>

                    {!isPriceValid && (
                      <p className="text-[11px] text-red-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Price must be between £{activeTemplate.minPrice} and £{activeTemplate.maxPrice}.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Event Description */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Event Description & Agenda
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of sessions, keynote speakers, and exhibition booth activities..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 resize-none"
                />
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
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                >
                  Review Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Publish Event */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-orange-600" /> Review & Publish Confirmation
                </h2>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Verify the event schedule, attendance format, host businesses, and pricing.
                </p>
              </div>

              {/* Hero Showcase Card */}
              <div className="p-4 rounded-xl border border-orange-200/80 bg-orange-50/50 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600">
                    {ownershipType === "national"
                      ? "National Expo Flagship"
                      : ownershipType === "platform"
                      ? `Platform-Led ${category}`
                      : "Business-Led Showcase"}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white border border-orange-200 text-orange-700">
                    {format.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {title || "Untitled Event Session"}
                </h3>
                <p className="text-xs text-slate-600">
                  {description || "Official 247GBS Expo event session."}
                </p>
              </div>

              {/* 2-Column Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Schedule & Timezone
                  </span>
                  <span className="font-extrabold text-slate-900">
                    {eventDate} • {startTime} – {endTime} {timezone}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Capacity & Admission
                  </span>
                  <span className="font-extrabold text-slate-900">
                    {pricingType === "free" ? "Free Admission" : `£${ticketPrice} Entry`} • {capacity} Total Seats
                  </span>
                </div>

                <div className="sm:col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Location & Access Link
                  </span>
                  <span className="font-medium text-slate-700">
                    {format === "virtual"
                      ? virtualLink
                      : format === "physical"
                      ? physicalVenue
                      : `${physicalVenue} & Stream (${virtualLink})`}
                  </span>
                </div>

                <div className="sm:col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Participating Hosts ({selectedBusinessIds.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBusinessIds.map((id) => {
                      const biz = REGISTERED_BUSINESSES.find((b) => b.id === id);
                      if (!biz) return null;
                      return (
                        <span
                          key={id}
                          className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                        >
                          <Building2 className="w-3 h-3 text-orange-600" />
                          {biz.name}
                        </span>
                      );
                    })}
                  </div>
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
                  className="px-5 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700 cursor-pointer shadow-md transition-all inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish</span>
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
