


import { redirect } from 'next/navigation'


import { stripe } from '../../lib/stripe'
 // অথবা অন্য কোনো আইকন লাইব্রেরি
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full text-center">
          
          {/* সাকসেস আইকন */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            We appreciate your business! A confirmation email will be sent to 
            <span className="font-semibold text-gray-800 block mt-1">{customerEmail}</span>
          </p>

          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mb-8">
            If you have any questions, please email us at{' '}
            <a href="mailto:orders@example.com" className="text-blue-600 font-medium hover:underline">
              orders@example.com
            </a>
          </div>

          <Link href="/" className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Back to Home
          </Link>
        </div>
      </section>
    )
  }
}



// import { useEffect } from "react";

// const SuccessPage = () => {
//   useEffect(() => {
//     fetch(
//       "http://localhost:8000/transactions",
//       {
//         method: "POST",

//         headers: {
//           "Content-Type":
//             "application/json",
//         },

//         body: JSON.stringify({
//           amount: 50,
//           status: "paid",
//           date: new Date(),
//         }),
//       }
//     );
//   }, []);

//   return (
//     <div>
//      < div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full text-center">
          
//           {/* সাকসেস আইকন */}
//           <div className="flex justify-center mb-6">
//             <div className="bg-green-100 p-4 rounded-full">
//               <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//               </svg>
//             </div>
//           </div>

//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          
//           <p className="text-gray-600 mb-6 leading-relaxed">
//             We appreciate your business! A confirmation email will be sent to 
//             <span className="font-semibold text-gray-800 block mt-1">{customerEmail}</span>
//           </p>

//           <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mb-8">
//             If you have any questions, please email us at{' '}
//             <a href="mailto:orders@example.com" className="text-blue-600 font-medium hover:underline">
//               orders@example.com
//             </a>
//           </div>

//           <Link href="/" className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
//             Back to Home
//           </Link>
//         </div>
//     </div>
//   );
// };

// export default SuccessPage;