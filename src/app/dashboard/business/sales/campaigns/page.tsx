"use client";

import { useState } from "react";
import { 
    Zap, 
    Calendar, 
    Percent, 
    ShoppingBag, 
    MapPin, 
    Plus, 
    CheckCircle2, 
    Clock, 
    TrendingUp,
    MoreVertical,
    Target,
    Filter,
    ArrowRight,
    Info,
    Ticket
} from "lucide-react";
import Modal from "@/app/component/Modal";
import Tooltip from "@/app/component/Tooltip";

const CAMPAIGN_TYPES = [
    { id: "promo", label: "General Promotion", desc: "Run a simple discount code for your event.", icon: Percent, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "flash", label: "Flash Sale", desc: "Limited time offer with a countdown timer.", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
    { id: "bundle", label: "Bundle Offer", desc: "Tickets combined with products/services.", icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50" },
    { id: "geo", label: "Geo-Targeted", desc: "Offers available to specific regions only.", icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50" },
];

export default function CampaignManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [campaigns, setCampaigns] = useState([
        { id: 1, name: "Early Spring Flash Sale", type: "Flash", status: "Live", discount: "20%", expiry: "2h 40m", sales: 124 },
        { id: 2, name: "VIP Bundle Promo", type: "Bundle", status: "Scheduled", discount: "15%", start: "Feb 10", sales: 0 },
        { id: 3, name: "London Expo Special", type: "Geo-Target", status: "Live", discount: "£10 Off", location: "UK Only", sales: 452 },
    ]);

    const handleCreate = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Campaign Management</h1>
                    <p className="text-slate-500 text-lg">Scale your attendance with targeted promotions and flash sales.</p>
                </div>
                <button 
                    onClick={handleCreate}
                    className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Launch New Campaign
                </button>
            </div>

            {/* Campaign Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {CAMPAIGN_TYPES.map((type) => (
                    <div key={type.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-orange-200 transition-all">
                        <div className={`w-16 h-16 rounded-[1.5rem] ${type.bg} ${type.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <type.icon className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-tight">{type.label}</h3>
                        <p className="text-slate-500 text-xs mb-8">{type.desc}</p>
                        <button onClick={handleCreate} className="mt-auto px-6 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all">
                            Configure
                        </button>
                    </div>
                ))}
            </div>

            {/* Active Campaigns Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Active & Scheduled Campaigns</h2>
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Filter className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign Name</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Offer</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {campaigns.map((camp) => (
                                <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                                            <p className="font-bold text-slate-900">{camp.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{camp.type}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            camp.status === 'Live' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {camp.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-black text-orange-600">{camp.discount}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                                            <span className="font-bold text-slate-900">{camp.sales} Tix</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-900"><MoreVertical className="w-5 h-5" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Campaign Creation Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Launch New Campaign">
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Campaign Name</label>
                        <input type="text" placeholder="e.g. Winter Flash Sale" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Target Ticket / Tier</label>
                            <Tooltip content="Which ticket tier will this discount apply to?">
                                <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                            </Tooltip>
                        </div>
                        <div className="relative">
                            <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <select className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-bold appearance-none">
                                <option>General Access (Early Bird)</option>
                                <option>VIP Platinum Pass</option>
                                <option>Workshop Entry Only</option>
                                <option>All Event Tiers</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Discount Type</label>
                            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold appearance-none">
                                <option>Percentage %</option>
                                <option>Fixed Amount £</option>
                                <option>Buy 1 Get 1</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Value</label>
                            <input type="number" placeholder="20" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Scheduling</label>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="datetime-local" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold" />
                            <input type="datetime-local" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold" />
                        </div>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-emerald-600">Geo-Targeting (Active)</p>
                            <p className="text-xs text-emerald-800 font-medium">This campaign will only be visible to users in the <span className="font-bold">Greater London Area</span>.</p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg">
                            Launch Campaign <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
