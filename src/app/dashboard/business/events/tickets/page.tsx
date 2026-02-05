"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ticket, 
  Plus, 
  Settings2, 
  ShieldCheck, 
  Zap, 
  Package, 
  Clock, 
  Globe, 
  RotateCcw, 
  Lock, 
  AlertCircle,
  Check,
  ChevronRight,
  Trash2,
  Edit3,
  BarChart3,
  Tag
} from "lucide-react";
import Modal from "@/app/component/Modal";
import Tooltip from "@/app/component/Tooltip";

const TICKET_TEMPLATES = [
  { id: "general", label: "General Access", desc: "Standard entry for all attendees", icon: Ticket, color: "bg-blue-500" },
  { id: "vip", label: "VIP Access", desc: "Premium perks and priority zones", icon: ShieldCheck, color: "bg-purple-500" },
  { id: "bundle", label: "Bundle Ticket", desc: "Ticket + products or services", icon: Package, color: "bg-orange-500" },
  { id: "subscription", label: "Subscription Pass", desc: "Multi-day or recurring access", icon: RotateCcw, color: "bg-emerald-500" },
  { id: "reward", label: "Reward Pass", desc: "Complimentary or loyalty-based", icon: Zap, color: "bg-amber-500" },
];

export default function TicketManagerPage() {
  const [tickets, setTickets] = useState([
    { 
        id: 1, 
        name: "Early Bird General", 
        type: "general", 
        price: 49, 
        stock: 500, 
        sold: 120, 
        status: "Active",
        saleStart: "2026-03-01",
        saleEnd: "2026-04-01"
    },
    { 
        id: 2, 
        name: "VIP Platinum", 
        type: "vip", 
        price: 249, 
        stock: 50, 
        sold: 12, 
        status: "Active",
        saleStart: "2026-03-01",
        saleEnd: "2026-04-10"
    }
  ]);

  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [builderStep, setBuilderStep] = useState(1); // 1: Template, 2: Customization, 3: Inventory

  const handleCreateTicket = () => {
    setIsBuilderOpen(true);
    setBuilderStep(1);
    setSelectedTemplate(null);
  };

  const closeModal = () => {
    setIsBuilderOpen(false);
    setBuilderStep(1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Ticket Manager</h1>
          <p className="text-slate-500">Create templates, configure pricing, and manage event inventory.</p>
        </div>
        <button 
          onClick={handleCreateTicket}
          className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Create Ticket Template
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Tiers", value: tickets.length, icon: Tag, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Capacity", value: "550", icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Tickets Sold", value: "132", icon: Check, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Revenue", value: "£8,876", icon: Globe, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tickets Table/List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Configured Ticket Tiers</h2>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Settings2 className="w-5 h-5" /></button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tier Details</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sale Window</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                        ticket.type === 'vip' ? 'bg-purple-500' : 'bg-blue-500'
                      }`}>
                        <Ticket className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{ticket.name}</p>
                        <p className="text-xs text-slate-400 font-medium capitalize">{ticket.type} Access</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-slate-900 text-lg">£{ticket.price}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div>
                      <div className="flex justify-between text-[10px] font-bold mb-1">
                        <span className="text-slate-400">{ticket.sold} Sold</span>
                        <span className="text-slate-900">{ticket.stock} Total</span>
                      </div>
                      <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 transition-all duration-1000" 
                          style={{ width: `${(ticket.sold / ticket.stock) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-bold text-slate-600">{ticket.saleStart}</p>
                    <p className="text-[10px] text-slate-400">until {ticket.saleEnd}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white hover:text-orange-600 rounded-lg border border-transparent hover:border-slate-200 transition-all shadow-sm">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white hover:text-red-600 rounded-lg border border-transparent hover:border-slate-200 transition-all shadow-sm">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Builder Modal */}
      <Modal 
        isOpen={isBuilderOpen} 
        onClose={closeModal} 
        title="Ticket Builder Wizard"
      >
        <div className="space-y-8">
            {/* Steps Indicator */}
            <div className="flex gap-2 h-1 mb-8">
                {[1, 2, 3].map(s => (
                    <div key={s} className={`flex-1 rounded-full transition-all duration-500 ${s <= builderStep ? 'bg-orange-600' : 'bg-slate-100'}`} />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* STEP 1: TEMPLATE SELECTION (6.1) */}
                {builderStep === 1 && (
                    <motion.div 
                        key="step1" 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-slate-900">Select Template</h3>
                            <p className="text-sm text-slate-500">Choose a base template approved by administration.</p>
                        </div>
                        <div className="grid gap-3">
                            {TICKET_TEMPLATES.map(tmp => (
                                <div 
                                    key={tmp.id}
                                    onClick={() => setSelectedTemplate(tmp.id)}
                                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                                        selectedTemplate === tmp.id ? "border-orange-600 bg-orange-50 shadow-md" : "border-slate-100 hover:border-orange-200"
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl ${tmp.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                                        <tmp.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-900 text-sm">{tmp.label}</p>
                                        <p className="text-xs text-slate-500">{tmp.desc}</p>
                                    </div>
                                    {selectedTemplate === tmp.id && <Check className="text-orange-600 w-5 h-5" />}
                                </div>
                            ))}
                        </div>
                        <button 
                            disabled={!selectedTemplate}
                            onClick={() => setBuilderStep(2)}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            Continue to Customization <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {/* STEP 2: CUSTOMIZATION (6.2) */}
                {builderStep === 2 && (
                    <motion.div 
                        key="step2" 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Base Price (£)</label>
                                <input type="number" defaultValue="0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Initial Quantity</label>
                                <input type="number" defaultValue="100" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                Access Zones
                                <Tooltip content="Which parts of the venue does this ticket grant access to?"><AlertCircle className="w-3 h-3" /></Tooltip>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {["Main Hall", "Workshop Room A", "VIP Lounge", "Gala Dinner"].map(zone => (
                                    <button key={zone} type="button" className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold hover:border-orange-500 hover:text-orange-600 transition-all">
                                        {zone}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sale Start</label>
                                <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sale End</label>
                                <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                Bundle Contents
                                <Tooltip content="Attach products or services to this ticket tier."><Package className="w-3 h-3" /></Tooltip>
                            </label>
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl border-dashed flex flex-col items-center justify-center text-center">
                                <Plus className="w-5 h-5 text-slate-300 mb-1" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-orange-600 transition-colors">Link Digital Assets or Products</p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            {[
                                { label: "Transferable", desc: "Allow users to send tickets to others" },
                                { label: "Refundable", desc: "Enable refund requests via dashboard" }
                            ].map((opt, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{opt.label}</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{opt.desc}</p>
                                    </div>
                                    <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button onClick={() => setBuilderStep(1)} className="flex-1 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">Back</button>
                            <button onClick={() => setBuilderStep(3)} className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all uppercase tracking-widest text-xs">Inventory Config</button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: INVENTORY (6.3) */}
                {builderStep === 3 && (
                    <motion.div 
                        key="step3" 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 space-y-4">
                            <h4 className="font-bold text-orange-900 flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Inventory Guard
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-800">Real-time Stock Tracking</p>
                                    <div className="w-10 h-5 bg-orange-600 rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-800">Checkout Auto-Lock</p>
                                    <div className="w-10 h-5 bg-orange-600 rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-800">Waitlist Activation</p>
                                    <div className="w-10 h-5 bg-slate-300 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Capacity Limit</label>
                            <input type="number" defaultValue="1000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold" />
                            <p className="text-[10px] text-slate-400">The maximum tickets of all types combined for this event.</p>
                        </div>

                        <div className="pt-6 flex gap-3">
                            <button onClick={() => setBuilderStep(2)} className="flex-1 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">Back</button>
                            <button onClick={closeModal} className="flex-1 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 uppercase tracking-widest text-xs">Publish Tier</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </Modal>
    </div>
  );
}
