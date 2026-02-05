"use client";

import { useState } from "react";
import { 
    Globe, 
    Monitor, 
    Smartphone, 
    Users, 
    Link as LinkIcon, 
    Building2,
    CheckCircle2,
    XCircle,
    BarChart3,
    ArrowUpRight,
    ExternalLink,
    Code
} from "lucide-react";
import Link from "next/link";

const CHANNELS = [
    { 
        id: "marketplace", 
        name: "247GBS Marketplace", 
        desc: "List your event on our global discovery platform", 
        status: "Active", 
        sales: "£12,450", 
        visitors: "4.2k",
        icon: Globe,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    { 
        id: "widget", 
        name: "Website Widget", 
        desc: "Embed checkout directly on your own website", 
        status: "Setup Required", 
        sales: "£0", 
        visitors: "0",
        icon: Code,
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    { 
        id: "pos", 
        name: "POS Terminals", 
        desc: "Physical ticket sales at venue or partner locations", 
        status: "Active", 
        sales: "£8,200", 
        visitors: "1.1k",
        icon: Monitor,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    { 
        id: "agents", 
        name: "Mobile Agents", 
        desc: "Field agents selling via mobile apps", 
        status: "Active", 
        sales: "£4,100", 
        visitors: "650",
        icon: Smartphone,
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
    { 
        id: "referrals", 
        name: "Referral Links", 
        desc: "Track sales from customers sharing your event", 
        status: "Active", 
        sales: "£2,150", 
        visitors: "1.8k",
        icon: Users,
        color: "text-pink-600",
        bg: "bg-pink-50"
    },
    { 
        id: "affiliates", 
        name: "Affiliate Portals", 
        desc: "Sales via registered partner influencers & blogs", 
        status: "Pending Review", 
        sales: "£0", 
        visitors: "0",
        icon: LinkIcon,
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    }
];

export default function SalesChannelsPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Sales Channels</h1>
                    <p className="text-slate-500 text-lg">Manage where and how your tickets are being distributed.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/business/sales/links" className="px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        Manage Codes
                    </Link>
                    <Link href="/dashboard/business/sales/campaigns" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2">
                        Create Campaign
                    </Link>
                </div>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Channel Revenue", val: "£26,900", change: "+14%", icon: BarChart3 },
                    { label: "Direct Traffic", val: "68%", change: "+2%", icon: Globe },
                    { label: "Active Agents", val: "12", change: "0%", icon: Smartphone },
                    { label: "Conversion Rate", val: "4.8%", change: "+1.2%", icon: ArrowUpRight },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Channels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {CHANNELS.map((channel) => (
                    <div key={channel.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl ${channel.bg} ${channel.color} group-hover:scale-110 transition-transform`}>
                                <channel.icon className="w-6 h-6" />
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                channel.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                                channel.status === 'Setup Required' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                            }`}>
                                {channel.status}
                            </span>
                        </div>
                        
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{channel.name}</h3>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed">{channel.desc}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sales</p>
                                <p className="text-lg font-bold text-slate-900">{channel.sales}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Visitors</p>
                                <p className="text-lg font-bold text-slate-900">{channel.visitors}</p>
                            </div>
                        </div>

                        <button className="mt-8 w-full py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all flex items-center justify-center gap-2 text-sm">
                            {channel.status === 'Setup Required' ? 'Begin Setup' : 'View Performance'}
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}