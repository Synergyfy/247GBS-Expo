"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Handshake, 
  Images, 
  CalendarDays, 
  X, 
  Globe, 
  Lightbulb, 
  Store, 
  Ticket, 
  Newspaper, 
  LogIn, 
  ArrowRight,
  ChevronRight,
  Sparkles,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getStoredUser } from "@/lib/auth";

export default function BottomNav() {
  const pathname = usePathname();
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setCurrentUser(getStoredUser());
  }, [pathname]);

  // Do not render bottom nav inside dashboard routes
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const isHome = pathname === "/";
  const isExplore = pathname === "/tickets";
  const isHost = pathname === "/exhibit" || pathname === "/partnership";
  const isEvents = pathname?.startsWith("/events") || isEventsOpen;

  return (
    <>
      {/* Fixed Bottom Navigation Bar on Mobile (Storyline §10 Alignment) */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] lg:hidden"
      >
        <div className="grid grid-cols-4 items-center max-w-md mx-auto">
          {/* Tab 1: Home */}
          <Link
            href="/"
            onClick={() => setIsEventsOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 ${
              isHome && !isEventsOpen
                ? "text-orange-600 font-bold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              isHome && !isEventsOpen ? "bg-orange-50 text-orange-600" : ""
            }`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Home</span>
          </Link>

          {/* Tab 2: Explore Events */}
          <Link
            href="/tickets"
            onClick={() => setIsEventsOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 ${
              isExplore && !isEventsOpen
                ? "text-orange-600 font-bold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              isExplore && !isEventsOpen ? "bg-orange-50 text-orange-600" : ""
            }`}>
              <Ticket className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 text-center truncate max-w-[80px]">
              Explore
            </span>
          </Link>

          {/* Tab 3: Host an Event */}
          <Link
            href="/exhibit"
            onClick={() => setIsEventsOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 ${
              isHost && !isEventsOpen
                ? "text-orange-600 font-bold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              isHost && !isEventsOpen ? "bg-orange-50 text-orange-600" : ""
            }`}>
              <Handshake className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 text-center truncate max-w-[80px]">
              Host Event
            </span>
          </Link>

          {/* Tab 4: Events (Opens Categories Sheet) */}
          <button
            type="button"
            onClick={() => setIsEventsOpen(!isEventsOpen)}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 relative ${
              isEvents
                ? "text-orange-600 font-bold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors relative ${
              isEvents ? "bg-orange-600 text-white shadow-md shadow-orange-600/30" : "bg-slate-100 text-slate-700"
            }`}>
              <CalendarDays className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 flex items-center gap-0.5">
              <span>Events</span>
              <Sparkles className="w-2.5 h-2.5 text-orange-500" />
            </span>
          </button>
        </div>
      </nav>

      {/* Events & More Features Bottom Sheet Modal */}
      <AnimatePresence>
        {isEventsOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setIsEventsOpen(false)}
            />

            {/* Bottom Sheet Card */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 inset-x-0 bg-white rounded-t-3xl max-h-[88vh] overflow-y-auto shadow-2xl border-t border-slate-200 pb-8 px-5 pt-3"
            >
              {/* Drag Handle Bar */}
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-orange-600/20">
                    E
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                      Events & Features
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Explore categories, book passes, or exhibit
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEventsOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Event Categories Section */}
              <div className="mb-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                  Event Formats
                </p>
                <div className="flex flex-col gap-2">
                  {/* Category 1: National Expo */}
                  <Link
                    href="/events/national"
                    onClick={() => setIsEventsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-orange-50/60 border border-orange-100 hover:bg-orange-50 transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-sm">National Expo</span>
                          <span className="px-1.5 py-0.2 bg-orange-600 text-white text-[9px] font-extrabold rounded-full">
                            FLAGSHIP
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">Platform-wide seasonal flagship exhibition</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-orange-600 shrink-0 ml-2" />
                  </Link>

                  {/* Category 2: Platform Events */}
                  <Link
                    href="/events/platform-led"
                    onClick={() => setIsEventsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/60 border border-blue-100 hover:bg-blue-50 transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-sm">Platform Events</span>
                          <span className="px-1.5 py-0.2 bg-blue-600 text-white text-[9px] font-extrabold rounded-full">
                            247GBS
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">Workshops, onboarding & product demonstrations</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  </Link>

                  {/* Category 3: Business Events */}
                  <Link
                    href="/events/business-led"
                    onClick={() => setIsEventsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-sm">Business Events</span>
                          <span className="px-1.5 py-0.2 bg-slate-700 text-white text-[9px] font-extrabold rounded-full">
                            BUSINESS
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">Brand showcases, product launches & live selling</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-700 shrink-0 ml-2" />
                  </Link>
                </div>
              </div>

              {/* Quick Actions (Get Tickets, News Pulse, Sign In) - No duplication of Exhibit */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                  {/* Action 1: Get Tickets (Requires Sign-in) */}
                  <Link
                    href={currentUser ? "/tickets" : "/signup?role=customer&redirect=/tickets"}
                    onClick={() => setIsEventsOpen(false)}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-600/25 active:scale-95"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Get Tickets</span>
                  </Link>

                  {/* Action 2: Expo News Pulse */}
                  <Link
                    href="/news"
                    onClick={() => setIsEventsOpen(false)}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-md active:scale-95 border border-slate-800"
                  >
                    <Newspaper className="w-4 h-4" />
                    <span>Expo Pulse</span>
                  </Link>
                </div>

                {/* Action 3: Account / Sign In */}
                {currentUser ? (
                  <Link
                    href={currentUser.role === "business" ? "/dashboard/business" : currentUser.role === "admin" ? "/dashboard/admin" : "/dashboard/customer"}
                    onClick={() => setIsEventsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-2xl border border-orange-200 bg-orange-50/50 text-orange-950 font-bold text-xs transition-colors"
                  >
                    <User className="w-4 h-4 text-orange-600" />
                    <span>Go to Dashboard ({currentUser.name})</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange-600 ml-auto" />
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsEventsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
                  >
                    <LogIn className="w-4 h-4 text-slate-500" />
                    <span>Sign in / Register</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 ml-auto" />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
