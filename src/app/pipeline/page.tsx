
"use client"

import * as React from "react"
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  Clock, 
  User, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const stages = [
  { id: "prospecting", name: "Prospecting", deals: [
    { id: 1, name: "Omni-Channel Expansion", company: "RetailEdge", value: 120000, prob: 20, age: 14, priority: "Medium" },
    { id: 2, name: "Database Integration", company: "DataFlow", value: 45000, prob: 10, age: 5, priority: "Low" },
  ]},
  { id: "discovery", name: "Discovery", deals: [
    { id: 3, name: "Security Audit Suite", company: "SafeGuard", value: 280000, prob: 40, age: 22, priority: "High" },
  ]},
  { id: "proposal", name: "Proposal", deals: [
    { id: 4, name: "Global ERP Rollout", company: "LogiTrans", value: 850000, prob: 65, age: 45, priority: "High" },
    { id: 5, name: "Mobile Workforce App", company: "SwiftOps", value: 35000, prob: 60, age: 12, priority: "Medium" },
  ]},
  { id: "negotiation", name: "Negotiation", deals: [
    { id: 6, name: "Infrastructure Overhaul", company: "Mainframe Inc", value: 1400000, prob: 85, age: 62, priority: "High" },
  ]},
  { id: "closing", name: "Closing", deals: [
    { id: 7, name: "SaaS Enterprise Tier", company: "CloudScale", value: 95000, prob: 95, age: 30, priority: "Medium" },
  ]},
]

export default function VelocityPipeline() {
  return (
    <div className="flex flex-col h-screen overflow-hidden animate-in slide-in-from-bottom-2 duration-500">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Velocity Pipeline</h1>
          <p className="text-sm text-muted-foreground">Manage deal stages and identify bottleneck opportunities.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search deals..." className="pl-9 h-9 border-border/50 bg-background/50" />
          </div>
          <Button variant="outline" size="sm" className="gap-2 border-border/50">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" /> New Deal
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max p-6 gap-6">
          {stages.map((stage) => (
            <div key={stage.id} className="w-80 flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline font-bold text-sm tracking-tight">{stage.name}</h3>
                  <Badge variant="secondary" className="rounded-full h-5 text-[10px] px-1.5 opacity-60">
                    {stage.deals.length}
                  </Badge>
                </div>
                <div className="text-[10px] font-bold text-muted-foreground font-code">
                  ${(stage.deals.reduce((acc, deal) => acc + deal.value, 0) / 1000).toFixed(0)}k
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 pb-6">
                {stage.deals.map((deal) => (
                  <Card key={deal.id} className="border-border/50 bg-card/60 hover:border-primary/50 hover:bg-card/90 transition-all cursor-pointer group shadow-sm">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-[8px] uppercase font-bold px-1.5 h-4 border-none",
                            deal.priority === "High" ? "bg-accent/20 text-accent" : 
                            deal.priority === "Medium" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                          )}
                        >
                          {deal.priority} Priority
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{deal.name}</h4>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 opacity-50" />
                          {deal.company}
                        </p>
                      </div>

                      <div className="flex justify-between items-center py-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground/90">
                          <DollarSign className="h-3 w-3 text-accent" />
                          {(deal.value / 1000).toFixed(0)}k
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {deal.age}d
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-medium uppercase tracking-tight">
                          <span className="text-muted-foreground">Probability</span>
                          <span className="text-accent">{deal.prob}%</span>
                        </div>
                        <Progress value={deal.prob} className="h-1 bg-secondary" />
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-border/30">
                        <div className="flex -space-x-1.5">
                          {[1, 2].map(i => (
                            <div key={i} className="h-5 w-5 rounded-full border border-background bg-secondary flex items-center justify-center">
                              <User className="h-2.5 w-2.5 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button variant="ghost" className="w-full h-10 border-dashed border-border/50 border flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-xs font-medium">
                  <Plus className="h-3 w-3" /> Add Opportunity
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
