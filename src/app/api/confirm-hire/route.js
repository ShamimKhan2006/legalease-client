// app/api/confirm-hire/route.js

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { sessionId } = await req.json();

    // Stripe থেকে session verify করো
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { success: false, error: "Payment not completed" },
        { status: 400 }
      );
    }

    const { lawyerId, clientName, clientEmail } = session.metadata;

    // ✅ Backend /hirings route-এ lawyerId পাঠাও
    // Backend নিজেই lawyer.email বের করে lawyerEmail set করবে
    const hiringRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/hirings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lawyerId,
        clientName,
        clientEmail,
        userEmail: clientEmail,   // backend-এ userEmail field আছে
        status: "pending",
        stripeSessionId: sessionId,
      }),
    });

    const hiring = await hiringRes.json();

    return NextResponse.json({ success: true, hireId: hiring.insertedId });
  } catch (err) {
    console.error("confirm-hire error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}