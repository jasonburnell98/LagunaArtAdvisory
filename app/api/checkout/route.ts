import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// ── Guard: ensure keys are configured ────────────────────────────────────────
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn(
    "[Stripe] STRIPE_SECRET_KEY is not set. " +
      "Copy .env.local.example to .env.local and add your keys."
  );
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(req: NextRequest) {
  // Keys not yet configured — return a helpful error
  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { id, title, artist, price, image, sn } = body as {
      id: string;
      title: string;
      artist: string;
      price: number; // in cents, e.g. 150000 = $1,500
      image: string;
      sn?: string;
    };

    if (!id || !title || !artist || !price) {
      return NextResponse.json(
        { error: "Missing required fields: id, title, artist, price" },
        { status: 400 }
      );
    }

    // Prefer the explicit env var; otherwise infer from the incoming request
    // so it works on any domain (localhost, Vercel, custom domain) automatically.
    const host = req.headers.get("host") ?? "localhost:3000";
    const protocol = host.startsWith("localhost") ? "http" : "https";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? `${protocol}://${host}`;

    // Build absolute image URL for Stripe (must be https in production)
    const imageUrl = image.startsWith("http")
      ? image
      : `${appUrl}${image}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: title,
              description: [
                artist,
                sn ? `Edition: ${sn}` : null,
              ]
                .filter(Boolean)
                .join(" · "),
              // Only include images in production (Stripe requires public URLs)
              ...(appUrl.startsWith("https")
                ? { images: [imageUrl] }
                : {}),
            },
          },
        },
      ],
      metadata: {
        artwork_id: id,
        artist,
        sn: sn ?? "",
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&artwork=${encodeURIComponent(title)}`,
      cancel_url: `${appUrl}/checkout/cancel?artwork=${encodeURIComponent(title)}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[Stripe Checkout Error]", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
