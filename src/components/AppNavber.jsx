"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Scale, LayoutDashboard, Sun, Moon } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { CustomTrigger } from "./CustomTrigger";
import { useTheme } from "next-themes";

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Lawyers", href: "/lawyers" },
  ];

  const dashboardLink = user
    ? user.role === "admin"
      ? "/dashboard/admin/manage-users"
      : user.role === "lawyer"
      ? "/dashboard/lawyer/hiring-history"
      : "/dashboard/user/hiring-history"
    : "/";

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  const isDark = theme === "dark";

  return (
    <div className={`sticky  top-0 z-50 w-full transition-all duration-500 ${scrolled ? "px-4 pt-3 pb-2" : "px-0 pt-0 pb-0"}`}>
      <header
        className={`transition-all duration-500 ${
          scrolled
            ? "max-w-7xl mx-auto rounded-2xl backdrop-blur-xl shadow-2xl border dark:bg-slate-900/95 dark:shadow-black/30 dark:border-white/5 bg-white/95 shadow-black/10 border-black/5"
            : "dark:bg-slate-950 dark:border-white/5 bg-white border-black/5 border-b"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 ">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 bg-indigo-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="absolute inset-0 bg-indigo-600 rounded-xl blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
                <Scale size={18} className="relative text-indigo-500 stroke-[2.5]" />
              </div>
              <span className="text-lg font-black tracking-tight bg-gradient-to-r dark:from-white dark:to-slate-400 from-slate-900 to-slate-500 bg-clip-text text-transparent">
                LegalEase
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 p-1 rounded-full dark:bg-white/5 dark:border-white/8 bg-black/5 border border-black/8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-1.5 text-xs font-bold tracking-wide rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                        : "dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 hover:bg-black/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {user && (
                <Link
                  href={dashboardLink}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                    pathname.startsWith("/dashboard")
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                      : "dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 hover:bg-black/5"
                  }`}
                >
                  <LayoutDashboard size={12} />
                  Dashboard
                </Link>
              )}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="w-9 h-9 flex items-center justify-center rounded-xl dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white bg-black/5 border border-black/10 text-slate-500 hover:text-slate-900 hover:bg-black/8 transition-all active:scale-95"
                >
                  {isDark ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              )}

              {isPending ? (
                <div className="w-8 h-8 rounded-full dark:bg-white/10 bg-black/10 animate-pulse bg-textground" />
              ) : user ? (
                <CustomTrigger handleLogout={handleLogout} />
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-xs font-bold dark:text-slate-400 dark:hover:text-white text-slate-500 hover:text-slate-900 transition-colors rounded-full dark:hover:bg-white/5 hover:bg-black/5"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="relative px-4 py-2 text-xs font-bold text-white rounded-full overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-indigo-600 transition-all duration-300 group-hover:bg-indigo-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative">Get Started</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Right */}
            <div className="md:hidden flex items-center gap-2">
              {/* Theme Toggle Mobile */}
              {mounted && (
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="w-9 h-9 flex items-center justify-center rounded-xl dark:bg-white/5 dark:border-white/10 dark:text-slate-400 bg-black/5 border border-black/10 text-slate-500 transition-all active:scale-95"
                >
                  {isDark ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              )}

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-xl dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white bg-black/5 border border-black/10 text-slate-500 hover:text-slate-900 transition-all active:scale-95"
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden dark:border-white/5 border-black/5 border-t px-5 py-4 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 hover:bg-black/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {user && (
                <Link
                  href={dashboardLink}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    pathname.startsWith("/dashboard")
                      ? "bg-indigo-600 text-white"
                      : "dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 hover:bg-black/5"
                  }`}
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>
              )}
            </div>

            <div className="pt-3 dark:border-white/5 border-black/5 border-t">
              {isPending ? (
                <div className="h-10 rounded-xl dark:bg-white/5 bg-black/5 animate-pulse" />
              ) : user ? (
                <div className="flex items-center justify-between px-4 py-2 rounded-xl dark:bg-white/5 dark:border-white/8 bg-black/5 border border-black/8">
                  <div>
                    <p className="dark:text-white text-slate-900 text-sm font-semibold">{user.name}</p>
                    <p className="dark:text-slate-500 text-slate-400 text-xs capitalize">{user.role}</p>
                  </div>
                  <CustomTrigger handleLogout={handleLogout} />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold dark:text-slate-300 dark:bg-white/5 dark:border-white/10 text-slate-600 bg-black/5 border border-black/10 hover:bg-black/8 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}