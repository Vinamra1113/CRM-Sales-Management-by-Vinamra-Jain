
"use client"

import * as React from "react"
import { 
  MessageSquare, 
  Lightbulb, 
  Rocket, 
  Plus,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { FEATURE_REQUESTS } from "@/lib/data"

export default function ProductBridge() {
  const activeRequests = FEATURE_REQUESTS.filter(f => f.status !== 'Released');
  const highPriority = activeRequests.filter(f => f.priority === 'High' || f.priority === 'Critical').length;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Product Bridge</h1>
          <p className="text-muted-foreground">Sales-to-Product intelligence loop and roadmap synchronization.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2">
            <Rocket className="h-4 w-4" /> View Public Roadmap
          </Button>
          <Button className="bg-primary gap-2">
            <Plus className="h-4 w-4" /> Submit Feedback
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Requests", value: activeRequests.length.toString(), sub: `${highPriority} high priority`, icon: Lightbulb, color: "text-accent" },
          { label: "Sales Feedback", value: "142", sub: "+12 this week", icon: MessageSquare, color: "text-primary" },
          { label: "Next Release", value: "v2.4", sub: "Scheduled for March 15", icon: Rocket, color: "text-accent" },
          { label: "Sync Health", value: "Optimal", sub: "Weekly meeting confirmed", icon: CheckCircle2, color: "text-primary" },
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
            <CardTitle className="text-lg">Feature Requests from Field</CardTitle>
            <CardDescription>Consolidated customer requirements from your dataset.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {FEATURE_REQUESTS.slice(0, 8).map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50 hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">{item.feature}</h4>
                    <Badge variant="outline" className={cn(
                      "text-[9px] font-bold h-4 px-1 border-none",
                      item.priority === "Critical" ? "bg-destructive/10 text-destructive" :
                      item.priority === "High" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                    )}>
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="font-code text-accent">{item.id}</span>
                    <span>Client: {item.customerId}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">{item.status}</span>
                  <Progress value={item.status === "In Development" ? 65 : item.status === "Planned" ? 30 : item.status === "Released" ? 100 : 10} className="h-1 w-20 bg-secondary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg">Recent Releases</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {FEATURE_REQUESTS.filter(f => f.status === 'Released').slice(0, 5).map((rel) => (
                <div key={rel.id} className="flex items-center gap-4 p-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center border border-border/50">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{rel.feature}</div>
                    <div className="text-[11px] text-muted-foreground italic">{rel.id}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-[8px] h-4 border-none bg-green-500/10 text-green-500">Live</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
