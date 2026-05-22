
"use client"

import * as React from "react"
import Link from "next/link"
import { 
  BarChart3, 
  Send, 
  Zap, 
  Globe, 
  TrendingUp,
  MessageSquare,
  FileText,
  Plus,
  ArrowUpRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CAMPAIGNS, LEADS } from "@/lib/data"

export default function MarketingHub() {
  const { toast } = useToast()
  const [isCampaignOpen, setIsCampaignOpen] = React.useState(false)

  const avgROI = (CAMPAIGNS.reduce((acc, c) => acc + c.roi, 0) / CAMPAIGNS.length).toFixed(1);
  const totalLeads = LEADS.length;

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCampaignOpen(false)
    toast({
      title: "Campaign Initiated",
      description: "The new marketing push has been queued for synchronization.",
    })
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Marketing Hub</h1>
          <p className="text-muted-foreground">Campaign ROI tracking and sales-marketing alignment loops.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2" onClick={() => toast({ title: "Leads Shared", description: `${totalLeads} qualified leads exported to Representative workspace.` })}>
            <Send className="h-4 w-4" /> Share Leads
          </Button>
          
          <Dialog open={isCampaignOpen} onOpenChange={setIsCampaignOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary gap-2">
                <Plus className="h-4 w-4" /> New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreateCampaign}>
                <DialogHeader>
                  <DialogTitle>Launch New Campaign</DialogTitle>
                  <DialogDescription>Define the scope and target audience for your next sales support program.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="camp-name">Campaign Name</Label>
                    <Input id="camp-name" placeholder="Q3 Enterprise Momentum" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="budget">Budget Allocation</Label>
                    <Input id="budget" type="number" placeholder="50000" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Deploy Campaign</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg Campaign ROI", value: `${avgROI}x`, sub: "Across all active", icon: TrendingUp, color: "text-accent" },
          { label: "Qualified Leads", value: totalLeads.toString(), sub: "In current pipeline", icon: Zap, color: "text-primary" },
          { label: "Active Programs", value: CAMPAIGNS.length.toString(), sub: "Live data feed", icon: Globe, color: "text-accent" },
          { label: "Sync Status", value: "Optimal", sub: "Sales loop active", icon: MessageSquare, color: "text-primary" },
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
            <CardTitle className="text-lg font-headline">Active Campaigns</CardTitle>
            <CardDescription>Performance tracking for multi-channel sales support programs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {CAMPAIGNS.slice(0, 5).map((camp) => (
              <div key={camp.id} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">{camp.name}</h4>
                    <Badge variant="outline" className="text-[9px] h-4 border-none bg-accent/10 text-accent">{camp.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span>Leads: {camp.leadsGenerated}</span>
                    <span>ROI: {camp.roi}x</span>
                    <span className="font-code text-accent">Budget: ${camp.budget.toLocaleString()}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowUpRight className="h-4 w-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Qualified Leads Shared</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {LEADS.map((lead) => (
              <div key={lead.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer border border-border/20">
                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                  {lead.score}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-xs font-bold truncate">{lead.assignedRep}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{lead.source} • {lead.status}</div>
                </div>
                <Badge variant="outline" className="text-[8px] opacity-60">Score</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold mt-2" onClick={() => toast({ title: "Lead Ledger Open", description: "Navigating to lead database." })}>
              Lead Repository
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
