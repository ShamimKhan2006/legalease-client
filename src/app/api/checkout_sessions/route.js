// app/api/checkout_sessions/route.js

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await req.formData();
    const lawyerId = formData.get("lawyerId");
    const lawyerName = formData.get("lawyerName");
    const clientName = formData.get("clientName");
    const clientEmail = formData.get("clientEmail");
    const hourlyRate = parseFloat(formData.get("hourlyRate"));

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Hire ${lawyerName}`,
              description: "Legal consultation - 1 hour",
            },
            unit_amount: Math.round(hourlyRate * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        lawyerId,
        clientName,
        clientEmail,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/lawyers/${lawyerId}`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}