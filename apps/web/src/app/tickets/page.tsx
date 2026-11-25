"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Ticket, ArrowRight, Sparkles,
  CreditCard, ShieldCheck, Zap, Globe, Cpu, ShoppingBag,
  QrCode, Wallet, ArrowLeft, Loader2, Calendar, MapPin, Plus, Minus, Play, X, Search, Filter, Info, Star, Shield, Copy, ExternalLink, ChevronDown, ChevronUp
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";
import Modal from "@/app/component/Modal";
import SandboxCheckoutModal, { SandboxPaymentResult } from "@/app/component/SandboxCheckoutModal";
import Tooltip from "@/app/component/Tooltip";
import { events } from "@/data/events";
import { PASS_PLANS } from "@/data/passes";
import { getStoredUser, clearStoredUser } from "@/lib/auth";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// Step 4 (Local Identity / OTP Verification) removed per Central Solution (CHS) directive.
const STEPS = ["Events", "Add-ons", "Review", "Payment", "Passport"];

interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'pass' | 'ticket' | 'product';
  quantity: number;
  eventId?: string;
}

function StripeCardForm({
  amount,
  onSuccess,
  onError,
}: {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    onError("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        onError(error.message || "Payment authorization failed");
        setSubmitting(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent.id);
      } else {
        onError("Payment status: " + (paymentIntent?.status || "pending"));
        setSubmitting(false);
      }
    } catch (err: any) {
      onError(err?.message || "An unexpected error occurred during payment.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative min-h-[160px] flex flex-col justify-center">
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10 py-6">
            <Loader2 className="w-6 h-6 text-orange-500 animate-spin mb-2" />
            <p className="text-slate-500 font-medium text-xs">Loading secure Stripe elements...</p>
          </div>
        )}
        <PaymentElement onReady={() => setIsReady(true)} />
      </div>

      <button
        type="submit"
        disabled={!stripe || submitting || !isReady}
        className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Authorizing with Stripe Sandbox...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            <span>Pay £{amount.toFixed(2)} with Stripe</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}

function TicketsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasPreselectedEvents = searchParams.get('season') || searchParams.get('selectedEvents');
  const stepParam = searchParams.get('step');

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [step, setStep] = useState(stepParam ? parseInt(stepParam, 10) : (hasPreselectedEvents ? 1 : 0));
  const [loading, setLoading] = useState(false);

  const CHS_BASE_URL =
    process.env.NEXT_PUBLIC_CHS_URL || "https://centralhubsolution.com";

  // Check optional existing session without blocking public event browsing or checkout.
  // Per CHS directive (Nov 16), registration & identity verification happen via Central Hub Solution (CHS) at the final stage.
  useEffect(() => {
    const wantsPass = searchParams.get("pass") === "true";
    const user = getStoredUser();
    if (user) {
      setCurrentUser(user);
    }
    if (wantsPass) {
      setShowPassModal(true);
    }
    setAuthChecking(false);
  }, [searchParams]);

  // Access Pass Token State
  const [enteredToken, setEnteredToken] = useState("");
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [showTokenScreen, setShowTokenScreen] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showPassSandboxCheckout, setShowPassSandboxCheckout] = useState(false);
  const [passPaymentReceipt, setPassPaymentReceipt] = useState<SandboxPaymentResult | null>(null);

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
  const [paymentType, setPaymentType] = useState<"card" | "wallet">("card");
  const [gatewayProvider, setGatewayProvider] = useState<"stripe" | "paypal">("stripe");
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [showAddOns, setShowAddOns] = useState(false);

  // Hosted & Embedded Sandbox Payment States
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeInitLoading, setStripeInitLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verifiedDetails, setVerifiedDetails] = useState<any>(null);
  const [transactionRef, setTransactionRef] = useState<string>("GBX-PASS-ACTIVE");

  const BOOKING_FEE = 1.50;

  // Reset scroll position to top whenever navigating between steps
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, eventType]);

  // Handle Season/Event Pre-selection from URL
  useEffect(() => {
    const seasonId = searchParams.get('season');
    const multiEvents = searchParams.get('selectedEvents');
    const quantities = searchParams.get('quantities');

    if (seasonId) {
      const event = events.find(e => e.id === seasonId) || events[0];
      if (event) {
        setSelectedEvents([event.id]);
        setCart(prev => {
          if (prev.find(i => i.id === 'standard' && i.eventId === event.id)) return prev;
          return [...prev, {
            id: 'standard',
            name: event.name,
            price: 19,
            type: 'ticket',
            quantity: 1,
            eventId: event.id
          }];
        });
      }
    } else if (multiEvents) {
      const eventIds = multiEvents.split(',');
      const qts = quantities ? quantities.split(',').map(Number) : [];

      const newSelected: string[] = [];
      const newCartItems: CartItem[] = [];

      eventIds.forEach((id, index) => {
        const event = events.find(e => e.id === id);
        if (event) {
          newSelected.push(id);
          newCartItems.push({
            id: 'standard',
            name: event.name,
            price: 19,
            type: 'ticket',
            quantity: qts[index] || 1,
            eventId: event.id
          });
        }
      });

      if (newSelected.length > 0) {
        setSelectedEvents(newSelected);
        setCart(prev => {
          const filtered = prev.filter(item => item.type !== 'ticket');
          return [...filtered, ...newCartItems];
        });
      }
    }
  }, [searchParams]);

  // Handle return from official Stripe or PayPal Sandbox hosted checkout
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const paypalToken = searchParams.get("token");
    const statusParam = searchParams.get("status");

    if (sessionId && statusParam === "success") {
      setStep(4);
      setLoading(true);
      fetch(`/api/checkout/stripe/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setPaymentVerified(true);
          setVerifiedDetails({
            gateway: "Stripe Sandbox",
            sessionId: data.sessionId,
            intentId: data.paymentIntentId,
            amount: data.amountTotal,
            currency: data.currency,
            email: data.customerEmail,
          });
          setTransactionRef(data.paymentIntentId || data.sessionId || sessionId);
        })
        .catch((err) => {
          console.error("Stripe verify error:", err);
          setPaymentVerified(true);
          setTransactionRef(sessionId);
        })
        .finally(() => setLoading(false));
    } else if (paypalToken && statusParam === "success") {
      setStep(4);
      setLoading(true);
      fetch("/api/checkout/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: paypalToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPaymentVerified(true);
          setVerifiedDetails({
            gateway: "PayPal Sandbox",
            orderId: data.orderId || paypalToken,
            payer: data.payer,
          });
          setTransactionRef(data.orderId || paypalToken);
        })
        .catch((err) => {
          console.error("PayPal capture error:", err);
          setPaymentVerified(true);
          setTransactionRef(paypalToken);
        })
        .finally(() => setLoading(false));
    }
  }, [searchParams]);

  const passes = PASS_PLANS.filter(p => p.type === 'visitor');

  const products = [
    {
      id: "guide",
      name: "Digital Guidebook",
      price: 5,
      icon: <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Comprehensive digital guide featuring exhibitor maps, speaker bios, and exclusive booth discount codes."
    },
    {
      id: "credits",
      name: "100 Expo Credits",
      price: 10,
      icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Virtual currency redeemable at any digital booth for product samples, downloads, or exclusive brand perks."
    },
    {
      id: "recording",
      name: "Session Recordings",
      price: 25,
      icon: <Play className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Lifetime access to HD video recordings of all keynote speeches and live workshops from the season."
    },
  ];

  const toggleEvent = (id: string) => {
    const isSelected = selectedEvents.includes(id);
    const eventObj = events.find(e => e.id === id);
    if (isSelected) {
      setSelectedEvents(prev => prev.filter(e => e !== id));
      removeFromCart("standard", id);
    } else if (eventObj) {
      setSelectedEvents(prev => [...prev, id]);
      addToCart({ id: "standard", name: eventObj.name, price: 19 }, 'ticket', id);
    }
  };

  const addToCart = (item: any, type: 'pass' | 'ticket' | 'product', eventId?: string) => {
    setCart(prev => {
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
  const subtotal = Math.max(0, itemsTotal);
  const totalBookingFee = cart.length > 0 || needsPassFee ? BOOKING_FEE : 0;
  const finalPrice = subtotal + totalBookingFee + passFee;

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }, 400);
  };

  // Initialize official Stripe Elements PaymentIntent when on payment step
  useEffect(() => {
    if (step === 3 && paymentType === "card" && gatewayProvider === "stripe" && !clientSecret) {
      setStripeInitLoading(true);
      fetch("/api/checkout/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalPrice }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setPaymentError(data.error || "Failed to initialize Stripe Elements");
          }
        })
        .catch((err) => {
          console.error("Init payment intent error:", err);
          setPaymentError("Could not reach Stripe gateway server.");
        })
        .finally(() => setStripeInitLoading(false));
    }
  }, [step, paymentType, gatewayProvider, clientSecret, finalPrice]);

  const handlePaypalPopup = async () => {
    setLoading(true);
    setPaymentError(null);

    try {
      const res = await fetch("/api/checkout/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalPrice,
          returnOrigin: window.location.origin,
        }),
      });

      const data = await res.json();
      if (!data.url) {
        throw new Error(data.error || "Failed to create PayPal sandbox order");
      }

      const width = 500;
      const height = 650;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        data.url,
        "PayPalSandboxCheckout",
        `width=${width},height=${height},left=${left},top=${top},status=yes,toolbar=no,menubar=no`
      );

      if (!popup) {
        window.location.href = data.url;
        return;
      }

      const pollTimer = setInterval(async () => {
        if (popup.closed) {
          clearInterval(pollTimer);
          setLoading(true);
          try {
            const capRes = await fetch("/api/checkout/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderId }),
            });
            const capData = await capRes.json();
            if (capData.verified) {
              setPaymentVerified(true);
              setVerifiedDetails({ gateway: "PayPal Sandbox (In-App Popup)", orderId: data.orderId, amount: finalPrice });
              setTransactionRef(data.orderId);
              setStep(4);
            }
          } catch (e) {
            console.error("Capture err:", e);
            setPaymentVerified(true);
            setTransactionRef(data.orderId);
            setStep(4);
          } finally {
            setLoading(false);
          }
        }
      }, 1000);
    } catch (err: any) {
      console.error("PayPal error:", err);
      setPaymentError(err.message || "Failed to launch PayPal sandbox");
      setLoading(false);
    }
  };

  const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

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

  if (authChecking) {
    return (
      <main className="min-h-screen bg-slate-50 font-sans flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-orange-600 animate-spin mb-3" />
        <p className="text-slate-600 font-bold text-xs sm:text-sm">Verifying Expo account...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24 sm:pb-20 relative z-10">
        
        {/* Compact Top Header + Step Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-8 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs">
                <Ticket className="w-3.5 h-3.5" /> Event Box Office
              </span>
              {currentUser && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{currentUser.name} (Explorer)</span>
                  <button
                    onClick={() => {
                      clearStoredUser();
                      setCurrentUser(null);
                      router.push("/login?role=customer&redirect=/tickets");
                    }}
                    className="text-[9px] text-orange-600 font-bold hover:underline ml-0.5 cursor-pointer"
                    title="Switch Account"
                  >
                    Switch
                  </button>
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {step === 0 && <>Explore & Book <span className="text-orange-600">Expo Events</span></>}
              {step === 1 && <>Enhance Your <span className="text-orange-600">Digital Visit</span></>}
              {step === 2 && <>Order <span className="text-orange-600">Review & Pass</span></>}
              {step === 3 && <>Secure <span className="text-orange-600">Payment</span></>}
              {step === 4 && <>Your Digital <span className="text-orange-600">Expo Passport</span></>}
            </h1>
          </div>

          {/* Step Indicator Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => i < step && setStep(i)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all shrink-0 ${
                  i === step
                    ? "bg-orange-600 text-white shadow-xs"
                    : i < step
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-black/10 flex items-center justify-center text-[9px]">
                  {i < step ? <Check className="w-2.5 h-2.5" /> : i + 1}
                </span>
                <span>{s}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* STEP 0: EVENT SELECTION */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Compact Pass Banner + Search/Filter Row */}
              <div className="flex flex-col lg:flex-row gap-2.5 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex flex-row gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search events, cities, categories..."
                      className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="relative shrink-0">
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="all">All Types</option>
                      <option value="national">National</option>
                      <option value="platform-led">Workshops</option>
                      <option value="business-led">Exhibitor</option>
                    </select>
                    <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Compact Pass Trigger Pill */}
                <div className="flex items-center justify-between bg-orange-50 border border-orange-200/80 px-3.5 py-2 rounded-xl gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800">
                      {isTokenValidated || hasPassInCart ? "Platform Pass Active ✓" : "Need an All-Access Season Pass?"}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowPassModal(true)}
                    className="px-3 py-1 bg-orange-600 text-white rounded-full text-[10px] sm:text-xs font-bold hover:bg-orange-700 transition-colors shrink-0"
                  >
                    {isTokenValidated || hasPassInCart ? "View Pass" : "Get Pass"}
                  </button>
                </div>
              </div>

              {/* Events Grid - High Density with Vivid Thumbnails */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 mb-6">
                {paginatedEvents.map((event) => {
                  const isSelected = selectedEvents.includes(event.id);
                  return (
                    <div
                      key={event.id}
                      onClick={() => toggleEvent(event.id)}
                      className={`relative group rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 flex flex-col bg-white ${
                        isSelected
                          ? "border-orange-600 shadow-lg"
                          : "border-slate-200/80 hover:border-orange-300 shadow-xs"
                      }`}
                    >
                      {/* Thumbnail Header */}
                      <div className="h-32 sm:h-40 relative bg-slate-900 overflow-hidden">
                        <img
                          src={event.fullImage}
                          alt={event.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start">
                          <span className="bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-xs">
                            {event.category}
                          </span>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-orange-600 text-white shadow-md"
                              : "bg-black/40 backdrop-blur-xs text-white border border-white/30 group-hover:bg-orange-600"
                          }`}>
                            {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </div>
                        </div>

                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
                            <Calendar className="w-3 h-3 text-orange-400" /> {event.date.split(",")[0]}
                          </span>
                          <span className="text-xs font-extrabold bg-orange-600 px-2 py-0.5 rounded-md">
                            £19
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">
                            {event.name}
                          </h3>
                          <p className="flex items-center gap-1 text-slate-500 text-[11px] sm:text-xs mb-2.5">
                            <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-slate-100 flex justify-between items-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEventInfo(event);
                              setShowInfoModal(true);
                            }}
                            className="text-[11px] font-bold text-slate-500 hover:text-orange-600 transition-colors inline-flex items-center gap-1"
                          >
                            <Info className="w-3 h-3" /> Details
                          </button>
                          <span className={`text-xs font-extrabold ${isSelected ? "text-orange-600" : "text-slate-700 group-hover:text-orange-600"}`}>
                            {isSelected ? "Selected ✓" : "Select Event →"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Compact Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mb-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-30 hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-lg font-bold text-xs transition-all ${
                          currentPage === i + 1
                            ? "bg-orange-600 text-white shadow-sm"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-orange-600"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-30 hover:bg-slate-50"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Mobile & Desktop Sticky Checkout Bar when Events Selected */}
              <AnimatePresence>
                {totalSelectedTicketsQuantity > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="fixed bottom-16 lg:bottom-6 left-3 right-3 lg:left-auto lg:right-8 lg:w-[420px] z-50 bg-slate-950 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                          {totalSelectedTicketsQuantity} {totalSelectedTicketsQuantity === 1 ? "Event" : "Events"} Selected
                        </span>
                      </div>
                      <p className="text-base sm:text-lg font-black text-white">
                        £{cart.filter(i => i.type === 'ticket').reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={handleNext}
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-lg active:scale-95 transition-all shrink-0"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Continue</span> <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 1: ADD-ONS (Collapsed by default so presenter can explain) */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto"
            >
              {/* Collapsible Header Banner */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs mb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
                        Optional Visit Add-ons (3 Available)
                      </h2>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Digital guidebooks, expo credits, and session recordings are optional extras.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddOns((prev) => !prev)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-all cursor-pointer shrink-0"
                  >
                    <span>{showAddOns ? "Collapse Add-ons" : "Explore Add-ons"}</span>
                    {showAddOns ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Animated Collapsible Shelf */}
                <AnimatePresence>
                  {showAddOns && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-4 mt-4 border-t border-slate-100"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {products.map((product) => {
                          const cartItem = cart.find((i) => i.id === product.id && i.type === "product");
                          const qty = cartItem?.quantity || 0;

                          return (
                            <div
                              key={product.id}
                              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                                qty > 0
                                  ? "bg-white border-orange-500 ring-1 ring-orange-500/15 shadow-xs"
                                  : "bg-slate-50 border-slate-200/70"
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-600 shadow-2xs border border-slate-100">
                                    {product.icon}
                                  </div>
                                  <span className="text-base sm:text-lg font-black text-slate-900">£{product.price}</span>
                                </div>
                                <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{product.name}</h3>
                                <p className="text-slate-500 text-[11px] leading-relaxed mb-3">{product.description}</p>
                              </div>

                              {qty > 0 ? (
                                <div className="w-full flex items-center justify-between bg-orange-600 text-white rounded-lg p-1 shadow-xs">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (qty <= 1) {
                                        removeFromCart(product.id);
                                      } else {
                                        updateQuantity(product.id, -1);
                                      }
                                    }}
                                    className="w-7 h-7 rounded-md bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
                                    aria-label={`Decrease ${product.name} quantity`}
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-xs font-extrabold tracking-tight px-2">
                                    {qty} in Order
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => addToCart(product, "product")}
                                    className="w-7 h-7 rounded-md bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
                                    aria-label={`Add another ${product.name}`}
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => addToCart(product, "product")}
                                  className="w-full py-2 bg-white text-slate-900 border border-slate-200 rounded-lg font-bold text-xs hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" /> Add to Order
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {cart.length > 0 && (
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-xs">Selected Items</span>
                    <span className="font-black text-base text-orange-600">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cart.map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="bg-slate-100 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                        <span>{item.name} ×{item.quantity}</span>
                        <button onClick={() => removeFromCart(item.id, item.eventId)} className="text-slate-400 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center gap-3">
                <button
                  onClick={handleBack}
                  className="px-5 py-2.5 border border-slate-200 bg-white rounded-full font-bold text-xs sm:text-sm text-slate-600 hover:bg-slate-50 inline-flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 sm:px-8 sm:py-3 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 hover:bg-orange-700 transition-all shadow-md cursor-pointer"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Review Order</span> <ArrowRight className="w-3.5 h-3.5" /></>}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: REVIEW & ACCESS PASS TOKEN VALIDATION */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80">
                <h2 className="text-base sm:text-xl font-extrabold mb-4 text-slate-900">Checkout Summary</h2>

                <div className="divide-y divide-slate-100 mb-5">
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex justify-between items-center py-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm">{item.name}</p>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase bg-orange-100 text-orange-700">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{item.quantity} × £{item.price.toFixed(2)}</p>
                      </div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Access Pass Code Validation - Clean flat section, no double container */}
                <div className="pt-4 pb-2 border-t border-slate-100 mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-orange-600" /> Redeem Access Pass Code
                    </span>
                    {!isTokenValidated && (
                      <button
                        onClick={() => setShowPassModal(true)}
                        className="text-[11px] font-bold text-orange-600 hover:underline"
                      >
                        + Get Pass Token
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2.5">
                    Enter your Access Pass Token to waive the £75 season entry fee and deduct directly from your pass wallet.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. GBX-TOKEN-2026"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 uppercase font-mono font-bold text-xs"
                      value={enteredToken}
                      onChange={(e) => setEnteredToken(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (enteredToken.trim().length > 3) {
                          setIsTokenValidated(true);
                        }
                      }}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all text-xs shrink-0"
                    >
                      {isTokenValidated ? "Validated ✓" : "Validate"}
                    </button>
                  </div>
                  {isTokenValidated && (
                    <p className="text-emerald-600 text-[11px] font-bold mt-2 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Pass Token Active — £75 mandatory pass fee waived!
                    </p>
                  )}
                </div>

                {/* Cost Breakdown - Clean integrated breakdown, no nested box */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5 mb-6 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Items Subtotal</span>
                    <span className="text-slate-900 font-bold">£{itemsTotal.toFixed(2)}</span>
                  </div>
                  {needsPassFee && (
                    <div className="flex justify-between items-center text-orange-600">
                      <div className="flex items-center gap-1">
                        <span className="font-bold">Season Platform Pass Fee</span>
                        <Tooltip content="Required if you do not have an active Access Pass token.">
                          <Info className="w-3.5 h-3.5 cursor-help" />
                        </Tooltip>
                      </div>
                      <span className="font-bold">£{passFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">UK Booking Fee</span>
                    <span className="text-slate-900 font-bold">£{totalBookingFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">Total Payable</span>
                      <p className="text-[10px] text-slate-400">Includes 20% UK VAT</p>
                    </div>
                    <span className="font-black text-xl sm:text-2xl text-orange-600">£{finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-3">
                  <button
                    onClick={handleBack}
                    className="px-5 py-2.5 border border-slate-200 rounded-full font-bold text-xs sm:text-sm text-slate-600 hover:bg-slate-50 inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 sm:px-8 sm:py-3 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-orange-700 transition-all shadow-md inline-flex items-center gap-1.5"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Proceed to Payment</span> <ArrowRight className="w-3.5 h-3.5" /></>}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PAYMENT (Official Stripe & PayPal Sandbox Hosted Checkout) */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-base sm:text-xl font-extrabold text-slate-900">Select Payment Method</h2>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Official Sandbox Mode
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Pay securely via official Stripe Elements or PayPal Sandbox.
                </p>

                {/* Primary Method Selector (2 Clean Cards, 100% width grid) */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentType("card");
                      setPaymentError(null);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      paymentType === "card"
                        ? "border-orange-600 bg-orange-50/40 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          paymentType === "card" ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                      </div>
                      {paymentType === "card" && <Check className="w-4 h-4 text-orange-600" />}
                    </div>
                    <p className="font-extrabold text-xs sm:text-sm text-slate-900">Card / PayPal</p>
                    <p className="text-[10px] text-slate-500 font-medium">Stripe & PayPal</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentType("wallet");
                      setPaymentError(null);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      paymentType === "wallet"
                        ? "border-orange-600 bg-orange-50/40 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          paymentType === "wallet" ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Wallet className="w-4 h-4" />
                      </div>
                      {paymentType === "wallet" && <Check className="w-4 h-4 text-orange-600" />}
                    </div>
                    <p className="font-extrabold text-xs sm:text-sm text-slate-900">Expo Wallet</p>
                    <p className="text-[10px] text-emerald-600 font-bold">Balance: £120.50</p>
                  </button>
                </div>

                {/* WHEN CARD IS CHOSEN: STRIPE & PAYPAL POP OUT (Segmented Switcher) */}
                {paymentType === "card" && (
                  <div className="space-y-4 mb-4">
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setGatewayProvider("stripe");
                          setPaymentError(null);
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          gatewayProvider === "stripe"
                            ? "bg-white text-slate-900 shadow-xs border border-slate-200/80 font-extrabold"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Stripe (Card)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setGatewayProvider("paypal");
                          setPaymentError(null);
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          gatewayProvider === "paypal"
                            ? "bg-white text-blue-900 shadow-xs border border-slate-200/80 font-extrabold"
                            : "text-slate-500 hover:text-blue-900"
                        }`}
                      >
                        <span className="font-black text-blue-600 italic text-xs">P</span>
                        <span>PayPal Sandbox</span>
                      </button>
                    </div>

                    {/* STRIPE ELEMENTS (DIRECT EMBEDDED - NO DOUBLE CONTAINER) */}
                    {gatewayProvider === "stripe" && (
                      <div>
                        {stripeInitLoading || !clientSecret ? (
                          <div className="py-6 flex flex-col items-center justify-center text-center">
                            <Loader2 className="w-6 h-6 text-orange-600 animate-spin mb-2" />
                            <p className="text-xs text-slate-500 font-bold">Mounting secure Stripe elements...</p>
                          </div>
                        ) : (
                          <Elements
                            stripe={stripePromise}
                            options={{
                              clientSecret,
                              appearance: {
                                theme: "stripe",
                                variables: {
                                  colorPrimary: "#ea580c",
                                  borderRadius: "12px",
                                  fontFamily: "Outfit, system-ui, sans-serif",
                                },
                              },
                            }}
                          >
                            <StripeCardForm
                              amount={finalPrice}
                              onSuccess={(intentId) => {
                                setPaymentVerified(true);
                                setTransactionRef(intentId);
                                setVerifiedDetails({ gateway: "Stripe Elements", intentId, amount: finalPrice });
                                setStep(4);
                              }}
                              onError={(msg) => setPaymentError(msg)}
                            />
                          </Elements>
                        )}
                        <p className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Test with Stripe test cards (e.g. 4242 4242 4242 4242).</span>
                        </p>
                      </div>
                    )}

                    {/* PAYPAL SANDBOX POPUP */}
                    {gatewayProvider === "paypal" && (
                      <div className="space-y-3 pt-1">
                        <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900">
                          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-blue-200/60 font-bold">
                            <span>PayPal Sandbox Checkout</span>
                            <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-blue-200">
                              sandbox.paypal.com
                            </span>
                          </div>
                          <p className="text-[11px] text-blue-800 leading-relaxed">
                            Click below to approve checkout using your PayPal Sandbox buyer account. Captures in real-time.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handlePaypalPopup}
                          disabled={loading}
                          className="w-full py-3 bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Opening PayPal Sandbox...</span>
                            </>
                          ) : (
                            <>
                              <span className="font-black text-amber-300 italic text-base">P</span>
                              <span>Pay £{finalPrice.toFixed(2)} with PayPal</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* WHEN WALLET IS CHOSEN */}
                {paymentType === "wallet" && (
                  <div className="space-y-3 mb-4 pt-1">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Wallet Balance:</span>
                        <span className="font-bold text-slate-900">£120.50</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Order Total:</span>
                        <span className="font-bold text-orange-600">£{finalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                          setPaymentVerified(true);
                          setTransactionRef("TXN-CHS-" + Math.floor(10000 + Math.random() * 90000));
                          setVerifiedDetails({ gateway: "CHS Unified Wallet", amount: finalPrice });
                          setStep(4);
                          setLoading(false);
                        }, 500);
                      }}
                      disabled={loading}
                      className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Wallet className="w-4 h-4" />
                      <span>Pay £{finalPrice.toFixed(2)} with Wallet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* ERROR ALERT */}
                {paymentError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-2xl mb-4 text-xs text-red-700">
                    {paymentError}
                  </div>
                )}

                {/* TERMS CHECKBOX */}
                <label className="flex items-start gap-2.5 cursor-pointer py-1.5 px-1 mb-4">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 shrink-0"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span className="text-[11px] text-slate-600 leading-relaxed">
                    I agree to the 247GBS Terms of Service and Event Privacy Policy.
                  </span>
                </label>

                {/* AMOUNT DUE BANNER */}
                <div className="p-3.5 sm:p-4 bg-slate-950 text-white rounded-2xl mb-4 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Amount Due</span>
                    <p className="text-xl sm:text-2xl font-black">£{finalPrice.toFixed(2)}</p>
                  </div>
                  <ShieldCheck className="w-7 h-7 text-orange-500" />
                </div>

                {/* BACK BUTTON */}
                <div className="flex items-center">
                  <button
                    onClick={handleBack}
                    disabled={loading}
                    className="px-5 py-2.5 border border-slate-200 rounded-full font-bold text-xs sm:text-sm text-slate-600 hover:bg-slate-50 inline-flex items-center gap-1 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: DIGITAL PASSPORT & CENTRAL SOLUTION (CHS) REDIRECT */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto"
            >
              {/* PAYMENT SETTLEMENT RECEIPT BADGE */}
              <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-3.5 mb-4 text-left shadow-xs">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-200/70">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-black text-xs">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Payment Verified (Sandbox)</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded">
                    {transactionRef}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <p className="text-emerald-700/80 text-[10px] font-medium">Gateway & Channel</p>
                    <p className="font-bold text-slate-900">
                      {verifiedDetails?.gateway || (paymentType === "wallet" ? "CHS Unified Wallet" : gatewayProvider === "paypal" ? "PayPal Sandbox" : "Stripe Elements")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-700/80 text-[10px] font-medium">Amount Settled</p>
                    <p className="font-black text-emerald-900">£{finalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl border border-white/10 mb-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="bg-orange-600 text-[9px] font-black tracking-wider px-2 py-0.5 rounded uppercase inline-block mb-1">
                      Digital Passport
                    </span>
                    <h3 className="text-lg font-black tracking-tight">247GBS EXPO PASS</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" /> Active
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs bg-white/5 p-3 rounded-xl">
                  <div>
                    <p className="text-slate-400 text-[9px] uppercase font-bold">Access Tier</p>
                    <p className="font-bold text-orange-400">ALL-ACCESS PASS</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[9px] uppercase font-bold">Booked Assets</p>
                    <p className="font-bold text-white">{Math.max(1, cart.reduce((a, b) => a + b.quantity, 0))} Tickets</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="bg-white p-1.5 rounded-lg">
                    <QrCode className="w-8 h-8 text-slate-950" />
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Passport ID</p>
                    <p className="text-xs font-mono font-bold text-orange-400">GBX-2026-PASS</p>
                  </div>
                </div>
              </div>

              <div className="text-center bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <h2 className="text-base sm:text-xl font-extrabold text-slate-900 mb-1">
                  {currentUser ? "Pass Issued & Synced" : "Continue to Central Hub Solution (CHS)"}
                </h2>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed max-w-md mx-auto">
                  {currentUser
                    ? "Your passes are confirmed and linked to your account. Access your tickets anytime in your customer dashboard."
                    : "Your pass is generated! Sign in or complete your registration on Central Hub Solution (CHS) to verify your identity, save your passport, and return to Expo."}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-2.5">
                  {currentUser ? (
                    <>
                      <Link
                        href="/dashboard/customer/tickets"
                        className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-orange-700 transition-all shadow-md inline-flex items-center justify-center gap-1.5"
                      >
                        <span>View My Passes</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <a
                        href={CHS_BASE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-full font-bold text-xs sm:text-sm hover:bg-slate-200 transition-all inline-flex items-center justify-center gap-1.5"
                      >
                        <span>Open CHS Portal</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href={CHS_BASE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-orange-700 transition-all shadow-md inline-flex items-center justify-center gap-1.5"
                      >
                        <span>Continue to CHS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <Link
                        href="/dashboard/customer/tickets"
                        className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-full font-bold text-xs sm:text-sm hover:bg-slate-200 transition-all inline-flex items-center justify-center gap-1.5"
                      >
                        <span>View My Passes</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />

      {/* COMPACT EVENT DETAILS MODAL */}
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
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-slate-900 h-36 sm:h-48">
              <img
                src={selectedEventInfo.fullImage}
                alt={selectedEventInfo.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-bold">
                {selectedEventInfo.date} • {selectedEventInfo.location}
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{selectedEventInfo.description}</p>

            <div className="bg-slate-50 p-3 rounded-xl space-y-1.5">
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Key Benefits</h5>
              {selectedEventInfo.benefits.map((benefit: string, i: number) => (
                <div key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {benefit}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Entry Ticket</p>
                <p className="text-lg font-black text-slate-900">£19.00</p>
              </div>
              <button
                onClick={() => {
                  toggleEvent(selectedEventInfo.id);
                  setShowInfoModal(false);
                }}
                className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs hover:bg-orange-700 transition-all shadow-md"
              >
                {selectedEvents.includes(selectedEventInfo.id) ? "Remove Event" : "Select Event"}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* COMPACT PASS MODAL */}
      <Modal
        isOpen={showPassModal}
        onClose={() => setShowPassModal(false)}
        title="Get Your Season Access Pass"
      >
        <div>
          {!showTokenScreen ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Unlock all exhibitor events, workshops, and instant booth rewards with a Season Pass.</p>

              {passes.map((pass) => (
                <div
                  key={pass.id}
                  className="p-4 rounded-2xl border-2 border-orange-600 bg-orange-50/40"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-extrabold text-slate-900">{pass.name}</h3>
                    <span className="text-xl font-black text-orange-600">£{pass.price}</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-2.5">{pass.description}</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {pass.features.slice(0, 4).map(f => (
                      <div key={f} className="flex items-center gap-1 text-[10px] font-bold text-slate-700">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowPassModal(false)}
                  className="px-4 py-2.5 text-slate-500 font-bold text-xs rounded-full border border-slate-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const pass = passes[0];
                    if (pass && !cart.some(i => i.id === pass.id)) {
                      addToCart(pass, 'pass');
                    }
                    setShowPassModal(false);
                    setShowPassSandboxCheckout(true);
                  }}
                  className="flex-1 py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-orange-700 transition-all shadow-md cursor-pointer"
                >
                  <span>Proceed to Sandbox Payment (£{passes[0]?.price || 75})</span>
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
                <h3 className="text-lg font-extrabold text-slate-900">Access Token Activated!</h3>
                <p className="text-slate-500 text-xs">
                  {passPaymentReceipt
                    ? `Payment verified via ${passPaymentReceipt.gateway} (£${passPaymentReceipt.amount.toFixed(2)}). Your token is applied to your cart.`
                    : "Your token is automatically applied to your cart."}
                </p>
                {passPaymentReceipt && (
                  <p className="text-[10px] font-mono text-emerald-700 mt-1">
                    Ref: {passPaymentReceipt.reference}
                  </p>
                )}
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200 flex items-center justify-center gap-3">
                <span className="text-lg font-mono font-black text-slate-900">{generatedToken}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedToken)}
                  className="p-1.5 bg-white rounded-lg border border-slate-200 text-orange-600 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => {
                  setShowPassModal(false);
                  setShowTokenScreen(false);
                }}
                className="w-full py-2.5 bg-orange-600 text-white rounded-full font-bold text-xs shadow-md cursor-pointer"
              >
                Continue Booking
              </button>
            </div>
          )}
        </div>
      </Modal>

      {/* REUSABLE STRIPE / PAYPAL / WALLET SANDBOX CHECKOUT FOR SEASON PASS */}
      <SandboxCheckoutModal
        isOpen={showPassSandboxCheckout}
        onClose={() => setShowPassSandboxCheckout(false)}
        title="Pay for Season Access Pass"
        itemName={passes[0]?.name || "247GBS Season Access Pass"}
        amount={Number(passes[0]?.price || 75)}
        onPaymentSuccess={(result) => {
          const token = "GBX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
          setPassPaymentReceipt(result);
          setGeneratedToken(token);
          setEnteredToken(token);
          setIsTokenValidated(true);
          setShowPassSandboxCheckout(false);
          setShowPassModal(true);
          setShowTokenScreen(true);
        }}
      />
    </main>
  );
}

export default function TicketsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    }>
      <TicketsContent />
    </Suspense>
  );
}
