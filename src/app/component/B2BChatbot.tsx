"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Send,
    X,
    Bot,
    User,
    Sparkles,
    FileText,
    Calendar,
    Info,
    Layout
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

interface B2BChatbotProps {
    isOpen: boolean;
    onClose: () => void;
    eventName: string;
    organizer: string;
}

export default function B2BChatbot({ isOpen, onClose, eventName, organizer }: B2BChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                const initialMessage: Message = {
                    id: "1",
                    text: `Hello! I'm the B2B Concierge for ${eventName}. I'm here to help you explore exhibition opportunities. How can I assist you today?`,
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages([initialMessage]);
                setIsTyping(false);
            }, 1000);
        }
    }, [isOpen, eventName]);

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setIsTyping(true);

        // Simulate B2B Logic Responses
        setTimeout(() => {
            let botResponse = "That's a great question. Let me check the availability for you.";

            const lowerInput = inputText.toLowerCase();
            if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("booth")) {
                botResponse = `Standard booths for ${eventName} start at £500. Would you like me to send you the full pricing catalog and floor plan?`;
            } else if (lowerInput.includes("media") || lowerInput.includes("kit") || lowerInput.includes("brochure")) {
                botResponse = `Absolutely! I can generate a custom media kit for you based on your industry. You can also download the general version from your dashboard.`;
            } else if (lowerInput.includes("audience") || lowerInput.includes("demographics")) {
                botResponse = `${eventName} expects over 50,000 professional attendees from the tech and retail sectors. 40% are C-suite executives.`;
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const quickActions = [
        { label: "Request Floor Plan", icon: <Layout className="w-4 h-4" /> },
        { label: "Pricing Catalog", icon: <FileText className="w-4 h-4" /> },
        { label: "Book Discovery Call", icon: <Calendar className="w-4 h-4" /> },
        { label: "Organizer Info", icon: <Info className="w-4 h-4" /> }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end justify-end p-4 md:p-8 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="bg-white w-full max-w-lg h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col border border-slate-100 pointer-events-auto overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/20">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-tighter">B2B Concierge</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        Inquiring for {eventName}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-orange-600 text-white shadow-md'
                                            }`}>
                                            {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div className={`p-4 rounded-[1.5rem] text-sm font-medium shadow-sm leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-slate-900 text-white rounded-tr-none'
                                                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-md">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        <div className="bg-white p-4 rounded-[1.5rem] rounded-tl-none border border-slate-100 flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce" />
                                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Footer / Input */}
                        <div className="p-6 bg-white border-t border-slate-100">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {quickActions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setInputText(action.label);
                                            // Optional: trigger auto-send
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-tighter hover:bg-orange-600 hover:text-white transition-all border border-orange-100"
                                    >
                                        {action.icon}
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full pl-6 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium text-sm"
                                    placeholder="Type your inquiry here..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[9px] text-slate-400 mt-4 text-center font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                <Sparkles className="w-3 h-3 text-orange-400" />
                                AI-Powered Exhibitor Support
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
            `}</style>
        </AnimatePresence>
    );
}
