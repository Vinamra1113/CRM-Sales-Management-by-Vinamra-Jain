
"use client"

import * as React from "react"
import Link from "next/link"
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
  Phone,
  MessageSquare,
  Activity as ActivityIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { SALES_REPS, OPPORTUNITIES, CONTACTS, CUSTOMERS, SALES_ACTIVITIES } from "@/lib/data"

export default function SalesRepresentativeHub() {
  const { toast } = useToast()
  const [isActivityOpen, setIsActivityOpen] = React.useState(false)

  // SR001 - Allison Hill
  const currentUser = SALES_REPS[0];
  const quotaPercent = (currentUser.achievement / currentUser.target) * 100;
  const remaining = Math.max(0, currentUser.target - currentUser.achievement);

  const userOpps = OPPORTUNITIES.filter(o => o.repId === currentUser.id);
  const totalPipelineValue = userOpps.reduce((sum, o) => sum + o.value, 0);
  
  const userContacts = CONTACTS.filter(contact => {
    const customer = CUSTOMERS.find(c => c.id === contact.customerId);
    return customer?.manager === currentUser.name;
  }).slice(0, 5);

  const userActivities = SALES_ACTIVITIES.filter(a => a.repId === currentUser.id);

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault()
    setIsActivityOpen(false)
    toast({
      title: "Activity Logged",
      description: "Interaction successfully synchronized to account timeline.",
    })
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Welcome back, {currentUser.name}</h1>
          <p className="text-muted-foreground">Region: {currentUser.region} • Performance Score: {currentUser.score}</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isActivityOpen} onOpenChange={setIsActivityOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-border/50 gap-2">
                <MessageSquare className="h-4 w-4" /> Log Interaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleLogActivity}>
                <DialogHeader>
                  <DialogTitle>Sales Activity Log</DialogTitle>
                  <DialogDescription>Record details from your latest client meeting or call.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Q3 Strategy Review" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Meeting Notes</Label>
                    <Textarea id="notes" placeholder="Key takeaways and action items..." required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save to Ledger</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          <Button className="bg-primary gap-2" asChild>
            <Link href="/pipeline">
              <Plus className="h-4 w-4" /> Add Opportunity
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Quota Attainment", value: `${quotaPercent.toFixed(1)}%`, sub: `$${remaining.toLocaleString()} to goal`, icon: Target, color: "text-accent" },
          { label: "Pipeline Value", value: `$${(totalPipelineValue / 1000).toFixed(0)}k`, sub: `${userOpps.length} active deals`, icon: Layers, color: "text-primary" },
          { label: "Activity Velocity", value: userActivities.length.toString(), sub: "Last 30 days", icon: ActivityIcon, color: "text-accent" },
          { label: "Monthly Target", value: `$${currentUser.target.toLocaleString()}`, sub: "Revised Jan 1", icon: TrendingUp, color: "text-primary" },
        ].map((kpi, i) => (
          <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl shadow-black/5">
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
              <CardTitle className="text-lg font-headline">My Active Pipeline</CardTitle>
              <CardDescription>Highest probability deals from your opportunity dataset.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-accent" asChild>
              <Link href="/pipeline">Full Pipeline <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {userOpps.sort((a, b) => b.probability - a.probability).slice(0, 5).map((opp) => (
              <div key={opp.id} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50 hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">{opp.product}</h4>
                    <Badge variant="outline" className="text-[9px] h-4 border-none bg-muted">{opp.stage}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="font-code text-accent font-bold">${(opp.value / 1000).toFixed(0)}k</span>
                    <span>{CUSTOMERS.find(c => c.id === opp.customerId)?.name}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold uppercase">{opp.probability}% Confidence</span>
                  <Progress value={opp.probability} className="h-1 w-24 bg-secondary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Stakeholder Ledger</CardTitle>
            <CardDescription>Direct contacts for your managed accounts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userContacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors border border-border/10 group">
                <Avatar className="h-8 w-8 border border-border/50">
                  <AvatarImage src={`https://picsum.photos/seed/${contact.id}/100/100`} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="text-xs font-bold truncate">{contact.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{contact.jobTitle}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Mail className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Phone className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold mt-2" asChild>
              <Link href="/customers">Open Universal Ledger</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
