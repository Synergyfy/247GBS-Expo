"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { Send, User, Loader2, ArrowLeft, MessageSquare, ShieldCheck, X } from "lucide-react";
import Link from "next/link";

export default function SupportChatPage() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoadingSessions, setIsLoadingSessions] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isStarting, setIsStarting] = useState(false);
    const [showStartModal, setShowStartModal] = useState(false);
    const [newSubject, setNewSubject] = useState("");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchSessions();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchSessions = async () => {
        setIsLoadingSessions(true);
        try {
            const data = await api.get("/dashboard/business/support/chat");
            setSessions(data);
        } catch (error) {
            console.error("Failed to fetch support sessions:", error);
        } finally {
            setIsLoadingSessions(false);
        }
    };

    const selectSession = async (sessionId: string) => {
        setIsLoadingMessages(true);
        try {
            const data = await api.get(`/dashboard/business/support/chat/${sessionId}`);
            setSelectedSession(data);
            setMessages(data.messages || []);
        } catch (error) {
            console.error("Failed to fetch support messages:", error);
        } finally {
            setIsLoadingMessages(false);
        }
    };

    const handleStartChat = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSubject.trim() || isStarting) return;

        setIsStarting(true);
        try {
            const session = await api.post("/dashboard/business/support/chat", { subject: newSubject });
            setSessions([session, ...sessions]);
            setSelectedSession(session);
            setMessages([]);
            setShowStartModal(false);
            setNewSubject("");
        } catch (error) {
            console.error("Failed to start support chat:", error);
        } finally {
            setIsStarting(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedSession || isSending) return;

        setIsSending(true);
        try {
            const sent = await api.post(`/dashboard/business/support/chat/${selectedSession.id}/messages`, {
                content: newMessage
            });
            setMessages([...messages, sent]);
            setNewMessage("");
            fetchSessions(); // Update sidebar snippet
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsSending(false);
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="h-[calc(100vh-8rem)] bg-white rounded-3xl border border-slate-200 shadow-xl flex overflow-hidden relative">

            {/* Sidebar */}
            <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/30">
                <div className="p-6 border-b border-slate-100 bg-white">
                    <Link href="/dashboard/business/support" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors mb-4 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-wider">Back to Center</span>
                    </Link>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-slate-900">Active Chats</h2>
                        <button
                            onClick={() => setShowStartModal(true)}
                            className="p-2 bg-orange-600 text-white rounded-xl hover:bg-slate-900 transition-colors shadow-lg shadow-orange-100"
                        >
                            <MessageSquare className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {isLoadingSessions ? (
                        <div className="p-8 text-center flex flex-col items-center gap-2">
                            <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Loading Chats...</p>
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-slate-500">No active support chats</p>
                        </div>
                    ) : (
                        sessions.map((session) => (
                            <div
                                key={session.id}
                                onClick={() => selectSession(session.id)}
                                className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedSession?.id === session.id
                                        ? 'bg-white border-orange-100 shadow-md ring-1 ring-orange-50'
                                        : 'bg-transparent border-transparent hover:bg-white hover:border-slate-100 hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-slate-900 text-sm truncate pr-2">{session.subject}</h4>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase">{session.status}</span>
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1">
                                    {session.messages?.[0]?.content || "No messages yet"}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {selectedSession ? (
                    <>
                        {/* Header */}
                        <div className="p-6 bg-white border-b border-slate-50 flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100/50">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{selectedSession.subject}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agent Online</span>
                                    </div>
                                </div>
                            </div>
                            {selectedSession.status !== 'CLOSED' && (
                                <button className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">
                                    End Session
                                </button>
                            )}
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-slate-50/30">
                            {isLoadingMessages ? (
                                <div className="flex-1 flex items-center justify-center h-full">
                                    <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-center">
                                        <div className="bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100">
                                            Platform encrypted support session
                                        </div>
                                    </div>
                                    {messages.map((msg) => {
                                        const isSystem = msg.senderType === 'SYSTEM';
                                        const isAgent = msg.senderType === 'AGENT';
                                        const isMe = msg.senderType === 'BUSINESS';

                                        return (
                                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[70%] group ${isMe ? 'items-end' : 'items-start'}`}>
                                                    <div className={`px-5 py-4 rounded-[1.5rem] text-sm shadow-sm relative ${isMe
                                                            ? 'bg-slate-900 text-white rounded-tr-none'
                                                            : isAgent
                                                                ? 'bg-orange-600 text-white rounded-tl-none ring-4 ring-orange-50'
                                                                : 'bg-white border border-slate-100 text-slate-600 rounded-tl-none'
                                                        }`}>
                                                        <p className="leading-relaxed">{msg.content}</p>
                                                    </div>
                                                    <div className={`flex items-center gap-2 mt-2 px-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                            {isMe ? 'Merchant' : isAgent ? 'Support Agent' : 'System'}
                                                        </span>
                                                        <span className="text-[10px] text-slate-300">
                                                            {formatTime(msg.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-6 bg-white">
                            <form onSubmit={handleSendMessage} className="flex gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Describe your issue..."
                                    className="flex-1 bg-transparent px-4 py-2 outline-none text-sm placeholder:text-slate-400"
                                    disabled={selectedSession.status === 'CLOSED'}
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() || isSending || selectedSession.status === 'CLOSED'}
                                    className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSending ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <span className="text-xs uppercase tracking-widest">Send</span>
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white">
                        <div className="w-24 h-24 bg-orange-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-orange-100/50">
                            <ShieldCheck className="w-12 h-12 text-orange-600" />
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-2xl mb-2 uppercase tracking-tight italic">Technical Help Required?</h3>
                        <p className="max-w-sm text-slate-500 mb-8 leading-relaxed">
                            Our priority support agents are online and ready to help you with anything from booth setup to API integrations.
                        </p>
                        <button
                            onClick={() => setShowStartModal(true)}
                            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-orange-600 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest"
                        >
                            Start Live Session
                        </button>
                    </div>
                )}
            </div>

            {/* Start Chat Modal */}
            {showStartModal && (
                <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-10 border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-extrabold text-slate-900 uppercase tracking-tight">New Support Request</h3>
                            <button onClick={() => setShowStartModal(false)} className="text-slate-400 hover:text-red-500">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleStartChat}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Issue Subject</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={newSubject}
                                        onChange={(e) => setNewSubject(e.target.value)}
                                        placeholder="e.g. Bulk upload not working"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-4 ring-orange-50 focus:border-orange-200 transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!newSubject.trim() || isStarting}
                                    className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all disabled:opacity-50 uppercase tracking-widest shadow-lg shadow-orange-100"
                                >
                                    {isStarting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Initiate Support"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
