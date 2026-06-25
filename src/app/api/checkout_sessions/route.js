import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1TlOgW1EiTDozZdWePFQntZF",
          quantity: 1,
        },
      ],
      //  line_items: [
      //     {
      //       price_data: {
      //         currency: "usd",

      //         product_data: {
      //           name: lawyer.name,
      //           description:
      //             lawyer.specialization,
      //         },

      //         unit_amount:
      //           lawyer.hourlyRate * 100,
      //       },

      //       quantity: 1,
      //     },
      //   ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}


// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   try {
//     const { lawyer } = await req.json();

//     const session =
//       await stripe.checkout.sessions.create({
//         mode: "payment",

//         line_items: [
//           {
//             price_data: {
//               currency: "usd",

//               product_data: {
//                 name: lawyer.name,
//                 description:
//                   lawyer.specialization,
//               },

//               unit_amount:
//                 lawyer.hourlyRate * 100,
//             },

//             quantity: 1,
//           },
//         ],

//         success_url:
//           "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",

//         cancel_url:
//           "http://localhost:3000/cancel",
//       });

//     return NextResponse.json({
//       url: session.url,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error.message,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }