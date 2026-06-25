
// import DashboardDrawer from "@/components/DashboardDrawer";
import DashboardSidebar from "@/components/DashboardSidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div >
        <DashboardSidebar />
      </div>

      {/* Mobile Drawer */}
      {/* <div className="md:hidden fixed top-4 left-4 z-50">
        <DashboardDrawer/>
      </div> */}

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}