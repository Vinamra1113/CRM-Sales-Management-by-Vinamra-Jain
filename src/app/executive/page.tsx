
"use client"

import * as React from "react"
import Link from "next/link"
import { 
  TrendingUp, 
  Globe, 
  Activity, 
  Target, 
  Users
} from "lucide-react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { EXECUTIVE_KPI_DATA } from "@/lib/data"

export default function ExecutiveLeadershipHub() {
  const totalRevenue = EXECUTIVE_KPI_DATA.reduce((acc, k) => acc + k.revenue, 0);
  const avgWinRate = (EXECUTIVE_KPI_DATA.reduce((acc, k) => acc + k.winRate, 0) / EXECUTIVE_KPI_DATA.length).toFixed(1);
  const totalForecast = EXECUTIVE_KPI_DATA.reduce((acc, k) => acc + k.forecast, 0);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Executive Hub</h1>
          <p className="text-muted-foreground">High-level business performance and global market intelligence.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2" asChild>
            <Link href="/dashboard">
              <Globe className="h-4 w-4" /> Global Dashboard
            </Link>
          </Button>
          <Button className="bg-primary gap-2">
            <TrendingUp className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `$${(totalRevenue / 1000000).toFixed(1)}M`, sub: "Global Performance", icon: TrendingUp, color: "text-accent" },
          { label: "Revenue Forecast", value: `$${(totalForecast / 1000000).toFixed(1)}M`, sub: "Expected next half", icon: Target, color: "text-primary" },
          { label: "Win Rate", value: `${avgWinRate}%`, sub: "Average cross-region", icon: Activity, color: "text-accent" },
          { label: "Regions Active", value: EXECUTIVE_KPI_DATA.length.toString(), sub: "Market coverage", icon: Users, color: "text-primary" },
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
            <CardTitle className="text-lg font-headline">Regional Growth Analysis</CardTitle>
            <CardDescription>Performance tracking vs predictive modeling across all territories.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {EXECUTIVE_KPI_DATA.map((item) => (
              <div key={item.region} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="text-sm font-bold uppercase">{item.region}</div>
                    <div className="text-xs text-muted-foreground">Win Rate: {item.winRate}%</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-bold text-accent">${item.revenue.toLocaleString()}</div>
                    <Badge variant="outline" className="text-[9px] bg-green-500/10 text-green-500 border-none">
                      +{item.growth}% Growth
                    </Badge>
                  </div>
                </div>
                <Progress value={item.winRate} className="h-1.5 bg-secondary" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Global Market Forecast</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EXECUTIVE_KPI_DATA}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="region" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="forecast" stroke="hsl(var(--accent))" strokeWidth={1} strokeDasharray="5 5" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
