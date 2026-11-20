"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  TrendingUp,
  Calendar,
  Newspaper,
  X,
  CheckCircle2,
  Save
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NEWS_ITEMS } from "@/data/news";

export default function NewsManagementPage() {
  const [news, setNews] = useState(NEWS_ITEMS);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [previewItem, setPreviewItem] = useState<(typeof NEWS_ITEMS)[0] | null>(null);
  const [editItem, setEditItem] = useState<(typeof NEWS_ITEMS)[0] | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<(typeof NEWS_ITEMS)[0] | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const newsStats = [
    { label: "Total Stories", value: `${news.length}`, sub: "Editorial archive", icon: Newspaper, iconColor: "text-blue-600" },
    { label: "Live Articles", value: "18", sub: "Publicly visible", icon: Eye, iconColor: "text-emerald-600" },
    { label: "Drafts", value: "6", sub: "In editorial review", icon: Edit3, iconColor: "text-orange-600" },
    { label: "Total Views", value: "128K", sub: "Platform impressions", icon: TrendingUp, iconColor: "text-purple-600" }
  ];

  const handleOpenEdit = (item: (typeof NEWS_ITEMS)[0]) => {
    setEditItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;
    setNews((prev) =>
      prev.map((i) =>
        i.id === editItem.id ? { ...i, title: editTitle, category: editCategory } : i
      )
    );
    showToast(`Article "${editTitle}" updated`);
    setEditItem(null);
  };

  const handleDelete = () => {
    if (!deleteConfirmItem) return;
    setNews((prev) => prev.filter((i) => i.id !== deleteConfirmItem.id));
    showToast(`Article deleted from platform`);
    setDeleteConfirmItem(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-4 sm:right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-3 max-w-sm sm:max-w-md animate-in fade-in slide-in-from-top-3">
          <div className="w-7 h-7 rounded-xl bg-orange-600 flex items-center justify-center shrink-0 text-white">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold flex-1">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Area */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Platform News CMS
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Manage and publish editorial content for the Platform Pulse feed.
          </p>
        </div>
        <Link
          href="/dashboard/admin/news/create"
          className="inline-flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-orange-600 text-white rounded-xl font-bold text-[11px] sm:text-xs hover:bg-orange-700 transition-all shadow-sm w-fit shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Story</span>
        </Link>
      </div>

      {/* Horizontal Scroll KPI Strip on Mobile */}
      <div>
        <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {newsStats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="w-[50%] min-w-[168px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
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
        <div className="flex items-center justify-center gap-1.5 mt-2 lg:hidden">
          <span className="w-4 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or category..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 outline-none text-xs sm:text-sm font-medium transition-all"
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
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Story Info
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Category
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Impressions
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-10 relative rounded-lg overflow-hidden shadow-2xs shrink-0 bg-slate-100">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="max-w-xs min-w-0">
                        <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1 font-bold mt-0.5">
                          <Calendar className="w-3 h-3 text-orange-600" /> {item.date}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-slate-900">4.2K</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => setPreviewItem(item)}
                        className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all cursor-pointer"
                        title="View Article Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmItem(item)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Articles List */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredNews.map((item) => (
            <div key={item.id} className="p-4 space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="w-16 h-12 relative rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                  </div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-emerald-600 uppercase text-[10px] tracking-wider">
                    Published
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-500">4.2K views</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPreviewItem(item)}
                    className="p-1.5 text-slate-500 hover:text-orange-600 bg-slate-100 rounded-lg cursor-pointer"
                    aria-label="Preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-slate-500 hover:text-blue-600 bg-slate-100 rounded-lg cursor-pointer"
                    aria-label="Edit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmItem(item)}
                    className="p-1.5 text-slate-500 hover:text-red-600 bg-slate-100 rounded-lg cursor-pointer"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1. ARTICLE PREVIEW MODAL */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-orange-600">
                  {previewItem.category}
                </span>
                <p className="text-[11px] text-slate-400 font-bold">{previewItem.date}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full h-44 relative rounded-2xl overflow-hidden bg-slate-100">
              <Image src={previewItem.image} alt={previewItem.title} fill className="object-cover" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                {previewItem.title}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                {previewItem.excerpt ||
                  "The 247GBS Expo platform has announced significant feature upgrades, expanding digital booth analytics and high-volume cross-border trade capabilities for all participating businesses."}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. EDIT ARTICLE MODAL */}
      {editItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Edit Story</h3>
              <button
                type="button"
                onClick={() => setEditItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Category Tag
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500 bg-white"
                >
                  <option value="PLATFORM UPDATE">PLATFORM UPDATE</option>
                  <option value="PARTNERSHIP">PARTNERSHIP</option>
                  <option value="COMMUNITY">COMMUNITY</option>
                  <option value="EXPO HIGHLIGHT">EXPO HIGHLIGHT</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. CLEAN DELETE CONFIRMATION MODAL (No bulky icon box, concise "Delete" / "Cancel") */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Delete Story</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Are you sure you want to delete &ldquo;{deleteConfirmItem.title}&rdquo;? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
