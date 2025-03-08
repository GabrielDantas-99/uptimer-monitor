import { AppSidebar } from "@/app/dashboard/_components/sidebar/AppSiderbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import ProtectedRoute from "../_components/ProtectedRoute"
import Toolbar from "../_components/Toolbar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Toolbar />
          {children}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
