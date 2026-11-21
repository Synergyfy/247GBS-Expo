import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "";
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";
const PAYPAL_BASE_URL = process.env.PAYPAL_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PayPal Auth Failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, returnOrigin } = body;

    const origin = returnOrigin || req.headers.get("origin") || "http://localhost:3030";
    const numericAmount = (Number(amount) || 19).toFixed(2);

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      // Graceful fallback for preview/sandbox deployment where PayPal keys are not yet added
      const mockOrderId = `PAYPAL_MOCK_${Date.now()}`;
      return NextResponse.json({
        url: `${origin}/tickets?step=4&gateway=paypal&status=success&orderId=${mockOrderId}`,
        orderId: mockOrderId,
        status: "APPROVED",
        sandbox: true,
      });
    }

    const accessToken = await getPayPalAccessToken();

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: "247GBS_EXPO_" + Date.now(),
          description: "247GBS Digital Expo - Event Admission & Season Pass",
          amount: {
            currency_code: "GBP",
            value: numericAmount,
          },
        },
      ],
      application_context: {
        brand_name: "247GBS Digital Expo",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `${origin}/tickets?step=4&gateway=paypal&status=success`,
        cancel_url: `${origin}/tickets?step=3&gateway=paypal&status=cancelled`,
      },
    };

    const orderRes = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    if (!orderRes.ok) {
      const errText = await orderRes.text();
      throw new Error(`PayPal Order Creation Failed: ${orderRes.status} - ${errText}`);
    }

    const orderData = await orderRes.json();
    const approveLink = orderData.links?.find((l: any) => l.rel === "approve");

    if (!approveLink?.href) {
      throw new Error("No PayPal approval URL returned by Sandbox API");
    }

    return NextResponse.json({
      url: approveLink.href,
      orderId: orderData.id,
      status: orderData.status,
    });
  } catch (error: any) {
    console.error("PayPal create-order error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create PayPal sandbox order" },
      { status: 500 }
    );
  }
}
