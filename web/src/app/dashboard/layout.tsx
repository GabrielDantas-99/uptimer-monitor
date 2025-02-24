import { AppSidebar } from "@/app/dashboard/_components/sidebar/AppSiderbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import ProtectedRoute from "../_components/ProtectedRoute"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
