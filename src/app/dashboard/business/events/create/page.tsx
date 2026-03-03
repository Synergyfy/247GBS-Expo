"use client";

import { useState, useEffect } from "react";
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
    Users,
    Briefcase,
    ShieldCheck,
    Loader2,
    Info,
    Trash2
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "@/app/component/Tooltip";
import { api } from "@/lib/api";

const WIZARD_STEPS = [
    "Event Type",
    "Venue Format",
    "Basic Details",
    "Schedule",
    "Ticket Config",
    "Bundles",
    "Review"
];

export default function CreateEventWizard() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inventory, setInventory] = useState<any[]>([]);
    const [isInventoryLoading, setIsInventoryLoading] = useState(false);

    // Form State
    const [eventType, setEventType] = useState("expo");
    const [format, setFormat] = useState("virtual");
    const [details, setDetails] = useState({ title: "", description: "", rating: 5, reviews: 0, organizer: "Me", category: "OTHER", type: "PAID", startDate: "", endDate: "", location: "" });
    const [tickets, setTickets] = useState<any[]>([
        { id: "1", name: "General Access", price: "0", quantity: "1000", rules: "Non-refundable", productIds: [] }
    ]);

    useEffect(() => {
        if (step === 5) {
            fetchInventory();
        }
    }, [step]);

    const fetchInventory = async () => {
        setIsInventoryLoading(true);
        try {
            const data = await api.get('/dashboard/business/events/inventory/my-products');
            setInventory(data || []);
        } catch (error) {
            console.error("Failed to fetch inventory:", error);
        } finally {
            setIsInventoryLoading(false);
        }
    };

    const handleNext = () => {
        setStep(prev => Math.min(prev + 1, WIZARD_STEPS.length - 1));
    };

    const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                name: details.title,
                description: details.description,
                startDate: details.startDate || new Date().toISOString(),
                endDate: details.endDate || new Date().toISOString(),
                location: details.location || "Virtual",
                eventType: eventType,
                format: format.toUpperCase(),
                category: details.category,
                type: details.type,
                organizer: details.organizer,
                benefits: ["Access to all sessions"],
                tickets: tickets.map(t => ({
                    name: t.name,
                    price: parseFloat(t.price),
                    quantity: parseInt(t.quantity),
                    rules: t.rules,
                    productIds: t.productIds || []
                }))
            };
            await api.post('/dashboard/business/events', payload);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Failed to create event:", error);
            alert("Failed to create event. Please check all fields.");
        } finally {
            setLoading(false);
        }
    };

    const addTicketTier = () => {
        setTickets([...tickets, { id: Date.now().toString(), name: "New Tier", price: "0", quantity: "100", rules: "", productIds: [] }]);
    };

    const updateTicket = (id: string, field: string, val: any) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, [field]: val } : t));
    };

    const toggleProductInTier = (ticketId: string, productId: string) => {
        const ticket = tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        const productIds = ticket.productIds || [];
        const newProductIds = productIds.includes(productId)
            ? productIds.filter((id: string) => id !== productId)
            : [...productIds, productId];

        updateTicket(ticketId, 'productIds', newProductIds);
    };

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                    <Check className="w-12 h-12" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-4">Submitted for Review</h1>
                <p className="text-lg text-slate-600 mb-12">
                    Your event <strong>{details.title}</strong> has been sent to the admin team.
                    The approval pipeline status is now: <span className="text-orange-600 font-bold uppercase tracking-widest text-sm ml-2 underline">Under Review</span>
                </p>
                <Link href="/dashboard/business/events" className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl">
                    Back to Event Manager <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link href="/dashboard/business/events" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back to Events
                </Link>
                <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Step {step + 1} of {WIZARD_STEPS.length}</p>
                    <h2 className="text-lg font-bold text-slate-900">{WIZARD_STEPS[step]}</h2>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-2 h-1.5">
                {WIZARD_STEPS.map((_, i) => (
                    <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-orange-600' : 'bg-slate-200'}`} />
                ))}
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
                <div className="p-8 md:p-16">
                    <AnimatePresence mode="wait">
                        {/* STEP 0: EVENT TYPE */}
                        {step === 0 && (
                            <motion.div key="step0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                                <div className="text-center max-w-xl mx-auto">
                                    <h1 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tight">What are you hosting?</h1>
                                    <p className="text-slate-500">Select the template that best fits your event structure.</p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { id: "expo", label: "Digital Expo", icon: <Layout /> },
                                        { id: "workshop", label: "Workshop", icon: <Briefcase /> },
                                        { id: "webinar", label: "Webinar", icon: <Monitor /> },
                                        { id: "panel", label: "Panel", icon: <Users /> },
                                    ].map((t) => (
                                        <div key={t.id} onClick={() => setEventType(t.id)} className={`p-6 rounded-3xl border-2 cursor-pointer transition-all text-center ${eventType === t.id ? "border-orange-600 bg-orange-50" : "border-slate-50 hover:border-orange-200"}`}>
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${eventType === t.id ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                                                {t.icon}
                                            </div>
                                            <span className="font-bold text-slate-900 text-sm">{t.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 1: FORMAT */}
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div className="text-center max-w-xl mx-auto">
                                    <h1 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tight">Venue Format</h1>
                                    <p className="text-slate-500">How will users attend your event?</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { id: "virtual", label: "Virtual", desc: "100% Digital", icon: <Monitor /> },
                                        { id: "physical", label: "Physical", desc: "On-site Venue", icon: <MapPin /> },
                                        { id: "hybrid", label: "Hybrid", desc: "Both Formats", icon: <Globe /> },
                                    ].map((f) => (
                                        <div key={f.id} onClick={() => setFormat(f.id)} className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all ${format === f.id ? "border-orange-600 bg-orange-50 shadow-xl" : "border-slate-50 bg-slate-50/50 hover:border-orange-200"}`}>
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${format === f.id ? "bg-orange-600 text-white" : "bg-white text-slate-400 border border-slate-100"}`}>
                                                {f.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{f.label}</h3>
                                            <p className="text-slate-500 text-sm">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: BASIC DETAILS */}
                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Event Title</label>
                                                <Tooltip content="The public name of your event">
                                                    <Info className="w-3 h-3 text-slate-400 cursor-help" />
                                                </Tooltip>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Symposium 2026"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold"
                                                value={details.title}
                                                onChange={(e) => setDetails({ ...details, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</label>
                                                <select
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                                                    value={details.category}
                                                    onChange={(e) => setDetails({ ...details, category: e.target.value })}
                                                >
                                                    <option value="TECH">Technology</option>
                                                    <option value="ART">Art & Culture</option>
                                                    <option value="BUSINESS">Business</option>
                                                    <option value="OTHER">Other</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pricing Type</label>
                                                <select
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                                                    value={details.type}
                                                    onChange={(e) => setDetails({ ...details, type: e.target.value })}
                                                >
                                                    <option value="PAID">Paid</option>
                                                    <option value="FREE">Free</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</label>
                                                <Tooltip content="A short summary of what attendees can expect">
                                                    <Info className="w-3 h-3 text-slate-400 cursor-help" />
                                                </Tooltip>
                                            </div>
                                            <textarea
                                                rows={4}
                                                placeholder="What is the main value of this event?"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                                                value={details.description}
                                                onChange={(e) => setDetails({ ...details, description: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Event Organizer</label>
                                            <input
                                                type="text"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl"
                                                value={details.organizer}
                                                onChange={(e) => setDetails({ ...details, organizer: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Event Banner (Media)</label>
                                                <Tooltip content="High-quality image for event promotion">
                                                    <Info className="w-3 h-3 text-slate-400 cursor-help" />
                                                </Tooltip>
                                            </div>
                                            <div className="border-4 border-dashed border-slate-100 rounded-[3rem] h-48 flex flex-col items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all cursor-pointer group">
                                                <Upload className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                                                <p className="font-black text-sm uppercase">Upload Visuals</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: SCHEDULE */}
                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                        <div className="flex items-center gap-2 mb-4">
                                            <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight"><Calendar className="text-orange-600" /> Key Dates</h3>
                                            <Tooltip content="Start and end dates for your event">
                                                <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                            </Tooltip>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Start Date & Time</label>
                                                <input
                                                    type="datetime-local"
                                                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl"
                                                    value={details.startDate}
                                                    onChange={(e) => setDetails({ ...details, startDate: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">End Date & Time</label>
                                                <input
                                                    type="datetime-local"
                                                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl"
                                                    value={details.endDate}
                                                    onChange={(e) => setDetails({ ...details, endDate: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                                        <div className="flex items-center gap-2 mb-4">
                                            <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight"><MapPin className="text-orange-600" /> Location</h3>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={format === 'virtual' ? 'e.g. Zoom, Google Meet' : 'e.g. London Excel Centre'}
                                            className="w-full p-4 border border-slate-200 rounded-2xl"
                                            value={details.location}
                                            onChange={(e) => setDetails({ ...details, location: e.target.value })}
                                        />
                                        <div className="mt-8 border-t border-slate-50 pt-6">
                                            <div className="flex items-center gap-2 mb-6">
                                                <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight"><Clock className="text-orange-600" /> Sessions</h3>
                                            </div>
                                            <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center gap-2">
                                                <Plus className="w-5 h-5" /> Add New Session
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: TICKET CUSTOMIZATION */}
                        {step === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-black text-slate-900 uppercase">Tier Configuration</h3>
                                    <button onClick={addTicketTier} className="text-orange-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:underline">
                                        <Plus className="w-4 h-4" /> New Tier
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {tickets.map(t => (
                                        <div key={t.id} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200 grid md:grid-cols-4 gap-6 relative group">
                                            <div className="md:col-span-2">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</span>
                                                    <Tooltip content="Name of the ticket tier (e.g., VIP, General)">
                                                        <Info className="w-3 h-3 text-slate-400 cursor-help" />
                                                    </Tooltip>
                                                </div>
                                                <input type="text" value={t.name} onChange={(e) => updateTicket(t.id, 'name', e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 font-bold" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</span>
                                                    <Tooltip content="Cost per ticket">
                                                        <Info className="w-3 h-3 text-slate-400 cursor-help" />
                                                    </Tooltip>
                                                </div>
                                                <input
                                                    type="number"
                                                    placeholder="Price ₦"
                                                    className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                                                    value={t.price}
                                                    onChange={(e) => updateTicket(t.id, 'price', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock</span>
                                                    <Tooltip content="Number of tickets available">
                                                        <Info className="w-3 h-3 text-slate-400 cursor-help" />
                                                    </Tooltip>
                                                </div>
                                                <input
                                                    type="number"
                                                    placeholder="Stock"
                                                    className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                                                    value={t.quantity}
                                                    onChange={(e) => updateTicket(t.id, 'quantity', e.target.value)}
                                                />
                                            </div>
                                            <div className="md:col-span-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Advanced: Sale window & Access Rules</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 5: BUNDLES */}
                        {step === 5 && (
                            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div className="text-center max-w-xl mx-auto">
                                    <h1 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tight">Bundled Products</h1>
                                    <p className="text-slate-500">Select products from your inventory to include with each ticket tier.</p>
                                </div>

                                {isInventoryLoading ? (
                                    <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-orange-600" /></div>
                                ) : inventory.length === 0 ? (
                                    <div className="text-center py-12 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                                        <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No products found in your inventory</p>
                                        <Link href="/dashboard/business/products" className="text-orange-600 font-black text-xs uppercase underline mt-2 inline-block">Manage Products</Link>
                                    </div>
                                ) : (
                                    <div className="space-y-10">
                                        {tickets.map(ticket => (
                                            <div key={ticket.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                                <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-2">
                                                    <Ticket className="text-orange-600 w-5 h-5" /> {ticket.name} Bundles
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {inventory.map(product => (
                                                        <div
                                                            key={product.id}
                                                            onClick={() => toggleProductInTier(ticket.id, product.id)}
                                                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${(ticket.productIds || []).includes(product.id)
                                                                ? "border-orange-600 bg-white shadow-md font-bold"
                                                                : "border-white bg-white/50 hover:border-slate-200"
                                                                }`}
                                                        >
                                                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                                                                {product.image ? (
                                                                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <ShoppingBag className="text-slate-400 w-6 h-6" />
                                                                )}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="font-bold text-slate-900 text-sm truncate">{product.name}</p>
                                                                <p className="text-[10px] font-black text-orange-600 uppercase">₦{product.price.toLocaleString()}</p>
                                                            </div>
                                                            <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${(ticket.productIds || []).includes(product.id)
                                                                ? "bg-orange-600 border-orange-600 text-white"
                                                                : "border-slate-200"
                                                                }`}>
                                                                <Check className="w-3 h-3" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* STEP 6: REVIEW */}
                        {step === 6 && (
                            <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <ShieldCheck />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase">Ready for Admin Review</h2>
                                <p className="text-slate-500 max-w-md mx-auto mb-10">Once submitted, your event enters the approval pipeline. You will be notified via email upon approval.</p>
                                <div className="max-w-sm mx-auto p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left space-y-3">
                                    <div className="flex justify-between text-sm"><span>Title:</span> <span className="font-bold truncate max-w-[150px]">{details.title || "Untitled Event"}</span></div>
                                    <div className="flex justify-between text-sm"><span>Type:</span> <span className="font-bold uppercase">{eventType}</span></div>
                                    <div className="flex justify-between text-sm"><span>Format:</span> <span className="font-bold uppercase">{format}</span></div>
                                    <div className="flex justify-between text-sm"><span>Tickets:</span> <span className="font-bold">{tickets.length} Tiers</span></div>
                                    <div className="flex justify-between text-sm"><span>Total Bundles:</span> <span className="font-bold">{tickets.reduce((acc, t) => acc + (t.productIds?.length || 0), 0)} Products</span></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="p-8 md:p-12 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <button onClick={handleBack} disabled={step === 0} className="text-slate-400 font-bold uppercase tracking-widest text-xs hover:text-slate-900 disabled:opacity-0 transition-all">
                        Back
                    </button>
                    <button
                        onClick={step === WIZARD_STEPS.length - 1 ? handleSubmit : handleNext}
                        className="bg-orange-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 shadow-xl shadow-orange-600/20 flex items-center gap-3 transition-all active:scale-95"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : (
                            step === WIZARD_STEPS.length - 1 ? "Submit for Approval" : <>Next Step <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}