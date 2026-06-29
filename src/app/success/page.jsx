// app/success/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    // ✅ relative path — Next.js নিজের API route
    fetch(`/api/confirm-hire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStatus("success");
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4 bg-[#050505]">
        <Loader2 className="text-blue-400 w-10 h-10 animate-spin" />
        <p className="text-gray-400">Confirming your payment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4 bg-[#050505]">
        <p className="text-red-400 text-lg">Something went wrong.</p>
        <Link href="/lawyers" className="text-blue-400 hover:underline">
          Back to Lawyers
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#050505]">
      <div className="text-center p-12 bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-500/10 rounded-full border border-green-500/20">
            <CheckCircle2 className="text-green-400 w-12 h-12" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-white mb-3">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">
          Your hire request has been sent to the lawyer. They will respond shortly.
        </p>
        <Link
          href="/lawyers"
          className="inline-block px-8 py-3 rounded-2xl bg-blue-500/15 border border-blue-500/50 text-blue-400 font-semibold hover:bg-blue-500/25 transition-all"
        >
          Browse More Lawyers
        </Link>
      </div>
    </div>
  );
}