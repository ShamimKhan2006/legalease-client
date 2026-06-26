"use client";
import { useSession } from "@/lib/auth-client";

import { toast } from "react-hot-toast";

export default function HireButton() {
  const { data: session } = useSession(); 

  const handleHire = () => {
  
    if (!session || !session.user) {
      toast.error("Please login to hire!");
      return; 
    }

  
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