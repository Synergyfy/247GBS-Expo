"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Check,
    X,
    CreditCard,
    Users,
    Briefcase,
    Zap,
    Info,
    ChevronRight,
    Sparkles,
    ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PASS_PLANS, PassPlan } from "@/data/passes";

export default function AdminPassesPage() {
    const [plans, setPlans] = useState<PassPlan[]>(PASS_PLANS);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<"all" | "visitor" | "business">("all");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPlan, setCurrentPlan] = useState<PassPlan | null>(null);
    const [newFeature, setNewFeature] = useState("");

    const filteredPlans = plans.filter(plan => {
        const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || plan.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const handleEdit = (plan: PassPlan) => {
        setCurrentPlan({ ...plan });
        setIsEditModalOpen(true);
    };

    const handleAddNew = () => {
        setCurrentPlan({
            id: `plan_${Date.now()}`,
            name: "",
            price: 0,
            description: "",
            features: [],
            popular: false,
            type: "visitor"
        });
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this pass plan?")) {
            setPlans(plans.filter(p => p.id !== id));
        }
    };

    const handleSave = () => {
        if (!currentPlan) return;

        if (plans.find(p => p.id === currentPlan.id)) {
            setPlans(plans.map(p => p.id === currentPlan.id ? currentPlan : p));
        } else {
            setPlans([...plans, currentPlan]);
        }
        setIsEditModalOpen(false);
        setCurrentPlan(null);
    };

    const addFeature = () => {
        if (newFeature.trim() && currentPlan) {
            setCurrentPlan({
                ...currentPlan,
                features: [...currentPlan.features, newFeature.trim()]
            });
            setNewFeature("");
        }
    };

    const removeFeature = (index: number) => {
        if (currentPlan) {
            setCurrentPlan({
                ...currentPlan,
                features: currentPlan.features.filter((_, i) => i !== index)
            });
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 uppercase">Pass Configuration</h1>
                    <p className="text-slate-500 font-medium">Manage entry passes and distribution plans for the entire platform.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span>Create New Plan</span>
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Plans</p>
                            <p className="text-2xl font-black text-slate-900">{plans.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Visitor Passes</p>
                            <p className="text-2xl font-black text-slate-900">{plans.filter(p => p.type === 'visitor').length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Business Passes</p>
                            <p className="text-2xl font-black text-slate-900">{plans.filter(p => p.type === 'business').length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search plan by name..."
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
                    <button
                        onClick={() => setTypeFilter("all")}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${typeFilter === 'all' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
                    > All </button>
                    <button
                        onClick={() => setTypeFilter("visitor")}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${typeFilter === 'visitor' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
                    > Visitor </button>
                    <button
                        onClick={() => setTypeFilter("business")}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${typeFilter === 'business' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
                    > Business </button>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredPlans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col h-full group"
                        >
                            <div className="p-8 flex-1">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${plan.type === 'visitor' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                                        }`}>
                                        {plan.type} Pass
                                    </div>
                                    {plan.popular && (
                                        <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" /> Popular Choice
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-3xl font-black text-slate-900">£{plan.price}</span>
                                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">/ one-time</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">{plan.description}</p>

                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Included Features</p>
                                    <ul className="space-y-2">
                                        {plan.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                                <div className="w-5 h-5 bg-orange-50 rounded-md flex items-center justify-center text-orange-600 shrink-0">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                                <button
                                    onClick={() => handleEdit(plan)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-900 py-3 rounded-xl font-bold text-sm border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                                >
                                    <Edit2 className="w-4 h-4" /> Edit Plan
                                </button>
                                <button
                                    onClick={() => handleDelete(plan.id)}
                                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Empty State / Add New Card */}
                {filteredPlans.length === 0 && (
                    <div className="lg:col-span-3 py-20 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-slate-300 mb-6 shadow-sm">
                            <CreditCard className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">No plans found</h3>
                        <p className="text-slate-500 mb-8 max-w-sm">Try adjusting your filters or create a new distribution plan for the platform.</p>
                        <button
                            onClick={handleAddNew}
                            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create Your First Plan</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Edit/Add Modal */}
            <AnimatePresence>
                {isEditModalOpen && currentPlan && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tighter">{currentPlan.id.startsWith('plan_') ? 'Create New' : 'Edit'} Pass Plan</h2>
                                    <p className="text-slate-400 text-sm font-medium">Configure plan pricing and distribution features.</p>
                                </div>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Plan Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-bold"
                                            value={currentPlan.name}
                                            onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                                            placeholder="e.g. Annual All-Access Pass"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price (£)</label>
                                        <input
                                            type="number"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-bold"
                                            value={currentPlan.price}
                                            onChange={(e) => setCurrentPlan({ ...currentPlan, price: parseFloat(e.target.value) })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Pass Type</label>
                                        <select
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-bold appearance-none"
                                            value={currentPlan.type}
                                            onChange={(e) => setCurrentPlan({ ...currentPlan, type: e.target.value as any })}
                                        >
                                            <option value="visitor">Visitor</option>
                                            <option value="business">Business</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Short Description</label>
                                        <textarea
                                            rows={3}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium resize-none"
                                            value={currentPlan.description}
                                            onChange={(e) => setCurrentPlan({ ...currentPlan, description: e.target.value })}
                                            placeholder="Explain what this pass offers..."
                                        />
                                    </div>

                                    <div className="col-span-2 mt-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Plan Features</label>
                                            <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-black uppercase">{currentPlan.features.length} Added</span>
                                        </div>
                                        <div className="flex gap-2 mb-4">
                                            <input
                                                type="text"
                                                className="flex-1 px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none font-medium text-sm"
                                                placeholder="Add a benefit (e.g. VIP Lounge Access)"
                                                value={newFeature}
                                                onChange={(e) => setNewFeature(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                                            />
                                            <button
                                                onClick={addFeature}
                                                className="bg-slate-900 text-white px-6 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all"
                                            > Add </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {currentPlan.features.map((feature, idx) => (
                                                <div key={idx} className="bg-orange-50 text-orange-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-orange-100 group">
                                                    {feature}
                                                    <button onClick={() => removeFeature(idx)} className="text-orange-400 hover:text-red-500 transition-colors">
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-span-2 py-6 border-t border-slate-100 mt-4">
                                        <label className="flex items-center gap-4 cursor-pointer group">
                                            <div
                                                onClick={() => setCurrentPlan({ ...currentPlan, popular: !currentPlan.popular })}
                                                className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${currentPlan.popular ? 'bg-orange-600' : 'bg-slate-200'}`}
                                            >
                                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all transform ${currentPlan.popular ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">Mark as Popular</p>
                                                <p className="text-xs text-slate-400 font-medium">Highlight this plan as the recommended choice for users.</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 py-4 bg-white text-slate-600 rounded-2xl font-bold border border-slate-200 hover:bg-slate-100 transition-all"
                                > Cancel </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-[2] py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2"
                                >
                                    <Check className="w-5 h-5" />
                                    <span>Save Pass Configuration</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </div>
    );
}
