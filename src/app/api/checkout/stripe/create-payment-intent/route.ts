import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

function getStripe(): Stripe | null {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) return null;
  return new Stripe(stripeSecretKey, {
    apiVersion: "2025-02-24.acacia" as any,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount } = body;
    const amountInPence = Math.round((Number(amount) || 19) * 100);

    const stripe = getStripe();
    if (!stripe) {
      // Graceful fallback for sandbox/preview deployments where STRIPE_SECRET_KEY is not yet added in Vercel
      return NextResponse.json({
        clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
        id: `pi_mock_${Date.now()}`,
        sandbox: true,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPence,
      currency: "gbp",
      automatic_payment_methods: { enabled: true },
      metadata: {
        platform: "247gbs-expo",
        environment: "sandbox",
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error: any) {
    console.error("Stripe create-payment-intent error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create Stripe PaymentIntent" },
      { status: 500 }
    );
  }
}
