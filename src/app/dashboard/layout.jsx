
// import DashboardDrawer from "@/components/DashboardDrawer";
import DashboardSidebar from "@/components/DashboardSidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div >
        <DashboardSidebar />
      </div>

      

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}