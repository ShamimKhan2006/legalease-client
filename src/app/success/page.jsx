// Success page
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const hireId = searchParams.get("hireId"); // URL থেকে hireId নিন
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hireId) {
      // hiring status "paid" করুন
      fetch(`http://localhost:8000/lawyer/hiring-status/${hireId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      })
        .then((res) => res.json())
        .then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [hireId]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <p>Processing your payment...</p>
      ) : (
        <div className="text-center p-10 bg-green-50 rounded-lg">
          <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
          <p>Your booking has been confirmed.</p>
        </div>
      )}
    </div>
  );
}