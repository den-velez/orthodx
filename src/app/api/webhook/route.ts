import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { applyPurchase } from "@/lib/actions/actions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature") || "";

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      if (
        session.payment_status === "unpaid" &&
        session.payment_method_types.includes("oxxo")
      ) {
        if (session.payment_intent) {
          const paymentIntent = session.payment_intent as string;
          await stripe.paymentIntents.update(paymentIntent, {
            metadata: session.metadata,
          });
        }
      }

      if (session.payment_status === "paid") {
        const productId =
          session.metadata && (session.metadata.productId as string);
        const email =
          session.metadata && (session.metadata.doctorEmail as string);

        if (!productId || !email) {
          return NextResponse.json("error applying Purchase", { status: 400 });
        }

        const res = await applyPurchase(productId, email);
        console.log(res);
      }

      break;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;

      if (paymentIntent.payment_method_types.includes("oxxo")) {
        const productId =
          paymentIntent.metadata &&
          (paymentIntent.metadata.productId as string);
        const email =
          paymentIntent.metadata &&
          (paymentIntent.metadata.doctorEmail as string);

        if (!productId || !email) {
          return NextResponse.json("error applying Purchase", { status: 400 });
        }

        const res = await applyPurchase(productId, email);
        console.log(res);
      }
      break;
    default:
      console.log(`Unknow event ${event.type}`);
  }

  return NextResponse.json(null, { status: 200 });
}
