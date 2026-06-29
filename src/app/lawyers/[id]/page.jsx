import ReviewForm from "@/components/ReviewForm";
import Image from "next/image";
import HireButton from "@/components/HireButton";
import { Star, Clock, DollarSign, Shield } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const LawyersDetailsPage = async ({ params }) => {
  const { id } = await params;

  if (["featured", "top"].includes(id)) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [lawyerRes, reviewsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_URL}/lawyers/${id}`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/${id}`, {
      cache: "no-store",
    }),
  ]);

  if (!lawyerRes.ok) {
    notFound();
  }

  const lawyer = await lawyerRes.json();

  if (!lawyer || !lawyer._id) {
    notFound();
  }

  const reviews = reviewsRes.ok ? await reviewsRes.json() : [];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950" />

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-indigo-600 rounded-3xl blur-2xl opacity-20 scale-110" />
              <Image
                width={180}
                height={180}
                src={lawyer.image}
                alt={lawyer.name}
                className="relative w-40 h-40 md:w-44 md:h-44 rounded-3xl object-cover ring-2 ring-white/10"
              />
              {/* Status dot */}
              <div
                className={`absolute -bottom-2 -right-2 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  lawyer.isBusy
                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${lawyer.isBusy ? "bg-red-400" : "bg-emerald-400"} animate-pulse`}
                />
                {lawyer.isBusy ? "Busy" : "Available"}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold mb-4">
                <Shield size={12} />
                Verified Lawyer
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                {lawyer.name}
              </h1>
              <p className="text-indigo-400 font-semibold text-lg mt-2">
                {lawyer.specialization}
              </p>

              <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                  <DollarSign size={14} className="text-indigo-400" />
                  <span className="text-white text-sm font-bold">
                    ${lawyer.hourlyRate}/hr
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                  <Clock size={14} className="text-indigo-400" />
                  <span className="text-white text-sm font-bold">
                    5+ Years Exp.
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-white text-sm font-bold">
                    4.9 ({reviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Hire Button */}
            <div className="shrink-0 w-full md:w-48">
              <form id="payment-form" action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="lawyerId" value={lawyer._id} />
                <input type="hidden" name="lawyerName" value={lawyer.name} />
                <input
                  type="hidden"
                  name="clientName"
                  value={session?.user?.name}
                />
                <input
                  type="hidden"
                  name="clientEmail"
                  value={session?.user?.email}
                />
                <input
                  type="hidden"
                  name="hourlyRate"
                  value={lawyer.hourlyRate}
                />
                <HireButton
                  lawyerId={lawyer._id}
                  lawyerName={lawyer.name}
                  hourlyRate={lawyer.hourlyRate}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left — About + Reviews */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              <p className="text-slate-400 leading-relaxed text-sm">
                {lawyer.description ||
                  "Experienced lawyer with strong expertise in legal advisory, corporate law, and client representation."}
              </p>
            </div>

            {/* Reviews */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Client Feedback
                </h2>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest">
                  {reviews.length} reviews
                </span>
              </div>

              {reviews.length === 0 ? (
                <div className="flex flex-col items-center py-10 gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Star size={20} className="text-slate-600" />
                  </div>
                  <p className="text-slate-500 text-sm">
                    No reviews yet. Be the first!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((r) => (
                    <div
                      key={r._id}
                      className="p-5 bg-white/3 border border-white/8 rounded-2xl hover:border-white/15 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">
                            {r.userName?.[0]?.toUpperCase() || "U"}
                          </div>
                          <p className="text-white text-sm font-semibold">
                            {r.userName}
                          </p>
                        </div>
                        {r.rating && (
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={
                                  i < r.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-slate-700"
                                }
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed ml-11">
                        {r.comment || r.commentText}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — Review Form */}
          <div className="md:col-span-1">
            <div className="sticky top-6">
              <ReviewForm lawyerId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyersDetailsPage;
