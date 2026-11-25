"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { User, Store, ShieldCheck, ArrowLeft, LogIn, Ticket } from "lucide-react";
import { setStoredUser } from "@/lib/auth";

const CHS_BASE_URL =
  process.env.NEXT_PUBLIC_CHS_URL || "https://centralhubsolution.com";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-orange-600 font-bold animate-pulse text-sm">
          Loading...
        </div>
      }
    >
      <LoginSplitScreen />
    </Suspense>
  );
}

function LoginSplitScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const isFromTickets = redirect.startsWith("/tickets");

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left 50% — Editorial Visual Panel (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 text-white flex-col justify-between p-12 overflow-hidden">
        <img
          src="/hero.webp"
          alt="247GBS Digital Expo Hall"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/60" />

        {/* Top Brand */}
        <Link href="/" className="relative z-10 inline-flex items-center gap-2.5 w-fit">
          <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-black text-sm shadow-md">
            E
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            247GBS Expo
          </span>
        </Link>

        {/* Center Editorial Copy */}
        <div className="relative z-10 max-w-md space-y-4 my-auto">
          <h2 className="text-4xl font-extrabold tracking-tight leading-[1.12] text-white">
            Elevate your brand presence in the digital expo.
          </h2>
          <p className="text-sm text-slate-200/90 leading-relaxed">
            Join thousands of exhibitors and global buyers powered by Central Hub Solutions for 24/7 digital trade halls and live commerce.
          </p>
        </div>

        {/* Bottom Legal */}
        <p className="relative z-10 text-[11px] font-semibold tracking-wider uppercase text-slate-300/80">
          © 2026 247GBS Digital Expo Marketplace
        </p>
      </div>

      {/* Right 50% — Clean Minimalist Auth Panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 sm:px-12 lg:px-20 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Brand + Back to Home */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="flex lg:hidden items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center font-black text-xs">
                E
              </div>
              <span className="font-extrabold text-sm text-slate-900">247GBS Expo</span>
            </div>
          </div>

          {isFromTickets && (
            <div className="mb-5 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-2.5 text-xs text-orange-800">
              <Ticket className="w-4 h-4 text-orange-600 shrink-0" />
              <p className="font-medium leading-snug">
                Sign in with your Central Hub Solutions account to complete your ticket payment.
              </p>
            </div>
          )}

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Sign in with your Central Hub Solutions account to continue.
            </p>
          </div>

          {/* Primary CHS Sign-In Button (Matches 247GBS Affiliate Clean Style) */}
          <a
            href={`${CHS_BASE_URL}/login`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-5 rounded-xl bg-white border border-slate-200 hover:border-orange-500 hover:bg-orange-50/40 text-slate-900 font-bold text-xs sm:text-sm shadow-2xs transition-all flex items-center justify-center gap-2.5"
          >
            <LogIn className="w-4 h-4 text-orange-600 shrink-0" />
            <span>Sign in with Central Hub Solutions</span>
          </a>

          {/* Subtle Instant Demo Access for Local Preview */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Instant Demo Access
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setStoredUser({
                    name: "Jane Doe",
                    email: "customer@247gbs.com",
                    role: "customer"
                  });
                  if (redirect) router.push(redirect);
                  else router.push("/dashboard/customer");
                }}
                className="flex flex-col items-center gap-1 p-2.5 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Customer</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setStoredUser({
                    name: "Acme Corp",
                    email: "business@247gbs.com",
                    role: "business"
                  });
                  router.push("/dashboard/business");
                }}
                className="flex flex-col items-center gap-1 p-2.5 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100 cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Business</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setStoredUser({
                    name: "Central Admin",
                    email: "admin@247gbs.com",
                    role: "admin"
                  });
                  router.push("/dashboard/admin");
                }}
                className="flex flex-col items-center gap-1 p-2.5 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Admin</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-[10px] font-semibold tracking-widest uppercase text-slate-400">
            © 2026 247GBS Digital Expo Marketplace
          </p>
        </div>
      </div>
    </div>
  );
}
