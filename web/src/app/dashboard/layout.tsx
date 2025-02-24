import { AppSidebar } from "@/app/dashboard/_components/sidebar/AppSiderbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { IUser } from "@/interfaces/user.interface"
import { useState } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const [user, setUser] = useState<IUser>();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
