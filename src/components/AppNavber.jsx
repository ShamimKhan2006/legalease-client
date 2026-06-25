

"use client";

import Link from "next/link";
import {  usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Menu, X, Search, ChevronDown, Scale } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { CustomTrigger } from "./CustomTrigger";



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

         
         

{user && (
  <Link 
    href={
      user.role === "admin" ? "/dashboard/admin/manage-users" : 
      user.role === "lawyer" ? "/dashboard/lawyer/hiring-history" : 
      "/dashboard/user/hiring-history"
    }
  >
    <div className="cursor-pointer">Dashboard</div>
  </Link>
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
              <CustomTrigger handleLogout={handleLogout}/>
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
                  
                </Link>

                 <CustomTrigger  handleLogout={handleLogout}/>
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

// // // "use client";

// // // import Link from "next/link";
// // // import { usePathname, useRouter } from "next/navigation";
// // // import { useState } from "react";
// // // import { Button } from "@heroui/react";
// // // import { Menu, X, Scale } from "lucide-react";
// // // import { authClient, useSession } from "@/lib/auth-client";
// // // import { CustomTrigger } from "./CustomTrigger";

// // // export default function AppNavbar() {
// // //   const pathname = usePathname();
// // //   const router = useRouter();
// // //   const [menuOpen, setMenuOpen] = useState(false);

// // //   const { data: session } = useSession();
// // //   const user = session?.user;

// // //   const navLinks = [
// // //     { name: "Home", href: "/" },
// // //     { name: "Browse Lawyers", href: "/lawyers" },
// // //   ];

// // //   const dashboardLink = user
// // //     ? user.role === "admin"
// // //       ? "/dashboard/admin/manage-users"
// // //       : user.role === "lawyer"
// // //       ? "/dashboard/lawyer/hiring-history"
// // //       : "/dashboard/user/hiring-history"
// // //     : "/";

// // //   const handleLogout = async () => {
// // //     await authClient.signOut({
// // //       fetchOptions: {
// // //         onSuccess: () => {
// // //           router.push("/login");
// // //           window.location.reload();
// // //         },
// // //       },
// // //     });
// // //   };

// // //   return (
// // //     <header className="bg-background border-b">
// // //       <div className="max-w-7xl mx-auto px-4">
// // //         <div className="flex h-16 items-center justify-between">
// // //           {/* Logo */}
// // //           <Link
// // //             href="/"
// // //             className="flex items-center gap-2 text-xl font-bold"
// // //           >
// // //             <Scale size={24} />
// // //             <span>LegalEase</span>
// // //           </Link>

// // //           {/* Desktop Menu */}
// // //           <nav className="hidden md:flex items-center gap-6">
// // //             {navLinks.map((link) => (
// // //               <Link
// // //                 key={link.href}
// // //                 href={link.href}
// // //                 className={
// // //                   pathname === link.href
// // //                     ? "font-semibold text-primary"
// // //                     : "text-default-600 hover:text-primary"
// // //                 }
// // //               >
// // //                 {link.name}
// // //               </Link>
// // //             ))}

// // //             {user && (
// // //               <Link
// // //                 href={dashboardLink}
// // //                 className="text-default-600 hover:text-primary"
// // //               >
// // //                 Dashboard
// // //               </Link>
// // //             )}
// // //           </nav>

// // //           {/* Desktop Auth */}
// // //           <div className="hidden md:flex items-center gap-2">
// // //             {user ? (
// // //               <CustomTrigger handleLogout={handleLogout} />
// // //             ) : (
// // //               <Link href="/login">
// // //                 <Button color="primary">Login</Button>
// // //               </Link>
// // //             )}
// // //           </div>

// // //           {/* Mobile Toggle */}
// // //           <button
// // //             onClick={() => setMenuOpen(!menuOpen)}
// // //             className="md:hidden"
// // //           >
// // //             {menuOpen ? <X size={24} /> : <Menu size={24} />}
// // //           </button>
// // //         </div>

// // //         {/* Mobile Menu */}
// // //         {menuOpen && (
// // //           <div className="md:hidden border-t py-4 space-y-3">
// // //             {navLinks.map((link) => (
// // //               <Link
// // //                 key={link.href}
// // //                 href={link.href}
// // //                 className="block"
// // //                 onClick={() => setMenuOpen(false)}
// // //               >
// // //                 {link.name}
// // //               </Link>
// // //             ))}

// // //             {user && (
// // //               <Link
// // //                 href={dashboardLink}
// // //                 className="block"
// // //                 onClick={() => setMenuOpen(false)}
// // //               >
// // //                 Dashboard
// // //               </Link>
// // //             )}

// // //             {user ? (
// // //               <CustomTrigger handleLogout={handleLogout} />
// // //             ) : (
// // //               <Link href="/login">
// // //                 <Button color="primary" className="w-full">
// // //                   Login
// // //                 </Button>
// // //               </Link>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </header>
// // //   );
// // // }

// // "use client";

// // import Link from "next/link";
// // import { usePathname, useRouter } from "next/navigation";
// // import { useState } from "react";
// // import { Button } from "@heroui/react";
// // import { Menu, X, Scale, LayoutDashboard } from "lucide-react";
// // import { authClient, useSession } from "@/lib/auth-client";
// // import { CustomTrigger } from "./CustomTrigger";

// // export default function AppNavbar() {
// //   const pathname = usePathname();
// //   const router = useRouter();
// //   const [menuOpen, setMenuOpen] = useState(false);

// //   const { data: session } = useSession();
// //   const user = session?.user;

// //   const navLinks = [
// //     { name: "Home", href: "/" },
// //     { name: "Browse Lawyers", href: "/lawyers" },
// //   ];

// //   const dashboardLink = user
// //     ? user.role === "admin"
// //       ? "/dashboard/admin/manage-users"
// //       : user.role === "lawyer"
// //       ? "/dashboard/lawyer/hiring-history"
// //       : "/dashboard/user/hiring-history"
// //     : "/";

// //   const handleLogout = async () => {
// //     await authClient.signOut({
// //       fetchOptions: {
// //         onSuccess: () => {
// //           router.push("/login");
// //           window.location.reload();
// //         },
// //       },
// //     });
// //   };

// //   return (
// //     <header className="sticky top-0 z-50 w-full border-b border-default-100 bg-background/70 backdrop-blur-md transition-all duration-300">
// //       <div className="max-w-7xl mx-auto px-6">
// //         <div className="flex h-20 items-center justify-between">
          
// //           {/* Logo */}
// //           <Link
// //             href="/"
// //             className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-foreground transition-opacity hover:opacity-90"
// //           >
// //             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20">
// //               <Scale size={22} className="stroke-[2.2]" />
// //             </div>
// //             <span className="bg-gradient-to-r md:bg-none lg:bg-gradient-to-r from-foreground to-default-600 bg-clip-text text-transparent">
// //               LegalEase
// //             </span>
// //           </Link>

// //           {/* Desktop Menu */}
// //           <nav className="hidden md:flex items-center gap-8">
// //             {navLinks.map((link) => {
// //               const isActive = pathname === link.href;
// //               return (
// //                 <Link
// //                   key={link.href}
// //                   href={link.href}
// //                   className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-200 group ${
// //                     isActive
// //                       ? "text-primary font-semibold"
// //                       : "text-default-500 hover:text-foreground"
// //                   }`}
// //                 >
// //                   {link.name}
// //                   <span
// //                     className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
// //                       isActive ? "w-full" : "w-0 group-hover:w-full"
// //                     }`}
// //                   />
// //                 </Link>
// //               );
// //             })}

// //             {user && (
// //               <Link
// //                 href={dashboardLink}
// //                 className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-default-200 text-sm font-medium text-default-700 bg-default-50/50 hover:bg-default-100 hover:text-foreground hover:border-default-300 transition-all shadow-sm"
// //               >
// //                 <LayoutDashboard size={15} className="text-default-500" />
// //                 Dashboard
// //               </Link>
// //             )}
// //           </nav>

// //           {/* Desktop Auth */}
// //           <div className="hidden md:flex items-center gap-4">
// //             {user ? (
// //               <div className="pl-2 border-l border-default-200">
// //                 <CustomTrigger handleLogout={handleLogout} />
// //               </div>
// //             ) : (
// //               <Link href="/login">
// //                 <Button 
// //                   color="primary" 
// //                   radius="full" 
// //                   className="font-medium tracking-wide shadow-md shadow-primary/20 px-6 hover:translate-y-[-1px] transition-transform"
// //                 >
// //                   Login
// //                 </Button>
// //               </Link>
// //             )}
// //           </div>

// //           {/* Mobile Toggle */}
// //           <button
// //             onClick={() => setMenuOpen(!menuOpen)}
// //             className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-default-200 bg-default-50 text-default-600 transition-all hover:bg-default-100 active:scale-95"
// //             aria-label="Toggle Menu"
// //           >
// //             {menuOpen ? <X size={20} /> : <Menu size={20} />}
// //           </button>
// //         </div>

// //         {/* Mobile Menu */}
// //         {menuOpen && (
// //           <div className="md:hidden border-t border-default-100 py-6 space-y-4">
// //             <div className="space-y-1">
// //               {navLinks.map((link) => {
// //                 const isActive = pathname === link.href;
// //                 return (
// //                   <Link
// //                     key={link.href}
// //                     href={link.href}
// //                     className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
// //                       isActive
// //                         ? "bg-primary/10 text-primary font-semibold"
// //                         : "text-default-600 hover:bg-default-50 hover:text-foreground"
// //                     }`}
// //                     onClick={() => setMenuOpen(false)}
// //                   >
// //                     {link.name}
// //                   </Link>
// //                 );
// //               })}
// //             </div>

// //             {user && (
// //               <div className="px-1">
// //                 <Link
// //                   href={dashboardLink}
// //                   className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl border border-default-200 text-base font-medium text-default-700 bg-default-50/50"
// //                   onClick={() => setMenuOpen(false)}
// //                 >
// //                   <LayoutDashboard size={18} className="text-default-500" />
// //                   Dashboard
// //                 </Link>
// //               </div>
// //             )}

// //             <div className="pt-2 px-1 border-t border-default-100">
// //               {user ? (
// //                 <div className="flex justify-between items-center px-3 py-2 rounded-xl bg-default-50/50 border border-default-100">
// //                   <span className="text-sm font-medium text-default-500">Account</span>
// //                   <CustomTrigger handleLogout={handleLogout} />
// //                 </div>
// //               ) : (
// //                 <Link href="/login" onClick={() => setMenuOpen(false)}>
// //                   <Button color="primary" radius="xl" className="w-full font-medium shadow-sm py-6">
// //                     Login
// //                   </Button>
// //                 </Link>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </header>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";
// import { Button } from "@heroui/react";
// import { Menu, X, Scale, LayoutDashboard } from "lucide-react";
// import { authClient, useSession } from "@/lib/auth-client";
// import { CustomTrigger } from "./CustomTrigger";

// export default function AppNavbar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const { data: session } = useSession();
//   const user = session?.user;

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Browse Lawyers", href: "/lawyers" },
//   ];

//   const dashboardLink = user
//     ? user.role === "admin"
//       ? "/dashboard/admin/manage-users"
//       : user.role === "lawyer"
//       ? "/dashboard/lawyer/hiring-history"
//       : "/dashboard/user/hiring-history"
//     : "/";

//   const handleLogout = async () => {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           router.push("/login");
//           window.location.reload();
//         },
//       },
//     });
//   };

//   return (
//     <div className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 bg-gradient-to-b from-background to-transparent">
//       {/* মেইন রাউন্ডেড নেভিগেশন কন্টেইনার */}
//       <header className="max-w-7xl mx-auto rounded-2xl border border-default-200/60 bg-background/70 backdrop-blur-xl shadow-lg shadow-default-100/40 transition-all duration-300">
//         <div className="px-6 md:px-8">
//           <div className="flex h-16 items-center justify-between">
            
//             {/* Logo */}
//             <Link
//               href="/"
//               className="flex items-center gap-2.5 text-xl font-black tracking-tight text-foreground group"
//             >
//               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-105">
//                 <Scale size={18} className="stroke-[2.5]" />
//               </div>
//               <span className="bg-gradient-to-r from-foreground via-foreground to-default-500 bg-clip-text text-transparent">
//                 LegalEase
//               </span>
//             </Link>

//             {/* Desktop Menu - রাউন্ডেড ক্যাপসুল বর্ডার লুক */}
//             <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full border border-default-100 bg-default-50/40">
//               {navLinks.map((link) => {
//                 const isActive = pathname === link.href;
//                 return (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={`px-4 py-2 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 ${
//                       isActive
//                         ? "bg-background text-primary shadow-sm ring-1 ring-default-200/50"
//                         : "text-default-500 hover:text-foreground"
//                     }`}
//                   >
//                     {link.name}
//                   </Link>
//                 );
//               })}

//               {user && (
//                 <Link
//                   href={dashboardLink}
//                   className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
//                     pathname.startsWith("/dashboard")
//                       ? "bg-background text-primary shadow-sm ring-1 ring-default-200/50"
//                       : "text-default-500 hover:text-foreground"
//                   }`}
//                 >
//                   <LayoutDashboard size={13} />
//                   Dashboard
//                 </Link>
//               )}
//             </nav>

//             {/* Desktop Auth */}
//             <div className="hidden md:flex items-center gap-3">
//               {user ? (
//                 <div className="pl-1">
//                   <CustomTrigger handleLogout={handleLogout} />
//                 </div>
//               ) : (
//                 <Link href="/login">
//                   <Button 
//                     color="primary" 
//                     radius="full" 
//                     size="sm"
//                     className="font-semibold tracking-wide shadow-md shadow-primary/20 px-5 hover:scale-[1.02] active:scale-[0.98] transition-all"
//                   >
//                     Login
//                   </Button>
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Toggle */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-default-200 bg-default-50/50 text-default-600 active:scale-95 transition-all"
//               aria-label="Toggle Menu"
//             >
//               {menuOpen ? <X size={18} /> : <Menu size={18} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu - মূল বক্সের ভেতরেই রাউন্ডেড ড্রপডাউন */}
//         {menuOpen && (
//           <div className="md:hidden border-t border-default-100 mx-4 my-3 pt-3 pb-2 space-y-3">
//             <div className="space-y-1">
//               {navLinks.map((link) => {
//                 const isActive = pathname === link.href;
//                 return (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                       isActive
//                         ? "bg-primary/10 text-primary font-semibold"
//                         : "text-default-600 hover:bg-default-50 hover:text-foreground"
//                     }`}
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {link.name}
//                   </Link>
//                 );
//               })}
//             </div>

//             {user && (
//               <Link
//                 href={dashboardLink}
//                 className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-default-100 text-sm font-medium text-default-700 bg-default-50/30"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <LayoutDashboard size={16} className="text-default-400" />
//                 Dashboard
//               </Link>
//             )}

//             <div className="pt-2 border-t border-default-100">
//               {user ? (
//                 <div className="flex justify-between items-center px-4 py-2 rounded-xl bg-default-50/30 border border-default-100">
//                   <span className="text-xs font-semibold text-default-400 uppercase tracking-wider">Account</span>
//                   <CustomTrigger handleLogout={handleLogout} />
//                 </div>
//               ) : (
//                 <Link href="/login" onClick={() => setMenuOpen(false)}>
//                   <Button color="primary" radius="xl" className="w-full font-semibold shadow-sm">
//                     Login
//                   </Button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";
// import { Button } from "@heroui/react";
// import { Menu, X, Scale, LayoutDashboard } from "lucide-react";
// import { authClient, useSession } from "@/lib/auth-client";
// import { CustomTrigger } from "./CustomTrigger";

// export default function AppNavbar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const { data: session } = useSession();
//   const user = session?.user;

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Browse Lawyers", href: "/lawyers" },
//   ];

//   const dashboardLink = user
//     ? user.role === "admin"
//       ? "/dashboard/admin/manage-users"
//       : user.role === "lawyer"
//       ? "/dashboard/lawyer/hiring-history"
//       : "/dashboard/user/hiring-history"
//     : "/";

//   const handleLogout = async () => {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           router.push("/login");
//           window.location.reload();
//         },
//       },
//     });
//   };

//   return (
//     <div className="sticky top-0 z-50 w-full px-4 pt-5 pb-3 bg-gradient-to-b from-background via-background/60 to-transparent">
//       {/* মেইন ফ্লোটিং কন্টেইনার - বর্ডার ছাড়া ইউনিক শ্যাডো ও কালার লুক */}
//       <header className="max-w-7xl mx-auto rounded-2xl bg-neutral-900/[0.94] dark:bg-neutral-950/[0.92] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
//         <div className="px-6 md:px-8">
//           <div className="flex h-16 items-center justify-between">
            
//             {/* Logo */}
//             <Link
//               href="/"
//               className="flex items-center gap-2.5 text-xl font-black tracking-tight text-white group"
//             >
//               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary-400 shadow-inner transition-transform group-hover:scale-105">
//                 <Scale size={18} className="stroke-[2.5]" />
//               </div>
//               <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
//                 LegalEase
//               </span>
//             </Link>

//             {/* Desktop Menu - ক্যাপসুল স্টাইল রাউন্ডেড রাউটস */}
//             <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-neutral-800/50 shadow-inner">
//               {navLinks.map((link) => {
//                 const isActive = pathname === link.href;
//                 return (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={`px-5 py-2 text-xs font-bold tracking-wide rounded-full transition-all duration-300 ${
//                       isActive
//                         ? "bg-primary text-white shadow-[0_4px_12px_rgba(var(--heroui-primary-rgb),0.3)]"
//                         : "text-neutral-400 hover:text-white"
//                     }`}
//                   >
//                     {link.name}
//                   </Link>
//                 );
//               })}

//               {user && (
//                 <Link
//                   href={dashboardLink}
//                   className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
//                     pathname.startsWith("/dashboard")
//                       ? "bg-primary text-white shadow-[0_4px_12px_rgba(var(--heroui-primary-rgb),0.3)]"
//                       : "text-neutral-400 hover:text-white"
//                   }`}
//                 >
//                   <LayoutDashboard size={13} />
//                   Dashboard
//                 </Link>
//               )}
//             </nav>

//             {/* Desktop Auth */}
//             <div className="hidden md:flex items-center gap-3">
//               {user ? (
//                 <div className="pl-1 dark-trigger-wrapper">
//                   <CustomTrigger handleLogout={handleLogout} />
//                 </div>
//               ) : (
//                 <Link href="/login">
//                   <Button 
//                     color="primary" 
//                     radius="full" 
//                     size="sm"
//                     className="font-bold tracking-wide shadow-lg shadow-primary/20 px-6 hover:scale-[1.03] active:scale-[0.97] transition-all text-white"
//                   >
//                     Login
//                   </Button>
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Toggle */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-800/60 text-neutral-300 shadow-md active:scale-95 transition-all"
//               aria-label="Toggle Menu"
//             >
//               {menuOpen ? <X size={18} /> : <Menu size={18} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu - মেইন রাউন্ডেড বক্সের ভেতরেই ড্রপডাউন শ্যাডো প্যানেল */}
//         {menuOpen && (
//           <div className="md:hidden mx-4 my-3 pt-2 pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 ">
//             <div className="h-[1px] bg-neutral-800/60 w-full" />
//             <div className="space-y-1">
//               {navLinks.map((link) => {
//                 const isActive = pathname === link.href;
//                 return (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
//                       isActive
//                         ? "bg-primary text-white shadow-md"
//                         : "text-neutral-400 hover:bg-neutral-800/40 hover:text-white"
//                     }`}
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {link.name}
//                   </Link>
//                 );
//               })}
//             </div>

//             {user && (
//               <Link
//                 href={dashboardLink}
//                 className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-300 bg-neutral-800/40"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <LayoutDashboard size={16} className="text-neutral-400" />
//                 Dashboard
//               </Link>
//             )}

//             <div className="pt-2 border-t border-neutral-800/60">
//               {user ? (
//                 <div className="flex justify-between items-center px-4 py-2 rounded-xl bg-neutral-800/30">
//                   <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Account</span>
//                   <CustomTrigger handleLogout={handleLogout} />
//                 </div>
//               ) : (
//                 <Link href="/login" onClick={() => setMenuOpen(false)}>
//                   <Button color="primary" radius="xl" className="w-full font-bold shadow-md text-white">
//                     Login
//                   </Button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }