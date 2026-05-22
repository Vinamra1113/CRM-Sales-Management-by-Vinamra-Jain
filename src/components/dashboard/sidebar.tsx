"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  UserCircle
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRole, type Role } from "@/components/role-context"

const navigation = [
  { name: "Sales Hub", href: "/sales-rep", icon: UserCircle, role: "representative" },
  { name: "Management Hub", href: "/sales-manager", icon: Workflow, role: "manager" },
  { name: "Account Hub", href: "/account-manager", icon: HeartPulse, role: "account" },
  { name: "Marketing Hub", href: "/marketing", icon: BarChart3, role: "marketing" },
  { name: "Product Hub", href: "/product-manager", icon: Package, role: "product" },
  { name: "Executive Hub", href: "/executive", icon: LayoutDashboard, role: "executive" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { role, setRole } = useRole()
  const [theme, setTheme] = React.useState<"dark" | "light">("dark")

  React.useEffect(() => {
    // Check initial theme preference or default to dark
    const isDark = document.documentElement.classList.contains("dark") || 
                   (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
      document.documentElement.classList.add("dark")
      setTheme("dark")
    } else {
      document.documentElement.classList.remove("dark")
      setTheme("light")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleRoleChange = (value: string) => {
    const newRole = value as Role
    setRole(newRole)
    const navItem = navigation.find(n => n.role === newRole)
    if (navItem) {
      router.push(navItem.href)
    }
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/50 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline font-bold text-xs leading-tight tracking-tight">CRM & SALES</span>
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Vinamra Jain™</span>
          </div>
        </div>
        
        <div className="group-data-[collapsible=icon]:hidden">
          <Select value={role} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full bg-sidebar-accent/50 border-sidebar-border h-9 text-xs">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="representative">Sales Rep</SelectItem>
              <SelectItem value="manager">Sales Manager</SelectItem>
              <SelectItem value="account">Account Manager</SelectItem>
              <SelectItem value="marketing">Marketing Team</SelectItem>
              <SelectItem value="product">Product Manager</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Workspace</SidebarGroupLabel>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name} className={cn(role !== item.role && "opacity-50 grayscale")}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href}
                  tooltip={item.name}
                  className={cn(
                    "transition-all duration-200",
                    pathname === item.href ? "text-accent bg-sidebar-accent" : "hover:text-primary"
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

      <SidebarFooter className="border-t border-sidebar-border/50 p-4 space-y-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleTheme} tooltip="Toggle Theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="group-data-[collapsible=icon]:hidden">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
