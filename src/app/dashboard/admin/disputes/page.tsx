"use client";

import { useState } from "react";
import { 
    MessageSquare, AlertCircle, CheckCircle, Clock, 
    MoreHorizontal, Filter, Search, User, Gavel
} from "lucide-react";

// Mock Dispute Data
const DISPUTES = [
    {
        id: "DSP-4421",
        subject: "Refund Request: Event Cancelled",
        complainant: "Alice M.",
        respondent: "TechFlow Inc.",
        status: "OPEN",
        priority: "HIGH",
        date: "2h ago",
        amount: "£299.00"
    },
    {
        id: "DSP-4422",
        subject: "Ticket Not Received",
        complainant: "Bob D.",
        respondent: "Expo Organizer",
        status: "REVIEW",
        priority: "MEDIUM",
        date: "5h ago",
        amount: "£50.00"
    },
    {
        id: "DSP-4420",
        subject: "Vendor Misrepresentation",
        complainant: "Sarah J.",
        respondent: "GreenEnergy Booth",
        status: "MEDIATE",
        priority: "CRITICAL",
        date: "1d ago",
        amount: "N/A"
    },
    {
        id: "DSP-4418",
        subject: "Duplicate Charge",
        complainant: "Mike R.",
        respondent: "Platform",
        status: "DECIDE",
        priority: "HIGH",
        date: "2d ago",
        amount: "£150.00"
    }
];

const STAGES = [
    { id: "OPEN", label: "Open Intake", color: "border-slate-200" },
    { id: "REVIEW", label: "Under Review", color: "border-blue-200" },
    { id: "MEDIATE", label: "Mediation", color: "border-purple-200" },
    { id: "DECIDE", label: "Final Decision", color: "border-orange-200" }
];

export default function DisputesPage() {
    return (
        <div className="max-w-7xl mx-auto pb-12 h-[calc(100vh-140px)] flex flex-col">
            {/* Header */}
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Dispute Center</h1>
                    <p className="text-slate-500">Arbitration workflow for customer and business disputes.</p>
                </div>
                <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 flex items-center gap-2">
                    <Gavel className="w-5 h-5" /> Issue Ruling
                </button>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-6 min-w-[1000px] h-full">
                    {STAGES.map((stage) => {
                        const stageItems = DISPUTES.filter(d => d.status === stage.id);
                        
                        return (
                            <div key={stage.id} className="flex-1 flex flex-col h-full">
                                <div className={`flex items-center justify-between p-4 bg-white border-b-4 ${stage.color} rounded-t-2xl shadow-sm mb-4`}>
                                    <h3 className="font-bold text-slate-700">{stage.label}</h3>
                                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">{stageItems.length}</span>
                                </div>

                                <div className="flex-1 bg-slate-100/50 rounded-2xl p-4 space-y-4 overflow-y-auto custom-scrollbar border border-slate-200/50">
                                    {stageItems.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                                                    item.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                                                    item.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {item.priority}
                                                </span>
                                                <button className="text-slate-400 hover:text-slate-600">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                            
                                            <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">{item.subject}</h4>
                                            <p className="text-xs text-slate-500 mb-4">ID: {item.id}</p>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                                    <User className="w-3 h-3 text-slate-400" />
                                                    <span className="truncate max-w-[120px]">{item.complainant}</span>
                                                    <span className="text-slate-300">vs</span>
                                                    <span className="truncate max-w-[120px]">{item.respondent}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                                    <AlertCircle className="w-3 h-3 text-slate-400" />
                                                    Claim: {item.amount}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.date}</span>
                                                <span className="font-bold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">Review &rarr;</span>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {stageItems.length === 0 && (
                                        <div className="text-center py-10 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                                            No disputes
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}