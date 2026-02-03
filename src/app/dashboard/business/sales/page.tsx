"use client";

import { TrendingUp, Target, Share2, BarChart3, Users } from "lucide-react";

export default function BusinessSalesPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">Sales & Marketing Center</h1>
                <p className="text-slate-500">Run promotions, track referral channels, and boost event attendance.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Campaigns", val: "4", icon: Target },
                    { label: "Referral Sales", val: "£1,240", icon: Share2 },
                    { label: "Avg. ROI", val: "245%", icon: TrendingUp },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{stat.val}</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center py-20">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <TrendingUp className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Campaign Manager</h2>
                <p className="text-slate-500 max-w-sm mx-auto mb-8">Ready to boost your sales? Create trackable links and promo codes for your partners.</p>
                <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200">
                    Launch New Campaign
                </button>
            </div>
        </div>
    );
}
