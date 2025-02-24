"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./NavMain"
import { NavProjects } from "./NavProjects"
import { NavUser } from "./NavUser"
import { TeamSwitcher } from "./TeamSwitcher"
import { NAV_LINKS } from "../../consts/nav-links"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={NAV_LINKS.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_LINKS.navMain} />
        <NavProjects projects={NAV_LINKS.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={NAV_LINKS.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
