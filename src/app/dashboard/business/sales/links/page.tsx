"use client";

import { useState } from "react";
import { 
    Link as LinkIcon, 
    QrCode, 
    UserCheck, 
    Rocket, 
    Copy, 
    Download, 
    Plus, 
    CheckCircle2, 
    BarChart3,
    ArrowRight,
    Search,
    MoreVertical
} from "lucide-react";
import Modal from "@/app/component/Modal";

const GENERATORS = [
    { id: "custom", label: "Custom Sales Link", icon: LinkIcon, desc: "Generate a trackable URL for any event tier." },
    { id: "qr", label: "QR Poster", icon: QrCode, desc: "Create high-res QR codes for physical marketing." },
    { id: "agent", label: "Agent Code", icon: UserCheck, desc: "Unique identifiers for field agents and staff." },
    { id: "campaign", label: "Campaign URL", icon: Rocket, desc: "Special links for seasonal or flash sale offers." },
];

export default function LinkCodeGenerationPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [genType, setGenType] = useState("");
    const [copied, setCopied] = useState(false);

    const [links, setLinks] = useState([
        { id: 1, name: "Instagram Spring Sale", type: "Campaign", hits: 1420, conversions: 84, revenue: "£4,116", code: "spring26-insta" },
        { id: 2, name: "Regent St. QR Poster", type: "QR", hits: 842, conversions: 24, revenue: "£1,176", code: "qr-regent-st" },
        { id: 3, name: "Agent - Michael S.", type: "Agent", hits: 310, conversions: 45, revenue: "£2,205", code: "agent-mikes" },
    ]);

    const handleGenerate = (type: string) => {
        setGenType(type);
        setIsModalOpen(true);
    };

    const copyToClipboard = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Link & Code Generation</h1>
                    <p className="text-slate-500 text-lg">Create trackable assets for your sales channels.</p>
                </div>
            </div>

            {/* Generator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {GENERATORS.map((g) => (
                    <button 
                        key={g.id} 
                        onClick={() => handleGenerate(g.id)}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all text-left group"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mb-6 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                            <g.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{g.label}</h3>
                        <p className="text-slate-500 text-xs mb-6 leading-relaxed">{g.desc}</p>
                        <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest">
                            Generate Now <Plus className="w-4 h-4" />
                        </div>
                    </button>
                ))}
            </div>

            {/* Trackable Links List */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-slate-900">Trackable Assets</h2>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search codes..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Name</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversion</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {links.map((link) => (
                                <tr key={link.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <p className="font-bold text-slate-900">{link.name}</p>
                                        <p className="text-xs text-slate-400 font-mono mt-1">{link.code}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {link.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <BarChart3 className="w-4 h-4 text-orange-500" />
                                            <span className="font-bold text-slate-700">{link.hits.toLocaleString()} clicks</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-bold text-emerald-600">{link.conversions} Sales</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-black text-slate-900">{link.revenue}</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-white text-slate-400 hover:text-orange-600 rounded-xl border border-transparent hover:border-slate-200 shadow-sm transition-all">
                                            <Copy className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Generate Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Generate ${genType.toUpperCase()}`}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Target Event / Tier</label>
                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-bold">
                            <option>Global Innovation Fair (VIP)</option>
                            <option>Global Innovation Fair (General)</option>
                            <option>All Tiers</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Internal Label</label>
                        <input type="text" placeholder="e.g. Summer Newsletter" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>

                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <p className="text-[10px] font-black uppercase text-orange-600 mb-2">Generated Result</p>
                        {genType === 'qr' ? (
                            <div className="flex flex-col items-center py-6 bg-white rounded-xl border border-orange-100 shadow-sm">
                                <QrCode className="w-40 h-40 text-slate-900 mb-4" />
                                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">ID: QR-SPRING26-INSTA</p>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-sm font-mono font-bold text-orange-900 truncate">expo.247gbs.com/s/spring26-insta</p>
                                <button 
                                    onClick={copyToClipboard}
                                    className={`p-2 rounded-lg transition-all ${copied ? "bg-emerald-500 text-white" : "bg-white text-orange-600 border border-orange-200 hover:bg-orange-600 hover:text-white"}`}
                                >
                                    {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all uppercase tracking-widest text-xs">
                            {genType === 'qr' ? 'Download Assets' : 'Save Asset'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
