
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
  BarChart3,
  Search
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { SALES_REPS } from "@/lib/data"

export default function PerformanceTarget() {
  const [search, setSearch] = React.useState("");

  const filteredReps = React.useMemo(() => {
    return [...SALES_REPS]
      .filter(rep => rep.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (b.achievement / b.target) - (a.achievement / a.target));
  }, [search]);

  const totalTarget = SALES_REPS.reduce((sum, r) => sum + r.target, 0);
  const totalAchievement = SALES_REPS.reduce((sum, r) => sum + r.achievement, 0);
  const globalProgress = (totalAchievement / totalTarget) * 100;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold font-headline">Performance Target</h1>
        <p className="text-muted-foreground">Quota attainment, velocity metrics, and sales representative rankings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Global Quota Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold font-headline">{globalProgress.toFixed(0)}%</span>
              <Badge variant="outline" className="mb-2 bg-accent/10 text-accent border-none">
                ${(totalAchievement / 1000000).toFixed(1)}M Achievement
              </Badge>
            </div>
            <Progress value={globalProgress} className="h-3 bg-secondary" />
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
              <span>REACHED: ${(totalAchievement / 1000).toFixed(0)}k</span>
              <span>TARGET: ${(totalTarget / 1000).toFixed(0)}k</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Top Regional Performer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold font-headline">North</span>
              <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-none">Leading Growth</Badge>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-accent">
              <Zap className="h-4 w-4" /> 12% above quarterly projection
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">The North region has surpassed its collective target by 18% this month.</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Avg Performance Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold font-headline">73.2</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Aggregate System Score</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-[9px] font-bold h-5">Efficiency: High</Badge>
              <Badge variant="secondary" className="text-[9px] font-bold h-5">Retention: 96%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Global Sales Leaderboard</CardTitle>
            <CardDescription>Ranked by percentage of quota attainment.</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reps..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 border-border/50 bg-background/50" 
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-y-auto divide-y divide-border/20">
            {filteredReps.map((rep, i) => {
              const attainment = (rep.achievement / rep.target) * 100;
              return (
                <div key={rep.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-all cursor-pointer">
                  <div className="text-xs font-bold text-muted-foreground w-8">#{i + 1}</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{rep.name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{rep.region} • ID: {rep.id}</div>
                  </div>
                  <div className="flex-1 hidden md:block px-8">
                    <Progress value={Math.min(100, attainment)} className="h-1.5" />
                  </div>
                  <div className="text-right space-y-1 w-32">
                    <div className="text-sm font-bold">${rep.achievement.toLocaleString()}</div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[9px] font-bold uppercase border-none",
                        attainment >= 100 ? "bg-green-500/10 text-green-500" :
                        attainment >= 80 ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {attainment.toFixed(1)}% Quota
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
