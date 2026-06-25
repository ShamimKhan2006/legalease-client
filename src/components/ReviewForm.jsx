// "use client";
// import { useState } from "react";

// export default function ReviewForm({ lawyerId }) {
//   const [comment, setComment] = useState("");
//   const [userName, setUserName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ lawyerId, userName, comment }),
//     });

//     setLoading(false);

//     if (res.ok) {
//       alert("Feedback submitted successfully!");
//       setComment("");
//       setUserName("");
//     } else {
//       alert("Failed to submit feedback.");
//     }
//   };

//   return (
//     <div className="mt-8 max-w-2xl mx-auto">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
//       >
//         <h3 className="text-2xl font-bold text-gray-900 mb-6">Share your experience</h3>
        
//         <div className="space-y-4">
//           <input
//             required
//             type="text"
//             placeholder="Your Name"
//             className="w-full p-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
          
//           <textarea
//             required
//             placeholder="What was your experience like?"
//             className="w-full p-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all h-32 resize-none"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//         </div>

//         <button
//           disabled={loading}
//           type="submit"
//           className="w-full mt-6 bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
//         >
//           {loading ? "Submitting..." : "Post Review"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewForm({ lawyerId }) {
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lawyerId, userName, comment }),
    });

    setLoading(false);

    if (res.ok) {
      setComment("");
      setUserName("");
      router.refresh(); // এটি পেজ রিফ্রেশ করে নতুন কমেন্ট দেখাবে
    } else {
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a Feedback</h3>
        
        <div className="space-y-4">
          <input
            required
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          
          <textarea
            required
            placeholder="Write your feedback here..."
            className="w-full p-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all h-32 resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full mt-6 bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all"
        >
          {loading ? "Submitting..." : "Post Review"}
        </button>
      </form>
    </div>
  );
}