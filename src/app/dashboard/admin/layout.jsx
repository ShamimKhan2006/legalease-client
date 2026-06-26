"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AdminLayout({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (session.user.role !== "admin") {
      router.push("/");
    }
  }, [session, isPending, router]);

  // লোড হচ্ছে
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400 text-sm animate-pulse">Checking access...</p>
      </div>
    );
  }

  // admin না হলে কিছু দেখাবে না (redirect হচ্ছে)
  if (!session || session.user.role !== "admin") return null;

  // admin হলে page দেখাবে
  return <>{children}</>;
}