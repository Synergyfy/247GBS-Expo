"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Building2,
  Users,
  MessageSquare,
  Gavel,
  ShieldCheck,
  AlertTriangle,
  History,
  Activity,
  Newspaper,
  Radio,
  Banknote,
  CreditCard,
  BarChart3,
  Settings,
  Headphones,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { ADMIN_NAV_GROUPS, MOBILE_PRIMARY_TABS } from "./adminNavConfig";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Building2,
  Users,
  MessageSquare,
  Gavel,
  ShieldCheck,
  AlertTriangle,
  History,
  Activity,
  Newspaper,
  Radio,
  Banknote,
  CreditCard,
  BarChart3,
  Settings,
  Headphones
};

function AdminMobileNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialOpen = searchParams?.get('drawer') === 'true';
  const [isDrawerOpen, setIsDrawerOpen] = useState(initialOpen);

  useEffect(() => {
    if (searchParams?.get('drawer') === 'true') {
      setIsDrawerOpen(true);
    }
  }, [searchParams]);

  // Determine active group for drawer auto-expansion
  const getActiveGroupId = (currentPath: string) => {
    for (const group of ADMIN_NAV_GROUPS) {
      for (const item of group.items) {
        const matches = item.exact
          ? currentPath === item.href
          : currentPath.startsWith(item.href);
        if (matches) return group.id;
      }
    }
    return ADMIN_NAV_GROUPS[0].id;
  };

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "platform-ops": true,
    "compliance-audit": true,
    "content-media": true,
    "financials-access": true
  });

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // When pathname changes, ensure active group is expanded
  useEffect(() => {
    const activeId = getActiveGroupId(pathname);
    setExpandedGroups(prev => ({
      ...prev,
      [activeId]: true
    }));
  }, [pathname]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const renderIcon = (name: string, className = "w-4 h-4") => {
    const Component = ICON_MAP[name] || LayoutDashboard;
    return <Component className={className} />;
  };

  // Check if current route is among the primary bottom bar tabs
  const isCurrentRoutePrimary = MOBILE_PRIMARY_TABS.some(t =>
    t.exact ? pathname === t.href : pathname.startsWith(t.href)
  );

  return (
    <>
      {/* PERSISTENT BOTTOM NAVIGATION BAR (Mobile & Tablet < lg) */}
      <nav
        aria-label="Mobile Admin Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-around gap-1">
          {MOBILE_PRIMARY_TABS.map((tab) => {
            const isActive = tab.exact
              ? pathname === tab.href
              : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setIsDrawerOpen(false)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
                  isActive
                    ? "text-orange-600 font-extrabold"
                    : "text-slate-500 hover:text-slate-900 font-medium"
                }`}
              >
                <div className="relative">
                  {renderIcon(tab.iconName, `w-5 h-5 ${isActive ? "text-orange-600 scale-105" : "text-slate-500"}`)}
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-[8px] font-black px-1 py-0.2 rounded-full ring-2 ring-white">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1 w-6 h-0.5 bg-orange-600 rounded-full"
                  />
                )}
              </Link>
            );
          })}

          {/* "More" Trigger Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
              isDrawerOpen || !isCurrentRoutePrimary
                ? "text-orange-600 font-extrabold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
            aria-label="Open More Admin Navigation"
            aria-expanded={isDrawerOpen}
          >
            <div className="relative">
              <Menu className={`w-5 h-5 ${isDrawerOpen || !isCurrentRoutePrimary ? "text-orange-600 scale-105" : "text-slate-500"}`} />
              {!isCurrentRoutePrimary && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-600 rounded-full ring-2 ring-white" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">More</span>
            {(isDrawerOpen || !isCurrentRoutePrimary) && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute -bottom-1 w-6 h-0.5 bg-orange-600 rounded-full"
              />
            )}
          </button>
        </div>
      </nav>

      {/* BOTTOM-SHEET DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDrawerOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={false}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 max-h-[84vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden border-t border-slate-200"
              role="dialog"
              aria-label="Complete Admin Navigation Drawer"
            >
              {/* Drawer Handle & Header */}
              <div className="pt-3 pb-2 px-5 border-b border-slate-100 flex flex-col items-center shrink-0 bg-slate-50/80">
                {/* Drag Handle Pill */}
                <div className="w-10 h-1 bg-slate-300 rounded-full mb-2.5" />
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center font-black text-xs">
                      A
                    </div>
                    <div>
                      <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 leading-none">
                        Admin Navigation
                      </h2>
                      <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                        Central Solution Console
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                    aria-label="Close drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Grouped Links List (Scrollable - Filtered to exclude primary navbar tabs) */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-8 custom-scrollbar">
                {(() => {
                  const primaryHrefs = new Set(MOBILE_PRIMARY_TABS.map((tab) => tab.href));
                  return ADMIN_NAV_GROUPS.map((group) => {
                    const nonDuplicateItems = group.items.filter((item) => !primaryHrefs.has(item.href));
                    if (nonDuplicateItems.length === 0) return null;

                    const isGroupExpanded = !!expandedGroups[group.id];
                    const hasActiveChild = nonDuplicateItems.some(item =>
                      item.exact ? pathname === item.href : pathname.startsWith(item.href)
                    );

                    return (
                      <div
                        key={group.id}
                        className="rounded-2xl border border-slate-100 bg-slate-50/70 overflow-hidden"
                      >
                        {/* Accordion Group Header */}
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors ${
                            hasActiveChild ? "bg-orange-50/80 text-orange-950 font-black" : "text-slate-700 font-bold"
                          }`}
                        >
                          <div className="flex items-center gap-2 text-xs">
                            <span className={hasActiveChild ? "text-orange-600" : "text-slate-500"}>
                              {renderIcon(group.iconName, "w-4 h-4")}
                            </span>
                            <span className="uppercase tracking-wider text-[11px]">
                              {group.title}
                            </span>
                          </div>
                          <span className="text-slate-400">
                            {isGroupExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5" />
                            )}
                          </span>
                        </button>

                        {/* Accordion Items */}
                        {isGroupExpanded && (
                          <div className="p-1.5 bg-white border-t border-slate-100 space-y-1">
                            {nonDuplicateItems.map((item) => {
                              const isActive = item.exact
                                ? pathname === item.href
                                : pathname.startsWith(item.href);

                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setIsDrawerOpen(false)}
                                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                                    isActive
                                      ? "bg-orange-600 text-white font-bold shadow-xs"
                                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium"
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className={isActive ? "text-white" : "text-slate-400"}>
                                      {renderIcon(item.iconName, "w-3.5 h-3.5")}
                                    </span>
                                    <span className="truncate">{item.label}</span>
                                  </div>
                                  {item.badge && (
                                    <span
                                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                                        isActive
                                          ? "bg-white text-orange-600"
                                          : "bg-orange-100 text-orange-700"
                                      }`}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function AdminMobileNav() {
  return (
    <Suspense fallback={null}>
      <AdminMobileNavContent />
    </Suspense>
  );
}
