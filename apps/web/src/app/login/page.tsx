"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { User, Store, ShieldCheck, ArrowLeft, Ticket, X, CheckCircle2, Mail } from "lucide-react";
import { setStoredUser } from "@/lib/auth";

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
  const searchRole = searchParams.get("role");
  const redirect = searchParams.get("redirect") || "";

  const [activeRole, setActiveRole] = useState<"customer" | "business" | "admin">(
    searchRole === "business" ? "business" : searchRole === "admin" ? "admin" : "customer"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const isFromTickets = redirect.startsWith("/tickets");

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStoredUser({
      name: email.split("@")[0] || (activeRole === "business" ? "Acme Corp" : activeRole === "admin" ? "Central Admin" : "Demo Visitor"),
      email: email || `${activeRole}@247gbs.com`,
      role: activeRole
    });

    if (redirect) {
      router.push(redirect);
    } else if (activeRole === "customer") {
      router.push("/dashboard/customer");
    } else if (activeRole === "admin") {
      router.push("/dashboard/admin");
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

      {/* Role Switcher Tabs */}
      <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveRole("customer")}
          className={`py-1.5 rounded-lg transition-all cursor-pointer ${
            activeRole === "customer"
              ? "bg-white text-orange-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Visitor
        </button>
        <button
          type="button"
          onClick={() => setActiveRole("business")}
          className={`py-1.5 rounded-lg transition-all cursor-pointer ${
            activeRole === "business"
              ? "bg-white text-orange-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Exhibitor
        </button>
        <button
          type="button"
          onClick={() => setActiveRole("admin")}
          className={`py-1.5 rounded-lg transition-all cursor-pointer ${
            activeRole === "admin"
              ? "bg-white text-orange-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Admin
        </button>
      </div>

      {isFromTickets && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-2.5 text-xs text-orange-800">
          <Ticket className="w-4 h-4 text-orange-600 shrink-0" />
          <p className="font-medium leading-snug">
            Sign in to continue booking and manage your Expo passes.
          </p>
        </div>
      )}

      <div className="text-center mb-5">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">Welcome Back</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Sign in to your <span className="text-orange-600 font-bold capitalize">{activeRole === "business" ? "Exhibitor" : activeRole === "admin" ? "Admin" : "Visitor"}</span> account
        </p>
      </div>

      <form className="space-y-3.5" onSubmit={handleLogin}>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
            placeholder="name@company.com"
            required
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <button
              type="button"
              onClick={() => {
                setResetEmail(email);
                setResetSent(false);
                setForgotOpen(true);
              }}
              className="text-[11px] font-semibold text-orange-600 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-xs sm:text-sm"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-950 text-white py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-orange-600 transition-colors shadow-md cursor-pointer"
        >
          {isFromTickets ? "Sign In & Continue Booking" : "Sign In"}
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup?role=${activeRole || ""}${redirect ? `&redirect=${encodeURIComponent(redirect)}` : ""}`}
          className="text-orange-600 font-bold hover:underline"
        >
          Create one
        </Link>
      </div>

      {/* Quick Access Demo Section */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <p className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Instant Demo Access
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setStoredUser({ name: "Jane Doe", email: "customer@247gbs.com", role: "customer" });
              if (redirect) router.push(redirect);
              else router.push("/dashboard/customer");
            }}
            className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100 cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Customer</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setStoredUser({ name: "Acme Corp", email: "business@247gbs.com", role: "business" });
              router.push("/dashboard/business");
            }}
            className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100 cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Business</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setStoredUser({ name: "Central Admin", email: "admin@247gbs.com", role: "admin" });
              router.push("/dashboard/admin");
            }}
            className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Admin</span>
          </button>
        </div>
      </div>

      {/* Reset Password Modal */}
      {forgotOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900">Reset Password</h2>
              <button
                type="button"
                onClick={() => setForgotOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              {resetSent ? (
                <div className="text-center space-y-3 py-2">
                  <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Reset link sent</p>
                    <p className="text-xs text-slate-500 mt-1">
                      If an account exists for <span className="font-semibold text-slate-700">{resetEmail}</span>, you will receive password reset instructions shortly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForgotOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-3.5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (resetEmail.trim()) setResetSent(true);
                  }}
                >
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Enter your account email and we&apos;ll send you a secure link to reset your password.
                  </p>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="name@company.com"
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setForgotOpen(false)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors cursor-pointer"
                    >
                      Send Link
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
