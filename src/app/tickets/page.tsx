"use client";

import { useState, useEffect } from "react";
import { 
 motion, AnimatePresence } from "framer-motion";
import { 
  Check, Ticket, Users, Gift, ArrowRight, Sparkles, 
  CreditCard, ShieldCheck, Zap, Globe, Cpu, ShoppingBag, 
  QrCode, Landmark, Wallet, ArrowLeft, Loader2, Calendar, MapPin, Plus, Minus, Play, X, Search, Filter, Info, Star, Clock, Shield, Copy
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import OtpInput from "@/app/component/OtpInput";
import Modal from "@/app/component/Modal";
import { events } from "@/data/events";

const STEPS = ["Event Marketplace", "Add-ons", "Review", "Identity", "Payment", "Digital Passport"];

interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'pass' | 'ticket' | 'product';
  quantity: number;
  eventId?: string;
}

export default function TicketsPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // State for Flow
  const [hasGeneralPass, setHasGeneralPass] = useState(false);
  const [activeAccessToken, setAccessToken] = useState("");
  const [enteredToken, setEnteredToken] = useState("");
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [showTokenScreen, setShowTokenScreen] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [hasSkippedPass, setHasSkippedPass] = useState(false);

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 6;
  const [selectedEventInfo, setSelectedEventInfo] = useState<any>(null);
  const [selectedProductInfo, setSelectedProductInfo] = useState<any>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState("overview");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [otpVerified, setOtpVerified] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // UK Pricing Constants
  const BOOKING_FEE = 1.50; // Flat £1.50 per transaction
  const VAT_RATE = 0.20; // 20% UK VAT

  // Reset pagination on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, eventType]);

  useEffect(() => {
    // Show pass modal on mount
    const timer = setTimeout(() => {
      if (!hasSkippedPass) {
        setShowPassModal(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock Data
  const passes = [
    {
      id: "annual_pass",
      name: "Annual All-Access Pass",
      price: 75,
      description: "Best value. Entry to all 4 seasons in 2026. Includes 24/7 lobby access.",
      features: ["4 Seasons Entry", "VIP Lounge Access", "Priority Queue", "Premium Rewards"],
      popular: true
    }
  ];

  const tiers = [
    {
      id: "standard",
      name: "Standard Visitor",
      price: 0,
      description: "Entry-level access to the digital ecosystem.",
      features: ["All Public Booths", "Standard Rewards", "Public Chat", "Guest Badge"],
      color: "orange",
      icon: <Ticket className="w-6 h-6 text-orange-600" />
    },
    {
      id: "vip",
      name: "VIP Networker",
      price: 19,
      description: "Premium access for the elite business visitor.",
      features: ["2x Rewards", "VIP Lounges", "Priority Support", "Verified Badge", "Private Meetings"],
      color: "slate",
      icon: <ShieldCheck className="w-6 h-6 text-slate-900" />,
      popular: true
    }
  ];

  const products = [
    { 
      id: "guide", 
      name: "Digital Guidebook", 
      price: 5, 
      icon: <ShoppingBag className="w-5 h-5" />,
      description: "A comprehensive digital guide featuring exhibitor maps, speaker bios, and exclusive discount codes for booth products."
    },
    { 
      id: "credits", 
      name: "100 Expo Credits", 
      price: 10, 
      icon: <Cpu className="w-5 h-5" />,
      description: "Virtual currency that can be spent at any digital booth for product samples, premium downloads, or limited edition NFT assets."
    },
    { 
      id: "recording", 
      name: "Session Recordings", 
      price: 25, 
      icon: <Play className="w-5 h-5" />,
      description: "Lifetime access to high-definition video recordings of all keynote speeches and workshops from the entire exhibition period."
    },
  ];

  const toggleEvent = (id: string) => {
    const isSelected = selectedEvents.includes(id);
    if (isSelected) {
      setSelectedEvents(prev => prev.filter(e => e !== id));
      removeFromCart("standard", id);
    } else {
      setSelectedEvents(prev => [...prev, id]);
      addToCart(tiers[0], 'ticket', id);
    }
  };

  const addToCart = (item: any, type: 'pass' | 'ticket' | 'product', eventId?: string) => {
    setCart(prev => {
      // For General Pass, replace any existing pass
      if (type === 'pass') {
        const otherItems = prev.filter(i => i.type !== 'pass');
        return [...otherItems, { id: item.id, name: item.name, price: item.price, type, quantity: 1 }];
      }

      const existing = prev.find(i => i.id === item.id && (type !== 'ticket' || i.eventId === eventId));
      if (existing) {
        return prev.map(i => (i.id === item.id && i.eventId === eventId) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        type, 
        quantity: 1,
        eventId: type === 'ticket' ? eventId : undefined 
      }];
    });
  };

  const removeFromCart = (id: string, eventId?: string) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.eventId === eventId)));
  };

  const updateQuantity = (id: string, delta: number, eventId?: string) => {
    setCart(prev => prev.map(i => {
      if (i.id === id && i.eventId === eventId) {
        return { ...i, quantity: Math.max(1, i.quantity + delta) };
      }
      return i;
    }));
  };

  const hasPassInCart = cart.some(i => i.type === 'pass');
  const needsPassFee = !isTokenValidated && !hasPassInCart;
  const passFee = needsPassFee ? 75 : 0;

  const itemsTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = promoApplied ? 5 : 0;
  const subtotal = Math.max(0, itemsTotal - discount);
  const totalBookingFee = cart.length > 0 || needsPassFee ? BOOKING_FEE : 0;
  const finalPrice = subtotal + totalBookingFee + passFee;

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

    const filteredEvents = events.filter(e => 
      (e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      e.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
      e.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (eventType === "all" || e.type === eventType)
    );
  
    const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
    const paginatedEvents = filteredEvents.slice(
      (currentPage - 1) * EVENTS_PER_PAGE,
      currentPage * EVENTS_PER_PAGE
    );

  const totalSelectedTicketsQuantity = cart.filter(item => item.type === 'ticket').reduce((acc, item) => acc + item.quantity, 0);

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
                    
                    {/* STEP 0: EVENT SELECTION */}
                    {step === 0 && (
                      <motion.div 
                        key="step0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-7xl mx-auto"
                      >
                        <div className="text-center mb-8">
                          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Exhibitor Events</h1>
                          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Explore brand showcases. A valid Platform Pass is required to book these events.</p>
                        </div>
          
                        {/* Season Pass Status Banner (UK Requirement) */}
                        {cart.some(i => i.type === 'pass') && (
                          <div className="max-w-4xl mx-auto mb-10 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                                <Check className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="text-xs font-black text-emerald-900 uppercase tracking-widest">Entry Pass Active</p>
                                <p className="text-sm text-emerald-700 font-medium">{cart.find(i => i.type === 'pass')?.name}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => setShowPassModal(true)}
                              className="text-xs font-bold text-emerald-600 underline hover:text-emerald-800 transition-colors"
                            >
                              Change Pass
                            </button>
                          </div>
                        )}  
                {/* Top Action Bar (New) */}
                 {step === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-12 right-12 z-[60]"
                  >
                    <AnimatePresence>
                      {totalSelectedTicketsQuantity > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 50 }}
                          transition={{ duration: 0.3 }}
                          className="w-80 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden"
                        >
                          <div className="p-4 bg-orange-600 text-white flex items-center justify-between">
                            <span className="font-bold text-lg">Your Selected Events</span>
                            <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-bold">{totalSelectedTicketsQuantity} Tickets</span>
                          </div>
                          <div className="flex-1 overflow-y-auto max-h-60 custom-scrollbar">
                            {cart.filter(item => item.type === 'ticket').map(item => (
                              <div key={`${item.id}-${item.eventId}`} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-b-0">
                                <div className="flex-1 pr-2">
                                  <p className="font-medium text-slate-800 text-sm leading-tight">{item.name}</p>
                                  <p className="text-xs text-slate-500">£{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1, item.eventId); }}
                                    className="p-1 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="font-bold text-slate-900 text-sm w-6 text-center">{item.quantity}</span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1, item.eventId); }}
                                    className="p-1 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button 
                            onClick={handleNext}
                            className="w-full py-4 bg-slate-900 text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-orange-700 transition-all active:scale-95 shadow-lg"
                          >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                              <>
                                <span>Continue to Tickets</span>
                                <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full text-sm">
                                  {totalSelectedTicketsQuantity}
                                </div>
                                <ArrowRight className="w-6 h-6" />
                              </>
                            )}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
  
                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-4xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Search events by name, location, or category..." 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm text-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <select 
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="appearance-none px-6 pr-12 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="all">All Event Types</option>
                      <option value="national">National Expo</option>
                      <option value="platform-led">Platform-led</option>
                      <option value="business-led">Business-led</option>
                    </select>
                    <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedEvents.map((event) => (
                  <div 
                    key={event.id}
                    onClick={() => toggleEvent(event.id)}
                    className={`relative group rounded-[2rem] overflow-hidden cursor-pointer border-2 transition-all duration-300 flex flex-col ${
                      selectedEvents.includes(event.id) 
                        ? "border-orange-600 shadow-2xl scale-[1.02]" 
                        : "border-slate-100 hover:border-orange-300 hover:shadow-xl bg-white"
                    }`}
                  >
                    {/* Card Header / Image Area */}
                    <div className={`h-48 ${event.image} relative p-6 flex flex-col justify-between`}>
                      <div className="flex justify-between items-start">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800">
                          {event.category}
                        </span>
                        <div className="flex gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            selectedEvents.includes(event.id) 
                              ? "bg-orange-600 text-white" 
                              : "bg-white/50 text-slate-400 group-hover:bg-white"
                          }`}>
                            {selectedEvents.includes(event.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl inline-block shadow-sm">
                           <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
                             <Calendar className="w-4 h-4 text-orange-600" /> {event.date.split(",")[0]}
                           </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col bg-white">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {event.name}
                      </h3>
                      <div className="space-y-3 mb-6">
                        <p className="flex items-center gap-2 text-slate-500 text-sm">
                          <MapPin className="w-4 h-4" /> {event.location}
                        </p>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEventInfo(event);
                            setShowInfoModal(true);
                          }}
                          className="text-xs font-bold text-orange-600 uppercase tracking-widest hover:text-orange-700 transition-colors flex items-center gap-1.5"
                        >
                          <Info className="w-3.5 h-3.5" /> Learn More
                        </button>
                      </div>
                      
                      <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Starts from £19</span>
                        <span className={`text-sm font-bold transition-colors ${selectedEvents.includes(event.id) ? "text-orange-600" : "text-slate-300 group-hover:text-orange-400"}`}>
                          {selectedEvents.includes(event.id) ? "Selected" : "Select Event"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Selection Overlay (Subtle) */}
                    {selectedEvents.includes(event.id) && (
                      <div className="absolute inset-0 border-[3px] border-orange-600 rounded-[2rem] pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination Controls (New) */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mb-12">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-3 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-xl font-bold transition-all ${
                          currentPage === i + 1 
                            ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" 
                            : "bg-white border border-slate-200 text-slate-400 hover:border-orange-600 hover:text-orange-600"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="p-3 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-all"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 1: ADD-ONS (Products System) */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Enhance Your Visit</h1>
                <p className="text-xl text-slate-600">Exclusive products and services for attendees.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {products.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl hover:border-orange-500 transition-all flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-4">
                      {product.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{product.name}</h3>
                    <p className="text-2xl font-black text-slate-900 mb-4">£{product.price}</p>
                    <button 
                      onClick={() => {
                        setSelectedProductInfo(product);
                        setShowProductModal(true);
                      }}
                      className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 hover:text-orange-600 transition-colors flex items-center gap-1"
                    >
                      <Info className="w-3 h-3" /> Learn More
                    </button>
                    <button 
                      onClick={() => addToCart(product, 'product')}
                      className="mt-auto w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              {cart.length > 0 && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-12">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-sm">Your Cart</span>
                    <span className="font-black text-xl text-orange-600">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cart.map(item => (
                      <div key={item.id} className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2">
                        {item.name} x{item.quantity}
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4">
                <button onClick={handleBack} className="px-8 py-4 border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50">Back</button>
                <button 
                  onClick={handleNext}
                  className="px-12 py-4 bg-orange-600 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Review Order"}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: REVIEW (UK Pattern: Booking Fee & VAT) */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100">
                <h2 className="text-3xl font-extrabold mb-8 text-slate-900">Checkout Review</h2>
                
                {/* Cart Items List */}
                <div className="space-y-4 mb-8">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.eventId}`} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest ${
                            item.type === 'pass' ? "bg-slate-900 text-white" : "bg-orange-100 text-orange-600"
                          }`}>
                            {item.type}
                          </span>
                        </div>
                        {item.type === 'ticket' && (
                          <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mt-1">
                            Exhibitor: {events.find(e => e.id === item.eventId)?.organizer}
                          </p>
                        )}
                        <p className="text-xs text-slate-400 mt-1">{item.quantity} unit(s) • £{item.price} ea</p>
                      </div>
                      <span className="font-bold text-slate-900">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Access Token Redemption Area (New Requirement) */}
                <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <label className="text-xs font-black text-orange-900 uppercase tracking-widest">Redeem Access Token</label>
                  </div>
                  <p className="text-[10px] text-orange-700/60 font-medium mb-4 leading-relaxed">
                    If you already have a General Pass, enter your Access Token below to unlock Exhibitor events.
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
                          setAccessToken(enteredToken);
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
                      <Check className="w-3 h-3" /> Token active: Full Marketplace access granted.
                    </p>
                  ) : (
                    null
                  )}
                </div>

                {/* Final Cost Breakdown (UK Standard) */}
                <div className="space-y-3 bg-slate-50 p-6 rounded-3xl mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Subtotal</span>
                    <span className="text-slate-900 font-bold">£{itemsTotal.toFixed(2)}</span>
                  </div>
                  {needsPassFee && (
                    <div className="flex justify-between items-center text-sm text-orange-600">
                      <span className="font-bold">Mandatory Pass Fee</span>
                      <span className="font-black">£{passFee.toFixed(2)}</span>
                    </div>
                  )}
                  {promoApplied && (
                    <div className="flex justify-between items-center text-sm text-green-600">
                      <span className="font-medium italic">Seasonal Discount</span>
                      <span className="font-bold">-£{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500 font-medium">Booking Fee</span>
                      <Info className="w-3 h-3 text-slate-300" />
                    </div>
                    <span className="text-slate-900 font-bold">£{totalBookingFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="font-black text-slate-900 text-lg">Total Amount</span>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Includes 20% UK VAT</p>
                    </div>
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
                <h2 className="text-3xl font-extrabold mb-2 text-slate-900">Verify Identity</h2>
                <p className="text-slate-500 mb-8">Secure your tickets with UK-compliant email verification.</p>
                
                {!otpVerified ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">First Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Jane"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                          value={userInfo.firstName}
                          onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Last Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Doe"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                          value={userInfo.lastName}
                          onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="e.g. jane@company.com"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      />
                    </div>
                    
                    {userInfo.email && userInfo.firstName && userInfo.lastName && (
                      <div className="mt-8 pt-8 border-t border-slate-100">
                        <label className="block text-sm font-bold text-orange-600 mb-4 uppercase tracking-wider text-center">Secure Access Code</label>
                        <p className="text-center text-slate-400 text-[10px] mb-6 font-medium">Verification required for platform access tokens.</p>
                        <OtpInput length={6} onComplete={handleOtpComplete} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Identity Confirmed</h3>
                    <p className="text-slate-500 mb-8">Verification successful. Proceed to secure payment gateway.</p>
                    <button 
                      onClick={handleNext}
                      className="w-full py-4 bg-orange-600 text-white rounded-full font-bold shadow-xl shadow-orange-600/30 hover:bg-orange-700 transition-all"
                    >
                      Continue to Payment
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
                <h2 className="text-3xl font-extrabold mb-2 text-slate-900">Payment</h2>
                <p className="text-slate-500 mb-8">All transactions are encrypted and secured via UK payment standards.</p>

                <div className="space-y-4 mb-8">
                  {[
                    { id: "card", label: "Credit / Debit Card", icon: <CreditCard className="w-6 h-6" /> },
                    { id: "wallet", label: "Expo Wallet Balance", icon: <Wallet className="w-6 h-6" />, balance: "£120.50" }
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-4 p-6 rounded-3xl cursor-pointer border-2 transition-all ${
                        paymentMethod === method.id 
                          ? "border-orange-600 bg-orange-50 text-orange-900 shadow-md" 
                          : "border-slate-100 hover:border-orange-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentMethod === method.id ? "bg-white text-orange-600" : "bg-slate-100 text-slate-500"}`}>
                        {method.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{method.label}</span>
                        {method.balance && (
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available: {method.balance}</span>
                        )}
                      </div>
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
                      <span className="text-xs text-slate-600 pt-0.5 leading-relaxed">
                        I agree to the Terms of Service and understand that exhibitor event data may be shared with organizers.
                      </span>
                   </label>
                </div>

                <div className="p-6 bg-slate-900 text-white rounded-3xl mb-8 flex justify-between items-center shadow-xl">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Payable Amount</span>
                    <p className="text-3xl font-black">£{finalPrice.toFixed(2)}</p>
                  </div>
                  <ShieldCheck className="w-10 h-10 text-orange-500 opacity-50" />
                </div>

                <div className="flex gap-4">
                  <button onClick={handleBack} className="flex-1 py-4 border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50 transition-all">Back</button>
                  <button 
                    onClick={handleNext} 
                    disabled={!paymentMethod || !agreedToTerms}
                    className="flex-[2] py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Transaction"}
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
              className="max-w-md mx-auto"
            >
              <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-[32px] blur-2xl opacity-40 animate-pulse" />
                
                <motion.div 
                  className="relative bg-[#1a1a1a] text-white p-8 rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
                  whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
                >
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <div className="bg-orange-600 text-[10px] font-black tracking-[0.2em] px-2 py-0.5 rounded uppercase mb-2 inline-block">
                        Digital Passport
                      </div>
                      <h3 className="text-2xl font-black tracking-tighter">247GBS EXPO</h3>
                    </div>
                    <div className="flex flex-col items-end">
                      <Zap className="w-6 h-6 text-orange-500 mb-2" />
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border border-green-500/30">
                        <ShieldCheck className="w-2.5 h-2.5" /> Verified
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Pass Holder</p>
                    <p className="text-xl font-bold tracking-tight">{userInfo.firstName} {userInfo.lastName || "EXPO VISITOR"}</p>
                    <p className="text-xs text-slate-400 font-medium">{userInfo.email}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-8">
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Access Level</p>
                      <p className="font-bold text-orange-500 text-sm">
                        {cart.find(i => i.id === 'vip') ? 'VIP PREMIER' : 'STANDARD ACCESS'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Quantity</p>
                      <p className="font-bold uppercase tracking-tighter text-sm">{cart.reduce((a, b) => a + b.quantity, 0)} ASSETS</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Validity Period</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-orange-500" />
                        <p className="font-bold text-xs">
                          {selectedEvents.length > 0 
                            ? events.find(e => e.id === selectedEvents[0])?.date
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Location</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-orange-500" />
                        <p className="font-bold text-xs truncate">
                          {selectedEvents.length === 1 
                            ? events.find(e => e.id === selectedEvents[0])?.location 
                            : "Multiple Virtual Venues"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-white/10">
                    <div className="bg-white p-2 rounded-lg">
                      <QrCode className="w-10 h-10 text-black" />
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-slate-500 font-bold tracking-widest mb-1 uppercase">Passport ID</p>
                      <p className="text-xs font-mono font-bold tracking-tighter">GBX-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="text-center mt-12">
                <h2 className="text-3xl font-bold mb-4">You're Almost Ready!</h2>
                <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                  Your digital passport is ready. Create a secure account now to permanently save your tickets, access exclusive rewards, and enter the expo from any device.
                </p>
                
                <div className="flex flex-col items-center justify-center gap-4">
                  <Link 
                    href={`/signup?role=customer&email=${encodeURIComponent(userInfo.email)}&firstName=${encodeURIComponent(userInfo.firstName)}&lastName=${encodeURIComponent(userInfo.lastName)}`}
                    className="w-full max-w-sm px-12 py-5 bg-orange-600 text-white rounded-full font-bold text-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
                  >
                    Save Ticket <ArrowRight className="w-6 h-6" />
                  </Link>
                </div>
                <p className="mt-6 text-xs text-slate-400">
                  Already have an account? <Link href="/login" className="text-orange-600 font-bold hover:underline">Log in to sync</Link>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />

      {/* EVENT INFO MODAL (Interest Stage Deep Dive) */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => {
          setShowInfoModal(false);
          setSelectedEventInfo(null);
          setActiveInfoTab("overview");
        }}
        title={selectedEventInfo?.name || "Event Details"}
      >
        {selectedEventInfo && (
          <div className="space-y-8">
            {/* Video / Hero Area */}
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video group cursor-pointer">
              <Image 
                src={selectedEventInfo.fullImage} 
                alt={selectedEventInfo.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white font-bold text-sm">Watch Preview Trailer</div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200">
              {['overview', 'schedule', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveInfoTab(tab)}
                  className={`px-6 py-3 font-bold text-sm capitalize border-b-2 transition-colors ${
                    activeInfoTab === tab 
                      ? "border-orange-600 text-orange-600" 
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeInfoTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">About the Event</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{selectedEventInfo.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <h5 className="font-bold text-slate-900 text-xs mb-3 flex items-center gap-2 uppercase tracking-widest">
                        <Star className="w-4 h-4 text-orange-500" /> Key Benefits
                      </h5>
                      <ul className="space-y-2">
                        {selectedEventInfo.benefits.map((benefit: string, i: number) => (
                          <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                            <Check className="w-3 h-3 text-green-500" /> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <h5 className="font-bold text-slate-900 text-xs mb-3 flex items-center gap-2 uppercase tracking-widest">
                        <Info className="w-4 h-4 text-blue-500" /> Key Info
                      </h5>
                      <div className="space-y-2 text-xs text-slate-600">
                        <div className="flex justify-between"><span>Organizer:</span> <span className="font-bold">{selectedEventInfo.organizer}</span></div>
                        <div className="flex justify-between"><span>Format:</span> <span className="font-bold">Virtual & Hybrid</span></div>
                        <div className="flex justify-between"><span>Age:</span> <span className="font-bold">18+</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeInfoTab === 'schedule' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-lg text-xs text-center w-16">
                      10:00 AM
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Opening Keynote</div>
                      <div className="text-xs text-slate-500">Main Stage • {selectedEventInfo.organizer}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-lg text-xs text-center w-16">
                      11:30 AM
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Tech Demos & Booth Visits</div>
                      <div className="text-xs text-slate-500">Exhibition Hall A</div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 text-blue-800 text-center rounded-xl text-xs font-bold cursor-pointer hover:bg-blue-100 transition-colors">
                    View Full Agenda
                  </div>
                </div>
              )}

              {activeInfoTab === 'reviews' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl font-black text-slate-900">{selectedEventInfo.rating}</div>
                    <div>
                      <div className="flex text-yellow-400 text-sm">★★★★★</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{selectedEventInfo.reviews} Verified Reviews</div>
                    </div>
                  </div>
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-slate-900 text-xs">Alex M.</span>
                        <span className="text-[10px] text-slate-400">2 days ago</span>
                      </div>
                      <p className="text-xs text-slate-600">"Incredible experience! The virtual booths were super interactive."</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / CTA */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Starting Price</p>
                <p className="text-2xl font-black text-slate-900">£19.00</p>
              </div>
              <button 
                onClick={() => {
                  if (!selectedEvents.includes(selectedEventInfo.id)) {
                    toggleEvent(selectedEventInfo.id);
                  }
                  setShowInfoModal(false);
                }}
                className={`px-8 py-4 rounded-full font-bold shadow-xl transition-all flex items-center gap-2 ${
                  selectedEvents.includes(selectedEventInfo.id)
                    ? "bg-slate-100 text-slate-400 cursor-default"
                    : "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-600/30"
                }`}
              >
                {selectedEvents.includes(selectedEventInfo.id) ? <><Check className="w-5 h-5" /> Already Selected</> : <><Plus className="w-5 h-5" /> Select This Event</>}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* PRODUCT INFO MODAL */}
      <Modal
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setSelectedProductInfo(null);
        }}
        title="Add-on Details"
      >
        {selectedProductInfo && (
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4">
                {selectedProductInfo.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{selectedProductInfo.name}</h3>
              <p className="text-3xl font-black text-orange-600">£{selectedProductInfo.price.toFixed(2)}</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-orange-600" /> Description
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedProductInfo.description}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">Digital Fulfillment</p>
                <p className="text-xs text-blue-700 leading-tight">This item is a digital asset and will be delivered to your ticket wallet immediately after purchase.</p>
              </div>
            </div>

            <button 
              onClick={() => {
                addToCart(selectedProductInfo, 'product');
                setShowProductModal(false);
              }}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        )}
      </Modal>

      {/* PASS SELECTION OVERLAY MODAL */}
      <Modal
        isOpen={showPassModal}
        onClose={() => {
          setShowPassModal(false);
          setHasSkippedPass(true);
        }}
        title="Get Your Platform Pass"
        maxWidth="4xl"
      >
        <div className="max-w-4xl mx-auto">
          {!showTokenScreen ? (
            <>
              <div className="text-center mb-8">
                <p className="text-slate-600">To enjoy an amazing event and unlock all marketplace features, get your season pass now!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {passes.map((pass) => (
                  <div 
                    key={pass.id}
                    onClick={() => addToCart(pass, 'pass')}
                    className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${
                      cart.some(i => i.id === pass.id) 
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
                    <div className={`w-full py-2 rounded-xl text-xs font-black text-center transition-all ${
                      cart.some(i => i.id === pass.id) 
                        ? "bg-orange-600 text-white" 
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {cart.some(i => i.id === pass.id) ? "Selected" : "Select Pass"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  disabled={!cart.some(i => i.type === 'pass')}
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
                Continue to Events
              </button>
            </div>
          )}
        </div>
      </Modal>
    </main>
  );
}
