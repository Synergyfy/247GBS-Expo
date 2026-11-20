"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut
} from "lucide-react";
import {
  CUSTOMER_NAV_GROUPS,
  isCustomerRouteActive
} from "./customerNavConfig";
import { clearStoredUser } from "@/lib/auth";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CustomerSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "expo-discovery": true,
    "wallet-rewards": true
  });

  useEffect(() => {
    for (const group of CUSTOMER_NAV_GROUPS) {
      if (group.items.some((item) => isCustomerRouteActive(pathname, item.href))) {
        setExpandedGroups((prev) => ({ ...prev, [group.id]: true }));
      }
    }
  }, [pathname]);

  const toggleGroup = (groupId: string) => {
    if (!isOpen) {
      setIsOpen(true);
      setExpandedGroups((prev) => ({ ...prev, [groupId]: true }));
      return;
    }
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleLogout = () => {
    clearStoredUser();
    router.push("/login?role=customer");
  };

  return (
    <aside
      className={`hidden lg:flex bg-white border-r border-slate-200 transition-all duration-300 fixed left-0 top-0 h-screen z-40 flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header / Logo */}
      <div className={`h-16 w-full ${isOpen ? "px-4 justify-between" : "px-2 justify-center gap-1.5"} flex items-center border-b border-slate-100 shrink-0`}>
        <Link href="/" className="flex items-center gap-2.5 min-w-0 group">
          <div className="w-8 h-8 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0 group-hover:scale-105 transition-transform">
            E
          </div>
          {isOpen && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-sm text-slate-900 leading-none tracking-tight uppercase truncate">
                247GBS
              </span>
              <span className="text-[9px] font-bold text-orange-600 tracking-widest uppercase mt-0.5 truncate">
                Visitor Portal
              </span>
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-500 flex items-center justify-center transition-all shrink-0 cursor-pointer"
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Grouped Navigation */}
      <div className="flex-1 px-3 py-4 overflow-y-auto overflow-x-hidden custom-scrollbar space-y-3">
        {CUSTOMER_NAV_GROUPS.map((group) => {
          const GroupIcon = group.icon;
          const isGroupActive = group.items.some((item) =>
            isCustomerRouteActive(pathname, item.href)
          );
          const isExpanded = expandedGroups[group.id] ?? true;

          return (
            <div key={group.id} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                title={!isOpen ? group.label : undefined}
                className={`w-full flex items-center ${
                  isOpen ? "justify-between px-2.5" : "justify-center px-0"
                } py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isGroupActive
                    ? "text-orange-600 bg-orange-50/60"
                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <GroupIcon className="w-4 h-4 shrink-0" />
                  {isOpen && <span className="truncate">{group.label}</span>}
                </div>
                {isOpen && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {(isExpanded || !isOpen) && (
                <div className={`${isOpen ? "pl-2 space-y-0.5" : "space-y-1"}`}>
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    const active = isCustomerRouteActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={!isOpen ? item.label : undefined}
                        className={`flex items-center ${
                          isOpen ? "gap-2.5 px-3 py-2" : "justify-center py-2.5"
                        } rounded-xl transition-all duration-200 group ${
                          active
                            ? "bg-orange-600 text-white shadow-xs"
                            : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                        }`}
                      >
                        <ItemIcon
                          className={`w-4 h-4 shrink-0 ${
                            active ? "text-white" : "text-slate-400 group-hover:text-orange-600"
                          }`}
                        />
                        {isOpen && (
                          <div className="flex items-center justify-between w-full min-w-0">
                            <span className="font-bold text-xs truncate">{item.label}</span>
                            {item.badge && (
                              <span
                                className={`text-[9px] font-black uppercase tracking-wider ${
                                  active ? "text-orange-100" : "text-red-600"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer / User Profile Area */}
      <div className="p-3 border-t border-slate-100 shrink-0 space-y-2.5">
        <div className={`flex items-center ${isOpen ? "gap-2.5 px-1" : "justify-center"}`}>
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs shrink-0">
            JD
          </div>
          {isOpen && (
            <div className="flex flex-col min-w-0 overflow-hidden">
              <span className="font-bold text-slate-900 text-xs truncate">John Doe</span>
              <span className="text-[10px] text-orange-600 font-bold uppercase truncate">
                VIP Pass Holder
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className={`w-full flex items-center ${
            isOpen ? "gap-2.5 px-3" : "justify-center"
          } py-2 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {isOpen && <span className="font-bold text-xs">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
