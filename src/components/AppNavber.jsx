

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   NavbarMenu,
//   NavbarMenuItem,
//   NavbarMenuToggle,
//   NavbarMenuToggleIcon,
//   NavbarMenuItemDescription,
//   Input,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "@heroui/react";
// import { Search, ChevronDown, Scale } from "lucide-react";
// import { useState } from "react";
// import React from 'react';

// const AppNavber = () => {
//     const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Example user
//   const user = {
//     role: "lawyer", // client | lawyer | admin
//     isLoggedIn: true,
//   };

//   const dashboardLinks = {
//     client: [
//       { label: "My Cases", href: "/dashboard/client/cases" },
//       { label: "Profile", href: "/dashboard/client/profile" },
//     ],
//     lawyer: [
//       { label: "Dashboard", href: "/dashboard/lawyer" },
//       { label: "Appointments", href: "/dashboard/lawyer/appointments" },
//       { label: "Profile", href: "/dashboard/lawyer/profile" },
//     ],
//     admin: [
//       { label: "Admin Dashboard", href: "/dashboard/admin" },
//       { label: "Manage Users", href: "/dashboard/admin/users" },
//     ],
//   };

//   const navLinks = [
//     { label: "Home", href: "/" },
//     { label: "Browse Lawyers", href: "/lawyers" },
//   ];
//   return (
//       <Navbar
//       maxWidth="xl"
//       isMenuOpen={isMenuOpen}
//       onMenuOpenChange={setIsMenuOpen}
//       className="border-b"
//     >
//       {/* Mobile Menu Button */}
//       <NavbarContent className="sm:hidden" justify="start">
//         <NavbarMenuToggle />
//       </NavbarContent>

//       {/* Logo */}
//       <NavbarContent justify="start">
//         <NavbarBrand>
//           <Link href="/" className="font-bold text-xl">
//             LawConnect
//           </Link>
//         </NavbarBrand>
//       </NavbarContent>

//       {/* Desktop Nav */}
//       <NavbarContent className="hidden md:flex gap-6" justify="center">
//         {navLinks.map((item) => (
//           <NavbarItem key={item.href}>
//             <Link
//               href={item.href}
//               className={`font-medium transition ${
//                 pathname === item.href
//                   ? "text-primary"
//                   : "text-default-600 hover:text-primary"
//               }`}
//             >
//               {item.label}
//             </Link>
//           </NavbarItem>
//         ))}

//         {user.isLoggedIn && (
//           <Dropdown>
//             <DropdownTrigger>
//               <Button
//                 variant="light"
//                 endContent={<ChevronDown size={16} />}
//               >
//                 Dashboard
//               </Button>
//             </DropdownTrigger>

//             <DropdownMenu aria-label="Dashboard Menu">
//               {dashboardLinks[user.role].map((item) => (
//                 <DropdownItem key={item.href}>
//                   <Link href={item.href}>{item.label}</Link>
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>
//         )}
//       </NavbarContent>

//       {/* Search */}
//       <NavbarContent className="hidden lg:flex" justify="center">
//         <Input
//           placeholder="Search lawyers..."
//           startContent={<Search size={18} />}
//           className="w-72"
//         />
//       </NavbarContent>

//       {/* Auth Buttons */}
//       <NavbarContent justify="end">
//         {user.isLoggedIn ? (
//           <Button color="danger" variant="flat">
//             Logout
//           </Button>
//         ) : (
//           <Button as={Link} href="/login" color="primary">
//             Login
//           </Button>
//         )}
//       </NavbarContent>

//       {/* Mobile Menu */}
//       <NavbarMenu>
//         {navLinks.map((item) => (
//           <NavbarMenuItem key={item.href}>
//             <Link
//               href={item.href}
//               className={`w-full block py-2 ${
//                 pathname === item.href
//                   ? "text-primary font-semibold"
//                   : ""
//               }`}
//             >
//               {item.label}
//             </Link>
//           </NavbarMenuItem>
//         ))}

//         {user.isLoggedIn &&
//           dashboardLinks[user.role].map((item) => (
//             <NavbarMenuItem key={item.href}>
//               <Link href={item.href} className="block py-2">
//                 {item.label}
//               </Link>
//             </NavbarMenuItem>
//           ))}

//         <NavbarMenuItem>
//           <Input
//             placeholder="Search lawyers..."
//             startContent={<Search size={18} />}
//           />
//         </NavbarMenuItem>

//         <NavbarMenuItem>
//           {user.isLoggedIn ? (
//             <Button color="danger" className="w-full">
//               Logout
//             </Button>
//           ) : (
//             <Button
//               as={Link}
//               href="/login"
//               color="primary"
//               className="w-full"
//             >
//               Login
//             </Button>
//           )}
//         </NavbarMenuItem>
//       </NavbarMenu>
//     </Navbar>
//   );
// };

// export default AppNavber;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Menu, X, Search, ChevronDown, Scale } from "lucide-react";

export default function AppNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = {
    isLoggedIn: true,
    role: "lawyer",
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Lawyers", href: "/lawyers" },
  ];

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

            {user.isLoggedIn && (
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
          <div className="hidden lg:block w-80">
            <Input
              placeholder="Search lawyers..."
              startContent={<Search size={18} />}
            />
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user.isLoggedIn ? (
              <Button variant="primary">
                Logout
              </Button>
            ) : (
              <Button color="primary">Login</Button>
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

            {user.isLoggedIn ? (
              <>
                <Link href="/dashboard" className="block">
                  Dashboard
                </Link>

                <Button
             
                  variant="primary"
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button color="primary" className="w-full">
                Login
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  
  );
}