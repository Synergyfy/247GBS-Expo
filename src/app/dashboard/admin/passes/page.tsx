"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  CreditCard,
  Users,
  Briefcase
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

  const filteredPlans = plans.filter((plan) => {
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
      setPlans(plans.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentPlan) return;

    if (plans.find((p) => p.id === currentPlan.id)) {
      setPlans(plans.map((p) => (p.id === currentPlan.id ? currentPlan : p)));
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

  const passStats = [
    {
      label: "Active Plans",
      value: plans.length,
      sub: "Total pass tiers",
      icon: CreditCard,
      iconColor: "text-orange-600"
    },
    {
      label: "Visitor Passes",
      value: plans.filter((p) => p.type === "visitor").length,
      sub: "Attendee wallets",
      icon: Users,
      iconColor: "text-blue-600"
    },
    {
      label: "Business Passes",
      value: plans.filter((p) => p.type === "business").length,
      sub: "Exhibitor tiers",
      icon: Briefcase,
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Pass Plans & Pricing
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Manage visitor and business season pass plans, token values, and pricing caps.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1 bg-orange-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs hover:bg-orange-700 transition-all shadow-sm active:scale-95 w-fit shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Plan</span>
        </button>
      </div>

      {/* Horizontal Scroll KPI Strip on Mobile (Peeping Card + Dot Slider) */}
      <div>
        <div className="flex lg:grid lg:grid-cols-3 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {passStats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="w-[52%] min-w-[172px] sm:w-[200px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-500 truncate">
                    {stat.label}
                  </span>
                  <IconComponent className={`w-3.5 h-3.5 ${stat.iconColor} shrink-0`} />
                </div>
                <p className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 mt-0.5 truncate">
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
        {/* Mobile Slider Dots Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-2 lg:hidden">
          <span className="w-4 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Search & Horizontal Scrollable Filter Tabs (Peeping on mobile) */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search pass plan by name..."
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:border-orange-500 text-xs sm:text-sm font-medium shadow-2xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 md:pb-0">
          {(["all", "visitor", "business"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs capitalize transition-all shrink-0 ${
                typeFilter === t
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t === "all" ? "All Plans" : `${t} Passes`}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid (Colored Text Labels instead of Pills) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider ${
                    plan.type === "visitor" ? "text-blue-600" : "text-emerald-600"
                  }`}
                >
                  {plan.type} Pass
                </span>
                {plan.popular && (
                  <span className="text-orange-600 text-[10px] font-black uppercase tracking-wider">
                    ★ Popular Choice
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2.5">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  £{plan.price}
                </span>
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                  / season wallet value
                </span>
              </div>
              <p className="text-slate-500 text-xs mb-4 leading-relaxed line-clamp-2">
                {plan.description}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Included Features
                </p>
                <ul className="space-y-1.5">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3.5 sm:px-6 bg-slate-50/80 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => handleEdit(plan)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-white text-slate-900 py-2 rounded-xl font-bold text-xs border border-slate-200 hover:bg-slate-900 hover:text-white transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Plan
              </button>
              <button
                type="button"
                onClick={() => handleDelete(plan.id)}
                className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                title="Delete Plan"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredPlans.length === 0 && (
          <div className="lg:col-span-3 py-12 bg-white rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-4">
            <CreditCard className="w-8 h-8 text-slate-300 mb-2" />
            <h3 className="text-sm font-black text-slate-900 uppercase">No pass plans found</h3>
            <p className="text-xs text-slate-500 mb-4 max-w-xs">
              Try adjusting your filter or create a new pass tier.
            </p>
            <button
              type="button"
              onClick={handleAddNew}
              className="bg-orange-600 text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Plan</span>
            </button>
          </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isEditModalOpen && currentPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
            >
              {/* Modal Header */}
              <div className="bg-slate-900 px-4 py-3 sm:px-5 sm:py-3.5 text-white flex justify-between items-center">
                <div>
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    {currentPlan.id.startsWith("plan_") ? "Create New" : "Edit"} Pass Plan
                  </h2>
                  <p className="text-slate-400 text-[11px] font-medium">
                    Configure pass wallet value and access benefits.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-orange-500"
                    value={currentPlan.name}
                    onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                    placeholder="e.g. Annual All-Access Pass"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      Price / Wallet Value (£)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-orange-500"
                      value={currentPlan.price}
                      onChange={(e) =>
                        setCurrentPlan({ ...currentPlan, price: parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      Audience Type
                    </label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-orange-500"
                      value={currentPlan.type}
                      onChange={(e) =>
                        setCurrentPlan({ ...currentPlan, type: e.target.value as any })
                      }
                    >
                      <option value="visitor">Visitor</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:border-orange-500 resize-none"
                    value={currentPlan.description}
                    onChange={(e) =>
                      setCurrentPlan({ ...currentPlan, description: e.target.value })
                    }
                    placeholder="Explain what this pass unlocks..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Included Benefits
                    </label>
                    <span className="text-[10px] text-orange-600 font-black uppercase">
                      {currentPlan.features.length} Added
                    </span>
                  </div>
                  <div className="flex gap-2 mb-2.5">
                    <input
                      type="text"
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                      placeholder="Add a benefit (e.g. Waives £75 Season Entry Fee)"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="bg-slate-900 text-white px-4 rounded-xl font-bold text-xs hover:bg-orange-600 transition-all"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPlan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-slate-900">
                      Mark as Popular Choice
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Highlight this plan as recommended on checkout.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPlan({ ...currentPlan, popular: !currentPlan.popular })
                    }
                    className={`w-11 h-6 rounded-full transition-all flex items-center px-0.5 ${
                      currentPlan.popular ? "bg-orange-600" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-xs transition-all transform ${
                        currentPlan.popular ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 bg-white text-slate-600 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-[1.5] py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Pass Plan</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
