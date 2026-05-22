
"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Package, 
  Rocket, 
  Lightbulb, 
  MessageSquare, 
  CheckCircle2, 
  Users, 
  ArrowUpRight,
  Plus,
  FileText,
  Clock
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function ProductManagerHub() {
  const { toast } = useToast()

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Product Hub</h1>
          <p className="text-muted-foreground">Roadmap synchronization and customer feedback intelligence.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2" asChild>
            <Link href="/collaboration">
              <Rocket className="h-4 w-4" /> Public Roadmap
            </Link>
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary gap-2">
                <Plus className="h-4 w-4" /> Share Update
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={(e) => { e.preventDefault(); toast({ title: "Update Shared", description: "Release notes distributed to internal sales channels." }) }}>
                <DialogHeader>
                  <DialogTitle>Broadcast Product Update</DialogTitle>
                  <DialogDescription>Inform the sales team about new features or critical bug fixes.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="update-title">Version / Title</Label>
                    <Input id="update-title" placeholder="v2.4.1 - Performance Patches" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="impact">Key Sales Impact</Label>
                    <Textarea id="impact" placeholder="Explain how this helps close deals..." required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Publish Update</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Requests", value: "24", sub: "8 marked high priority", icon: Lightbulb, color: "text-accent" },
          { label: "Sales Feedback", value: "142", sub: "+12 this week", icon: MessageSquare, color: "text-primary" },
          { label: "Next Release", value: "v2.4", sub: "Scheduled: Mar 15", icon: Rocket, color: "text-accent" },
          { label: "Docs Sync", value: "100%", sub: "Fully up to date", icon: CheckCircle2, color: "text-primary" },
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
            <CardTitle className="text-lg font-headline">Sales Priority Feedback</CardTitle>
            <CardDescription>Requirements captured from field interactions for prioritization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Enterprise SSO / SAML Support", votes: 42, impact: "High", status: "Planned" },
              { title: "Advanced PDF Export Logic", votes: 28, impact: "Medium", status: "Research" },
              { title: "Mobile Dashboard v2", votes: 15, impact: "High", status: "Backlog" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50 hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">{item.title}</h4>
                    <Badge variant="outline" className="text-[9px] h-4 border-none bg-muted">{item.status}</Badge>
                  </div>
                  <div className="text-[10px] text-muted-foreground">Votes: {item.votes} • Impact: {item.impact}</div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowUpRight className="h-4 w-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Product Docs Hub</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg border border-border/20 bg-muted/10 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold">API Reference v2.3</span>
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">Updated with territorial routing endpoints for the sales team.</p>
            </div>
            <div className="space-y-2">
              {[
                { name: "Technical One-Pager", type: "PDF" },
                { name: "Security Architecture", type: "Wiki" },
                { name: "Deployment Guide", type: "Link" },
              ].map((link, i) => (
                <div key={i} className="flex items-center gap-2 p-2 hover:bg-muted/30 transition-colors cursor-pointer rounded border border-border/10">
                  <FileText className="h-3.5 w-3.5 text-accent" />
                  <span className="text-[11px] font-medium">{link.name}</span>
                  <span className="ml-auto text-[8px] font-bold text-muted-foreground">{link.type}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full text-xs font-bold mt-2" onClick={() => toast({ title: "Internal Docs Updated", description: "Changes pushed to Technical Wiki." })}>
              Update Docs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
