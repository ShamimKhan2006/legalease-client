"use client";

import { useSession, authClient } from "@/lib/auth-client";
import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Scale } from "lucide-react";
import Image from "next/image";

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const role = session?.user?.role;
  const user = session?.user;

  const navItems = [
    { icon: House, label: "Dashboard Home", href: "/dashboard" },
  ];

  if (role === "user") {
    navItems.push(
      { icon: Bell, label: "Hiring History", href: "/dashboard/user/hiring-history" },
      { icon: Person, label: "Update Profile", href: "/dashboard/user/update-profile" },
      { icon: Envelope, label: "Comments", href: "/dashboard/user/comments" }
    );
  }

  if (role === "lawyer") {
    navItems.push(
      { icon: Bell, label: "Hiring Requests", href: "/dashboard/lawyer/hiring-history" },
      { icon: Gear, label: "Manage Profile", href: "/dashboard/lawyer/manage-profile" }
    );
  }

  if (role === "admin") {
    navItems.push(
      { icon: Person, label: "Manage Users", href: "/dashboard/admin/manage-users" },
      { icon: Envelope, label: "Transactions", href: "/dashboard/admin/all-transactions" },
      { icon: Bell, label: "Analytics", href: "/dashboard/admin/analytics" }
    );
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          window.location.reload();
        },
      },
    });
  };

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Scale size={16} className="text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">LegalEase</span>
      </div>

      {/* User Info */}
      <div className="mb-6 p-3 bg-white/5 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              width={36}
              height={36}
              src={user?.image && user.image.startsWith("http") ? user.image : "/default-avatar.png"}
              alt="avatar"
              className="w-9 h-9 rounded-xl object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">{user?.name || "User"}</p>
            <p className="text-slate-400 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <div className="mt-2 px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg inline-block">
          <span className="text-indigo-400 text-xs font-semibold capitalize">{role}</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-2">Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm font-medium"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen bg-slate-900 border-r border-white/5 p-5">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      <Drawer>
        <Button className="lg:hidden m-2" variant="secondary" size="sm">
          <Bars />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-slate-900 border-r border-white/5">
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="text-white">Menu</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="p-5">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}