"use client";

import React, { useState } from "react";
import CustomerSidebar from "../../component/CustomerSidebar";
import CustomerMobileNav from "../../component/CustomerMobileNav";
import DashboardHeader from "../../component/DashboardHeader";
import { Radio, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex text-slate-900 relative overflow-x-clip max-w-full">
      {/* Desktop Collapsible Sidebar */}
      <CustomerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Wrapper (No mobile left margin, full responsive width) */}
      <main
        className={`flex-1 min-w-0 w-full max-w-full overflow-x-clip transition-all duration-300 ml-0 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Top Bar with Compact Live Indicator */}
        <div className="sticky top-0 z-30 flex flex-col">
          <DashboardHeader
            user={{
              name: "John Doe",
              role: "Visitor",
              email: "john.doe@example.com",
              initials: "JD"
            }}
            searchPlaceholder="Search booths, events, or MCOM rewards..."
            dashboardType="customer"
          />

          {/* Compact Live Event Strip */}
          <div className="h-8 bg-orange-600 px-4 sm:px-6 flex items-center justify-center">
            <Link
              href="/dashboard/customer/events/spring2026/lobby"
              className="flex items-center gap-1.5 text-white hover:opacity-90 transition-opacity truncate"
            >
              <Radio className="w-3 h-3 shrink-0 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider truncate">
                Live Now: Global Innovation Fair 2026
              </span>
              <ArrowRight className="w-3 h-3 shrink-0" />
            </Link>
          </div>
        </div>

        {/* Page Content with Safe Bottom Padding for Mobile Nav */}
        <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 w-full max-w-full overflow-x-clip">{children}</div>
      </main>

      {/* Mobile Persistent Bottom Nav + More Drawer */}
      <CustomerMobileNav />
    </div>
  );
}
