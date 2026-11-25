"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Building2, ShoppingBag, CheckCircle2, ArrowRight } from "lucide-react";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-[#FFF7ED] flex flex-col relative overflow-hidden">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-orange-600 font-bold animate-pulse text-sm">Loading Portal...</div>}>
        <SelectionContent />
      </Suspense>
    </div>
  );
}

function SelectionContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role");
  const [selectedRole, setSelectedRole] = useState<string | null>(initialRole || "business");

  useEffect(() => {
    if (initialRole) {
      setSelectedRole(initialRole);
    }
  }, [initialRole]);

  return (
    <>
      {/* Top Bar */}
      <nav className="w-full px-4 sm:px-6 py-4 z-30">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-orange-600 transition-colors text-xs sm:text-sm font-bold">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center text-white text-xs font-extrabold">E</div>
            <span className="text-xs font-extrabold text-slate-900">247GBS</span>
          </div>
        </div>
      </nav>

      {/* Main Content — 100% Above the Fold on Mobile */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-20 sm:pb-12 relative z-10">
        <div className="text-center mb-4 sm:mb-8 max-w-xl mx-auto">
          <h1 className="text-xl sm:text-4xl font-extrabold text-slate-900 mb-1 tracking-tight">
            {selectedRole ? (
              <>
                Welcome, Future{" "}
                <span className={selectedRole === "business" ? "text-orange-600" : "text-teal-600"}>
                  {selectedRole === "business" ? "Exhibitor" : "Explorer"}
                </span>
              </>
            ) : (
              "Join the Digital Expo"
            )}
          </h1>
          <p className="text-xs sm:text-base text-slate-500">
            Select your account pathway to unlock your personalized 24/7 dashboard.
          </p>
        </div>

        {/* Compact Dual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full max-w-3xl">
          {/* Business Role Card */}
          <div
            onClick={() => setSelectedRole("business")}
            className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-7 cursor-pointer transition-all border-2 bg-white flex flex-col justify-between ${
              selectedRole === "business"
                ? "border-orange-600 shadow-lg ring-2 ring-orange-100"
                : "border-slate-200/80 hover:border-orange-300 opacity-85 hover:opacity-100"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selectedRole === "business" ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-600"
                }`}>
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                {selectedRole === "business" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase">
                    Selected <CheckCircle2 className="w-3 h-3" />
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-xl font-extrabold text-slate-900 mb-1">I am a Business</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3">
                Launch a 24/7 digital exhibition booth, showcase products, capture buyer leads, and grow your network.
              </p>
            </div>

            <div className={`w-full py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold text-center transition-all ${
              selectedRole === "business"
                ? "bg-orange-600 border-orange-600 text-white"
                : "border-slate-200 text-slate-500 group-hover:border-orange-300"
            }`}>
              {selectedRole === "business" ? "Exhibitor Pathway Active" : "Select Business"}
            </div>
          </div>

          {/* Customer Role Card */}
          <div
            onClick={() => setSelectedRole("customer")}
            className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-7 cursor-pointer transition-all border-2 bg-white flex flex-col justify-between ${
              selectedRole === "customer"
                ? "border-teal-600 shadow-lg ring-2 ring-teal-100"
                : "border-slate-200/80 hover:border-teal-300 opacity-85 hover:opacity-100"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selectedRole === "customer" ? "bg-teal-600 text-white" : "bg-teal-100 text-teal-600"
                }`}>
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                {selectedRole === "customer" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700 text-[10px] font-bold uppercase">
                    Selected <CheckCircle2 className="w-3 h-3" />
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-xl font-extrabold text-slate-900 mb-1">I am a Visitor</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3">
                Explore global exhibition halls, attend live workshops, shop deals, and earn rewards for every interaction.
              </p>
            </div>

            <div className={`w-full py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold text-center transition-all ${
              selectedRole === "customer"
                ? "bg-teal-600 border-teal-600 text-white"
                : "border-slate-200 text-slate-500 group-hover:border-teal-300"
            }`}>
              {selectedRole === "customer" ? "Visitor Pathway Active" : "Select Visitor"}
            </div>
          </div>
        </div>

        {/* Continue CTA */}
        <div className="mt-5 sm:mt-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <a
              href={
                selectedRole === "customer"
                  ? `${process.env.NEXT_PUBLIC_CHS_URL || "https://centralhubsolution.com"}/register/customer`
                  : `${process.env.NEXT_PUBLIC_CHS_URL || "https://centralhubsolution.com"}/getstarted/business`
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto px-7 py-3 sm:px-9 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg transition-all active:scale-95 inline-flex items-center justify-center gap-2 ${
                selectedRole === "customer"
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              <span>Sign up with CHS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Sign in with CHS</span>
            </Link>
          </div>
          <p className="mt-2.5 text-[11px] sm:text-xs text-slate-500">
            Account registration and business verification are handled centrally on Central Hub Solution (CHS).
          </p>
        </div>
      </div>
    </>
  );
}
