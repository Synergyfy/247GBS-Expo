"use client";

import React from "react";
import {
    Plus,
    Search,
    MoreVertical,
    Eye,
    Edit3,
    Trash2,
    TrendingUp,
    Calendar,
    Newspaper
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { NEWS_ITEMS } from "@/data/news";
import { api } from "@/lib/api";

export default function NewsManagementPage() {
    const [news, setNews] = React.useState<any[]>([]);
    const [stats, setStats] = React.useState<any>({
        total: 0,
        published: 0,
        drafts: 0,
        views: '0'
    });
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [storiesRes, statsRes] = await Promise.all([
                    api.get("/admin/news"),
                    api.get("/admin/news/stats")
                ]);

                if (storiesRes.success) {
                    setNews(storiesRes.data);
                }
                if (statsRes.success) {
                    setStats(statsRes.data);
                }
            } catch (error) {
                console.error("Failed to load news", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this news item?")) {
            try {
                const res = await api.delete(`/admin/news/${id}`);
                if (res.success) {
                    setNews(news.filter(n => n.id !== id));
                    // Refresh stats
                    const statsRes = await api.get("/admin/news/stats");
                    if (statsRes.success) setStats(statsRes.data);
                }
            } catch (err) {
                console.error("Failed to delete", err);
                alert("Failed to delete");
            }
        }
    };
    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase">Platform News</h1>
                    <p className="text-slate-500 font-medium italic">Manage and keep track of all editorial content publishing.</p>
                </div>
                <Link
                    href="/dashboard/admin/news/create"
                    className="flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-[2rem] font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 hover:scale-105"
                >
                    <Plus className="w-6 h-6" />
                    Create New Story
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: "Total Stories", value: stats.total.toString(), icon: Newspaper, color: "bg-blue-500" },
                    { label: "Live Articles", value: stats.published.toString(), icon: Eye, color: "bg-green-500" },
                    { label: "Drafts", value: stats.drafts.toString(), icon: Edit3, color: "bg-orange-500" },
                    { label: "Total Views", value: stats.views, icon: TrendingUp, color: "bg-purple-500" },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6"
                    >
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Content Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="relative w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by title, author, or category..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500/50 outline-none text-sm transition-all shadow-inner"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Story Info</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Engagement</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-slate-400">
                                            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                            <p className="font-bold text-sm">Syncing with pulse newsroom...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : news.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-slate-400">
                                            <Newspaper className="w-12 h-12 opacity-20" />
                                            <p className="font-bold text-sm">No stories published yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : news.map((item, i) => (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={item.id}
                                    className="hover:bg-slate-50/80 transition-colors group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 relative rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-500 bg-slate-100">
                                                {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
                                            </div>
                                            <div className="max-w-xs">
                                                <p className="font-bold text-slate-900 line-clamp-1">{item.title}</p>
                                                <p className="text-[10px] text-slate-500 flex items-center gap-1 font-bold mt-1 uppercase tracking-tighter">
                                                    <Calendar className="w-3 h-3 text-orange-600" /> Published {new Date(item.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-100">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900">{item.views}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Impressions</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] ${item.published ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                                            <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{item.published ? 'Active' : 'Draft'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all" title="View"><Eye className="w-5 h-5" /></button>
                                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit"><Edit3 className="w-5 h-5" /></button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
