"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { api } from "@/lib/api";
import { Loader2, Store, User, Building2, ShieldCheck, Mail, Lock, ArrowLeft } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-white md:bg-slate-50 flex items-center justify-center p-0 md:p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            {/* Back Button */}
            <Link
                href="/get-started"
                className="absolute top-6 left-6 z-50 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm"
            >
                <ArrowLeft className="w-4 h-4" /> Back
            </Link>

            <Suspense fallback={<div className="text-orange-600 font-bold animate-pulse text-xl">Preparing Portal...</div>}>
                <SignupForm />
            </Suspense>
        </div>
    );
}

function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRole = searchParams.get("role") || "customer";

    // Form state
    const [role, setRole] = useState(initialRole);
    const [formData, setFormData] = useState({
        firstName: searchParams.get("firstName") || "",
        lastName: searchParams.get("lastName") || "",
        email: searchParams.get("email") || "",
        businessName: "",
        password: "",
        confirmPassword: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const isBusiness = role === 'business';
    const themeColor = isBusiness ? 'orange' : 'teal';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            // Map frontend data to backend schema
            const payload = {
                email: formData.email,
                password: formData.password,
                name: isBusiness
                    ? formData.businessName
                    : `${formData.firstName} ${formData.lastName}`.trim(),
                role: (isBusiness ? 'BUSINESS' : 'CUSTOMER') as 'CUSTOMER' | 'BUSINESS'
            };

            await api.post('/auth/register', payload);

            // On success, redirect to login
            router.push(`/login?role=${role}&email=${encodeURIComponent(formData.email)}&registered=true`);
        } catch (err: any) {
            setError(err.message || "An error occurred during account creation");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg bg-white md:rounded-[40px] shadow-none md:shadow-2xl p-8 md:p-12 relative z-10 border-0 md:border border-slate-100 min-h-screen md:min-h-0 flex flex-col justify-center">
            {/* Role Header */}
            <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-xl transition-all duration-500 ${isBusiness ? 'bg-orange-600 shadow-orange-500/30' : 'bg-teal-600 shadow-teal-500/30'}`}>
                    {isBusiness ? <Store /> : <User />}
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Create Account</h1>
                <p className="text-slate-500 font-medium">
                    Join the Digital Expo as an <span className={`font-bold capitalize ${isBusiness ? 'text-orange-600' : 'text-teal-600'}`}>{isBusiness ? 'Exhibitor' : 'Explorer'}</span>
                </p>
            </div>

            {/* Role Switcher */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 gap-1">
                <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${!isBusiness ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <User className="w-4 h-4" /> Explorer
                </button>
                <button
                    type="button"
                    onClick={() => setRole('business')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${isBusiness ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Store className="w-4 h-4" /> Exhibitor
                </button>
            </div>

            <form className="space-y-5" onSubmit={handleSignup}>
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                {isBusiness ? (
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Business Name</label>
                        <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                            <input
                                type="text"
                                name="businessName"
                                required
                                value={formData.businessName}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium"
                                placeholder="Legal Entity Name"
                            />
                        </div>
                    </div>
                ) : null}

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium ${isBusiness ? 'focus:border-orange-500 focus:ring-orange-100' : 'focus:border-teal-500 focus:ring-teal-100'}`}
                            placeholder="Frank"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium ${isBusiness ? 'focus:border-orange-500 focus:ring-orange-100' : 'focus:border-teal-500 focus:ring-teal-100'}`}
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors ${isBusiness ? 'group-focus-within:text-orange-500' : 'group-focus-within:text-teal-500'}`} />
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium ${isBusiness ? 'focus:border-orange-500 focus:ring-orange-100' : 'focus:border-teal-500 focus:ring-teal-100'}`}
                            placeholder="name@company.com"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors ${isBusiness ? 'group-focus-within:text-orange-500' : 'group-focus-within:text-teal-500'}`} />
                            <input
                                type="password"
                                name="password"
                                required
                                minLength={6}
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium ${isBusiness ? 'focus:border-orange-500 focus:ring-orange-100' : 'focus:border-teal-500 focus:ring-teal-100'}`}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Confirm</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium ${isBusiness ? 'focus:border-orange-500 focus:ring-orange-100' : 'focus:border-teal-500 focus:ring-teal-100'}`}
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full text-white py-5 rounded-[20px] font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 mt-4 ${isBusiness ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/30' : 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/30'}`}
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                            {isBusiness ? "Register My Business" : "Create My Account"}
                            <ArrowRightIcon className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-sm">
                <span className="text-slate-500">Already have an account?</span>{" "}
                <Link href={`/login?role=${role}`} className={`font-bold hover:underline ml-1 ${isBusiness ? 'text-orange-600' : 'text-teal-600'}`}>Log in</Link>
            </div>

            {isBusiness && (
                <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldCheck className="text-orange-500 w-5 h-5" />
                        <span className="text-sm font-bold text-slate-900">Exhibitor Verification</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        After creating your account, you&apos;ll be guided through our <Link href="/exhibit" className="text-orange-600 font-bold hover:underline">document verification flow</Link> to unlock your digital booth.
                    </p>
                </div>
            )}
        </div>
    );
}

const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
);
