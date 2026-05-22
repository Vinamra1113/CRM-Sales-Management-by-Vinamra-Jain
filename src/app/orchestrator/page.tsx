
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  ShieldCheck, 
  MapPin, 
  Zap, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Percent,
  ChevronLeft
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { DISCOUNTS as INITIAL_DISCOUNTS, CUSTOMERS, LEADS } from "@/lib/data"
import { useFirestore, useCollection } from "@/firebase"
import { collection, doc, updateDoc } from "firebase/firestore"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'

export default function LeadOrchestrator() {
  const router = useRouter()
  const { toast } = useToast()
  const db = useFirestore()
  const { data: dbDiscounts = [] } = useCollection<any>(db ? collection(db, "discounts") : null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const discounts = dbDiscounts.length > 0 ? dbDiscounts : INITIAL_DISCOUNTS;
  const pendingDiscounts = discounts.filter(d => (d.status || d.ApprovalStatus) === 'Pending');

  const handleAction = (type: 'approve' | 'decline', discountId: string) => {
    if (!db) return
    
    const newStatus = type === 'approve' ? 'Approved' : 'Rejected';
    const docRef = doc(db, "discounts", discountId);
    
    updateDoc(docRef, {
      status: newStatus,
      ApprovalStatus: newStatus
    })
    .then(() => {
      toast({
        variant: type === 'decline' ? 'destructive' : 'default',
        title: type === 'approve' ? "Discount Approved" : "Discount Declined",
        description: `Request ${discountId} has been ${newStatus.toLowerCase()}.`,
      })
    })
    .catch(async (err) => {
      const permsError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: { status: newStatus }
      });
      errorEmitter.emit('permission-error', permsError);
    });
  }

  if (!mounted) return null

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Return</span>
        </div>
        <h1 className="text-3xl font-bold font-headline">Operational Lead Orchestrator</h1>
        <p className="text-muted-foreground">Territory distribution and tiered management logic for sales operations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 bg-card/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Pending Discount Approvals</CardTitle>
              <CardDescription>Review and approve sales representative quote variations.</CardDescription>
            </div>
            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-primary border-primary/20 bg-primary/5">
              {pendingDiscounts.length} Pending
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {pendingDiscounts.map((req) => (
                <div key={req.id || req.RequestID} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 hover:bg-muted/20 transition-all group">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">
                        {CUSTOMERS.find(c => c.id === (req.customerId || req.CustomerID))?.name || "Unknown Deal"}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-medium">via {req.repName || req.SalesRep}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1 text-accent font-code">
                        <Percent className="h-3 w-3" /> {req.percent || req.RequestedDiscountPercent}% Discount
                      </div>
                      <div className="text-muted-foreground">Requested: {req.date || req.RequestedDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 md:flex-none h-8 text-[10px] uppercase font-bold border-destructive/20 text-destructive hover:bg-destructive/10"
                      onClick={() => handleAction('decline', req.id || req.RequestID)}
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1" /> Decline
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 md:flex-none h-8 text-[10px] uppercase font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                      onClick={() => handleAction('approve', req.id || req.RequestID)}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve
                    </Button>
                  </div>
                </div>
              ))}
              {pendingDiscounts.length === 0 && (
                <div className="p-12 text-center text-muted-foreground text-sm">
                  All discount requests have been processed.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Territory Distribution</CardTitle>
            <CardDescription>Current workload balance across regions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { region: "North America", load: 85, color: "bg-primary" },
              { region: "EMEA", load: 62, color: "bg-accent" },
              { region: "APAC", load: 94, color: "bg-destructive" },
              { region: "LATAM", load: 35, color: "bg-secondary" },
            ].map((reg) => (
              <div key={reg.region} className="space-y-2">
                <div className="flex justify-between text-xs font-medium uppercase tracking-tight">
                  <span>{reg.region}</span>
                  <span className={cn(reg.load > 90 ? "text-destructive" : "text-muted-foreground")}>{reg.load}% Capacity</span>
                </div>
                <Progress value={reg.load} className={cn("h-1.5", reg.load > 90 ? "bg-destructive/20" : "bg-secondary")} />
              </div>
            ))}
            <Button variant="secondary" className="w-full text-xs font-bold gap-2 bg-secondary/50">
              <MapPin className="h-3.5 w-3.5" /> Rebalance Territories
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-headline flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              Lead Distribution Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg border border-border/30 bg-muted/20 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold">Round Robin</span>
                <Badge variant="outline" className="text-[8px] bg-accent/20 text-accent border-none">ACTIVE</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">Incoming qualified leads are distributed equally across the Core Sales team.</p>
            </div>
            <div className="p-3 rounded-lg border border-border/10 bg-muted/5 opacity-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold">Lead Velocity</span>
                <Badge variant="outline" className="text-[8px] border-none">{LEADS.length} Total</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">Leads processed based on historical conversion rate and tenure.</p>
            </div>
            <Button variant="ghost" className="w-full text-xs font-bold text-accent">Edit Automation Logic</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-border/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm">Global Lead Velocity History</CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[240px] bg-[url('https://picsum.photos/seed/velocity/800/400')] bg-cover bg-center" data-ai-hint="data analysis">
            <div className="w-full h-full bg-background/80 backdrop-blur-sm flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <Clock className="h-10 w-10 text-primary mx-auto animate-pulse" />
                <div className="space-y-1">
                  <h3 className="font-headline font-bold">Processing Stream...</h3>
                  <p className="text-xs text-muted-foreground">Historical lead-to-opportunity mapping in real-time.</p>
                </div>
                <Button size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30">
                  Access Data Lake
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
