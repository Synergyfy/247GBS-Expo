"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

const CHS_BASE_URL =
  process.env.NEXT_PUBLIC_CHS_URL || "https://centralhubsolution.com";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#FFF7ED] flex flex-col justify-center items-center px-4 pt-6 pb-24 sm:py-12 relative overflow-hidden">
      <Suspense fallback={<div className="text-orange-600 font-bold animate-pulse text-sm">Loading...</div>}>
        <SignupRedirectCard />
      </Suspense>
    </div>
  );
}

function SignupRedirectCard() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "business";
  const isBusiness = role === "business";
  const chsRegisterUrl = isBusiness
    ? `${CHS_BASE_URL}/getstarted/business`
    : `${CHS_BASE_URL}/register/customer`;

  return (
    <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 relative z-10 border border-orange-100 text-center">
      <div className="flex items-center justify-between mb-5">
        <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-orange-600">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
          E
        </div>
      </div>

      <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4 border border-orange-100">
        <ShieldCheck className="w-6 h-6" />
      </div>

      <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5">
        Sign up with CHS
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
        {isBusiness
          ? "Business registration and verification are handled centrally on Central Hub Solution (CHS). Complete signup on CHS to unlock your 247GBS Expo Exhibitor Dashboard."
          : "Customer registration is handled centrally on Central Hub Solution (CHS). Register once on CHS to manage your Expo tickets and rewards."}
      </p>

      <div className="space-y-2.5">
        <a
          href={chsRegisterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-orange-600 text-white py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm hover:bg-orange-700 transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <span>Sign up with CHS</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        <Link
          href="/login"
          className="w-full py-3 px-5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-200 transition-colors flex items-center justify-center"
        >
          Sign in with CHS
        </Link>
      </div>
    </div>
  );
}
