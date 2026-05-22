'use client';

import * as React from "react"
import Link from "next/link"
import { 
  Users, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  TrendingUp,
  BarChart3
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { SALES_REPS, DISCOUNTS as INITIAL_DISCOUNTS, CUSTOMERS } from "@/lib/data"
import { useFirestore, useCollection } from "@/firebase"
import { collection, doc, updateDoc } from "firebase/firestore"
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function SalesManagerHub() {
  const { toast } = useToast()
  const db = useFirestore()
  const { data: dbDiscounts = [] } = useCollection<any>(db ? collection(db, "discounts") : null)

  const discounts = dbDiscounts.length > 0 ? dbDiscounts : INITIAL_DISCOUNTS;
  const pendingDiscounts = discounts.filter(d => (d.status || d.ApprovalStatus) === 'Pending');
  
  const topPerformers = [...SALES_REPS]
    .sort((a, b) => (b.achievement / b.target) - (a.achievement / a.target))
    .slice(0, 5);

  const handleAction = (type: 'approve' | 'decline', discountId: string) => {
    if (!db) return
    
    const newStatus = type === 'approve' ? 'Approved' : 'Rejected';
    
    updateDoc(doc(db, "discounts", discountId), {
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
        path: `discounts/${discountId}`,
        operation: 'update',
        requestResourceData: { status: newStatus }
      });
      errorEmitter.emit('permission-error', permsError);
    });
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Management Hub</h1>
          <p className="text-muted-foreground">Team performance orchestration and governance control center.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2" asChild>
            <Link href="/orchestrator">
              <MapPin className="h-4 w-4" /> Territories
            </Link>
          </Button>
          <Button className="bg-primary gap-2" asChild>
            <Link href="/executive">
              <TrendingUp className="h-4 w-4" /> Forecast Review
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Team Quota", value: "78%", sub: "$2.4M achievement", icon: TrendingUp, color: "text-primary" },
          { label: "Pending Approvals", value: pendingDiscounts.length.toString(), sub: "Awaiting review", icon: CheckCircle2, color: "text-accent" },
          { label: "Top Performer", value: topPerformers[0].name, sub: topPerformers[0].region, icon: Users, color: "text-primary" },
          { label: "Active Representatives", value: SALES_REPS.length.toString(), sub: "Across all regions", icon: BarChart3, color: "text-accent" },
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
            <CardTitle className="text-lg font-headline">Discount Approval Inbox</CardTitle>
            <CardDescription>Quotes requiring management sign-off for margin preservation.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {pendingDiscounts.map((req) => (
                <div key={req.id || req.RequestID} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 hover:bg-muted/20 transition-all">
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-sm">
                      {CUSTOMERS.find(c => c.id === (req.customerId || req.CustomerID))?.name || "Unknown Client"} 
                      <span className="text-[10px] font-normal text-muted-foreground uppercase ml-2">via {req.repName || req.SalesRep}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-accent font-bold">{req.percent || req.RequestedDiscountPercent}% Requested</div>
                      <div className="text-muted-foreground">Date: {req.date || req.RequestedDate}</div>
                      <Badge variant="outline" className="text-[8px] uppercase">{req.id || req.RequestID}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleAction('decline', req.id || req.RequestID)} className="h-8 text-destructive hover:bg-destructive/10"><XCircle className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAction('approve', req.id || req.RequestID)} className="h-8 text-primary hover:bg-primary/10"><CheckCircle2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
              {pendingDiscounts.length === 0 && (
                <div className="p-8 text-center text-muted-foreground text-sm">No pending discount approvals.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Top Performer Ranking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((rep, i) => {
              const attainment = (rep.achievement / rep.target) * 100;
              return (
                <div key={rep.id} className="flex items-center gap-3">
                  <div className="text-xs font-bold text-muted-foreground w-4">{i + 1}</div>
                  <div className="flex-1">
                    <div className="text-xs font-bold">{rep.name}</div>
                    <Progress value={Math.min(100, attainment)} className="h-1 mt-1 bg-secondary" />
                  </div>
                  <div className="text-xs font-bold text-accent">{attainment.toFixed(0)}%</div>
                </div>
              );
            })}
            <Button variant="outline" className="w-full text-xs font-bold mt-2" asChild>
              <Link href="/performance">Full Leaderboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
