// "use client";

// import Link from "next/link";
// import { useSession } from "@/lib/auth-client";

// export default function DashboardSidebar() {
//   const { data: session } = useSession();

//   const role = session?.user?.role;

//   return (
//     <aside className="w-64 bg-slate-900 text-white p-5 border">
//       <h2 className="text-2xl font-bold mb-6">
//         Dashboard
//       </h2>

//       <nav className="space-y-2">

//         <Link
//           href="/dashboard"
//           className="block p-2 rounded hover:bg-slate-800"
//         >
//           Dashboard Home
//         </Link>

//         {role === "user" && (
//           <>
//             <Link
//               href="/dashboard/user/hiring-history"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Hiring History
//             </Link>

//             <Link
//               href="/dashboard/user/update-profile"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Update Profile
//             </Link>

//             <Link
//               href="/dashboard/user/comments"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Comments
//             </Link>
//           </>
//         )}

//         {role === "lawyer" && (
//           <>
//             <Link
//               href="/dashboard/lawyer/hiring-history"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Hiring Requests
//             </Link>

//             <Link
//               href="/dashboard/lawyer/manage-profile"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Manage Legal Profile
//             </Link>
//           </>
//         )}

//         {role === "admin" && (
//           <>
//             <Link
//               href="/dashboard/admin/manage-users"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Manage Users
//             </Link>

//             <Link
//               href="/dashboard/admin/all-transactions"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Transactions
//             </Link>

//             <Link
//               href="/dashboard/admin/analytics"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Analytics
//             </Link>
//           </>
//         )}
//       </nav>
//     </aside>
//   );
// }




// import {Bars, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
// import {Button, Drawer} from "@heroui/react";

// export function DashboardSidebar() {
//   const navItems=[
//     {icon: House, label: "Home"},
//     {icon: Magnifier, label: "Search"},
//     {icon: Bell, label: "Notifications"},
//     {icon: Envelope, label: "Messages"},
//     {icon: Person, label: "Profile"},
//     {icon: Gear, label: "Settings"},
//   ];

//   return (
//     <Drawer>
//       <Button variant="secondary">
//         <Bars />
//         Menu
//       </Button>
//       <Drawer.Backdrop>
//         <Drawer.Content placement="left">
//           <Drawer.Dialog>
//             <Drawer.CloseTrigger />
//             <Drawer.Header>
//               <Drawer.Heading>Navigation</Drawer.Heading>
//             </Drawer.Header>
//             <Drawer.Body>
//               <nav className="flex flex-col gap-1">
//                 {navItems.map((item) => (
//                   <button
//                     key={item.label}
//                     className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
//                     type="button"
//                   >
//                     <item.icon className="size-5 text-muted" />
//                     {item.label}
//                   </button>
//                 ))}
//               </nav>
//             </Drawer.Body>
//           </Drawer.Dialog>
//         </Drawer.Content>
//       </Drawer.Backdrop>
//     </Drawer>
//   );
// }

// "use client";

// import Link from "next/link";
//  import { useSession } from "@/lib/auth-client";
// export default function DashboardSidebar() {
//     const { data: session } = useSession();

//   const role = session?.user?.role;
//   return (
//     <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">
//       <h2 className="text-2xl font-bold mb-6">
//         Dashboard
//       </h2>

//       <nav className="space-y-2">
//         <Link
//           href="/dashboard"
//           className="block p-2 rounded hover:bg-slate-800"
//         >
//           Dashboard Home
//         </Link>

//         <Link
//           href="/dashboard/user/hiring-history"
//           className="block p-2 rounded hover:bg-slate-800"
//         >
//           Hiring History
//         </Link>
//       </nav>
//     </aside>
//      <aside className="w-64 bg-slate-900 text-white p-5 border">
//     <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">
//       <h2 className="text-2xl font-bold mb-6">
//         Dashboard
//       </h2>

//       <nav className="space-y-2">

//         <Link
//           href="/dashboard"
//           className="block p-2 rounded hover:bg-slate-800"
//         >
//           Dashboard Home
//         </Link>

//         {role === "user" && (
//           <>
//             <Link
//               href="/dashboard/user/hiring-history"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Hiring History
//             </Link>

//             <Link
//               href="/dashboard/user/update-profile"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Update Profile
//             </Link>

//             <Link
//               href="/dashboard/user/comments"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Comments
//             </Link>
//           </>
//         )}

//         {role === "lawyer" && (
//           <>
//             <Link
//               href="/dashboard/lawyer/hiring-history"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Hiring Requests
//             </Link>

//             <Link
//               href="/dashboard/lawyer/manage-profile"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Manage Legal Profile
//             </Link>
//           </>
//         )}

//         {role === "admin" && (
//           <>
//             <Link
//               href="/dashboard/admin/manage-users"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Manage Users
//             </Link>

//             <Link
//               href="/dashboard/admin/all-transactions"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Transactions
//             </Link>

//             <Link
//               href="/dashboard/admin/analytics"
//               className="block p-2 rounded hover:bg-slate-800"
//             >
//               Analytics
//             </Link>
//           </>
//         )}
//       </nav>
//     </aside>
//   );
// }

 "use client";

import { useSession } from "@/lib/auth-client";
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

export default function DashboardSidebar() {
  const { data: session } = useSession();

  const role = session?.user?.role;

  const navItems = [
    {
      icon: House,
      label: "Dashboard Home",
      href: "/dashboard",
    },
  ];

  if (role === "user") {
    navItems.push(
      {
        icon: Bell,
        label: "Hiring History",
        href: "/dashboard/user/hiring-history",
      },
      {
        icon: Person,
        label: "Update Profile",
        href: "/dashboard/user/update-profile",
      },
      {
        icon: Envelope,
        label: "Comments",
        href: "/dashboard/user/comments",
      }
    );
  }

  if (role === "lawyer") {
    navItems.push(
      {
        icon: Bell,
        label: "Hiring Requests",
        href: "/dashboard/lawyer/hiring-history",
      },
      {
        icon: Gear,
        label: "Manage Legal Profile",
        href: "/dashboard/lawyer/manage-profile",
      }
    );
  }

  if (role === "admin") {
    navItems.push(
      {
        icon: Person,
        label: "Manage Users",
        href: "/dashboard/admin/manage-users",
      },
      {
        icon: Envelope,
        label: "Transactions",
        href: "/dashboard/admin/all-transactions",
      },
      {
        icon: Bell,
        label: "Analytics",
        href: "/dashboard/admin/analytics",
      }
    );
  }

  const navContent= <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-default"
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>

  return (
   <>
   <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
    {navContent}
   </aside>
   
    <Drawer>
      <Button className="lg:hidden" variant="secondary">
        <Bars />
        Menu
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading>
                Dashboard Menu
              </Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
             {navContent}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
   </>
  );
}


// "use client";

// import { useSession } from "@/lib/auth-client";
// import {
//   Bars,
//   Bell,
//   Envelope,
//   Gear,
//   House,
//   Person,
//   ChartBar,
//   ShieldCheck,
// } from "@gravity-ui/icons";
// import { Button, Drawer } from "@heroui/react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function DashboardSidebar() {
//   const { data: session } = useSession();
//   const pathname = usePathname();
  
//   // Accessing the role safely without types
//   const role = session?.user?.role;

//   // Navigation Logic
//   const getNavItems = () => {
//     const baseItems = [
//       { icon: House, label: "Dashboard", href: "/dashboard" },
//     ];

//     if (role === "user") {
//       return [
//         ...baseItems,
//         { icon: Bell, label: "Hiring History", href: "/dashboard/user/hiring-history" },
//         { icon: Person, label: "Update Profile", href: "/dashboard/user/update-profile" },
//         { icon: Envelope, label: "Comments", href: "/dashboard/user/comments" },
//       ];
//     }

//     if (role === "lawyer") {
//       return [
//         ...baseItems,
//         { icon: Bell, label: "Hiring Requests", href: "/dashboard/lawyer/hiring-history" },
//         { icon: Gear, label: "Manage Profile", href: "/dashboard/lawyer/manage-profile" },
//       ];
//     }

//     if (role === "admin") {
//       return [
//         ...baseItems,
//         { icon: ShieldCheck, label: "Manage Users", href: "/dashboard/admin/manage-users" },
//         { icon: Envelope, label: "Transactions", href: "/dashboard/admin/all-transactions" },
//         { icon: ChartBar, label: "Analytics", href: "/dashboard/admin/analytics" },
//       ];
//     }

//     return baseItems;
//   };

//   const navItems = getNavItems();

//   return (
//     <aside className="w-64 border-r bg-white p-6 h-screen">
//       <div className="font-bold text-xl mb-8">Dashboard</div>
      
//       <nav className="flex flex-col gap-1">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href;
          
//           return (
//             <Link
//               key={item.label}
//               href={item.href}
//               className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
//                 isActive 
//                   ? "bg-slate-900 text-white" 
//                   : "text-slate-600 hover:bg-slate-100"
//               }`}
//             >
//               <Icon className="size-5" />
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// } */}