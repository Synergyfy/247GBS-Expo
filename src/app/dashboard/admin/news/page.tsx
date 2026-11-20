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
  X
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NEWS_ITEMS } from "@/data/news";

export default function NewsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNews = NEWS_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const newsStats = [
    { label: "Total Stories", value: "24", sub: "Editorial archive", icon: Newspaper, iconColor: "text-blue-600" },
    { label: "Live Articles", value: "18", sub: "Publicly visible", icon: Eye, iconColor: "text-emerald-600" },
    { label: "Drafts", value: "6", sub: "In editorial review", icon: Edit3, iconColor: "text-orange-600" },
    { label: "Total Views", value: "128K", sub: "Platform impressions", icon: TrendingUp, iconColor: "text-purple-600" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
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

      {/* Horizontal Scroll KPI Strip on Mobile (Peeping Card + Dot Slider) */}
      <div>
        <div className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {newsStats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="w-[62vw] min-w-[200px] max-w-[250px] lg:w-auto shrink-0 snap-start bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span className="text-xs font-bold text-slate-500 truncate">
                    {stat.label}
                  </span>
                  <IconComponent className={`w-3.5 h-3.5 ${stat.iconColor} shrink-0`} />
                </div>
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 leading-none">
                  {stat.value}
                </p>
                <p className="text-[11px] font-medium text-slate-400 mt-1 truncate">
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
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Content Container (Desktop Table + Mobile Stacked Rows) */}
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
                      <div className="w-14 h-10 relative rounded-lg overflow-hidden shadow-2xs shrink-0">
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
                      <Link
                        href={`/news/${item.id}`}
                        className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
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

        {/* Mobile Stacked Articles List (Colored text category & status, no pills) */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredNews.map((item) => (
            <div key={item.id} className="p-4 space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="w-16 h-12 relative rounded-xl overflow-hidden shrink-0">
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
                  <Link
                    href={`/news/${item.id}`}
                    className="p-1.5 text-slate-500 hover:text-orange-600 bg-slate-100 rounded-lg"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    className="p-1.5 text-slate-500 hover:text-blue-600 bg-slate-100 rounded-lg"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 text-slate-500 hover:text-red-600 bg-slate-100 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
