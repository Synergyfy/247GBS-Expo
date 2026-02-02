"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// --- ICONS ---
const SearchIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const BellIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
);

export default function CustomerHeader() {
    const pathname = usePathname();

    const navItems = [
        { label: "Lobby", href: "/dashboard/customer" },
        { label: "My Tickets", href: "/dashboard/customer/tickets" },
        { label: "Booths", href: "/dashboard/customer/booths" },
        { label: "Live Schedule", href: "/dashboard/customer/schedule" },
        { label: "My Rewards", href: "/dashboard/customer/rewards" },
    ];

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
                        <span className="font-bold text-slate-900 text-lg">Expo Visitor</span>
                    </Link>

                    <nav className="hidden md:flex gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`font-medium transition-colors ${isActive ? 'text-orange-600' : 'text-slate-500 hover:text-orange-600'}`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search booths..."
                            className="pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 outline-none w-64 transition-all"
                        />
                        <div className="absolute left-3 top-2.5 text-slate-400">
                            <SearchIcon className="w-5 h-5" />
                        </div>
                    </div>

                    <button className="text-slate-500 hover:text-slate-900 relative">
                        <BellIcon />
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                    </button>

                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold border-2 border-white shadow-sm">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
}
