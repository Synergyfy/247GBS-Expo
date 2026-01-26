"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// --- ICONS ---
const ArrowLeftIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
);
const BusinessIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);
const CustomerIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
);
const CheckCircleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export default function GetStartedPage() {
    return (
        <div className="min-h-screen bg-[#FFF7ED] flex flex-col relative overflow-hidden">
            <Suspense fallback={<div className="flex-1 flex items-center justify-center text-orange-600 font-bold animate-pulse text-xl">Initializing Portal...</div>}>
                <SelectionContent />
            </Suspense>
        </div>
    );
}

function SelectionContent() {
    const searchParams = useSearchParams();
    const initialRole = searchParams.get("role");
    const [selectedRole, setSelectedRole] = useState<string | null>(initialRole);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (initialRole) {
            setSelectedRole(initialRole);
        }
    }, [initialRole]);

    const handleSelect = (role: string) => {
        if (selectedRole === role) return; // Already selected
        setIsAnimating(true);
        setSelectedRole(role);
        // Reset animation state after effect (simulated)
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-orange-200/40 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-teal-200/30 to-transparent rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-slate-600 hover:text-orange-600 transition-colors">
                        <ArrowLeftIcon />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2 opacity-50">
                        <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">E</div>
                    </div>
                </div>
            </nav>

            <div className="flex-1 flex flex-col items-center justify-center relative p-6">

                {/* Header content changes based on selection */}
                <div className="text-center mb-12 max-w-2xl mx-auto transition-all duration-500">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        {selectedRole ? (
                            <span>
                                Welcome, future <span className={selectedRole === 'business' ? 'text-orange-600' : 'text-teal-600'}>
                                    {selectedRole === 'business' ? 'Exhibitor' : 'Explorer'}
                                </span>
                            </span>
                        ) : (
                            "Join the Exhibition"
                        )}
                    </h1>
                    <p className="text-xl text-slate-500">
                        {selectedRole
                            ? "Great choice. Let's get your account set up in seconds."
                            : "Select your role to unlock your personalized dashboard."}
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl perspective-container">

                    {/* USER CARD (Business) */}
                    <div
                        onClick={() => handleSelect('business')}
                        className={`
              group relative h-[400px] rounded-3xl cursor-pointer transition-all duration-500 ease-out border-2 overflow-hidden
              ${selectedRole === 'business'
                                ? 'border-orange-500 shadow-2xl shadow-orange-500/20 scale-[1.02] bg-white ring-4 ring-orange-100'
                                : selectedRole === 'customer'
                                    ? 'border-transparent bg-white/50 opacity-60 scale-95 hover:opacity-100 hover:scale-100 hover:bg-white'
                                    : 'border-transparent bg-white hover:border-orange-200 hover:shadow-xl hover:-translate-y-2'
                            }
            `}
                    >
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                                alt="Business"
                                fill
                                className={`object-cover transition-transform duration-700 ${selectedRole === 'business' ? 'scale-110' : 'scale-100'} opacity-20`}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t from-orange-50/90 to-white/60 transition-opacity duration-500 ${selectedRole === 'business' ? 'opacity-80' : 'opacity-100'}`} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full p-8 flex flex-col items-center text-center justify-between">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${selectedRole === 'business' ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/40' : 'bg-orange-100 text-orange-600'}`}>
                                <BusinessIcon className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">I am a Business</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    I want to set up an expo stand, sell products, and build a customer network.
                                </p>
                            </div>

                            <div className={`w-full py-3 rounded-xl border transition-all duration-300 font-semibold flex items-center justify-center gap-2
                  ${selectedRole === 'business' ? 'bg-orange-600 border-orange-600 text-white' : 'border-slate-200 text-slate-400 group-hover:border-orange-200 group-hover:text-orange-600'}
                `}>
                                {selectedRole === 'business' ? (
                                    <>Selected <CheckCircleIcon className="w-5 h-5" /></>
                                ) : 'Select Business'}
                            </div>
                        </div>
                    </div>

                    {/* USER CARD (Customer) */}
                    <div
                        onClick={() => handleSelect('customer')}
                        className={`
              group relative h-[400px] rounded-3xl cursor-pointer transition-all duration-500 ease-out border-2 overflow-hidden
              ${selectedRole === 'customer'
                                ? 'border-teal-500 shadow-2xl shadow-teal-500/20 scale-[1.02] bg-white ring-4 ring-teal-100'
                                : selectedRole === 'business'
                                    ? 'border-transparent bg-white/50 opacity-60 scale-95 hover:opacity-100 hover:scale-100 hover:bg-white'
                                    : 'border-transparent bg-white hover:border-teal-200 hover:shadow-xl hover:-translate-y-2'
                            }
            `}
                    >
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop"
                                alt="Customer"
                                fill
                                className={`object-cover transition-transform duration-700 ${selectedRole === 'customer' ? 'scale-110' : 'scale-100'} opacity-20`}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t from-teal-50/90 to-white/60 transition-opacity duration-500 ${selectedRole === 'customer' ? 'opacity-80' : 'opacity-100'}`} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full p-8 flex flex-col items-center text-center justify-between">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${selectedRole === 'customer' ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/40' : 'bg-teal-100 text-teal-600'}`}>
                                <CustomerIcon className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">I am a Customer</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    I want to browse the expo, buy products, and earn rewards for participation.
                                </p>
                            </div>

                            <div className={`w-full py-3 rounded-xl border transition-all duration-300 font-semibold flex items-center justify-center gap-2
                  ${selectedRole === 'customer' ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-200 text-slate-400 group-hover:border-teal-200 group-hover:text-teal-600'}
                `}>
                                {selectedRole === 'customer' ? (
                                    <>Selected <CheckCircleIcon className="w-5 h-5" /></>
                                ) : 'Select Customer'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Continue Button (Appears when selected) */}
                <div className={`mt-12 transition-all duration-500 transform ${selectedRole ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <Link
                        href={`/signup?role=${selectedRole}`}
                        className={`
                        px-12 py-4 rounded-full text-xl font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3
                        ${selectedRole === 'business' ? 'bg-orange-600 hover:bg-orange-500 shadow-orange-500/30' : 'bg-teal-600 hover:bg-teal-500 shadow-teal-500/30'}
                      `}
                    >
                        Create My Account
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                    <div className="text-center mt-4">
                        <span className="text-sm text-slate-400">Already have an account? <Link href={`/login?role=${selectedRole}`} className="text-slate-600 font-semibold hover:underline">Log in</Link></span>
                    </div>
                </div>

            </div>
        </>
    );
}
