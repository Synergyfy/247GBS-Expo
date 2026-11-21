"use client";

import React, { useState } from "react";
import {
    Send,
    Sparkles,
    ArrowLeft,
    CheckCircle2,
    MessageSquare,
} from "lucide-react";

interface ChatThread {
    id: string;
    visitor: string;
    company: string;
    context: string;
    unread: boolean;
    lastTime: string;
    messages: { sender: "visitor" | "exhibitor" | "ai"; text: string; time: string }[];
}

export default function BusinessMessagesPage() {
    const [mobileView, setMobileView] = useState<"list" | "chat">("list");
    const [activeThreadId, setActiveThreadId] = useState("chat-1");
    const [inputText, setInputText] = useState("");
    const [aiAssistEnabled, setAiAssistEnabled] = useState(true);

    const [threads, setThreads] = useState<ChatThread[]>([
        {
            id: "chat-1",
            visitor: "Alice Thompson",
            company: "Apex Retail UK",
            context: "Booth #B-42 • Smart Home Hub Inquiry",
            unread: true,
            lastTime: "2m ago",
            messages: [
                {
                    sender: "visitor",
                    text: "Hi! Do you offer bulk wholesale pricing on the Smart Home Hub Gen 4 if we order 50+ units via MCOM Mall?",
                    time: "10:42 AM",
                },
                {
                    sender: "ai",
                    text: "CHS AI Assistant: Welcome Alice! I have notified the TechFlow booth specialist and attached your VIP wholesale brochure.",
                    time: "10:42 AM",
                },
            ],
        },
        {
            id: "chat-2",
            visitor: "Mark Evans",
            company: "TechCorp Solutions",
            context: "Live Session • VIP Workshop Pass",
            unread: false,
            lastTime: "1h ago",
            messages: [
                {
                    sender: "visitor",
                    text: "Thanks for the live demo earlier. Where can I download the enterprise integration spec sheet?",
                    time: "09:30 AM",
                },
                {
                    sender: "exhibitor",
                    text: "Hi Mark, it's pinned right under the MCOM Mall product shelf on our booth page!",
                    time: "09:35 AM",
                },
            ],
        },
        {
            id: "chat-3",
            visitor: "Sarah Jenkins",
            company: "DesignStudio IO",
            context: "MCOM Voucher Redemption",
            unread: false,
            lastTime: "3h ago",
            messages: [
                {
                    sender: "visitor",
                    text: "Can I combine my Season Pass 15% voucher with the MCOM Mall bundle discount?",
                    time: "Yesterday",
                },
            ],
        },
    ]);

    const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

    const handleSelectThread = (id: string) => {
        setActiveThreadId(id);
        setThreads(threads.map((t) => (t.id === id ? { ...t, unread: false } : t)));
        setMobileView("chat");
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        setThreads(
            threads.map((t) =>
                t.id === activeThread.id
                    ? {
                          ...t,
                          lastTime: "Just now",
                          messages: [
                              ...t.messages,
                              { sender: "exhibitor", text: inputText.trim(), time: "Just now" },
                          ],
                      }
                    : t
            )
        );
        setInputText("");
    };

    return (
        <div className="space-y-4 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                            Live Booth Chat & AI Concierge
                        </h1>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                            • Online
                        </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Real-time visitor inquiries and AI auto-replies.
                    </p>
                </div>

                <button
                    onClick={() => setAiAssistEnabled(!aiAssistEnabled)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border transition-all self-start sm:self-auto ${
                        aiAssistEnabled
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-white border-slate-200 text-slate-600"
                    }`}
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    CHS AI Auto-Greeter: {aiAssistEnabled ? "ON" : "OFF"}
                </button>
            </div>

            {/* Responsive Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[460px]">
                {/* Thread List */}
                <div
                    className={`lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-100 divide-y divide-slate-100 ${
                        mobileView === "chat" ? "hidden lg:block" : "block"
                    }`}
                >
                    <div className="p-3 bg-slate-50/70 flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Visitor Conversations ({threads.length})
                        </span>
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {threads.map((t) => {
                        const isSelected = t.id === activeThread.id;
                        const lastMsg = t.messages[t.messages.length - 1]?.text || "";
                        return (
                            <button
                                key={t.id}
                                onClick={() => handleSelectThread(t.id)}
                                className={`w-full text-left p-3.5 hover:bg-slate-50 transition-colors space-y-1 ${
                                    isSelected ? "bg-orange-50/50" : ""
                                }`}
                            >
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                                    <span className="text-orange-600 truncate">{t.company}</span>
                                    <span className={t.unread ? "text-emerald-600" : "text-slate-400"}>
                                        {t.unread ? "• New Inquiry" : t.lastTime}
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                    {t.visitor}
                                </p>
                                <p className="text-[11px] text-slate-500 truncate">{lastMsg}</p>
                            </button>
                        );
                    })}
                </div>

                {/* Active Conversation Window */}
                <div
                    className={`lg:col-span-7 flex flex-col justify-between ${
                        mobileView === "list" ? "hidden lg:flex" : "flex"
                    }`}
                >
                    {/* Thread Top Bar */}
                    <div className="p-3.5 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
                        <div className="min-w-0">
                            <button
                                onClick={() => setMobileView("list")}
                                className="lg:hidden inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 uppercase tracking-wider mb-1"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" /> Back to Inbox
                            </button>
                            <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                                {activeThread.visitor} • <span className="text-slate-500 font-medium">{activeThread.company}</span>
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">{activeThread.context}</p>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 shrink-0 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                        </span>
                    </div>

                    {/* Messages Area */}
                    <div className="p-4 space-y-3 overflow-y-auto max-h-[320px]">
                        {activeThread.messages.map((m, idx) => (
                            <div
                                key={idx}
                                className={`flex flex-col ${
                                    m.sender === "exhibitor" ? "items-end" : "items-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs space-y-1 ${
                                        m.sender === "exhibitor"
                                            ? "bg-orange-600 text-white"
                                            : m.sender === "ai"
                                            ? "bg-slate-900 text-slate-100 border border-slate-800"
                                            : "bg-slate-100 text-slate-900"
                                    }`}
                                >
                                    <p className="leading-relaxed">{m.text}</p>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1">{m.time}</span>
                            </div>
                        ))}
                    </div>

                    {/* Composer */}
                    <form
                        onSubmit={handleSendMessage}
                        className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white"
                    >
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Reply via CHS Live Chat or share an MCOM product link..."
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-700 shrink-0"
                        >
                            <Send className="w-3.5 h-3.5" /> Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
