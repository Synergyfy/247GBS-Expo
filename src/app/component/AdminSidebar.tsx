"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LogOut
} from "lucide-react";
import { ADMIN_NAV_GROUPS } from "./adminNavConfig";
import { clearStoredUser } from "@/lib/auth";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

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

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearStoredUser();
    router.push("/login?role=admin");
  };

  // Find initial active group ID based on current pathname
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

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const active = getActiveGroupId(pathname);
    return { [active]: true };
  });

  // Keep ONLY the active category expanded when navigating; others remain collapsed
  useEffect(() => {
    const activeId = getActiveGroupId(pathname);
    setExpandedGroups({
      [activeId]: true
    });
  }, [pathname]);

  const toggleGroup = (groupId: string) => {
    if (!isOpen) {
      setIsOpen(true);
      setExpandedGroups({ [groupId]: true });
      return;
    }
    setExpandedGroups(prev => {
      const willOpen = !prev[groupId];
      // When opening a dropdown, collapse all other dropdowns
      return willOpen ? { [groupId]: true } : {};
    });
  };

  const renderIcon = (name: string, className = "w-4 h-4") => {
    const Component = ICON_MAP[name] || LayoutDashboard;
    return <Component className={className} />;
  };

  return (
    <aside
      className={`hidden lg:flex bg-orange-600 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } fixed top-0 bottom-0 left-0 z-30 flex-col items-center border-r border-orange-500 shadow-xl`}
    >
      {/* Brand Header */}
      <div className={`h-16 w-full ${isOpen ? "px-4 justify-between" : "px-2 justify-center gap-1.5"} flex items-center border-b border-orange-500/80 bg-orange-700/20 shrink-0`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-orange-600 font-black shadow-md shrink-0">
            A
          </div>
          {isOpen && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-sm tracking-tight uppercase leading-tight truncate">
                247GBS Expo
              </span>
              <span className="text-[9px] font-bold text-orange-200 uppercase tracking-widest truncate">
                Admin Console
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-7 h-7 rounded-lg bg-orange-700/40 hover:bg-orange-700/70 text-white flex items-center justify-center transition-all shrink-0 shadow-xs cursor-pointer"
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Grouped Navigation Links */}
      <nav className="flex-1 w-full space-y-4 px-3 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        {ADMIN_NAV_GROUPS.map((group) => {
          const isGroupExpanded = !!expandedGroups[group.id];
          const isGroupActive = group.items.some((item) =>
            item.exact ? pathname === item.href : pathname.startsWith(item.href)
          );

          return (
            <div key={group.id} className="w-full">
              {/* Group Header */}
              {isOpen ? (
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                    isGroupActive
                      ? "text-white font-extrabold bg-orange-700/30"
                      : "text-orange-200/90 hover:text-white hover:bg-orange-700/20 font-bold"
                  }`}
                  aria-expanded={isGroupExpanded}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={isGroupActive ? "text-white" : "text-orange-300"}>
                      {renderIcon(group.iconName, "w-4 h-4")}
                    </span>
                    <span className="text-xs uppercase tracking-wider truncate">
                      {group.title}
                    </span>
                  </div>
                  <span className="text-orange-300 ml-1 shrink-0">
                    {isGroupExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </span>
                </button>
              ) : (
                /* Collapsed Group Divider Icon */
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  title={group.title}
                  className={`w-full flex items-center justify-center py-2.5 rounded-xl transition-all ${
                    isGroupActive
                      ? "bg-white text-orange-600 shadow-md"
                      : "text-orange-200 hover:bg-orange-700/30 hover:text-white"
                  }`}
                >
                  {renderIcon(group.iconName, "w-5 h-5")}
                </button>
              )}

              {/* Group Child Items */}
              {isOpen && isGroupExpanded && (
                <div className="mt-1 space-y-1 pl-2">
                  {group.items.map((item) => {
                    const isActive = item.exact
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                          isActive
                            ? "bg-white text-orange-600 font-extrabold shadow-md shadow-orange-950/20"
                            : "text-orange-100 hover:bg-orange-700/40 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`shrink-0 transition-colors ${
                              isActive ? "text-orange-600" : "text-orange-200 group-hover:text-white"
                            }`}
                          >
                            {renderIcon(item.iconName, "w-4 h-4")}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${
                              isActive
                                ? "bg-orange-600 text-white"
                                : "bg-orange-500 text-white border border-orange-400/40"
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
        })}
      </nav>

      {/* Footer User Badge & Logout */}
      <div className="p-3 w-full border-t border-orange-500/80 bg-orange-700/20 shrink-0 space-y-2">
        <div className="flex items-center gap-2.5 px-1.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-900 font-black text-xs shrink-0 shadow-sm">
            SA
          </div>
          {isOpen && (
            <div className="text-left overflow-hidden min-w-0">
              <div className="text-xs font-extrabold truncate text-white leading-tight">
                Super Admin
              </div>
              <div className="text-[10px] text-orange-200 font-semibold tracking-wide truncate">
                Central Solution Verified
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className={`w-full flex items-center ${
            isOpen ? "gap-2.5 px-3" : "justify-center"
          } py-2 rounded-xl text-orange-100 hover:bg-red-500/30 hover:text-white transition-all cursor-pointer`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {isOpen && <span className="font-bold text-xs">Logout</span>}
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.35);
        }
      `}</style>
    </aside>
  );
}
