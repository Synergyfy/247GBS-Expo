"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { ArrowLeft, Ticket, Sparkles } from "lucide-react";
import { setStoredUser } from "@/lib/auth";

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
  const role = searchParams.get("role") || "customer";
  const redirect = searchParams.get("redirect") || "";
  const preEmail = searchParams.get("email") || "";
  const preFirstName = searchParams.get("firstName") || "";
  const preLastName = searchParams.get("lastName") || "";

  const [firstName, setFirstName] = useState(preFirstName);
  const [lastName, setLastName] = useState(preLastName);
  const [email, setEmail] = useState(preEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [roleText, setRoleText] = useState("Explorer");

  const isFromTickets = redirect.startsWith("/tickets");

  useEffect(() => {
    if (role === "customer") {
      setRoleText("Explorer");
    } else {
      setRoleText("Exhibitor");
    }
  }, [role]);

  const handleSignup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    const fullName = `${firstName} ${lastName}`.trim() || "Expo Visitor";
    setStoredUser({
      name: fullName,
      email: email || "visitor@247gbs.com",
      role: role === "business" ? "business" : "customer"
    });

    if (redirect) {
      router.push(redirect);
    } else if (role === "customer") {
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

      {isFromTickets && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-2.5 text-xs text-orange-800">
          <Ticket className="w-4 h-4 text-orange-600 shrink-0" />
          <p className="font-medium leading-snug">
            Please create an account to book and manage your Expo passes and tickets.
          </p>
        </div>
      )}

      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-0.5">Create Account</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Join as a <span className="text-orange-600 font-bold capitalize">{role || "Explorer"}</span> ({roleText})
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleSignup}>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
              placeholder="Jane"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
            placeholder="name@company.com"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Confirm</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-slate-950 text-white py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-orange-600 transition-colors shadow-md mt-1 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{isFromTickets ? "Sign Up & Continue Booking" : "Create Account"}</span>
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link
          href={`/login?role=${role || ""}${redirect ? `&redirect=${encodeURIComponent(redirect)}` : ""}`}
          className="text-orange-600 font-bold hover:underline"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
