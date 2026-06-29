// components/HireButton.jsx
// ✅ form-এ hourlyRate যোগ করো

"use client";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function HireButton({ lawyerId, lawyerName, hourlyRate }) {
  const { data: session } = useSession();

  const handleHire = () => {
    if (!session || !session.user) {
      toast.error("Please login to hire!");
      return;
    }
    document.getElementById("payment-form").submit();
  };

  return (
    <>
      {/* Hidden inputs — form-এ এগুলো add করো */}
      <input type="hidden" name="lawyerName" value={lawyerName} form="payment-form" />
      <input type="hidden" name="hourlyRate" value={hourlyRate} form="payment-form" />

      <button
        type="button"
        onClick={handleHire}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
      >
        Hire Now — ${hourlyRate}/hr
      </button>
    </>
  );
}