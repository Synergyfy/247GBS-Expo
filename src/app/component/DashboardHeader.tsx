"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Bell, ChevronDown, LogOut, User, Settings, Gift, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearStoredUser } from "@/lib/auth";
import { getStoredNotifications, INITIAL_NOTIFICATIONS } from "@/data/notifications";

const QUICK_SEARCH_ROUTES: Record<
    "admin" | "business" | "customer",
    Array<{ label: string; category: string; href: string; keywords: string }>
> = {
    admin: [
        { label: "Command Center", category: "Overview", href: "/dashboard/admin", keywords: "home overview dashboard kpi stats" },
        { label: "Notifications", category: "Alerts", href: "/dashboard/admin/notifications", keywords: "alerts bell inbox messages" },
        { label: "Event Types & Templates", category: "Events", href: "/dashboard/admin/events/templates", keywords: "templates events categories" },
        { label: "Season Passes & Plans", category: "Ticketing", href: "/dashboard/admin/passes", keywords: "passes tickets pricing caps" },
        { label: "Live Ticker Manager", category: "Broadcast", href: "/dashboard/admin/ticker", keywords: "ticker banner news announcements" },
        { label: "Create News Story", category: "Media", href: "/dashboard/admin/news/create", keywords: "news article blog publish" },
        { label: "Revenue & Settlements", category: "Finance", href: "/dashboard/admin/revenue", keywords: "finance money payout treasury gateway" },
        { label: "Support Desk", category: "Operations", href: "/dashboard/admin/support", keywords: "tickets helpdesk issues disputes" },
        { label: "System Health & Logs", category: "Infrastructure", href: "/dashboard/admin/health", keywords: "logs console uptime status" },
        { label: "Governance & API Keys", category: "Security", href: "/dashboard/admin/governance", keywords: "api keys webhooks mfa security" },
        { label: "Platform Configuration", category: "Settings", href: "/dashboard/admin/configuration", keywords: "settings tax rbac gateway firewall" },
    ],
    business: [
        { label: "Exhibitor Overview", category: "Overview", href: "/dashboard/business", keywords: "home overview dashboard stats" },
        { label: "Notifications", category: "Alerts", href: "/dashboard/business/notifications", keywords: "alerts bell inbox messages" },
        { label: "My Booth Studio", category: "Booth", href: "/dashboard/business/booth", keywords: "booth design branding setup" },
        { label: "Live Booth Preview", category: "Booth", href: "/dashboard/business/booth/preview", keywords: "preview live customer view" },
        { label: "Products & MCOM Mall", category: "Catalog", href: "/dashboard/business/products", keywords: "products catalog inventory mcom mall" },
        { label: "My Events", category: "Events", href: "/dashboard/business/events", keywords: "events schedule sessions live" },
        { label: "Ticket Tiers & Event Passes", category: "Ticketing", href: "/dashboard/business/events/tickets", keywords: "tickets passes tiers pricing caps" },
        { label: "Live Demos & Studio", category: "Broadcast", href: "/dashboard/business/demos", keywords: "demos livestream video studio" },
        { label: "Marketplace Events", category: "Discovery", href: "/dashboard/business/marketplace", keywords: "marketplace exhibit host discover" },
        { label: "Revenue & Settlements", category: "Finance", href: "/dashboard/business/revenue", keywords: "revenue payouts csv ledger earnings" },
        { label: "Exhibitor Settings", category: "Settings", href: "/dashboard/business/settings", keywords: "settings profile account preferences" },
    ],
    customer: [
        { label: "Visitor Overview", category: "Overview", href: "/dashboard/customer", keywords: "home overview dashboard qr entry" },
        { label: "Notifications", category: "Alerts", href: "/dashboard/customer/notifications", keywords: "alerts bell inbox messages" },
        { label: "My Tickets & Passes", category: "Access", href: "/dashboard/customer/tickets", keywords: "tickets passes qr code receipt" },
        { label: "My Schedule & Agenda", category: "Events", href: "/dashboard/customer/schedule", keywords: "schedule agenda pdf reminders sessions" },
        { label: "MCOM Rewards", category: "Loyalty", href: "/dashboard/customer/rewards", keywords: "rewards points redeem cashback" },
        { label: "Explore Booths", category: "Expo Hall", href: "/dashboard/customer/booths/101", keywords: "booths exhibitors chat consultation" },
        { label: "Profile", category: "Account", href: "/dashboard/customer/profile", keywords: "profile bio identity" },
        { label: "Settings", category: "Account", href: "/dashboard/customer/settings", keywords: "settings preferences security" },
    ],
};

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
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const [unreadCount, setUnreadCount] = useState(
        () => INITIAL_NOTIFICATIONS[dashboardType].filter((n) => !n.read).length
    );
    const router = useRouter();

    const routes = QUICK_SEARCH_ROUTES[dashboardType] || [];
    const filteredRoutes = searchQuery.trim()
        ? routes.filter((item) => {
            const q = searchQuery.toLowerCase();
            return (
                item.label.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q) ||
                item.keywords.toLowerCase().includes(q)
            );
        })
        : routes.slice(0, 6);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const refreshUnread = () => {
            const list = getStoredNotifications(dashboardType);
            setUnreadCount(list.filter((n) => !n.read).length);
        };
        refreshUnread();
        window.addEventListener("chs_notifications_changed", refreshUnread);
        return () => window.removeEventListener("chs_notifications_changed", refreshUnread);
    }, [dashboardType]);

    const handleLogout = () => {
        setProfileOpen(false);
        clearStoredUser();
        if (dashboardType === "business") {
            router.push("/login?role=business");
        } else if (dashboardType === "admin") {
            router.push("/login?role=admin");
        } else {
            router.push("/login?role=customer");
        }
    };

    const getProfileLink = () => {
        switch (dashboardType) {
            case "admin": return "/dashboard/admin/configuration";
            case "business": return "/dashboard/business/settings";
            case "customer": return "/dashboard/customer/profile";
            default: return "/";
        }
    };

    const getSettingsLink = () => {
        switch (dashboardType) {
            case "admin": return "/dashboard/admin/configuration";
            case "business": return "/dashboard/business/settings";
            case "customer": return "/dashboard/customer/settings";
            default: return "/";
        }
    };

    const getNotificationsLink = () => `/dashboard/${dashboardType}/notifications`;

    return (
        <header className="h-16 sm:h-20 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
            {/* Mobile Brand / Context Badge (visible on < lg) */}
            <div className="flex items-center gap-2.5 lg:hidden">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-orange-600/20">
                    {dashboardType === "admin" ? "A" : dashboardType === "business" ? "B" : "E"}
                </div>
                <div>
                    <span className="font-extrabold text-xs text-slate-900 uppercase tracking-tight block leading-tight">
                        247GBS Expo
                    </span>
                    <span className="text-[9px] font-bold text-orange-600 uppercase tracking-wider block">
                        {dashboardType === "admin"
                            ? "Admin Portal"
                            : dashboardType === "business"
                            ? "Exhibitor Portal"
                            : "Visitor Portal"}
                    </span>
                </div>
            </div>

            {/* Desktop Search Bar */}
            <div ref={searchRef} className="relative w-80 hidden xl:block">
                <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setSearchOpen(true)}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && filteredRoutes.length > 0) {
                            e.preventDefault();
                            router.push(filteredRoutes[0].href);
                            setSearchOpen(false);
                            setSearchQuery("");
                        } else if (e.key === "Escape") {
                            setSearchOpen(false);
                        }
                    }}
                    placeholder={searchPlaceholder || "Search..."}
                    className="w-full pl-12 pr-9 py-2.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all text-sm"
                />
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                {searchQuery && (
                    <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}

                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden"
                        >
                            <div className="px-3.5 py-1.5 border-b border-slate-50 flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    {searchQuery.trim() ? "Matching Pages" : "Quick Jump"}
                                </span>
                                <span className="text-[10px] font-medium text-slate-400">
                                    {filteredRoutes.length} {filteredRoutes.length === 1 ? "result" : "results"}
                                </span>
                            </div>
                            {filteredRoutes.length > 0 ? (
                                <div className="max-h-72 overflow-y-auto py-1">
                                    {filteredRoutes.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => {
                                                setSearchOpen(false);
                                                setSearchQuery("");
                                            }}
                                            className="flex items-center justify-between px-3.5 py-2.5 hover:bg-orange-50 transition-colors group"
                                        >
                                            <div>
                                                <p className="text-xs font-bold text-slate-900 group-hover:text-orange-600">
                                                    {item.label}
                                                </p>
                                                <p className="text-[10px] font-medium text-slate-400">
                                                    {item.category}
                                                </p>
                                            </div>
                                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-600 shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-4 py-6 text-center">
                                    <p className="text-xs font-semibold text-slate-500">
                                        No matching pages for &ldquo;{searchQuery}&rdquo;
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
                {/* Notifications Page Link */}
                <Link
                    href={getNotificationsLink()}
                    aria-label="Notifications"
                    className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-all relative group"
                >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20 group-hover:scale-110 transition-transform" />
                    )}
                </Link>

                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

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
                                        href={getProfileLink()}
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
