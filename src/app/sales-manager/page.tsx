
"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Workflow, 
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
import { SALES_REPS } from "@/lib/data"

export default function SalesManagerHub() {
  const { toast } = useToast()

  // Use top performers for the ranking
  const topPerformers = [...SALES_REPS]
    .sort((a, b) => (b.achievement / b.target) - (a.achievement / a.target))
    .slice(0, 5);

  const handleAction = (type: 'approve' | 'decline', deal: string) => {
    toast({
      variant: type === 'decline' ? 'destructive' : 'default',
      title: type === 'approve' ? "Discount Approved" : "Discount Declined",
      description: `${type === 'approve' ? 'Successfully approved' : 'Declined'} discount request for ${deal}.`,
    })
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
          { label: "Pending Approvals", value: "4", sub: "2 high impact", icon: CheckCircle2, color: "text-accent" },
          { label: "Top Performer", value: topPerformers[0].name, sub: topPerformers[0].region, icon: Users, color: "text-primary" },
          { label: "Active Pipeline", value: "$4.2M", sub: "142 open deals", icon: BarChart3, color: "text-accent" },
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
              {[
                { rep: "Alex Rivera", deal: "Project Phoenix", margin: 42, discount: 15, value: "$120k" },
                { rep: "Sarah Miller", deal: "Alpha Rollout", margin: 28, discount: 5, value: "$45k" },
                { rep: "James Wu", deal: "Cloud Migration", margin: 35, discount: 12, value: "$280k" },
              ].map((req, i) => (
                <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 hover:bg-muted/20 transition-all">
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-sm">{req.deal} <span className="text-[10px] font-normal text-muted-foreground uppercase ml-2">via {req.rep}</span></div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-accent font-bold">{req.discount}% Disc.</div>
                      <div className="text-muted-foreground">Margin: {req.margin}%</div>
                      <div className="font-semibold">{req.value}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleAction('decline', req.deal)} className="h-8 text-destructive hover:bg-destructive/10"><XCircle className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAction('approve', req.deal)} className="h-8 text-primary hover:bg-primary/10"><CheckCircle2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
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
