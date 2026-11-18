"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Store, Building2, ShieldCheck,
  ArrowRight, ArrowLeft, Loader2, CreditCard,
  Plus, Zap, Info, Globe, Clock, Copy, Wallet, Sparkles
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import Tooltip from "@/app/component/Tooltip";
import Modal from "@/app/component/Modal";
import { PASS_PLANS } from "@/data/passes";

// Per Central Solution (CHS) architecture directive: KYB/Identity verification is handled centrally by CHS.
const STEPS = ["Business Profile", "Module & Pass Activation"];

interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'pass' | 'package';
  quantity: number;
}

export default function ExhibitPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pass Flow State
  const [showPassModal, setShowPassModal] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  const [enteredToken, setEnteredToken] = useState("");
  const [showTokenScreen, setShowTokenScreen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string | null>("card");

  const passes = PASS_PLANS.filter(p => p.type === 'business');

  const [formData, setFormData] = useState({
    businessName: "",
    cacNumber: "",
    postalCode: "",
    address: "",
    city: "",
    town: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedPackage: "Professional"
  });

  const addToCart = (item: any, type: 'pass' | 'package') => {
    setCart(prev => {
      const otherItems = prev.filter(i => i.type !== type);
      return [...otherItems, { id: item.id || item.name, name: item.name, price: Number(item.price), type, quantity: 1 }];
    });
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setFormData(prev => ({ ...prev, postalCode: code }));

    if (code.length >= 5) {
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          address: "123 High Street",
          city: "London",
          town: "Westminster"
        }));
      }, 400);
    }
  };

  const packages = [
    { name: "Starter", price: "99", features: ["Standard Booth Template", "Up to 20 Products", "Basic Lead Capture"] },
    { name: "Professional", price: "249", popular: true, features: ["Premium 3D-Feel Booth", "Unlimited Products", "Live Chat & Analytics"] },
    { name: "Enterprise", price: "999", features: ["Custom Branded Hall", "Full API & CRM Sync", "Dedicated Account Manager"] }
  ];

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 500);
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20 relative z-10">
        {!isSubmitted ? (
          <div>
            {/* Compact Header + Pass Trigger */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-8 gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs mb-0.5">
                  <Store className="w-3.5 h-3.5" /> Exhibitor Onboarding
                </div>
                <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  Launch Your <span className="text-orange-600">Digital Booth</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Register your business profile and activate your 24/7 exhibition stand.
                </p>
              </div>

              {/* Compact Step Pills + Pass Action */}
              <div className="flex items-center gap-2 self-start sm:self-end">
                {STEPS.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => i < step && setStep(i)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                      i === step
                        ? "bg-orange-600 text-white shadow-sm"
                        : i < step
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-white text-slate-400 border border-slate-200"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px]">
                      {i < step ? <Check className="w-3 h-3" /> : i + 1}
                    </span>
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step Content */}
              {/* STEP 0: BUSINESS PROFILE */}
              {step === 0 && (
                <div
                  key="step0"
                  className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80"
                >
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h2 className="text-sm sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" /> Business & Contact Details
                    </h2>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Step 1 of 2</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-5">
                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Business Name <span className="text-red-500">*</span></label>
                        <Tooltip content="The legal name of your company as registered.">
                          <Info className="w-3 h-3 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter full legal name"
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      />
                    </div>

                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block truncate">
                        Companies House <span className="text-slate-400 font-normal">(opt)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 12345678"
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.cacNumber}
                        onChange={(e) => setFormData({ ...formData, cacNumber: e.target.value })}
                      />
                    </div>

                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. SW1A 1AA"
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.postalCode}
                        onChange={handlePostalCodeChange}
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Street address"
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="City"
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>

                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Town / Borough <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Town"
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.town}
                        onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                      />
                    </div>

                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>

                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>

                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+44..."
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-400">
                      Identity & KYB verification is handled securely via verified business records.
                    </p>
                    <button
                      onClick={handleNext}
                      className="px-5 py-2.5 sm:px-7 sm:py-3 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 hover:bg-orange-700 transition-all shadow-md shrink-0 active:scale-95"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Next: Select Package</span> <ArrowRight className="w-3.5 h-3.5" /></>}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 1: MODULE & PASS ACTIVATION */}
              {step === 1 && (
                <div
                  key="step1"
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Package Tier Cards */}
                  <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80">
                    <div className="flex items-center justify-between mb-3 sm:mb-6">
                      <div>
                        <h2 className="text-sm sm:text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-orange-600" /> Choose Exhibitor Package
                        </h2>
                        <p className="text-[11px] sm:text-xs text-slate-500">Select your booth tier to activate Ticket Manager, Reward Engine, and Analytics.</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Step 2 of 2</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.name}
                          onClick={() => setFormData({ ...formData, selectedPackage: pkg.name })}
                          className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                            formData.selectedPackage === pkg.name
                              ? "border-orange-600 bg-orange-50/40 shadow-sm"
                              : "border-slate-200/80 hover:border-orange-200 bg-white"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-extrabold text-slate-900 text-xs sm:text-base">{pkg.name}</h3>
                              {formData.selectedPackage === pkg.name && (
                                <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center">
                                  <Check className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                            <div className="text-lg sm:text-2xl font-black text-slate-900 mb-2">
                              £{pkg.price}<span className="text-[10px] sm:text-xs font-normal text-slate-500">/season</span>
                            </div>
                            <ul className="space-y-1">
                              {pkg.features.map(f => (
                                <li key={f} className="text-[11px] sm:text-xs text-slate-600 flex items-center gap-1.5">
                                  <Check className="w-3 h-3 text-orange-600 shrink-0" /> {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Access Pass Token Redemption */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                          <span className="text-xs font-bold text-slate-900">Have an Exhibitor Access Token?</span>
                          <button
                            onClick={() => {
                              if (passes.length > 0 && cart.length === 0) addToCart(passes[0], 'pass');
                              setShowPassModal(true);
                            }}
                            className="text-[11px] font-bold text-orange-600 hover:underline ml-2"
                          >
                            + Get Pass Token
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500">Enter your token to deduct from your pass wallet or validate instant booth access.</p>
                      </div>

                      <div className="flex gap-2 sm:w-72">
                        <input
                          type="text"
                          placeholder="e.g. GBX-TOKEN-2026"
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 uppercase font-mono font-bold text-xs"
                          value={enteredToken}
                          onChange={(e) => setEnteredToken(e.target.value)}
                        />
                        <button
                          onClick={() => {
                            if (enteredToken.trim().length > 3) setIsTokenValidated(true);
                          }}
                          className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all text-xs shrink-0"
                        >
                          {isTokenValidated ? "Active ✓" : "Apply"}
                        </button>
                      </div>
                    </div>

                    {isTokenValidated && (
                      <p className="text-emerald-600 text-[11px] font-bold mt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Access Pass validated — full Exhibitor Suite unlocked.
                      </p>
                    )}

                    <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center gap-3">
                      <button
                        onClick={handleBack}
                        className="px-5 py-2.5 border border-slate-200 rounded-full font-bold text-xs sm:text-sm text-slate-600 hover:bg-slate-50 transition-all inline-flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 sm:px-8 sm:py-3 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 hover:bg-orange-700 transition-all shadow-md active:scale-95"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Complete Registration</span> <ArrowRight className="w-3.5 h-3.5" /></>}
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        ) : (
          /* COMPACT SUCCESS SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200"
          >
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5">Exhibitor Booth Activated!</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
              Your business profile for <strong>{formData.businessName || "your brand"}</strong> is registered. Continue to your Business Dashboard to manage your stand.
            </p>

            <div className="space-y-2 mb-6 text-left bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Business Profile</span>
                <span className="text-emerald-600 font-bold">Completed ✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Selected Tier</span>
                <span className="text-slate-900 font-bold">{formData.selectedPackage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Business Verification</span>
                <span className="text-emerald-600 font-bold">Verified</span>
              </div>
            </div>

            <div className="flex flex-row justify-center gap-2.5">
              <Link
                href="/dashboard/business"
                className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-orange-700 transition-all shadow-md"
              >
                Open Business Dashboard
              </Link>
              <Link
                href="/"
                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-full font-bold text-xs sm:text-sm hover:bg-slate-200 transition-all"
              >
                Back Home
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />

      {/* PASS SELECTION OVERLAY MODAL */}
      <Modal
        isOpen={showPassModal}
        onClose={() => setShowPassModal(false)}
        title="Activate Exhibitor Pass"
        maxWidth="lg"
      >
        <div>
          {!showTokenScreen ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Unlock full marketplace features and exhibition tools with an all-access business pass.</p>

              {passes.map((pass) => (
                <div
                  key={pass.id}
                  onClick={() => addToCart(pass, 'pass')}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    cart.some(i => i.id === pass.id)
                      ? "border-orange-600 bg-orange-50/40"
                      : "border-slate-200 bg-white hover:border-orange-300"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-extrabold text-slate-900">{pass.name}</span>
                    <span className="text-lg font-black text-orange-600">£{pass.price}</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-2">{pass.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {pass.features.slice(0, 3).map(f => (
                      <span key={f} className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-100">
                        <Check className="w-3 h-3 text-emerald-500" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payment Method</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "card", label: "Card", icon: <CreditCard className="w-4 h-4" /> },
                    { id: "wallet", label: "Wallet (£120.50)", icon: <Wallet className="w-4 h-4" /> }
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer border text-xs font-bold transition-all ${
                        paymentMethod === method.id
                          ? "border-orange-600 bg-orange-50 text-orange-900"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {method.icon}
                      <span>{method.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowPassModal(false)}
                  className="px-4 py-2.5 text-slate-500 font-bold text-xs rounded-full border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      const token = "GBX-" + Math.random().toString(36).substr(2, 6).toUpperCase();
                      setGeneratedToken(token);
                      setEnteredToken(token);
                      setIsTokenValidated(true);
                      setLoading(false);
                      setShowTokenScreen(true);
                    }, 700);
                  }}
                  className="flex-1 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-orange-700 transition-all shadow-md"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Purchase & Generate Token"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Pass Token Ready!</h3>
                <p className="text-slate-500 text-xs">Your token has been automatically applied to your onboarding.</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200 flex items-center justify-center gap-3">
                <span className="text-lg font-mono font-black text-slate-900">{generatedToken}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedToken)}
                  className="p-1.5 bg-white rounded-lg border border-slate-200 text-orange-600"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => {
                  setShowPassModal(false);
                  setShowTokenScreen(false);
                }}
                className="w-full py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs shadow-md"
              >
                Done & Continue
              </button>
            </div>
          )}
        </div>
      </Modal>
    </main>
  );
}
