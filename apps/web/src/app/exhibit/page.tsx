"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Store,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CreditCard,
  Zap,
  Copy,
  Wallet,
  Sparkles,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import Modal from "@/app/component/Modal";
import SandboxCheckoutModal, { SandboxPaymentResult } from "@/app/component/SandboxCheckoutModal";
import { PASS_PLANS } from "@/data/passes";

interface CartItem {
  id: string;
  name: string;
  price: number;
  type: "pass" | "package";
  quantity: number;
}

const CHS_BASE_URL =
  process.env.NEXT_PUBLIC_CHS_URL || "https://centralhubsolution.com";

const PACKAGES = [
  {
    name: "Starter",
    price: 99,
    subtitle: "For emerging brands launching their first digital stand",
    features: [
      "Standard Digital Booth",
      "Up to 20 MCOM Products",
      "Basic Visitor Lead Capture"
    ]
  },
  {
    name: "Professional",
    price: 249,
    popular: true,
    subtitle: "Full exhibition suite with live demos & real-time chat",
    features: [
      "Premium Interactive Booth",
      "Unlimited MCOM Mall Products",
      "Live Chat, Demos & Analytics"
    ]
  },
  {
    name: "Enterprise",
    price: 999,
    subtitle: "Multi-hall flagship presence with dedicated support",
    features: [
      "Custom Branded Trade Hall",
      "Full CHS API & CRM Sync",
      "Dedicated Account Manager"
    ]
  }
];

export default function ExhibitPage() {
  const [selectedPackage, setSelectedPackage] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Access Pass Token Flow State
  const [showPassModal, setShowPassModal] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  const [enteredToken, setEnteredToken] = useState("");
  const [showTokenScreen, setShowTokenScreen] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutTarget, setCheckoutTarget] = useState<null | {
    kind: "stand" | "pass";
    title: string;
    itemName: string;
    amount: number;
  }>(null);
  const [paymentReceipt, setPaymentReceipt] = useState<SandboxPaymentResult | null>(null);

  const passes = PASS_PLANS.filter((p) => p.type === "business");
  const activePkg = PACKAGES.find((p) => p.name === selectedPackage) || PACKAGES[1];

  const addToCart = (item: (typeof passes)[number], type: "pass" | "package") => {
    setCart((prev) => {
      const otherItems = prev.filter((i) => i.type !== type);
      return [
        ...otherItems,
        {
          id: item.id || item.name,
          name: item.name,
          price: Number(item.price),
          type,
          quantity: 1
        }
      ];
    });
  };

  const handleActivate = () => {
    if (isTokenValidated) {
      setPaymentReceipt({
        reference: enteredToken.trim().toUpperCase(),
        gateway: "Exhibitor Access Pass",
        amount: 0
      });
      setIsSubmitted(true);
      return;
    }
    setCheckoutTarget({
      kind: "stand",
      title: `Pay for ${activePkg.name} Stand`,
      itemName: `247GBS Expo — ${activePkg.name} Exhibitor Tier`,
      amount: activePkg.price
    });
  };

  const handleSandboxSuccess = (result: SandboxPaymentResult) => {
    setPaymentReceipt(result);
    if (checkoutTarget?.kind === "pass") {
      const token = "GBX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      setGeneratedToken(token);
      setEnteredToken(token);
      setIsTokenValidated(true);
      setCheckoutTarget(null);
      setShowPassModal(true);
      setShowTokenScreen(true);
    } else {
      setCheckoutTarget(null);
      setIsSubmitted(true);
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans overflow-x-clip">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24 sm:pb-20 relative z-10">
        {!isSubmitted ? (
          <div className="space-y-5 sm:space-y-6">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs mb-1">
                  <Store className="w-3.5 h-3.5" /> Exhibitor Stand Setup
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Launch Your <span className="text-orange-600">Digital Booth</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                  Business registration, KYB approval, and branding profiles are handled on Central Hub Solution (CHS) and synced to Expo automatically.
                </p>
              </div>
            </div>

            {/* Step 1: Central Hub Solution (CHS) Business Onboarding Banner */}
            <div className="bg-slate-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" /> Unified CHS Business Account
                </div>
                <h2 className="text-sm sm:text-lg font-extrabold tracking-tight">
                  New to 247GBS? Register &amp; Verify on Central Hub Solution
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-xl">
                  Complete your business onboarding once on CHS. Once verified, your logo, banner, and MCOM Mall catalog sync straight into your Expo booth.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <a
                  href={CHS_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors shadow-sm"
                >
                  <span>Continue to CHS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/login?role=business"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/15 border border-white/10 transition-colors"
                >
                  <span>Demo Sign In</span>
                </Link>
              </div>
            </div>

            {/* Step 2: Exhibitor Package & Pass Activation */}
            <div className="bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl shadow-2xs border border-slate-200/80 space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-sm sm:text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Select Exhibitor Tier &amp; Activate Stand</span>
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Choose your booth tier or apply a Season Business Access Pass token to unlock your exhibitor tools.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (passes.length > 0 && cart.length === 0) addToCart(passes[0], "pass");
                    setShowPassModal(true);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 text-orange-700 border border-orange-200/80 hover:bg-orange-100 text-xs font-bold transition-colors shrink-0 w-fit cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Pass Token</span>
                </button>
              </div>

              {/* Package Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage === pkg.name;
                  return (
                    <button
                      key={pkg.name}
                      type="button"
                      onClick={() => setSelectedPackage(pkg.name)}
                      className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                        isSelected
                          ? "border-orange-600 bg-orange-50/30 shadow-xs"
                          : "border-slate-200/80 hover:border-orange-200 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base truncate">
                              {pkg.name}
                            </h3>
                            {pkg.popular && (
                              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[9px] font-black uppercase tracking-wider shrink-0">
                                Popular
                              </span>
                            )}
                          </div>
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "bg-orange-600 text-white"
                                : "border border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 mb-3 leading-snug">
                          {pkg.subtitle}
                        </p>

                        <div className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
                          £{pkg.price}
                          <span className="text-[11px] font-medium text-slate-400"> /season</span>
                        </div>

                        <ul className="space-y-1.5">
                          {pkg.features.map((f) => (
                            <li
                              key={f}
                              className="text-xs text-slate-600 flex items-center gap-2"
                            >
                              <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Access Pass Token Input */}
              <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900">
                    Already have an Exhibitor Access Token?
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Apply your pass token to waive seasonal fees and unlock instant stand activation.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-80 shrink-0">
                  <input
                    type="text"
                    placeholder="e.g. GBX-TOKEN-2026"
                    className="flex-1 min-w-0 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 uppercase font-mono font-bold text-xs"
                    value={enteredToken}
                    onChange={(e) => {
                      setEnteredToken(e.target.value);
                      if (isTokenValidated) setIsTokenValidated(false);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (enteredToken.trim().length > 3) setIsTokenValidated(true);
                    }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all cursor-pointer ${
                      isTokenValidated
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-900 text-white hover:bg-orange-600"
                    }`}
                  >
                    {isTokenValidated ? "Applied" : "Apply"}
                  </button>
                </div>
              </div>

              {isTokenValidated && (
                <p className="text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Access Pass validated — full Exhibitor Suite unlocked at £0.00.</span>
                </p>
              )}

              {/* Activation Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {activePkg.name} Tier:
                  </span>
                  <span className="text-lg sm:text-xl font-black text-slate-900">
                    {isTokenValidated ? "£0.00" : `£${activePkg.price}`}
                  </span>
                  {isTokenValidated && (
                    <span className="text-xs text-slate-400 line-through font-semibold">
                      £{activePkg.price}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleActivate}
                  disabled={loading}
                  className="w-full sm:w-auto px-7 py-3 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Activate Stand</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* COMPACT ACTIVATION CONFIRMATION */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center bg-white p-6 sm:p-9 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80"
          >
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5">
              Exhibitor Stand Ready
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
              Your <strong>{activePkg.name}</strong> booth tier is configured. Sign in via Central Hub Solution (CHS) or open the Business Dashboard to manage your stand.
            </p>

            <div className="space-y-2 mb-6 text-left bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Selected Tier</span>
                <span className="text-slate-900 font-bold">{activePkg.name}</span>
              </div>
              {paymentReceipt && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500">Payment Gateway</span>
                    <span className="text-emerald-600 font-bold">{paymentReceipt.gateway}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500">Amount Paid</span>
                    <span className="text-slate-900 font-bold">£{paymentReceipt.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-500 shrink-0">Reference</span>
                    <span className="text-slate-700 font-mono text-[11px] truncate">{paymentReceipt.reference}</span>
                  </div>
                </>
              )}
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">KYB &amp; Branding</span>
                <span className="text-slate-900 font-bold">Synced via CHS</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-2.5">
              <Link
                href="/dashboard/business"
                className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-orange-700 transition-all shadow-md inline-flex items-center justify-center gap-1.5"
              >
                <span>Open Business Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={CHS_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-full font-bold text-xs sm:text-sm hover:bg-slate-200 transition-all inline-flex items-center justify-center gap-1.5"
              >
                <span>Open CHS Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
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
              <p className="text-xs text-slate-500">
                Unlock full marketplace features and exhibition tools with an all-access business pass.
              </p>

              {passes.map((pass) => (
                <div
                  key={pass.id}
                  onClick={() => addToCart(pass, "pass")}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    cart.some((i) => i.id === pass.id)
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
                    {pass.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-100"
                      >
                        <Check className="w-3 h-3 text-emerald-500" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPassModal(false)}
                  className="px-4 py-2.5 text-slate-500 font-bold text-xs rounded-full border border-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const selected =
                      passes.find((p) => cart.some((c) => c.id === p.id)) || passes[0];
                    if (!selected) return;
                    setShowPassModal(false);
                    setCheckoutTarget({
                      kind: "pass",
                      title: "Pay for Exhibitor Pass",
                      itemName: selected.name,
                      amount: Number(selected.price)
                    });
                  }}
                  className="flex-1 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-orange-700 transition-all shadow-md cursor-pointer"
                >
                  <span>Proceed to Sandbox Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Pass Token Ready</h3>
                <p className="text-slate-500 text-xs">
                  Your token has been automatically applied to your stand activation.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200 flex items-center justify-center gap-3">
                <span className="text-lg font-mono font-black text-slate-900">
                  {generatedToken}
                </span>
                <button
                  type="button"
                  onClick={handleCopyToken}
                  className="px-2.5 py-1.5 bg-white rounded-lg border border-slate-200 text-orange-600 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedToken ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowPassModal(false);
                  setShowTokenScreen(false);
                }}
                className="w-full py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </Modal>
      {/* REUSABLE STRIPE / PAYPAL / WALLET SANDBOX CHECKOUT */}
      <SandboxCheckoutModal
        isOpen={Boolean(checkoutTarget)}
        onClose={() => setCheckoutTarget(null)}
        title={checkoutTarget?.title || "Complete Payment"}
        itemName={checkoutTarget?.itemName || "Exhibitor Activation"}
        amount={checkoutTarget?.amount || 0}
        onPaymentSuccess={handleSandboxSuccess}
      />
    </main>
  );
}
