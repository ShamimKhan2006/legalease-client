"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Send, Star, Loader2 } from "lucide-react";

export default function ReviewForm({ lawyerId }) {
  const { data: session } = authClient.useSession();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lawyerId,
        userName: session?.user?.name || "Anonymous",
        userEmail: session?.user?.email,
        comment,
        commentText: comment,
        rating,
      }),
    });

    setLoading(false);

    if (res.ok) {
      setSubmitted(true);
      setComment("");
      setRating(0);
      setTimeout(() => {
        setSubmitted(false);
        router.refresh();
      }, 2000);
    } else {
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="relative bg-slate-900 rounded-3xl p-6 border border-white/10 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-white font-bold text-lg tracking-tight">Leave a Review</h3>
        <p className="text-slate-500 text-xs mt-1">Your feedback helps others make better decisions</p>
      </div>

      {/* User info */}
      {session?.user && (
        <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-2xl border border-white/5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
            {session.user.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{session.user.name}</p>
            <p className="text-slate-500 text-xs">Posting as yourself</p>
          </div>
        </div>
      )}

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <p className="text-emerald-400 font-semibold">Review Posted!</p>
          <p className="text-slate-500 text-xs">Thank you for your feedback</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={22}
                    className={`transition-colors ${
                      star <= (hovered || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-700"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-amber-400 text-sm font-semibold self-center">
                  {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
                </span>
              )}
            </div>
          </div>

          {/* Textarea */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">Your Review</p>
            <textarea
              required
              placeholder="Share your experience with this lawyer..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all text-sm resize-none h-28"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <p className="text-slate-600 text-xs mt-1 text-right">{comment.length}/500</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !comment.trim()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-2xl transition-all duration-200 text-sm"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send size={15} />
                Post Review
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}