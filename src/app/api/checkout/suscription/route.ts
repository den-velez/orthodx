import { INewPurchase } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: NextRequest) {
  const body = (await request.json()) as INewPurchase;
  let customer;
  let freeTrial = 0;

  const customerFound = await stripe.customers.search({
    query: `email:'${body.doctorEmail}'`,
  });

  if (customerFound.data.length > 0) {
    customer = customerFound.data[0];
  } else {
    customer = await stripe.customers.create({
      name: body.doctorEmail,
      email: body.doctorEmail,
    });
    freeTrial = 30;
  }

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    phone_number_collection: {
      enabled: true,
    },
    line_items: [
      {
        price: body.priceID,
        quantity: 1,
      },
    ],
    mode: "subscription",
    subscription_data: freeTrial
      ? {
          trial_period_days: freeTrial,
        }
      : {},
    success_url: `${process.env.NEXT_PUBLIC_URL}/patients`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/store`,
  });

  console.log(session);
  const url = session.url;

  if (url) {
    return NextResponse.json({ url });
  } else {
    return NextResponse.error();
  }
}
