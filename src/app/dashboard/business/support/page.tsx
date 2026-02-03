"use client";

import { LifeBuoy, MessageSquare, FileText, Search, ExternalLink } from "lucide-react";

export default function BusinessSupportPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">Support & Dispute Center</h1>
                <p className="text-slate-500">Get help with event setup, ticketing issues, and transaction disputes.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                        <LifeBuoy className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Help Documentation</h3>
                    <p className="text-sm text-slate-500 mb-6">Step-by-step guides on creating events and managing rewards.</p>
                    <button className="mt-auto text-orange-600 font-bold text-sm flex items-center gap-2 hover:underline">
                        Browse Docs <ExternalLink className="w-4 h-4" />
                    </button>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Live Support Chat</h3>
                    <p className="text-sm text-slate-500 mb-6">Talk directly to our platform experts for immediate technical assistance.</p>
                    <button className="mt-auto bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all">
                        Start Chat
                    </button>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Resolution Center</h3>
                    <p className="text-sm text-slate-500 mb-6">Open and track tickets for refund requests or transaction disputes.</p>
                    <button className="mt-auto border border-slate-200 text-slate-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                        View My Tickets
                    </button>
                </div>
            </div>
        </div>
    );
}
