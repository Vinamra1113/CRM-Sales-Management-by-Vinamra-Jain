
"use client"

import * as React from "react"
import Link from "next/link"
import { 
  HeartPulse, 
  Bell, 
  History, 
  Smile, 
  ChevronRight, 
  Calendar, 
  AlertTriangle,
  FileText,
  Star
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function AccountManagerHub() {
  const { toast } = useToast()

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Account Hub</h1>
          <p className="text-muted-foreground">Strategic account planning and proactive retention management.</p>
        </div>
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-border/50 gap-2">
                <FileText className="h-4 w-4" /> Account Plans
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Strategic Account Plans</SheetTitle>
                <SheetDescription>Overview of active growth strategies for your primary book of business.</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                {[
                  { name: "CyberDyne Systems", plan: "Cloud Expansion Phase 2", progress: 65 },
                  { name: "Zenith Corp", plan: "Enterprise Suite Migration", progress: 82 },
                  { name: "Atlas Solutions", plan: "Retention Safeguard Plan", progress: 30 },
                ].map((plan, i) => (
                  <div key={i} className="space-y-2 p-4 rounded-lg border bg-card">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{plan.name}</span>
                      <Badge variant="secondary">{plan.progress}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.plan}</p>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${plan.progress}%` }} />
                    </div>
                  </div>
                ))}
                <Button className="w-full" onClick={() => toast({ title: "New Plan Drafted", description: "Select an account to finalize details." })}>Create New Plan</Button>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button className="bg-primary gap-2" asChild>
            <Link href="/health">
              <Bell className="h-4 w-4" /> Renewal Alerts
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg Health", value: "92", sub: "Excellent across tier-1", icon: HeartPulse, color: "text-accent" },
          { label: "Renewals (30d)", value: "8", sub: "$1.4M pending", icon: Calendar, color: "text-primary" },
          { label: "Churn Risk", value: "Low", sub: "Only 1 account at risk", icon: AlertTriangle, color: "text-destructive" },
          { label: "NPS Score", value: "74", sub: "+5 from last month", icon: Smile, color: "text-accent" },
        ].map((kpi, i) => (
          <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className={cn("h-4 w-4", kpi.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{kpi.value}</div>
              <p className="text-[10px] text-muted-foreground mt-1">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Strategic Account Watchlist</CardTitle>
            <CardDescription>Top-tier clients and their current interaction pulse.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {[
                { name: "CyberDyne Systems", health: "Excellent", spent: "$450k", status: "Active" },
                { name: "Aether Group", health: "Poor", spent: "$120k", status: "Renewal Due" },
                { name: "Zenith Corp", health: "Good", spent: "$890k", status: "Active" },
              ].map((account, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-all cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center border border-border/50">
                    <Star className={cn("h-5 w-5", account.health === "Excellent" ? "text-accent" : "text-muted")} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{account.name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{account.status}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-foreground">{account.spent}</div>
                    <Badge variant="outline" className={cn(
                      "text-[8px] h-4 border-none",
                      account.health === "Excellent" ? "bg-green-500/10 text-green-500" :
                      account.health === "Poor" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                    )}>{account.health}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Engagement Log</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { type: "Meeting", text: "QBR with CyberDyne", time: "2h ago", icon: History },
              { type: "Email", text: "Proposal sent to Aether", time: "5h ago", icon: FileText },
              { type: "Note", text: "Internal status update", time: "1d ago", icon: FileText },
            ].map((log, i) => (
              <div key={i} className="flex gap-3 items-start p-2 rounded-lg border border-border/30 bg-card/40">
                <div className="p-1.5 rounded bg-secondary"><log.icon className="h-3 w-3 text-accent" /></div>
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">{log.type} • {log.time}</div>
                  <div className="text-xs font-medium">{log.text}</div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold mt-2" asChild>
              <Link href="/customers">Full History</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
