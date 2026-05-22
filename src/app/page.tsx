"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, ArrowRight, UserCircle, Workflow, HeartPulse, BarChart3, Package, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRole, type Role } from "@/components/role-context"

export default function Home() {
  const router = useRouter()
  const { setRole } = useRole()

  const handleLaunch = (role: Role, path: string) => {
    setRole(role)
    router.push(path)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-6xl w-full space-y-12 text-center">
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-1000">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-2xl shadow-primary/20 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent uppercase">
              CRM & SALES MANAGEMENT
            </h1>
            <p className="text-xs font-bold tracking-[0.4em] text-muted-foreground uppercase opacity-80">
              by Vinamra Jain™
            </p>
          </div>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade sales intelligence and performance optimization platform. Select your role to enter the workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          {[
            { title: "Sales Representative", icon: UserCircle, desc: "Personal pipeline & quota tracking", role: "representative" as Role, path: "/sales-rep" },
            { title: "Sales Manager", icon: Workflow, desc: "Team performance & governance", role: "manager" as Role, path: "/sales-manager" },
            { title: "Account Manager", icon: HeartPulse, desc: "Retention & strategic accounts", role: "account" as Role, path: "/account-manager" },
            { title: "Marketing Team", icon: BarChart3, desc: "Campaign ROI & lead sharing", role: "marketing" as Role, path: "/marketing" },
            { title: "Product Manager", icon: Package, desc: "Roadmap sync & feedback loops", role: "product" as Role, path: "/product-manager" },
            { title: "Executive Leadership", icon: LayoutDashboard, desc: "Global analytics & forecasting", role: "executive" as Role, path: "/executive" },
          ].map((feature, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/80 hover:border-primary/50 transition-all cursor-pointer text-left backdrop-blur-sm shadow-xl shadow-black/20" 
              onClick={() => handleLaunch(feature.role, feature.path)}
            >
              <feature.icon className="h-8 w-8 mb-4 text-primary group-hover:text-accent transition-colors" />
              <h3 className="text-lg font-bold font-headline mb-2 flex items-center justify-between group-hover:text-accent">
                {feature.title}
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-16">
          <Button size="lg" onClick={() => handleLaunch("representative", "/sales-rep")} className="h-14 px-12 rounded-full font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group">
            Quick Start (Sales Rep)
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-8 text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold opacity-50">
            System Status: Nominal • Vinamra Jain™ Enterprise Environment
          </p>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] -z-10" />
    </div>
  )
}
