"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#FFF7ED] flex flex-col justify-center items-center px-4 pt-6 pb-24 sm:py-12 relative overflow-hidden">
      <Suspense fallback={<div className="text-orange-600 font-bold animate-pulse text-sm">Loading Registration...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const preEmail = searchParams.get("email") || "";
  const preFirstName = searchParams.get("firstName") || "";
  const preLastName = searchParams.get("lastName") || "";

  const [roleText, setRoleText] = useState("Exhibitor");

  useEffect(() => {
    if (role === "customer") {
      setRoleText("Explorer");
    } else {
      setRoleText("Exhibitor");
    }
  }, [role]);

  const handleSignup = () => {
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

      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-0.5">Create Account</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Join as a <span className="text-orange-600 font-bold capitalize">{role || "Business"}</span> ({roleText})
        </p>
      </div>

      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">First Name</label>
            <input
              type="text"
              defaultValue={preFirstName}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
              placeholder="Jane"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Last Name</label>
            <input
              type="text"
              defaultValue={preLastName}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Email Address</label>
          <input
            type="email"
            defaultValue={preEmail}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
            placeholder="name@company.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Confirm</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-slate-950 text-white py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-orange-600 transition-colors shadow-md mt-1"
        >
          Create Account & Sync CHS
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link href={`/login?role=${role || ""}`} className="text-orange-600 font-bold hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
