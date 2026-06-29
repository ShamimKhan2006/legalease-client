



"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const STATS = [
  {
    key: "totalUsers",
    label: "Total users",
    icon: "👤",
    color: {
      card: "border-[rgba(55,138,221,0.15)] bg-[#0c1e35]",
      value: "text-[#378add]",
      icon: "bg-[#0c1e35] border border-[rgba(55,138,221,0.2)] text-[#378add]",
      glow: "shadow-[0_0_24px_rgba(55,138,221,0.08)]",
    },
  },
  {
    key: "totalLawyers",
    label: "Total lawyers",
    icon: "⚖️",
    color: {
      card: "border-[rgba(29,158,117,0.15)] bg-[#0e2820]",
      value: "text-[#1d9e75]",
      icon: "bg-[#0e2820] border border-[rgba(29,158,117,0.2)] text-[#1d9e75]",
      glow: "shadow-[0_0_24px_rgba(29,158,117,0.08)]",
    },
  },
  {
    key: "totalHires",
    label: "Total hires",
    icon: "🤝",
    color: {
      card: "border-[rgba(186,117,23,0.15)] bg-[#251a08]",
      value: "text-[#ba7517]",
      icon: "bg-[#251a08] border border-[rgba(186,117,23,0.2)] text-[#ba7517]",
      glow: "shadow-[0_0_24px_rgba(186,117,23,0.08)]",
    },
  },
  {
    key: "totalRevenue",
    label: "Total revenue",
    suffix: " USD",
    icon: "💰",
    color: {
      card: "border-[rgba(127,119,221,0.15)] bg-[#1e1d3a]",
      value: "text-[#7f77dd]",
      icon: "bg-[#1e1d3a] border border-[rgba(127,119,221,0.2)] text-[#7f77dd]",
      glow: "shadow-[0_0_24px_rgba(127,119,221,0.08)]",
    },
  },
];

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/admin/analytics`)
      .then((res) => setAnalytics(res.data));
  }, []);

  if (!analytics) {
    return (
       <div className="flex min-h-screen items-center justify-center">
      <div className="relative h-20 w-20">
        <span className="absolute inset-0 rounded-full border-[5px] border-indigo-500 border-t-transparent animate-spin"></span>

        <span
          className="absolute inset-3 rounded-full border-[5px] border-violet-500 border-b-transparent animate-spin"
          style={{
            animationDirection: "reverse",
            animationDuration: "1.2s",
          }}
        ></span>
      </div>
    </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-medium uppercase tracking-widest text-[#3d3d52] mb-1">
          Administration
        </p>
        <h2 className="text-xl font-medium text-[#e8e6ff]">Analytics overview</h2>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(({ key, label, icon, suffix, color }) => (
          <div
            key={key}
            className={`rounded-xl border p-5 flex flex-col gap-4 ${color.card} ${color.glow}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-widest text-[#6b6b80]">
                {label}
              </span>
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${color.icon}`}>
                {icon}
              </span>
            </div>
            <p className={`text-3xl font-semibold tabular-nums ${color.value}`}>
              {analytics[key]?.toLocaleString() ?? "—"}
              {suffix && (
                <span className="text-sm font-normal text-[#6b6b80] ml-1">{suffix}</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}