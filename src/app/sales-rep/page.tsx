
"use client"

import * as React from "react"
import { 
  Users, 
  Layers, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  Target,
  Search,
  Mail,
  Phone
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function SalesRepresentativeHub() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Sales Hub</h1>
          <p className="text-muted-foreground">Personal pipeline management and daily activity orchestration.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2">
            <Plus className="h-4 w-4" /> Log Activity
          </Button>
          <Button className="bg-primary gap-2">
            <Plus className="h-4 w-4" /> New Opportunity
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "My Quota", value: "82%", sub: "$142k remaining", icon: Target, color: "text-accent" },
          { label: "Active Deals", value: "14", sub: "$1.2M pipeline", icon: Layers, color: "text-primary" },
          { label: "Tasks Due", value: "8", sub: "3 high priority", icon: Clock, color: "text-accent" },
          { label: "Avg Close", value: "14d", sub: "Faster than team", icon: TrendingUp, color: "text-primary" },
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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-headline">Pipeline Opportunities</CardTitle>
              <CardDescription>Highest probability deals in your current cycle.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-accent">View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Omni-Channel Expansion", company: "RetailEdge", value: 120000, prob: 65, stage: "Proposal" },
              { name: "Global ERP Rollout", company: "LogiTrans", value: 850000, prob: 40, stage: "Discovery" },
              { name: "Security Audit Suite", company: "SafeGuard", value: 45000, prob: 95, stage: "Closing" },
            ].map((deal, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50 hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">{deal.name}</h4>
                    <Badge variant="outline" className="text-[9px] h-4 border-none bg-muted">{deal.stage}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="font-code text-accent">${(deal.value / 1000).toFixed(0)}k</span>
                    <span>{deal.company}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold uppercase">{deal.prob}% Prob.</span>
                  <Progress value={deal.prob} className="h-1 w-20 bg-secondary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Recent Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Sarah Jenkins", role: "CTO, CyberDyne", avatar: "1" },
              { name: "Marcus Thorne", role: "Manager, Aether", avatar: "2" },
              { name: "Elena Rodriguez", role: "VP Sales, Zenith", avatar: "3" },
            ].map((contact, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://picsum.photos/seed/${contact.avatar}/100/100`} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="text-xs font-bold truncate">{contact.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{contact.role}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Mail className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Phone className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold mt-2">Open Contact Ledger</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
