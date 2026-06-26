
"use client";

import { useSession } from "@/lib/auth-client";
import { Scale, TrendingUp, Clock, CheckCircle, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;

  const stats = {
    user: [
      { label: "Total Hirings", value: "12", change: "+2 this month", icon: TrendingUp, color: "indigo" },
      { label: "Pending", value: "03", change: "Awaiting response", icon: Clock, color: "amber" },
      { label: "Completed", value: "09", change: "Successfully closed", icon: CheckCircle, color: "emerald" },
    ],
    lawyer: [
      { label: "Total Requests", value: "34", change: "+5 this week", icon: TrendingUp, color: "indigo" },
      { label: "Pending", value: "07", change: "Needs attention", icon: Clock, color: "amber" },
      { label: "Accepted", value: "27", change: "Active cases", icon: CheckCircle, color: "emerald" },
    ],
    admin: [
      { label: "Total Users", value: "248", change: "+12 this week", icon: TrendingUp, color: "indigo" },
      { label: "Lawyers", value: "36", change: "Verified profiles", icon: CheckCircle, color: "emerald" },
      { label: "Transactions", value: "89", change: "This month", icon: Zap, color: "amber" },
    ],
  };

  const quickLinks = {
    user: [
      { label: "View Hiring History", href: "/dashboard/user/hiring-history" },
      { label: "Update Profile", href: "/dashboard/user/update-profile" },
      { label: "My Comments", href: "/dashboard/user/comments" },
    ],
    lawyer: [
      { label: "View Hiring Requests", href: "/dashboard/lawyer/hiring-history" },
      { label: "Manage Profile", href: "/dashboard/lawyer/manage-profile" },
    ],
    admin: [
      { label: "Manage Users", href: "/dashboard/admin/manage-users" },
      { label: "All Transactions", href: "/dashboard/admin/all-transactions" },
      { label: "Analytics", href: "/dashboard/admin/analytics" },
    ],
  };

  const colorMap = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const currentStats = stats[role] || stats.user;
  const currentLinks = quickLinks[role] || quickLinks.user;

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">

      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
              <Scale size={12} className="text-white" />
            </div>
            <span className="text-slate-500 text-sm font-medium">LegalEase Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Welcome back, <span className="text-indigo-400">{user?.name?.split(" ")[0] || "User"}</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Here's what's happening in your workspace today.
          </p>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
          <Image
            width={40}
            height={40}
            src={user?.image && user.image.startsWith("http") ? user.image : "/default-avatar.png"}
            alt="avatar"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <p className="text-white text-sm font-semibold">{user?.name}</p>
            <span className="text-xs px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full capitalize">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {currentStats.map((stat, i) => (
          <div
            key={i}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden group hover:border-white/20 transition-all duration-300"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold mb-4 ${colorMap[stat.color]}`}>
                <stat.icon size={12} />
                {stat.label}
              </div>
              <p className="text-5xl font-black text-white tracking-tighter">{stat.value}</p>
              <p className="text-slate-500 text-xs mt-2">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Quick Actions */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-1">Quick Actions</h3>
          <p className="text-slate-500 text-xs mb-5">Jump to where you need to go</p>
          <div className="space-y-2">
            {currentLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200 group"
              >
                {link.label}
                <ArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="relative bg-indigo-600 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full opacity-30" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-700 rounded-full opacity-40" />

          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <Zap size={18} className="text-white" />
            </div>
            <h3 className="text-white font-black text-xl leading-tight">
              Need Legal<br />Assistance?
            </h3>
            <p className="text-indigo-200 text-sm mt-2">
              Browse our verified lawyers and get expert help fast.
            </p>
          </div>

          <Link
            href="/lawyers"
            className="relative mt-6 inline-flex items-center gap-2 bg-white text-indigo-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors w-fit"
          >
            Browse Lawyers
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
