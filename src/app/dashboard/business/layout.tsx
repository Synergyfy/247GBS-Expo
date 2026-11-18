"use client";

import { useState } from "react";
import BusinessSidebar from "../../component/BusinessSidebar";
import BusinessMobileNav from "../../component/BusinessMobileNav";
import DashboardHeader from "../../component/DashboardHeader";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-x-hidden relative">
      {/* Desktop Expandable Sidebar */}
      <BusinessSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area (No mobile left margin, responsive padding) */}
      <main
        className={`flex-1 min-w-0 w-full max-w-full transition-all duration-300 ml-0 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <DashboardHeader
          user={{
            name: "Acme Corp",
            role: "CHS Verified Exhibitor",
            email: "contact@acme.com",
            initials: "AC"
          }}
          searchPlaceholder="Search MCOM products, events, or messages..."
          dashboardType="business"
        />

        <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">{children}</div>
      </main>

      {/* Mobile Persistent Bottom Nav + Slide-Up Drawer */}
      <BusinessMobileNav />
    </div>
  );
}
