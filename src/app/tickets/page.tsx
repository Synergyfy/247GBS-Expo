"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, Ticket, Users, Gift, ArrowRight, Sparkles, 
  CreditCard, ShieldCheck, Zap, Globe, Cpu, ShoppingBag, 
  QrCode, Landmark, Wallet, ArrowLeft, Loader2, Calendar, MapPin, Plus, Minus
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import OtpInput from "@/app/component/OtpInput";

const STEPS = ["Event", "Selection", "Review", "Identity", "Payment", "Passport"];

export default function TicketsPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // State for Flow
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<null | string>(null);
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [otpVerified, setOtpVerified] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Mock Data
  const events = [
    { id: "spring2026", name: "Global Innovation Fair (Spring 2026)", date: "April 10-19, 2026", location: "Virtual Main Hall" },
    { id: "summer2026", name: "Summer Trade Carnival", date: "July 15-24, 2026", location: "Expo Center Alpha" },
  ];

  const tiers = [
    {
      id: "standard",
      name: "Standard Visitor",
      price: 0,
      description: "Entry-level access to the digital ecosystem.",
      features: ["All Public Booths", "Standard Rewards", "Public Chat", "Guest Badge"],
      bundle: [],
      color: "orange",
      icon: <Ticket className="w-6 h-6 text-orange-600" />
    },
    {
      id: "vip",
      name: "VIP Networker",
      price: 19,
      description: "Premium access for the elite business visitor.",
      features: ["2x Rewards", "VIP Lounges", "Priority Support", "Verified Badge", "Private Meetings"],
      bundle: ["Digital Goodie Bag", "100 Bonus Credits"],
      color: "slate",
      icon: <ShieldCheck className="w-6 h-6 text-slate-900" />,
      popular: true
    }
  ];

  const selectedEventData = events.find(e => e.id === selectedEvent);
  const selectedTierData = tiers.find(t => t.id === selectedTier);
  
  const basePrice = selectedTierData ? selectedTierData.price * quantity : 0;
  const discount = promoApplied ? 5 : 0;
  const finalPrice = Math.max(0, basePrice - discount);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }, 800);
  };

  const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "expo2026") {
      setPromoApplied(true);
    }
  };

  const handleOtpComplete = (otp: string) => {
    if (otp.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOtpVerified(true);
      }, 1500);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-100/50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 pt-40 pb-20 relative z-10">
        {/* Step Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center shrink-0">
                <div 
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${
                    i <= step ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" : "bg-white text-slate-300 border border-slate-200"
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4 md:w-6 md:h-6" /> : i + 1}
                </div>
                <span className={`ml-2 text-xs md:text-sm font-bold hidden md:block ${i <= step ? "text-slate-900" : "text-slate-300"}`}>{s}</span>
                {i < STEPS.length - 1 && (
                  <div className={`w-4 md:w-12 h-1 mx-2 md:mx-4 rounded-full ${i < step ? "bg-orange-600" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {/* STEP 0: EVENT SELECTION (Discovery Stage) */}
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Select an Event</h1>
                <p className="text-xl text-slate-600">Choose the exhibition you wish to attend.</p>
              </div>

              <div className="grid gap-6">
                {events.map((event) => (
                  <div 
                    key={event.id}
                    onClick={() => setSelectedEvent(event.id)}
                    className={`p-6 rounded-2xl cursor-pointer border-2 transition-all flex items-center justify-between group ${
                      selectedEvent === event.id 
                        ? "bg-white border-orange-600 shadow-xl" 
                        : "bg-white/80 border-transparent hover:border-orange-200"
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                        selectedEvent === event.id ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-400"
                      }`}>
                        {event.date.split(" ")[0].substring(0, 3)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{event.name}</h3>
                        <div className="flex gap-4 mt-1 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedEvent === event.id ? "border-orange-600 bg-orange-600 text-white" : "border-slate-300"
                    }`}>
                      {selectedEvent === event.id && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button 
                  disabled={!selectedEvent}
                  onClick={handleNext}
                  className="px-12 py-4 bg-orange-600 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-orange-600/30"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Next Step"}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: TICKET SELECTION */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Choose Your Ticket</h1>
                <p className="text-xl text-slate-600">Select the best access level for your needs.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                {tiers.map((tier) => (
                  <div 
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
                      selectedTier === tier.id 
                        ? "bg-white border-orange-600 shadow-2xl scale-105 z-10" 
                        : "bg-white/80 backdrop-blur-sm border-white shadow-xl hover:border-slate-200 hover:bg-white"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute top-0 right-8 -translate-y-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        RECOMMENDED
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tier.color === 'orange' ? 'bg-orange-50' : 'bg-slate-100'}`}>
                        {tier.icon}
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold">£{tier.price}</span>
                        <span className="text-slate-500 text-sm">/ticket</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-slate-600 mb-6">{tier.description}</p>
                    <ul className="space-y-4 mb-8">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                          <Check className={`w-5 h-5 ${tier.color === 'orange' ? 'text-orange-600' : 'text-slate-900'}`} /> {f}
                        </li>
                      ))}
                    </ul>
                    <div className={`w-full py-3 rounded-full font-bold text-center transition-all ${
                      selectedTier === tier.id ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                    }`}>
                      {selectedTier === tier.id ? "Selected" : "Select Tier"}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quantity Selector */}
              {selectedTier && (
                <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 flex items-center justify-between">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-sm">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Promo Code */}
              <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-12">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Have a Promo Code?</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter code (e.g. EXPO2026)" 
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 uppercase"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && <p className="text-green-600 text-sm font-bold mt-2 flex items-center gap-1"><Check className="w-4 h-4" /> Code Applied: £5.00 OFF</p>}
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={handleBack} className="px-8 py-4 border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50">Back</button>
                <button 
                  disabled={!selectedTier}
                  onClick={handleNext}
                  className="px-12 py-4 bg-orange-600 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-orange-600/30"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Review Order"}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: REVIEW (CART) */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100">
                <h2 className="text-3xl font-bold mb-8 text-slate-900">Order Summary</h2>
                
                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200 space-y-4">
                   <div className="pb-4 border-b border-slate-200">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Event</p>
                     <p className="font-bold text-slate-900">{selectedEventData?.name}</p>
                     <p className="text-sm text-slate-500">{selectedEventData?.date}</p>
                   </div>

                   <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{selectedTierData?.name} x {quantity}</h3>
                      <p className="text-slate-500 text-sm">{selectedTierData?.description}</p>
                      {selectedTierData?.bundle && selectedTierData.bundle.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-bold text-orange-600 uppercase mb-1">Bundled Items:</p>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {selectedTierData.bundle.map(item => <li key={item} className="flex items-center gap-1"><Gift className="w-3 h-3" /> {item}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="text-xl font-bold text-slate-900">£{basePrice.toFixed(2)}</div>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between items-center text-green-600 pt-2 border-t border-slate-200">
                      <span className="font-medium">Promo Discount</span>
                      <span className="font-bold">-£5.00</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t-2 border-slate-200">
                    <span className="font-bold text-lg text-slate-900">Total</span>
                    <span className="font-black text-3xl text-orange-600">£{finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={handleBack} className="flex-1 py-4 border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50 transition-all">Back</button>
                  <button onClick={handleNext} className="flex-[2] py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 flex justify-center items-center gap-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm & Identify"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: IDENTITY & VERIFICATION */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100">
                <h2 className="text-3xl font-bold mb-2 text-slate-900">Verify Identity</h2>
                <p className="text-slate-500 mb-8">We use this to issue your secure digital passport.</p>
                
                {!otpVerified ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Jane Doe"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="e.g. jane@company.com"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      />
                    </div>
                    
                    {userInfo.email && userInfo.name && (
                      <div className="mt-8 pt-8 border-t border-slate-100">
                        <label className="block text-sm font-bold text-orange-600 mb-4 uppercase tracking-wider text-center">Enter Verification Code</label>
                        <p className="text-center text-slate-400 text-sm mb-6">We sent a 6-digit code to {userInfo.email}</p>
                        <OtpInput length={6} onComplete={handleOtpComplete} />
                        {loading && <p className="text-center text-orange-600 font-bold mt-4 flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</p>}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Identity Verified</h3>
                    <p className="text-slate-500 mb-8">You are successfully verified as {userInfo.name}.</p>
                    <button 
                      onClick={handleNext}
                      className="w-full py-4 bg-orange-600 text-white rounded-full font-bold shadow-xl shadow-orange-600/30 hover:bg-orange-700 transition-all"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                )}
                
                {!otpVerified && (
                   <div className="flex gap-4 mt-8">
                     <button onClick={handleBack} className="flex-1 py-4 border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50 transition-all">Back</button>
                   </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 4: PAYMENT */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100">
                <h2 className="text-3xl font-bold mb-2 text-slate-900">Secure Payment</h2>
                <p className="text-slate-500 mb-8">Select your preferred payment method.</p>

                <div className="space-y-4 mb-8">
                  {[
                    { id: "card", label: "Credit / Debit Card", icon: <CreditCard className="w-6 h-6" /> },
                    { id: "bank", label: "Bank Transfer", icon: <Landmark className="w-6 h-6" /> },
                    { id: "wallet", label: "Expo Wallet Balance", icon: <Wallet className="w-6 h-6" /> }
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-4 p-6 rounded-2xl cursor-pointer border-2 transition-all ${
                        paymentMethod === method.id 
                          ? "border-orange-600 bg-orange-50 text-orange-900 shadow-md" 
                          : "border-slate-100 hover:border-orange-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? "bg-white text-orange-600" : "bg-slate-100 text-slate-500"}`}>
                        {method.icon}
                      </div>
                      <span className="font-bold text-lg">{method.label}</span>
                      {paymentMethod === method.id && <Check className="ml-auto w-6 h-6 text-orange-600" />}
                    </div>
                  ))}
                </div>
                
                <div className="mb-8">
                   <label className="flex items-start gap-3 cursor-pointer p-4 hover:bg-slate-50 rounded-xl transition-colors">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow-sm checked:border-orange-600 checked:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600/20"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                        />
                         <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                      </div>
                      <span className="text-sm text-slate-600 pt-0.5">I agree to the <a href="#" className="text-orange-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-orange-600 font-bold hover:underline">Privacy Policy</a>.</span>
                   </label>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-8 flex justify-between items-center">
                  <span className="font-bold text-slate-600">Amount to Pay</span>
                  <span className="text-3xl font-black text-slate-900">£{finalPrice.toFixed(2)}</span>
                </div>

                <div className="flex gap-4">
                  <button onClick={handleBack} className="flex-1 py-4 border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50 transition-all">Back</button>
                  <button 
                    onClick={handleNext} 
                    disabled={!paymentMethod || !agreedToTerms}
                    className="flex-[2] py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Purchase"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: PASSPORT (SUCCESS) */}
          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="max-w-md mx-auto"
            >
              {/* THE SURPRISE: A real-looking Digital Passport Card */}
              <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-[32px] blur-2xl opacity-40 animate-pulse" />
                
                <motion.div 
                  className="relative bg-[#1a1a1a] text-white p-8 rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
                  whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
                >
                  {/* Holographic Shine Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-[100%]"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Zap className="w-40 h-40" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <div className="bg-orange-600 text-[10px] font-black tracking-[0.2em] px-2 py-0.5 rounded uppercase mb-2 inline-block">
                        Digital Passport
                      </div>
                      <h3 className="text-2xl font-black tracking-tighter">247GBS EXPO</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Pass Holder</p>
                    <p className="text-xl font-bold tracking-tight">{userInfo.name || "EXPO VISITOR"}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Access Tier</p>
                      <p className="font-bold text-orange-500">{selectedTierData?.name.toUpperCase() || "STANDARD"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Quantity</p>
                      <p className="font-bold uppercase tracking-tighter">{quantity} TICKETS</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-white/10">
                    <div className="bg-white p-2 rounded-lg">
                      {/* Fake QR Code */}
                      <div className="grid grid-cols-4 gap-0.5 w-10 h-10">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className={`w-full h-full ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-slate-500 font-bold tracking-widest mb-1 uppercase">Passport ID</p>
                      <p className="text-xs font-mono font-bold tracking-tighter">GBX-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="text-center mt-12">
                <h2 className="text-3xl font-bold mb-4">Welcome to the Future.</h2>
                <p className="text-slate-600 mb-8">Your passport is active. Check your email for login credentials.</p>
                <Link 
                  href="/dashboard/customer"
                  className="inline-block px-12 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl"
                >
                  Enter the Expo Floor
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}