"use client";

import React, { useState } from "react";
import { ChevronDown, LogOut, User, Gift, LayoutDashboard, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearStoredUser } from "@/lib/auth";

export interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    role?: "customer" | "business" | "admin" | string;
  };
  compact?: boolean;
}

export function getInitials(name?: string, email?: string): string {
  if (name && name.trim()) {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email && email.trim()) {
    return email.slice(0, 2).toUpperCase();
  }
  return "JD";
}

export default function ProfileDropdown({ user, compact = false }: ProfileDropdownProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setProfileOpen(false);
    clearStoredUser();
    router.push("/");
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const role = user.role || "customer";
  const dashboardLink =
    role === "business"
      ? "/dashboard/business"
      : role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/customer";

  const initials = getInitials(user.name, user.email);

  return (
    <div className="relative">
      <div
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group select-none"
        aria-label="User profile menu"
      >
        {!compact && (
          <div className="text-right hidden sm:block">
            <p className="text-xs sm:text-sm font-black text-slate-900 leading-none group-hover:text-orange-600 transition-colors uppercase tracking-tight">
              {user.name}
            </p>
            <p className="text-[9px] sm:text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-0.5">
              {role === "business" ? "Exhibitor" : role === "admin" ? "Admin" : "Visitor"}
            </p>
          </div>
        )}

        {/* Squircle Initials Avatar identical to Dashboard */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-orange-600/20 border-2 border-white group-hover:scale-105 transition-all shrink-0">
          {initials}
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 transition-transform duration-300 ${
            profileOpen ? "rotate-180 text-orange-600" : ""
          }`}
        />
      </div>

      <AnimatePresence>
        {profileOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setProfileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-56 sm:w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden text-left"
            >
              <div className="px-4 py-3 border-b border-slate-100 mb-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                  Signed in as
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
              </div>

              <Link
                href={dashboardLink}
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-orange-600" />
                <span>My Dashboard</span>
              </Link>

              {role === "customer" && (
                <>
                  <Link
                    href="/dashboard/customer/tickets"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <Ticket className="w-4 h-4 text-orange-600" />
                    <span>My Passes & Tickets</span>
                  </Link>
                  <Link
                    href="/dashboard/customer/rewards"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <Gift className="w-4 h-4 text-orange-600" />
                    <span>MCOM Rewards</span>
                  </Link>
                </>
              )}

              <div className="border-t border-slate-100 mt-1 pt-1">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
