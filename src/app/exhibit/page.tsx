"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Store, Building2, FileText, Landmark, ShieldCheck,
  ArrowRight, ArrowLeft, Upload, Loader2, CreditCard,
  Briefcase, Mail, Phone, MapPin, User, Plus, Zap, Info, Globe, Clock, X, Copy, Wallet
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import Tooltip from "@/app/component/Tooltip";
import Modal from "@/app/component/Modal";

const STEPS = ["Registration", "KYC & Documents", "Module Activation"];

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
  const [hasSkippedPass, setHasSkippedPass] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  const [enteredToken, setEnteredToken] = useState("");
  const [showTokenScreen, setShowTokenScreen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  // Form State
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
    idType: "International Passport",
    selectedPackage: "Professional"
  });

  useEffect(() => {
    // Show pass modal on mount
    const timer = setTimeout(() => {
      if (!hasSkippedPass) {
        setShowPassModal(true);
        // Pre-select the Annual Pass
        addToCart(passes[0], 'pass');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (item: any, type: 'pass' | 'package') => {
    setCart(prev => {
      const otherItems = prev.filter(i => i.type !== type);
      return [...otherItems, { id: item.id || item.name, name: item.name, price: Number(item.price), type, quantity: 1 }];
    });
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setFormData(prev => ({ ...prev, postalCode: code }));

    // Mock Auto-fill for UK Postcodes
    if (code.length >= 5) {
      // Simulating an API lookup delay
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          address: "123 High Street", // Mock Address
          city: "London",
          town: "Westminster"
        }));
      }, 500);
    }
  };

  const passes = [
    {
      id: "annual_pass",
      name: "Annual All-Access Pass",
      price: "75",
      description: "Mandatory platform entry pass. Entry to all seasons in 2026. Includes 24/7 lobby access.",
      features: ["All Seasons Entry", "VIP Lounge Access", "Priority Queue", "Premium Rewards"],
      popular: true
    }
  ];

  const packages = [
    { name: "Starter", price: "99", features: ["Standard Template", "20 Products"] },
    { name: "Professional", price: "249", features: ["Premium Design", "Unlimited Products", "Live Chat"] },
    { name: "Enterprise", price: "999", features: ["Custom 3D Hall", "API Access", "Account Manager"] }
  ];

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 800);
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <div className="container mx-auto px-4 pt-40 pb-20 relative z-10">
        {!isSubmitted ? (
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Exhibitor Onboarding</h1>
              <p className="text-lg text-slate-600">Register your business and activate your digital expo module.</p>
            </div>

            {/* Step Indicator */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${i <= step ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" : "bg-white text-slate-300 border border-slate-200"
                        }`}
                    >
                      {i < step ? <Check className="w-6 h-6" /> : i + 1}
                    </div>
                    <span className={`ml-2 text-sm font-bold ${i <= step ? "text-slate-900" : "text-slate-300"}`}>{s}</span>
                    {i < STEPS.length - 1 && (
                      <div className={`w-12 h-1 mx-4 rounded-full ${i < step ? "bg-orange-600" : "bg-slate-200"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* STEP 0: REGISTRATION (Section 3.1) */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <Building2 className="text-orange-600" /> Business Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Business Name <span className="text-red-500">*</span></label>
                        <Tooltip content="The legal name of your company as registered.">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter full legal name"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Companies House + UTR <span className="text-slate-400 normal-case font-medium">(optional)</span></label>
                        <Tooltip content="Your official companies house and UTR (Unique Taxpayer Reference).">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. 12345678"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.cacNumber}
                        onChange={(e) => setFormData({ ...formData, cacNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Postal Code <span className="text-red-500">*</span></label>
                        <Tooltip content="Enter postal code to auto-fill address.">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. SW1A 1AA"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.postalCode}
                        onChange={handlePostalCodeChange}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Business Address <span className="text-red-500">*</span></label>
                        <Tooltip content="The primary physical location of your business.">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <textarea
                        placeholder="Street, City, State, Country"
                        rows={2}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">City <span className="text-red-500">*</span></label>
                        <Tooltip content="City of operation.">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="text"
                        placeholder="City"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Town <span className="text-red-500">*</span></label>
                        <Tooltip content="Town or Locality.">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="text"
                        placeholder="Town"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.town}
                        onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">First Name <span className="text-red-500">*</span></label>
                        <Tooltip content="First name of the designated point of contact.">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Last Name <span className="text-red-500">*</span></label>
                        <Tooltip content="Last name of the designated point of contact.">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address <span className="text-red-500">*</span></label>
                        <Tooltip content="Official business email for notifications and login.">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="email"
                        placeholder="biz@company.com"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Phone Number <span className="text-red-500">*</span></label>
                        <Tooltip content="Active business phone number for verification.">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="tel"
                        placeholder="+44..."
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-12 py-4 bg-orange-600 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "Next: KYC Verification"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 1: KYC & DOCUMENTS (Section 3.2) */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <ShieldCheck className="text-orange-600" /> KYC & Verification
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Identity Record */}
                    <div className="space-y-4">
                      <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl hover:border-orange-500 transition-all group text-center">
                        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 group-hover:scale-110 transition-transform">
                          <User />
                        </div>
                        <h3 className="font-bold text-slate-900 flex items-center justify-center gap-2">
                          Identity Record <span className="text-slate-400 normal-case font-medium ml-1">(optional)</span>
                          <Tooltip content="Government-issued identification document.">
                            <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                          </Tooltip>
                        </h3>
                        <p className="text-xs text-slate-500 mb-4 uppercase font-bold tracking-widest mt-1">Select ID Type</p>
                        <select
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm mb-4"
                          value={formData.idType}
                          onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                        >
                          <option>International Passport</option>
                          <option>Driver's License</option>
                          <option>Others</option>
                        </select>
                        <button className="flex items-center gap-2 mx-auto text-orange-600 font-bold text-sm">
                          <Upload className="w-4 h-4" /> Upload Document
                        </button>
                      </div>
                    </div>

                    {/* Business Document */}
                    <div className="space-y-4">
                      <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl hover:border-orange-500 transition-all group text-center">
                        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 group-hover:scale-110 transition-transform">
                          <FileText />
                        </div>
                        <h3 className="font-bold text-slate-900 flex items-center justify-center gap-2">
                          Certificate of Incorporation <span className="text-slate-400 normal-case font-medium ml-1">(optional)</span>
                          <Tooltip content="Upload your official certificate of incorporation.">
                            <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                          </Tooltip>
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">Upload a clear copy of your official business registration document.</p>
                        <button className="flex items-center gap-2 mx-auto text-orange-600 font-bold text-sm">
                          <Upload className="w-4 h-4" /> Upload PDF/JPG
                        </button>
                      </div>
                    </div>


                  </div>

                  <div className="mt-12 flex justify-between gap-4">
                    <button
                      onClick={handleBack}
                      className="px-8 py-4 border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-12 py-4 bg-orange-600 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "Next: Module Activation"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: MODULE ACTIVATION (Section 3.3) */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Zap className="text-orange-600" /> Module Activation
                  </h2>
                  <p className="text-slate-500 mb-8">Choose your expo package to activate Ticket Manager, Reward Engine, and Analytics.</p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.name}
                        onClick={() => setFormData({ ...formData, selectedPackage: pkg.name })}
                        className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative ${formData.selectedPackage === pkg.name
                          ? "border-orange-600 bg-orange-50 shadow-lg"
                          : "border-slate-100 hover:border-orange-200 bg-slate-50"
                          }`}
                      >
                        {formData.selectedPackage === pkg.name && (
                          <div className="absolute top-4 right-4 text-orange-600">
                            <Check className="w-5 h-5 font-black" />
                          </div>
                        )}
                        <h3 className="font-bold text-slate-900 text-lg mb-1">{pkg.name}</h3>
                        <div className="text-3xl font-black text-slate-900 mb-4">£{pkg.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
                        <ul className="space-y-3 mb-6">
                          {pkg.features.map(f => (
                            <li key={f} className="text-xs font-medium text-slate-600 flex items-center gap-2">
                              <div className="w-1 h-1 bg-orange-600 rounded-full" /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Access Token Redemption Area */}
                  <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="text-orange-600" />
                      <label className="text-xs font-black text-orange-900 uppercase tracking-widest">Redeem Access Token</label>
                    </div>
                    <p className="text-[10px] text-orange-700/60 font-medium mb-4 leading-relaxed">
                      If you already have a General Pass, enter your Access Token below to unlock Exhibitor module.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. GBX-TOKEN-2026"
                        className="flex-1 px-4 py-3 bg-white border border-orange-200 rounded-xl focus:outline-none focus:border-orange-500 uppercase font-mono font-bold text-sm"
                        value={enteredToken}
                        onChange={(e) => setEnteredToken(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          if (enteredToken.length > 5) {
                            setIsTokenValidated(true);
                          }
                        }}
                        className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all text-xs"
                      >
                        {isTokenValidated ? "Validated" : "Validate"}
                      </button>
                    </div>
                    {isTokenValidated ? (
                      <p className="text-green-600 text-[10px] font-bold mt-2 flex items-center gap-1 italic">
                        <Check className="w-3 h-3" /> Token active: Full module access granted.
                      </p>
                    ) : (
                      <button
                        onClick={() => setShowPassModal(true)}
                        className="mt-4 text-[10px] font-bold text-orange-600 hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Don't have a pass? Get one here
                      </button>
                    )}
                  </div>

                  <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden mb-12">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Store className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Store className="text-orange-500" /> Expo Suite Access
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Ticket Manager (Active)",
                          "Reward Engine (Active)",
                          "Settlement Dashboard (Active)",
                          "Analytics Panel (Active)"
                        ].map(m => (
                          <div key={m} className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                            <Check className="w-4 h-4 text-orange-500" /> {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex justify-between gap-4">
                    <button
                      onClick={handleBack}
                      className="px-8 py-4 border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-12 py-4 bg-slate-900 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/30"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "Complete Onboarding"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* SUCCESS SCREEN (Section 3.2 Statuses) */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center bg-white p-12 md:p-20 rounded-[40px] shadow-2xl border border-slate-100"
          >
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse opacity-50" />
              <div className="absolute inset-4 bg-orange-200 rounded-full" />
              <div className="relative z-10 w-full h-full flex items-center justify-center text-orange-600">
                <Clock className="w-12 h-12" />
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Verification Pending</h2>
            <p className="text-xl text-slate-600 mb-12">
              Your business onboarding is complete! Our admin team is currently validating your KYC documents.
              You will be notified via <strong>{formData.email}</strong> once your account is verified.
            </p>

            <div className="space-y-4 mb-12 text-left bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">Registration</span>
                <span className="text-green-600 font-black text-sm uppercase">Completed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">KYC Validation</span>
                <span className="text-orange-600 font-black text-sm uppercase flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" /> In Progress
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">Module Activation</span>
                <span className="text-slate-400 font-black text-sm uppercase">Waiting</span>
              </div>
            </div>

            <Link
              href="/dashboard/business"
              className="inline-block px-12 py-4 bg-orange-600 text-white rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30"
            >
              Go to Business Dashboard
            </Link>
          </motion.div>
        )}
      </div>

      <Footer />

      {/* PASS SELECTION OVERLAY MODAL */}
      <Modal
        isOpen={showPassModal}
        onClose={() => {
          setShowPassModal(false);
          setHasSkippedPass(true);
        }}
        title="Activate Your Platform Pass"
        maxWidth="2xl"
      >
        <div className="max-w-4xl mx-auto">
          {!showTokenScreen ? (
            <>
              <div className="text-center mb-8">
                <p className="text-slate-600">Unlock full marketplace features and exhibition tools with your all-access pass.</p>
              </div>

              <div className="flex justify-center mb-8">
                {passes.map((pass) => (
                  <div
                    key={pass.id}
                    onClick={() => addToCart(pass, 'pass')}
                    className={`relative p-8 rounded-3xl border-2 transition-all cursor-pointer max-w-sm w-full ${cart.some(i => i.id === pass.id)
                      ? "border-orange-600 bg-orange-50/50 shadow-lg"
                      : "border-slate-100 bg-white hover:border-orange-300"
                      }`}
                  >
                    {pass.popular && (
                      <div className="absolute -top-3 right-4 bg-slate-900 text-white px-3 py-0.5 rounded-full text-[8px] font-black tracking-widest">
                        BEST VALUE
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-orange-600">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-black">£{pass.price}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{pass.name}</h3>
                    <p className="text-slate-500 text-xs mb-4">{pass.description}</p>
                    <ul className="space-y-2 mb-6">
                      {pass.features.slice(0, 3).map(f => (
                        <li key={f} className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
                          <Check className="w-3 h-3 text-green-500" /> {f}
                        </li>
                      ))}
                    </ul>
                    <div className={`w-full py-2 rounded-xl text-xs font-black text-center transition-all ${cart.some(i => i.id === pass.id)
                      ? "bg-orange-600 text-white"
                      : "bg-slate-100 text-slate-600"
                      }`}>
                      {cart.some(i => i.id === pass.id) ? "Selected" : "Select Pass"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 mb-8">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Select Payment Method</p>
                {[
                  { id: "card", label: "Credit / Debit Card", icon: <CreditCard className="w-5 h-5" /> },
                  { id: "wallet", label: "Expo Wallet Balance", icon: <Wallet className="w-5 h-5" />, balance: "£120.50" }
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border-2 transition-all ${paymentMethod === method.id
                      ? "border-orange-600 bg-orange-50 text-orange-900 shadow-sm"
                      : "border-slate-100 hover:border-orange-200 text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? "bg-white text-orange-600" : "bg-slate-100 text-slate-500"}`}>
                      {method.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{method.label}</span>
                      {method.balance && (
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available: {method.balance}</span>
                      )}
                    </div>
                    {paymentMethod === method.id && <Check className="ml-auto w-5 h-5 text-orange-600" />}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  disabled={!cart.some(i => i.type === 'pass') || !paymentMethod}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      const token = "GBX-" + Math.random().toString(36).substr(2, 9).toUpperCase();
                      setGeneratedToken(token);
                      setLoading(false);
                      setShowTokenScreen(true);
                    }, 1500);
                  }}
                  className="w-full py-4 bg-slate-900 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all disabled:opacity-50 shadow-lg"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Purchase & Get Access Token"}
                </button>
                <button
                  onClick={() => {
                    setShowPassModal(false);
                    setHasSkippedPass(true);
                  }}
                  className="w-full py-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-all"
                >
                  Skip for now
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Pass Secured!</h2>
              <p className="text-slate-600 text-sm mb-6">Copy your unique Access Token below. Use it during review to unlock full event access.</p>

              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 mb-8">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-2xl font-mono font-black text-slate-900 tracking-tighter">{generatedToken}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedToken);
                      alert("Token copied!");
                    }}
                    className="p-2 bg-white rounded-lg shadow-sm text-orange-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowPassModal(false);
                  setShowTokenScreen(false);
                }}
                className="w-full py-4 bg-orange-600 text-white rounded-full font-bold shadow-lg"
              >
                Continue to Onboarding
              </button>
            </div>
          )}
        </div>
      </Modal>
    </main>
  );
}