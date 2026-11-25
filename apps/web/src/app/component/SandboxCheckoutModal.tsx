"use client";

import { useState, useEffect } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  CreditCard,
  Wallet,
  Loader2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import Modal from "@/app/component/Modal";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export interface SandboxPaymentResult {
  reference: string;
  gateway: string;
  amount: number;
}

interface SandboxCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  itemName: string;
  amount: number;
  onPaymentSuccess: (result: SandboxPaymentResult) => void;
}

function EmbeddedStripeForm({
  amount,
  onSuccess,
  onError
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
        redirect: "if_required"
      });

      if (error) {
        onError(error.message || "Payment authorization failed.");
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
      <div className="relative min-h-[150px] flex flex-col justify-center">
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 z-10 py-6">
            <Loader2 className="w-5 h-5 text-orange-600 animate-spin mb-2" />
            <p className="text-slate-500 font-medium text-xs">
              Loading Stripe Sandbox card form...
            </p>
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

export default function SandboxCheckoutModal({
  isOpen,
  onClose,
  title = "Complete Payment",
  itemName,
  amount,
  onPaymentSuccess
}: SandboxCheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | "wallet">("stripe");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [processingExternal, setProcessingExternal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Reset state whenever modal opens/closes or amount changes
  useEffect(() => {
    if (!isOpen) {
      setClientSecret(null);
      setErrorMsg(null);
      setProcessingExternal(false);
      return;
    }

    if (paymentMethod === "stripe" && !clientSecret && amount > 0) {
      setLoadingIntent(true);
      setErrorMsg(null);
      fetch("/api/checkout/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          description: itemName
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setErrorMsg(data.error || "Failed to initialize Stripe Sandbox.");
          }
        })
        .catch(() => {
          setErrorMsg("Could not reach Stripe Sandbox server.");
        })
        .finally(() => {
          setLoadingIntent(false);
        });
    }
  }, [isOpen, paymentMethod, amount, itemName, clientSecret]);

  const handlePayPalCheckout = async () => {
    setProcessingExternal(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/checkout/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          description: itemName,
          returnUrl: window.location.href,
          cancelUrl: window.location.href
        })
      });
      const data = await res.json();
      if (!data.approveUrl || !data.orderId) {
        setErrorMsg(data.error || "Failed to create PayPal Sandbox order.");
        setProcessingExternal(false);
        return;
      }

      const popup = window.open(
        data.approveUrl,
        "PayPalSandboxCheckout",
        "width=520,height=680,scrollbars=yes"
      );

      if (!popup) {
        setErrorMsg("Popup blocked. Please allow popups for PayPal Sandbox checkout.");
        setProcessingExternal(false);
        return;
      }

      const timer = setInterval(async () => {
        if (popup.closed) {
          clearInterval(timer);
          try {
            const capRes = await fetch("/api/checkout/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderId })
            });
            const capData = await capRes.json();
            if (capRes.ok && capData.status === "COMPLETED") {
              onPaymentSuccess({
                reference: capData.transactionId || data.orderId,
                gateway: "PayPal Sandbox",
                amount
              });
            } else {
              setErrorMsg(capData.error || "PayPal payment was not completed.");
            }
          } catch {
            setErrorMsg("Could not verify PayPal Sandbox capture.");
          } finally {
            setProcessingExternal(false);
          }
        }
      }, 600);
    } catch {
      setErrorMsg("Could not reach PayPal Sandbox server.");
      setProcessingExternal(false);
    }
  };

  const handleWalletCheckout = () => {
    setProcessingExternal(true);
    setErrorMsg(null);
    setTimeout(() => {
      const ref = "CHS-WAL-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      setProcessingExternal(false);
      onPaymentSuccess({
        reference: ref,
        gateway: "CHS Unified Wallet",
        amount
      });
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="md">
      <div className="space-y-4">
        {/* Order Summary Strip */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Item
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
              {itemName}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Due
            </p>
            <p className="text-base sm:text-lg font-black text-orange-600">
              £{amount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Gateway Selector Tabs */}
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: "stripe", label: "Stripe Card", icon: CreditCard },
              { id: "paypal", label: "PayPal", icon: ExternalLink },
              { id: "wallet", label: "CHS Wallet", icon: Wallet }
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setPaymentMethod(id);
                setErrorMsg(null);
              }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                paymentMethod === id
                  ? "border-orange-600 bg-orange-50 text-orange-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Stripe Sandbox Embedded Elements */}
        {paymentMethod === "stripe" && (
          <div className="space-y-3">
            {loadingIntent ? (
              <div className="py-10 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 text-orange-600 animate-spin" />
                <p className="text-xs font-medium text-slate-500">
                  Connecting to Stripe Sandbox...
                </p>
              </div>
            ) : clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: { colorPrimary: "#ea580c", borderRadius: "12px" }
                  }
                }}
              >
                <EmbeddedStripeForm
                  amount={amount}
                  onSuccess={(intentId) =>
                    onPaymentSuccess({
                      reference: intentId,
                      gateway: "Stripe Sandbox",
                      amount
                    })
                  }
                  onError={(msg) => setErrorMsg(msg || null)}
                />
              </Elements>
            ) : (
              <div className="py-6 text-center space-y-2">
                <p className="text-xs text-slate-500">
                  Unable to load Stripe Sandbox session.
                </p>
                <button
                  type="button"
                  onClick={() => setClientSecret(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        )}

        {/* PayPal Sandbox */}
        {paymentMethod === "paypal" && (
          <div className="space-y-3 pt-1">
            <p className="text-xs text-slate-600 leading-relaxed">
              Approve this transaction using your PayPal Sandbox buyer account. Payment captures in real time.
            </p>
            <button
              type="button"
              onClick={handlePayPalCheckout}
              disabled={processingExternal}
              className="w-full py-3 bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {processingExternal ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Waiting for PayPal Sandbox...</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  <span>Pay £{amount.toFixed(2)} with PayPal</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* CHS Unified Wallet */}
        {paymentMethod === "wallet" && (
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-600">CHS Wallet Balance</span>
              <span className="font-black text-slate-900">£1,250.00</span>
            </div>
            <button
              type="button"
              onClick={handleWalletCheckout}
              disabled={processingExternal}
              className="w-full py-3 bg-slate-950 hover:bg-orange-600 text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {processingExternal ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authorizing Wallet...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span>Pay £{amount.toFixed(2)} with Wallet</span>
                </>
              )}
            </button>
          </div>
        )}

        <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>256-bit encrypted Sandbox Demo Checkout (Stripe test card: 4242 4242 4242 4242)</span>
        </p>
      </div>
    </Modal>
  );
}
