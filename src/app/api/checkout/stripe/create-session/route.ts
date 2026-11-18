import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia" as any,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, items, returnOrigin } = body;

    const origin = returnOrigin || req.headers.get("origin") || "http://localhost:3030";
    const amountInPence = Math.round((Number(amount) || 19) * 100);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "247GBS Digital Expo - Event Admission & Season Pass",
              description: items && items.length > 0
                ? items.map((i: any) => `${i.quantity}x ${i.name}`).join(", ")
                : "Standard Season Admission",
              images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80"],
            },
            unit_amount: amountInPence,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/tickets?step=4&session_id={CHECKOUT_SESSION_ID}&gateway=stripe&status=success`,
      cancel_url: `${origin}/tickets?step=3&gateway=stripe&status=cancelled`,
      metadata: {
        platform: "247gbs-expo",
        environment: "sandbox",
      },
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error("Stripe create-session error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create Stripe Checkout session" },
      { status: 500 }
    );
  }
}
