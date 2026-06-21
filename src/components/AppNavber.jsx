

"use client";

import Link from "next/link";
import {  usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Menu, X, Search, ChevronDown, Scale } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";


export default  function AppNavbar () {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); 
  const router=useRouter()
   
  const {data:session}=useSession()

  const user=session?.user
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Lawyers", href: "/lawyers" },
  ];
 

   const handleLogout=async()=>{
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login");
      window.location.reload() // redirect to login page
    },
  },
});
   }

  return (
   
     <header className="bg-background">
      <div className="max-w-11/12 mx-auto ">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl"
          >
            <Scale size={24} />
            <span>LegalEase</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "font-semibold text-primary"
                    : "text-default-600 hover:text-primary"
                }
              >
                {link.name}
              </Link>
            ))}

            {user  &&(
              <details className="relative">
                <summary className="flex cursor-pointer list-none items-center gap-1">
                  Dashboard
                  <ChevronDown size={16} />
                </summary>

                <div className="absolute top-8 right-0 w-48 rounded-lg border bg-white shadow-lg p-2 z-50">
                  <Link
                    href="/dashboard"
                    className="block rounded px-3 py-2 hover:bg-default-100"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    className="block rounded px-3 py-2 hover:bg-default-100"
                  >
                    Profile
                  </Link>
                </div>
              </details>
            )}
          </nav>

          {/* Search */}
          {/* <div className="hidden lg:block w-80">
            <Input
              placeholder="Search lawyers..."
              startContent={<Search size={18} />}
            />
          </div> */}

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user?  (
              <Button color="primary" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
             <Link href={"/login"}>
              <Button color="primary">Login</Button>
             </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block"
              >
                {link.name}
              </Link>
            ))}

            <Input
              placeholder="Search lawyers..."
              startContent={<Search size={18} />}
            />

            {user? (
              <>
                <Link href="/dashboard" className="block">
                  Dashboard
                </Link>

                <Button
                  onClick={handleLogout}
                  variant="primary"
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href={"/"}><Button color="primary" className="w-full">
               Login
              </Button></Link>
            )}
          </div>
        )}
      </div>
    </header>
  
  );
}