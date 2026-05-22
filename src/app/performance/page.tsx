
"use client"

import * as React from "react"
import { 
  TrendingUp, 
  Target, 
  Award, 
  Trophy, 
  Flame,
  Zap,
  ArrowUpRight,
  BarChart3
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function PerformanceTarget() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold font-headline">Performance Target</h1>
        <p className="text-muted-foreground">Quota attainment, velocity metrics, and sales representative rankings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Monthly Quota Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold font-headline">82%</span>
              <Badge variant="outline" className="mb-2 bg-accent/10 text-accent border-none">$142k to Goal</Badge>
            </div>
            <Progress value={82} className="h-3 bg-secondary" />
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
              <span>REACHED: $658k</span>
              <span>TARGET: $800k</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Pipeline Velocity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold font-headline">14.2</span>
              <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-none">Days to Close</Badge>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-accent">
              <Zap className="h-4 w-4" /> 2.4 days faster than LY avg
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">Efficient lead processing is driving shorter sales cycles this quarter.</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Top Performer Rank</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold font-headline">Gold Tier</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Top 5% Globally</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-[9px] font-bold h-5">Q1 MVP candidate</Badge>
              <Badge variant="secondary" className="text-[9px] font-bold h-5">98% CSAT</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg">Sales Leaderboard (Team Alpha)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {[
                { name: "Elena Rodriguez", quota: 142, revenue: "$1.2M", trend: "up" },
                { name: "Sarah Jenkins", quota: 115, revenue: "$980k", trend: "up" },
                { name: "Marcus Thorne", quota: 94, revenue: "$720k", trend: "down" },
                { name: "David Chen", quota: 88, revenue: "$650k", trend: "stable" },
              ].map((rep, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-all cursor-pointer">
                  <div className="text-xs font-bold text-muted-foreground w-4">{i + 1}</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{rep.name}</div>
                    <div className="text-[10px] text-muted-foreground">{rep.quota}% of Quota</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-bold">{rep.revenue}</div>
                    <div className={cn(
                      "text-[9px] font-bold uppercase",
                      rep.trend === "up" ? "text-accent" : rep.trend === "down" ? "text-destructive" : "text-muted-foreground"
                    )}>
                      {rep.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg">Activity Pulse</CardTitle>
          </CardHeader>
          <CardContent className="h-[240px] flex items-center justify-center border border-dashed border-border/50 m-6 rounded-lg bg-background/30">
            <div className="text-center space-y-3">
              <BarChart3 className="h-12 w-12 text-primary mx-auto opacity-20" />
              <p className="text-sm text-muted-foreground font-medium italic">High-density activity visualization loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
