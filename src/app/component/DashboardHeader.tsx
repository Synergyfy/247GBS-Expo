"use client";

import React, { useState } from "react";
import { Search, Bell, ChevronDown, LogOut, User, Settings, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
    user: {
        name: string;
        role: string;
        email: string;
        initials: string;
    };
    searchPlaceholder?: string;
    dashboardType: "admin" | "business" | "customer";
}

export default function DashboardHeader({ user, searchPlaceholder, dashboardType }: DashboardHeaderProps) {
    const [profileOpen, setProfileOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        setProfileOpen(false);
        // Clear session logic would go here
        router.push("/");
    };

    const getSettingsLink = () => {
        switch (dashboardType) {
            case "admin": return "/dashboard/admin/configuration";
            case "business": return "/dashboard/business/settings";
            case "customer": return "/dashboard/customer";
            default: return "/";
        }
    };

    return (
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between">
            <div className="relative w-80 hidden xl:block">
                <input
                    type="text"
                    placeholder={searchPlaceholder || "Search..."}
                    className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all text-sm"
                />
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-all relative group">
                    <Bell className="w-5 h-5" />
                    <div className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20 group-hover:scale-110 transition-transform"></div>
                </button>

                <div className="h-8 w-px bg-slate-200 mx-2"></div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <div
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-black text-slate-900 leading-none group-hover:text-orange-600 transition-colors uppercase tracking-tight">{user.name}</p>
                            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">{user.role}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black shadow-lg shadow-orange-600/20 border-2 border-white group-hover:scale-105 transition-all">
                            {user.initials}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
                    </div>

                    <AnimatePresence>
                        {profileOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setProfileOpen(false)}
                                ></div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden"
                                >
                                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                                        <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                                    </div>

                                    <Link
                                        href={getSettingsLink()}
                                        onClick={() => setProfileOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                    >
                                        <User className="w-4 h-4" />
                                        Profile Settings
                                    </Link>

                                    {dashboardType === "customer" && (
                                        <Link
                                            href="/dashboard/customer/rewards"
                                            onClick={() => setProfileOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <Gift className="w-4 h-4" />
                                            My Rewards
                                        </Link>
                                    )}

                                    <Link
                                        href={getSettingsLink()}
                                        onClick={() => setProfileOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Account Settings
                                    </Link>

                                    <div className="border-t border-slate-50 mt-1 pt-1">
                                        <button
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
