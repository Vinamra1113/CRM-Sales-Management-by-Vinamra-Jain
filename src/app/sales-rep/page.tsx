
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
  MessageSquare
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
import { SALES_REPS, OPPORTUNITIES, CONTACTS, CUSTOMERS, ACTIVITIES } from "@/lib/data"

export default function SalesRepresentativeHub() {
  const { toast } = useToast()
  const [isActivityOpen, setIsActivityOpen] = React.useState(false)

  // Use SR001 - Allison Hill as primary view
  const currentUser = SALES_REPS[0];
  const quotaPercent = (currentUser.achievement / currentUser.target) * 100;
  const remaining = Math.max(0, currentUser.target - currentUser.achievement);

  // Data mapping for Allison
  const userOpps = OPPORTUNITIES.slice(0, 4); // Show some deals
  const userContacts = CONTACTS.slice(0, 5); // Show some contacts

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault()
    setIsActivityOpen(false)
    toast({
      title: "Activity Logged",
      description: "Your meeting notes have been synced to the account history.",
    })
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Sales Hub: {currentUser.name}</h1>
          <p className="text-muted-foreground">Personal pipeline management and daily activity orchestration.</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isActivityOpen} onOpenChange={setIsActivityOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-border/50 gap-2">
                <MessageSquare className="h-4 w-4" /> Log Activity
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleLogActivity}>
                <DialogHeader>
                  <DialogTitle>Log Sales Activity</DialogTitle>
                  <DialogDescription>Record details from your latest customer interaction.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Interaction Subject</Label>
                    <Input id="subject" placeholder="Discovery Call - Global Nexus" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Summarize the discussion points..." required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Activity</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          <Button className="bg-primary gap-2" asChild>
            <Link href="/pipeline">
              <Plus className="h-4 w-4" /> New Opportunity
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "My Quota", value: `${quotaPercent.toFixed(1)}%`, sub: `$${remaining.toLocaleString()} remaining`, icon: Target, color: "text-accent" },
          { label: "Active Deals", value: userOpps.length.toString(), sub: `$${currentUser.achievement.toLocaleString()} achievement`, icon: Layers, color: "text-primary" },
          { label: "Performance Score", value: currentUser.score.toString(), sub: `Region: ${currentUser.region}`, icon: TrendingUp, color: "text-accent" },
          { label: "Recent Activities", value: ACTIVITIES.length.toString(), sub: "Last 7 days", icon: Clock, color: "text-primary" },
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
              <CardTitle className="text-lg font-headline">Top Opportunities</CardTitle>
              <CardDescription>High-value deals currently in your pipeline.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-accent" asChild>
              <Link href="/pipeline">View Pipeline</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {userOpps.map((opp) => (
              <div key={opp.id} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50 hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">{opp.product}</h4>
                    <Badge variant="outline" className="text-[9px] h-4 border-none bg-muted">{opp.stage}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="font-code text-accent">${(opp.value / 1000).toFixed(0)}k</span>
                    <span>{CUSTOMERS.find(c => c.id === opp.customerId)?.name}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold uppercase">{opp.probability}% Prob.</span>
                  <Progress value={opp.probability} className="h-1 w-20 bg-secondary" />
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
            {userContacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://picsum.photos/seed/${contact.id}/100/100`} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="text-xs font-bold truncate">{contact.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{contact.jobTitle}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Mail className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Phone className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold mt-2" asChild>
              <Link href="/customers">Open Contact Ledger</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
