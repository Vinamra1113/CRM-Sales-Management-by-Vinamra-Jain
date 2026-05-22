
"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  TrendingUp, 
  Globe, 
  Activity, 
  Target, 
  BarChart3,
  ChevronRight,
  ChevronLeft,
  FileDown
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
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { EXECUTIVE_KPI_DATA } from "@/lib/data"

export default function ExecutiveLeadershipHub() {
  const router = useRouter()
  const { toast } = useToast()
  const totalRevenue = EXECUTIVE_KPI_DATA.reduce((acc, k) => acc + k.revenue, 0);
  const avgWinRate = (EXECUTIVE_KPI_DATA.reduce((acc, k) => acc + k.winRate, 0) / EXECUTIVE_KPI_DATA.length).toFixed(1);
  const totalForecast = EXECUTIVE_KPI_DATA.reduce((acc, k) => acc + k.forecast, 0);

  const handleExport = () => {
    toast({
      title: "Generating Report",
      description: "Compiling aggregate regional data for board distribution...",
    })
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Board Report v2.4 PDF has been downloaded.",
      })
    }, 2000)
  }

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
          <h1 className="text-3xl font-bold font-headline">Leadership Insights</h1>
          <p className="text-muted-foreground">High-level financial snapshots and cross-region growth modeling.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2" asChild>
            <Link href="/dashboard">
              <BarChart3 className="h-4 w-4" /> Global Metrics
            </Link>
          </Button>
          <Button className="bg-primary gap-2" onClick={handleExport}>
            <FileDown className="h-4 w-4" /> Export Board Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Group Revenue", value: `$${(totalRevenue / 1000000).toFixed(2)}M`, sub: "Annual Performance", icon: TrendingUp, color: "text-accent" },
          { label: "Forecast Pipeline", value: `$${(totalForecast / 1000000).toFixed(2)}M`, sub: "H2 Expected", icon: Target, color: "text-primary" },
          { label: "Avg Win Rate", value: `${avgWinRate}%`, sub: "Aggregate MTD", icon: Activity, color: "text-accent" },
          { label: "Region Coverage", value: "5 Active", sub: "Global territories", icon: Globe, color: "text-primary" },
        ].map((kpi, i) => (
          <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg shadow-black/5">
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
            <CardTitle className="text-lg font-headline">Territory Growth Performance</CardTitle>
            <CardDescription>Regional achievement metrics from executive KPI dataset.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {EXECUTIVE_KPI_DATA.map((item) => (
              <div key={item.region} className="space-y-2 hover:bg-muted/10 p-2 rounded-lg transition-colors cursor-pointer" onClick={() => router.push('/dashboard')}>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="text-sm font-bold uppercase tracking-tight">{item.region} Region</div>
                    <div className="text-[10px] text-muted-foreground">Regional Win Rate: {item.winRate}%</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-bold text-accent">${(item.revenue / 1000000).toFixed(2)}M</div>
                    <Badge variant="outline" className="text-[9px] bg-green-500/10 text-green-500 border-none font-bold uppercase">
                      +{item.growth}% Expansion
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
            <CardTitle className="text-lg font-headline">Regional Forecast Map</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EXECUTIVE_KPI_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="region" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="forecast" stroke="hsl(var(--accent))" strokeWidth={1} strokeDasharray="5 5" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
               <div className="flex items-center justify-between text-[10px] font-bold uppercase text-muted-foreground px-1">
                 <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary" /> Actual Revenue</div>
                 <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full border border-accent border-dashed" /> Predictive Mode</div>
               </div>
               <Button variant="ghost" className="w-full text-xs font-bold text-accent" asChild>
                 <Link href="/dashboard">View Predictive Deep-Dive <ChevronRight className="ml-1 h-3 w-3" /></Link>
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
