
"use client"

import * as React from "react"
import { 
  HeartPulse, 
  Bell, 
  Smile, 
  Frown, 
  Meh, 
  RefreshCcw, 
  Calendar,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Activity
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export default function GrowthHealthTracker() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold font-headline">Growth & Health Tracker</h1>
        <p className="text-muted-foreground font-body">Customer satisfaction metrics and automated contract renewal orchestration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Global NPS Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold font-headline">72</span>
              <Badge variant="outline" className="mb-2 bg-green-500/10 text-green-500 border-none">+4.5% vs Prev Quarter</Badge>
            </div>
            <div className="flex gap-1 h-3 rounded-full overflow-hidden">
              <div className="bg-destructive w-[10%]" />
              <div className="bg-secondary w-[20%]" />
              <div className="bg-primary w-[70%]" />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
              <span>DETRACTORS (8)</span>
              <span>PASSIVES (14)</span>
              <span>PROMOTERS (78)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Account Retention Velocity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold font-headline">96.4%</span>
              <Badge variant="outline" className="mb-2 bg-accent/10 text-accent border-none">Industry Leader</Badge>
            </div>
            <Progress value={96.4} className="h-3 bg-secondary" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">Churn rates remained historically low during the previous transition period.</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Renewal Alert Logic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex-1 space-y-1">
                <div className="font-bold">Next 30 Days</div>
                <div className="text-muted-foreground">8 Strategic Contracts</div>
              </div>
              <div className="h-10 w-10 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center">
                <Bell className="h-5 w-5 text-accent animate-bounce" />
              </div>
            </div>
            <Button variant="secondary" className="w-full text-xs font-bold gap-2">
              Configure Automation
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Critical Renewal Pipeline</CardTitle>
            <CardDescription>Accounts requiring immediate strategic attention for contract continuity.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {[
                { account: "Pioneer Dynamics", date: "Mar 12, 2024", value: "$450k", health: "Poor", risk: "High" },
                { account: "Starlight Systems", date: "Apr 04, 2024", value: "$120k", health: "Average", risk: "Medium" },
                { account: "Core Logistics", date: "Apr 18, 2024", value: "$89k", health: "Good", risk: "Low" },
                { account: "Apex Biometrics", date: "May 22, 2024", value: "$1.2M", health: "Average", risk: "High" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-4 p-4 hover:bg-muted/30 transition-all cursor-pointer">
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-sm">{item.account}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</span>
                      <span className="font-code font-bold text-foreground">{item.value}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Health Score</div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(dot => (
                          <div key={dot} className={cn("h-1.5 w-1.5 rounded-full", dot <= (item.health === "Poor" ? 1 : item.health === "Average" ? 3 : 5) ? "bg-accent" : "bg-muted")} />
                        ))}
                      </div>
                    </div>
                    <Badge variant="outline" className={cn(
                      "text-[10px] uppercase font-bold h-6 border-none",
                      item.risk === "High" ? "bg-destructive/10 text-destructive" : item.risk === "Medium" ? "bg-primary/10 text-primary" : "bg-green-500/10 text-green-500"
                    )}>
                      {item.risk} Risk
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">CSAT Feedback Pulse</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20"><Smile className="h-5 w-5 text-green-500" /></div>
                  <div className="text-xs font-bold uppercase tracking-widest">Delighted</div>
                </div>
                <div className="font-headline font-bold text-xl">84%</div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/5 border border-accent/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/20"><Meh className="h-5 w-5 text-accent" /></div>
                  <div className="text-xs font-bold uppercase tracking-widest">Satisfied</div>
                </div>
                <div className="font-headline font-bold text-xl">12%</div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/20"><Frown className="h-5 w-5 text-destructive" /></div>
                  <div className="text-xs font-bold uppercase tracking-widest">Unsatisfied</div>
                </div>
                <div className="font-headline font-bold text-xl">4%</div>
              </div>
            </div>
            <Button variant="outline" className="w-full text-xs font-bold gap-2 bg-secondary/20">
              <RefreshCcw className="h-3.5 w-3.5" /> Force Survey Sync
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
