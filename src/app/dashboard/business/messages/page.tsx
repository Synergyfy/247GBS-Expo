"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Search, Send, User, Loader2 } from "lucide-react";

export default function MessagesPage() {
    const [threads, setThreads] = useState<any[]>([]);
    const [selectedThread, setSelectedThread] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoadingThreads, setIsLoadingThreads] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        fetchThreads();
    }, []);

    const fetchThreads = async () => {
        setIsLoadingThreads(true);
        try {
            const data = await api.get("/dashboard/business/messages/threads");
            setThreads(data);
            if (data.length > 0 && !selectedThread) {
                // selectThread(data[0].id);
            }
        } catch (error) {
            console.error("Failed to fetch threads:", error);
        } finally {
            setIsLoadingThreads(false);
        }
    };

    const selectThread = async (threadId: string) => {
        setIsLoadingMessages(true);
        try {
            const data = await api.get(`/dashboard/business/messages/threads/${threadId}`);
            setSelectedThread(data);
            setMessages(data.messages);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setIsLoadingMessages(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedThread || isSending) return;

        setIsSending(true);
        try {
            const sent = await api.post("/dashboard/business/messages/send", {
                targetUserId: selectedThread.user.id,
                content: newMessage
            });
            setMessages([...messages, sent]);
            setNewMessage("");
            // Update threads list to show latest message
            fetchThreads();
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
        <div className="h-[calc(100vh-8rem)] bg-white rounded-2xl border border-slate-200 shadow-sm flex overflow-hidden">
            {/* Sidebar List */}
            <div className="w-80 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-100">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input type="text" placeholder="Search conversations..." className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-orange-500" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {isLoadingThreads ? (
                        <div className="p-8 text-center">
                            <Loader2 className="w-6 h-6 animate-spin text-orange-600 mx-auto" />
                        </div>
                    ) : threads.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-sm">No messages yet</div>
                    ) : (
                        threads.map((thread) => (
                            <div
                                key={thread.id}
                                onClick={() => selectThread(thread.id)}
                                className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${selectedThread?.id === thread.id ? 'bg-orange-50 border-orange-100' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <div className="font-bold text-slate-900 text-sm">{thread.user.name || "Customer"}</div>
                                    <span className="text-[10px] text-slate-400 ml-auto">{new Date(thread.updatedAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-1">{thread.latestMessage || "No messages"}</p>
                                {thread.unread && (
                                    <div className="mt-1 w-2 h-2 rounded-full bg-orange-600"></div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/50">
                {selectedThread ? (
                    <>
                        {/* Header */}
                        <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{selectedThread.user?.name || "Customer"}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest">Active Chat</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col">
                            {isLoadingMessages ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg) => {
                                        const isCustomer = msg.senderId !== selectedThread.boothId; // Check logic from controller/service
                                        // Wait, senderId is userId of either customer or business owner.
                                        // We know the current user's ID? Not really from here, but we can assume if it matches targetUserId it's them?
                                        // Let's look at getMessages response. It includes senderId.
                                        // In standard implementation, if senderId === thread.userId it's the customer.
                                        const isMyMessage = msg.senderId !== selectedThread.userId;

                                        return (
                                            <div key={msg.id} className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-sm ${isMyMessage
                                                    ? 'bg-orange-600 text-white rounded-tr-sm'
                                                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                                                    }`}>
                                                    <p>{msg.content}</p>
                                                    <span className={`text-[10px] mt-1 block ${isMyMessage ? 'text-white/70' : 'text-slate-400'}`}>
                                                        {formatTime(msg.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 shadow-lg">
                            <div className="flex gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 pr-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent border-none px-4 py-2 outline-none text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() || isSending}
                                    className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Send className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1 uppercase tracking-tight">Your Inbox</h3>
                        <p className="max-w-xs text-sm">Select a customer from the left to start responding to their inquiries.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
