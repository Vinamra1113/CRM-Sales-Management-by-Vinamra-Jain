
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
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { OPPORTUNITIES, CUSTOMERS, type Opportunity } from "@/lib/data"

const STAGE_CONFIG = [
  { id: "Prospecting", name: "Prospecting" },
  { id: "Qualified", name: "Qualified" },
  { id: "Proposal", name: "Proposal" },
  { id: "Negotiation", name: "Negotiation" },
  { id: "Closed Won", name: "Closed Won" },
]

export default function VelocityPipeline() {
  const [search, setSearch] = React.useState("");

  const getCustomerName = (id: string) => CUSTOMERS.find(c => c.id === id)?.name || "Unknown Client";

  const filteredOpps = React.useMemo(() => {
    return OPPORTUNITIES.filter(opp => 
      opp.product.toLowerCase().includes(search.toLowerCase()) ||
      getCustomerName(opp.customerId).toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
            <Input 
              placeholder="Search deals..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 border-border/50 bg-background/50" 
            />
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
          {STAGE_CONFIG.map((stage) => {
            const stageOpps = filteredOpps.filter(o => o.stage === stage.id);
            const totalValue = stageOpps.reduce((acc, o) => acc + o.value, 0);

            return (
              <div key={stage.id} className="w-80 flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-bold text-sm tracking-tight">{stage.name}</h3>
                    <Badge variant="secondary" className="rounded-full h-5 text-[10px] px-1.5 opacity-60">
                      {stageOpps.length}
                    </Badge>
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground font-code">
                    ${(totalValue / 1000).toFixed(0)}k
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 pb-6">
                  {stageOpps.map((opp) => (
                    <Card key={opp.id} className="border-border/50 bg-card/60 hover:border-primary/50 hover:bg-card/90 transition-all cursor-pointer group shadow-sm">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-[8px] uppercase font-bold px-1.5 h-4 border-none",
                              opp.probability >= 70 ? "bg-green-500/10 text-green-500" : 
                              opp.probability >= 40 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                            )}
                          >
                            {opp.probability}% Probability
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
                          <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{opp.product}</h4>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 opacity-50" />
                            {getCustomerName(opp.customerId)}
                          </p>
                        </div>

                        <div className="flex justify-between items-center py-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground/90">
                            <DollarSign className="h-3 w-3 text-accent" />
                            {(opp.value / 1000).toFixed(0)}k
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            Exp: {opp.closeDate}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-medium uppercase tracking-tight">
                            <span className="text-muted-foreground">Pipeline Health</span>
                            <span className="text-accent">{opp.probability}%</span>
                          </div>
                          <Progress value={opp.probability} className="h-1 bg-secondary" />
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-border/30">
                          <div className="text-[9px] font-bold text-muted-foreground uppercase">{opp.id}</div>
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
            );
          })}
        </div>
      </main>
    </div>
  )
}
