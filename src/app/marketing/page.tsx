
"use client"

import * as React from "react"
import Link from "next/link"
import { 
  BarChart3, 
  Send, 
  Users, 
  Target, 
  Zap, 
  Globe, 
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  FileText,
  Plus,
  Image as ImageIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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

export default function MarketingHub() {
  const { toast } = useToast()
  const [isCampaignOpen, setIsCampaignOpen] = React.useState(false)

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
          <Button variant="outline" className="border-border/50 gap-2" onClick={() => toast({ title: "Leads Shared", description: "84 qualified leads exported to Representative workspace." })}>
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
          { label: "Campaign ROI", value: "3.4x", sub: "+12% this Q", icon: TrendingUp, color: "text-accent" },
          { label: "Qualified Leads", value: "142", sub: "+24 today", icon: Zap, color: "text-primary" },
          { label: "Ad Performance", value: "Excellent", sub: "CTR up by 5%", icon: Globe, color: "text-accent" },
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
            {[
              { name: "Q1 Enterprise Push", status: "Active", leads: 84, conversion: 12 },
              { name: "APAC Expansion Sweep", status: "Paused", leads: 42, conversion: 8 },
              { name: "Social Proof Wave", status: "Planning", leads: 0, conversion: 0 },
            ].map((camp, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">{camp.name}</h4>
                    <Badge variant="outline" className={cn(
                      "text-[9px] h-4 border-none",
                      camp.status === "Active" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                    )}>{camp.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span>Leads: {camp.leads}</span>
                    <span>Conv: {camp.conversion}%</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowUpRight className="h-4 w-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Sales Content Collab</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-xs text-muted-foreground mb-4 italic">Collaborate with sales on assets that actually close.</div>
            {[
              { name: "Enterprise Case Study v2", stage: "Draft", owner: "Alex R" },
              { name: "Competitive Battlecard", stage: "In Review", owner: "Sarah M" },
              { name: "Product FAQ Deck", stage: "Ready", owner: "Self" },
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer border border-border/20">
                <FileText className="h-4 w-4 text-primary" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-xs font-bold truncate">{doc.name}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{doc.stage} • {doc.owner}</div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold mt-2" onClick={() => toast({ title: "Request Sent", description: "Design team has been notified of the content gap." })}>
              Request Asset
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
