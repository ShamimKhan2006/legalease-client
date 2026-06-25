"use client";
import { useSession } from "@/lib/auth-client";
// সেশন হুক ইম্পোর্ট করুন
import { toast } from "react-hot-toast";

export default function HireButton() {
  const { data: session } = useSession(); // সেশন ডাটা নিন

  const handleHire = () => {
    // সেশন না থাকলে বা ইউজার লগইন না থাকলে
    if (!session || !session.user) {
      toast.error("Please login to hire!");
      return; // ফর্ম সাবমিশন বন্ধ করুন
    }

    // সেশন থাকলে ফর্ম সাবমিট করুন
    document.getElementById("payment-form").submit();
  };

  return (
    <button 
      type="button" 
      onClick={handleHire}
      className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
    >
      Hire Now
    </button>
  );
}