
"use client"

import * as React from "react"
import Link from "next/link"
import { 
  HeartPulse, 
  Bell, 
  History, 
  Smile, 
  Calendar, 
  AlertTriangle,
  FileText,
  Star,
  Plus,
  Target
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { ACCOUNT_PLANS, RENEWALS, CUSTOMERS } from "@/lib/data"

export default function AccountManagerHub() {
  const { toast } = useToast()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const avgHealth = React.useMemo(() => {
    if (!mounted) return "0.0"
    return (CUSTOMERS.reduce((acc, c) => acc + c.satisfaction, 0) / CUSTOMERS.length).toFixed(1)
  }, [mounted])

  const pendingRenewalsCount = React.useMemo(() => {
    if (!mounted) return "0"
    return RENEWALS.filter(r => r.status === 'Pending').length.toString()
  }, [mounted])

  if (!mounted) return null

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
                {ACCOUNT_PLANS.slice(0, 10).map((plan) => (
                  <div key={plan.id} className="space-y-2 p-4 rounded-lg border bg-card">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{CUSTOMERS.find(c => c.id === plan.customerId)?.name || "Unknown"}</span>
                      <Badge variant="secondary">Target: ${plan.targetRevenue.toLocaleString()}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.goal}</p>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Review: {plan.reviewDate}</div>
                  </div>
                ))}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Create New Plan</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New Strategic Plan</DialogTitle>
                      <DialogDescription>Draft a growth strategy for an existing account.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Account</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Customer" />
                          </SelectTrigger>
                          <SelectContent>
                            {CUSTOMERS.slice(0, 10).map(c => (
                              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Growth Goal</Label>
                        <Textarea placeholder="Describe the primary expansion objective..." />
                      </div>
                      <div className="grid gap-2">
                        <Label>Target Expansion Revenue</Label>
                        <Input type="number" placeholder="50000" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => toast({ title: "Plan Saved", description: "Strategic goal has been synchronized with the account ledger." })}>Finalize Plan</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
          { label: "Avg Health Score", value: avgHealth, sub: "Across all accounts", icon: HeartPulse, color: "text-accent" },
          { label: "Pending Renewals", value: pendingRenewalsCount, sub: "Requiring attention", icon: Calendar, color: "text-primary" },
          { label: "Churn Risk", value: "Low", sub: "Based on sentiment", icon: AlertTriangle, color: "text-destructive" },
          { label: "Active Plans", value: ACCOUNT_PLANS.length.toString(), sub: "Growth strategies", icon: Smile, color: "text-accent" },
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
            <CardTitle className="text-lg font-headline">Key Strategic Renewals</CardTitle>
            <CardDescription>Upcoming contract dates from the Renewals dataset.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {RENEWALS.slice(0, 8).map((rel) => {
                const customer = CUSTOMERS.find(c => c.id === rel.customerId);
                return (
                  <div key={rel.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-all cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center border border-border/50">
                      <Star className={cn("h-5 w-5", rel.status === "Renewed" ? "text-accent" : "text-muted")} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold">{customer?.name || "Unknown Client"}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">End Date: {rel.endDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-foreground">Reminder: {rel.reminderDate}</div>
                      <Badge variant="outline" className={cn(
                        "text-[9px] h-4 border-none",
                        rel.status === "Renewed" ? "bg-green-500/10 text-green-500" :
                        rel.status === "Pending" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                      )}>{rel.status}</Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-headline">Interaction Logs</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Strategic Note</DialogTitle>
                  <DialogDescription>Record high-level context for account governance.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Account</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {CUSTOMERS.slice(0, 10).map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Note Context</Label>
                    <Textarea placeholder="Key takeaways from the QBR or stakeholder sync..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => toast({ title: "Interaction Logged", description: "Note added to strategic account timeline." })}>Save Log</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { type: "Meeting", text: "Strategic Planning - CUST0001", time: "2h ago", icon: History },
              { type: "Email", text: "Renewal Discussion - CUST0002", time: "5h ago", icon: FileText },
              { type: "Note", text: "Account Expansion Analysis", time: "1d ago", icon: FileText },
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
