
"use client"

import * as React from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
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
  PieChart,
  Pie,
  Cell
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const revenueForecastData = [
  { month: "Jan", actual: 1200, forecast: 1100 },
  { month: "Feb", actual: 1400, forecast: 1300 },
  { month: "Mar", actual: 1600, forecast: 1550 },
  { month: "Apr", actual: 1900, forecast: 1800 },
  { month: "May", forecast: 2100 },
  { month: "Jun", forecast: 2400 },
]

const competitiveData = [
  { name: "HOSHŌ", value: 42, color: "#4169E1" },
  { name: "Competitor A", value: 25, color: "#1e293b" },
  { name: "Competitor B", value: 18, color: "#334155" },
  { name: "Others", value: 15, color: "#475569" },
]

export default function ExecutiveLeadershipHub() {
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
              <Globe className="h-4 w-4" /> Regional KPIs
            </Link>
          </Button>
          <Button className="bg-primary gap-2" asChild>
            <Link href="/dashboard">
              <TrendingUp className="h-4 w-4" /> Quarterly Forecast
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$12.4M", sub: "+14.2% YoY", icon: TrendingUp, color: "text-accent" },
          { label: "Active Deals", value: "1,284", sub: "84 strategic bids", icon: Target, color: "text-primary" },
          { label: "Global LTV", value: "$42.5k", sub: "Up $3.2k this Q", icon: Users, color: "text-accent" },
          { label: "Win Rate", value: "68.4%", sub: "+4.1% MoM", icon: Activity, color: "text-primary" },
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
            <CardTitle className="text-lg font-headline">Revenue Velocity Forecast</CardTitle>
            <CardDescription>Performance tracking vs predictive modeling for current half.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueForecastData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4169E1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4169E1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}k`} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#12141C', border: 'none', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="actual" stroke="#4169E1" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="forecast" stroke="#00BFFF" strokeWidth={1} strokeDasharray="5 5" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Market Share</CardTitle>
            <CardDescription>Competitive analysis.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={competitiveData} innerRadius={60} outerRadius={80} dataKey="value">
                  {competitiveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {competitiveData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[10px] font-bold uppercase">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
