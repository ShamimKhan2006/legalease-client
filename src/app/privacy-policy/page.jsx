import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | LegalEase",
  description: "Read how LegalEase handles your information and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
          Privacy Policy
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          We protect your data with clear policies and secure practices.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          LegalEase uses your data only to provide safe account access, improve
          our services, and support your legal hiring experience.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}
