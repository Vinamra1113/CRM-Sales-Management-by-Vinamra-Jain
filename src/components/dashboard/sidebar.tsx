
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  LayoutDashboard, 
  Users, 
  Layers, 
  Settings2, 
  HeartPulse, 
  Package, 
  Workflow, 
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Executive Dashboard", href: "/dashboard", icon: LayoutDashboard, role: "executive" },
  { name: "Velocity Pipeline", href: "/pipeline", icon: Layers, role: "sales" },
  { name: "Customer Ledger", href: "/customers", icon: Users, role: "all" },
  { name: "Lead Orchestrator", href: "/orchestrator", icon: Workflow, role: "manager" },
  { name: "Health & Growth", href: "/health", icon: HeartPulse, role: "account" },
  { name: "Product Bridge", href: "/collaboration", icon: Package, role: "product" },
  { name: "Performance Target", href: "/performance", icon: TrendingUp, role: "sales" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline font-bold text-sm leading-tight tracking-tight">HOSHŌ</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Digital Sales</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href}
                  tooltip={item.name}
                  className={cn(
                    "transition-all duration-200",
                    pathname === item.href ? "text-accent" : "hover:text-primary"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                    {pathname === item.href && (
                      <ChevronRight className="ml-auto h-3 w-3 group-data-[collapsible=icon]:hidden" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings">
                <Settings2 className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">System Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
