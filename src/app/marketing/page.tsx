
"use client"

import * as React from "react"
import { 
  BarChart3, 
  Send, 
  Zap, 
  Globe, 
  TrendingUp,
  MessageSquare,
  Plus,
  ArrowUpRight,
  PieChart as PieIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CAMPAIGNS, LEADS, SALES_REPS } from "@/lib/data"

export default function MarketingHub() {
  const { toast } = useToast()

  const avgROI = (CAMPAIGNS.reduce((acc, c) => acc + c.roi, 0) / CAMPAIGNS.length).toFixed(2);
  const totalLeads = LEADS.length;
  const qualifiedLeads = LEADS.filter(l => l.status === "Qualified").length;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Marketing Intelligence</h1>
          <p className="text-muted-foreground">Campaign performance monitoring and lead distribution orchestration.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2" onClick={() => toast({ title: "Leads Synchronized", description: `${qualifiedLeads} verified leads pushed to Sales Representative Hubs.` })}>
            <Send className="h-4 w-4" /> Distribute Leads
          </Button>
          <Button className="bg-primary gap-2">
            <Plus className="h-4 w-4" /> New Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Portfolio ROI", value: `${avgROI}x`, sub: "Avg across 80 campaigns", icon: TrendingUp, color: "text-accent" },
          { label: "Qualified Pipeline", value: qualifiedLeads.toString(), sub: `${((qualifiedLeads/totalLeads)*100).toFixed(0)}% Qualification Rate`, icon: Zap, color: "text-primary" },
          { label: "Campaign Count", value: CAMPAIGNS.length.toString(), sub: "Active across 5 channels", icon: Globe, color: "text-accent" },
          { label: "Lead Volume", value: totalLeads.toString(), sub: "Gross generated MTD", icon: MessageSquare, color: "text-primary" },
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
            <CardTitle className="text-lg font-headline">High-Performance Programs</CardTitle>
            <CardDescription>Top campaigns ranked by ROI from your marketing dataset.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {CAMPAIGNS.sort((a, b) => b.roi - a.roi).slice(0, 6).map((camp) => (
              <div key={camp.id} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50 hover:bg-card/80 transition-all">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">{camp.name}</h4>
                    <Badge variant="secondary" className="text-[9px] h-4 border-none">{camp.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-1.5 rounded py-0.5 font-bold">ROI: {camp.roi}x</span>
                    <span>Leads: {camp.leadsGenerated}</span>
                    <span className="font-code">Budget: ${camp.budget.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-accent">{((camp.leadsGenerated / camp.budget) * 1000).toFixed(1)}</div>
                  <div className="text-[8px] text-muted-foreground uppercase">L/$1k</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Real-time Lead Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {LEADS.slice(0, 10).map((lead) => (
              <div key={lead.id} className="flex items-center gap-3 p-2 rounded-lg bg-background/40 border border-border/10">
                <div className={cn(
                  "h-8 w-8 rounded flex items-center justify-center text-[10px] font-bold",
                  lead.score >= 80 ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"
                )}>
                  {lead.score}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-[11px] font-bold truncate">{lead.assignedRep}</div>
                  <div className="text-[9px] text-muted-foreground uppercase">{lead.status} • {lead.leadSource}</div>
                </div>
                <Badge variant="outline" className="text-[8px] border-none bg-muted/50 px-1">NEW</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold mt-2">
              Access Lead Data Lake
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
