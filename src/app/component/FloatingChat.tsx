  "use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, Send, User, Minus, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { role: "other", text: "Hello! How can I help you today?", time: "10:00 AM" },
        { role: "user", text: "I have a question about my latest payout.", time: "10:05 AM" },
        { role: "other", text: "Sure, let me check that for you. One moment please...", time: "10:06 AM" },
    ]);
    const [showHint, setShowHint] = useState(true);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = { role: "user", text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setChatHistory([...chatHistory, newMessage]);
        setMessage("");

        // Mock auto-reply
        setTimeout(() => {
            setChatHistory(prev => [...prev, { 
                role: "other", 
                text: "Thanks for your message! An agent will be with you shortly.", 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            }]);
        }, 1000);
    };

    useEffect(() => {
        // show hint bubble briefly on load
        setShowHint(true);
        const t = setTimeout(() => setShowHint(false), 6000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && !isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden mb-4 flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-bold shadow-lg shadow-orange-600/20">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm uppercase tracking-tight">Support Chat</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Agent Online</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar">
                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                        msg.role === 'user' 
                                            ? 'bg-orange-600 text-white rounded-tr-none shadow-md' 
                                            : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
                                    }`}>
                                        <p className="leading-relaxed">{msg.text}</p>
                                        <p className={`text-[10px] mt-1 font-bold uppercase tracking-widest ${msg.role === 'user' ? 'text-orange-200' : 'text-slate-400'}`}>
                                            {msg.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                            <input 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            />
                            <button 
                                type="submit"
                                className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all shadow-lg active:scale-95 shrink-0"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Floating Button / Minimized Bar */}
            <div className="flex items-center gap-3 relative">
                {/* hint bubble (white rounded message) shown briefly when closed */}
                {!isOpen && showHint && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="mr-3 mb-1 bg-white text-slate-900 rounded-lg shadow-lg p-3 max-w-xs"
                    >
                        <p className="text-sm">Questions about 247 Expo? I'm here to help!</p>
                    </motion.div>
                )}

                {isMinimized && isOpen && (
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => setIsMinimized(false)}
                        className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-3 hover:bg-orange-600 transition-all active:scale-95"
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs uppercase tracking-widest">Active Chat</span>
                        <Maximize2 className="w-4 h-4" />
                    </motion.button>
                )}

                <button 
                    onClick={() => {
                        if (isOpen && isMinimized) setIsMinimized(false);
                        else setIsOpen(!isOpen);
                    }}
                    className={`h-12 px-4 rounded-full flex items-center gap-2 shadow-2xl transition-all duration-500 active:scale-90 ${
                        isOpen && !isMinimized ? 'bg-red-600 text-white rotate-90' : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                >
                    {isOpen && !isMinimized ? (
                        <X className="w-5 h-5" />
                    ) : (
                        <div className="relative flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            <span className="text-sm font-bold">Chat</span>
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 border-2 border-white rounded-full" aria-hidden="true" />
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}
