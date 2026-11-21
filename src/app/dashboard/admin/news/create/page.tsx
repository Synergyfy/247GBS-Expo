"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  ListOrdered,
  Save,
  Eye,
  X,
  Upload,
  ChevronDown,
  Layout,
  TrendingUp,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_EVENT_CATEGORIES, getStoredCategories } from "@/data/categories";

export default function CreateNewsPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [availableCategories, setAvailableCategories] = useState<string[]>(DEFAULT_EVENT_CATEGORIES);
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaded = getStoredCategories();
    setAvailableCategories(loaded);
    if (loaded.length > 0 && !loaded.includes(category)) {
      setCategory(loaded[0]);
    }

    const handleSync = (e: any) => {
      if (e?.detail && Array.isArray(e.detail)) {
        setAvailableCategories(e.detail);
        if (!e.detail.includes(category) && e.detail.length > 0) {
          setCategory(e.detail[0]);
        }
      }
    };
    window.addEventListener("event_categories_changed", handleSync);
    return () => window.removeEventListener("event_categories_changed", handleSync);
  }, [category]);

  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <Link
            href="/dashboard/admin/news"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-orange-600 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to News CMS
          </Link>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase">
            Create News Story
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Draft and publish high-quality editorial content for the Platform Pulse.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              isPreview
                ? "bg-orange-600 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200/80 hover:border-orange-500 shadow-2xs"
            }`}
          >
            {isPreview ? <Layout className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{isPreview ? "Edit Story" : "Live Preview"}</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Publish Story</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Editor Section */}
        <div className={`lg:col-span-2 space-y-5 ${isPreview ? "hidden" : "block"}`}>
          {/* Main Settings */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                Story Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a compelling headline..."
                className="w-full text-lg sm:text-2xl font-black text-slate-900 placeholder:text-slate-300 focus:outline-none bg-transparent"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 appearance-none focus:border-orange-500 outline-none cursor-pointer"
                  >
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                  Visibility Flags
                </label>
                <div className="flex items-center gap-4 py-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-xs font-bold text-slate-700">Trending Tag</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-xs font-bold text-slate-700">Featured</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                Short Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise summary to entice readers in the feed..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium text-xs sm:text-sm focus:border-orange-500 outline-none h-20 resize-none"
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
            <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/60 shrink-0">
                {["H1", "H2", "H3"].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      execCommand("formatBlock", h.toLowerCase());
                    }}
                    className="px-2 py-1 hover:bg-orange-50 hover:text-orange-600 rounded text-slate-600 font-black text-xs"
                  >
                    {h}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/60 shrink-0">
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    execCommand("bold");
                  }}
                  className="p-1.5 hover:bg-orange-50 hover:text-orange-600 rounded text-slate-600"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    execCommand("italic");
                  }}
                  className="p-1.5 hover:bg-orange-50 hover:text-orange-600 rounded text-slate-600"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    execCommand("underline");
                  }}
                  className="p-1.5 hover:bg-orange-50 hover:text-orange-600 rounded text-slate-600"
                  title="Underline"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/60 shrink-0">
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    execCommand("insertUnorderedList");
                  }}
                  className="p-1.5 hover:bg-orange-50 hover:text-orange-600 rounded text-slate-600"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    execCommand("insertOrderedList");
                  }}
                  className="p-1.5 hover:bg-orange-50 hover:text-orange-600 rounded text-slate-600"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/60 shrink-0">
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const url = prompt("Enter link URL:");
                    if (url) execCommand("createLink", url);
                  }}
                  className="p-1.5 hover:bg-orange-50 hover:text-orange-600 rounded text-slate-600"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="flex-1 p-4 sm:p-6 outline-none text-slate-700 text-sm leading-relaxed min-h-[260px]"
            >
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
                Enter Catchy Story Headline
              </h2>
              <p className="text-slate-600">
                Start typing your article here. Select text to apply formatting from the toolbar above.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Controls or Full Preview */}
        {!isPreview ? (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">
                Cover Thumbnail
              </label>
              {thumbnail ? (
                <div className="relative aspect-video rounded-xl overflow-hidden group">
                  <Image src={thumbnail} alt="Preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setThumbnail(null)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 cursor-pointer hover:border-orange-500 hover:bg-orange-50/40 transition-all">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleThumbnailChange}
                    accept="image/*"
                  />
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 mb-2 shadow-2xs">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Upload Cover Image</span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                    PNG, JPG up to 10MB
                  </span>
                </label>
              )}
            </div>

            <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white space-y-3">
              <h4 className="text-sm font-extrabold flex items-center gap-2 pb-2 border-b border-white/10">
                <TrendingUp className="w-4 h-4 text-orange-400" /> Publication Telemetry
              </h4>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Word Count</span>
                <span className="font-bold">156 words</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Reading Time</span>
                <span className="font-bold">~1 min</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">SEO Readiness</span>
                <span className="text-emerald-400 font-black">94/100</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl shadow-md overflow-hidden border border-slate-200/80">
            <div className="aspect-video sm:aspect-[21/9] relative bg-slate-900">
              {thumbnail && <Image src={thumbnail} alt="Hero" fill className="object-cover opacity-80" />}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 inline-block">
                  {category}
                </span>
                <h2 className="text-white text-xl sm:text-3xl font-black tracking-tight">
                  {title || "Untitled Story"}
                </h2>
              </div>
            </div>
            <div className="max-w-3xl mx-auto p-5 sm:p-8">
              <div
                className="prose prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || "" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
