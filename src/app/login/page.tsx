"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { User, Store, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#FFF7ED] flex items-center justify-center p-6 relative overflow-hidden">
            <Suspense fallback={<div className="text-orange-600 font-bold animate-pulse">Loading Gate...</div>}>
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
        // Mock login logic
        if (role === 'customer') {
            router.push('/dashboard/customer');
        } else {
            router.push('/dashboard/business');
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 relative z-10 border border-orange-100">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg shadow-orange-500/30">E</div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                <p className="text-slate-500">
                    Sign in to your <span className="text-orange-600 font-semibold capitalize">{role || 'Expo'}</span> dashboard
                </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" placeholder="name@company.com" />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <a href="#" className="text-xs text-orange-600 hover:underline">Forgot password?</a>
                    </div>
                    <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" placeholder="••••••••" />
                </div>

                <button onClick={handleLogin} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
                    Sign In
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
                Don&apos;t have an account? <Link href={`/signup?role=${role || ''}`} className="text-orange-600 font-semibold hover:underline">Create one</Link>
            </div>

            {/* Quick Access Demo Section */}
            <div className="mt-10 pt-8 border-t border-slate-100">
                <div className="text-center mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Demo Case</p>
                    <h2 className="text-sm font-bold text-slate-900 uppercase">Instant Quick Access</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <Link 
                        href="/dashboard/customer" 
                        className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl hover:bg-orange-50 hover:text-orange-600 transition-all group border border-slate-100"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                            <User className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Customer</span>
                    </Link>
                    <Link 
                        href="/dashboard/business" 
                        className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl hover:bg-orange-50 hover:text-orange-600 transition-all group border border-slate-100"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                            <Store className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Business</span>
                    </Link>
                    <Link 
                        href="/dashboard/admin" 
                        className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl hover:bg-orange-50 hover:text-orange-600 transition-all group border border-slate-100"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Admin</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
