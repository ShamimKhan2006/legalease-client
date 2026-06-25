"use client";

const PaymentButton = ({ lawyer }) => {
  const handlePayment = async () => {
 const res = await fetch(
  `${process.env.NEXT_PUBLIC_URL}/checkout-sessions`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lawyer }),
  }
);

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-500 text-white px-5 py-2 rounded"
    >
      Hire Now
    </button>
  );
};

export default PaymentButton;