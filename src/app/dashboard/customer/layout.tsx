"use client";

import CustomerHeader from "../../component/CustomerHeader";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <CustomerHeader />
            <main className="max-w-7xl mx-auto px-6 py-10">
                {children}
            </main>
        </div>
    );
}
