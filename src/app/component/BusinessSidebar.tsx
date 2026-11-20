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
  BUSINESS_NAV_GROUPS,
  isBusinessRouteActive
} from "./businessNavConfig";
import { clearStoredUser } from "@/lib/auth";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function BusinessSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "booth-products": true,
    "events-ticketing": true,
    "sales-revenue": false,
    "communication-settings": false
  });

  useEffect(() => {
    for (const group of BUSINESS_NAV_GROUPS) {
      if (group.items.some((item) => isBusinessRouteActive(pathname, item))) {
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
    router.push("/login?role=business");
  };

  return (
    <aside
      className={`hidden lg:flex bg-orange-600 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } fixed left-0 top-0 h-screen z-40 flex-col shadow-xl`}
    >
      {/* Header / Brand */}
      <div className={`h-16 w-full ${isOpen ? "px-4 justify-between" : "px-2 justify-center gap-1.5"} flex items-center border-b border-orange-500/80 shrink-0`}>
        <Link href="/dashboard/business" className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-orange-600 font-extrabold text-sm shrink-0 shadow-xs">
            B
          </div>
          {isOpen && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-sm tracking-tight uppercase leading-none truncate">
                247GBS Expo
              </span>
              <span className="text-[9px] font-bold text-orange-200 tracking-widest uppercase mt-0.5 truncate">
                Exhibitor Hub
              </span>
            </div>
          )}
        </Link>

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

      {/* Grouped Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-2.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {BUSINESS_NAV_GROUPS.map((group) => {
          const GroupIcon = group.icon;
          const isGroupActive = group.items.some((item) =>
            isBusinessRouteActive(pathname, item)
          );
          const isExpanded = expandedGroups[group.id] ?? false;

          return (
            <div key={group.id} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                title={!isOpen ? group.label : undefined}
                className={`w-full flex items-center ${
                  isOpen ? "justify-between px-2.5" : "justify-center px-0"
                } py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isGroupActive
                    ? "text-white bg-orange-700/50"
                    : "text-orange-200 hover:text-white hover:bg-orange-700/30"
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
                    const active = isBusinessRouteActive(pathname, item);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={!isOpen ? item.label : undefined}
                        className={`flex items-center ${
                          isOpen ? "gap-2.5 px-3 py-2" : "justify-center py-2.5"
                        } rounded-xl transition-all group ${
                          active
                            ? "bg-white text-orange-600 shadow-sm"
                            : "text-orange-50 hover:bg-white/10"
                        }`}
                      >
                        <ItemIcon
                          className={`w-4 h-4 shrink-0 ${
                            active ? "text-orange-600" : "text-orange-100"
                          }`}
                        />
                        {isOpen && (
                          <div className="flex items-center justify-between w-full min-w-0">
                            <span className="text-xs font-bold truncate">{item.label}</span>
                            {item.badge && (
                              <span
                                className={`text-[10px] font-extrabold ${
                                  active ? "text-orange-600" : "text-orange-200"
                                }`}
                              >
                                ({item.badge})
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
      </nav>

      {/* Footer / User Profile */}
      <div className="p-3 border-t border-orange-500/80 shrink-0 space-y-2.5">
        <div className={`flex items-center ${isOpen ? "gap-2.5 px-1" : "justify-center"}`}>
          <div className="w-8 h-8 rounded-full bg-white text-orange-600 font-extrabold text-xs flex items-center justify-center shrink-0">
            AC
          </div>
          {isOpen && (
            <div className="text-left overflow-hidden min-w-0">
              <div className="text-xs font-bold text-white truncate">Acme Corp</div>
              <div className="text-[10px] text-orange-200 font-bold uppercase truncate">
                Verified Partner • PRO
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className={`w-full flex items-center ${
            isOpen ? "gap-2.5 px-3" : "justify-center"
          } py-2 rounded-xl text-orange-100 hover:bg-red-500/30 hover:text-white transition-all`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {isOpen && <span className="font-bold text-xs">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
