"use client";

import React, { useState, useEffect } from "react";
import { 
    Play, Users, MessageSquare, Calendar, Info, 
    Share2, Maximize2, Volume2, Settings, Radio,
    Store, Users2, HelpCircle, Trophy, Star, Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data for the Live Event
const LOBBY_DATA = {
    "spring2026": {
        title: "Global Innovation Fair 2026",
        organizer: "TechGlobal Inc.",
        viewers: "5,432",
        status: "Live Now",
        mainStageTitle: "Opening Keynote: The Future of Digital Ecosystems",
        presenter: "Dr. Sarah Chen, CEO of TechGlobal",
        videoPlaceholder: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1500"
    },
    "default": {
        title: "Virtual Event Lobby",
        organizer: "Event Organizer",
        viewers: "1,204",
        status: "Live",
        mainStageTitle: "Main Session: Introduction to the Expo",
        presenter: "Event Moderator",
        videoPlaceholder: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1500"
    }
};

const CHAT_MESSAGES = [
    { id: 1, user: "Alex Thompson", message: "Amazing insights on the AI integration!", time: "10:42 AM", avatar: "AT" },
    { id: 2, user: "Maria Garcia", message: "Will there be a recording available later?", time: "10:43 AM", avatar: "MG" },
    { id: 3, user: "James Wilson", message: "The virtual booth experience is top-notch this year.", time: "10:44 AM", avatar: "JW" },
    { id: 4, user: "Linda Chen", message: "Hello from Singapore! Great to be here.", time: "10:45 AM", avatar: "LC" },
];

export default function EventLobbyPage() {
    const params = useParams();
    const id = params.id as string;
    const data = LOBBY_DATA[id as keyof typeof LOBBY_DATA] || LOBBY_DATA.default;
    
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState(CHAT_MESSAGES);
    const [activeTab, setActiveTab] = useState("chat"); // chat, participants, schedule

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        
        const newMessage = {
            id: Date.now(),
            user: "John Doe (You)",
            message: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: "JD"
        };
        
        setChat([...chat, newMessage]);
        setMessage("");
    };

    return (
        <div className="max-w-[1600px] mx-auto">
            {/* Lobby Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black animate-pulse flex items-center gap-1">
                            <Radio className="w-3 h-3" />
                            {data.status.toUpperCase()}
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{data.organizer}</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">{data.title}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                        <Users className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-bold text-slate-700">{data.viewers} Watching</span>
                    </div>
                    <button className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm text-slate-600">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Main Content: Stage Area (Col 8) */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Video Player Section */}
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl group border-4 border-white">
                        <Image 
                            src={data.videoPlaceholder} 
                            alt="Main Stage"
                            fill
                            className="object-cover opacity-80"
                        />
                        
                        {/* Player Overlay Controls (Mock) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-orange-600 transition-colors">
                                        <Play className="w-5 h-5 fill-white" />
                                    </button>
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                                        <Volume2 className="w-5 h-5" />
                                    </button>
                                    <div className="text-white text-xs font-bold tracking-widest px-2">LIVE | 01:24:45</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                                        <Maximize2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Centered Play Button (Initial) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:hidden">
                            <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 shadow-2xl">
                                <Play className="w-10 h-10 text-white fill-white ml-2" />
                            </div>
                        </div>
                    </div>

                    {/* Stage Info */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">{data.mainStageTitle}</h2>
                                <p className="text-slate-500 font-medium flex items-center gap-2">
                                    Presenting: <span className="text-orange-600 font-bold">{data.presenter}</span>
                                </p>
                            </div>
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                                        <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" fill />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600">
                                    +5k
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-600">
                                <Trophy className="w-4 h-4 text-orange-500" /> 500 XP Gained
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-600">
                                <Star className="w-4 h-4 text-yellow-500" /> Digital Badge Available
                            </div>
                        </div>
                    </div>

                    {/* Quick Navigation Desk */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <Store className="text-blue-600" />, label: "Exhibition Hall", count: "450 Booths", bg: "bg-blue-50" },
                            { icon: <Users2 className="text-purple-600" />, label: "Networking", count: "1.2k Active", bg: "bg-purple-50" },
                            { icon: <Trophy className="text-orange-600" />, label: "Reward Center", count: "12 Missions", bg: "bg-orange-50" },
                            { icon: <HelpCircle className="text-emerald-600" />, label: "Info Desk", count: "24/7 Support", bg: "bg-emerald-50" },
                        ].map((item, i) => (
                            <button key={i} className="p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl transition-all text-left group">
                                <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                                </div>
                                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.label}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.count}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sidebar: Chat & Interaction (Col 4) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Live Interaction Card */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col h-[600px] overflow-hidden sticky top-28">
                        {/* Chat Header Tabs */}
                        <div className="flex p-2 bg-slate-50/50">
                            {[
                                { id: "chat", icon: <MessageSquare className="w-4 h-4" />, label: "Live Chat" },
                                { id: "participants", icon: <Users className="w-4 h-4" />, label: "Audience" },
                                { id: "schedule", icon: <Calendar className="w-4 h-4" />, label: "Schedule" }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                                        activeTab === tab.id 
                                        ? "bg-white text-orange-600 shadow-sm" 
                                        : "text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {activeTab === "chat" && chat.map((msg) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={msg.id} 
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[10px] font-black text-orange-600 shrink-0">
                                        {msg.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold text-slate-900">{msg.user}</span>
                                            <span className="text-[10px] text-slate-400">{msg.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100">
                                            {msg.message}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {activeTab === "participants" && (
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                        <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 relative">
                                                    <Image src={`https://i.pravatar.cc/100?img=${i+20}`} alt="avatar" fill className="rounded-full" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-700">Visitor #{1000 + i}</span>
                                            </div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "schedule" && (
                                <div className="space-y-4">
                                    {[
                                        { time: "10:00 AM", title: "Opening Ceremony", type: "Live" },
                                        { time: "11:30 AM", title: "Keynote Session", type: "Next" },
                                        { time: "01:00 PM", title: "Networking Lunch", type: "Scheduled" },
                                        { time: "02:30 PM", title: "Product Showcases", type: "Scheduled" },
                                    ].map((item, i) => (
                                        <div key={i} className={`p-4 rounded-2xl border ${item.type === 'Live' ? 'bg-orange-50 border-orange-100' : 'bg-white border-slate-100'}`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                                                    item.type === 'Live' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'
                                                }`}>
                                                    {item.type}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                                            </div>
                                            <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        {activeTab === "chat" && (
                            <div className="p-4 bg-white border-t border-slate-100">
                                <form onSubmit={handleSendMessage} className="relative">
                                    <input 
                                        type="text" 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs transition-all"
                                    />
                                    <button 
                                        type="submit"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                                <div className="flex items-center justify-between mt-3 px-1">
                                    <span className="text-[10px] text-slate-400 font-medium italic">Your chat is visible to all participants</span>
                                    <div className="flex gap-2">
                                        <button className="text-slate-300 hover:text-slate-500 transition-colors">😊</button>
                                        <button className="text-slate-300 hover:text-slate-500 transition-colors">📎</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Additional Promo/Ad Card */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-orange-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        <h3 className="text-xl font-bold mb-3 relative z-10">Premium Access?</h3>
                        <p className="text-xs text-slate-400 mb-6 relative z-10 leading-relaxed">Unlock private meeting rooms and 1-on-1 networking by upgrading to a VIP pass.</p>
                        <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-orange-600 hover:text-white transition-all relative z-10">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
