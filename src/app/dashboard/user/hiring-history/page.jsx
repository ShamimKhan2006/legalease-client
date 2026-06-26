"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js"; // ✅ এটা আগে missing ছিল
import { authClient } from "@/lib/auth-client";

export default function UserHiringHistory() {
  const { data: session } = authClient.useSession();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(`${process.env.NEXT_PUBLIC_URL}/user/hiring-history?email=${session.user.email}`)
        .then((res) => {
          setHistory(res.data);
          setLoading(false);
        });
    }
  }, [session]);


  const handlePayment = async (hire) => {
    try {
      setPaying(hire._id);

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/create-checkout-session`, {
        amount: hire.lawyerFee,
        hireId: hire._id,
        lawyerName: hire.lawyerName,
        userEmail: session.user.email,
      });

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (error) {
        console.error("Stripe redirect error:", error.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setPaying(null);
    }
  };

  const statusStyle = {
    accepted: "bg-green-950 border border-green-900 text-green-400",
    rejected: "bg-red-950 border border-red-900 text-red-400",
    pending: "bg-yellow-950 border border-yellow-900 text-yellow-400",
  };

  if (loading) {
    return (
      <div className="bg-[#0d0f14] rounded-2xl p-6 animate-pulse space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-[#1a1f28] rounded-xl" />
        ))}
      </div>
    );
  }

  const totalPaid = history
    .filter((h) => h.paymentStatus === "paid")
    .reduce((sum, h) => sum + h.lawyerFee, 0);

  return (
    <div className="bg-[#0d0f14] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[15px] font-bold text-[#e8eaf0] tracking-tight">Hiring history</h2>
          <p className="text-[11px] font-mono text-[#40485a] uppercase tracking-widest mt-0.5">
            Case engagement records
          </p>
        </div>
        <span className="font-mono text-[11px] text-[#2a5080] bg-[#0d1a2a] border border-[#0d2a45] rounded-md px-2.5 py-1">
          {history.length} records
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1a1f28]">
              {["Counsel", "Fee", "Date", "Status", "Action"].map((h) => (
                <th
                  key={h}
                  className="pb-3 px-3 text-[10px] font-semibold text-[#40485a] uppercase tracking-widest"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((hire) => (
              <tr
                key={hire._id}
                className="border-b border-[#13171f] last:border-none hover:bg-[#111520] transition-colors"
              >
                {/* Counsel */}
                <td className="px-3 py-3">
                  <div className="text-[13px] font-semibold text-[#e0e3ec]">{hire.lawyerName}</div>
                  <div className="text-[11px] text-[#506070] mt-0.5">{hire.specialization}</div>
                </td>

                {/* Fee */}
                <td className="px-3 py-3">
                  <span className="font-mono text-[12px] text-[#7ab0e0]">৳ {hire.lawyerFee.toLocaleString()}</span>
                </td>

                {/* Date */}
                <td className="px-3 py-3">
                  <span className="font-mono text-[11px] text-[#404858]">
                    {new Date(hire.hiringDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </td>

                {/* Status badge */}
                <td className="px-3 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      statusStyle[hire.status] ?? statusStyle.pending
                    }`}
                  >
                    {hire.status === "accepted" && "✓ "}
                    {hire.status === "rejected" && "✕ "}
                    {hire.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-3 py-3">
                  {hire.status === "accepted" && hire.paymentStatus === "unpaid" && (
                    <button
                      onClick={() => handlePayment(hire)}
                      disabled={paying === hire._id}
                      className="text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-lg border border-[#1a3a6a] bg-[#0a2050] text-[#5090d8] hover:bg-[#1a3a80] hover:text-[#80b8ff] hover:border-[#2a5090] disabled:opacity-50 transition-all"
                    >
                      {paying === hire._id ? "Redirecting…" : "Pay fee"}
                    </button>
                  )}
                  {hire.paymentStatus === "paid" && (
                    <span className="font-mono text-[11px] text-[#3daa60] tracking-wider">● Paid</span>
                  )}
                  {hire.status === "rejected" && (
                    <span className="text-[#2a3040] text-sm">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer total */}
      {totalPaid > 0 && (
        <div className="mt-4 pt-3 border-t border-[#13171f] flex justify-between items-center">
          <span className="text-[11px] text-[#40485a] uppercase tracking-widest">Total paid</span>
          <span className="font-mono text-[14px] font-bold text-[#7ab0e0]">
            ৳ {totalPaid.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}