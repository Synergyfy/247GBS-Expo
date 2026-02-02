"use client";

import { useState } from "react";
import Link from "next/link";
import { Ticket, Calendar, Clock, MapPin, QrCode, Plus, History, Gift, Download } from "lucide-react";
import Modal from "@/app/component/Modal";

interface TicketData {
    id: string;
    event: string;
    type: string;
    date: string;
    time?: string;
    location: string;
    status: string;
    bundle: string[];
    qrCode: string;
}

// Mock Data
const activeTickets: TicketData[] = [
    {
        id: "T-88219",
        event: "Global Innovation Fair (Spring 2026)",
        type: "VIP Networker",
        date: "April 10-19, 2026",
        location: "Virtual Main Hall",
        status: "Active",
        bundle: ["Digital Goodie Bag", "100 Credits"],
        qrCode: "GBX-88219-X22"
    },
    {
        id: "T-99402",
        event: "AI Workshop: Future of Retail",
        type: "Workshop Pass",
        date: "April 12, 2026",
        time: "02:00 PM",
        location: "Workshop Room A",
        status: "Confirmed",
        bundle: [],
        qrCode: "WRK-99402-A12"
    }
];

const pastTickets: TicketData[] = [
    {
        id: "T-10023",
        event: "Winter Tech Expo 2025",
        type: "Standard Visitor",
        date: "Dec 05-14, 2025",
        location: "Virtual Main Hall",
        status: "Used",
        bundle: [],
        qrCode: "OLD-10023"
    }
];

export default function MyTicketsPage() {
    const [activeTab, setActiveTab] = useState("active");
    const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);

    const tickets = activeTab === "active" ? activeTickets : pastTickets;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">My Ticket Wallet</h1>
                    <p className="text-slate-500">Manage your event access, workshop passes, and digital assets.</p>
                </div>
                <Link 
                    href="/tickets" 
                    className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                >
                    <Plus className="w-5 h-5" /> Buy New Ticket
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200">
                <button
                    onClick={() => setActiveTab("active")}
                    className={`px-8 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === "active" ? "border-orange-600 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                    Active Tickets ({activeTickets.length})
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`px-8 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === "history" ? "border-orange-600 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                    History
                </button>
            </div>

            {/* Ticket Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tickets.map((ticket) => (
                    <div 
                        key={ticket.id} 
                        className={`bg-white rounded-2xl border transition-all hover:shadow-xl group ${ticket.status === 'Active' ? 'border-orange-200 ring-1 ring-orange-50' : 'border-slate-200'}`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                    ticket.status === 'Active' ? 'bg-green-100 text-green-700' : 
                                    ticket.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {ticket.status}
                                </div>
                                <Ticket className={`w-6 h-6 ${ticket.status === 'Active' ? 'text-orange-600' : 'text-slate-300'}`} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                                {ticket.event}
                            </h3>
                            <p className="text-slate-500 font-medium mb-6">{ticket.type}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span>{ticket.date}</span>
                                    {ticket.time && <span className="text-slate-400">• {ticket.time}</span>}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span>{ticket.location}</span>
                                </div>
                            </div>

                            {ticket.bundle.length > 0 && (
                                <div className="bg-slate-50 p-4 rounded-xl mb-6">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                                        <Gift className="w-3 h-3" /> Includes:
                                    </p>
                                    <ul className="text-sm font-medium text-slate-700 space-y-1">
                                        {ticket.bundle.map(item => (
                                            <li key={item} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex gap-3 pt-6 border-t border-slate-100">
                                <button 
                                    onClick={() => setSelectedTicket(ticket)}
                                    className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <QrCode className="w-4 h-4" /> View QR
                                </button>
                                <button className="px-4 py-3 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {tickets.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <History className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No tickets found</h3>
                    <p className="text-slate-500">You haven't purchased any tickets in this category yet.</p>
                </div>
            )}

            {/* QR Modal */}
            <Modal
                isOpen={!!selectedTicket}
                onClose={() => setSelectedTicket(null)}
                title="Digital Access Pass"
            >
                {selectedTicket && (
                    <div className="text-center">
                        <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden mb-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-1">{selectedTicket.event}</h3>
                                <p className="text-orange-400 font-bold tracking-widest text-xs uppercase mb-8">{selectedTicket.type}</p>
                                
                                <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto mb-6 flex items-center justify-center">
                                    <div className="grid grid-cols-6 gap-1 w-full h-full">
                                        {[...Array(36)].map((_, i) => (
                                            <div key={i} className={`w-full h-full ${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'}`} />
                                        ))}
                                    </div>
                                </div>
                                
                                <p className="font-mono text-sm tracking-widest">{selectedTicket.qrCode}</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500">
                            Present this QR code at the virtual or physical entry point.
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
