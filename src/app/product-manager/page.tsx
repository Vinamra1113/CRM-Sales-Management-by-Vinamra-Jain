
"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Rocket, 
  Lightbulb, 
  MessageSquare, 
  Plus,
  Heart,
  Search,
  CheckCircle2,
  FileCode,
  ArrowRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { FEEDBACK, FEATURE_REQUESTS, CUSTOMERS } from "@/lib/data"

export default function ProductManagerHub() {
  const { toast } = useToast()
  const [search, setSearch] = React.useState("")

  const bugReports = FEEDBACK.filter(f => f.category === 'Bug').length;
  const criticalRequests = FEATURE_REQUESTS.filter(f => f.priority === 'Critical').length;
  
  const filteredFeedback = FEEDBACK.filter(f => 
    f.product.toLowerCase().includes(search.toLowerCase()) || 
    f.text.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Product Feedback Loop</h1>
          <p className="text-muted-foreground">Aggregating field intelligence and customer requirements.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2" asChild>
            <Link href="/collaboration">
              <Rocket className="h-4 w-4" /> Feature Roadmap
            </Link>
          </Button>
          <Button className="bg-primary gap-2" onClick={() => toast({ title: "Release Sync Initiated", description: "Updated technical one-pagers shared with all Sales Regions." })}>
            <Plus className="h-4 w-4" /> Share Release Update
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Feedback Records", value: FEEDBACK.length.toString(), sub: "Total field entries", icon: MessageSquare, color: "text-accent" },
          { label: "Critical Roadmap", value: criticalRequests.toString(), sub: "Blocker requirements", icon: Lightbulb, color: "text-primary" },
          { label: "Bug Backlog", value: bugReports.toString(), sub: "Engineering tickets", icon: Rocket, color: "text-accent" },
          { label: "Docs Sync", value: "98.2%", sub: "Accuracy score", icon: CheckCircle2, color: "text-primary" },
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
              <CardTitle className="text-lg font-headline">Voice of Customer Ledger</CardTitle>
              <CardDescription>Direct sales-captured feedback mapped to product areas.</CardDescription>
            </div>
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input 
                placeholder="Search feedback..." 
                className="pl-8 h-8 text-xs bg-background/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {filteredFeedback.map((item) => {
                const customer = CUSTOMERS.find(c => c.id === item.customerId);
                return (
                  <div key={item.id} className="flex items-start gap-4 p-4 hover:bg-muted/20 transition-all">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-border/50">
                      <Heart className={cn(
                        "h-4 w-4", 
                        item.satisfaction.includes("Satisfied") ? "text-accent fill-accent" : "text-destructive fill-destructive"
                      )} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold">{customer?.name} • <span className="text-accent">{item.product}</span></h4>
                        <Badge variant="outline" className={cn(
                          "text-[9px] h-4 border-none",
                          item.category === 'Bug' ? "bg-destructive/10 text-destructive" : 
                          item.category === 'Performance' ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                        )}>{item.category}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed italic">"{item.text}"</p>
                      <div className="flex items-center gap-3 text-[9px] font-bold uppercase text-muted-foreground">
                        <span>Sentiment: {item.satisfaction}</span>
                        <span>ID: {item.id}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Technical Docs & Sync</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg border border-border/30 bg-primary/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold">Latest: API v2.4.1</span>
                <FileCode className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">Infrastructure updates for predictive routing and regional assignment endpoints.</p>
            </div>
            
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Required for Sales</h5>
              {[
                "Security Architecture Whitepaper",
                "Compliance Certification Kit",
                "Deployment One-Pager",
                "Competitive Battlecard (Q3)"
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-md border border-border/10 hover:bg-muted/50 cursor-pointer group">
                  <span className="text-[11px] font-medium">{doc}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all text-accent" />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full text-xs font-bold mt-2" onClick={() => toast({ title: "Documentation Audit", description: "Running automated content verification..." })}>
              Run Documentation Audit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
