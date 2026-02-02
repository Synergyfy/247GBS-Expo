"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, Ticket, Users, Gift, ArrowRight, Sparkles, 
  CreditCard, ShieldCheck, Zap, Globe, Cpu, ShoppingBag 
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";

const STEPS = ["Selection", "Identity", "Checkout", "Passport"];

export default function TicketsPage() {
  const [step, setStep] = useState(0);
  const [selectedTier, setSelectedTier] = useState<null | string>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  const tiers = [
    {
      id: "standard",
      name: "Standard Visitor",
      price: "0",
      description: "Entry-level access to the digital ecosystem.",
      features: ["All Public Booths", "Standard Rewards", "Public Chat", "Guest Badge"],
      color: "orange",
      icon: <Ticket className="w-6 h-6 text-orange-600" />
    },
    {
      id: "vip",
      name: "VIP Networker",
      price: "19",
      description: "Premium access for the elite business visitor.",
      features: ["2x Rewards", "VIP Lounges", "Priority Support", "Verified Badge", "Private Meetings"],
      color: "slate",
      icon: <ShieldCheck className="w-6 h-6 text-slate-900" />,
      popular: true
    }
  ];

  const interestOptions = [
    { id: "tech", label: "Technology", icon: <Cpu className="w-4 h-4" /> },
    { id: "retail", label: "Global Retail", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "b2b", label: "B2B Services", icon: <Users className="w-4 h-4" /> },
    { id: "global", label: "International Trade", icon: <Globe className="w-4 h-4" /> }
  ];

  const toggleInterest = (id: string) => {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

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
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    i <= step ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" : "bg-white text-slate-300 border border-slate-200"
                  }`}
                >
                  {i < step ? <Check className="w-6 h-6" /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 md:w-16 h-1 mx-2 rounded-full ${i < step ? "bg-orange-600" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Choose Your Access Level</h1>
                <p className="text-xl text-slate-600">Secure your digital passport to the world's first permanent expo.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {tiers.map((tier) => (
                  <div 
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
                      selectedTier === tier.id 
                        ? "bg-white border-orange-600 shadow-2xl scale-105" 
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
                        <span className="text-slate-500 text-sm">{tier.price === "0" ? "/forever" : "/mo"}</span>
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

              <div className="mt-12 flex justify-center">
                <button 
                  disabled={!selectedTier}
                  onClick={nextStep}
                  className="px-12 py-4 bg-slate-900 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  Configure Identity <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/50">
                <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Personalize Your Journey</h2>
                <p className="text-slate-600 mb-10 text-lg">
                  Tell us what you're interested in so we can tailor your digital floor plan.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {interestOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => toggleInterest(opt.id)}
                      className={`flex items-center justify-center gap-2 p-4 rounded-2xl font-bold border-2 transition-all ${
                        interests.includes(opt.id)
                        ? "bg-orange-600 border-orange-600 text-white shadow-lg"
                        : "bg-white border-slate-100 text-slate-600 hover:border-orange-200"
                      }`}
                    >
                      {opt.icon} {opt.label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 py-4 border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50">Back</button>
                  <button onClick={nextStep} className="flex-[2] py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl">Complete Registration</button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl">
                <h2 className="text-3xl font-bold mb-2">Visitor Registration</h2>
                <p className="text-slate-500 mb-8">Almost there! We just need your details to generate your passport.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Work Email</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    />
                  </div>

                  <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-orange-900">Secure Payment</p>
                      <p className="text-sm text-orange-700">Encrypted 256-bit SSL transaction.</p>
                    </div>
                    <div className="ml-auto text-xl font-black text-orange-900">
                      £{selectedTier === 'vip' ? '19.00' : '0.00'}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setStep(2.5); // Intermediary loading step
                    setTimeout(() => setStep(3), 2000);
                  }}
                  disabled={!userInfo.name || !userInfo.email}
                  className="w-full mt-10 py-5 bg-orange-600 text-white rounded-full font-black text-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 disabled:opacity-50"
                >
                  {selectedTier === 'vip' ? 'Pay & Activate Passport' : 'Generate My Passport'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 2.5 && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto text-center py-20"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-orange-100 rounded-full" />
                <motion.div 
                  className="absolute inset-0 border-4 border-orange-600 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Generating Passport...</h2>
              <p className="text-slate-500">Securing your spot in the digital economy.</p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
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
                      <p className="font-bold text-orange-500">{selectedTier?.toUpperCase() || "STANDARD"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Valid Thru</p>
                      <p className="font-bold uppercase tracking-tighter">PERMANENT</p>
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