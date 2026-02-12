"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Image as ImageIcon,
    Type,
    Bold,
    Italic,
    Underline,
    Link as LinkIcon,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Save,
    Eye,
    X,
    Upload,
    ChevronDown,
    Layout,
    TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CreateNewsPage() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Technology");
    const [excerpt, setExcerpt] = useState("");
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    // Rich Text Editor Commands
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
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Create News Story</h1>
                    <p className="text-slate-500 font-medium">Draft and publish high-quality content for the platform pulse.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsPreview(!isPreview)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${isPreview ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-500 hover:text-orange-600 shadow-sm'}`}
                    >
                        {isPreview ? <Layout className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        {isPreview ? "Edit Editor" : "Live Preview"}
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
                        <Save className="w-5 h-5" />
                        Publish Story
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Editor Section */}
                <div className={`lg:col-span-2 space-y-8 ${isPreview ? 'hidden' : 'block'}`}>
                    {/* Main Settings */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Story Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a compelling title..."
                                className="w-full text-3xl font-black text-slate-900 placeholder:text-slate-200 focus:outline-none bg-transparent"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 text-slate-400/80">Category</label>
                                <div className="relative">
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-orange-500/20 outline-none"
                                    >
                                        <option>Technology</option>
                                        <option>Partnership</option>
                                        <option>Community</option>
                                        <option>Event Update</option>
                                        <option>Innovation</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Engagement</label>
                                <div className="flex items-center gap-4 py-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded-md border-slate-200 text-orange-600 focus:ring-orange-500" />
                                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Trending Tag</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-5 h-5 rounded-md border-slate-200 text-orange-600 focus:ring-orange-500" />
                                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Featured</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Short Excerpt</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="A brief summary to entice readers in the feed..."
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 font-medium text-sm focus:ring-2 focus:ring-orange-500/20 outline-none h-24 resize-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Rich Text Editor */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex flex-wrap gap-2 sticky top-0 z-10 backdrop-blur-sm">
                            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/50 shadow-sm">
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'h1'); }} className="p-1 px-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500 font-black text-xs" title="H1">H1</button>
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'h2'); }} className="p-1 px-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500 font-black text-xs" title="H2">H2</button>
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'h3'); }} className="p-1 px-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500 font-black text-xs" title="H3">H3</button>
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'h4'); }} className="p-1 px-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500 font-black text-xs" title="H4">H4</button>
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'h5'); }} className="p-1 px-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500 font-black text-xs" title="H5">H5</button>
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'h6'); }} className="p-1 px-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500 font-black text-xs" title="H6">H6</button>
                            </div>

                            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/50 shadow-sm">
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('bold'); }} className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500" title="Bold"><Bold className="w-4 h-4" /></button>
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('italic'); }} className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500" title="Italic"><Italic className="w-4 h-4" /></button>
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('underline'); }} className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500" title="Underline"><Underline className="w-4 h-4" /></button>
                            </div>

                            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/50 shadow-sm">
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('insertUnorderedList'); }} className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500" title="Bullet List"><List className="w-4 h-4" /></button>
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('insertOrderedList'); }} className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
                            </div>

                            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/50 shadow-sm">
                                <button
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        const url = prompt("Enter link URL:");
                                        if (url) execCommand('createLink', url);
                                    }}
                                    className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500"
                                    title="Add Link"
                                >
                                    <LinkIcon className="w-4 h-4" />
                                </button>
                                <button onMouseDown={(e) => { e.preventDefault(); execCommand('unlink'); }} className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-all text-slate-500" title="Remove Link"><X className="w-4 h-4" /></button>
                            </div>

                            <button onMouseDown={(e) => { e.preventDefault(); execCommand('undo'); }} className="ml-auto p-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Undo</button>
                            <button onMouseDown={(e) => { e.preventDefault(); execCommand('redo'); }} className="p-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Redo</button>
                        </div>

                        <div
                            ref={editorRef}
                            id="editor"
                            contentEditable
                            className="flex-1 p-10 outline-none text-slate-700 leading-relaxed min-h-[400px] editor-content"
                            data-placeholder="Start writing your story here..."
                            onFocus={(e) => {
                                if (e.currentTarget.innerHTML.trim() === "") {
                                    e.currentTarget.innerHTML = "<p><br></p>";
                                }
                            }}
                        >
                            <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Enter Catchy Headline</h1>
                            <p className="mb-6 font-medium text-slate-600">Start typing your story here. Select text to apply formatting from the toolbar above. You can create headings, lists, and links easily.</p>
                        </div>
                    </div>
                </div>

                {/* Preview Section (when not in full preview) */}
                {!isPreview ? (
                    <div className="space-y-8">
                        {/* Thumbnail uploader */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm overflow-hidden">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Thumbnail Image</label>
                            {thumbnail ? (
                                <div className="relative aspect-video rounded-3xl overflow-hidden group">
                                    <Image src={thumbnail} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onMouseDown={(e) => { e.preventDefault(); setThumbnail(null); }}
                                            className="p-3 bg-red-600 text-white rounded-full hover:scale-110 transition-transform"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all group">
                                    <input type="file" className="hidden" onChange={handleThumbnailChange} accept="image/*" />
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 mb-3 shadow-md group-hover:text-orange-600 transition-colors">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">Click to upload</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">PNG, JPG up to 10MB</span>
                                </label>
                            )}
                        </div>

                        {/* Article Status Info */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-orange-500" />
                                Publication Stats
                            </h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Words Count:</span>
                                    <span className="font-bold">156 words</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Reading Time:</span>
                                    <span className="font-bold">~1 min</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">SEO Score:</span>
                                    <span className="text-green-400 font-black">94/100</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 mt-4">
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3 text-center">Auto-saving active...</div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 10, repeat: Infinity }}
                                            className="h-full bg-orange-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* FULL PREVIEW MODE */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-3 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100"
                    >
                        <div className="aspect-[21/9] relative bg-slate-100">
                            {thumbnail ? (
                                <Image src={thumbnail} alt="Hero" fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-black text-4xl uppercase tracking-tighter opacity-20">No Cover Image</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start">
                                <span className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">{category}</span>
                                <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl">{title || "Untitled Story"}</h2>
                            </div>
                        </div>
                        <div className="max-w-4xl mx-auto py-20 px-10">
                            <div className="flex items-center gap-6 mb-12 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black">SA</div>
                                <div>
                                    <p className="text-lg font-black text-slate-900">Super Admin</p>
                                    <p className="text-sm font-bold text-orange-600 uppercase tracking-widest">Platform Authority • Just Now</p>
                                </div>
                            </div>
                            <div
                                id="preview-content"
                                className="prose prose-xl prose-orange max-w-none text-slate-700 leading-relaxed font-medium"
                                dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || "" }}
                            />
                        </div>
                    </motion.div>
                )}
            </div>

            <style jsx>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    display: block;
                    color: #cbd5e1;
                }
                .editor-content {
                    outline: none;
                }
                .editor-content h1, :global(#preview-content h1) { font-size: 3rem !important; font-weight: 900 !important; line-height: 1.1; margin: 1.5rem 0 !important; letter-spacing: -0.05em; color: #0f172a !important; display: block !important; }
                .editor-content h2, :global(#preview-content h2) { font-size: 2.25rem !important; font-weight: 900 !important; margin: 1.25rem 0 !important; letter-spacing: -0.04em; color: #1e293b !important; border-bottom: 2px solid #f1f5f9; padding-bottom: 0.5rem; display: block !important; }
                .editor-content h3, :global(#preview-content h3) { font-size: 1.75rem !important; font-weight: 800 !important; margin: 1rem 0 !important; color: #334155 !important; display: block !important; }
                .editor-content h4, :global(#preview-content h4) { font-size: 1.5rem !important; font-weight: 800 !important; margin: 0.75rem 0 !important; color: #334155 !important; display: block !important; }
                .editor-content h5, :global(#preview-content h5) { font-size: 1.25rem !important; font-weight: 800 !important; margin: 0.5rem 0 !important; color: #475569 !important; display: block !important; }
                .editor-content h6, :global(#preview-content h6) { font-size: 1.1rem !important; font-weight: 800 !important; margin: 0.5rem 0 !important; color: #64748b !important; display: block !important; }
                .editor-content p, :global(#preview-content p) { margin-bottom: 1.5rem !important; line-height: 1.8 !important; font-size: 1.125rem; }
                .editor-content b, .editor-content strong, :global(#preview-content b), :global(#preview-content strong) { font-weight: 800 !important; color: #0f172a !important; }
                .editor-content i, .editor-content em, :global(#preview-content i), :global(#preview-content em) { font-style: italic !important; display: inline !important; }
                .editor-content u, :global(#preview-content u) { text-decoration: underline !important; }
                .editor-content a, :global(#preview-content a) { color: #ea580c !important; text-decoration: underline !important; font-weight: 700 !important; cursor: pointer !important; }
                .editor-content ul, :global(#preview-content ul) { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1.5rem !important; }
                .editor-content ol, :global(#preview-content ol) { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1.5rem !important; }
                .editor-content li, :global(#preview-content li) { margin-bottom: 0.5rem !important; }
            `}</style>
        </div>
    );
}
