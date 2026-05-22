
"use client"

import * as React from "react"
import { 
  Package, 
  MessageSquare, 
  Lightbulb, 
  Rocket, 
  Users, 
  Clock,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export default function ProductBridge() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Product Bridge</h1>
          <p className="text-muted-foreground">Sales-to-Product intelligence loop and roadmap synchronization.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2">
            <Rocket className="h-4 w-4" /> View Public Roadmap
          </Button>
          <Button className="bg-primary gap-2">
            <Plus className="h-4 w-4" /> Submit Feedback
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Requests", value: "24", sub: "8 marked high priority", icon: Lightbulb, color: "text-accent" },
          { label: "Sales Feedback", value: "142", sub: "+12 this week", icon: MessageSquare, color: "text-primary" },
          { label: "Next Release", value: "v2.4", sub: "Scheduled for March 15", icon: Rocket, color: "text-accent" },
          { label: "Sync Health", value: "Optimal", sub: "Weekly meeting confirmed", icon: CheckCircle2, color: "text-primary" },
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
            <CardTitle className="text-lg">Sales Priority Feedback</CardTitle>
            <CardDescription>Consolidated customer requirements from the field.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Enterprise SSO / SAML Support", status: "In Development", votes: 42, impact: "High", team: "Auth" },
              { title: "Advanced PDF Export Logic", status: "In Review", votes: 28, impact: "Medium", team: "Core" },
              { title: "Global Search Performance", status: "Backlog", votes: 15, impact: "High", team: "Infra" },
              { title: "Mobile Dashboard v2", status: "Planning", votes: 34, impact: "Critical", team: "Mobile" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50 hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">{item.title}</h4>
                    <Badge variant="outline" className={cn(
                      "text-[9px] font-bold h-4 px-1 border-none",
                      item.impact === "Critical" ? "bg-destructive/10 text-destructive" :
                      item.impact === "High" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                    )}>
                      {item.impact}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="font-code text-accent">{item.votes} Sales Votes</span>
                    <span>Team: {item.team}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">{item.status}</span>
                  <Progress value={item.status === "In Development" ? 65 : item.status === "In Review" ? 90 : 10} className="h-1 w-20 bg-secondary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Releases</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {[
                { version: "v2.4.0", date: "Mar 15", feature: "Territory API", type: "Major" },
                { version: "v2.3.4", date: "Feb 28", feature: "Bug Squashing", type: "Patch" },
                { version: "v2.3.3", date: "Feb 20", feature: "UX Refinement", type: "Patch" },
              ].map((rel, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center border border-border/50">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{rel.version}</div>
                    <div className="text-[11px] text-muted-foreground italic">{rel.feature}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-accent">{rel.date}</div>
                    <Badge variant="outline" className="text-[8px] h-4 border-none bg-muted">{rel.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Strategic Stakeholders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "David Chen", role: "VP Product", avatar: "1" },
              { name: "Sarah Miller", role: "Head of Engineering", avatar: "2" },
              { name: "Alex Rivera", role: "Design Lead", avatar: "3" },
            ].map((user, i) => (
              <div key={i} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://picsum.photos/seed/${user.avatar}/100/100`} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xs font-bold">{user.name}</div>
                  <div className="text-[10px] text-muted-foreground">{user.role}</div>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Known Friction Points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/5 space-y-1">
              <div className="text-xs font-bold text-destructive">Legacy Export Timeout</div>
              <p className="text-[11px] text-muted-foreground">Reports over 5,000 lines are timing out during generation. Fix targeted for v2.4.</p>
            </div>
            <div className="p-3 rounded-lg border border-border/30 bg-muted/20 space-y-1">
              <div className="text-xs font-bold">Latency in EMEA Node</div>
              <p className="text-[11px] text-muted-foreground">Slight increase in API response times in European regions. Monitoring active.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
