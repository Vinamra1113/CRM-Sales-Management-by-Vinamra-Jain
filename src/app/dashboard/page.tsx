
"use client"

import * as React from "react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie
} from "recharts"
import { 
  TrendingUp, 
  Globe, 
  Target, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const regionalData = [
  { name: "North America", value: 4500, growth: 12 },
  { name: "EMEA", value: 3200, growth: -2 },
  { name: "APAC", value: 2800, growth: 25 },
  { name: "LATAM", value: 1200, growth: 8 },
]

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

export default function ExecutiveDashboard() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Leadership Insights</h1>
        <p className="text-muted-foreground font-body">Global business performance and real-time revenue analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$12.4M", sub: "+14.2% from LY", icon: TrendingUp, color: "text-accent" },
          { label: "Active Deals", value: "1,284", sub: "84 expected to close", icon: Target, color: "text-primary" },
          { label: "Customer LTV", value: "$42,500", sub: "+$3,200 this Q", icon: Users, color: "text-accent" },
          { label: "Win Rate", value: "68.4%", sub: "+4.1% avg weekly", icon: Activity, color: "text-primary" },
        ].map((kpi, i) => (
          <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className={cn("h-4 w-4", kpi.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{kpi.value}</div>
              <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                {kpi.sub.includes('+') ? <ArrowUpRight className="h-3 w-3 text-accent" /> : <ArrowDownRight className="h-3 w-3 text-destructive" />}
                {kpi.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Revenue Forecast Velocity</CardTitle>
            <CardDescription>Actual performance vs predictive modeling for H1 2024</CardDescription>
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
                <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#12141C', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="actual" stroke="#4169E1" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="forecast" stroke="#00BFFF" strokeWidth={1} strokeDasharray="5 5" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Competitive Win/Loss</CardTitle>
            <CardDescription>Market share analysis vs key competitors</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-center items-center">
             <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={competitiveData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {competitiveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              {competitiveData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-muted-foreground font-medium uppercase truncate">{item.name}</span>
                  <span className="text-[10px] font-bold ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-accent" />
              Regional Growth KPI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {regionalData.map((reg) => (
              <div key={reg.name} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{reg.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-code">${reg.value}k</span>
                    <Badge variant={reg.growth > 0 ? "default" : "destructive"} className="text-[10px] h-5 px-1 bg-accent/20 text-accent border-accent/20">
                      {reg.growth > 0 ? `+${reg.growth}%` : `${reg.growth}%`}
                    </Badge>
                  </div>
                </div>
                <Progress value={(reg.value / 5000) * 100} className="h-1 bg-secondary" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Recent Strategic Interactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {[
                { client: "Global Nexus Corp", action: "Renewal Strategy", status: "In Progress", color: "bg-primary" },
                { client: "Atlas Solutions", action: "Competitive Bid", status: "Negotiating", color: "bg-accent" },
                { client: "Vertex Dynamics", action: "Executive Briefing", status: "Scheduled", color: "bg-muted" },
                { client: "Horizon Lab", action: "Account Expansion", status: "Closed-Won", color: "bg-green-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className={cn("h-2 w-2 rounded-full mr-4", item.color)} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{item.client}</div>
                    <div className="text-xs text-muted-foreground">{item.action}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter opacity-70">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
