import Link from "next/link";

export const metadata = {
  title: "Legal Services | LegalEase",
  description: "Explore common legal services available through LegalEase.",
};

export default function LegalServicesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
          Legal Services
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Find support for contracts, disputes, consultations, and more.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Whether you need a one-time consultation or ongoing legal guidance,
          LegalEase helps you find the right specialist quickly and confidently.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/lawyers"
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            View Lawyers
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:border-blue-500 hover:text-blue-400"
          >
            Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}
