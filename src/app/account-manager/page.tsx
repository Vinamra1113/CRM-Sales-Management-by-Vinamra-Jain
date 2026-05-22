
'use client';

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  HeartPulse, 
  Bell, 
  Smile, 
  Calendar, 
  AlertTriangle,
  FileText,
  Star,
  Plus,
  ChevronLeft
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
import { ACCOUNT_PLANS as INITIAL_PLANS, RENEWALS as INITIAL_RENEWALS, CUSTOMERS } from "@/lib/data"
import { useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'

export default function AccountManagerHub() {
  const router = useRouter()
  const { toast } = useToast()
  const db = useFirestore()
  const [mounted, setMounted] = React.useState(false)
  const { data: dbPlans = [] } = useCollection<any>(db ? collection(db, "account-plans") : null)
  const { data: dbRenewals = [] } = useCollection<any>(db ? collection(db, "renewals") : null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const plans = dbPlans.length > 0 ? dbPlans : INITIAL_PLANS;
  const renewals = dbRenewals.length > 0 ? dbRenewals : INITIAL_RENEWALS;

  const avgHealth = React.useMemo(() => {
    if (!mounted) return "0.0"
    return (CUSTOMERS.reduce((acc, c) => acc + (c.satisfaction || 0), 0) / CUSTOMERS.length).toFixed(1)
  }, [mounted])

  const pendingRenewalsCount = React.useMemo(() => {
    if (!mounted) return "0"
    return renewals.filter(r => (r.status || r.RenewalStatus) === 'Pending').length.toString()
  }, [mounted, renewals])

  const handleCreatePlan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return

    const formData = new FormData(e.currentTarget)
    const payload = {
      customerId: formData.get("customerId") as string,
      goal: formData.get("goal") as string,
      targetRevenue: Number(formData.get("revenue")),
      reviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: serverTimestamp()
    }

    addDoc(collection(db, "account-plans"), payload)
      .then(() => toast({ title: "Plan Saved", description: "Strategic goal has been synchronized." }))
      .catch(async (err) => {
        const permsError = new FirestorePermissionError({
          path: 'account-plans',
          operation: 'create',
          requestResourceData: payload
        });
        errorEmitter.emit('permission-error', permsError);
      });
  }

  if (!mounted) return null

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Back to Roles</span>
          </div>
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
                <div className="max-h-[60vh] overflow-y-auto space-y-4">
                  {plans.slice(0, 10).map((plan) => (
                    <div key={plan.id || plan.PlanID} className="space-y-2 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => toast({ title: "Plan Selected", description: "Opening strategic roadmap..." })}>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{CUSTOMERS.find(c => c.id === (plan.customerId || plan.CustomerID))?.name || "Unknown"}</span>
                        <Badge variant="secondary">Target: ${Number(plan.targetRevenue || plan.TargetRevenue).toLocaleString()}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{plan.goal || plan.StrategicGoal}</p>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Review: {plan.reviewDate || plan.ReviewDate}</div>
                    </div>
                  ))}
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Create New Plan</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handleCreatePlan}>
                      <DialogHeader>
                        <DialogTitle>New Strategic Plan</DialogTitle>
                        <DialogDescription>Draft a growth strategy for an existing account.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label>Account</Label>
                          <Select name="customerId" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Customer" />
                            </SelectTrigger>
                            <SelectContent>
                              {CUSTOMERS.slice(0, 20).map(c => (
                                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Growth Goal</Label>
                          <Textarea name="goal" required placeholder="Describe the primary expansion objective..." />
                        </div>
                        <div className="grid gap-2">
                          <Label>Target Expansion Revenue</Label>
                          <Input name="revenue" type="number" required placeholder="50000" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Finalize Plan</Button>
                      </DialogFooter>
                    </form>
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
          { label: "Active Plans", value: plans.length.toString(), sub: "Growth strategies", icon: Smile, color: "text-accent" },
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
            <CardDescription>Upcoming contract dates. Click for detail.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {renewals.slice(0, 8).map((rel) => {
                const customer = CUSTOMERS.find(c => c.id === (rel.customerId || rel.CustomerID));
                const status = rel.status || rel.RenewalStatus;
                return (
                  <div 
                    key={rel.id || rel.RenewalID} 
                    onClick={() => router.push('/health')}
                    className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-all cursor-pointer group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center border border-border/50 group-hover:border-primary/50 transition-colors">
                      <Star className={cn("h-5 w-5", status === "Renewed" ? "text-accent" : "text-muted")} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold group-hover:text-primary transition-colors">{customer?.name || "Unknown Client"}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">End Date: {rel.endDate || rel.ContractEndDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-foreground">Reminder: {rel.reminderDate || rel.ReminderDate}</div>
                      <Badge variant="outline" className={cn(
                        "text-[9px] h-4 border-none",
                        status === "Renewed" ? "bg-green-500/10 text-green-500" :
                        status === "Pending" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                      )}>{status}</Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Recent Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg border border-border/10 bg-accent/5 space-y-1 hover:bg-accent/10 transition-colors cursor-pointer">
              <div className="text-[10px] font-bold text-accent uppercase">Expansion Win</div>
              <div className="text-xs font-medium">CUST0042 Upgraded to Tier 3</div>
            </div>
            <div className="p-3 rounded-lg border border-border/10 bg-primary/5 space-y-1 hover:bg-primary/10 transition-colors cursor-pointer">
              <div className="text-[10px] font-bold text-primary uppercase">Strategy Lock</div>
              <div className="text-xs font-medium">New Plan approved for HOSHŌ Core</div>
            </div>
            <Button variant="outline" className="w-full text-xs font-bold mt-2" asChild>
              <Link href="/customers">Full History</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
