"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

export default function UserHiringHistory() {
  const { data: session } = authClient.useSession();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      axios.get(`http://localhost:8000/user/hiring-history?email=${session.user.email}`)
        .then(res => {
          setHistory(res.data);
          setLoading(false);
        });
    }
  }, [session]);

  const handlePayment = async (hire) => {
  try {
    // ১. ব্যাকএন্ড থেকে clientSecret আনা
    const { data } = await axios.post("http://localhost:8000/create-payment-intent", {
      amount: hire.lawyerFee, // পেমেন্ট অ্যামাউন্ট
      hireId: hire._id
    });

    // ২. স্ট্রাইপ লোড করে পেমেন্ট মডাল ওপেন করা
    const stripe = await loadStripe("YOUR_PUBLISHABLE_KEY");
    
    // ৩. পেমেন্ট কনফার্মেশন প্রসেস (Stripe Elements ব্যবহার করে)
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement), // কার্ড এলিমেন্ট
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        alert("Payment Successful!");
        // পেমেন্ট সফল হলে ব্যাকএন্ডে স্ট্যাটাস 'paid' হিসেবে আপডেট করুন
      }
    }
  } catch (err) {
    console.error("Payment error:", err);
  }
};

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-10 bg-gray-300 w-full rounded"></div></div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Hiring History</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">Lawyer Name</th>
            <th className="p-3">Specialization</th>
            <th className="p-3">Fee</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((hire) => (
            <tr key={hire._id} className="border-b">
              <td className="p-3">{hire.lawyerName}</td>
              <td className="p-3">{hire.specialization}</td>
              <td className="p-3">{hire.lawyerFee} BDT</td>
              <td className="p-3">{new Date(hire.hiringDate).toLocaleDateString()}</td>
              <td className="p-3 capitalize">
                <span className={`px-2 py-1 rounded text-xs ${hire.status === 'accepted' ? 'bg-green-100 text-green-700' : hire.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {hire.status}
                </span>
              </td>
              <td className="p-3">
                {hire.status === "accepted" && hire.paymentStatus === "unpaid" && (
                  <button onClick={() => handlePayment(hire)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Pay Fee
                  </button>
                )}
                {hire.paymentStatus === "paid" && <span className="text-green-600 font-semibold text-sm">Paid</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}