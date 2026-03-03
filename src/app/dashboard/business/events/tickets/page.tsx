"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket,
  Plus,
  Settings2,
  ShieldCheck,
  Zap,
  Package,
  RotateCcw,
  Lock,
  AlertCircle,
  Check,
  ChevronRight,
  Trash2,
  Edit3,
  BarChart3,
  Tag,
  Globe,
  Loader2,
  ChevronDown,
  Calendar,
  CheckCircle2,
  X,
} from "lucide-react";
import Modal from "@/app/component/Modal";
import Tooltip from "@/app/component/Tooltip";
import { api } from "@/lib/api";

const TICKET_TEMPLATES = [
  { id: "GENERAL", label: "General Access", desc: "Standard entry for all attendees", icon: Ticket, color: "bg-blue-500" },
  { id: "VIP", label: "VIP Access", desc: "Premium perks and priority zones", icon: ShieldCheck, color: "bg-purple-500" },
  { id: "BUNDLE", label: "Bundle Ticket", desc: "Ticket + products or services", icon: Package, color: "bg-orange-500" },
  { id: "SUBSCRIPTION", label: "Subscription Pass", desc: "Multi-day or recurring access", icon: RotateCcw, color: "bg-emerald-500" },
  { id: "REWARD", label: "Reward Pass", desc: "Complimentary or loyalty-based", icon: Zap, color: "bg-amber-500" },
];

const TIER_COLOR: Record<string, string> = {
  GENERAL: "bg-blue-500",
  VIP: "bg-purple-500",
  BUNDLE: "bg-orange-500",
  SUBSCRIPTION: "bg-emerald-500",
  REWARD: "bg-amber-500",
};

const EMPTY_FORM = {
  name: "",
  description: "",
  type: "GENERAL",
  price: "",
  quantity: "",
  saleStart: "",
  saleEnd: "",
  transferable: true,
  refundable: true,
  accessZones: [] as string[],
  productIds: [] as string[],
  stockTracking: true,
  autoLock: true,
  waitlist: false,
  eventCapacity: "",
  rules: "",
};

export default function TicketManagerPage() {
  // Event selector state
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [isEventsLoading, setIsEventsLoading] = useState(true);

  // Tickets state
  const [tickets, setTickets] = useState<any[]>([]);
  const [isTicketsLoading, setIsTicketsLoading] = useState(false);

  // Inventory (for bundle product linking)
  const [inventory, setInventory] = useState<any[]>([]);

  // Builder modal state
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [builderStep, setBuilderStep] = useState(1);
  const [editingTier, setEditingTier] = useState<any>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Feedback
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      fetchTickets();
    }
  }, [selectedEventId]);

  useEffect(() => {
    if (builderStep === 3) {
      fetchInventory();
    }
  }, [builderStep]);

  const fetchEvents = async () => {
    setIsEventsLoading(true);
    try {
      const data = await api.get("/dashboard/business/events");
      const list = data.events || [];
      setEvents(list);
      if (list.length > 0) setSelectedEventId(list[0].id);
    } catch {
      console.error("Failed to fetch events");
    } finally {
      setIsEventsLoading(false);
    }
  };

  const fetchTickets = async () => {
    if (!selectedEventId) return;
    setIsTicketsLoading(true);
    try {
      const data = await api.get(`/dashboard/business/events/${selectedEventId}/ticket-tiers`);
      setTickets(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to fetch ticket tiers");
    } finally {
      setIsTicketsLoading(false);
    }
  };

  const fetchInventory = async () => {
    try {
      const data = await api.get("/dashboard/business/events/inventory/my-products");
      setInventory(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to fetch inventory");
    }
  };

  const openCreateModal = () => {
    setEditingTier(null);
    setForm({ ...EMPTY_FORM });
    setBuilderStep(1);
    setFormError(null);
    setIsBuilderOpen(true);
  };

  const openEditModal = (tier: any) => {
    setEditingTier(tier);
    setForm({
      name: tier.name || "",
      description: tier.description || "",
      type: tier.type || "GENERAL",
      price: String(tier.price ?? ""),
      quantity: String(tier.quantity ?? ""),
      saleStart: tier.saleStart ? tier.saleStart.split("T")[0] : "",
      saleEnd: tier.saleEnd ? tier.saleEnd.split("T")[0] : "",
      transferable: tier.transferable ?? true,
      refundable: tier.refundable ?? true,
      accessZones: tier.accessZones || [],
      productIds: (tier.bundledProducts || []).map((bp: any) => bp.productId || bp.product?.id),
      stockTracking: tier.stockTracking ?? true,
      autoLock: tier.autoLock ?? true,
      waitlist: tier.waitlist ?? false,
      eventCapacity: "",
      rules: tier.rules || "",
    });
    setBuilderStep(2); // Skip template step when editing
    setFormError(null);
    setIsBuilderOpen(true);
  };

  const closeModal = () => {
    setIsBuilderOpen(false);
    setBuilderStep(1);
    setEditingTier(null);
    setFormError(null);
  };

  const handleDelete = async (tierId: string) => {
    if (!confirm("Delete this ticket tier? This can't be undone.")) return;
    try {
      await api.delete(`/dashboard/business/events/${selectedEventId}/ticket-tiers/${tierId}`);
      showMessage("success", "Ticket tier deleted.");
      fetchTickets();
    } catch (err: any) {
      showMessage("error", err.message || "Failed to delete. It may have sold tickets.");
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.quantity) {
      setFormError("Please fill in Name, Price, and Quantity.");
      return;
    }
    setIsSaving(true);
    setFormError(null);
    try {
      const payload: any = {
        name: form.name,
        description: form.description,
        type: form.type,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity),
        saleStart: form.saleStart || undefined,
        saleEnd: form.saleEnd || undefined,
        transferable: form.transferable,
        refundable: form.refundable,
        accessZones: form.accessZones,
        productIds: form.productIds,
        stockTracking: form.stockTracking,
        autoLock: form.autoLock,
        waitlist: form.waitlist,
        rules: form.rules,
      };
      if (form.eventCapacity) payload.eventCapacity = parseInt(form.eventCapacity);

      if (editingTier) {
        await api.patch(`/dashboard/business/events/${selectedEventId}/ticket-tiers/${editingTier.id}`, payload);
        showMessage("success", "Ticket tier updated.");
      } else {
        await api.post(`/dashboard/business/events/${selectedEventId}/ticket-tiers`, payload);
        showMessage("success", "Ticket tier created.");
      }
      closeModal();
      fetchTickets();
    } catch (err: any) {
      setFormError(err.message || "Failed to save ticket tier.");
    } finally {
      setIsSaving(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const toggleZone = (zone: string) => {
    setForm(prev => ({
      ...prev,
      accessZones: prev.accessZones.includes(zone)
        ? prev.accessZones.filter(z => z !== zone)
        : [...prev.accessZones, zone],
    }));
  };

  const toggleProduct = (productId: string) => {
    setForm(prev => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter(id => id !== productId)
        : [...prev.productIds, productId],
    }));
  };

  // Computed stats from live data
  const totalCapacity = tickets.reduce((acc, t) => acc + (t.quantity || 0), 0);
  const totalSold = tickets.reduce((acc, t) => acc + (t._count?.tickets || 0), 0);
  const pendingRevenue = tickets.reduce((acc, t) => acc + ((t._count?.tickets || 0) * (t.price || 0)), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Ticket Manager</h1>
          <p className="text-slate-500">Create templates, configure pricing, and manage per-event inventory.</p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
              {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {message.text}
            </div>
          )}
          <button
            onClick={openCreateModal}
            disabled={!selectedEventId}
            className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" /> Create Ticket Tier
          </button>
        </div>
      </div>

      {/* Event Selector */}
      <div className="relative inline-block w-full max-w-md group">
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Select Event</label>
        <select
          value={selectedEventId}
          onChange={e => setSelectedEventId(e.target.value)}
          className="w-full appearance-none bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer shadow-sm pr-12"
        >
          {isEventsLoading ? (
            <option>Loading events...</option>
          ) : events.length > 0 ? (
            events.map(ev => (
              <option key={ev.id} value={ev.id}>{ev.title || ev.name}</option>
            ))
          ) : (
            <option value="">No events found</option>
          )}
        </select>
        <ChevronDown className="absolute right-4 bottom-4 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Tiers", value: tickets.length, icon: Tag, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Capacity", value: totalCapacity.toLocaleString(), icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Tickets Sold", value: totalSold.toLocaleString(), icon: Check, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Est. Revenue", value: `₦${pendingRevenue.toLocaleString()}`, icon: Globe, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Configured Ticket Tiers</h2>
          <button onClick={fetchTickets} className="p-2 text-slate-400 hover:text-orange-600 transition-colors">
            <Settings2 className="w-5 h-5" />
          </button>
        </div>

        {isTicketsLoading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
          </div>
        ) : !selectedEventId ? (
          <div className="py-20 text-center">
            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Select an event to manage ticket tiers</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-20 text-center">
            <Ticket className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs mb-4">No ticket tiers configured yet</p>
            <button onClick={openCreateModal} className="text-orange-600 font-bold text-sm hover:underline">
              Create your first tier →
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tier Details</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sale Window</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bundles</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tickets.map(ticket => {
                  const sold = ticket._count?.tickets || 0;
                  const qty = ticket.quantity || 0;
                  const pct = qty > 0 ? (sold / qty) * 100 : 0;
                  const tierColor = TIER_COLOR[ticket.type] || "bg-slate-400";
                  return (
                    <tr key={ticket.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${tierColor}`}>
                            <Ticket className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{ticket.name}</p>
                            <p className="text-xs text-slate-400 font-medium capitalize">{(ticket.type || "general").toLowerCase()} Access</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-bold text-slate-900 text-lg">₦{Number(ticket.price || 0).toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <div className="flex justify-between text-[10px] font-bold mb-1">
                            <span className="text-slate-400">{sold} Sold</span>
                            <span className="text-slate-900">{qty} Total</span>
                          </div>
                          <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500 transition-all duration-1000"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        {ticket.saleStart ? (
                          <>
                            <p className="text-xs font-bold text-slate-600">{new Date(ticket.saleStart).toLocaleDateString()}</p>
                            <p className="text-[10px] text-slate-400">until {ticket.saleEnd ? new Date(ticket.saleEnd).toLocaleDateString() : "∞"}</p>
                          </>
                        ) : (
                          <span className="text-xs text-slate-400">Always on sale</span>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-bold text-slate-500">
                          {ticket.bundledProducts?.length || 0} product{ticket.bundledProducts?.length !== 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                          {ticket.status || "Active"}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(ticket)}
                            className="p-2 hover:bg-white hover:text-orange-600 rounded-lg border border-transparent hover:border-slate-200 transition-all shadow-sm"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(ticket.id)}
                            className="p-2 hover:bg-white hover:text-red-600 rounded-lg border border-transparent hover:border-slate-200 transition-all shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Ticket Builder Modal */}
      <Modal
        isOpen={isBuilderOpen}
        onClose={closeModal}
        title={editingTier ? `Edit: ${editingTier.name}` : "Ticket Builder"}
      >
        <div className="space-y-6">
          {/* Steps Indicator */}
          {!editingTier && (
            <div className="flex gap-2 h-1">
              {[1, 2, 3].map(s => (
                <div key={s} className={`flex-1 rounded-full transition-all duration-500 ${s <= builderStep ? "bg-orange-600" : "bg-slate-100"}`} />
              ))}
            </div>
          )}

          {formError && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-100 px-4 py-3 rounded-xl text-sm font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: Template Selection */}
            {builderStep === 1 && !editingTier && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900">Select a Template</h3>
                  <p className="text-sm text-slate-500">Choose the access type for this ticket tier.</p>
                </div>
                <div className="grid gap-3">
                  {TICKET_TEMPLATES.map(tmp => (
                    <div
                      key={tmp.id}
                      onClick={() => setForm(prev => ({ ...prev, type: tmp.id }))}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${form.type === tmp.id ? "border-orange-600 bg-orange-50 shadow-md" : "border-slate-100 hover:border-orange-200"}`}
                    >
                      <div className={`w-10 h-10 rounded-xl ${tmp.color} text-white flex items-center justify-center shrink-0`}>
                        <tmp.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-sm">{tmp.label}</p>
                        <p className="text-xs text-slate-500">{tmp.desc}</p>
                      </div>
                      {form.type === tmp.id && <Check className="text-orange-600 w-5 h-5" />}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setBuilderStep(2)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 2: Customization */}
            {builderStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tier Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. VIP Platinum"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</label>
                    <input
                      type="text"
                      value={form.description}
                      onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Short description..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Price (₦) *</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))}
                      min="0"
                      placeholder="0"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Quantity *</label>
                    <input
                      type="number"
                      value={form.quantity}
                      onChange={e => setForm(prev => ({ ...prev, quantity: e.target.value }))}
                      min="1"
                      placeholder="100"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sale Start</label>
                    <input
                      type="date"
                      value={form.saleStart}
                      onChange={e => setForm(prev => ({ ...prev, saleStart: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sale End</label>
                    <input
                      type="date"
                      value={form.saleEnd}
                      onChange={e => setForm(prev => ({ ...prev, saleEnd: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                    Access Zones
                    <Tooltip content="Which parts of the venue does this ticket grant access to?"><AlertCircle className="w-3 h-3" /></Tooltip>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Main Hall", "Workshop Room A", "VIP Lounge", "Gala Dinner", "Networking Zone"].map(zone => (
                      <button
                        key={zone}
                        type="button"
                        onClick={() => toggleZone(zone)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${form.accessZones.includes(zone) ? "border-orange-500 bg-orange-50 text-orange-700" : "border-slate-200 hover:border-orange-400 text-slate-500"}`}
                      >
                        {form.accessZones.includes(zone) && <Check className="w-3 h-3 inline mr-1" />}
                        {zone}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  {[
                    { key: "transferable", label: "Transferable", desc: "Allow users to send tickets to others" },
                    { key: "refundable", label: "Refundable", desc: "Enable refund requests via dashboard" },
                  ].map(opt => (
                    <div key={opt.key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{opt.label}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{opt.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, [opt.key]: !prev[opt.key as keyof typeof prev] }))}
                        className={`w-10 h-5 rounded-full relative transition-colors ${(form as any)[opt.key] ? "bg-orange-600" : "bg-slate-200"}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${(form as any)[opt.key] ? "right-1" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  {!editingTier && (
                    <button onClick={() => setBuilderStep(1)} className="flex-1 py-3 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all text-xs uppercase tracking-widest">Back</button>
                  )}
                  <button onClick={() => setBuilderStep(3)} className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all text-xs uppercase tracking-widest">
                    Inventory &amp; Bundles
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Inventory & Bundles */}
            {builderStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">

                {/* Bundle Products */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                    Bundle Contents
                    <Tooltip content="Products issued to holders of this ticket tier"><Package className="w-3 h-3" /></Tooltip>
                  </label>
                  {inventory.length === 0 ? (
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No products in inventory</p>
                    </div>
                  ) : (
                    <div className="grid gap-2 max-h-40 overflow-y-auto pr-1">
                      {inventory.map(product => (
                        <div
                          key={product.id}
                          onClick={() => toggleProduct(product.id)}
                          className={`p-3 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${form.productIds.includes(product.id) ? "border-orange-500 bg-orange-50" : "border-slate-100 hover:border-slate-200"}`}
                        >
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                            {product.image ? <img src={product.image} className="w-full h-full object-cover rounded-lg" /> : <Package className="w-4 h-4 text-slate-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 text-xs truncate">{product.name}</p>
                            <p className="text-[10px] text-orange-600 font-bold">₦{Number(product.price || 0).toLocaleString()}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.productIds.includes(product.id) ? "bg-orange-600 border-orange-600" : "border-slate-300"}`}>
                            {form.productIds.includes(product.id) && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Inventory Guard */}
                <div className="p-5 bg-orange-50 rounded-3xl border border-orange-100 space-y-4">
                  <h4 className="font-bold text-orange-900 flex items-center gap-2 text-sm">
                    <Lock className="w-4 h-4" /> Inventory Guard
                  </h4>
                  {[
                    { key: "stockTracking", label: "Real-time Stock Tracking" },
                    { key: "autoLock", label: "Checkout Auto-Lock" },
                    { key: "waitlist", label: "Waitlist Activation" },
                  ].map(opt => (
                    <div key={opt.key} className="flex items-center justify-between">
                      <p className="text-sm font-medium text-orange-800">{opt.label}</p>
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, [opt.key]: !(prev as any)[opt.key] }))}
                        className={`w-10 h-5 rounded-full relative transition-colors ${(form as any)[opt.key] ? "bg-orange-600" : "bg-slate-300"}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${(form as any)[opt.key] ? "right-1" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Event Capacity Override</label>
                  <input
                    type="number"
                    value={form.eventCapacity}
                    onChange={e => setForm(prev => ({ ...prev, eventCapacity: e.target.value }))}
                    placeholder="Leave blank to keep current"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                  />
                  <p className="text-[10px] text-slate-400">Optional. Sets the maximum combined ticket count for the entire event.</p>
                </div>

                <div className="pt-4 flex gap-3">
                  <button onClick={() => setBuilderStep(2)} className="flex-1 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all text-xs uppercase tracking-widest">Back</button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="flex-1 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingTier ? "Update Tier" : "Publish Tier"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </div>
  );
}
