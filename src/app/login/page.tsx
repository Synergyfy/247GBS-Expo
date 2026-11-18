"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { User, Store, ShieldCheck, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FFF7ED] flex flex-col justify-center items-center px-4 pt-6 pb-24 sm:py-12 relative overflow-hidden">
      <Suspense fallback={<div className="text-orange-600 font-bold animate-pulse text-sm">Loading Gate...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const handleLogin = () => {
    if (role === "customer") {
      router.push("/dashboard/customer");
    } else {
      router.push("/dashboard/business");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 relative z-10 border border-orange-100">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-orange-600">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
          E
        </div>
      </div>

      <div className="text-center mb-5">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">Welcome Back</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Sign in to your <span className="text-orange-600 font-bold capitalize">{role || "Expo"}</span> account
        </p>
      </div>

      <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Email Address</label>
          <input
            type="email"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
            placeholder="name@company.com"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <a href="#" className="text-[11px] font-semibold text-orange-600 hover:underline">Forgot password?</a>
          </div>
          <input
            type="password"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-slate-950 text-white py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-orange-600 transition-colors shadow-md"
        >
          Sign In
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href={`/signup?role=${role || ""}`} className="text-orange-600 font-bold hover:underline">
          Create one
        </Link>
      </div>

      {/* Quick Access Demo Section */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <p className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Instant Demo Access
        </p>
        <div className="grid grid-cols-3 gap-2">
          <Link
            href="/dashboard/customer"
            className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100"
          >
            <User className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Customer</span>
          </Link>
          <Link
            href="/dashboard/business"
            className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100"
          >
            <Store className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Business</span>
          </Link>
          <Link
            href="/dashboard/admin"
            className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
