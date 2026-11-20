"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronRight } from "lucide-react";
import { clearStoredUser } from "@/lib/auth";
import {
  CUSTOMER_NAV_GROUPS,
  CUSTOMER_MOBILE_PRIMARY_TABS,
  isCustomerRouteActive
} from "./customerNavConfig";

export default function CustomerMobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isPrimaryRoute = CUSTOMER_MOBILE_PRIMARY_TABS.some((tab) =>
    isCustomerRouteActive(pathname, tab.href)
  );
  const isMoreActive = drawerOpen || !isPrimaryRoute;

  return (
    <>
      {/* Persistent Bottom Navigation Bar (Mobile & Tablet < lg) */}
      <nav
        aria-label="Customer mobile navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(15,23,42,0.06)]"
      >
        <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
          {CUSTOMER_MOBILE_PRIMARY_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = !drawerOpen && isCustomerRouteActive(pathname, tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-1 relative transition-colors ${
                  active ? "text-orange-600" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2.5 w-2 h-2 rounded-full bg-red-600" />
                  )}
                </div>
                <span className="text-[10px] font-bold tracking-tight">{tab.label}</span>
                {active && (
                  <span className="absolute bottom-0 w-6 h-0.5 bg-orange-600 rounded-t-full" />
                )}
              </Link>
            );
          })}

          {/* More Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen((prev) => !prev)}
            aria-expanded={drawerOpen}
            aria-label="More navigation options"
            className={`flex flex-col items-center justify-center gap-1 relative transition-colors ${
              isMoreActive ? "text-orange-600" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-tight">More</span>
            {isMoreActive && (
              <span className="absolute bottom-0 w-6 h-0.5 bg-orange-600 rounded-t-full" />
            )}
          </button>
        </div>
      </nav>

      {/* Slide-Up Bottom Sheet Drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Sheet */}
          <div className="relative bg-white rounded-t-3xl max-h-[82vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Drag Handle & Header */}
            <div className="pt-2.5 pb-3 px-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-600 text-white font-black text-xs flex items-center justify-center">
                  E
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Visitor Navigation
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    John Doe • VIP Pass Holder
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grouped Links (Filtered to exclude primary navbar tabs) */}
            <div className="p-4 overflow-y-auto space-y-4">
              {(() => {
                const primaryHrefs = new Set(CUSTOMER_MOBILE_PRIMARY_TABS.map((tab) => tab.href));
                return CUSTOMER_NAV_GROUPS.map((group) => {
                  const GroupIcon = group.icon;
                  const nonDuplicateItems = group.items.filter((item) => !primaryHrefs.has(item.href));
                  if (nonDuplicateItems.length === 0) return null;

                  return (
                    <div key={group.id} className="space-y-1.5">
                      <div className="flex items-center gap-1.5 px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <GroupIcon className="w-3.5 h-3.5 text-orange-600" />
                        <span>{group.label}</span>
                      </div>
                      <div className="bg-slate-50/80 rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                        {nonDuplicateItems.map((item) => {
                          const ItemIcon = item.icon;
                          const active = isCustomerRouteActive(pathname, item.href);
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setDrawerOpen(false)}
                              className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-colors ${
                                active
                                  ? "bg-orange-600 text-white"
                                  : "text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <ItemIcon
                                  className={`w-4 h-4 shrink-0 ${
                                    active ? "text-white" : "text-orange-600"
                                  }`}
                                />
                                <span className="truncate">{item.label}</span>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {item.badge && (
                                  <span
                                    className={`text-[9px] font-black uppercase ${
                                      active ? "text-orange-100" : "text-red-600"
                                    }`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                                <ChevronRight
                                  className={`w-3.5 h-3.5 ${
                                    active ? "text-white" : "text-slate-400"
                                  }`}
                                />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                });
              })()}

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  clearStoredUser();
                  router.push("/login?role=customer");
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

