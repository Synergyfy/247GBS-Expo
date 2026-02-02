"use client";

import { useState } from "react";
import { 
    Gavel, 
    Settings, 
    Ticket, 
    Percent, 
    Clock, 
    ShieldAlert, 
    Save, 
    Plus, 
    Trash2,
    CheckCircle2,
    X,
    Loader2,
    Info,
    ChevronDown
} from "lucide-react";
import Modal from "@/app/component/Modal";
import Tooltip from "@/app/component/Tooltip";

interface TicketTemplate {
    name: string;
    access: string;
    priceRange: string;
    status: string;
    description?: string;
    minPrice?: number;
    maxPrice?: number;
}

export default function GovernancePage() {
    const [activeTab, setActiveTab] = useState("parameters");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    const [templates, setTemplates] = useState<TicketTemplate[]>([
        { name: "Standard Day Pass", access: "General", priceRange: "£0 - £50", status: "Active" },
        { name: "VIP Experience", access: "Full Hall + Lounge", priceRange: "£99 - £500", status: "Active" },
        { name: "Reward Pass", access: "Specific Booth", priceRange: "Gift Only", status: "Active" },
    ]);

    const [newTemplate, setNewTemplate] = useState<TicketTemplate>({
        name: "",
        access: "General Access",
        priceRange: "",
        status: "Active",
        description: "",
        minPrice: 0,
        maxPrice: 0
    });

    const accessOptions = [
        "General Access",
        "Full Hall + Lounge",
        "Specific Booth Only",
        "Workshop Access",
        "VIP Area + Networking",
        "Premium All-Access"
    ];

    const handleCreateTemplate = () => {
        if (!newTemplate.name || !newTemplate.access) return;
        
        setIsSaving(true);
        setTimeout(() => {
            const rangeString = newTemplate.minPrice === 0 && newTemplate.maxPrice === 0 
                ? "Gift Only" 
                : `£${newTemplate.minPrice} - £${newTemplate.maxPrice}`;
            
            const templateToAdd = {
                ...newTemplate,
                priceRange: rangeString
            };

            setTemplates([...templates, templateToAdd]);
            setNewTemplate({ name: "", access: "General Access", priceRange: "", status: "Active", description: "", minPrice: 0, maxPrice: 0 });
            setIsModalOpen(false);
            setIsSaving(false);
        }, 1000);
    };

    const handleDeleteTemplate = (index: number) => {
        setTemplates(templates.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Governance Console</h1>
                    <p className="text-slate-500">Configure global platform rules, commission structures, and ticket templates.</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all">
                    <Save className="w-5 h-5" /> Save Global Changes
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200">
                {[
                    { id: "parameters", label: "System Parameters", icon: <Settings className="w-4 h-4" /> },
                    { id: "templates", label: "Ticket Templates", icon: <Ticket className="w-4 h-4" /> },
                    { id: "financial", label: "Commission & Tax", icon: <Percent className="w-4 h-4" /> },
                    { id: "policies", label: "SLA & Policies", icon: <ShieldAlert className="w-4 h-4" /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${
                            activeTab === tab.id ? "text-orange-600" : "text-slate-400 hover:text-slate-900"
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                
                {/* SYSTEM PARAMETERS */}
                {activeTab === "parameters" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange-600" /> Redemption & Expiry
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-400 mb-2">Default Refund Window (Hours)</label>
                                    <input type="number" defaultValue={48} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-400 mb-2">Ticket Validity Post-Event (Days)</label>
                                    <input type="number" defaultValue={30} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-orange-600" /> Access & Security
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Enforce MFA for Admins</p>
                                        <p className="text-xs text-slate-500">Require multi-factor for all roles</p>
                                    </div>
                                    <div className="w-12 h-6 bg-orange-600 rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Geo-Fencing Validation</p>
                                        <p className="text-xs text-slate-500">Restrict verification by IP location</p>
                                    </div>
                                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TICKET TEMPLATES */}
                {activeTab === "templates" && (
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                            >
                                <Plus className="w-5 h-5" /> Create New Template
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {templates.map((temp, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-orange-200 transition-all group relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                            <Ticket className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-black px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md uppercase tracking-widest">{temp.status}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-1">{temp.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium mb-4">Access: {temp.access}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{temp.priceRange}</span>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><Settings className="w-4 h-4" /></button>
                                            <button 
                                                onClick={() => handleDeleteTemplate(i)}
                                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FINANCIAL */}
                {activeTab === "financial" && (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-100">
                            <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Fee & Tax Configuration</h3>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <label className="block text-xs font-black uppercase text-slate-400 tracking-widest">Platform Commission (%)</label>
                                    <div className="relative">
                                        <input type="number" defaultValue={10} className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none" />
                                        <Percent className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-xs font-black uppercase text-slate-400 tracking-widest">Partner/Affiliate Share (%)</label>
                                    <div className="relative">
                                        <input type="number" defaultValue={5} className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none" />
                                        <Percent className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-xs font-black uppercase text-slate-400 tracking-widest">Global VAT/Tax Rate (%)</label>
                                    <div className="relative">
                                        <input type="number" defaultValue={7.5} className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none" />
                                        <Percent className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-4">
                                <ShieldAlert className="w-6 h-6 text-orange-600 shrink-0 mt-1" />
                                <div>
                                    <p className="text-sm font-bold text-orange-900 uppercase tracking-widest mb-1">Impact Warning</p>
                                    <p className="text-xs text-orange-700 leading-relaxed font-medium">
                                        Changing commission rates will apply to all **new transactions** immediately. Payouts for existing held funds will be calculated based on the rate active at the time of sale.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* POLICIES (Placeholder) */}
                {activeTab === "policies" && (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <ShieldAlert className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Legal & SLA Standards</h3>
                        <p className="text-slate-500 max-w-sm mx-auto font-medium">Manage platform terms, exhibitor SLAs, and privacy standards here.</p>
                    </div>
                )}

            </div>

            {/* CREATE TEMPLATE MODAL */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create Ticket Template"
            >
                <div className="space-y-6">
                    <div className="space-y-5">
                        {/* Template Name */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="block text-xs font-black uppercase text-slate-700 tracking-widest">Template Name <span className="text-orange-600">*</span></label>
                                <Tooltip content="The public name of the ticket tier (e.g. VIP Pass, Student Discount)">
                                    <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                </Tooltip>
                            </div>
                            <input 
                                type="text" 
                                placeholder="e.g. Early Bird Access"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-slate-900"
                                value={newTemplate.name}
                                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                            />
                            <p className="mt-1.5 text-[10px] text-slate-400 font-medium">Keep it short and descriptive for the marketplace.</p>
                        </div>

                        {/* Access Level */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="block text-xs font-black uppercase text-slate-700 tracking-widest">Access Level <span className="text-orange-600">*</span></label>
                                <Tooltip content="Determines what areas of the expo the holder can enter.">
                                    <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                </Tooltip>
                            </div>
                            <div className="relative">
                                <select 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-slate-900 appearance-none cursor-pointer"
                                    value={newTemplate.access}
                                    onChange={(e) => setNewTemplate({...newTemplate, access: e.target.value})}
                                >
                                    {accessOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="block text-xs font-black uppercase text-slate-700 tracking-widest">Suggested Price Range</label>
                                <Tooltip content="Set the minimum and maximum price boundaries for this template.">
                                    <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                </Tooltip>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="flex-1 relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">£</span>
                                    <input 
                                        type="number" 
                                        placeholder="Min"
                                        className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-slate-900"
                                        value={newTemplate.minPrice}
                                        onChange={(e) => setNewTemplate({...newTemplate, minPrice: Number(e.target.value)})}
                                    />
                                </div>
                                <div className="text-slate-300 font-bold">—</div>
                                <div className="flex-1 relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">£</span>
                                    <input 
                                        type="number" 
                                        placeholder="Max"
                                        className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-slate-900"
                                        value={newTemplate.maxPrice}
                                        onChange={(e) => setNewTemplate({...newTemplate, maxPrice: Number(e.target.value)})}
                                    />
                                </div>
                            </div>
                            <p className="mt-1.5 text-[10px] text-slate-400 font-medium">Leave at 0 for 'Gift Only' / Reward templates.</p>
                        </div>

                        {/* Description */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="block text-xs font-black uppercase text-slate-700 tracking-widest">Internal Description</label>
                                <Tooltip content="Explain the purpose of this template for other admins.">
                                    <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                </Tooltip>
                            </div>
                            <textarea 
                                placeholder="Purpose of this ticket tier..."
                                rows={3}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-slate-900 resize-none"
                                value={newTemplate.description}
                                onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3 px-6 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all border border-slate-200"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleCreateTemplate}
                            disabled={!newTemplate.name || !newTemplate.access || isSaving}
                            className="flex-1 py-3 px-6 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Template <CheckCircle2 className="w-4 h-4" /></>}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
