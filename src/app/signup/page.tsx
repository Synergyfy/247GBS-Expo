"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-[#FFF7ED] flex items-center justify-center p-6 relative overflow-hidden">
            <Suspense fallback={<div className="text-orange-600 font-bold animate-pulse">Loading Register...</div>}>
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
        if (role === 'customer') {
            setRoleText("Explorer");
        } else {
            setRoleText("Exhibitor");
        }
    }, [role]);

    const handleSignup = () => {
        // Mock signup logic
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
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
                <p className="text-slate-500">
                    Join as an <span className="text-orange-600 font-semibold capitalize">{role || 'User'}</span> ({roleText})
                </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">First Name</label>
                        <input type="text" defaultValue={preFirstName} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" placeholder="Frank" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Last Name</label>
                        <input type="text" defaultValue={preLastName} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" placeholder="Doe" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <input type="email" defaultValue={preEmail} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" placeholder="name@company.com" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                    <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" placeholder="••••••••" />
                </div>

                <button onClick={handleSignup} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
                    Create Account
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
                Already have an account? <Link href={`/login?role=${role || ''}`} className="text-orange-600 font-semibold hover:underline">Log in</Link>
            </div>
        </div>
    );
}
